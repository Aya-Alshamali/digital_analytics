/* =====================================================================
   FILE: js/store.js
   PURPOSE (beginner summary):
     Remembers everything about YOUR learning between visits: progress,
     XP, flashcard schedule, notes, highlights, bookmarks, settings and
     where you stopped. Small data goes to localStorage; uploaded courses
     (which can be large because of slide pictures) go to IndexedDB.
   FEATURES: FN.store.get()/save(), FN.store.update(fn), addXP(), award(),
     logStudy(), courses DB (putCourse/getCourses/deleteCourse).
   DEPENDENCIES: browser localStorage + IndexedDB only.
   SAFE TO EDIT: XP amounts in XP, badge list in BADGES.
   PRIVACY: all of this stays on this device. Nothing here is uploaded.
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var KEY = "focusnest:v1";

  var DEFAULTS = {
    activeChapter: null,        // the chapter being studied (chosen on the Chapters page)
    resume: null,                // { hash, section } — last place you studied
    progress: {},                // topicId → { tabs:{}, sections:{}, steps:0, quizBest:0, complete:false }
    notes: {},                   // topicId → your personal note text
    highlights: {},              // topicId → [text, ...]
    bookmarks: [],               // [{ topic, label, hash }]
    cards: {},                   // cardId  → { interval, due, reps, lapses, last, saved }
    quizHistory: [],             // [{ scope, mode, level, correct, total, at, missed:[sectionIds] }]
    xp: 0, badges: [],
    streakEnabled: false,        // optional, OFF by default (no guilt mechanics)
    studyLog: {},                // "2026-11-07" → minutes of finished focus sessions
    goals: { dailyMinutes: 20 },
    plan: null,                  // { days:[{date, topics:[ids]}] }
    parking: [],                 // [{ text, at }]
    timer: { focus: 15, brk: 5 },
    settings: { fontSize: 17, lineHeight: 1.7, width: 72, contrast: "normal", bg: "paper", theme: "light", reduceMotion: false, ttsRate: 0.95, voice: null, voiceEngine: "natural", naturalVoice: "af_heart", naturalQuality: "auto", navCollapsed: false, outlineHidden: false }
  };

  var state = load();

  function load() {
    try {
      var raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      var s = JSON.parse(JSON.stringify(DEFAULTS));
      Object.keys(raw).forEach(function (k) { s[k] = raw[k]; });
      s.settings = Object.assign({}, DEFAULTS.settings, raw.settings || {});
      return s;
    } catch (e) { return JSON.parse(JSON.stringify(DEFAULTS)); }
  }

  /**
   * FUNCTION: save()
   * PURPOSE: writes the state to localStorage. Called after every change.
   * FAILURE: storage full / private mode → shows a toast once, keeps working in memory.
   */
  var warned = false;
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(state)); }
    catch (e) { if (!warned && FN.toast) FN.toast("Could not save progress on this device (storage full or blocked)."); warned = true; }
  }

  // XP rewards — small, frequent, never taken away.
  var XP = { tab: 3, section: 5, step: 8, example: 6, card: 2, quiz: 2, topic: 50, micro: 6, focus: 15 };

  var BADGES = {
    "first-steps": { label: "First Steps", desc: "Opened your first lesson", icon: "footprints" },
    "explorer": { label: "Explorer", desc: "Visited all 7 tabs of one topic", icon: "compass" },
    "quiz-whiz": { label: "Quiz Whiz", desc: "Scored 100% on a quiz", icon: "trophy" },
    "card-shark": { label: "Card Shark", desc: "Reviewed 50 flashcards", icon: "layers" },
    "focus-finisher": { label: "Focus Finisher", desc: "Finished a focus session", icon: "timer" },
    "topic-done": { label: "Topic Mastered", desc: "Completed a topic (quiz ≥ 60%)", icon: "badge-check" },
    "chapter-champ": { label: "Chapter Champ", desc: "Completed every topic in a chapter", icon: "crown" },
    "parked": { label: "Thought Parker", desc: "Parked a distraction instead of switching tasks", icon: "sticky-note" }
  };

  function today(d) { d = d || new Date(); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); }

  FN.store = {
    get: function () { return state; },
    save: save,
    today: today,
    XP: XP, BADGES: BADGES,
    update: function (fn) { fn(state); save(); if (FN.refreshXP) FN.refreshXP(); },
    topic: function (id) { return (state.progress[id] = state.progress[id] || { tabs: {}, sections: {}, steps: 0, quizBest: 0, complete: false }); },
    addXP: function (n, why) {
      state.xp += n; save();
      if (FN.refreshXP) FN.refreshXP();
      if (FN.toast && why) FN.toast("+" + n + " XP · " + why, "xp");
    },
    level: function () { return Math.floor(state.xp / 200) + 1; },
    /**
     * FUNCTION: award(badgeId)
     * PURPOSE: gives a badge the first time its condition is met.
     */
    award: function (id) {
      if (!BADGES[id] || state.badges.indexOf(id) >= 0) return;
      state.badges.push(id); save();
      if (FN.toast) FN.toast("Badge earned: " + BADGES[id].label, "badge");
    },
    logStudy: function (min) { var k = today(); state.studyLog[k] = (state.studyLog[k] || 0) + min; save(); },
    reset: function () { state = JSON.parse(JSON.stringify(DEFAULTS)); save(); }
  };

  /* ---------- IndexedDB: uploaded courses ---------- */
  var dbp = null;
  function db() {
    if (dbp) return dbp;
    dbp = new Promise(function (res, rej) {
      var r = indexedDB.open("focusnest", 1);
      r.onupgradeneeded = function () { r.result.createObjectStore("courses", { keyPath: "id" }); };
      r.onsuccess = function () { res(r.result); };
      r.onerror = function () { rej(r.error); };
    });
    return dbp;
  }
  function tx(mode, fn) {
    return db().then(function (d) {
      return new Promise(function (res, rej) {
        var t = d.transaction("courses", mode), req = fn(t.objectStore("courses"));
        t.oncomplete = function () { res(req && req.result); };
        t.onerror = function () { rej(t.error); };
      });
    });
  }
  FN.store.putCourse = function (c) { return tx("readwrite", function (s) { return s.put(c); }); };
  FN.store.getCourses = function () { return tx("readonly", function (s) { return s.getAll(); }).catch(function () { return []; }); };
  FN.store.deleteCourse = function (id) { return tx("readwrite", function (s) { return s.delete(id); }); };
})();
