/* =====================================================================
   FILE: js/regex-lab.js
   PURPOSE (beginner summary):
     The "Regex Lab" page (#/regex). Two parts:
       1. Playground – type a pattern, pick a tool (GA4, GTM, BigQuery…),
          and see at once which test values match, what part matched and
          what each bracket saved ($1, $2…).
       2. Exercises – the 8 exercises from Chapter 3 (slides 74–76). Each one
          is checked against values that MUST match and values that must NOT.
     Everything runs in the browser; nothing is sent anywhere.
   NOTE: the browser uses JavaScript regex, not Google's RE2. They agree on
     every symbol in the chapter. The page warns when you type something RE2
     rejects (lookarounds like (?! and backreferences like \1).
   DEPENDENCIES: ui.js (FN.esc, FN.icon, FN.celebrate), store.js, pages.js
     (must load before this file, because this file adds FN.pages.regex).
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});

  /* ---------------- 1. matching logic (also used by tests/check.js) ---------------- */

  // How each tool matches (chapter 3, slide 11).
  var MODES = {
    ga4:   { label: "GA4 (full match, case-sensitive)", full: true, i: false },
    gtm:   { label: "GTM trigger: matches RegEx (partial)", full: false, i: false },
    gtmi:  { label: "GTM trigger: matches RegEx (ignore case)", full: false, i: true },
    table: { label: "GTM RegEx Table (full, ignore case)", full: true, i: true },
    bq:    { label: "BigQuery / Data Studio REGEXP_CONTAINS (partial)", full: false, i: false }
  };

  /**
   * FUNCTION: compile(pattern, modeKey)
   * PURPOSE: turns what the user typed into a JavaScript RegExp that behaves like the chosen tool.
   *   Full match = the pattern must describe the WHOLE value, so we wrap it as ^(?:pattern)$.
   *   A leading (?i) (BigQuery, Data Studio, Search Console) becomes the "i" flag.
   * RETURNS: { re, error, warn }  (re is null when the pattern is invalid)
   */
  function compile(pattern, modeKey) {
    var m = MODES[modeKey] || MODES.ga4, p = pattern, flags = m.i ? "i" : "", warn = [];
    if (p.indexOf("(?i)") === 0) { p = p.slice(4); flags = "i"; if (modeKey === "ga4") warn.push("GA4 does not understand (?i). Lowercase the values in GTM instead (slide 37)."); }
    if (/\(\?<?[=!]/.test(p)) warn.push("RE2 (GA4, BigQuery, Data Studio) rejects lookarounds like (?! and (?=. Write two conditions instead (slides 19–20).");
    if (/\\[1-9]/.test(p)) warn.push("RE2 does not support backreferences like \\1 (slide 20).");
    if (/\|\)?$/.test(p) && p.length > 1) warn.push("The pattern ends with a pipe |, so the empty last option matches every value (slide 23).");
    try { return { re: new RegExp(m.full ? "^(?:" + p + ")$" : p, flags), error: null, warn: warn }; }
    catch (e) { return { re: null, error: e.message.replace(/^Invalid regular expression: /, ""), warn: warn }; }
  }

  /** run(re, value): { ok, start, end, groups } for one test value. */
  function run(re, value) {
    var m = re.exec(value);
    if (!m) return { ok: false, groups: [] };
    return { ok: true, start: m.index, end: m.index + m[0].length, groups: m.slice(1) };
  }

  /** grade(exercise, pattern): checks every test value. RETURNS { pass, rows, error, warn }. */
  function grade(ex, pattern) {
    var c = compile(pattern, ex.mode), rows = [];
    if (!c.re) return { pass: false, rows: rows, error: c.error, warn: c.warn };
    ex.yes.forEach(function (v) { var r = run(c.re, v); rows.push({ v: v, want: true, got: r.ok }); });
    ex.no.forEach(function (v) { var r = run(c.re, v); rows.push({ v: v, want: false, got: r.ok }); });
    return { pass: pattern.trim() !== "" && c.warn.length === 0 && rows.every(function (r) { return r.want === r.got; }), rows: rows, error: null, warn: c.warn };
  }

  // The 8 exercises from slide 74, answers from slides 75–76.
  // "yes" = values that must match, "no" = values that must not.
  var EXERCISES = [
    { id: "ex1", mode: "ga4", field: "page_location",
      task: "RJ: Business-class receipts only, in all three languages and both English spellings.",
      yes: ["https://www.rj.com/en/booking-confirmed/business/receipt.aspx?pnr=K7Q2LM", "https://www.rj.com/en/bookingconfirmed/business/receipt.aspx", "https://www.rj.com/fr/reservation-confirmee/business/receipt.aspx?pnr=R4T8WX", "https://www.rj.com/ar/tam-alhajz/business/receipt.aspx"],
      no: ["https://www.rj.com/en/booking-confirmed/economy/receipt.aspx", "https://www.rj.com/en/booking-cancelled/business/receipt.aspx", "https://www.rj.com/en/help/business/faq"],
      hint: "GA4 needs a full match: start with .* and allow anything after receipt\\.aspx.",
      answer: ".*/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/business/receipt\\.aspx.*",
      why: "Same as the full pattern, with business only; .* at both ends because GA4 needs a full match.", ref: "s.75" },
    { id: "ex2", mode: "gtm", field: "Page Path",
      task: "The same as exercise 1, but as a GTM trigger on Page Path.",
      yes: ["/en/booking-confirmed/business/receipt.aspx", "/en/bookingconfirmed/business/receipt.aspx", "/fr/reservation-confirmee/business/receipt.aspx", "/ar/tam-alhajz/business/receipt.aspx"],
      no: ["/help/en/booking-confirmed/business/receipt.aspx", "/en/booking-confirmed/economy/receipt.aspx", "/en/booking-confirmed/business/receipt.aspx-old"],
      hint: "GTM triggers match partially, so anchor both ends with ^ and $. Page Path has no domain and no ?pnr= part.",
      answer: "^/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/business/receipt\\.aspx$",
      why: "Page Path has no domain or query string, and GTM needs anchors.", ref: "s.75" },
    { id: "ex3", mode: "ga4", field: "IP address",
      task: "Internal traffic from 10.20.30.1 to 10.20.30.9.",
      yes: ["10.20.30.1", "10.20.30.5", "10.20.30.9"],
      no: ["10.20.30.0", "10.20.30.10", "10.20.31.1", "10x20x30x1"],
      hint: "Escape every dot with \\. and use one character from a list for the last digit.",
      answer: "10\\.20\\.30\\.[1-9]",
      why: "One digit from 1 to 9; full match excludes .10 and above.", ref: "s.75" },
    { id: "ex4", mode: "ga4", field: "Page path",
      task: "Any page in the /en/ or /ar/ blog, but not the blog's main page.",
      yes: ["/en/blog/summer-fares", "/ar/blog/amman-guide"],
      no: ["/en/blog/", "/fr/blog/summer-fares", "/en/news/blog/x"],
      hint: "+ means one or more, so it forces at least one character after /blog/.",
      answer: "^/(en|ar)/blog/.+",
      why: "The + requires at least one character after /blog/, so the main page is excluded.", ref: "s.75" },
    { id: "ex5", mode: "ga4", field: "Session source",
      task: "Session source from Google, Bing or DuckDuckGo, in any country.",
      yes: ["google", "google.jo", "google.co.uk", "bing", "duckduckgo"],
      no: ["facebook", "yahoo", "chatgpt.com"],
      hint: "Greedy on purpose: one word covers every country. Remember GA4 is a full match.",
      answer: ".*(google|bing|duckduckgo).*",
      why: "Greedy on purpose: one word covers google.jo, google.co.uk and so on.", ref: "s.75" },
    { id: "ex6", mode: "gtmi", field: "Click URL",
      task: "A GTM click trigger for links to Word, Excel or PowerPoint files, any capitalisation.",
      yes: ["https://www.rj.com/files/fares.docx", "https://www.rj.com/files/old-fares.doc", "https://www.rj.com/files/report.XLSX", "https://www.rj.com/f/deck.ppt?v=2"],
      no: ["https://www.rj.com/files/fares.pdf", "https://www.rj.com/docs/page", "https://www.rj.com/f/report.xlsx.html"],
      hint: "x? makes the x optional (doc and docx). After the extension allow the end ($) or a ?.",
      answer: "\\.(docx?|xlsx?|pptx?)($|\\?)",
      why: "x? covers old and new formats; ($|\\?) allows a query string after the file name.", ref: "s.76" },
    { id: "ex7", mode: "ga4", field: "Event name",
      task: "Event names that start with form_ and end with _submit.",
      yes: ["form_contact_submit", "form_newsletter_submit"],
      no: ["form_contact_start", "contact_form_submit", "form_contact_submit_v2"],
      hint: "GA4's full match already fixes the start and the end. Fill the middle with .*",
      answer: "form_.*_submit",
      why: "Full match in GA4 already fixes the start and the end.", ref: "s.76" },
    { id: "ex8", mode: "ga4", field: "Session source",
      task: "Why is .*(chatgpt|perplexity|)*.* a bad pattern? Fix it so it finds only ChatGPT and Perplexity visits.",
      yes: ["chatgpt.com", "perplexity.ai", "www.perplexity.ai"],
      no: ["google", "facebook", "(direct)"],
      hint: "Paste the bad pattern first and look at what it matches. Then remove the empty option and the *.",
      answer: ".*(chatgpt|perplexity).*",
      why: "The empty option plus * and .* lets the pattern match every value.", ref: "s.76" }
  ];

  // Ready-made examples for the playground (all from the chapter).
  var PRESETS = [
    { name: "Confirmation pages, all languages (s.38)", mode: "ga4", pat: ".*/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/(economy|business)/receipt\\.aspx(\\?.*)?",
      vals: ["https://www.rj.com/en/booking-confirmed/economy/receipt.aspx?pnr=K7Q2LM", "https://www.rj.com/en/bookingconfirmed/business/receipt.aspx", "https://www.rj.com/fr/reservation-confirmee/economy/receipt.aspx?pnr=R4T8WX", "https://www.rj.com/ar/tam-alhajz/business/receipt.aspx", "https://www.rj.com/en/booking-unconfirmed/economy/receipt.aspx"] },
    { name: "Cabin + language with capture groups (s.28)", mode: "table", pat: "^/(en|fr|ar)/[^/]+/(economy|business)/receipt\\.aspx$",
      vals: ["/fr/reservation-confirmee/business/receipt.aspx", "/en/booking-confirmed/economy/receipt.aspx", "/ar/tam-alhajz/business/receipt.aspx", "/en/royal-club/join"] },
    { name: "Office IP range .1 to .25 (s.40)", mode: "ga4", pat: "198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5])",
      vals: ["198.51.100.1", "198.51.100.19", "198.51.100.25", "198.51.100.26", "198.51.100.0", "198.51.100.250"] },
    { name: "Same pattern, different tool (s.12–14)", mode: "gtm", pat: "booking-confirmed",
      vals: ["/en/Booking-Confirmed/economy/receipt.aspx", "/en/booking-confirmed/economy/receipt.aspx"] },
    { name: "Email in the URL (s.61)", mode: "table", pat: ".*@.*",
      vals: ["https://www.rj.com/en/plan-and-book/fares", "https://www.rj.com/en/newsletter/thanks?email=sara@example.com", "https://www.rj.com/en/royal-club/join?ref=newsletter"] }
  ];

  FN.regexLab = { MODES: MODES, compile: compile, run: run, grade: grade, EXERCISES: EXERCISES, PRESETS: PRESETS };

  /* ---------------- 2. the page ---------------- */
  if (!FN.pages) return;   // tests load this file without the UI
  var esc = FN.esc;
  var SYMBOLS = ["\\", "|", "?", "( )", "[ ]", "{ }", ".", "+", "*", "^", "$", ".*", "\\d", "[^/]+", "(?i)"];
  var cur = 0;             // which exercise is shown

  /** highlight(value, result): the value with the matched part marked. */
  function highlight(v, r) {
    if (!r.ok) return esc(v);
    return esc(v.slice(0, r.start)) + "<mark>" + esc(v.slice(r.start, r.end)) + "</mark>" + esc(v.slice(r.end));
  }
  function modeOptions(sel) {
    return Object.keys(MODES).map(function (k) { return '<option value="' + k + '"' + (k === sel ? " selected" : "") + ">" + esc(MODES[k].label) + "</option>"; }).join("");
  }
  function notes(c) {
    return (c.error ? '<p class="rx-msg bad">' + FN.icon("circle-x") + " Not a valid pattern: " + esc(c.error) + "</p>" : "") +
      c.warn.map(function (w) { return '<p class="rx-msg warn">' + FN.icon("triangle-alert") + " " + esc(w) + "</p>"; }).join("");
  }

  /** drawPlay(): re-tests every value whenever the pattern, tool or values change. */
  function drawPlay() {
    var pat = document.getElementById("rxPat").value, mode = document.getElementById("rxMode").value;
    var vals = document.getElementById("rxVals").value.split("\n").filter(function (x) { return x.trim() !== ""; });
    var out = document.getElementById("rxOut"), c = compile(pat, mode);
    if (!pat) { out.innerHTML = '<p class="muted small">Type a pattern above. Results update as you type.</p>'; return; }
    if (!c.re) { out.innerHTML = notes(c); FN.icons(); return; }
    var n = 0;
    out.innerHTML = notes(c) + '<ul class="rx-results">' + vals.map(function (v) {
      var r = run(c.re, v); if (r.ok) n++;
      var g = r.groups.map(function (x, i) { return '<span class="rx-group">$' + (i + 1) + " = " + (x === undefined ? "<em>empty</em>" : esc(x)) + "</span>"; }).join("");
      return '<li class="' + (r.ok ? "yes" : "no") + '">' + FN.icon(r.ok ? "circle-check" : "circle-minus") + '<span class="rx-val">' + highlight(v, r) + "</span>" + (r.ok && g ? '<span class="rx-groups">' + g + "</span>" : "") + "</li>";
    }).join("") + '</ul><p class="muted small">' + n + " of " + vals.length + " values match. " + (MODES[mode].full ? "Full match: the pattern must describe the whole value." : "Partial match: the highlighted part is what matched.") + "</p>";
    FN.icons();
  }

  /** drawExercise(): shows exercise `cur` with its dots, input and buttons. */
  function drawExercise() {
    var ex = EXERCISES[cur], solved = FN.store.get().regexSolved || {};
    var box = document.getElementById("rxEx");
    box.innerHTML =
      '<div class="rx-dots" role="tablist" aria-label="Exercises">' + EXERCISES.map(function (e, i) {
        return '<button role="tab" class="rx-dot' + (i === cur ? " on" : "") + (solved[e.id] ? " done" : "") + '" data-ex="' + i + '" aria-selected="' + (i === cur) + '" aria-label="Exercise ' + (i + 1) + (solved[e.id] ? ", solved" : "") + '">' + (solved[e.id] ? FN.icon("check") : i + 1) + "</button>";
      }).join("") + '<span class="muted small">' + Object.keys(solved).length + " of " + EXERCISES.length + " solved</span></div>" +
      '<h3>Exercise ' + (cur + 1) + '<span class="chip-slide inline">' + ex.ref + "</span></h3>" +
      "<p>" + esc(ex.task) + "</p>" +
      '<p class="muted small">Tool: <strong>' + esc(MODES[ex.mode].label) + "</strong> · tested value: <strong>" + esc(ex.field) + "</strong></p>" +
      '<label class="rx-field"><span class="sr-only">Your pattern</span><textarea id="rxAns" class="rx-input rx-big" rows="2" spellcheck="false" autocomplete="off" placeholder="type your pattern here…">' + esc((FN.store.get().regexDrafts || {})[ex.id] || "") + '</textarea></label>' +
      '<div class="row"><button class="btn btn-primary" id="rxCheck">' + FN.icon("check-check") + " Check</button>" +
      '<button class="btn btn-soft" id="rxHint">' + FN.icon("lightbulb") + " Hint</button>" +
      '<button class="btn btn-ghost" id="rxShow">' + FN.icon("eye") + " Show the slide answer</button>" +
      '<button class="btn btn-ghost" id="rxTry">' + FN.icon("flask-conical") + " Open in playground</button></div>" +
      '<div id="rxFeedback" aria-live="polite"></div>' +
      '<div class="row rx-nav"><button class="btn btn-ghost" id="rxPrev"' + (cur ? "" : " disabled") + ">" + FN.icon("arrow-left") + " Previous</button>" +
      '<button class="btn btn-ghost" id="rxNext"' + (cur < EXERCISES.length - 1 ? "" : " disabled") + ">Next " + FN.icon("arrow-right") + "</button></div>";
    FN.icons();
    var inp = document.getElementById("rxAns");
    grow(inp);
    inp.oninput = function () { grow(inp); FN.store.update(function (s) { s.regexDrafts = s.regexDrafts || {}; s.regexDrafts[ex.id] = inp.value; }); };
    inp.onkeydown = function (e) { if (e.key === "Enter") { e.preventDefault(); check(); } };   // a pattern is one line
    document.getElementById("rxCheck").onclick = check;
    document.getElementById("rxHint").onclick = function () { document.getElementById("rxFeedback").innerHTML = '<p class="rx-msg hint">' + FN.icon("lightbulb") + " " + esc(ex.hint) + "</p>"; FN.icons(); };
    document.getElementById("rxShow").onclick = function () {
      document.getElementById("rxFeedback").innerHTML = '<div class="rx-answer"><span class="eyebrow">From the slides (' + ex.ref + ')</span><code>' + esc(ex.answer) + "</code><p>" + esc(ex.why) + "</p></div>";
    };
    document.getElementById("rxTry").onclick = function () {
      setPlay(ex.mode, inp.value || ex.answer, ex.yes.concat(ex.no));
      document.getElementById("rxPlayCard").scrollIntoView({ behavior: FN.reducedMotion() ? "auto" : "smooth" });
    };
    document.getElementById("rxPrev").onclick = function () { cur--; drawExercise(); };
    document.getElementById("rxNext").onclick = function () { cur++; drawExercise(); };
    FN.$$("#rxEx [data-ex]").forEach(function (b) { b.onclick = function () { cur = +b.dataset.ex; drawExercise(); }; });

    function check() {
      var g = grade(ex, inp.value), fb = document.getElementById("rxFeedback");
      if (g.error) { fb.innerHTML = '<p class="rx-msg bad">' + FN.icon("circle-x") + " Not a valid pattern: " + esc(g.error) + "</p>"; FN.icons(); return; }
      var wrong = g.rows.filter(function (r) { return r.want !== r.got; }).length;
      fb.innerHTML = notes({ warn: g.warn }) +
        '<p class="rx-msg ' + (g.pass ? "good" : "bad") + '">' + FN.icon(g.pass ? "party-popper" : "circle-alert") + " " +
        (g.pass ? "All " + g.rows.length + " checks pass. Well done!" : wrong ? wrong + " of " + g.rows.length + " checks are wrong. Look at the red rows." : "Fix the warning above first.") + "</p>" +
        '<table class="rx-table"><thead><tr><th>Value</th><th>Should match?</th><th>Your pattern</th></tr></thead><tbody>' + g.rows.map(function (r) {
          return '<tr class="' + (r.want === r.got ? "ok" : "bad") + '"><td><code>' + esc(r.v) + "</code></td><td>" + (r.want ? "yes" : "no") + "</td><td>" + FN.icon(r.want === r.got ? "check" : "x") + " " + (r.got ? "matched" : "no match") + "</td></tr>";
        }).join("") + "</tbody></table>";
      FN.icons();
      if (g.pass && !(FN.store.get().regexSolved || {})[ex.id]) {
        FN.store.update(function (s) { s.regexSolved = s.regexSolved || {}; s.regexSolved[ex.id] = Date.now(); s.xp += 10; });
        FN.celebrate("Exercise " + (cur + 1) + " solved! +10 XP");
        FN.refreshXP && FN.refreshXP();
        // redraw the dots but keep the feedback visible
        var keep = fb.innerHTML; drawExercise(); document.getElementById("rxFeedback").innerHTML = keep; FN.icons();
      }
    }
  }

  /** grow(el): makes a pattern box as tall as the text in it, so long patterns stay fully visible. */
  function grow(el) { el.style.height = "auto"; el.style.height = el.scrollHeight + 2 + "px"; }

  /** setPlay(mode, pattern, values): fills the playground and re-tests. */
  function setPlay(mode, pat, vals) {
    document.getElementById("rxMode").value = mode;
    document.getElementById("rxPat").value = pat;
    document.getElementById("rxVals").value = vals.join("\n");
    grow(document.getElementById("rxPat"));
    drawPlay();
  }

  /** insertAtCursor(text): symbol chips type into the pattern box where the cursor is. */
  function insertAtCursor(t) {
    var el = document.getElementById("rxPat"), a = el.selectionStart, b = el.selectionEnd;
    var put = t.replace(" ", "");                       // "( )" → "()"
    el.value = el.value.slice(0, a) + put + el.value.slice(b);
    var pos = a + (put.length === 2 && /^[(\[{]/.test(put) ? 1 : put.length);   // cursor inside brackets
    el.focus(); el.setSelectionRange(pos, pos); grow(el); drawPlay();
  }

  /**
   * FUNCTION: page()
   * PURPOSE: draws the Regex Lab page (route #/regex).
   */
  function page() {
    var V = document.getElementById("view"), p0 = PRESETS[0];
    V.innerHTML =
      '<header class="page-head"><h1>' + FN.icon("regex") + ' Regex Lab</h1><p class="muted">Practise the patterns from Chapter 3. Pick the tool, type a pattern, and see what it matches. Everything runs on this device.</p></header>' +
      '<section class="card" id="rxPlayCard"><h3>' + FN.icon("flask-conical") + " Playground</h3>" +
      '<div class="rx-top"><label>Tool<select id="rxMode">' + modeOptions(p0.mode) + "</select></label>" +
      '<label>Load an example<select id="rxPreset"><option value="">Choose…</option>' + PRESETS.map(function (p, i) { return '<option value="' + i + '">' + esc(p.name) + "</option>"; }).join("") + "</select></label></div>" +
      '<label class="rx-field"><span>Pattern</span><textarea id="rxPat" class="rx-input rx-big" rows="2" spellcheck="false" autocomplete="off">' + esc(p0.pat) + '</textarea></label>' +
      '<div class="chips rx-symbols" aria-label="Insert a symbol">' + SYMBOLS.map(function (s) { return '<button class="chip" data-sym="' + esc(s) + '" title="Insert ' + esc(s) + '"><code>' + esc(s) + "</code></button>"; }).join("") + "</div>" +
      '<label class="rx-field"><span>Test values <small class="muted">(one per line)</small></span><textarea id="rxVals" class="rx-input" rows="5" spellcheck="false">' + esc(p0.vals.join("\n")) + "</textarea></label>" +
      '<div id="rxOut" aria-live="polite"></div>' +
      '<p class="muted small">' + FN.icon("info") + " Tip from slide 6: also test values that must NOT match. On regex101.com choose the <strong>Golang</strong> flavour to get closest to RE2.</p></section>" +
      '<section class="card"><h3>' + FN.icon("target") + " Chapter 3 exercises</h3><div id=\"rxEx\"></div></section>";
    FN.icons();
    var pat = document.getElementById("rxPat");
    pat.oninput = function () { grow(pat); drawPlay(); };
    pat.onkeydown = function (e) { if (e.key === "Enter") e.preventDefault(); };   // a pattern is one line
    document.getElementById("rxVals").oninput = drawPlay;
    document.getElementById("rxMode").onchange = drawPlay;
    document.getElementById("rxPreset").onchange = function () { var p = PRESETS[this.value]; if (p) setPlay(p.mode, p.pat, p.vals); };
    FN.$$("[data-sym]").forEach(function (b) { b.onclick = function () { insertAtCursor(b.dataset.sym); }; });
    grow(pat);
    drawPlay();
    drawExercise();
  }

  FN.pages.regex = page;
})();
