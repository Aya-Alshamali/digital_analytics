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
  FN.reducedMotion = function () { return document.documentElement.hasAttribute("data-reduce-motion"); };

  /** speak(text): text-to-speech using the browser voice. */
  FN.speak = function (text) {
    if (!("speechSynthesis" in window)) { FN.toast("Text-to-speech is not available in this browser."); return false; }
    speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.rate = FN.store.get().settings.ttsRate || 1;
    speechSynthesis.speak(u);
    return true;
  };
  FN.stopSpeak = function () { if ("speechSynthesis" in window) speechSynthesis.cancel(); };
})();
