/* =====================================================================
   FILE: js/tutor.js
   PURPOSE (beginner summary):
     "Ask FocusNest" — a collapsible help panel for the lesson you are on.
     It answers ONLY from your slides and lesson notes: it finds the slides
     that match your question (preferring the chapter you are studying) and
     shows them with slide numbers. If nothing matches, it says so — it never
     guesses. Everything happens in the browser; nothing is sent anywhere.
   QUICK ACTIONS: explain simply · another example · step by step · quiz me ·
     summarize · compare two concepts · prerequisites.
   DEPENDENCIES: js/ui.js, js/course.js, js/quiz.js.
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var esc = FN.esc, ctx = null;

  var STOP = "the a an and or of to in on for is are was be by with as at it this that what why how which do does from can i you your me my".split(" ");
  function terms(s) { return String(s).toLowerCase().replace(/[^a-z0-9\- ]+/g, " ").split(/\s+/).filter(function (w) { return w.length > 2 && STOP.indexOf(w) < 0; }); }

  /** chapterNow(): the chapter the panel talks about — the open lesson's, or the chosen chapter. */
  function chapterNow() { return ctx ? ctx.chapter : FN.courses.activeChapter(); }

  /**
   * FUNCTION: search(course, question, topic, limit)
   * PURPOSE: scores every slide (title, text, speaker notes) by shared words with the question.
   *   Slides of the chapter being studied, and of the open topic, get a boost.
   * OUTPUT: top matches [{slide, deck, score, snippet}] with score ≥ 2, else [].
   */
  function search(course, q, topic, limit) {
    var qt = terms(q); if (!qt.length) return [];
    var hits = [], here = chapterNow();
    (course.decks || []).forEach(function (d) {
      d.slides.forEach(function (s) {
        var body = (s.title + " " + s.text.join(" ") + " " + (s.notes || "")).toLowerCase(), score = 0;
        qt.forEach(function (w) { if (body.indexOf(w) >= 0) score += s.title.toLowerCase().indexOf(w) >= 0 ? 2 : 1; });
        if (score && here && here.deck === d.id) score += 1;
        if (topic && ctx && ctx.chapter.deck === d.id && topic.slides.indexOf(s.n) >= 0) score += 0.5;
        if (score >= 2) {
          var lines = s.text.concat((s.notes || "").split(/(?<=[.!?])\s+/));
          var best = lines.map(function (l) { var sc = 0; qt.forEach(function (w) { if (l.toLowerCase().indexOf(w) >= 0) sc++; }); return { l: l, sc: sc }; }).sort(function (a, b) { return b.sc - a.sc; })[0];
          hits.push({ slide: s.n, deck: d.id, deckName: d.name, title: s.title, score: score, snippet: best && best.sc ? best.l : s.text[0] || s.title });
        }
      });
    });
    return hits.sort(function (a, b) { return b.score - a.score; }).slice(0, limit || 3);
  }

  var log = [];
  function say(who, html) { log.push({ who: who, html: html }); draw(); }

  function draw() {
    var el = document.getElementById("tutor"); if (!el || el.hidden) return;
    var t = ctx && ctx.topic, ch = chapterNow();
    el.innerHTML =
      '<div class="tutor-head"><div><strong>' + FN.icon("sparkles") + ' Ask FocusNest</strong><small>' + (t ? esc(t.title) : ch ? esc(ch.title) : "Choose a chapter to ask about it") + "</small></div>" +
      '<div class="row tight">' + (log.length ? '<button class="icon-btn" data-tu="clear" title="Clear" aria-label="Clear the conversation">' + FN.icon("rotate-ccw") + "</button>" : "") +
      '<button class="icon-btn" data-tu="close" aria-label="Close tutor">' + FN.icon("x") + "</button></div></div>" +
      '<p class="tutor-mode">' + FN.icon("file-search") + " Answers come only from your slides and lesson notes.</p>" +
      (t ? '<div class="tutor-actions">' +
        [["simple", "Explain this more simply"], ["example", "Give me another example"], ["steps", "Walk me through it step by step"], ["quiz", "Quiz me on this"], ["summary", "Summarize this section"], ["compare", "Compare two concepts"], ["prereq", "What do I need to know first?"]]
          .map(function (a) { return '<button class="chip" data-act="' + a[0] + '">' + a[1] + "</button>"; }).join("") + "</div>" : "") +
      '<div class="tutor-log" aria-live="polite">' + log.map(function (m) { return '<div class="msg ' + m.who + '">' + m.html + "</div>"; }).join("") + "</div>" +
      '<form class="tutor-form"><input type="text" maxlength="400" placeholder="' + (t ? "Ask about this lesson…" : "Ask about the course…") + '" aria-label="Your question"><button class="btn btn-primary" aria-label="Send">' + FN.icon("send") + "</button></form>";
    FN.icons();
    var lg = el.querySelector(".tutor-log"); lg.scrollTop = lg.scrollHeight;
  }

  function section() {
    var t = ctx.topic, id = ctx.section;
    return t.notes.filter(function (n) { return n.id === id; })[0] || t.notes[0];
  }
  function ref(slides) { return FN.slideChips(slides); }

  /**
   * FUNCTION: action(kind)
   * PURPOSE: quick-action answers built from the lesson data.
   */
  function action(kind) {
    var t = ctx.topic, n = section(), out = "";
    var label = { simple: "Explain this more simply", example: "Give me another example", steps: "Walk me through it step by step", quiz: "Quiz me on this", summary: "Summarize this section", compare: "Compare two concepts", prereq: "What do I need to know first?" }[kind];
    say("me", esc(label));
    if (kind === "simple") out = "<p><strong>" + esc(n.heading) + "</strong></p><p>" + esc(n.simple) + "</p>" + FN.badgeAI + ref(n.slides);
    if (kind === "summary") out = "<p><strong>Summary — " + esc(n.heading) + "</strong></p><ul>" + (n.exam || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" + ref(n.slides);
    if (kind === "example") {
      var ex = (t.examples || []).concat((n.examples || []).map(function (e) { return { concept: n.heading, example: e }; }));
      var e = ex[Math.floor(Math.random() * ex.length)];
      out = e ? "<p><strong>" + esc(e.concept) + "</strong></p><p>" + esc(e.example) + "</p>" + (e.walkthrough ? "<ol>" + e.walkthrough.map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ol>" : "") + FN.badgeAI : "<p>The slides for this topic contain no examples, and I won't invent one.</p>";
    }
    if (kind === "steps") {
      out = (t.steps || []).length ? "<ol>" + t.steps.map(function (s) { return "<li><strong>" + esc(s.title) + "</strong> — " + esc(s.what) + "</li>"; }).join("") + '</ol><p><a href="#/learn/' + esc(t.id) + '/steps">Open the interactive step-by-step tab →</a></p>'
        : "<p>This topic is not a process, so here are its sections in learning order:</p><ol>" + t.notes.map(function (x) { return "<li>" + esc(x.heading) + "</li>"; }).join("") + "</ol>";
    }
    if (kind === "quiz") {
      var pool = (t.quiz || []).filter(function (q) { return q.type === "mcq" || q.type === "tf"; });
      var q = pool[Math.floor(Math.random() * pool.length)];
      if (q) {
        out = '<div class="tq" data-qid="' + esc(q.id) + '"><p>' + esc(q.prompt) + "</p>" + (q.type === "mcq" ? q.options.map(function (o, k) { return '<button class="opt" data-tq="' + k + '">' + esc(o) + "</button>"; }).join("") : '<button class="opt" data-tq="true">True</button><button class="opt" data-tq="false">False</button>') + '<p class="tq-fb"></p></div>';
      } else out = "<p>No quick questions for this topic.</p>";
    }
    if (kind === "compare") {
      var vocab = (t.overview.vocabulary || []);
      out = vocab.length >= 2 ? '<p>Pick two concepts from this lesson:</p><div class="cmp-pick"><select data-c1>' + vocab.map(function (v, k) { return "<option value=\"" + k + "\">" + esc(v.term) + "</option>"; }).join("") + '</select><select data-c2>' + vocab.map(function (v, k) { return "<option value=\"" + k + "\"" + (k === 1 ? " selected" : "") + ">" + esc(v.term) + "</option>"; }).join("") + '</select><button class="btn btn-soft" data-cmp>Compare</button></div>' : "<p>This lesson has too few defined terms to compare.</p>";
    }
    if (kind === "prereq") {
      var all = FN.courses.topics(), before = all.filter(function (x) { return x.index < ctx.index; });
      var mine = (t.overview.vocabulary || []).map(function (v) { return v.term.toLowerCase(); });
      var used = [];
      before.forEach(function (b) { (b.topic.overview.vocabulary || []).forEach(function (v) { var w = v.term.toLowerCase(); var text = JSON.stringify(t.notes).toLowerCase(); if (mine.indexOf(w) < 0 && text.indexOf(w) >= 0 && used.length < 6) used.push({ v: v, topic: b.topic }); }); });
      out = (before.length ? "<p><strong>Earlier topics in this course:</strong></p><ul>" + before.slice(-3).map(function (b) { return '<li><a href="#/learn/' + esc(b.topic.id) + '/overview">' + esc(b.topic.title) + "</a></li>"; }).join("") + "</ul>" : "<p>This is the first topic — no earlier lessons are needed.</p>") +
        (used.length ? "<p><strong>Terms from earlier lessons that appear here:</strong></p><ul>" + used.map(function (u) { return "<li><strong>" + esc(u.v.term) + "</strong> — " + esc(u.v.def) + "</li>"; }).join("") + "</ul>" : "");
    }
    say("bot", out);
  }

  /**
   * FUNCTION: ask(question)
   * PURPOSE: free-text question → matching slide excerpts with slide numbers.
   * FAILURE: nothing matches → says so instead of guessing.
   */
  function ask(q) {
    say("me", esc(q));
    var hits = search(FN.courses.active(), q, ctx && ctx.topic);
    if (!hits.length) { say("bot", "<p>I couldn't find this in your slides, so I won't guess. Try different words, or check the original slides.</p>"); return; }
    say("bot", "<p>Here is what your slides say:</p>" + hits.map(function (h) {
      var owner = FN.courses.chapters().filter(function (c) { return c.deck === h.deck; })[0];
      return "<blockquote>" + esc(h.snippet) + "<footer>" + esc(h.title) + " · " + (ctx && h.deck === ctx.chapter.deck ? FN.slideChips([h.slide]) : esc(owner ? owner.title.split(" · ")[0] : h.deckName) + " slide " + h.slide) + "</footer></blockquote>";
    }).join("") + FN.badgeSlides);
  }

  function toggle(force) {
    var el = document.getElementById("tutor"), btn = document.getElementById("tutorBtn");
    var show = force === undefined ? el.hidden : force;
    el.hidden = !show; btn.setAttribute("aria-expanded", show);
    document.getElementById("app").classList.toggle("tutor-open", show);
    if (show) { draw(); var i = el.querySelector("input"); if (i) i.focus(); }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var el = document.getElementById("tutor");
    document.getElementById("tutorBtn").addEventListener("click", function () { toggle(); });
    // Tutor buttons: quick actions, close, clear, compare, inline quiz answers, slide chips.
    el.addEventListener("click", function (e) {
      if (e.target.closest('[data-tu="close"]')) return toggle(false);
      if (e.target.closest('[data-tu="clear"]')) { log = []; draw(); return; }
      var a = e.target.closest("[data-act]"); if (a && ctx) return action(a.dataset.act);
      if (e.target.closest("[data-cmp]")) {
        var v = ctx.topic.overview.vocabulary, x = v[+el.querySelector("[data-c1]").value], y = v[+el.querySelector("[data-c2]").value];
        say("bot", '<div class="cmp-two"><div><strong>' + esc(x.term) + "</strong><p>" + esc(x.def) + "</p>" + ref([x.slide].filter(Boolean)) + "</div><div><strong>" + esc(y.term) + "</strong><p>" + esc(y.def) + "</p>" + ref([y.slide].filter(Boolean)) + "</div></div>");
        return;
      }
      var tq = e.target.closest("[data-tq]");
      if (tq) {
        var box = tq.closest(".tq"), q = ctx.topic.quiz.filter(function (z) { return z.id === box.dataset.qid; })[0];
        if (box.dataset.done) return; box.dataset.done = 1;
        var val = q.type === "tf" ? tq.dataset.tq === "true" : +tq.dataset.tq, ok = FN.quiz.grade(q, val);
        tq.classList.add(ok ? "right" : "wrong");
        box.querySelector(".tq-fb").textContent = (ok ? "Correct! " : "Not quite. ") + q.explain;
        return;
      }
      var chip = e.target.closest("[data-slide]"); if (chip && FN.lesson) FN.lesson.openSlide(+chip.dataset.slide);
    });
    el.addEventListener("submit", function (e) { e.preventDefault(); var i = el.querySelector("input"), v = i.value.trim(); if (v) { i.value = ""; ask(v); } });
  });

  /** setContext(): called when a lesson opens. A new topic starts a fresh conversation. */
  FN.tutor = { setContext: function (c) { if (!ctx || !c || ctx.topic.id !== c.topic.id) log = []; ctx = c; draw(); }, toggle: toggle, search: search };
})();
