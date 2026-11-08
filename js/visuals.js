/* =====================================================================
   FILE: js/visuals.js
   PURPOSE (beginner summary):
     Draws the "Visual" tab. Each topic may describe ONE visual in its data
     (type + data). This file knows how to draw 8 kinds:
       flow       – a process you can step through
       tree       – a hierarchy (e.g. GA4 Account → Property → Stream)
       timeline   – dated stages
       bars       – compare numbers between groups (e.g. attribution models)
       calculator – type numbers, watch the formula work
       dragsort   – drag cards into the right box
       selector   – try CSS selectors on a small sample web page
       compare    – two-column comparison table
     Every part is clickable and shows an explanation. Animated visuals have
     Play/Pause, Restart and a "Reduce motion" switch.
   DEPENDENCIES: js/ui.js helpers.
   SAFE TO EDIT: timings (STEP_MS) and colors in css/style.css (.viz-*).
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var esc = FN.esc, STEP_MS = 1700;

  /**
   * FUNCTION: FN.visuals.render(el, visual, topic)
   * PURPOSE: draws the visual into element `el`.
   * USER ACTION: student opens the Visual tab.
   * EXPECTED WEBSITE RESULT: interactive diagram, detail box, controls.
   * FAILURE: unknown type → message
   */
  var timer = null;
  function render(el, v, topic) {
    clearInterval(timer);
    if (!v) { el.innerHTML = '<div class="empty">' + FN.icon("eye-off") + "<p>The slides for this topic don't describe a process, hierarchy or comparison that a diagram would make clearer, so no visual was added. Use the Step-by-Step or Notes tabs instead.</p></div>"; FN.icons(); return; }
    var animated = ["flow", "tree", "timeline", "bars", "compare"].indexOf(v.type) >= 0;
    el.innerHTML =
      '<div class="viz"><div class="viz-head"><div><h3>' + esc(v.title || "Visual") + "</h3><p class=\"muted\">" + esc(v.caption || "") + "</p>" + FN.slideChips(v.slides) + "</div>" +
      (animated ? '<div class="viz-ctl" role="group" aria-label="Animation controls">' +
        '<button class="icon-btn" data-viz="play" aria-label="Play">' + FN.icon("play") + "</button>" +
        '<button class="icon-btn" data-viz="restart" aria-label="Restart">' + FN.icon("rotate-ccw") + "</button>" +
        '<label class="switch small"><input type="checkbox" data-viz="motion"' + (FN.reducedMotion() ? " checked" : "") + "> <span>Reduce motion</span></label></div>" : "") +
      '</div><div class="viz-stage viz-' + v.type + '"></div><div class="viz-detail" aria-live="polite"><p class="muted">' + FN.icon("mouse-pointer-click") + " Click any part of the diagram to read about it.</p></div></div>";
    var stage = el.querySelector(".viz-stage"), detail = el.querySelector(".viz-detail");
    function show(label, text) { detail.innerHTML = "<strong>" + esc(label) + "</strong><p>" + esc(text || "") + "</p>"; }
    var api = (TYPES[v.type] || unknown)(stage, v.data || {}, show);
    FN.icons();
    if (!animated) return;
    var playing = false, i = -1, total = api.count || 0;
    function tick() { i = (i + 1) % (total + 1); api.step(i); if (i === total) pause(); }
    function play() { if (playing) return; playing = true; setBtn(); if (i >= total) i = -1; tick(); timer = setInterval(tick, STEP_MS); }
    function pause() { playing = false; clearInterval(timer); setBtn(); }
    function setBtn() { var b = el.querySelector('[data-viz="play"]'); if (b) { b.innerHTML = FN.icon(playing ? "pause" : "play"); b.setAttribute("aria-label", playing ? "Pause" : "Play"); FN.icons(); } }
    var motion = el.querySelector('[data-viz="motion"]');
    // Play/Pause button → play()/pause(). Restart → shows step 0 again.
    el.querySelector(".viz-ctl").addEventListener("click", function (e) {
      var b = e.target.closest("[data-viz]"); if (!b || b === motion) return;
      if (b.dataset.viz === "play") { playing ? pause() : play(); }
      if (b.dataset.viz === "restart") { pause(); i = -1; api.step(-1); if (!motion.checked) play(); }
    });
    // Reduce-motion switch: stops animation and shows everything at once
    motion.addEventListener("change", function () {
      if (motion.checked) { pause(); api.step(total); i = total; } else { i = -1; api.step(-1); }
    });
    if (FN.reducedMotion()) { api.step(total); i = total; } else { api.step(-1); play(); }
  }
  function unknown(stage) { stage.innerHTML = '<p class="muted">This visual type is not supported.</p>'; return { count: 0, step: function () {} }; }

  /* ---------- the 8 visual kinds ---------- */
  var TYPES = {
    flow: function (stage, d, show) {
      var nodes = d.nodes || [];
      stage.innerHTML = '<ol class="flow">' + nodes.map(function (n, k) {
        return '<li><button class="node" data-k="' + k + '"><span class="num">' + (k + 1) + "</span><span>" + esc(n.label) + "</span></button></li>";
      }).join("") + "</ol>";
      stage.addEventListener("click", function (e) { var b = e.target.closest(".node"); if (!b) return; var n = nodes[+b.dataset.k]; show((+b.dataset.k + 1) + ". " + n.label, n.detail); mark(+b.dataset.k); });
      function mark(i) { FN.$$(".node", stage).forEach(function (b, k) { b.classList.toggle("on", k === i); b.classList.toggle("done", k < i); }); }
      return { count: nodes.length, step: function (i) { mark(i < nodes.length ? i : nodes.length); if (nodes[i]) show((i + 1) + ". " + nodes[i].label, nodes[i].detail); } };
    },
    tree: function (stage, d, show) {
      var flat = [];
      function draw(n, depth) {
        var k = flat.length; flat.push({ n: n, depth: depth });
        return '<li class="lvl-' + depth + '"><button class="node" data-k="' + k + '">' + esc(n.label) + "</button>" +
          ((n.children || []).length ? "<ul>" + n.children.map(function (c) { return draw(c, depth + 1); }).join("") + "</ul>" : "") + "</li>";
      }
      stage.innerHTML = '<ul class="tree">' + (d.root ? draw(d.root, 0) : "") + "</ul>";
      var maxDepth = flat.reduce(function (m, f) { return Math.max(m, f.depth); }, 0);
      stage.addEventListener("click", function (e) { var b = e.target.closest(".node"); if (!b) return; var f = flat[+b.dataset.k]; show(f.n.label, f.n.detail); FN.$$(".node", stage).forEach(function (x) { x.classList.toggle("on", x === b); }); });
      return { count: maxDepth + 1, step: function (i) {
        FN.$$(".node", stage).forEach(function (b) { var f = flat[+b.dataset.k]; b.parentNode.classList.toggle("hide", i >= 0 && f.depth > i); });
        var lvl = flat.filter(function (f) { return f.depth === i; })[0]; if (lvl) show(lvl.n.label, lvl.n.detail);
      } };
    },
    timeline: function (stage, d, show) {
      var ev = d.events || [];
      stage.innerHTML = '<div class="tl"><div class="tl-line"><span></span></div><ol>' + ev.map(function (x, k) {
        return '<li><button class="node" data-k="' + k + '"><span class="dot"></span><small>' + esc(x.date) + "</small><span>" + esc(x.label) + "</span></button></li>";
      }).join("") + "</ol></div>";
      var fill = stage.querySelector(".tl-line span");
      function mark(i) { FN.$$(".node", stage).forEach(function (b, k) { b.classList.toggle("on", k === i); b.classList.toggle("done", k <= i); }); fill.style.width = (ev.length ? Math.max(0, Math.min(1, (i + 1) / ev.length)) * 100 : 0) + "%"; }
      stage.addEventListener("click", function (e) { var b = e.target.closest(".node"); if (!b) return; var k = +b.dataset.k; mark(k); show(ev[k].date + " · " + ev[k].label, ev[k].detail); });
      return { count: ev.length, step: function (i) { mark(Math.min(i, ev.length - 1)); if (ev[i]) show(ev[i].date + " · " + ev[i].label, ev[i].detail); } };
    },
    bars: function (stage, d, show) {
      var groups = d.groups || [], series = d.series || [], unit = d.unit || "", g = 0;
      var max = Math.max.apply(null, series.map(function (s) { return Math.max.apply(null, s.values); }).concat([1]));
      stage.innerHTML = '<div class="seg" role="tablist">' + groups.map(function (x, k) { return '<button role="tab" data-g="' + k + '">' + esc(x) + "</button>"; }).join("") + "</div>" +
        '<div class="bars">' + series.map(function (s, k) { return '<button class="bar" data-s="' + k + '"><span class="bar-fill"></span><span class="bar-val"></span><span class="bar-lab">' + esc(s.label) + "</span></button>"; }).join("") + "</div>";
      function set(k) {
        g = k;
        FN.$$(".seg button", stage).forEach(function (b, j) { b.setAttribute("aria-selected", j === k); });
        FN.$$(".bar", stage).forEach(function (b, j) { var v = series[j].values[k] || 0; b.querySelector(".bar-fill").style.height = (v / max) * 100 + "%"; b.querySelector(".bar-val").textContent = v + unit; });
      }
      stage.addEventListener("click", function (e) {
        var t = e.target.closest("[data-g]"); if (t) { set(+t.dataset.g); show(groups[+t.dataset.g], ""); return; }
        var b = e.target.closest(".bar"); if (b) { var s = series[+b.dataset.s]; show(s.label + " — " + groups[g] + ": " + s.values[g] + unit, s.detail); }
      });
      set(0);
      return { count: groups.length, step: function (i) { set(Math.max(0, Math.min(i, groups.length - 1))); } };
    },
    calculator: function (stage, d, show) {
      var L = d.labels || { a: "A", b: "B" }, D = d.defaults || { a: 0, b: 0 };
      stage.innerHTML = '<div class="calc"><label>' + esc(L.a) + ' <input type="number" step="any" data-c="a" value="' + esc(D.a) + '"></label>' +
        '<label>' + esc(L.b) + ' <input type="number" step="any" data-c="b" value="' + esc(D.b) + '"></label>' +
        '<div class="calc-out"><code class="formula">' + esc(d.formula || "") + '</code><div class="calc-steps"></div><div class="calc-result"></div></div></div>';
      function run() {
        var a = parseFloat(stage.querySelector('[data-c="a"]').value), b = parseFloat(stage.querySelector('[data-c="b"]').value);
        var steps = stage.querySelector(".calc-steps"), out = stage.querySelector(".calc-result");
        var r = FN.visuals.calc(d.kind, a, b);
        if (r.error) { steps.textContent = ""; out.textContent = r.error; return; }
        steps.innerHTML = r.steps.map(function (s) { return "<div>" + esc(s) + "</div>"; }).join("");
        out.textContent = "= " + r.value.toFixed(2).replace(/\.00$/, "") + "%";
      }
      stage.addEventListener("input", function () { run(); });
      run(); show("How to use it", d.detail || "Change the numbers and watch each step of the formula update.");
      return { count: 0, step: function () {} };
    },
    dragsort: function (stage, d, show) {
      var items = FN.shuffle((d.items || []).map(function (x, k) { return Object.assign({ k: k }, x); })), picked = null;
      stage.innerHTML = '<p class="muted small">Drag each card into a box — or tap a card, then tap a box (keyboard: Tab to a card, Enter, then Enter on a box).</p>' +
        '<div class="pool" data-bucket="">' + items.map(function (x) { return '<button class="card-chip" draggable="true" data-k="' + x.k + '">' + esc(x.text) + "</button>"; }).join("") + "</div>" +
        '<div class="buckets">' + (d.buckets || []).map(function (b) { return '<div class="bucket" data-bucket="' + esc(b.id) + '" tabindex="0" role="button" aria-label="Box ' + esc(b.label) + '"><h4>' + esc(b.label) + '</h4><div class="drop"></div></div>'; }).join("") + "</div>" +
        '<div class="row"><button class="btn btn-primary" data-check>' + FN.icon("check") + " Check my sorting</button><button class=\"btn btn-ghost\" data-reset>" + FN.icon("rotate-ccw") + " Reset</button></div>";
      function place(chip, bucketEl) { (bucketEl.querySelector(".drop") || bucketEl).appendChild(chip); chip.classList.remove("picked", "right", "wrong"); picked = null; }
      stage.addEventListener("dragstart", function (e) { var c = e.target.closest(".card-chip"); if (c) { e.dataTransfer.setData("text/plain", c.dataset.k); } });
      stage.addEventListener("dragover", function (e) { if (e.target.closest("[data-bucket]")) e.preventDefault(); });
      stage.addEventListener("drop", function (e) { var b = e.target.closest("[data-bucket]"); if (!b) return; e.preventDefault(); var c = stage.querySelector('.card-chip[data-k="' + e.dataTransfer.getData("text/plain") + '"]'); if (c) place(c, b); });
      stage.addEventListener("click", function (e) {
        var c = e.target.closest(".card-chip"), b = e.target.closest("[data-bucket]");
        if (c) { if (picked) picked.classList.remove("picked"); picked = c === picked ? null : c; if (picked) picked.classList.add("picked"); var it = d.items[+c.dataset.k]; if (c.classList.contains("wrong") || c.classList.contains("right")) show(it.text, it.why); return; }
        if (b && picked) place(picked, b);
        if (e.target.closest("[data-check]")) check();
        if (e.target.closest("[data-reset]")) FN.$$(".card-chip", stage).forEach(function (x) { place(x, stage.querySelector(".pool")); });
      });
      stage.addEventListener("keydown", function (e) { var b = e.target.closest(".bucket"); if (b && (e.key === "Enter" || e.key === " ") && picked) { e.preventDefault(); place(picked, b); } });
      function check() {
        var right = 0, all = d.items.length;
        FN.$$(".card-chip", stage).forEach(function (c) {
          var it = d.items[+c.dataset.k], at = c.closest("[data-bucket]").dataset.bucket, ok = at === it.bucket;
          c.classList.toggle("right", ok); c.classList.toggle("wrong", !ok);
          if (ok) right++;
        });
        show(right + " of " + all + " in the right box", right === all ? "All sorted correctly. Tap any card to read why it belongs there." : "Red cards are in the wrong box (or not placed). Tap one to read why it belongs elsewhere.");
      }
      return { count: 0, step: function () {} };
    },
    selector: function (stage, d, show) {
      var ch = d.challenges || [], cur = 0;
      stage.innerHTML = '<div class="selx"><div class="sel-left"><ol class="sel-tasks">' + ch.map(function (c, k) { return '<li><button class="task" data-k="' + k + '">' + esc(c.task) + "</button></li>"; }).join("") + "</ol>" +
        '<label class="sel-input">CSS selector <input type="text" spellcheck="false" autocomplete="off" placeholder="e.g. .price"></label>' +
        '<div class="row"><button class="btn btn-soft" data-try>' + FN.icon("scan-search") + " Highlight matches</button><button class=\"btn btn-primary\" data-check>" + FN.icon("check") + " Check</button><button class=\"btn btn-ghost\" data-hint>Hint</button></div></div>" +
        '<div class="sel-right"><iframe class="sel-frame" title="Sample page to practise selectors on" sandbox="allow-same-origin"></iframe><details><summary>View the HTML (the DOM source)</summary><pre class="code"></pre></details></div></div>';
      var frame = stage.querySelector("iframe"), input = stage.querySelector("input");
      stage.querySelector("pre").textContent = d.html || "";
      frame.srcdoc = "<!doctype html><style>body{font:14px system-ui;padding:12px;color:#1f2a24}.fn-hit{outline:3px solid #e0a030!important;background:#fff3d6!important}</style>" + (d.html || "");
      function doc() { return frame.contentDocument; }
      function matches(sel) { try { return Array.prototype.slice.call(doc().querySelectorAll(sel)); } catch (e) { return null; } }
      function pick(k) { cur = k; FN.$$(".task", stage).forEach(function (b, j) { b.classList.toggle("on", j === k); }); show("Challenge " + (k + 1), ch[k].task); input.value = ""; input.focus(); }
      function highlight() {
        FN.$$(".fn-hit", doc()).forEach(function (x) { x.classList.remove("fn-hit"); });
        var m = matches(input.value.trim());
        if (!m) { show("Not a valid selector", "Check the syntax: classes start with a dot (.price), IDs with # (#promo), attributes use [ ] (a[href$=\".pdf\"])."); return null; }
        m.forEach(function (x) { x.classList.add("fn-hit"); });
        show(m.length + " element" + (m.length === 1 ? "" : "s") + " matched", m.length ? "Highlighted in yellow on the sample page." : "Nothing on the page matches this selector.");
        return m;
      }
      stage.addEventListener("click", function (e) {
        var t = e.target.closest(".task"); if (t) pick(+t.dataset.k);
        if (e.target.closest("[data-try]")) highlight();
        if (e.target.closest("[data-hint]")) show("Hint", ch[cur].hint || "Inspect the HTML below the page.");
        if (e.target.closest("[data-check]")) {
          var m = highlight(); if (!m) return;
          var want = matches(ch[cur].answer) || [];
          var ok = m.length === want.length && m.every(function (x) { return want.indexOf(x) >= 0; }) && m.length > 0;
          show(ok ? "Correct!" : "Not quite", ok ? "Your selector finds exactly the right element(s). One possible answer: " + ch[cur].answer : "Your selector matched " + m.length + " element(s); the target is " + want.length + ". Try again or press Hint.");
          if (ok) FN.$$(".task", stage)[cur].classList.add("done");
        }
      });
      input.addEventListener("keydown", function (e) { if (e.key === "Enter") highlight(); });
      frame.addEventListener("load", function () { if (ch.length) pick(0); });
      return { count: 0, step: function () {} };
    },
    compare: function (stage, d, show) {
      var cols = d.columns || [], rows = d.rows || [];
      stage.innerHTML = '<div class="cmp" role="table"><div class="cmp-row cmp-h" role="row"><span role="columnheader"></span>' + cols.map(function (c) { return '<span role="columnheader">' + esc(c) + "</span>"; }).join("") + "</div>" +
        rows.map(function (r, k) { return '<button class="cmp-row" role="row" data-k="' + k + '"><span role="rowheader">' + esc(r.label) + "</span>" + r.values.map(function (v) { return '<span role="cell">' + esc(v) + "</span>"; }).join("") + "</button>"; }).join("") + "</div>";
      stage.addEventListener("click", function (e) { var b = e.target.closest(".cmp-row[data-k]"); if (!b) return; var r = rows[+b.dataset.k]; show(r.label, r.detail || cols.map(function (c, j) { return c + ": " + r.values[j]; }).join(" · ")); FN.$$(".cmp-row", stage).forEach(function (x) { x.classList.toggle("on", x === b); }); });
      return { count: rows.length, step: function (i) { FN.$$(".cmp-row[data-k]", stage).forEach(function (b, k) { b.classList.toggle("hide", i >= 0 && k > i); b.classList.toggle("on", k === i); }); if (rows[i]) show(rows[i].label, rows[i].detail); } };
    }
  };

  /**
   * FUNCTION: FN.visuals.calc(kind, a, b)  — pure, tested in tests/check.js
   * percentChange: ((b − a) / a) × 100   (a = old value, b = new value)
   * rate:          (a / b) × 100         (a = completions, b = sessions)
   * OUTPUT: { value, steps[] } or { error }
   */
  function calc(kind, a, b) {
    if (!isFinite(a) || !isFinite(b)) return { error: "Enter two numbers." };
    if (kind === "percentChange") {
      if (a === 0) return { error: "The old value cannot be 0 (you cannot divide by zero)." };
      var diff = b - a, v = (diff / a) * 100;
      return { value: v, steps: ["new − old = " + b + " − " + a + " = " + diff, "÷ old = " + diff + " ÷ " + a + " = " + (diff / a).toFixed(4), "× 100 = " + v.toFixed(2) + "%"] };
    }
    if (b === 0) return { error: "Sessions cannot be 0 (you cannot divide by zero)." };
    var r = (a / b) * 100;
    return { value: r, steps: [a + " ÷ " + b + " = " + (a / b).toFixed(4), "× 100 = " + r.toFixed(2) + "%"] };
  }

  FN.visuals = { render: render, calc: calc, stop: function () { clearInterval(timer); } };
})();
