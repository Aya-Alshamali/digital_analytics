/* =====================================================================
   FILE: js/course.js
   PURPOSE (beginner summary):
     FocusNest teaches ONE course: Digital and Social Media Analytics.
     This file builds that course and answers questions like "which topic
     has id c2t3?", "give me slide 14 of chapter 2" or "which chapter is
     the student studying right now?".
       - Chapters 1 and 2 come from the data files (data/*.js).
       - Extra chapters the student uploads (Chapters page → "Add a chapter")
         are stored in IndexedDB and appended here as Chapter 3, 4, …
   FEATURES: FN.courses.load(), .active(), .chapters(), .activeChapter(),
     .setChapter(), .addChapters(), .removeChapter(), .find(), .slide(),
     .topics(), .finalQuiz().
   DEPENDENCIES: js/schema.js, js/store.js, data/slides.js, data/ch*.js.
   SAFE TO EDIT: the course title/subtitle and chapter titles in buildCourse().
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var course = null;
  var problems = [];

  /** buildCourse(): joins the slide decks and lesson parts into the one course object. */
  function buildCourse() {
    var decks = (window.FN_SEED_SLIDES || []).slice();
    var parts = (window.FN_SEED || []).slice().sort(function (a, b) {
      return a.chapter === b.chapter ? a.order - b.order : a.chapter < b.chapter ? -1 : 1;
    });
    var chapters = [];
    parts.forEach(function (p) {
      var ch = chapters.filter(function (c) { return c.id === p.chapter; })[0];
      if (!ch) { ch = { id: p.chapter, deck: p.chapter, title: p.title, topics: [] }; chapters.push(ch); }
      ch.topics = ch.topics.concat(p.topics);
    });
    var titles = { ch1: "Chapter 1 · Introduction to Web / Digital Analytics", ch2: "Chapter 2 · The Technical Essentials of Web Analytics" };
    chapters.forEach(function (c) { if (titles[c.id]) c.title = titles[c.id]; });
    return {
      id: "dsma", origin: "sample",
      title: "Digital and Social Media Analytics",
      subtitle: "Dr. Ammar Qasaimeh · Fall 2026",
      decks: decks, chapters: chapters
    };
  }

  /** mergePack(pack): appends an uploaded chapter pack (from js/parser.js) as new numbered chapters. */
  function mergePack(pack) {
    pack.chapters.forEach(function (ch) {
      var deck = pack.decks.filter(function (d) { return d.id === ch.deck; })[0];
      if (!deck) return;
      ch.pack = pack.id;
      ch.uploaded = true;
      ch.title = "Chapter " + (course.chapters.length + 1) + " · " + deck.name.replace(/\.(pptx|pdf)$/i, "");
      course.decks.push(deck);
      course.chapters.push(ch);
    });
  }

  FN.courses = {
    problems: problems,
    /** load(): builds the course, then appends uploaded chapters (async: they live in IndexedDB). */
    load: function () {
      course = buildCourse();
      var v = FN.schema.validateCourse(course);
      if (!v.ok) { problems.push.apply(problems, v.errors); console.warn("Course data problems:", v.errors); }
      return FN.store.getCourses().then(function (packs) {
        (packs || []).sort(function (a, b) { return (a.created || "") < (b.created || "") ? -1 : 1; })
          .forEach(function (p) { if (FN.schema.validateCourse(p).ok) mergePack(p); });
        return course;
      });
    },
    /** The one course. (all() and get() are kept so other files stay simple.) */
    active: function () { return course; },
    all: function () { return course ? [course] : []; },
    get: function () { return course; },
    chapters: function () { return course ? course.chapters : []; },
    /** activeChapter(): the chapter the student chose, or null if they haven't chosen yet. */
    activeChapter: function () {
      var id = FN.store.get().activeChapter;
      return FN.courses.chapters().filter(function (c) { return c.id === id; })[0] || null;
    },
    setChapter: function (id) { FN.store.update(function (s) { s.activeChapter = id; }); },
    /** addChapters(pack): saves an uploaded pack and adds its chapters to the course. */
    addChapters: function (pack) {
      return FN.store.putCourse(pack).then(function () { mergePack(pack); return pack; });
    },
    /** removeChapter(packId): deletes an uploaded pack; chapters are re-numbered on next load. */
    removeChapter: function (packId) {
      return FN.store.deleteCourse(packId).then(function () { return FN.courses.load(); });
    },
    /** topics(): flat list [{course, chapter, topic, index}] in study order. */
    topics: function () {
      var out = [];
      if (!course) return out;
      course.chapters.forEach(function (ch) { ch.topics.forEach(function (t) { out.push({ course: course, chapter: ch, topic: t, index: out.length }); }); });
      return out;
    },
    /** find(topicId): returns {course, chapter, topic, index} or undefined. */
    find: function (topicId) {
      return FN.courses.topics().filter(function (x) { return x.topic.id === topicId; })[0];
    },
    deck: function (c, deckId) { return ((c || course).decks || []).filter(function (d) { return d.id === deckId; })[0]; },
    slide: function (c, deckId, n) { var d = FN.courses.deck(c, deckId); return d && d.slides.filter(function (s) { return s.n === n; })[0]; },
    /**
     * finalQuiz(chapter?): two questions per topic, taken from the real topic quizzes.
     * With a chapter → that chapter's quiz; without → the whole course.
     */
    finalQuiz: function (chapter) {
      var qs = [];
      FN.courses.topics().filter(function (x) { return !chapter || x.chapter === chapter; }).forEach(function (x) {
        var pool = (x.topic.quiz || []).slice();
        var hard = pool.filter(function (q) { return q.difficulty !== "easy"; });
        var pick = [hard[0] || pool[0], pool.filter(function (q) { return q !== (hard[0] || pool[0]); })[Math.floor(pool.length / 2)]];
        pick.forEach(function (q) { if (q) qs.push(Object.assign({ _topic: x.topic.id }, q)); });
      });
      return qs;
    }
  };
})();
