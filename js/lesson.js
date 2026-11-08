/* =====================================================================
   FILE: js/lesson.js
   PURPOSE (beginner summary):
     Draws one topic (lesson) in the right-hand workspace with 7 tabs:
       1 Overview · 2 Notes (Explain Simply / Understand Deeply / Exam Prep)
       3 Step-by-Step · 4 Visual · 5 Examples · 6 Flashcards · 7 Quiz
     Plus: the original slides beside the lesson, bookmarks, highlighting,
     personal notes, read-aloud, reading progress and "resume where I left off".
   ADDRESS FORMAT: #/learn/<topicId>/<tab>/<sectionId?>
   DEPENDENCIES: ui.js, course.js, store.js, visuals.js, quiz.js,
     flashcards.js, focus.js, tutor.js.
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var esc = FN.esc;
  var TABS = [["overview", "Overview", "compass"], ["notes", "Notes", "notebook-text"], ["steps", "Step-by-Step", "footprints"], ["visual", "Visual", "network"], ["examples", "Examples", "globe"], ["flashcards", "Flashcards", "layers"], ["quiz", "Quiz", "list-checks"]];
  var cur = null;          // { course, chapter, topic, index, tab, section }
  var noteMode = "simple";
  var side = null;         // "slides" | "mynotes" | null
  var slideAt = null;

  function P() { return FN.store.topic(cur.topic.id); }
  function sectionName(id, topicId) {
    var t = topicId ? FN.courses.find(topicId).topic : cur.topic;
    var n = (t.notes || []).filter(function (x) { return x.id === id; })[0];
    return n ? (topicId && topicId !== cur.topic.id ? t.title + " → " : "") + n.heading : id;
  }

  /**
   * FUNCTION: FN.lesson.show(topicId, tab, section)
   * PURPOSE: entry point called by the router.
   * FAILURE: unknown topic id → "lesson not found" message
   */
  function show(topicId, tab, section) {
    var hit = FN.courses.find(topicId);
    var view = document.getElementById("view");
    if (!hit) { view.innerHTML = '<div class="empty"><p>That lesson was not found. It may belong to a deleted course.</p><a class="btn btn-primary" href="#/dashboard">Go to dashboard</a></div>'; return; }
    tab = TABS.some(function (t) { return t[0] === tab; }) ? tab : "overview";
    var newTopic = !cur || cur.topic.id !== topicId;
    if (hit.chapter.id !== FN.store.get().activeChapter) FN.courses.setChapter(hit.chapter.id);
    cur = Object.assign({}, hit, { tab: tab, section: section || null });
    if (newTopic) {
      side = side === "mynotes" ? "mynotes" : null;
      FN.store.award("first-steps");
    }
    FN.store.update(function (s) {
      var p = FN.store.topic(topicId);
      if (!p.tabs[tab]) { p.tabs[tab] = true; s.xp += FN.store.XP.tab; }
      s.resume = { hash: "#/learn/" + topicId + "/" + tab + (section ? "/" + section : ""), topic: topicId, at: Date.now() };
    });
    if (Object.keys(P().tabs).length === TABS.length) FN.store.award("explorer");
    FN.tutor.setContext({ course: hit.course, chapter: hit.chapter, topic: hit.topic, index: hit.index, section: section });
    render();
  }

  function render() {
    var t = cur.topic, p = P(), view = document.getElementById("view");
    FN.visuals.stop();
    var bm = FN.store.get().bookmarks.some(function (b) { return b.topic === t.id && !b.section; });
    var done = Object.keys(p.sections).length;
    view.innerHTML =
      '<div class="lesson' + (side ? " with-side" : "") + '">' +
      '<div class="lesson-main">' +
      '<header class="lesson-head"><p class="crumb">' + esc(cur.chapter.title) + (t.generated === "heuristic" ? ' <span class="pill">Built from slide text</span>' : t.generated === "ai" ? ' <span class="pill pill-ai">AI-structured</span>' : "") + "</p>" +
      "<h1>" + esc(t.title) + "</h1>" +
      '<div class="lesson-meta"><span>' + FN.icon("clock") + " ~" + (t.minutes || 10) + " min</span><span>" + FN.icon("presentation") + " Slides " + (t.slides.length ? Math.min.apply(null, t.slides) + "–" + Math.max.apply(null, t.slides) : "—") + "</span>" +
      "<span>" + FN.icon("check-check") + " " + done + "/" + t.notes.length + " sections understood</span>" + (p.complete ? '<span class="pill pill-easy">' + FN.icon("badge-check") + " Completed</span>" : p.quizBest ? '<span class="pill">Best quiz ' + p.quizBest + "%</span>" : "") + "</div>" +
      '<div class="lesson-actions">' +
      // Focus mode button → FN.focus.open.
      '<button class="btn btn-primary" data-l="focus">' + FN.icon("maximize-2") + " Focus mode</button>" +
      // Slides button → side panel with original slides. No event.
      '<button class="btn btn-soft' + (side === "slides" ? " on" : "") + '" data-l="slides" aria-pressed="' + (side === "slides") + '">' + FN.icon("presentation") + " Original slides</button>" +
      // My notes → personal note side panel (autosaves on this device)
      '<button class="btn btn-soft' + (side === "mynotes" ? " on" : "") + '" data-l="mynotes" aria-pressed="' + (side === "mynotes") + '">' + FN.icon("pencil-line") + " My notes</button>" +
      // Bookmark → saves this lesson to My Notes
      '<button class="icon-btn' + (bm ? " on" : "") + '" data-l="bookmark" aria-pressed="' + bm + '" title="Bookmark this lesson">' + FN.icon("bookmark") + "</button>" +
      // Read aloud → browser text-to-speech
      '<button class="icon-btn" data-l="tts" title="Read this tab aloud">' + FN.icon("volume-2") + "</button></div></header>" +
      '<nav class="tabs" role="tablist" aria-label="Lesson tabs">' + TABS.map(function (x, k) {
        var seen = p.tabs[x[0]];
        return '<a role="tab" href="#/learn/' + esc(t.id) + "/" + x[0] + '" aria-selected="' + (x[0] === cur.tab) + '" class="' + (seen ? "seen" : "") + '">' + FN.icon(x[2]) + "<span>" + (k + 1) + ". " + x[1] + "</span></a>";
      }).join("") + "</nav>" +
      '<div class="lesson-content" id="lessonContent"></div>' +
      nextBar() +
      "</div>" +
      (side ? '<aside class="lesson-side" id="lessonSide"></aside>' : "") + "</div>";
    var box = document.getElementById("lessonContent");
    ({ overview: tabOverview, notes: tabNotes, steps: tabSteps, visual: tabVisual, examples: tabExamples, flashcards: tabCards, quiz: tabQuiz })[cur.tab](box);
    if (side) drawSide();
    markHighlights(box);
    FN.icons();
    if (cur.section) { var s = document.getElementById("sec-" + cur.section); if (s) { s.scrollIntoView({ block: "start" }); s.classList.add("flash"); } }
    else view.scrollTop = 0;
    document.getElementById("topbarTitle").textContent = t.title;
  }

  function nextBar() {
    var k = TABS.map(function (x) { return x[0]; }).indexOf(cur.tab), t = cur.topic;
    var all = FN.courses.topics(cur.course), nextTopic = all[cur.index + 1];
    var next = k < TABS.length - 1 ? '<a class="btn btn-primary" href="#/learn/' + esc(t.id) + "/" + TABS[k + 1][0] + '">Next: ' + TABS[k + 1][1] + " " + FN.icon("arrow-right") + "</a>"
      : nextTopic && nextTopic.chapter === cur.chapter ? '<a class="btn btn-primary" href="#/learn/' + esc(nextTopic.topic.id) + '/overview">Next topic: ' + esc(nextTopic.topic.title) + " " + FN.icon("arrow-right") + "</a>"
      : '<a class="btn btn-primary" href="#/practice/ch-' + esc(cur.chapter.id) + '">End of chapter — take the chapter quiz ' + FN.icon("trophy") + "</a>";
    return '<div class="next-bar">' + (k > 0 ? '<a class="btn btn-ghost" href="#/learn/' + esc(t.id) + "/" + TABS[k - 1][0] + '">' + FN.icon("arrow-left") + " " + TABS[k - 1][1] + "</a>" : "<span></span>") + next + "</div>";
  }

  /* ---------------- TAB 1: OVERVIEW ---------------- */
  function tabOverview(box) {
    var o = cur.topic.overview;
    box.innerHTML =
      (o.hook ? '<p class="hook">' + FN.icon("sparkle") + " " + esc(o.hook) + "</p>" : "") +
      '<div class="grid-2"><section class="card"><h3>' + FN.icon("info") + " What this topic is about</h3><p>" + esc(o.about) + "</p></section>" +
      '<section class="card"><h3>' + FN.icon("target") + " Why it matters</h3><p>" + esc(o.why || "The slides don't state this directly.") + "</p></section></div>" +
      '<section class="card"><h3>' + FN.icon("list-todo") + " Learning objectives</h3><ul class=\"checks\">" + o.objectives.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></section>" +
      ((o.vocabulary || []).length ? '<section class="card"><h3>' + FN.icon("book-a") + " Key vocabulary " + FN.badgeSlides + '</h3><dl class="vocab">' + o.vocabulary.map(function (v) { return "<div><dt>" + esc(v.term) + (v.slide ? " " + FN.slideChips([v.slide]) : "") + "</dt><dd>" + esc(v.def) + "</dd></div>"; }).join("") + "</dl></section>" : "") +
      '<section class="card soft"><h3>' + FN.icon("map") + " Your path through this topic</h3><ol class=\"path\">" +
      TABS.slice(1).map(function (x) { return '<li class="' + (P().tabs[x[0]] ? "done" : "") + '"><a href="#/learn/' + esc(cur.topic.id) + "/" + x[0] + '">' + FN.icon(x[2]) + " " + x[1] + "</a></li>"; }).join("") + "</ol>" +
      '<p class="muted small">Estimated study time: ~' + (cur.topic.minutes || 10) + " minutes. Short on energy? Try Focus mode — one small block at a time.</p></section>";
  }

  /* ---------------- TAB 2: NOTES ---------------- */
  function tabNotes(box) {
    var t = cur.topic, p = P();
    var modes = [["simple", "Explain Simply", "smile"], ["deep", "Understand Deeply", "microscope"], ["exam", "Exam Preparation", "graduation-cap"]];
    box.innerHTML = '<div class="seg big" role="tablist" aria-label="Explanation level">' + modes.map(function (m) { return '<button role="tab" data-mode="' + m[0] + '" aria-selected="' + (noteMode === m[0]) + '">' + FN.icon(m[2]) + " " + m[1] + "</button>"; }).join("") + "</div>" +
      '<p class="legend">' + FN.badgeSlides + " = wording from your slides · " + FN.badgeAI + " = FocusNest's explanation</p>" +
      t.notes.map(function (n, k) {
        var body = noteMode === "exam" ? "<ul class=\"exam\">" + (n.exam || []).map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "<p>" + esc(noteMode === "deep" ? n.deep || n.simple : n.simple) + "</p>";
        return '<section class="note" id="sec-' + esc(n.id) + '" data-sec="' + esc(n.id) + '">' +
          '<header><span class="num">Note ' + (k + 1) + "</span><h3>" + esc(n.heading) + "</h3>" + FN.slideChips(n.slides) + "</header>" +
          ((n.fromSlides || []).length ? '<div class="from">' + FN.badgeSlides + "<ul>" + n.fromSlides.map(function (f) { return "<li>" + esc(f.text) + ' <button class="slide-ref" data-slide="' + f.slide + '">(slide ' + f.slide + ")</button></li>"; }).join("") + "</ul></div>" : "") +
          '<div class="explain">' + FN.badgeAI + body + "</div>" +
          ((n.definitions || []).length && noteMode !== "exam" ? '<div class="defs"><h4>' + FN.icon("book-a") + " Definitions</h4><dl>" + n.definitions.map(function (d) { return "<dt>" + esc(d.term) + "</dt><dd>" + esc(d.def) + "</dd>"; }).join("") + "</dl></div>" : "") +
          ((n.keyFacts || []).length ? '<div class="facts"><h4>' + FN.icon("key-round") + " Key facts</h4><ul>" + n.keyFacts.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") +
          ((n.examples || []).length && noteMode !== "exam" ? '<div class="facts"><h4>' + FN.icon("globe") + " Examples</h4><ul>" + n.examples.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") +
          ((n.misconceptions || []).length ? '<div class="miscon"><h4>' + FN.icon("triangle-alert") + " Common misconceptions</h4><ul>" + n.misconceptions.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul></div>" : "") +
          '<footer><button class="btn ' + (p.sections[n.id] ? "btn-done" : "btn-soft") + '" data-understood="' + esc(n.id) + '">' + FN.icon(p.sections[n.id] ? "circle-check" : "circle") + (p.sections[n.id] ? " Understood" : " Mark as understood") + "</button>" +
          '<button class="icon-btn" data-focus-at="' + k + '" title="Study this block in focus mode">' + FN.icon("maximize-2") + "</button>" +
          '<button class="icon-btn" data-speak="' + esc(n.id) + '" title="Read aloud">' + FN.icon("volume-2") + "</button></footer></section>";
      }).join("");
  }

  /* ---------------- TAB 3: STEP-BY-STEP ---------------- */
  function tabSteps(box) {
    var steps = cur.topic.steps || [], p = P();
    if (!steps.length) { box.innerHTML = '<div class="empty">' + FN.icon("milestone") + "<p>This topic describes ideas rather than a process, so there is no step-by-step walkthrough. Try <a href=\"#/learn/" + esc(cur.topic.id) + "/notes\">Notes</a> or <a href=\"#/learn/" + esc(cur.topic.id) + "/examples\">Examples</a>.</p></div>"; return; }
    var i = Math.min(p.steps || 0, steps.length - 1), answered = p.stepAns || {};
    function draw() {
      var s = steps[i], c = s.check, a = answered[i];
      box.innerHTML = '<div class="stepper"><ol class="step-dots">' + steps.map(function (x, k) { return '<li><button data-go="' + k + '" class="' + (k === i ? "on" : answered[k] !== undefined ? "done" : "") + '" aria-label="Step ' + (k + 1) + ": " + esc(x.title) + '">' + (k + 1) + "</button></li>"; }).join("") + "</ol>" +
        '<article class="step"><p class="muted small">Step ' + (i + 1) + " of " + steps.length + "</p><h3>" + esc(s.title) + "</h3>" +
        '<div class="step-grid"><div><h4>' + FN.icon("eye") + " What happens</h4><p>" + esc(s.what) + "</p></div>" + (s.why ? "<div><h4>" + FN.icon("circle-help") + " Why it happens</h4><p>" + esc(s.why) + "</p></div>" : "") + "</div>" +
        (s.visual ? '<pre class="code step-visual">' + esc(s.visual) + "</pre>" : "") +
        (s.practical ? '<p class="practical">' + FN.icon("wrench") + " <span>" + esc(s.practical) + "</span></p>" : "") +
        (c ? '<div class="checkpoint"><strong>' + FN.icon("flag") + " Checkpoint</strong><p>" + esc(c.q) + "</p>" + c.options.map(function (o, k) {
          var cls = a === undefined ? "" : k === c.answer ? " right" : k === a ? " wrong" : "";
          return '<button class="opt' + cls + '" data-cp="' + k + '"' + (a !== undefined ? " disabled" : "") + ">" + esc(o) + "</button>";
        }).join("") + (a !== undefined ? '<p class="feedback ' + (a === c.answer ? "ok" : "no") + '">' + (a === c.answer ? "Correct! " : "Not quite — the answer is “" + esc(c.options[c.answer]) + "”. ") + esc(c.explain) + "</p>" : "") + "</div>" : "") +
        '<div class="row"><button class="btn btn-ghost" data-st="prev"' + (i === 0 ? " disabled" : "") + ">" + FN.icon("arrow-left") + " Previous step</button>" +
        (i < steps.length - 1 ? '<button class="btn btn-primary" data-st="next">Next step ' + FN.icon("arrow-right") + "</button>" : '<a class="btn btn-primary" href="#/learn/' + esc(cur.topic.id) + '/visual">Done — see the visual ' + FN.icon("arrow-right") + "</a>") + "</div></article></div>";
      FN.icons();
    }
    box.onclick = function (e) {
      var g = e.target.closest("[data-go]"), st = e.target.closest("[data-st]"), cp = e.target.closest("[data-cp]");
      if (g) i = +g.dataset.go;
      if (st) i += st.dataset.st === "next" ? 1 : -1;
      if (cp && answered[i] === undefined) {
        answered[i] = +cp.dataset.cp; var ok = answered[i] === steps[i].check.answer;
        if (ok) FN.store.addXP(FN.store.XP.step, "checkpoint");
      }
      if (g || st || cp) { FN.store.update(function () { P().steps = i; P().stepAns = answered; }); draw(); }
    };
    draw();
  }

  /* ---------------- TAB 4: VISUAL ---------------- */
  function tabVisual(box) { FN.visuals.render(box, cur.topic.visual, cur.topic); }

  /* ---------------- TAB 5: EXAMPLES ---------------- */
  function tabExamples(box) {
    var ex = cur.topic.examples || [], p = P(), ans = p.exAns || {};
    if (!ex.length) { box.innerHTML = '<div class="empty">' + FN.icon("globe") + "<p>Your slides for this topic don't include worked examples, and FocusNest does not invent them." + "</p></div>"; return; }
    function draw() {
      box.innerHTML = '<p class="legend">' + FN.badgeAI + " Examples are FocusNest's practical illustrations of slide concepts. Numbers in examples may be illustrative.</p>" + ex.map(function (x, k) {
        var c = x.check, a = ans[k];
        return '<article class="example"><ol class="ex-flow"><li><span>Concept</span><strong>' + esc(x.concept) + "</strong></li><li><span>Example</span><p>" + esc(x.example) + "</p></li>" +
          "<li><span>Step-by-step walkthrough</span><ol>" + (x.walkthrough || []).map(function (w) { return "<li>" + esc(w) + "</li>"; }).join("") + "</ol></li>" +
          "<li><span>Real-world application</span><p>" + esc(x.application || "") + "</p></li>" +
          (c ? '<li><span>Knowledge check</span><p>' + esc(c.q) + "</p>" + c.options.map(function (o, j) {
            var cls = a === undefined ? "" : j === c.answer ? " right" : j === a ? " wrong" : "";
            return '<button class="opt' + cls + '" data-ex="' + k + '" data-o="' + j + '"' + (a !== undefined ? " disabled" : "") + ">" + esc(o) + "</button>";
          }).join("") + (a !== undefined ? '<p class="feedback ' + (a === c.answer ? "ok" : "no") + '">' + esc(c.explain) + "</p>" : "") + "</li>" : "") + "</ol></article>";
      }).join("");
      FN.icons();
    }
    box.onclick = function (e) {
      var b = e.target.closest("[data-ex]"); if (!b) return;
      var k = +b.dataset.ex; if (ans[k] !== undefined) return;
      ans[k] = +b.dataset.o; var ok = ans[k] === ex[k].check.answer;
      if (ok) FN.store.addXP(FN.store.XP.example, "example check");
      FN.store.update(function () { P().exAns = ans; }); draw();
    };
    draw();
  }

  /* ---------------- TAB 6: FLASHCARDS ---------------- */
  function tabCards(box) {
    var all = FN.cards.collect([cur.topic]);
    box.innerHTML = '<div class="fc-bar"><div class="seg" role="tablist">' + [["all", "All cards"], ["due", "Due now"], ["forgotten", "Only forgotten"], ["saved", "Saved"]].map(function (m) { return '<button role="tab" data-fm="' + m[0] + '" aria-selected="' + (m[0] === "all") + '">' + m[1] + " <small>" + FN.cards.filter(all, m[0]).length + "</small></button>"; }).join("") + '</div><label class="switch small"><input type="checkbox" data-shuffle> <span>Shuffle</span></label></div><div class="fc-host"></div>';
    var host = box.querySelector(".fc-host"), mode = "all";
    function go() { FN.cards.review(host, FN.cards.filter(all, mode), { topicId: cur.topic.id, mode: mode, shuffle: box.querySelector("[data-shuffle]").checked, emptyText: mode === "forgotten" ? "No forgotten cards — nice!" : mode === "saved" ? "Star a card to save it here." : "Nothing due right now. Come back later or review all cards." }); }
    box.querySelector(".fc-bar").onclick = function (e) { var b = e.target.closest("[data-fm]"); if (!b) return; mode = b.dataset.fm; FN.$$("[data-fm]", box).forEach(function (x) { x.setAttribute("aria-selected", x === b); }); go(); };
    box.querySelector("[data-shuffle]").onchange = go;
    go();
  }

  /* ---------------- TAB 7: QUIZ ---------------- */
  function tabQuiz(box) {
    var q = cur.topic.quiz || [];
    var count = function (l) { return q.filter(function (x) { return x.difficulty === l; }).length; };
    box.innerHTML = '<div class="quiz-setup card"><h3>' + FN.icon("list-checks") + " Topic quiz</h3><p class=\"muted\">" + q.length + " questions written from slides " + esc(Math.min.apply(null, cur.topic.slides) + "–" + Math.max.apply(null, cur.topic.slides)) + ". Pick a level and a mode.</p>" +
      '<div class="setup-grid"><fieldset><legend>Difficulty</legend>' + ["easy", "medium", "hard"].map(function (l, k) { return '<label class="radio-card"><input type="radio" name="lvl" value="' + l + '"' + (k === 0 ? " checked" : "") + "><span><strong>" + l[0].toUpperCase() + l.slice(1) + "</strong><small>" + count(l) + " questions at this level</small></span></label>"; }).join("") + "</fieldset>" +
      '<fieldset><legend>Mode</legend><label class="radio-card"><input type="radio" name="mode" value="practice" checked><span><strong>Practice</strong><small>Feedback after every question</small></span></label><label class="radio-card"><input type="radio" name="mode" value="exam"><span><strong>Exam</strong><small>Results only after you submit</small></span></label></fieldset></div>' +
      // Start quiz → FN.quiz.start.
      '<button class="btn btn-primary btn-lg" data-start>' + FN.icon("play") + " Start quiz</button></div><div class=\"quiz-host\"></div>";
    box.querySelector("[data-start]").onclick = function () {
      var lvl = box.querySelector("[name=lvl]:checked").value, mode = box.querySelector("[name=mode]:checked").value;
      box.querySelector(".quiz-setup").hidden = true;
      FN.quiz.start(box.querySelector(".quiz-host"), { questions: q, topicId: cur.topic.id, title: cur.topic.title, mode: mode, level: lvl, sectionName: sectionName, onDone: quizDone });
    };
  }

  /**
   * FUNCTION: quizDone(pct)
   * PURPOSE: records best score; marks topic complete at ≥ 60 % (understanding, not time spent).
   */
  function quizDone(pct) {
    var id = cur.topic.id, wasDone = P().complete;
    FN.store.update(function () { var p = P(); p.quizBest = Math.max(p.quizBest || 0, pct); if (pct >= 60) p.complete = true; });
    if (pct === 100) FN.store.award("quiz-whiz");
    if (pct >= 60 && !wasDone) {
      FN.store.addXP(FN.store.XP.topic, "topic completed");
      FN.store.award("topic-done");
      if (cur.chapter.topics.every(function (t) { return FN.store.topic(t.id).complete; })) FN.store.award("chapter-champ");
    }
    if (FN.renderOutline) FN.renderOutline();
  }

  /* ---------------- SIDE PANEL: ORIGINAL SLIDES / MY NOTES ---------------- */
  function drawSide() {
    var el = document.getElementById("lessonSide"); if (!el) return;
    if (side === "mynotes") {
      var txt = FN.store.get().notes[cur.topic.id] || "", hl = FN.store.get().highlights[cur.topic.id] || [];
      el.innerHTML = '<div class="side-head"><h3>' + FN.icon("pencil-line") + ' My notes</h3><button class="icon-btn" data-l="closeside" aria-label="Close">' + FN.icon("x") + "</button></div>" +
        '<textarea class="my-notes" placeholder="Write in your own words… (saved automatically on this device)">' + esc(txt) + '</textarea><p class="muted small save-state">Saved on this device.</p>' +
        '<h4>' + FN.icon("highlighter") + " Highlights</h4>" + (hl.length ? '<ul class="hl-list">' + hl.map(function (h, k) { return "<li><mark>" + esc(h) + '</mark><button class="icon-btn" data-unhl="' + k + '" aria-label="Remove highlight">' + FN.icon("x") + "</button></li>"; }).join("") + "</ul>" : '<p class="muted small">Select text in the lesson and press “Highlight”.</p>');
      var ta = el.querySelector("textarea"), timer, dirty = false;
      ta.oninput = function () { dirty = true; clearTimeout(timer); timer = setTimeout(function () { FN.store.update(function (s) { s.notes[cur.topic.id] = ta.value; }); el.querySelector(".save-state").textContent = "Saved " + new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }, 500); };
      ta.onblur = function () { if (dirty) { dirty = false; FN.store.update(function (s) { s.notes[cur.topic.id] = ta.value; }); } };
      FN.icons(); return;
    }
    var deck = FN.courses.deck(cur.course, cur.chapter.deck), slides = deck ? deck.slides : [];
    var mine = slides.filter(function (s) { return cur.topic.slides.indexOf(s.n) >= 0; });
    if (!mine.length) mine = slides;
    var s = slides.filter(function (x) { return x.n === slideAt; })[0] || mine[0];
    if (!s) { el.innerHTML = '<p class="muted">No slides stored for this course.</p>'; return; }
    slideAt = s.n;
    var k = mine.indexOf(s);
    el.innerHTML = '<div class="side-head"><h3>' + FN.icon("presentation") + " Slide " + s.n + '</h3><button class="icon-btn" data-l="closeside" aria-label="Close">' + FN.icon("x") + "</button></div>" +
      '<div class="slide-view"><p class="slide-deck muted small">' + esc(deck.name) + "</p><h4>" + esc(s.title) + "</h4>" +
      (s.images || []).map(function (src) { return '<img src="' + esc(src) + '" alt="Picture from slide ' + s.n + '" loading="lazy">'; }).join("") +
      (s.text.length ? "<ul>" + s.text.map(function (x) { return "<li>" + esc(x) + "</li>"; }).join("") + "</ul>" : "") +
      (s.notes ? '<details><summary>Speaker notes</summary><p>' + esc(s.notes) + "</p></details>" : "") + "</div>" +
      '<div class="row slide-nav"><button class="btn btn-ghost" data-sn="-1"' + (k <= 0 ? " disabled" : "") + ">" + FN.icon("chevron-left") + '</button><span class="muted small">' + (k >= 0 ? k + 1 + " / " + mine.length + " in this topic" : "Outside this topic") + '</span><button class="btn btn-ghost" data-sn="1"' + (k < 0 || k >= mine.length - 1 ? " disabled" : "") + ">" + FN.icon("chevron-right") + "</button></div>" +
      '<div class="thumbs">' + mine.map(function (x) { return '<button class="thumb' + (x.n === s.n ? " on" : "") + '" data-slide="' + x.n + '">' + x.n + "</button>"; }).join("") + "</div>";
    el.querySelector(".slide-nav").onclick = function (e) { var b = e.target.closest("[data-sn]"); if (b && mine[k + +b.dataset.sn]) { slideAt = mine[k + +b.dataset.sn].n; drawSide(); } };
    FN.icons();
  }
  /** openSlide(n): shows slide n beside the lesson (used by every "Slide n" chip). */
  function openSlide(n) {
    if (!cur || !location.hash.startsWith("#/learn/")) return;
    slideAt = n;
    if (side !== "slides") { side = "slides"; render(); } else drawSide();
  }

  /* ---------------- HIGHLIGHTS ---------------- */
  /** markHighlights(root): wraps saved highlight text in <mark>. */
  function markHighlights(root) {
    var list = FN.store.get().highlights[cur.topic.id] || [];
    list.forEach(function (h) {
      var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT), node;
      while ((node = w.nextNode())) {
        var i = node.nodeValue.indexOf(h);
        if (i >= 0 && !node.parentNode.closest("mark,button")) {
          var r = document.createRange(); r.setStart(node, i); r.setEnd(node, i + h.length);
          var m = document.createElement("mark"); r.surroundContents(m); break;
        }
      }
    });
  }

  /* ---------------- EVENT WIRING ---------------- */
  document.addEventListener("DOMContentLoaded", function () {
    var view = document.getElementById("view"), pop = document.getElementById("hlPop");
    view.addEventListener("click", function (e) {
      if (!cur || !location.hash.startsWith("#/learn/")) return;
      var chip = e.target.closest("[data-slide]"); if (chip) { openSlide(+chip.dataset.slide); return; }
      var l = e.target.closest("[data-l]");
      if (l) {
        var a = l.dataset.l;
        if (a === "focus") FN.focus.open(cur.topic, 0);
        if (a === "slides" || a === "mynotes") { side = side === a ? null : a; render(); }
        if (a === "closeside") { side = null; render(); }
        if (a === "bookmark") {
          var on;
          FN.store.update(function (s) {
            var i = s.bookmarks.findIndex(function (b) { return b.topic === cur.topic.id && !b.section; });
            if (i >= 0) { s.bookmarks.splice(i, 1); on = false; } else { s.bookmarks.push({ topic: cur.topic.id, label: cur.topic.title, hash: "#/learn/" + cur.topic.id + "/overview", at: Date.now() }); on = true; }
          });
          render();
        }
        if (a === "tts") { var c = document.getElementById("lessonContent"); FN.speak(c.innerText.slice(0, 6000)); }
        return;
      }
      var m = e.target.closest("[data-mode]");
      if (m) { noteMode = m.dataset.mode; tabNotes(document.getElementById("lessonContent")); markHighlights(document.getElementById("lessonContent")); FN.icons(); return; }
      var u = e.target.closest("[data-understood]");
      if (u) {
        var id = u.dataset.understood, first = !P().sections[id];
        FN.store.update(function () { if (P().sections[id]) delete P().sections[id]; else P().sections[id] = true; });
        if (first) FN.store.addXP(FN.store.XP.section, "section understood");
        render(); return;
      }
      var fa = e.target.closest("[data-focus-at]"); if (fa) { FN.focus.open(cur.topic, +fa.dataset.focusAt); return; }
      var sp = e.target.closest("[data-speak]");
      if (sp) { var sec = document.getElementById("sec-" + sp.dataset.speak); if (sec) FN.speak(sec.innerText); return; }
      var un = e.target.closest("[data-unhl]");
      if (un) { FN.store.update(function (s) { s.highlights[cur.topic.id].splice(+un.dataset.unhl, 1); }); render(); }
    });
    // Reading progress bar + remember which note section you are reading (for resume).
    var rt;
    view.addEventListener("scroll", function () {
      var max = view.scrollHeight - view.clientHeight;
      document.getElementById("readBar").style.width = (max > 0 ? (view.scrollTop / max) * 100 : 0) + "%";
      if (!cur || cur.tab !== "notes") return;
      clearTimeout(rt); rt = setTimeout(function () {
        var secs = FN.$$(".note", view), top = view.getBoundingClientRect().top;
        var at = secs.filter(function (s) { return s.getBoundingClientRect().top - top < 160; }).pop();
        if (at) FN.store.update(function (s) { s.resume = { hash: "#/learn/" + cur.topic.id + "/notes/" + at.dataset.sec, topic: cur.topic.id, at: Date.now() }; });
      }, 400);
    }, { passive: true });
    // Highlight: select text inside a lesson → floating "Highlight" button.
    document.addEventListener("selectionchange", function () {
      var s = window.getSelection(), c = document.getElementById("lessonContent");
      if (!c || !s.rangeCount || s.isCollapsed || !c.contains(s.anchorNode) || s.toString().trim().length < 3) { pop.hidden = true; return; }
      var r = s.getRangeAt(0).getBoundingClientRect();
      pop.style.top = Math.max(8, r.top - 44) + "px"; pop.style.left = Math.min(window.innerWidth - 140, r.left + r.width / 2 - 55) + "px"; pop.hidden = false;
    });
    pop.addEventListener("mousedown", function (e) { e.preventDefault(); });
    pop.addEventListener("click", function () {
      var txt = window.getSelection().toString().trim().slice(0, 300); if (!txt || !cur) return;
      FN.store.update(function (s) { (s.highlights[cur.topic.id] = s.highlights[cur.topic.id] || []).push(txt); });
      pop.hidden = true; window.getSelection().removeAllRanges(); render(); FN.toast("Highlighted — see My notes.");
    });
    document.addEventListener("keydown", function (e) {
      if (!cur || !location.hash.startsWith("#/learn/") || e.target.closest("input,textarea,select,[contenteditable]") || e.metaKey || e.ctrlKey) return;
      if (e.key === "f" || e.key === "F") FN.focus.open(cur.topic, 0);
      if (/^[1-7]$/.test(e.key) && !document.querySelector(".fc")) location.hash = "#/learn/" + cur.topic.id + "/" + TABS[+e.key - 1][0];
    });
    FN.onFocusDone = function () { if (cur) render(); };
  });

  FN.lesson = { show: show, openSlide: openSlide, TABS: TABS, current: function () { return cur; }, sectionName: sectionName };
})();
