/* =====================================================================
   FILE: js/ui.js
   PURPOSE (beginner summary):
     Small shared helpers used by every page: safe text escaping,
     toasts (little pop-up messages), the modal window, slide-reference
     chips, icon refresh, and applying your reading/accessibility settings.
   SECURITY: content can come from uploaded files, so ALL text goes through
     FN.esc() before it is placed in HTML. Never skip it.
   DEPENDENCIES: lucide (icons), js/store.js.
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});

  FN.$ = function (sel, root) { return (root || document).querySelector(sel); };
  FN.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

  /** esc(text): turns <, >, &, quotes into safe entities. */
  FN.esc = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  FN.icon = function (name, cls) { return '<i data-lucide="' + name + '"' + (cls ? ' class="' + cls + '"' : "") + "></i>"; };
  FN.icons = function () { if (window.lucide) window.lucide.createIcons(); };
  FN.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };

  /** toast(msg, kind): short message bottom-right; disappears after 2.6s. */
  FN.toast = function (msg, kind) {
    var box = document.getElementById("toasts"); if (!box) return;
    var t = document.createElement("div");
    t.className = "toast " + (kind || "");
    t.textContent = msg;
    box.appendChild(t);
    setTimeout(function () { t.classList.add("out"); }, 2300);
    setTimeout(function () { t.remove(); }, 2700);
  };

  /** modal(html, onMount): opens the shared dialog. Esc or the backdrop closes it. */
  var lastFocus = null;
  FN.modal = function (html, onMount) {
    var back = document.getElementById("modalBack"), m = document.getElementById("modal");
    lastFocus = document.activeElement;
    m.innerHTML = '<button class="icon-btn modal-x" data-close aria-label="Close">' + FN.icon("x") + "</button>" + html;
    back.hidden = false;
    FN.icons();
    if (onMount) onMount(m);
    var f = m.querySelector("input,textarea,button:not(.modal-x)"); if (f) f.focus();
  };
  FN.closeModal = function () {
    var back = document.getElementById("modalBack");
    if (back.hidden) return;
    back.hidden = true; document.getElementById("modal").innerHTML = "";
    if (FN.onModalClose) { var cb = FN.onModalClose; FN.onModalClose = null; cb(); }
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };
  document.addEventListener("click", function (e) {
    if (e.target.id === "modalBack" || e.target.closest("[data-close]")) FN.closeModal();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") FN.closeModal(); });

  /** slideChips(slides): "Slide 12" buttons; clicking opens the original slide panel (lesson.js). */
  FN.slideChips = function (slides) {
    if (!slides || !slides.length) return "";
    var uniq = slides.filter(function (n, i) { return slides.indexOf(n) === i; }).sort(function (a, b) { return a - b; });
    return '<span class="chips">' + uniq.map(function (n) {
      return '<button class="chip chip-slide" data-slide="' + n + '" title="Open original slide ' + n + '">' + FN.icon("presentation") + " Slide " + n + "</button>";
    }).join("") + "</span>";
  };
  /** Source badges: tell slide content apart from FocusNest's added explanation. */
  FN.badgeSlides = '<span class="src src-slide" title="Copied from your slides">' + '<i data-lucide="file-text"></i> From your slides</span>';
  FN.badgeAI = '<span class="src src-ai" title="Explanation written for you; not on the slides">' + '<i data-lucide="sparkles"></i> Added explanation</span>';

  /**
   * FUNCTION: applySettings()
   * PURPOSE: turns stored reading settings into CSS variables / attributes.
   * USER-VISIBLE: font size, spacing, width, contrast, background, theme, motion change instantly.
   */
  FN.applySettings = function () {
    var s = FN.store.get().settings, r = document.documentElement;
    r.style.setProperty("--read-size", s.fontSize + "px");
    r.style.setProperty("--read-lh", s.lineHeight);
    r.style.setProperty("--read-width", s.width + "ch");
    r.setAttribute("data-theme", s.theme);
    r.setAttribute("data-contrast", s.contrast);
    r.setAttribute("data-bg", s.bg);
    var sysReduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    r.toggleAttribute("data-reduce-motion", !!(s.reduceMotion || sysReduce));
    var app = document.getElementById("app");
    if (app && FN.applyPanels) FN.applyPanels();
  };
  /* =====================================================================
     FN.sound — all of FocusNest's little sounds, made in the browser (no files).
     WHY ONE SHARED AUDIO ENGINE: browsers allow only a few AudioContexts and
     block sound that wasn't started by a click. So we create ONE context and
     "unlock" it on the student's first click or key press; later sounds (e.g.
     the timer ending while you read) can then play.
       FN.sound.chime(kind)   "small" | "big" | "timer" — soft bell tones
       FN.sound.noise(kind, volume) "brown" | "rain" | "ocean" — returns { stop(), volume(v) }
     ===================================================================== */
  var actx = null;
  function audio() {
    var AC = window.AudioContext || window.webkitAudioContext; if (!AC) return null;
    if (!actx) actx = new AC();
    if (actx.state === "suspended") actx.resume();
    return actx;
  }
  function unlock() { audio(); document.removeEventListener("pointerdown", unlock, true); document.removeEventListener("keydown", unlock, true); }
  document.addEventListener("pointerdown", unlock, true);
  document.addEventListener("keydown", unlock, true);

  // One soft bell note: a sine plus a quiet octave, fast fade-in (no click) and a gentle fade-out.
  function bell(a, freq, at, len, vol) {
    [[1, 1], [2, 0.25], [3, 0.08]].forEach(function (h) {
      var o = a.createOscillator(), g = a.createGain();
      o.type = "sine"; o.frequency.value = freq * h[0];
      g.gain.setValueAtTime(0.0001, at);
      g.gain.exponentialRampToValueAtTime(vol * h[1], at + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, at + len);
      o.connect(g); g.connect(a.destination); o.start(at); o.stop(at + len + 0.05);
    });
  }
  var CHIMES = {
    small: { notes: [659.25, 987.77], gap: 0.09, len: 0.7, vol: 0.05 },                // E5 → B5
    big: { notes: [523.25, 659.25, 783.99, 1046.5], gap: 0.1, len: 1.1, vol: 0.05 },  // C major arpeggio
    timer: { notes: [783.99, 659.25, 523.25], gap: 0.35, len: 1.6, vol: 0.07 }         // calm falling bells
  };
  function chime(kind) {
    var a = audio(), c = CHIMES[kind] || CHIMES.small; if (!a) return;
    var t = a.currentTime + 0.02;
    c.notes.forEach(function (f, k) { bell(a, f, t + k * c.gap, c.len, c.vol); });
  }

  /**
   * makeAmbience(ctx, kind): fills a looping buffer with a natural-sounding background.
   *   "brown" — deep, even rumble (like a fan far away)
   *   "rain"  — soft pink-noise bed + hundreds of random droplets
   *   "ocean" — slow waves that swell and fall every ~8 seconds
   * The buffer's end is cross-faded into its start, so the loop has no click.
   */
  function makeAmbience(a, kind) {
    var sr = a.sampleRate, secs = kind === "ocean" ? 16 : 10, len = sr * secs, fade = Math.floor(sr * 0.6);
    var raw = new Float32Array(len + fade), b0 = 0, b1 = 0, b2 = 0, br = 0, lp = 0, k;
    for (k = 0; k < raw.length; k++) {
      var w = Math.random() * 2 - 1;
      br = (br + 0.02 * w) / 1.02;                                              // brown noise
      b0 = 0.99765 * b0 + w * 0.099; b1 = 0.963 * b1 + w * 0.2965; b2 = 0.57 * b2 + w * 1.0527;
      var pink = (b0 + b1 + b2 + w * 0.1848) * 0.11;                           // pink noise
      if (kind === "brown") raw[k] = br * 3.2;
      else if (kind === "rain") { lp += 0.25 * (pink - lp); raw[k] = lp * 1.7; }   // softened bed
      else {
        var t = (k % len) / sr, env = 0.18 + 0.82 * Math.pow(Math.sin(Math.PI * t / 8), 2);   // one wave every 8 s
        lp += (0.04 + 0.3 * env) * (pink - lp);                                 // brighter as the wave breaks
        raw[k] = (lp * 1.6 * env + br * 1.2) * 0.8;
      }
    }
    if (kind === "rain") {   // droplets: short, bright, randomly loud ticks
      for (var n = 0; n < secs * 140; n++) {
        var at = Math.floor(Math.random() * len), amp = 0.06 + Math.pow(Math.random(), 3) * 0.5, dl = Math.floor(sr * (0.004 + Math.random() * 0.012)), prev = 0;
        for (var j = 0; j < dl && at + j < raw.length; j++) { var x = (Math.random() * 2 - 1) - prev * 0.6; prev = x; raw[at + j] += x * amp * Math.exp(-j / (dl / 4)); }
      }
    }
    var buf = a.createBuffer(1, len, sr), d = buf.getChannelData(0);
    for (k = 0; k < len; k++) d[k] = raw[k];
    for (k = 0; k < fade; k++) { var f = k / fade; d[k] = raw[k] * Math.sqrt(f) + raw[len + k] * Math.sqrt(1 - f); }
    for (k = 0; k < len; k++) d[k] = Math.max(-0.98, Math.min(0.98, d[k]));
    return buf;
  }
  // Plays an ambience through a gentle filter chain; dest lets tests render it offline.
  function ambience(a, kind, vol, dest) {
    var src = a.createBufferSource(), hp = a.createBiquadFilter(), lpf = a.createBiquadFilter(), out = a.createGain();
    src.buffer = makeAmbience(a, kind); src.loop = true;
    hp.type = "highpass"; hp.frequency.value = kind === "rain" ? 120 : 25;
    lpf.type = "lowpass"; lpf.frequency.value = kind === "brown" ? 500 : kind === "rain" ? 7000 : 2500;
    src.connect(hp); hp.connect(lpf); lpf.connect(out); out.connect(dest || a.destination);
    out.gain.setValueAtTime(0.0001, a.currentTime); out.gain.exponentialRampToValueAtTime(vol || 0.2, a.currentTime + 1.2);   // fade in
    src.start();
    return { src: src, out: out };
  }
  function noise(kind, vol) {
    var a = audio(); if (!a) return null;
    var n = ambience(a, kind, vol);
    return {
      volume: function (v) { n.out.gain.setTargetAtTime(Math.max(0.0001, v), a.currentTime, 0.1); },
      stop: function () { n.out.gain.setTargetAtTime(0.0001, a.currentTime, 0.25); setTimeout(function () { try { n.src.stop(); } catch (e) {} n.out.disconnect(); }, 1200); }
    };
  }
  /** FN.sound.test(kind): renders 4 s offline and reports loudness — used to check sounds without speakers. */
  function test(kind) {
    var OC = window.OfflineAudioContext || window.webkitOfflineAudioContext, o = new OC(1, 44100 * 4, 44100);
    ambience(o, kind, 0.2);
    return o.startRendering().then(function (b) {
      var d = b.getChannelData(0), peak = 0, sum = 0, nan = 0;
      for (var k = 44100 * 2; k < d.length; k++) { if (isNaN(d[k])) nan++; peak = Math.max(peak, Math.abs(d[k])); sum += d[k] * d[k]; }
      return { kind: kind, peak: +peak.toFixed(3), rms: +Math.sqrt(sum / (d.length - 88200)).toFixed(3), nan: nan };
    });
  }
  FN.sound = { chime: chime, noise: noise, test: test };

  FN.reducedMotion = function () { return document.documentElement.hasAttribute("data-reduce-motion"); };

  /**
   * FUNCTION: FN.celebrate(message, big)
   * PURPOSE: an immediate, small reward after finishing something (ADHD brains respond
   *   best to frequent, instant rewards — see ADHD_RESEARCH.md).
   *   Shows a short burst of dots + a soft two-note chime. With "Reduce motion" on,
   *   only the message is shown. Both can be turned off in Settings → Motivation.
   */
  FN.celebrate = function (msg, big, silent) {
    var c = (FN.store.get().celebrate) || { on: true, sound: true };
    if (msg) FN.toast(msg, "xp");
    if (!c.on) return;
    if (c.sound && !silent) FN.sound.chime(big ? "big" : "small");
    if (FN.reducedMotion()) return;
    var box = document.createElement("div"), n = big ? 28 : 14, colors = ["#6f9a7e", "#e0a84a", "#5b8bd0", "#d8735f", "#9b7fd1"];
    box.className = "confetti"; box.setAttribute("aria-hidden", "true");
    for (var k = 0; k < n; k++) {
      var d = document.createElement("i"), ang = (k / n) * Math.PI * 2, dist = (big ? 160 : 90) + Math.random() * 60;
      d.style.cssText = "--x:" + Math.cos(ang) * dist + "px;--y:" + Math.sin(ang) * dist + "px;background:" + colors[k % colors.length];
      box.appendChild(d);
    }
    document.body.appendChild(box);
    setTimeout(function () { box.remove(); }, 1100);
  };

  /* ---------------- READ ALOUD (text-to-speech) ----------------
     Goal: sound like a calm person reading, not a robot.
       1. Pick the most natural voice the device has (Premium / Enhanced /
          Natural / Neural voices first; never the novelty voices).
       2. Read only the lesson text — skip buttons, slide chips and labels.
       3. Say symbols the way a person would ("→" = "then", "e.g." = "for example").
       4. Speak one sentence at a time, so there are natural pauses and long
          text never cuts off.
     The student can choose another voice and the speed in Settings. */
  var NOVELTY = /^(albert|bad news|bahh|bells|boing|bubbles|cellos|fred|good news|jester|junior|organ|ralph|superstar|trinoids|whisper|wobble|zarvox|eddy|flo|grandma|grandpa|reed|rocko|sandy|shelley)\b/i;
  var GOOD_NAMES = /^(ava|samantha|allison|susan|zoe|evan|nathan|tom|serena|kate|daniel|oliver|karen|lee|moira|fiona|tessa|veena|rishi|aaron|nicky|joelle|noelle)\b/i;

  /** voiceScore(v): higher = more human-sounding. */
  function voiceScore(v) {
    var n = v.name, s = 0;
    if (/natural|neural/i.test(n)) s += 60;            // e.g. "Microsoft Aria Online (Natural)" in Edge
    if (/premium/i.test(n)) s += 50;                   // macOS downloadable voices
    if (/enhanced|siri/i.test(n)) s += 40;
    if (/google/i.test(n)) s += 25;                    // Chrome's online Google voices
    if (GOOD_NAMES.test(n)) s += 20;
    if (/^en-US/i.test(v.lang)) s += 6; else if (/^en-GB/i.test(v.lang)) s += 4;
    if (!v.localService) s += 3;
    return s;
  }
  /** FN.voices(): English voices, most natural first (novelty voices removed). */
  FN.voices = function () {
    if (!("speechSynthesis" in window)) return [];
    return speechSynthesis.getVoices()
      .filter(function (v) { return /^en/i.test(v.lang) && !NOVELTY.test(v.name); })
      .sort(function (a, b) { return voiceScore(b) - voiceScore(a) || a.name.localeCompare(b.name); });
  };
  function chosenVoice() {
    var want = FN.store.get().settings.voice, list = FN.voices();
    return list.filter(function (v) { return v.voiceURI === want; })[0] || list[0] || null;
  }
  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = function () { if (FN.onVoices) FN.onVoices(); };

  /** FN.readable(el): the text a person would read out — skips buttons, chips, labels and icons. */
  var SKIP = "button, svg, select, input, textarea, .chips, .src, .legend, .slide-ref, .num, .tabs, .next-bar, .seg, .row, footer, details:not([open]) > :not(summary), [aria-hidden=true]";
  var BLOCK = /^(P|LI|H1|H2|H3|H4|DT|DD|DIV|SECTION|ARTICLE|BLOCKQUOTE|TR|HEADER)$/;
  FN.readable = function (el) {
    var out = [];
    (function walk(node) {
      if (node.nodeType === 3) { out.push(node.nodeValue); return; }
      if (node.nodeType !== 1 || node.matches(SKIP)) return;
      for (var c = node.firstChild; c; c = c.nextSibling) walk(c);
      if (BLOCK.test(node.tagName)) out.push("\n");
    })(el);
    return out.join("");
  };

  /** cleanForSpeech(text): replaces symbols/abbreviations with spoken words and ends each line as a sentence. */
  function cleanForSpeech(t) {
    return String(t)
      .replace(/https?:\/\/\S+/g, " ")
      .replace(/\s*(→|->|⇒)\s*/g, ", then ")
      .replace(/\s*[·•|]\s*/g, ", ")
      .replace(/\s*[–—]\s*/g, ", ")
      .replace(/\be\.g\.,?/gi, "for example,").replace(/\bi\.e\.,?/gi, "that is,").replace(/\betc\./gi, "and so on.")
      .replace(/\bvs\.?\s/gi, "versus ").replace(/\s&\s/g, " and ").replace(/≥/g, " at least ").replace(/≤/g, " at most ")
      .replace(/\(\s*slides?\s[\d,\s–-]+\)/gi, "")          // "(slide 12)" references are for the eye, not the ear
      .replace(/[“”"]/g, "")
      .split(/\n+/).map(function (l) { l = l.replace(/\s+/g, " ").trim(); return l && !/[.!?:;,]$/.test(l) ? l + "." : l; })
      .filter(Boolean).join(" ");
  }
  /** sentences(text): ≤ ~220-character pieces, split at sentence ends (then commas). */
  function sentences(t) {
    var parts = t.match(/[^.!?]+[.!?]+["')\]]*\s*|[^.!?]+$/g) || [t], out = [];
    parts.forEach(function (p) {
      p = p.trim(); if (!p) return;
      while (p.length > 220) { var cut = p.lastIndexOf(", ", 220); if (cut < 60) cut = p.lastIndexOf(" ", 220); out.push(p.slice(0, cut + 1)); p = p.slice(cut + 1).trim(); }
      out.push(p);
    });
    return out;
  }

  /**
   * FUNCTION: FN.speak(text, onDone)
   * PURPOSE: reads text aloud, one sentence at a time.
   *   1st choice: the free natural voice (Kokoro, js/voice.js) — sounds like a real person.
   *   Fallback:   the device's best built-in voice (if the natural voice is off or can't load).
   * OUTPUT: true if reading started. onDone() runs when it finishes or is stopped.
   */
  var speakId = 0, currentDone = null;
  function endCurrent() { var cb = currentDone; currentDone = null; FN.speaking = false; if (cb) cb(); }
  function useNatural() { return FN.store.get().settings.voiceEngine !== "device" && FN.natural && FN.natural.supported(); }
  function deviceSpeak(list, rate, finish) {
    if (!("speechSynthesis" in window)) { FN.toast("Read aloud is not available in this browser."); finish(); return; }
    var voice = chosenVoice();
    list.forEach(function (s, i) {
      var u = new SpeechSynthesisUtterance(s);
      if (voice) { u.voice = voice; u.lang = voice.lang; }
      u.rate = rate; u.pitch = 1;
      if (i === list.length - 1) { u.onend = finish; u.onerror = finish; }
      speechSynthesis.speak(u);
    });
  }
  FN.speak = function (text, onDone) {
    FN.stopSpeak();
    var st = FN.store.get().settings, list = sentences(cleanForSpeech(text)), rate = st.ttsRate || 0.95;
    if (!list.length) return false;
    var wantNatural = st.voiceEngine !== "device";
    // The natural voice was chosen but can't run here (e.g. index.html opened as a file):
    // explain how to fix it instead of silently switching to the robotic device voice.
    if (wantNatural && !useNatural()) { naturalHelp(null, list, rate); return false; }
    if (!wantNatural && !("speechSynthesis" in window)) { FN.toast("Read aloud is not available in this browser."); return false; }
    var id = ++speakId;
    FN.speaking = true; currentDone = onDone || null;
    function finish() { if (id === speakId) endCurrent(); }
    if (wantNatural) {
      FN.natural.speak(list, { voice: st.naturalVoice || "af_heart", speed: rate }, finish, function (reason) {
        if (id !== speakId) return;
        finish();
        naturalHelp(reason, list, rate);
      });
    } else deviceSpeak(list, rate, finish);
    return true;
  };

  /**
   * FUNCTION: naturalHelp(reason, sentences, rate)
   * PURPOSE: explains why the natural voice can't play and how to fix it.
   *   The basic (robotic) device voice is used ONLY if the student chooses it here.
   */
  function naturalHelp(reason, list, rate) {
    var asFile = location.protocol === "file:";
    FN.modal("<h3>" + FN.icon("headphones") + " The natural voice can’t play yet</h3>" +
      (asFile
        ? "<p>FocusNest was opened as a file, and browsers don’t allow the natural voice that way.</p><p><strong>Fix:</strong> close this tab, open the <code>focusnest</code> folder and double-click <strong>Start FocusNest</strong> (Mac: <code>Start FocusNest.command</code>, Windows: <code>Start FocusNest.bat</code>). The site opens with the human-sounding voice.</p>"
        : reason
          ? "<p>It didn’t load: <em>" + FN.esc(reason) + "</em></p><p>The first time, the voice downloads from the internet (then it works offline), so check your connection and try again. In Settings → Read aloud you can also pick “Smaller download”.</p>"
          : "<p>This browser can’t run the natural voice. Try an up-to-date Chrome, Edge or Safari.</p>") +
      '<div class="row">' + (!asFile && reason ? '<button class="btn btn-primary" id="nvRetry">' + FN.icon("rotate-ccw") + " Try again</button>" : "") +
      ("speechSynthesis" in window ? '<button class="btn btn-ghost" id="nvBasic">Use the basic voice this time</button>' : "") +
      '<button class="btn btn-ghost" data-close>Close</button></div>', function (m) {
      var r = m.querySelector("#nvRetry"), b = m.querySelector("#nvBasic");
      if (r) r.onclick = function () { FN.closeModal(); if (FN.natural) FN.natural.reset(); FN.speak(list.join(" ")); };
      if (b) b.onclick = function () {
        FN.closeModal(); FN.stopSpeak();
        var id = ++speakId; FN.speaking = true;
        deviceSpeak(list, rate, function () { if (id === speakId) endCurrent(); });
      };
    });
  }
  FN.stopSpeak = function () {
    speakId++;
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    if (FN.natural) FN.natural.stop();
    endCurrent();
  };
  FN.speechTest = { cleanForSpeech: cleanForSpeech, sentences: sentences, voiceScore: voiceScore };
})();
