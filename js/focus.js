/* =====================================================================
   FILE: js/focus.js
   PURPOSE (beginner summary): the attention-support tools.
     1. Focus Mode + Microlearning — a full-screen, clutter-free view that
        shows ONE short block (2–5 min) at a time. Each block ends with one
        key takeaway, one quick recall question and a clear Continue button.
     2. Flexible Pomodoro timer — presets 5/2, 15/5, 25/5 or your own.
     3. Brain breaks — stretching, breathing, screen rest, movement.
     4. Distraction parking lot — jot a thought down without leaving the lesson.
   DEPENDENCIES: js/ui.js, js/store.js.
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var esc = FN.esc;

  /* ================= 1. FOCUS MODE + MICROLEARNING ================= */
  /**
   * FUNCTION: FN.focus.open(topic, startIndex)
   * PURPOSE: builds micro-blocks from the topic's note sections and shows them one by one.
   * USER ACTION: "Focus mode" button in a lesson (or key F).
   * EXPECTED WEBSITE RESULT: sidebar/outline/tabs disappear; one block + Continue.
   * FAILURE: topic with no notes → toast
   */
  function open(topic, startAt) {
    var layer = document.getElementById("focusLayer");
    var blocks = (topic.notes || []).map(function (n, k) {
      var q = (topic.quiz || []).filter(function (x) { return x.section === n.id && (x.type === "mcq" || x.type === "tf"); })[0];
      var card = !q && (topic.flashcards || []).filter(function (c) { return n.slides.indexOf(c.slide) >= 0; })[0];
      return { note: n, takeaway: (n.exam && n.exam[0]) || n.simple, q: q, card: card, index: k };
    });
    if (!blocks.length) { FN.toast("This topic has no note blocks yet."); return; }
    var i = Math.max(0, Math.min(startAt || 0, blocks.length - 1)), answered = false, doneSet = {};
    document.body.classList.add("in-focus");
    layer.hidden = false;
    function draw() {
      var b = blocks[i], n = b.note, mins = Math.max(2, Math.min(5, Math.round((n.simple + " " + (n.deep || "")).split(/\s+/).length / 120) + 2));
      answered = false;
      var recall = "";
      if (b.q && b.q.type === "mcq") recall = b.q.options.map(function (o, k) { return '<button class="opt" data-ans="' + k + '">' + esc(o) + "</button>"; }).join("");
      else if (b.q) recall = '<button class="opt" data-ans="true">True</button><button class="opt" data-ans="false">False</button>';
      else if (b.card) recall = '<button class="opt" data-reveal>Show answer</button>';
      layer.innerHTML =
        '<div class="focus-wrap"><div class="focus-top"><span class="muted">' + esc(topic.title) + "</span>" +
        '<div class="focus-dots" aria-label="Block ' + (i + 1) + " of " + blocks.length + '">' + blocks.map(function (x, k) { return '<span class="' + (k < i || doneSet[k] ? "done" : k === i ? "on" : "") + '"></span>'; }).join("") + "</div>" +
        '<button class="btn btn-ghost" data-f="close">' + FN.icon("minimize-2") + " Exit focus</button></div>" +
        '<article class="focus-card"><p class="muted small">Block ' + (i + 1) + " of " + blocks.length + " · about " + mins + " min " + FN.slideChips(n.slides) + "</p><h2>" + esc(n.heading) + "</h2>" +
        "<p class=\"lead\">" + esc(n.simple) + "</p>" +
        ((n.fromSlides || []).length ? '<div class="from">' + FN.badgeSlides + "<ul>" + n.fromSlides.slice(0, 3).map(function (f) { return "<li>" + esc(f.text) + "</li>"; }).join("") + "</ul></div>" : "") +
        '<div class="takeaway">' + FN.icon("lightbulb") + " <div><strong>Key takeaway</strong><p>" + esc(b.takeaway) + "</p></div></div>" +
        (recall ? '<div class="recall"><strong>Quick recall</strong><p>' + esc(b.q ? b.q.prompt : b.card.front) + '</p><div class="opts-row">' + recall + '</div><div class="feedback" aria-live="polite"></div></div>' : "") +
        '<div class="row focus-next">' + (i > 0 ? '<button class="btn btn-ghost" data-f="prev">' + FN.icon("arrow-left") + " Back</button>" : "") +
        '<button class="btn btn-primary btn-lg" data-f="next">' + (i < blocks.length - 1 ? "Continue " + FN.icon("arrow-right") : "Finish " + FN.icon("check")) + "</button></div></article></div>";
      FN.icons();
      layer.querySelector('[data-f="next"]').focus({ preventScroll: true }); layer.scrollTop = 0;
    }
    function close() {
      layer.hidden = true; layer.innerHTML = ""; document.body.classList.remove("in-focus");
      document.removeEventListener("keydown", keys);
    }
    function keys(e) { if (e.key === "Escape" && !layer.hidden) close(); }
    document.addEventListener("keydown", keys);
    layer.onclick = function (e) {
      var b = e.target.closest("[data-f],[data-ans],[data-reveal]"); if (!b) return;
      var blk = blocks[i], fb = layer.querySelector(".feedback");
      if (b.hasAttribute("data-reveal")) { fb.className = "feedback ok"; fb.textContent = blk.card.back; answered = true; return; }
      if (b.dataset.ans !== undefined && !answered) {
        var val = blk.q.type === "tf" ? b.dataset.ans === "true" : +b.dataset.ans, ok = FN.quiz.grade(blk.q, val);
        answered = true; b.classList.add(ok ? "right" : "wrong");
        fb.className = "feedback " + (ok ? "ok" : "no");
        fb.textContent = (ok ? "Correct! " : "Not quite. ") + blk.q.explain;
        return;
      }
      if (b.dataset.f === "close") return close();
      if (b.dataset.f === "prev") { i--; return draw(); }
      if (b.dataset.f === "next") {
        if (!doneSet[i]) {
          doneSet[i] = true;
          FN.store.update(function (s) { FN.store.topic(topic.id).sections[blk.note.id] = true; });
          FN.store.addXP(FN.store.XP.micro, "block done");
        }
        if (i < blocks.length - 1) { i++; draw(); }
        else { close(); FN.toast("Focus session complete — " + blocks.length + " blocks."); if (FN.onFocusDone) FN.onFocusDone(); }
      }
    };
    draw();
  }

  /* ================= 2. POMODORO TIMER ================= */
  // Timer state survives re-renders; it uses real clock time so it does not drift.
  var T = { phase: "idle", endAt: 0, left: 0, running: false, tick: null };
  var PRESETS = [[5, 2], [15, 5], [25, 5]];

  function fmt(ms) { var s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0"); }

  /**
   * FUNCTION: renderTimerChip()
   * PURPOSE: draws the small timer in the top bar.
   */
  function renderTimerChip() {
    var el = document.getElementById("timerChip"); if (!el) return;
    var cfg = FN.store.get().timer, label = T.phase === "idle" ? cfg.focus + "/" + cfg.brk : fmt(T.running ? T.endAt - Date.now() : T.left);
    el.innerHTML = '<button class="timer-chip ' + T.phase + (T.running ? " run" : "") + '" id="timerOpen" aria-label="Focus timer ' + label + '">' + FN.icon(T.phase === "break" ? "coffee" : "timer") + "<span>" + label + "</span></button>";
    FN.icons();
  }

  /**
   * FUNCTION: startTimer(phase)
   * PURPOSE: starts (or resumes) a focus or break countdown.
   */
  function startTimer(phase) {
    var cfg = FN.store.get().timer;
    if (phase) { T.phase = phase; T.left = (phase === "focus" ? cfg.focus : cfg.brk) * 60e3; }
    T.endAt = Date.now() + T.left; T.running = true;
    clearInterval(T.tick);
    T.tick = setInterval(function () {
      if (Date.now() >= T.endAt) return finish();
      renderTimerChip(); updatePanel();
    }, 1000);
    renderTimerChip(); updatePanel();
  }
  function pauseTimer() { T.left = T.endAt - Date.now(); T.running = false; clearInterval(T.tick); renderTimerChip(); updatePanel(); }
  function resetTimer() { clearInterval(T.tick); T = { phase: "idle", endAt: 0, left: 0, running: false, tick: null }; renderTimerChip(); updatePanel(); }

  /**
   * FUNCTION: finish()
   * PURPOSE: called when a countdown reaches 0.
   * USER-VISIBLE: chime + brain-break suggestion; break starts when you choose.
   */
  function finish() {
    clearInterval(T.tick); T.running = false;
    var cfg = FN.store.get().timer;
    try { var a = new (window.AudioContext || window.webkitAudioContext)(), o = a.createOscillator(), g = a.createGain(); o.frequency.value = 660; g.gain.value = 0.05; o.connect(g); g.connect(a.destination); o.start(); o.stop(a.currentTime + 0.35); } catch (e) {}
    if (T.phase === "focus") {
      FN.store.logStudy(cfg.focus); FN.store.addXP(FN.store.XP.focus, "focus session"); FN.store.award("focus-finisher");
      T.phase = "idle"; renderTimerChip();
      brainBreak(true);
    } else { T.phase = "idle"; renderTimerChip(); FN.toast("Break over — ready when you are."); }
  }

  function updatePanel() {
    var p = document.querySelector(".timer-panel"); if (!p) return;
    p.querySelector(".big-time").textContent = T.phase === "idle" ? FN.store.get().timer.focus + ":00" : fmt(T.running ? T.endAt - Date.now() : T.left);
    p.querySelector(".phase").textContent = T.phase === "idle" ? "Ready" : T.phase === "focus" ? "Focus" : "Break";
    p.querySelector('[data-t="toggle"]').textContent = T.running ? "Pause" : T.phase === "idle" ? "Start focus" : "Resume";
  }

  /**
   * FUNCTION: openTimer()
   * PURPOSE: timer panel with presets and custom minutes.
   * Buttons: presets (set length) · Start/Pause/Resume · Reset · Break now.
   */
  function openTimer() {
    var cfg = FN.store.get().timer;
    FN.modal('<div class="timer-panel"><h3>' + FN.icon("timer") + ' Focus timer</h3><p class="muted">Short sessions count. Pick what feels doable today.</p>' +
      '<div class="presets">' + PRESETS.map(function (p) { return '<button class="chip' + (cfg.focus === p[0] && cfg.brk === p[1] ? " on" : "") + '" data-p="' + p.join(",") + '">' + p[0] + " min focus / " + p[1] + " break</button>"; }).join("") + "</div>" +
      '<div class="custom"><label>Focus <input type="number" min="1" max="120" data-c="focus" value="' + cfg.focus + '"> min</label><label>Break <input type="number" min="1" max="60" data-c="brk" value="' + cfg.brk + '"> min</label></div>' +
      '<div class="big-time" aria-live="off"></div><p class="phase muted"></p>' +
      '<div class="row center"><button class="btn btn-primary btn-lg" data-t="toggle"></button><button class="btn btn-ghost" data-t="reset">Reset</button><button class="btn btn-soft" data-t="break">' + FN.icon("coffee") + " Brain break</button></div></div>", function (m) {
      updatePanel();
      m.onclick = function (e) {
        var p = e.target.closest("[data-p]");
        if (p) { var v = p.dataset.p.split(","); FN.store.update(function (s) { s.timer = { focus: +v[0], brk: +v[1] }; }); FN.closeModal(); openTimer(); resetTimer(); return; }
        var t = e.target.closest("[data-t]"); if (!t) return;
        if (t.dataset.t === "toggle") { if (T.running) pauseTimer(); else startTimer(T.phase === "idle" ? "focus" : null); }
        if (t.dataset.t === "reset") resetTimer();
        if (t.dataset.t === "break") { FN.closeModal(); brainBreak(false); }
      };
      m.onchange = function (e) {
        var c = e.target.dataset.c; if (!c) return;
        var v = Math.max(1, Math.min(c === "focus" ? 120 : 60, parseInt(e.target.value, 10) || 1));
        FN.store.update(function (s) { s.timer[c] = v; }); if (T.phase === "idle") updatePanel(); renderTimerChip();
      };
    });
  }

  /* ================= 3. BRAIN BREAKS ================= */
  var BREAKS = [
    { id: "breathing", icon: "wind", title: "Box breathing", text: "Breathe in for 4, hold for 4, out for 4, hold for 4. Follow the circle." },
    { id: "stretch", icon: "person-standing", title: "Stretch", text: "Roll your shoulders back 5 times. Reach both arms up, then slowly fold forward. Turn your head gently left and right." },
    { id: "eyes", icon: "eye", title: "Screen rest (20-20-20)", text: "Look at something about 6 metres (20 feet) away for 20 seconds. Blink slowly a few times." },
    { id: "move", icon: "footprints", title: "Move", text: "Stand up, walk to get a glass of water, or do 10 gentle squats or marching steps." }
  ];
  /**
   * FUNCTION: brainBreak(afterFocus)
   * PURPOSE: offers 4 short, optional break activities.
   */
  function brainBreak(afterFocus) {
    var cfg = FN.store.get().timer;
    FN.modal('<div class="breaks"><h3>' + (afterFocus ? "Nice focus session! " : "") + "Time for a brain break?</h3><p class=\"muted\">Optional. " + cfg.brk + " minutes is plenty.</p>" +
      '<div class="break-grid">' + BREAKS.map(function (b) { return '<button class="break-card" data-b="' + b.id + '">' + FN.icon(b.icon) + "<strong>" + b.title + "</strong></button>"; }).join("") + "</div>" +
      '<div class="break-body"></div><div class="row center"><button class="btn btn-ghost" data-close>Skip for now</button></div></div>', function (m) {
      m.onclick = function (e) {
        var c = e.target.closest("[data-b]"); if (!c) return;
        var b = BREAKS.filter(function (x) { return x.id === c.dataset.b; })[0];
        m.querySelector(".break-body").innerHTML = (b.id === "breathing" ? '<div class="breath" aria-hidden="true"><span></span></div>' : "") + "<p>" + esc(b.text) + "</p>";
        FN.$$(".break-card", m).forEach(function (x) { x.classList.toggle("on", x === c); });
        startTimer("break");
      };
    });
  }

  /* ================= 4. DISTRACTION PARKING LOT ================= */
  /**
   * FUNCTION: openParkingLot()
   * PURPOSE: quick scratchpad; Enter saves the thought and you go straight back.
   */
  function openParkingLot() {
    function list() {
      var p = FN.store.get().parking;
      return p.length ? "<ul class=\"park-list\">" + p.slice().reverse().map(function (x, k) { return "<li><span>" + esc(x.text) + '</span><button class="icon-btn" data-del="' + (p.length - 1 - k) + '" aria-label="Remove">' + FN.icon("check") + "</button></li>"; }).join("") + "</ul>" : '<p class="muted">Nothing parked. Your mind is clear!</p>';
    }
    FN.modal('<div class="park"><h3>' + FN.icon("sticky-note") + ' Parking lot</h3><p class="muted">Got a distracting thought? Park it here and come back to it later.</p>' +
      '<form class="row" data-park><input type="text" maxlength="200" placeholder="e.g. reply to Sara, buy batteries…" aria-label="Thought to park"><button class="btn btn-primary">Park it</button></form><div class="park-items">' + list() + "</div></div>", function (m) {
      m.querySelector("form").onsubmit = function (e) {
        e.preventDefault(); var inp = m.querySelector("input"), v = inp.value.trim(); if (!v) return;
        FN.store.update(function (s) { s.parking.push({ text: v, at: Date.now() }); });
        FN.store.award("parked");
        inp.value = ""; m.querySelector(".park-items").innerHTML = list(); FN.icons();
        FN.toast("Parked. Back to learning!"); setTimeout(FN.closeModal, 500);
      };
      m.onclick = function (e) { var d = e.target.closest("[data-del]"); if (d) { FN.store.update(function (s) { s.parking.splice(+d.dataset.del, 1); }); m.querySelector(".park-items").innerHTML = list(); FN.icons(); } };
    });
  }

  FN.focus = { open: open, openTimer: openTimer, renderTimerChip: renderTimerChip, brainBreak: brainBreak, openParkingLot: openParkingLot, timerState: function () { return T; } };
})();
