/* =====================================================================
   FILE: js/app.js
   PURPOSE (beginner summary):
     Starts the app and acts as the "router": it reads the address hash
     (#/dashboard, #/learn/c1t2/notes, …) and asks the right file to draw
     that page. Also wires the always-visible buttons (menu, outline,
     timer, parking lot) and the XP chip in the sidebar.
   STARTUP ORDER: apply settings → load courses → resume last place → draw.
   DEPENDENCIES: every other js/ file (loaded before this one).
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});

  /** refreshXP(): updates the sidebar chip (level, XP, optional streak). */
  FN.refreshXP = function () {
    var s = FN.store.get(), el = document.getElementById("xpChip"); if (!el) return;
    var streak = 0;
    if (s.streakEnabled) {
      var active = {};
      Object.keys(s.studyLog).forEach(function (k) { if (s.studyLog[k] > 0) active[k] = 1; });
      s.quizHistory.forEach(function (h) { active[FN.store.today(new Date(h.at))] = 1; });
      for (var i = 0; i < 400; i++) { var d = FN.store.today(new Date(Date.now() - i * 864e5)); if (active[d]) streak++; else if (i > 0) break; }
    }
    el.innerHTML = FN.icon("zap") + "<span><strong>Level " + FN.store.level() + "</strong><small>" + s.xp + " XP</small></span>" + (s.streakEnabled ? '<span class="streak" title="Days in a row with study activity">' + FN.icon("flame") + streak + "</span>" : "");
    FN.icons();
  };

  /**
   * FUNCTION: applyPanels() / togglePanel(name)
   * PURPOSE: hide or show the side panels and remember the choice on this device.
   *   navCollapsed → left sidebar shrinks to an icon rail (hover an icon to see its name)
   *   outlineHidden → the chapters column disappears; the "chapters" button in the
   *                   top bar brings it back.
   */
  function applyPanels() {
    var s = FN.store.get().settings, app = document.getElementById("app"), t = document.getElementById("navToggle");
    app.classList.toggle("nav-collapsed", !!s.navCollapsed);
    app.classList.toggle("outline-hidden", !!s.outlineHidden);
    t.setAttribute("aria-expanded", !s.navCollapsed);
    t.title = s.navCollapsed ? "Expand sidebar" : "Collapse sidebar";
    t.innerHTML = FN.icon(s.navCollapsed ? "panel-left-open" : "panel-left-close") + "<span>" + t.title + "</span>";
    document.getElementById("outlineBtn").setAttribute("aria-label", s.outlineHidden ? "Show chapters" : "Chapters");
    FN.icons();
  }
  FN.applyPanels = applyPanels;
  function togglePanel(name) {
    FN.store.update(function (st) { st.settings[name] = !st.settings[name]; });
    applyPanels();
  }

  /**
   * FUNCTION: route()
   * PURPOSE: draws the page named in the hash.
   * USER ACTION: any sidebar link, lesson link, browser back/forward.
   * FAILURE: unknown hash → dashboard.
   */
  function route() {
    var parts = (location.hash || "#/dashboard").slice(2).split("/");
    var name = parts[0] || "dashboard";
    FN.stopSpeak();
    document.getElementById("app").classList.remove("nav-open", "outline-open");
    document.getElementById("menuBtn").setAttribute("aria-expanded", "false");
    FN.$$("#nav a").forEach(function (a) { a.classList.toggle("on", a.dataset.route === name || (name === "learn" && a.dataset.route === "chapters")); a.toggleAttribute("aria-current", a.dataset.route === name); });
    document.getElementById("readBar").style.width = "0";
    if (name === "learn") {
      FN.lesson.show(parts[1], parts[2], parts[3]);
    } else {
      var page = FN.pages[name] || FN.pages.dashboard;
      if (!FN.pages[name]) name = "dashboard";
      document.getElementById("topbarTitle").textContent = document.querySelector('#nav a[data-route="' + name + '"] span').textContent;
      page(parts[1]);
      document.getElementById("view").scrollTop = 0;
    }
    FN.renderOutline();
    FN.refreshXP();
    FN.focus.renderTimerChip();
  }

  document.addEventListener("DOMContentLoaded", function () {
    FN.applySettings();
    // Menu (mobile) and outline (tablet) toggles.
    document.getElementById("menuBtn").onclick = function () { var o = document.getElementById("app").classList.toggle("nav-open"); this.setAttribute("aria-expanded", o); };
    // Chapters button: on desktop it un-hides the chapter column; on tablet/mobile it opens it as a drawer.
    document.getElementById("outlineBtn").onclick = function () {
      var app = document.getElementById("app");
      if (app.classList.contains("outline-hidden") && window.innerWidth > 1180) togglePanel("outlineHidden");
      else app.classList.toggle("outline-open");
    };
    // Collapse sidebar button (bottom of the left sidebar).
    document.getElementById("navToggle").onclick = function () { togglePanel("navCollapsed"); };
    // "Hide chapters" button inside the chapter column header (drawn by js/pages.js).
    document.getElementById("outline").addEventListener("click", function (e) {
      if (e.target.closest("[data-hide-outline]")) {
        var app = document.getElementById("app");
        if (app.classList.contains("outline-open")) app.classList.remove("outline-open"); else togglePanel("outlineHidden");
      }
    });
    applyPanels();
    document.getElementById("sidebar").addEventListener("click", function (e) { if (e.target.closest("a")) document.getElementById("app").classList.remove("nav-open"); });
    document.getElementById("outline").addEventListener("click", function (e) { if (e.target.closest("a")) document.getElementById("app").classList.remove("outline-open"); });
    // Parking lot button → js/focus.js openParkingLot.
    document.getElementById("parkingBtn").onclick = FN.focus.openParkingLot;
    // Timer chip → timer panel (events from startTimer/finish).
    document.getElementById("timerChip").onclick = function (e) { if (e.target.closest("#timerOpen")) FN.focus.openTimer(); };
    // Keep the system "reduce motion" preference in sync while the app is open.
    if (window.matchMedia) window.matchMedia("(prefers-reduced-motion: reduce)").addEventListener("change", FN.applySettings);

    FN.courses.load().then(function () {
      if (FN.courses.problems.length) FN.toast("Some sample lessons have data problems — see the console.");
      // Resume where I left off: with no address, go back to the exact lesson/tab/section.
      var res = FN.store.get().resume;
      if (!location.hash && res && FN.courses.find(res.topic)) location.replace(res.hash);
      window.addEventListener("hashchange", route);
      route();
    });
  });
})();
