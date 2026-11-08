/* =====================================================================
   FILE: js/quiz.js
   PURPOSE (beginner summary):
     The quiz engine used by every topic quiz and the final course quiz.
     Question types: multiple choice (incl. scenarios), true/false,
     multiple answer, matching, fill in the blank (incl. calculations).
     Modes:  Practice = feedback after every question.
             Exam     = no feedback until you submit everything.
     Levels: Easy / Medium / Hard pick questions of that difficulty
             (topped up from neighbouring levels if a topic has few).
     Wrong answers explain: why yours is wrong, the right answer, why it
     is right, and which lesson section to revise.
   DEPENDENCIES: js/ui.js, js/store.js.
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var esc = FN.esc;

  function normText(s) { return String(s || "").toLowerCase().replace(/[\s"'`’]+/g, "").replace(/,/g, ""); }

  /**
   * FUNCTION: grade(q, response)   — pure; covered by tests/check.js
   * INPUTS: question object, the student's response:
   *   mcq → index · tf → boolean · multi → [indexes] · match → [chosen right text per left] · fill → string
   * OUTPUT: true / false
   */
  function grade(q, r) {
    if (r === undefined || r === null || r === "") return false;
    switch (q.type) {
      case "mcq": return r === q.answer;
      case "tf": return r === q.answer;
      case "multi": var a = q.answer.slice().sort().join(","), b = (r || []).slice().sort().join(","); return a === b;
      case "match": return q.options.every(function (p, k) { return r[k] === p[1]; });
      case "fill": var t = normText(r); return q.answer.some(function (x) { return normText(x) === t || normText(x).replace(/%$/, "") === t.replace(/%$/, ""); });
    }
    return false;
  }

  /** correctText(q): human-readable correct answer for feedback. */
  function correctText(q) {
    if (q.type === "mcq") return q.options[q.answer];
    if (q.type === "tf") return q.answer ? "True" : "False";
    if (q.type === "multi") return q.answer.map(function (i) { return q.options[i]; }).join("  ·  ");
    if (q.type === "match") return q.options.map(function (p) { return p[0] + " → " + p[1]; }).join("  ·  ");
    if (q.type === "fill") return q.answer[0];
  }

  /**
   * FUNCTION: pick(questions, level)
   * PURPOSE: chooses up to 10 questions for the chosen difficulty.
   *   easy → easy first; medium → medium first; hard → hard first; then neighbours.
   */
  function pick(qs, level, max) {
    var order = { easy: ["easy", "medium", "hard"], medium: ["medium", "easy", "hard"], hard: ["hard", "medium", "easy"] }[level] || ["easy", "medium", "hard"];
    var out = [];
    order.forEach(function (l) { out = out.concat(FN.shuffle(qs.filter(function (q) { return q.difficulty === l; }))); });
    return out.slice(0, max || 10);
  }

  /**
   * FUNCTION: FN.quiz.start(el, opts)
   * PURPOSE: runs a quiz inside element `el`.
   * opts: { questions, topicId ("final" for course quiz), title, mode:"practice"|"exam", level, sectionName(id) }
   * USER ACTION: "Start quiz" on a topic's Quiz tab or the Practice page.
   * EXPECTED WEBSITE RESULT: one question at a time, progress bar, feedback per mode, summary.
   * FAILURE: no questions → message
   */
  function start(el, o) {
    var qs = pick(o.questions || [], o.level || "easy", o.max);
    if (!qs.length) { el.innerHTML = '<div class="empty"><p>There are no quiz questions for this selection yet.</p></div>'; return; }
    var i = 0, answers = [], locked = [];

    function draw() {
      var q = qs[i];
      var body = "";
      if (q.type === "mcq" || q.type === "multi") {
        var multi = q.type === "multi";
        body = '<fieldset class="opts"><legend class="sr-only">Options</legend>' + q.options.map(function (op, k) {
          var on = multi ? (answers[i] || []).indexOf(k) >= 0 : answers[i] === k;
          return '<label class="opt' + (on ? " sel" : "") + '"><input type="' + (multi ? "checkbox" : "radio") + '" name="q' + i + '" value="' + k + '"' + (on ? " checked" : "") + (locked[i] ? " disabled" : "") + "><span>" + esc(op) + "</span></label>";
        }).join("") + "</fieldset>" + (multi ? '<p class="muted small">Select every correct answer.</p>' : "");
      } else if (q.type === "tf") {
        body = '<div class="tf">' + [true, false].map(function (v) { return '<button class="opt' + (answers[i] === v ? " sel" : "") + '" data-tf="' + v + '"' + (locked[i] ? " disabled" : "") + ">" + (v ? "True" : "False") + "</button>"; }).join("") + "</div>";
      } else if (q.type === "match") {
        var rights = q._rights || (q._rights = FN.shuffle(q.options.map(function (p) { return p[1]; })));
        body = '<div class="match">' + q.options.map(function (p, k) {
          return '<label class="match-row"><span>' + esc(p[0]) + '</span><select data-m="' + k + '"' + (locked[i] ? " disabled" : "") + '><option value="">Choose…</option>' +
            rights.map(function (r) { return "<option" + ((answers[i] || [])[k] === r ? " selected" : "") + ">" + esc(r) + "</option>"; }).join("") + "</select></label>";
        }).join("") + "</div>";
      } else if (q.type === "fill") {
        body = '<input class="fill" type="text" autocomplete="off" placeholder="Type your answer" value="' + esc(answers[i] || "") + '"' + (locked[i] ? " disabled" : "") + ">";
      }
      var done = answers.filter(function (a) { return a !== undefined; }).length;
      el.innerHTML =
        '<div class="quiz">' +
        '<div class="quiz-top"><span class="muted">' + esc(o.title || "Quiz") + " · " + (o.mode === "exam" ? "Exam mode" : "Practice mode") + " · " + esc(o.level) + "</span><span>Question " + (i + 1) + " / " + qs.length + "</span></div>" +
        '<div class="bar"><span style="width:' + Math.round((done / qs.length) * 100) + '%"></span></div>' +
        '<div class="q-card"><div class="q-meta"><span class="pill">' + typeName(q) + '</span><span class="pill pill-' + q.difficulty + '">' + q.difficulty + "</span>" + (q.slide ? FN.slideChips([q.slide]) : "") + "</div>" +
        (q.scenario ? '<p class="scenario">' + FN.icon("briefcase") + " " + esc(q.scenario) + "</p>" : "") +
        "<h3>" + esc(q.prompt) + "</h3>" + body + '<div class="feedback" aria-live="polite"></div></div>' +
        '<div class="row quiz-nav"><button class="btn btn-ghost" data-q="prev"' + (i === 0 ? " disabled" : "") + ">" + FN.icon("arrow-left") + " Back</button>" +
        (o.mode === "practice" && !locked[i] ? '<button class="btn btn-primary" data-q="check">Check answer</button>' : "") +
        (i < qs.length - 1 ? '<button class="btn ' + (o.mode === "practice" && !locked[i] ? "btn-ghost" : "btn-primary") + '" data-q="next">Next ' + FN.icon("arrow-right") + "</button>" : '<button class="btn btn-primary" data-q="finish">' + (o.mode === "exam" ? "Submit exam" : "See results") + "</button>") +
        "</div></div>";
      if (locked[i]) feedback();
      FN.icons();
    }
    function typeName(q) {
      if (q.scenario) return "Scenario";
      if (q.type === "fill") return /\d/.test(q.answer[0]) ? "Problem solving" : "Fill in the blank";
      return { mcq: "Multiple choice", tf: "True / False", multi: "Multiple answer", match: "Matching" }[q.type];
    }

    /** feedback(): explains the answer (practice mode, or exam review). */
    function feedback() {
      var q = qs[i], ok = grade(q, answers[i]), box = el.querySelector(".feedback");
      box.className = "feedback " + (ok ? "ok" : "no");
      // Colour the options: green = correct answer, red = your wrong pick.
      if (q.type === "mcq" || q.type === "multi") FN.$$(".opts .opt", el).forEach(function (l, k) {
        var right = q.type === "mcq" ? k === q.answer : q.answer.indexOf(k) >= 0, picked = l.querySelector("input").checked;
        l.classList.toggle("right", right); l.classList.toggle("wrong", picked && !right);
      });
      if (q.type === "tf") FN.$$("[data-tf]", el).forEach(function (b) { var v = b.dataset.tf === "true"; b.classList.toggle("right", v === q.answer); b.classList.toggle("wrong", v === answers[i] && v !== q.answer); });
      var why = "";
      if (!ok && q.type === "mcq" && q.wrongWhy && answers[i] !== undefined && q.wrongWhy[answers[i]]) why = "<p><strong>Why your answer is not right:</strong> " + esc(q.wrongWhy[answers[i]]) + "</p>";
      else if (!ok && answers[i] === undefined) why = "<p><strong>No answer given.</strong></p>";
      box.innerHTML = (ok ? "<p><strong>" + FN.icon("circle-check") + " Correct!</strong></p>" : "<p><strong>" + FN.icon("circle-x") + " Not quite.</strong></p>" + why + "<p><strong>Correct answer:</strong> " + esc(correctText(q)) + "</p>") +
        "<p><strong>Why:</strong> " + esc(q.explain) + "</p>" +
        (!ok && q.section ? '<p><button class="link" data-revise="' + esc(q.section) + '" data-topic="' + esc(q._topic || o.topicId) + '">' + FN.icon("book-open") + " Revise: " + esc(o.sectionName ? o.sectionName(q.section, q._topic) : q.section) + "</button></p>" : "");
      FN.icons();
    }

    function readInput() {
      var q = qs[i];
      if (q.type === "mcq") { var c = el.querySelector("input:checked"); answers[i] = c ? +c.value : undefined; }
      if (q.type === "multi") { answers[i] = FN.$$("input:checked", el).map(function (x) { return +x.value; }); if (!answers[i].length) answers[i] = undefined; }
      if (q.type === "match") { answers[i] = FN.$$("select", el).map(function (s) { return s.value; }); if (answers[i].every(function (v) { return !v; })) answers[i] = undefined; }
      if (q.type === "fill") { var v = el.querySelector(".fill").value.trim(); answers[i] = v || undefined; }
    }

    // All quiz buttons: Back / Check / Next / Finish, option clicks, Revise links.
    el.onclick = function (e) {
      var tf = e.target.closest("[data-tf]");
      if (tf && !locked[i]) { answers[i] = tf.dataset.tf === "true"; FN.$$("[data-tf]", el).forEach(function (b) { b.classList.toggle("sel", b === tf); }); return; }
      var rv = e.target.closest("[data-revise]");
      if (rv) { location.hash = "#/learn/" + rv.dataset.topic + "/notes/" + rv.dataset.revise; return; }
      var b = e.target.closest("[data-q]"); if (!b) return;
      if (!locked[i] && qs[i].type !== "tf") readInput();
      var act = b.dataset.q;
      if (act === "check") {
        if (answers[i] === undefined) { FN.toast("Pick or type an answer first."); return; }
        locked[i] = true;
        var ok = grade(qs[i], answers[i]);
        if (ok) FN.store.addXP(FN.store.XP.quiz);
        draw(); return;
      }
      if (act === "prev") { i--; draw(); }
      if (act === "next") { i++; draw(); }
      if (act === "finish") summary();
    };
    el.onchange = function (e) { if (e.target.matches("input[type=radio],input[type=checkbox]")) { FN.$$(".opt", el).forEach(function (l) { l.classList.toggle("sel", l.querySelector("input").checked); }); } };
    el.onkeydown = function (e) { if (e.key === "Enter" && e.target.matches(".fill")) { var c = el.querySelector('[data-q="check"]') || el.querySelector('[data-q="next"],[data-q="finish"]'); if (c) c.click(); } };

    /**
     * summary(): score, accuracy, strengths, sections to revise, per-question review.
     */
    function summary() {
      var res = qs.map(function (q, k) { return grade(q, answers[k]); });
      var correct = res.filter(Boolean).length, pct = Math.round((correct / qs.length) * 100);
      var bySec = {};
      qs.forEach(function (q, k) { var s = (q._topic || o.topicId) + "|" + q.section; bySec[s] = bySec[s] || { ok: 0, n: 0, q: q }; bySec[s].n++; if (res[k]) bySec[s].ok++; });
      var strong = [], weak = [];
      Object.keys(bySec).forEach(function (k) { (bySec[k].ok === bySec[k].n ? strong : weak).push(bySec[k]); });
      FN.store.update(function (s) {
        s.quizHistory.push({ scope: o.topicId, mode: o.mode, level: o.level, correct: correct, total: qs.length, at: Date.now(), missed: weak.map(function (w) { return (w.q._topic || o.topicId) + "|" + w.q.section; }) });
        if (s.quizHistory.length > 200) s.quizHistory.shift();
      });
      if (o.onDone) o.onDone(pct, correct, qs.length);
      var name = function (w) { return esc(o.sectionName ? o.sectionName(w.q.section, w.q._topic) : w.q.section); };
      el.innerHTML = '<div class="quiz-sum">' +
        '<div class="score-ring" style="--p:' + pct + '"><span>' + pct + "%</span></div>" +
        "<h3>" + (pct >= 80 ? "Excellent work!" : pct >= 60 ? "Good progress!" : "Every attempt builds memory.") + "</h3>" +
        '<p class="muted">' + correct + " of " + qs.length + " correct · accuracy " + pct + "% · " + esc(o.mode) + " mode · " + esc(o.level) + "</p>" +
        '<div class="sum-cols"><div><h4>' + FN.icon("thumbs-up") + " Strengths</h4>" + (strong.length ? "<ul>" + strong.map(function (w) { return "<li>" + name(w) + "</li>"; }).join("") + "</ul>" : '<p class="muted">Keep going — strengths appear here.</p>') + "</div>" +
        "<div><h4>" + FN.icon("refresh-cw") + " Revise next</h4>" + (weak.length ? "<ul>" + weak.map(function (w) { return '<li><button class="link" data-revise="' + esc(w.q.section) + '" data-topic="' + esc(w.q._topic || o.topicId) + '">' + name(w) + "</button> <span class=\"muted\">(" + w.ok + "/" + w.n + ")</span></li>"; }).join("") + "</ul>" : '<p class="muted">Nothing to revise — well done.</p>') + "</div></div>" +
        '<details class="review"><summary>Review every question</summary>' + qs.map(function (q, k) {
          return '<div class="rev ' + (res[k] ? "ok" : "no") + '"><p><strong>' + (k + 1) + ". " + esc(q.prompt) + "</strong></p><p>" + (res[k] ? "✓ Correct" : "✗ Your answer: " + esc(yourText(q, answers[k])) + " · Correct: " + esc(correctText(q))) + '</p><p class="muted">' + esc(q.explain) + "</p></div>";
        }).join("") + "</details>" +
        '<div class="row"><button class="btn btn-primary" data-again>' + FN.icon("rotate-ccw") + " Try again</button></div></div>";
      FN.icons();
      el.querySelector("[data-again]").onclick = function () { start(el, o); };
    }
    function yourText(q, a) {
      if (a === undefined) return "(no answer)";
      if (q.type === "mcq") return q.options[a];
      if (q.type === "tf") return a ? "True" : "False";
      if (q.type === "multi") return a.map(function (x) { return q.options[x]; }).join(" · ");
      if (q.type === "match") return a.join(" · ");
      return a;
    }
    draw();
  }

  FN.quiz = { start: start, grade: grade, pick: pick };
})();
