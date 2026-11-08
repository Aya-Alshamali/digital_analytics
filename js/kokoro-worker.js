/* =====================================================================
   FILE: js/kokoro-worker.js  (runs in a background "Web Worker")
   PURPOSE (beginner summary):
     Turns text into a natural, human-sounding voice with Kokoro — a free,
     open (Apache-2.0) voice model that runs 100% inside the browser.
     No account, no API key, no server: the text never leaves the device.
     It runs in a worker so the page stays smooth while it "thinks".
   FIRST USE: the model downloads once from Hugging Face and the browser keeps
     it, so later visits work offline: ~326 MB full-quality version on the
     graphics chip (WebGPU, smooth), or ~92 MB 8-bit version on the processor.
   MESSAGES:
     in : {type:"load"}                          → out: progress…, then "ready" or "error"
     in : {type:"speak", id, seq, text, voice, speed} → out: {type:"audio", audio(Float32Array), rate}
   DEPENDENCY: kokoro-js 1.2.1 (Apache-2.0) from the jsDelivr CDN.
   ===================================================================== */
import { KokoroTTS } from "https://cdn.jsdelivr.net/npm/kokoro-js@1.2.1/dist/kokoro.web.js";

const MODEL = "onnx-community/Kokoro-82M-v1.0-ONNX";
let tts = null, loading = null;

/* Keep the big full-quality model file (~326 MB) on the device.
   The library stores the small files itself but does not keep this large one,
   so without this it would download again on every visit. We save it in our
   own browser cache the first time and serve it from there afterwards. */
const KEEP = /\/onnx\/model\.onnx(\?|$)/;
const realFetch = self.fetch.bind(self);
self.fetch = async (input, init) => {
  const url = typeof input === "string" ? input : input.url;
  if (!KEEP.test(url)) return realFetch(input, init);
  const cache = await caches.open("focusnest-voice");
  const hit = await cache.match(url);
  if (hit) return hit;
  const res = await realFetch(input, init);
  if (res.ok) {
    const copy = res.clone();
    // Save in the background; the voice keeps loading from the original response.
    copy.arrayBuffer().then((buf) => cache.put(url, new Response(buf, { headers: { "Content-Type": "application/octet-stream", "Content-Length": String(buf.byteLength) } })))
      .then(() => self.postMessage({ type: "stored" }))
      .catch((e) => self.postMessage({ type: "progress", p: { status: "store-failed", file: String(e && e.message || e) } }));
  }
  return res;
};

self.onmessage = async (e) => {
  const m = e.data;
  if (m.type === "load") {
    try {
      if (!loading) loading = KokoroTTS.from_pretrained(MODEL, {
        dtype: m.dtype || "q8", device: m.device || "wasm",          // chosen by js/voice.js (GPU fp32 or CPU q8)
        progress_callback: (p) => self.postMessage({ type: "progress", p: { status: p.status, file: p.file, loaded: p.loaded, total: p.total } })
      });
      tts = await loading;
      await tts.generate("Hi.", { voice: "af_heart" });   // warm-up: the engine's first run is slow, so do it before the student is waiting
      self.postMessage({ type: "ready" });
    } catch (err) {
      loading = null;
      self.postMessage({ type: "error", message: String((err && err.message) || err) });
    }
  }
  if (m.type === "speak") {
    try {
      const out = await tts.generate(m.text, { voice: m.voice, speed: m.speed });
      self.postMessage({ type: "audio", id: m.id, seq: m.seq, audio: out.audio, rate: out.sampling_rate }, [out.audio.buffer]);
    } catch (err) {
      self.postMessage({ type: "audio-error", id: m.id, seq: m.seq, message: String((err && err.message) || err) });
    }
  }
};
