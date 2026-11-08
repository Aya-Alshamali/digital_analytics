/* =====================================================================
   FILE: js/schema.js
   PURPOSE (beginner summary):
     Defines the ONE data shape every course must follow, and checks it.
     The built-in course and chapters added from uploaded slides
     BOTH pass through validateCourse()
     before the app shows them. If something is malformed we show the
     problem instead of silently inventing content.
   MAIN FEATURES: validateCourse(), validateTopic(), QUESTION_TYPES.
   DEPENDENCIES: none. Works in the browser (window.FN) and in Node tests.
   SAFE TO EDIT: add new optional fields freely; adding a NEW required
     field means updating the sample data and js/parser.js too.
   ---------------------------------------------------------------------
   DATA SHAPE (all text is plain text, never HTML):
   Course  { id, title, subtitle, origin: "sample"|"upload"|"ai",
             decks: [{id, name, slides:[{n,title,text[],notes,images[]}]}],
             chapters: [Chapter] }
   Chapter { id, title, deck, topics: [Topic] }
   Topic   { id, title, slides:[n], minutes,
             overview: { about, why, objectives[], vocabulary[{term,def,slide}], hook },
             notes:    [{ id, heading, slides[], fromSlides[{text,slide}],
                          simple, deep, exam[], definitions[{term,def,slide}],
                          keyFacts[], examples[], misconceptions[] }],
             steps:    [{ title, what, why, practical, visual?, check:Check }],
             visual:   { type, title, caption, slides[], data } | null,
             examples: [{ concept, example, walkthrough[], application, check:Check }],
             flashcards: [{ id, front, back, slide }],
             quiz: [Question] }
   Check    { q, options[], answer:index, explain }
   Question { id, type, difficulty:"easy"|"medium"|"hard", prompt, scenario?,
              options?, answer, explain, wrongWhy?{index:reason}, slide, section }
     type "mcq"   → answer = option index
     type "tf"    → answer = true/false
     type "multi" → answer = [option indexes]
     type "match" → options = [[left,right],...] (the correct pairs), answer unused
     type "fill"  → answer = [accepted strings] (case/space-insensitive)
   ===================================================================== */
(function (root) {
  "use strict";
  var FN = (root.FN = root.FN || {});

  var QUESTION_TYPES = ["mcq", "tf", "multi", "match", "fill"];
  var VISUAL_TYPES = ["flow", "tree", "timeline", "bars", "calculator", "dragsort", "selector", "compare"];
  var LEVELS = ["easy", "medium", "hard"];

  /**
   * FUNCTION: validateQuestion(q, where, errors)
   * PURPOSE: checks one quiz question has a type, prompt, answer and explanation.
   * INPUTS: q (object), where (text used in error messages), errors (array to fill).
   * OUTPUT: nothing; pushes readable error strings into `errors`.
   */
  function validateQuestion(q, where, errors) {
    if (!q || typeof q !== "object") return errors.push(where + ": not an object");
    if (QUESTION_TYPES.indexOf(q.type) < 0) errors.push(where + ": bad type " + q.type);
    if (LEVELS.indexOf(q.difficulty) < 0) errors.push(where + ": bad difficulty");
    if (!q.prompt) errors.push(where + ": missing prompt");
    if (!q.explain) errors.push(where + ": missing explain");
    var n = Array.isArray(q.options) ? q.options.length : 0;
    if (q.type === "mcq" && !(Number.isInteger(q.answer) && q.answer >= 0 && q.answer < n)) errors.push(where + ": mcq answer out of range");
    if (q.type === "tf" && typeof q.answer !== "boolean") errors.push(where + ": tf answer must be boolean");
    if (q.type === "multi" && !(Array.isArray(q.answer) && q.answer.length && q.answer.every(function (a) { return a >= 0 && a < n; }))) errors.push(where + ": multi answer invalid");
    if (q.type === "match" && !(n >= 2 && q.options.every(function (p) { return Array.isArray(p) && p.length === 2; }))) errors.push(where + ": match needs [[left,right],...]");
    if (q.type === "fill" && !(Array.isArray(q.answer) && q.answer.length)) errors.push(where + ": fill answer must be a list of strings");
  }

  function validateCheck(c, where, errors) {
    if (!c) return;
    if (!c.q || !Array.isArray(c.options) || !(c.answer >= 0 && c.answer < c.options.length)) errors.push(where + ": bad checkpoint");
  }

  /**
   * FUNCTION: validateTopic(t, where)
   * PURPOSE: checks one topic (lesson) has every tab's data in the right shape.
   * OUTPUT: array of error strings (empty = valid).
   */
  function validateTopic(t, where) {
    var e = [];
    where = where || (t && t.id) || "topic";
    if (!t || !t.id || !t.title) return [where + ": missing id/title"];
    if (!Array.isArray(t.slides)) e.push(where + ": slides must be an array of slide numbers");
    var o = t.overview || {};
    if (!o.about || !Array.isArray(o.objectives)) e.push(where + ": overview needs about + objectives[]");
    (t.notes || []).forEach(function (n, i) {
      if (!n.id || !n.heading || !n.simple) e.push(where + ".notes[" + i + "]: needs id, heading, simple");
    });
    if (!Array.isArray(t.notes) || !t.notes.length) e.push(where + ": at least one note section");
    (t.steps || []).forEach(function (s, i) { validateCheck(s.check, where + ".steps[" + i + "]", e); });
    if (t.visual) {
      if (VISUAL_TYPES.indexOf(t.visual.type) < 0) e.push(where + ".visual: unknown type " + t.visual.type);
      if (!t.visual.data) e.push(where + ".visual: missing data");
    }
    (t.examples || []).forEach(function (x, i) { validateCheck(x.check, where + ".examples[" + i + "]", e); });
    (t.flashcards || []).forEach(function (f, i) { if (!f.id || !f.front || !f.back) e.push(where + ".flashcards[" + i + "]: needs id/front/back"); });
    var ids = {};
    (t.quiz || []).forEach(function (q, i) {
      validateQuestion(q, where + ".quiz[" + i + "]", e);
      if (ids[q.id]) e.push(where + ": duplicate question id " + q.id);
      ids[q.id] = 1;
    });
    return e;
  }

  /**
   * FUNCTION: validateCourse(c)
   * PURPOSE: checks a whole course before it is stored or shown.
   * USER-VISIBLE BEHAVIOR: on upload, errors are listed in the upload panel.
   * OUTPUT: { ok: boolean, errors: string[] }
   */
  function validateCourse(c) {
    var e = [];
    if (!c || !c.id || !c.title) return { ok: false, errors: ["course: missing id/title"] };
    if (!Array.isArray(c.decks)) e.push("course: decks[] missing");
    if (!Array.isArray(c.chapters) || !c.chapters.length) e.push("course: needs at least one chapter");
    var topicIds = {};
    (c.chapters || []).forEach(function (ch, ci) {
      if (!ch.id || !ch.title || !Array.isArray(ch.topics)) e.push("chapters[" + ci + "]: needs id, title, topics[]");
      (ch.topics || []).forEach(function (t) {
        if (topicIds[t.id]) e.push("duplicate topic id " + t.id);
        topicIds[t.id] = 1;
        e = e.concat(validateTopic(t, ch.id + "/" + t.id));
      });
    });
    return { ok: e.length === 0, errors: e };
  }

  FN.schema = { validateCourse: validateCourse, validateTopic: validateTopic, QUESTION_TYPES: QUESTION_TYPES, VISUAL_TYPES: VISUAL_TYPES };
  if (typeof module !== "undefined") module.exports = FN.schema;
})(typeof window !== "undefined" ? window : globalThis);
