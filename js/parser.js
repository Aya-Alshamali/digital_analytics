/* =====================================================================
   FILE: js/parser.js
   PURPOSE (beginner summary):
     Turns uploaded .pptx / .pdf files into a FocusNest course.
       Step 1  readPptx()/readPdf(): pull out every slide's title, text,
               tables, speaker notes and pictures (all inside your browser —
               the file is never uploaded anywhere).
       Step 2  buildCourse(): groups slides into chapters (one per file) and
               topics (slides that share a heading), then builds notes,
               flashcards, step-by-step lessons, a visual (only when the
               slides contain a real sequence or timeline) and quizzes —
               using ONLY sentences found in the slides.
   HONESTY RULES: no invented facts. Every generated item points to its
     slide number. Where the slides give nothing (e.g. real-world examples),
     the tab says so instead of making something up.
   DEPENDENCIES: JSZip (pptx), pdf.js (pdf), js/schema.js.
   SAFE TO EDIT: the regular expressions in findDefinitions() and the
     grouping limits in groupTopics().
   ===================================================================== */
(function (root) {
  "use strict";
  var FN = (root.FN = root.FN || {});

  /* ------------------------------------------------------------------
     STEP 1A — PPTX READING
     ------------------------------------------------------------------ */
  function xml(str) { return new DOMParser().parseFromString(str, "application/xml"); }
  function tags(node, name) { return Array.prototype.slice.call(node.getElementsByTagNameNS("*", name)); }
  function paraText(p) { return tags(p, "t").map(function (t) { return t.textContent; }).join("").replace(/\s+/g, " ").trim(); }

  /** shapeText(doc): title + body lines + table rows of one slide/notes XML. */
  function shapeText(doc) {
    var title = "", lines = [];
    tags(doc, "sp").forEach(function (sp) {
      var ph = tags(sp, "ph")[0], type = ph ? ph.getAttribute("type") || "" : "";
      if (/sldNum|dt|ftr|sldImg/.test(type)) return;
      tags(sp, "p").forEach(function (p) {
        var s = paraText(p);
        if (!s || /^\d+$/.test(s)) return;
        if (/title|ctrTitle/.test(type) && !title) title = s; else lines.push(s);
      });
    });
    tags(doc, "tbl").forEach(function (tbl) {
      tags(tbl, "tr").forEach(function (tr) {
        lines.push(tags(tr, "tc").map(paraText).join(" | "));
      });
    });
    return { title: title, lines: lines };
  }

  /** shrink(blob): picture → small JPEG data URL (max 800px wide) so it fits in IndexedDB. */
  function shrink(blob) {
    return new Promise(function (res) {
      var url = URL.createObjectURL(blob), img = new Image();
      img.onload = function () {
        var w = Math.min(800, img.naturalWidth), h = Math.round(img.naturalHeight * (w / img.naturalWidth));
        var c = document.createElement("canvas"); c.width = w; c.height = h;
        var ctx = c.getContext("2d"); ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, h); ctx.drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url); res(c.toDataURL("image/jpeg", 0.72));
      };
      img.onerror = function () { URL.revokeObjectURL(url); res(null); };
      img.src = url;
    });
  }

  /**
   * FUNCTION: readPptx(file, onProgress)
   * PURPOSE: reads a PowerPoint file in the browser.
   * OUTPUT: Promise<{ name, slides:[{n,title,text[],notes,images[]}] }>
   * FAILURE: not a real .pptx (zip) → rejects with a readable message.
   */
  function readPptx(file, onProgress) {
    if (!root.JSZip) return Promise.reject(new Error("The PowerPoint reader (JSZip) did not load — check your internet connection."));
    return JSZip.loadAsync(file).then(function (zip) {
      var presF = zip.file("ppt/presentation.xml"), relF = zip.file("ppt/_rels/presentation.xml.rels");
      if (!presF || !relF) throw new Error(file.name + " is not a PowerPoint (.pptx) file.");
      return Promise.all([presF.async("string"), relF.async("string")]).then(function (r) {
        var rels = {};
        tags(xml(r[1]), "Relationship").forEach(function (x) { rels[x.getAttribute("Id")] = x.getAttribute("Target"); });
        var order = tags(xml(r[0]), "sldId").map(function (s) {
          return "ppt/" + rels[s.getAttributeNS("http://schemas.openxmlformats.org/officeDocument/2006/relationships", "id")].replace(/^\/?ppt\//, "");
        });
        var slides = [], i = 0;
        function next() {
          if (i >= order.length) return Promise.resolve(slides);
          var path = order[i], n = ++i;
          if (onProgress) onProgress(n, order.length);
          var relPath = path.replace(/slides\/(slide\d+\.xml)$/, "slides/_rels/$1.rels");
          return Promise.all([zip.file(path).async("string"), zip.file(relPath) ? zip.file(relPath).async("string") : ""]).then(function (p) {
            var main = shapeText(xml(p[0])), targets = p[1] ? tags(xml(p[1]), "Relationship").map(function (x) { return x.getAttribute("Target"); }) : [];
            var notesT = targets.filter(function (t) { return /notesSlide/.test(t); })[0];
            var media = targets.filter(function (t) { return /media\/.+\.(png|jpe?g|gif)$/i.test(t); });
            var notesP = notesT && zip.file("ppt/notesSlides/" + notesT.split("/").pop()) ? zip.file("ppt/notesSlides/" + notesT.split("/").pop()).async("string").then(function (s) { return shapeText(xml(s)).lines.join(" "); }) : Promise.resolve("");
            var imgP = Promise.all(media.slice(0, 4).map(function (t) {
              var f = zip.file("ppt/media/" + t.split("/").pop());
              return f ? f.async("blob").then(function (b) { return b.size > 4000 ? shrink(b) : null; }) : null;
            }));
            return Promise.all([notesP, imgP]).then(function (q) {
              var title = main.title || main.lines.shift() || "Slide " + n;
              slides.push({ n: n, title: title, text: main.lines, notes: q[0], images: q[1].filter(Boolean) });
              return next();
            });
          });
        }
        return next().then(function (s) { return { name: file.name, slides: s }; });
      });
    });
  }

  /* ------------------------------------------------------------------
     STEP 1B — PDF READING
     ------------------------------------------------------------------ */
  /**
   * FUNCTION: readPdf(file, onProgress)
   * PURPOSE: reads every PDF page's text (grouped into lines) and a picture of the page.
   * OUTPUT: Promise<{ name, slides:[...] }>, same shape as readPptx.
   * FAILURE: scanned PDFs without a text layer give empty text → the caller
   *   reports "no readable text" rather than guessing.
   */
  function readPdf(file, onProgress) {
    var lib = root.pdfjsLib;
    if (!lib) return Promise.reject(new Error("The PDF reader (pdf.js) did not load — check your internet connection."));
    lib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    return file.arrayBuffer().then(function (buf) { return lib.getDocument({ data: buf }).promise; }).then(function (pdf) {
      var slides = [], n = 0;
      function next() {
        if (n >= pdf.numPages) return Promise.resolve({ name: file.name, slides: slides });
        n++; if (onProgress) onProgress(n, pdf.numPages);
        var pageNo = n;
        return pdf.getPage(pageNo).then(function (page) {
          return page.getTextContent().then(function (tc) {
            var rows = {};
            tc.items.forEach(function (it) {
              if (!it.str.trim()) return;
              var y = Math.round(it.transform[5] / 3) * 3;
              (rows[y] = rows[y] || { y: y, h: 0, parts: [] }).parts.push(it.str);
              rows[y].h = Math.max(rows[y].h, Math.abs(it.transform[3]));
            });
            var lines = Object.keys(rows).map(function (k) { return rows[k]; }).sort(function (a, b) { return b.y - a.y; })
              .map(function (r) { return { h: r.h, s: r.parts.join(" ").replace(/\s+/g, " ").trim() }; }).filter(function (l) { return l.s && !/^\d+$/.test(l.s); });
            var big = lines.slice(0, 4).reduce(function (m, l) { return l.h > (m ? m.h : 0) ? l : m; }, null);
            var vp = page.getViewport({ scale: 1 }), scale = 800 / vp.width, v2 = page.getViewport({ scale: scale });
            var c = document.createElement("canvas"); c.width = v2.width; c.height = v2.height;
            return page.render({ canvasContext: c.getContext("2d"), viewport: v2 }).promise.then(function () {
              slides.push({ n: pageNo, title: big ? big.s : "Page " + pageNo, text: lines.filter(function (l) { return l !== big; }).map(function (l) { return l.s; }), notes: "", images: [c.toDataURL("image/jpeg", 0.7)], isPage: true });
              return next();
            });
          });
        });
      }
      return next();
    });
  }

  /* ------------------------------------------------------------------
     STEP 2 — BUILD LESSONS FROM SLIDE TEXT (no AI, no invention)
     ------------------------------------------------------------------ */
  function shuffle(a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
  function norm(s) { return String(s || "").toLowerCase().replace(/\(cont\.?\)|continued|\d+$/g, "").replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim(); }
  function words(s) { return String(s).trim().split(/\s+/).length; }
  function uniq(a) { return a.filter(function (x, i) { return a.indexOf(x) === i; }); }

  /**
   * FUNCTION: findDefinitions(lines)
   * PURPOSE: spots "Term: explanation" and "Term is/are/means explanation" sentences.
   * INPUT: [{text, slide}]   OUTPUT: [{term, def, slide}]
   */
  function findDefinitions(lines) {
    var out = [], seen = {};
    lines.forEach(function (l) {
      var t = l.text, m = t.match(/^([^:|]{2,60}?)\s*[:–—]\s+(.{12,})$/), term, def;
      if (m && words(m[1]) <= 7 && !/[.?!]$/.test(m[1])) { term = m[1]; def = m[2]; }
      else {
        m = t.match(/^(?:an?\s+|the\s+)?([A-Za-z][\w\s\-\/()'.]{1,50}?)\s+(is|are|refers to|means|represents)\s+(.{12,})$/i);
        if (m && words(m[1]) <= 6) { term = m[1]; def = m[2] + " " + m[3]; }
      }
      if (!term) return;
      term = term.replace(/^[••\-\s]+/, "").trim();
      var k = term.toLowerCase();
      if (seen[k] || /^(note|example|step \d+|tip|for example|why|how)$/i.test(term)) return;
      seen[k] = 1;
      out.push({ term: term, def: def.trim(), slide: l.slide });
    });
    return out;
  }

  /**
   * FUNCTION: groupTopics(slides)
   * PURPOSE: neighbouring slides with the same heading form one topic; very long
   *   runs are split (~8 slides), tiny ones merged into the previous topic.
   */
  function groupTopics(slides) {
    var body = slides.slice();
    if (body.length > 3 && body[0].text.length <= 4) body.shift(); // cover slide
    var groups = [];
    body.forEach(function (s) {
      var g = groups[groups.length - 1];
      if (g && norm(g.title) === norm(s.title)) g.slides.push(s);
      else groups.push({ title: s.title, slides: [s] });
    });
    var merged = [];
    groups.forEach(function (g) {
      var prev = merged[merged.length - 1];
      if (prev && g.slides.length < 2 && prev.slides.length < 10) prev.slides = prev.slides.concat(g.slides);
      else merged.push(g);
    });
    var out = [];
    merged.forEach(function (g) {
      if (g.slides.length <= 12) return out.push(g);
      var parts = Math.ceil(g.slides.length / 8), size = Math.ceil(g.slides.length / parts);
      for (var i = 0; i < parts; i++) {
        var chunk = g.slides.slice(i * size, (i + 1) * size);
        out.push({ title: g.title + " (part " + (i + 1) + " of " + parts + ")", slides: chunk });
      }
    });
    return out;
  }

  /**
   * FUNCTION: buildTopic(group, id, pool)
   * PURPOSE: creates every tab for one topic from its slides.
   * INPUTS: group {title, slides}, id (e.g. "u1-t3"), pool (all definitions in the
   *   course — used only as wrong answer options so quizzes have choices).
   * OUTPUT: a Topic object that passes FN.schema.validateTopic().
   */
  function buildTopic(group, id, pool) {
    var nums = group.slides.map(function (s) { return s.n; });
    var lines = [];
    group.slides.forEach(function (s) {
      s.text.forEach(function (t) { if (t.length > 2) lines.push({ text: t, slide: s.n }); });
      if (s.notes) s.notes.split(/(?<=[.!?])\s+/).forEach(function (t) { if (t.length > 25) lines.push({ text: t, slide: s.n, note: true }); });
    });
    var bodyLines = lines.filter(function (l) { return !l.note; });
    var defs = findDefinitions(lines);
    var numbered = bodyLines.filter(function (l) { return /\d/.test(l.text) && l.text.length > 20; });

    // Notes: one section per ≤3 slides
    var notes = [];
    for (var i = 0; i < group.slides.length; i += 3) {
      var ss = group.slides.slice(i, i + 3), sn = ss.map(function (s) { return s.n; });
      var ls = bodyLines.filter(function (l) { return sn.indexOf(l.slide) >= 0; });
      var nl = lines.filter(function (l) { return l.note && sn.indexOf(l.slide) >= 0; });
      if (!ls.length && !nl.length) continue;
      var heading = uniq(ss.map(function (s) { return s.title; })).join(" / ");
      var longest = ls.concat(nl).slice().sort(function (a, b) { return b.text.length - a.text.length; })[0];
      notes.push({
        id: id + "-n" + (notes.length + 1), heading: heading, slides: sn,
        fromSlides: ls.slice(0, 6).map(function (l) { return { text: l.text, slide: l.slide }; }),
        simple: "Summary assembled from the slide text (no AI was used): " + (longest ? longest.text : heading),
        deep: ls.concat(nl).map(function (l) { return l.text; }).join(" "),
        exam: uniq(defs.filter(function (d) { return sn.indexOf(d.slide) >= 0; }).map(function (d) { return d.term + " — " + d.def; })
          .concat(numbered.filter(function (l) { return sn.indexOf(l.slide) >= 0; }).map(function (l) { return l.text; }))).slice(0, 5),
        definitions: defs.filter(function (d) { return sn.indexOf(d.slide) >= 0; }),
        keyFacts: numbered.filter(function (l) { return sn.indexOf(l.slide) >= 0; }).map(function (l) { return l.text; }).slice(0, 4),
        examples: bodyLines.filter(function (l) { return sn.indexOf(l.slide) >= 0 && /^(example|e\.g\.|for example)/i.test(l.text); }).map(function (l) { return l.text; }),
        misconceptions: []
      });
    }
    if (!notes.length) notes.push({ id: id + "-n1", heading: group.title, slides: nums, fromSlides: [], simple: "These slides contain no readable text (they may be pictures only). Open the original slides to study them.", deep: "", exam: [], definitions: [], keyFacts: [], examples: [], misconceptions: [] });
    function sectionOf(n) { var s = notes.filter(function (x) { return x.slides.indexOf(n) >= 0; })[0]; return (s || notes[0]).id; }

    // Steps: only when the slides literally contain "Step 1…" or "1. …" sequences
    var stepLines = bodyLines.filter(function (l) { return /^(step\s*\d+|\d+[.)]\s)/i.test(l.text); });
    var steps = stepLines.length >= 3 ? stepLines.slice(0, 8).map(function (l, k, arr) {
      var s = { title: l.text.replace(/^(step\s*\d+|\d+[.)])\s*[:\-–]?\s*/i, ""), what: l.text, why: "", practical: "See slide " + l.slide + " for the original wording.", slide: l.slide };
      if (k < arr.length - 1) {
        var opts = shuffle(arr.filter(function (x, j) { return j !== k; }).slice(0, 3).map(function (x) { return x.text; }));
        if (opts.indexOf(arr[k + 1].text) < 0) opts[0] = arr[k + 1].text;
        opts = shuffle(opts);
        s.check = { q: "According to the slides, what comes right after this step?", options: opts, answer: opts.indexOf(arr[k + 1].text), explain: "Slide " + arr[k + 1].slide + " lists it next: " + arr[k + 1].text };
      }
      return s;
    }) : [];

    // Visual: only a real sequence (flow) or real dated stages (timeline). No decoration.
    var dated = bodyLines.filter(function (l) { return /\b(19|20)\d\d\s*[–\-]\s*((19|20)\d\d|present)\b/i.test(l.text); });
    var visual = null;
    if (steps.length >= 3) visual = { type: "flow", title: "Sequence on the slides", caption: "Built from the numbered steps in your slides. Click a step to read it.", slides: steps.map(function (s) { return s.slide; }), data: { nodes: steps.map(function (s) { return { label: s.title.slice(0, 48), detail: s.what + " (slide " + s.slide + ")" }; }) } };
    else if (dated.length >= 3) visual = { type: "timeline", title: "Timeline on the slides", caption: "Built from the dated stages in your slides.", slides: dated.map(function (l) { return l.slide; }), data: { events: uniq(dated.map(function (l) { return l.text; })).slice(0, 8).map(function (t) { var d = t.match(/((19|20)\d\d\s*[–\-]\s*((19|20)\d\d|present))/i); return { date: d ? d[1] : "", label: t.replace(d ? d[1] : "", "").replace(/[()]/g, "").trim().slice(0, 60) || t, detail: t }; }) } };

    // Flashcards: definitions + number facts (cloze)
    var cards = defs.slice(0, 8).map(function (d, k) { return { id: id + "-f" + (k + 1), front: "What is “" + d.term + "”?", back: d.def, slide: d.slide }; });
    numbered.slice(0, Math.max(0, 10 - cards.length)).forEach(function (l) {
      var m = l.text.match(/\d[\d,.]*%?/);
      if (m) cards.push({ id: id + "-f" + (cards.length + 1), front: l.text.replace(m[0], "____"), back: m[0] + " — " + l.text, slide: l.slide });
    });

    // Quiz: every answer is a sentence from the slides; wrong options come from other definitions.
    var quiz = [], qn = 0;
    function qid() { return id + "-q" + (++qn); }
    var others = pool.filter(function (p) { return defs.every(function (d) { return d.term !== p.term; }); });
    defs.slice(0, 4).forEach(function (d) {
      var wrong = shuffle(pool.filter(function (p) { return p.term !== d.term; })).slice(0, 3);
      if (wrong.length < 2) return;
      var opts = shuffle([d.term].concat(wrong.map(function (w) { return w.term; })));
      var why = {}; opts.forEach(function (o, k) { if (o !== d.term) why[k] = "“" + o + "” is described differently on the slides: " + wrong.filter(function (w) { return w.term === o; })[0].def; });
      quiz.push({ id: qid(), type: "mcq", difficulty: "easy", prompt: "Which term matches this description?  “" + d.def + "”", options: opts, answer: opts.indexOf(d.term), wrongWhy: why, explain: "Slide " + d.slide + " defines " + d.term + " this way.", slide: d.slide, section: sectionOf(d.slide) });
    });
    defs.slice(0, 3).forEach(function (d, k) {
      var swap = others[k] || pool.filter(function (p) { return p.term !== d.term; })[k];
      var truthy = !swap || k % 2 === 0;
      quiz.push({ id: qid(), type: "tf", difficulty: "medium", prompt: "True or false: " + d.term + " — " + (truthy ? d.def : swap.def), answer: truthy, explain: "On slide " + d.slide + ", " + d.term + " is described as: " + d.def, slide: d.slide, section: sectionOf(d.slide) });
    });
    if (defs.length >= 3) quiz.push({ id: qid(), type: "match", difficulty: "medium", prompt: "Match each term with its description from the slides.", options: defs.slice(0, 4).map(function (d) { return [d.term, d.def.length > 90 ? d.def.slice(0, 88) + "…" : d.def]; }), explain: "Each pair is taken directly from the slides.", slide: defs[0].slide, section: sectionOf(defs[0].slide) });
    defs.slice(0, 2).forEach(function (d) {
      quiz.push({ id: qid(), type: "fill", difficulty: "hard", prompt: "Fill in the term:  ______ — " + d.def, answer: [d.term], explain: "Slide " + d.slide + ": " + d.term + " — " + d.def, slide: d.slide, section: sectionOf(d.slide) });
    });
    numbered.slice(0, 2).forEach(function (l) {
      var m = l.text.match(/\d[\d,.]*%?/); if (!m) return;
      quiz.push({ id: qid(), type: "fill", difficulty: "hard", prompt: "Recall the number from the slides:  " + l.text.replace(m[0], "______"), answer: [m[0], m[0].replace(/[%,]/g, "")], explain: "Slide " + l.slide + ": " + l.text, slide: l.slide, section: sectionOf(l.slide) });
    });
    if (defs.length >= 2 && others.length >= 2) {
      var right = defs.slice(0, 2).map(function (d) { return d.term + " — " + d.def; });
      var wrongM = [others[0].term + " — " + defs[0].def, defs[1].term + " — " + others[1].def];
      var mo = shuffle(right.concat(wrongM));
      quiz.push({ id: qid(), type: "multi", difficulty: "hard", prompt: "Select every statement that matches the slides (two term/description pairs were swapped).", options: mo, answer: right.map(function (r) { return mo.indexOf(r); }), explain: "Correct pairs come from slides " + defs[0].slide + " and " + defs[1].slide + ".", slide: defs[0].slide, section: sectionOf(defs[0].slide) });
    }

    var headings = uniq(group.slides.map(function (s) { return s.title; }));
    return {
      id: id, title: group.title, slides: nums, minutes: Math.max(5, Math.round(group.slides.length * 1.5)),
      generated: "heuristic",
      overview: {
        about: "Slides " + nums[0] + "–" + nums[nums.length - 1] + " cover: " + headings.join("; ") + ".",
        why: (bodyLines.filter(function (l) { return /important|why|helps|allows|essential|matters/i.test(l.text); })[0] || { text: "" }).text,
        objectives: defs.slice(0, 3).map(function (d) { return "Define " + d.term + " in your own words"; }).concat(headings.slice(0, 2).map(function (h) { return "Explain the main points of “" + h + "”"; })).slice(0, 5),
        vocabulary: defs.slice(0, 8),
        hook: headings[0]
      },
      notes: notes, steps: steps, visual: visual, examples: [], flashcards: cards, quiz: quiz
    };
  }

  /**
   * FUNCTION: buildCourse(decks, meta)
   * PURPOSE: decks (from readPptx/readPdf) → full course object.
   * INPUTS: decks [{name, slides}], meta {id}
   * OUTPUT: Course (validate with FN.schema.validateCourse before saving).
   */
  function buildCourse(decks, meta) {
    var id = (meta && meta.id) || "upload-" + Date.now().toString(36);
    var outDecks = decks.map(function (d, i) { return { id: id + "-d" + (i + 1), name: d.name, slides: d.slides }; });
    var pool = [];
    outDecks.forEach(function (d) { d.slides.forEach(function (s) { pool = pool.concat(findDefinitions(s.text.map(function (t) { return { text: t, slide: s.n }; }))); }); });
    var chapters = outDecks.map(function (d, i) {
      var groups = groupTopics(d.slides);
      return {
        id: id + "-d" + (i + 1), deck: d.id,
        title: "Chapter " + (i + 1) + " · " + d.name.replace(/\.(pptx|pdf)$/i, ""),
        topics: groups.map(function (g, k) { return buildTopic(g, id.slice(-6) + "-c" + (i + 1) + "t" + (k + 1), pool); })
      };
    });
    var first = outDecks[0] && outDecks[0].slides[0];
    return { id: id, origin: "upload", title: (first && first.title) || outDecks[0].name, subtitle: outDecks.map(function (d) { return d.name; }).join(" · "), created: new Date().toISOString(), decks: outDecks, chapters: chapters };
  }

  FN.parser = { readPptx: readPptx, readPdf: readPdf, buildCourse: buildCourse, groupTopics: groupTopics, findDefinitions: findDefinitions };
})(typeof window !== "undefined" ? window : globalThis);
