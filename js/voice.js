/* =====================================================================
   FILE: js/voice.js
   PURPOSE (beginner summary):
     The "natural voice" for Read aloud. It talks to js/kokoro-worker.js,
     which runs the free Kokoro voice model inside the browser, and plays
     the result sentence by sentence — preparing the next sentence while
     the current one is playing, so there are no long gaps.
       - First use downloads the voice once (~326 MB smooth GPU version, or
         ~92 MB light version); a small progress bar shows how far along it is. Later visits load it from the
         browser's storage.
       - If the natural voice cannot load (very old browser, no internet on
         first use, page opened as a file), FocusNest falls back to the
         device's built-in voice automatically.
   USED BY: FN.speak() in js/ui.js.  SETTINGS: Settings → Read aloud.
   DEPENDENCIES: js/kokoro-worker.js, js/ui.js (FN.toast, FN.icon).
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});

  // Kokoro's best English voices (quality grades from the model card).
  var VOICES = [
    ["af_heart", "Heart — warm, American (best)"],
    ["af_bella", "Bella — bright, American"],
    ["af_nicole", "Nicole — soft, American"],
    ["am_michael", "Michael — American (male)"],
    ["am_fenrir", "Fenrir — American (male)"],
    ["am_puck", "Puck — American (male)"],
    ["bf_emma", "Emma — British"],
    ["bm_george", "George — British (male)"]
  ];

  var worker = null, state = "off", loadWaiters = [], files = {}, lastError = "";
  var ctx = null, current = null, token = 0;

  function supported() {
    return location.protocol !== "file:" && typeof Worker !== "undefined" && typeof WebAssembly === "object" && !!(window.AudioContext || window.webkitAudioContext);
  }

  /* ---------- small progress pill while the voice downloads ---------- */
  function pill(pct, text) {
    var el = document.getElementById("voicePill");
    if (pct === null) { if (el) el.remove(); return; }
    if (!el) { el = document.createElement("div"); el.id = "voicePill"; el.className = "voice-pill"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.innerHTML = FN.icon("headphones") + '<div><strong>' + text + '</strong><span class="bar"><span style="width:' + pct + '%"></span></span><small>' + pct + "% · one-time download" + (totalMB ? " (" + totalMB + " MB)" : "") + ", then it works offline</small></div>";
    FN.icons();
  }
  var totalMB = 0;
  function onProgress(p) {
    if (p.status === "progress" && p.file && p.total) files[p.file] = { loaded: p.loaded, total: p.total };
    var L = 0, T = 0;
    Object.keys(files).forEach(function (k) { L += files[k].loaded; T += files[k].total; });
    var pct = T ? Math.min(99, Math.round(L / T * 100)) : 0;
    totalMB = Math.round(T / 1e6);
    if (T > 2e6 && L < T) pill(pct, "Getting the natural voice ready…");   // only for a real download (stored voices load instantly)
    if (FN.onVoiceStatus) FN.onVoiceStatus();
  }

  /**
   * FUNCTION: chooseBackend()
   * PURPOSE: picks how to run the voice on this computer.
   *   - Graphics chip available (WebGPU) → full-quality model on the GPU: speaks ~2× faster
   *     than real time, so reading is smooth. One-time download ~326 MB.
   *   - Otherwise, or if the student chose "Smaller download" → 8-bit model on the CPU:
   *     ~92 MB, but slower, so there can be short pauses between sentences.
   * (The half-precision GPU model was tested and produced broken audio, so it is not used.)
   */
  var LIGHT = { device: "wasm", dtype: "q8" }, SMOOTH = { device: "webgpu", dtype: "fp32" };
  var backend = null;
  function chooseBackend() {
    if ((FN.store.get().settings.naturalQuality || "auto") === "light" || !navigator.gpu) return Promise.resolve(LIGHT);
    return navigator.gpu.requestAdapter().then(function (a) { return a ? SMOOTH : LIGHT; }, function () { return LIGHT; });
  }

  /**
   * FUNCTION: load()
   * PURPOSE: starts the worker and loads the model (download on first use).
   *   If the GPU version fails to start, it retries once with the light CPU version.
   * OUTPUT: Promise that resolves when ready, rejects on failure.
   */
  function load() {
    if (state === "ready") return Promise.resolve();
    if (!supported()) return Promise.reject(new Error("This browser can't run the natural voice."));
    return new Promise(function (ok, fail) {
      loadWaiters.push({ ok: ok, fail: fail });
      if (state === "loading") return;
      state = "loading"; files = {}; lastError = ""; totalMB = 0;
      if (FN.onVoiceStatus) FN.onVoiceStatus();
      chooseBackend().then(start);
    });
    function start(b) {
      backend = b; files = {};
      if (worker) worker.terminate();
      try { worker = new Worker("js/kokoro-worker.js", { type: "module" }); }
      catch (e) { return fail_(e.message); }
      worker.onmessage = function (e) {
        var m = e.data;
        if (m.type === "progress") onProgress(m.p);
        if (m.type === "ready") {
          state = "ready"; pill(null);
          try { localStorage.setItem("focusnest:kokoro", backend.dtype); } catch (x) {}
          // Ask the browser not to clear the downloaded voice when space runs low.
          if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {});
          done(true);
        }
        if (m.type === "error") retryOrFail(m.message);
        if (m.type === "audio" || m.type === "audio-error") onAudio(m);
      };
      worker.onerror = function (e) { retryOrFail(e.message || "The voice worker could not start."); };
      worker.postMessage({ type: "load", device: b.device, dtype: b.dtype });
    }
    function retryOrFail(msg) { if (backend === SMOOTH) start(LIGHT); else fail_(msg); }
    function fail_(msg) { state = "error"; lastError = msg; pill(null); done(false, msg); }
    function done(okay, msg) {
      var w = loadWaiters; loadWaiters = [];
      w.forEach(function (x) { okay ? x.ok() : x.fail(new Error(msg)); });
      if (FN.onVoiceStatus) FN.onVoiceStatus();
    }
  }

  /* ---------- playback: generate ahead, play in order ---------- */
  var job = null; // { token, list, voice, speed, audio:{}, next, playing, requested, onDone }
  function request(seq) {
    if (!job || seq >= job.list.length || job.requested[seq]) return;
    job.requested[seq] = true;
    worker.postMessage({ type: "speak", id: job.token, seq: seq, text: job.list[seq], voice: job.voice, speed: job.speed });
  }
  function onAudio(m) {
    if (!job || m.id !== job.token) return;                 // result for a reading that was stopped
    job.audio[m.seq] = m.type === "audio" ? m : { skip: true };
    if (!job.playing) playNext();
  }
  function playNext() {
    if (!job) return;
    var seq = job.next, a = job.audio[seq];
    if (seq >= job.list.length) { var cb = job.onDone; job = null; current = null; if (cb) cb(); return; }
    if (!a) { job.playing = false; return; }               // still being generated — onAudio will call us
    delete job.audio[seq];
    job.next++; request(job.next + 1);                      // keep two sentences prepared ahead
    if (a.skip) return playNext();
    job.playing = true;
    for (var i = 0; i < a.audio.length; i++) if (a.audio[i] !== a.audio[i]) a.audio[i] = 0;   // silence any invalid (NaN) samples instead of playing noise
    var buf = ctx.createBuffer(1, a.audio.length, a.rate);
    buf.copyToChannel(a.audio, 0);
    var src = ctx.createBufferSource(); src.buffer = buf; src.connect(ctx.destination);
    var mine = job.token;
    // After each sentence: a short natural pause, then the next one. `playing` stays true during
    // the pause so a sentence that finishes generating meanwhile is not started twice.
    src.onended = function () {
      if (!job || job.token !== mine || current !== src) return;
      current = null;
      setTimeout(function () { if (job && job.token === mine) { job.playing = false; playNext(); } }, 120);
    };
    current = src; src.start();
  }

  /**
   * FUNCTION: FN.natural.speak(sentences, opts, onDone, onFail)
   * PURPOSE: reads the sentences with the natural voice. Loads the model first if needed.
   * onFail(reason) is called if the voice can't be used — the caller then falls back.
   */
  function speak(list, opts, onDone, onFail) {
    var my = ++token;
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (ctx.state === "suspended") ctx.resume();            // called from a click, so the browser allows sound
    if (state !== "ready") FN.toast(localStorage.getItem("focusnest:kokoro") ? "Loading the natural voice…" : "Downloading the natural voice (one time — see the progress bar)…");
    load().then(function () {
      if (my !== token) return;                             // stopped while loading
      job = { token: my, list: list, voice: opts.voice || "af_heart", speed: opts.speed || 1, audio: {}, next: 0, playing: false, requested: {}, onDone: onDone };
      request(0); request(1);
    }).catch(function (e) { if (my === token && onFail) onFail(e.message); });
  }
  function stop() {
    token++;
    if (job) job.token = -1;
    job = null;
    if (current) { try { current.onended = null; current.stop(); } catch (e) {} current = null; }
  }

  FN.natural = {
    VOICES: VOICES, supported: supported, load: load, speak: speak, stop: stop,
    status: function () { return { state: state, error: lastError, backend: backend && (backend.device === "webgpu" ? "smooth" : "light"), cached: (function () { try { return !!localStorage.getItem("focusnest:kokoro"); } catch (e) { return false; } })() }; },
    /** reset(): forget the loaded model (used when the student switches quality). */
    reset: function () { stop(); if (worker) worker.terminate(); worker = null; state = "off"; backend = null; if (FN.onVoiceStatus) FN.onVoiceStatus(); }
  };
})();
