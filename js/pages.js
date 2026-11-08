/* =====================================================================
   FILE: js/pages.js
   PURPOSE (beginner summary):
     Draws every sidebar page (except a lesson, see js/lesson.js) and the
     middle "outline" column:
       dashboard · chapters (choose + add) · slides · notes · visual · practice ·
       flashcards · planner · progress · settings
   DEPENDENCIES: ui.js, store.js, course.js, parser.js, quiz.js, flashcards.js, focus.js.
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var esc = FN.esc, $ = FN.$;
  var V = function () { return document.getElementById("view"); };
  function head(title, sub, icon) { return '<header class="page-head"><h1>' + (icon ? FN.icon(icon) + " " : "") + esc(title) + "</h1>" + (sub ? '<p class="muted">' + sub + "</p>" : "") + "</header>"; }
  function noCourse() { return '<div class="empty">' + FN.icon("book-open") + "<p>No chapters were found. Check that the data files in /data are loaded.</p></div>"; }
  function weakTopics() {
    var miss = {};
    FN.store.get().quizHistory.slice(-30).forEach(function (h) { h.missed.forEach(function (m) { var t = m.split("|")[0]; miss[t] = (miss[t] || 0) + 1; }); });
    return FN.courses.topics().filter(function (x) { return miss[x.topic.id] && !(FN.store.topic(x.topic.id).quizBest >= 80); }).sort(function (a, b) { return miss[b.topic.id] - miss[a.topic.id]; });
  }
  /** nextLesson(chapter?): first unfinished topic (inside that chapter when given). */
  function nextLesson(ch) { return FN.courses.topics().filter(function (x) { return (!ch || x.chapter === ch) && !FN.store.topic(x.topic.id).complete; })[0] || null; }
  function dueCards() { return FN.cards.filter(FN.cards.collect(FN.courses.topics().map(function (x) { return x.topic; })), "due"); }
  function chapterDone(ch) { return ch.topics.filter(function (t) { return FN.store.topic(t.id).complete; }).length; }
  function chapterSlides(ch) { var d = FN.courses.deck(null, ch.deck); return d ? d.slides.length : 0; }

  /**
   * FUNCTION: chooseChapter(id, openLesson)
   * PURPOSE: makes `id` the chapter being studied. The chapters column then lists only its topics.
   * openLesson = true → also opens that chapter's first unfinished topic.
   */
  function chooseChapter(id, openLesson) {
    FN.courses.setChapter(id); open = {};
    var ch = FN.courses.activeChapter();
    if (openLesson && ch) { var n = nextLesson(ch) || { topic: ch.topics[0] }; location.hash = "#/learn/" + n.topic.id + "/overview"; return; }
    renderOutline();
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  }

  /** chapterCards(): one card per chapter — used on the dashboard and the Chapters page. */
  function chapterCards() {
    var cur = FN.courses.activeChapter();
    return '<div class="chapter-cards">' + FN.courses.chapters().map(function (ch, k) {
      var d = chapterDone(ch), n = ch.topics.length, isCur = cur && cur.id === ch.id;
      var parts = ch.title.split(" · ");
      return '<article class="card chapter-card' + (isCur ? " active" : "") + '">' +
        '<span class="eyebrow">' + esc(parts[0]) + (isCur ? ' <span class="pill pill-easy">Studying now</span>' : "") + (ch.uploaded ? ' <span class="pill">Added by you</span>' : "") + "</span>" +
        "<h3>" + esc(parts.slice(1).join(" · ") || ch.title) + "</h3>" +
        '<p class="muted small">' + n + " topics · " + chapterSlides(ch) + " slides · " + ch.topics.reduce(function (s, t) { return s + (t.quiz || []).length; }, 0) + " quiz questions</p>" +
        '<div class="bar"><span style="width:' + (n ? Math.round(d / n * 100) : 0) + '%"></span></div><p class="small muted">' + d + " of " + n + " topics completed</p>" +
        // Study button → chooseChapter(id, true): selects the chapter and opens its next topic.
        '<div class="row"><button class="btn btn-primary" data-choose="' + esc(ch.id) + '">' + (d ? "Continue" : "Study this chapter") + " " + FN.icon("arrow-right") + "</button>" +
        (ch.uploaded ? '<button class="btn btn-ghost danger" data-del-pack="' + esc(ch.pack) + '" data-title="' + esc(ch.title) + '">' + FN.icon("trash-2") + " Remove</button>" : "") + "</div></article>";
    }).join("") + "</div>";
  }
  /** wireChapterCards(root): click handling for chapterCards(). */
  function wireChapterCards(root) {
    root.addEventListener("click", function (e) {
      var c = e.target.closest("[data-choose]"); if (c) { chooseChapter(c.dataset.choose, true); return; }
      var d = e.target.closest("[data-del-pack]"); if (!d) return;
      FN.modal("<h3>Remove “" + esc(d.dataset.title) + "”?</h3><p>This removes the chapter you added and its slides from this device. Chapters 1 and 2 are not affected. This cannot be undone.</p><div class=\"row\"><button class=\"btn btn-ghost\" data-close>Cancel</button><button class=\"btn btn-primary danger\" id=\"confirmDel\">Remove chapter</button></div>", function (m) {
        m.querySelector("#confirmDel").onclick = function () {
          FN.courses.removeChapter(d.dataset.delPack).then(function () {
            if (!FN.courses.activeChapter()) FN.courses.setChapter(null);
            FN.closeModal(); renderOutline(); chapters(); FN.toast("Chapter removed.");
          });
        };
      });
    });
  }

  /* ====================== MIDDLE COLUMN: OUTLINE ====================== */
  /**
   * FUNCTION: renderOutline()
   * PURPOSE: the chapters column. Before a chapter is chosen it asks you to choose one;
   *   afterwards it shows a chapter picker and ONLY that chapter's topics → activities.
   * USER ACTION: pick a chapter; click a topic to expand; click an activity to open that tab.
   */
  var open = {};
  function renderOutline() {
    var el = document.getElementById("outline"), c = FN.courses.active();
    if (!c) { el.innerHTML = noCourse(); FN.icons(); return; }
    var hide = '<button class="icon-btn outline-hide" data-hide-outline title="Hide chapters" aria-label="Hide chapters">' + FN.icon("panel-left-close") + "</button>";
    var ch = FN.courses.activeChapter();
    if (!ch) {
      el.innerHTML = '<div class="outline-head">' + hide + '<p class="eyebrow">' + esc(c.title) + '</p><h2 class="choose-title">Choose a chapter</h2><p class="muted small">Pick the chapter you want to study. You can switch any time.</p></div>' +
        '<div class="chapter-pick">' + c.chapters.map(function (x) {
          var parts = x.title.split(" · ");
          return '<button class="chapter-pick-btn" data-pick="' + esc(x.id) + '"><small>' + esc(parts[0]) + "</small><strong>" + esc(parts.slice(1).join(" · ") || x.title) + "</strong><span>" + chapterDone(x) + "/" + x.topics.length + " topics done</span></button>";
        }).join("") + "</div>";
      FN.icons();
      el.querySelector(".chapter-pick").onclick = function (e) { var b = e.target.closest("[data-pick]"); if (b) chooseChapter(b.dataset.pick, true); };
      return;
    }
    var curL = FN.lesson.current(), curId = curL && location.hash.startsWith("#/learn/") ? curL.topic.id : null;
    if (curId) open[curId] = true;
    var done = chapterDone(ch), n = ch.topics.length;
    el.innerHTML =
      '<div class="outline-head">' + hide + '<p class="eyebrow">' + esc(c.title) + "</p>" +
      // Chapter picker (replaces the old course picker) → chooseChapter(id).
      '<div class="course-switch"><label class="sr-only" for="chapterSel">Chapter</label><select id="chapterSel" title="Switch chapter">' + c.chapters.map(function (x) { return '<option value="' + esc(x.id) + '"' + (x.id === ch.id ? " selected" : "") + ">" + esc(x.title.split(" · ")[0]) + "</option>"; }).join("") + "</select></div>" +
      '<h2 class="chapter-name">' + esc(ch.title.split(" · ").slice(1).join(" · ") || ch.title) + "</h2>" +
      '<div class="bar"><span style="width:' + (n ? Math.round(done / n * 100) : 0) + '%"></span></div><p class="small muted">' + done + " of " + n + " topics completed</p>" +
      '<label class="search"><span class="sr-only">Search topics</span>' + FN.icon("search") + '<input type="search" id="outlineSearch" placeholder="Search this chapter…"></label></div>' +
      '<div class="chapters"><section class="chapter">' + ch.topics.map(function (t, k) {
        var p = FN.store.topic(t.id), isOpen = open[t.id], seen = Object.keys(p.tabs).length;
        return '<div class="topic' + (t.id === curId ? " current" : "") + (isOpen ? " open" : "") + '" data-title="' + esc(t.title.toLowerCase()) + '">' +
          '<button class="topic-btn" data-topic="' + esc(t.id) + '" aria-expanded="' + !!isOpen + '"><span class="tstate ' + (p.complete ? "done" : seen ? "started" : "") + '">' + FN.icon(p.complete ? "circle-check" : seen ? "circle-dot" : "circle") + '</span><span class="ttl"><strong>' + (k + 1) + ". " + esc(t.title) + "</strong><small>" + (t.minutes || 10) + " min · " + t.notes.length + " notes · " + (t.quiz || []).length + " questions</small></span>" + FN.icon("chevron-down", "chev") + "</button>" +
          (isOpen ? '<ul class="acts">' + FN.lesson.TABS.map(function (tab) {
            var subs = tab[0] === "notes" ? t.notes.map(function (nn, j) { return '<li class="sub"><a href="#/learn/' + esc(t.id) + "/notes/" + esc(nn.id) + '"' + (p.sections[nn.id] ? ' class="done"' : "") + ">Note " + (j + 1) + ": " + esc(nn.heading) + "</a></li>"; }).join("") : "";
            var active = t.id === curId && curL.tab === tab[0];
            return '<li><a href="#/learn/' + esc(t.id) + "/" + tab[0] + '" class="' + (active ? "on " : "") + (p.tabs[tab[0]] ? "seen" : "") + '">' + FN.icon(tab[2]) + " " + tab[1] + "</a></li>" + subs;
          }).join("") + "</ul>" : "") + "</div>";
      }).join("") + "</section>" +
      '<section class="chapter"><h3>Check yourself</h3><a class="final-link" href="#/practice/ch-' + esc(ch.id) + '">' + FN.icon("list-checks") + " Chapter quiz <small>this chapter only</small></a>" +
      '<a class="final-link alt" href="#/practice/final">' + FN.icon("trophy") + " Final course quiz <small>all chapters</small></a>" +
      '<a class="final-link alt" href="#/chapters">' + FN.icon("book-open") + " All chapters</a></section></div>";
    FN.icons();
    $("#chapterSel").onchange = function () { chooseChapter(this.value, location.hash.startsWith("#/learn/")); };
    $("#outlineSearch").oninput = function () { var q = this.value.toLowerCase(); FN.$$(".topic", el).forEach(function (t) { t.hidden = q && t.dataset.title.indexOf(q) < 0; }); };
    el.querySelector(".chapters").onclick = function (e) {
      var b = e.target.closest("[data-topic]"); if (!b) return;
      var id = b.dataset.topic;
      if (open[id] && id !== curId) { open[id] = false; renderOutline(); return; }
      open[id] = true;
      if (id !== curId) location.hash = "#/learn/" + id + "/overview"; else { open[id] = !b.parentNode.classList.contains("open"); renderOutline(); }
    };
  }

  /* ====================== DASHBOARD ====================== */
  function dashboard() {
    var c = FN.courses.active(), s = FN.store.get();
    if (!c) { V().innerHTML = head("Welcome to FocusNest", "Learn your way.") + noCourse(); return; }
    var ch = FN.courses.activeChapter();
    var hour = new Date().getHours(), hello = (hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening") + " 👋";
    // No chapter chosen yet → the dashboard asks for one first.
    if (!ch) {
      V().innerHTML = '<div class="dash">' + head(hello, "Which chapter of " + esc(c.title) + " do you want to study?") + chapterCards() + "</div>";
      wireChapterCards(V().querySelector(".dash")); FN.icons(); return;
    }
    var all = FN.courses.topics(), done = all.filter(function (x) { return FN.store.topic(x.topic.id).complete; }).length;
    var next = nextLesson(ch), weak = weakTopics().slice(0, 3), due = dueCards().length;
    var res = s.resume && FN.courses.find(s.resume.topic);
    var todayMin = s.studyLog[FN.store.today()] || 0, goal = s.goals.dailyMinutes, gp = Math.min(100, Math.round(todayMin / goal * 100));
    V().innerHTML = '<div class="dash">' +
      head(hello, "Studying: <strong>" + esc(ch.title) + '</strong> · <a href="#/chapters">change chapter</a>') +
      '<div class="dash-grid">' +
      (res ? '<a class="card resume" href="' + esc(s.resume.hash) + '"><span class="eyebrow">' + FN.icon("history") + " Resume where you left off</span><strong>" + esc(res.topic.title) + "</strong><small>" + esc(res.chapter.title) + " · " + esc(s.resume.hash.split("/")[3] || "overview") + "</small><span class=\"btn btn-primary\">Continue " + FN.icon("arrow-right") + "</span></a>"
        : next ? '<a class="card resume" href="#/learn/' + esc(next.topic.id) + '/overview"><span class="eyebrow">' + FN.icon("rocket") + " Start here</span><strong>" + esc(next.topic.title) + "</strong><small>" + esc(next.chapter.title) + '</small><span class="btn btn-primary">Begin ' + FN.icon("arrow-right") + "</span></a>" : "") +
      '<div class="card stat"><span class="eyebrow">' + FN.icon("target") + ' Today’s goal</span><div class="ring" style="--p:' + gp + '"><span>' + todayMin + "<small>/" + goal + " min</small></span></div><button class=\"btn btn-soft\" id=\"dashTimer\">" + FN.icon("timer") + " Start a focus session</button></div>" +
      '<div class="card stat"><span class="eyebrow">' + FN.icon("zap") + " Level " + FN.store.level() + '</span><strong class="big">' + s.xp + ' XP</strong><div class="bar"><span style="width:' + (s.xp % 200) / 2 + '%"></span></div><small class="muted">' + (200 - s.xp % 200) + " XP to level " + (FN.store.level() + 1) + "</small></div>" +
      '<div class="card stat"><span class="eyebrow">' + FN.icon("layers") + ' Flashcards</span><strong class="big">' + due + '</strong><small class="muted">due for review</small><a class="btn btn-soft" href="#/flashcards">Review now</a></div>' +
      "</div>" +
      '<div class="grid-2">' +
      '<section class="card"><h3>' + FN.icon("compass") + " Next in this chapter</h3>" + (next ? '<a class="rec" href="#/learn/' + esc(next.topic.id) + '/overview"><strong>' + esc(next.topic.title) + "</strong><small>" + next.topic.minutes + " min · " + esc(next.chapter.title) + "</small></a>" : "<p>Chapter complete — take the <a href=\"#/practice/ch-" + esc(ch.id) + "\">chapter quiz</a> or <a href=\"#/chapters\">choose the next chapter</a>.</p>") +
      "<h4>Needs review</h4>" + (weak.length ? weak.map(function (w) { return '<a class="rec warn" href="#/learn/' + esc(w.topic.id) + '/notes"><strong>' + esc(w.topic.title) + '</strong><small>missed questions recently — revisit the notes</small></a>'; }).join("") : '<p class="muted small">Quiz results will point you to topics worth revisiting.</p>') + "</section>" +
      '<section class="card"><h3>' + FN.icon("chart-no-axes-column") + " Course progress</h3><p><strong>" + done + "</strong> of " + all.length + " topics completed</p>" +
      c.chapters.map(function (x) { var d = chapterDone(x); return '<div class="mini"><span>' + esc(x.title) + '</span><div class="bar"><span style="width:' + Math.round(d / x.topics.length * 100) + '%"></span></div><small>' + d + "/" + x.topics.length + "</small></div>"; }).join("") +
      '<div class="badges-row">' + s.badges.slice(-5).map(function (b) { var B = FN.store.BADGES[b]; return '<span class="badge" title="' + esc(B.desc) + '">' + FN.icon(B.icon) + esc(B.label) + "</span>"; }).join("") + "</div>" +
      '<a href="#/progress" class="link">Open progress tracker →</a></section></div>' +
      '<section class="card upload-cta"><div>' + FN.icon("file-up") + "<div><strong>Got the next chapter's slides?</strong><p class=\"muted small\">Add them as a new chapter of " + esc(c.title) + " — notes, flashcards and quizzes are built from their text.</p></div></div><a class=\"btn btn-primary\" href=\"#/chapters\">Add a chapter</a></section></div>";
    $("#dashTimer").onclick = FN.focus.openTimer;
    FN.icons();
  }

  /* ====================== CHAPTERS (choose + add) ====================== */
  function chapters() {
    var c = FN.courses.active(); if (!c) { V().innerHTML = noCourse(); return; }
    V().innerHTML = head("Chapters", "Choose the chapter of <strong>" + esc(c.title) + "</strong> you want to study.", "book-open") +
      chapterCards() +
      '<section class="card add-chapter"><h3>' + FN.icon("file-plus") + " Add a chapter</h3>" +
      '<p class="muted small">Upload the PowerPoint (.pptx) or PDF slides of the next chapter. They are read inside your browser — nothing is uploaded to a server. Each file becomes one new chapter.</p>' +
      '<label class="drop-zone" id="dropZone" tabindex="0"><input type="file" id="fileIn" accept=".pptx,.pdf,application/pdf,application/vnd.openxmlformats-officedocument.presentationml.presentation" multiple hidden>' + FN.icon("cloud-upload") +
      "<strong>Drop chapter slides here or click to choose</strong><small>.pptx or .pdf</small></label>" +
      '<div id="uploadLog" class="upload-log" aria-live="polite"></div></section>';
    FN.icons();
    wireChapterCards(V().querySelector(".chapter-cards"));
    var zone = $("#dropZone"), inp = $("#fileIn");
    zone.onclick = function () { inp.click(); };
    zone.onkeydown = function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); inp.click(); } };
    zone.ondragover = function (e) { e.preventDefault(); zone.classList.add("over"); };
    zone.ondragleave = function () { zone.classList.remove("over"); };
    zone.ondrop = function (e) { e.preventDefault(); zone.classList.remove("over"); handle(e.dataTransfer.files); };
    inp.onchange = function () { handle(inp.files); inp.value = ""; };
  }

  /**
   * FUNCTION: handle(files)
   * PURPOSE: the "Add a chapter" pipeline: read → build topics → validate → save → open.
   * USER ACTION: drop or choose .pptx/.pdf files on the Chapters page.
   * EXPECTED WEBSITE RESULT: live log; the new chapter is selected and its first topic opens.
   * FAILURE: wrong file type → clear message, nothing saved.
   */
  var busy = false;
  function handle(fileList) {
    var files = Array.prototype.slice.call(fileList || []);
    if (!files.length || busy) return;
    var log = $("#uploadLog");
    function line(t, cls) { log.insertAdjacentHTML("beforeend", '<p class="' + (cls || "") + '">' + t + "</p>"); }
    log.innerHTML = "";
    var bad = files.filter(function (f) { return !/\.(pptx|pdf)$/i.test(f.name); });
    if (bad.length) {
      line(FN.icon("circle-x") + " " + esc(bad.map(function (f) { return f.name; }).join(", ")) + " — only .pptx and .pdf are supported. (Old .ppt files: open them in PowerPoint and “Save as .pptx”.)", "err");
      FN.icons(); return;
    }
    busy = true; $("#dropZone").classList.add("busy");
    var decks = [];
    files.reduce(function (p, f) {
      return p.then(function () {
        line(FN.icon("loader") + " Reading " + esc(f.name) + "…");
        var reader = /\.pdf$/i.test(f.name) ? FN.parser.readPdf : FN.parser.readPptx;
        var lastP = log.lastElementChild;
        return reader(f, function (n, total) { lastP.innerHTML = FN.icon("loader") + " Reading " + esc(f.name) + " — slide " + n + " of " + total; }).then(function (d) {
          var textSlides = d.slides.filter(function (s) { return s.text.length || s.title; }).length;
          lastP.innerHTML = FN.icon("circle-check") + " " + esc(f.name) + ": " + d.slides.length + " slides, " + textSlides + " with text";
          if (!textSlides) throw new Error(f.name + " has no readable text (scanned images?). FocusNest won't guess its content.");
          decks.push(d);
        });
      });
    }, Promise.resolve()).then(function () {
      line(FN.icon("wand-sparkles") + " Detecting topics, writing notes, flashcards and quizzes from the slide text…");
      return FN.parser.buildCourse(decks, {});
    }).then(function (pack) {
      var v = FN.schema.validateCourse(pack);
      if (!v.ok) {
        line(FN.icon("circle-x") + " The generated chapter failed validation, so it was not saved:<br><code>" + esc(v.errors.slice(0, 5).join(" · ")) + "</code>", "err");
        return;
      }
      return FN.courses.addChapters(pack).then(function () {
        var nT = pack.chapters.reduce(function (n, x) { return n + x.topics.length; }, 0);
        line(FN.icon("party-popper") + " Done! Added " + pack.chapters.map(function (x) { return esc(x.title); }).join(", ") + " with " + nT + " topics. Opening it…", "ok");
        setTimeout(function () { chooseChapter(pack.chapters[0].id, true); }, 900);
      });
    }).catch(function (e) {
      line(FN.icon("circle-x") + " " + esc(e.message || "Could not read the file."), "err");
    }).then(function () { busy = false; var z = $("#dropZone"); if (z) z.classList.remove("busy"); FN.icons(); });
  }

  /* ====================== LECTURE SLIDES ====================== */
  function slides(deckId) {
    var c = FN.courses.active(); if (!c) { V().innerHTML = noCourse(); return; }
    var curCh = FN.courses.activeChapter();
    var deck = FN.courses.deck(c, deckId) || (curCh && FN.courses.deck(c, curCh.deck)) || c.decks[0];
    function topicFor(n) { var ch = c.chapters.filter(function (x) { return x.deck === deck.id; })[0]; return ch && ch.topics.filter(function (t) { return t.slides.indexOf(n) >= 0; })[0]; }
    V().innerHTML = head("Lecture Slides", "The original slides, with the lesson each one belongs to.", "presentation") +
      '<div class="toolbar"><div class="seg">' + c.decks.map(function (d) { return '<a role="tab" href="#/slides/' + esc(d.id) + '" aria-selected="' + (d.id === deck.id) + '">' + esc((c.chapters.filter(function (x) { return x.deck === d.id; })[0] || { title: d.name }).title.split(" · ")[0]) + "</a>"; }).join("") + '</div><label class="search">' + FN.icon("search") + '<input type="search" id="slideSearch" placeholder="Search slide text…"></label></div>' +
      '<div class="slide-grid">' + deck.slides.map(function (s) {
        var t = topicFor(s.n);
        return '<article class="slide-card" data-text="' + esc((s.title + " " + s.text.join(" ") + " " + s.notes).toLowerCase()) + '"><header><span class="pill">' + s.n + "</span><h4>" + esc(s.title) + "</h4></header>" +
          (s.images[0] ? '<img src="' + esc(s.images[0]) + '" alt="Picture from slide ' + s.n + '" loading="lazy">' : "") +
          (s.text.length ? '<ul>' + s.text.slice(0, 4).map(function (x) { return "<li>" + esc(x.length > 140 ? x.slice(0, 138) + "…" : x) + "</li>"; }).join("") + "</ul>" : "") +
          (t ? '<a class="link small" href="#/learn/' + esc(t.id) + '/notes">' + FN.icon("book-open") + " " + esc(t.title) + "</a>" : "") + "</article>";
      }).join("") + "</div>";
    $("#slideSearch").oninput = function () { var q = this.value.toLowerCase(); FN.$$(".slide-card").forEach(function (x) { x.hidden = q && x.dataset.text.indexOf(q) < 0; }); };
    FN.icons();
  }

  /* ====================== MY NOTES ====================== */
  function notes() {
    var s = FN.store.get();
    var mine = Object.keys(s.notes).filter(function (k) { return s.notes[k].trim() && FN.courses.find(k); });
    var hls = Object.keys(s.highlights).filter(function (k) { return s.highlights[k].length && FN.courses.find(k); });
    V().innerHTML = head("My Notes", "Everything you wrote, highlighted, bookmarked or parked — stored only on this device.", "notebook-pen") +
      '<div class="grid-2"><section class="card"><h3>' + FN.icon("pencil-line") + " Personal notes</h3>" + (mine.length ? mine.map(function (k) { var h = FN.courses.find(k); return '<article class="note-item"><a href="#/learn/' + esc(k) + '/notes"><strong>' + esc(h.topic.title) + "</strong></a><p>" + esc(s.notes[k]).replace(/\n/g, "<br>") + "</p></article>"; }).join("") : '<p class="muted">Open a lesson and press “My notes” to write in your own words.</p>') + "</section>" +
      '<section class="card"><h3>' + FN.icon("highlighter") + " Highlights</h3>" + (hls.length ? hls.map(function (k) { return '<p><a href="#/learn/' + esc(k) + '/notes"><strong>' + esc(FN.courses.find(k).topic.title) + "</strong></a></p><ul>" + s.highlights[k].map(function (h) { return "<li><mark>" + esc(h) + "</mark></li>"; }).join("") + "</ul>"; }).join("") : '<p class="muted">Select text in any lesson and press Highlight.</p>') +
      "<h3>" + FN.icon("bookmark") + " Bookmarks</h3>" + (s.bookmarks.length ? "<ul>" + s.bookmarks.map(function (b) { return '<li><a href="' + esc(b.hash) + '">' + esc(b.label) + "</a></li>"; }).join("") + "</ul>" : '<p class="muted">Use the bookmark icon on a lesson.</p>') +
      "<h3>" + FN.icon("sticky-note") + " Parking lot</h3>" + (s.parking.length ? "<ul>" + s.parking.map(function (p) { return "<li>" + esc(p.text) + ' <small class="muted">' + new Date(p.at).toLocaleDateString() + "</small></li>"; }).join("") + "</ul>" : '<p class="muted">Parked thoughts appear here.</p>') + '<button class="btn btn-soft" id="openPark">' + FN.icon("plus") + " Park a thought</button></section></div>";
    $("#openPark").onclick = FN.focus.openParkingLot;
    FN.icons();
  }

  /* ====================== VISUAL LEARNING ====================== */
  var vizName = { flow: "Process flow", tree: "Hierarchy", timeline: "Timeline", bars: "Chart", calculator: "Calculator", dragsort: "Sorting activity", selector: "Selector playground", compare: "Comparison" };
  function visual() {
    var c = FN.courses.active(); if (!c) { V().innerHTML = noCourse(); return; }
    var list = FN.courses.topics(c).filter(function (x) { return x.topic.visual; });
    V().innerHTML = head("Visual Learning", "Interactive diagrams — only where the slides describe something a picture explains better.", "network") +
      '<div class="viz-grid">' + list.map(function (x) { var v = x.topic.visual; return '<a class="card viz-card" href="#/learn/' + esc(x.topic.id) + '/visual"><span class="pill">' + esc(vizName[v.type]) + "</span><strong>" + esc(v.title) + "</strong><small>" + esc(x.topic.title) + "</small><p class=\"muted small\">" + esc(v.caption || "") + "</p></a>"; }).join("") + "</div>" +
      (list.length < FN.courses.topics(c).length ? '<p class="muted small">' + (FN.courses.topics(c).length - list.length) + " topic(s) have no visual because their slides don't need one.</p>" : "");
    FN.icons();
  }

  /* ====================== PRACTICE & QUIZZES ====================== */
  function practice(arg) {
    var c = FN.courses.active(); if (!c) { V().innerHTML = noCourse(); return; }
    var hist = FN.store.get().quizHistory.slice().reverse().slice(0, 8);
    function chapterOf(scope) { return FN.courses.chapters().filter(function (x) { return "ch-" + x.id === scope; })[0]; }
    function scopeName(scope) {
      if (scope === "final") return "Final course quiz";
      var ch = chapterOf(scope); if (ch) return "Chapter quiz — " + ch.title;
      return (FN.courses.find(scope) || { topic: { title: scope } }).topic.title;
    }
    V().innerHTML = head("Practice & Quizzes", "Topic quizzes, chapter quizzes, a final quiz across all chapters, and your recent results.", "list-checks") +
      '<section class="card quiz-setup"><div class="setup-grid">' +
      '<label>Quiz<select id="pScope"><optgroup label="Whole chapters">' + c.chapters.map(function (x) { return '<option value="ch-' + esc(x.id) + '">Chapter quiz — ' + esc(x.title) + "</option>"; }).join("") + '<option value="final">Final course quiz (all chapters)</option></optgroup>' +
        c.chapters.map(function (x) { return '<optgroup label="' + esc(x.title) + '">' + x.topics.map(function (t) { return '<option value="' + esc(t.id) + '">' + esc(t.title) + "</option>"; }).join("") + "</optgroup>"; }).join("") + "</select></label>" +
      '<label>Difficulty<select id="pLvl"><option value="easy">Easy</option><option value="medium" selected>Medium</option><option value="hard">Hard</option></select></label>' +
      '<label>Mode<select id="pMode"><option value="exam">Exam — results after submitting</option><option value="practice">Practice — feedback each question</option></select></label></div>' +
      '<button class="btn btn-primary btn-lg" id="pStart">' + FN.icon("play") + " Start</button></section><div id=\"pHost\"></div>" +
      '<section class="card"><h3>' + FN.icon("history") + " Recent results</h3>" + (hist.length ? '<table class="tbl"><thead><tr><th>Quiz</th><th>Mode</th><th>Level</th><th>Score</th><th>When</th></tr></thead><tbody>' + hist.map(function (h) { var t = scopeName(h.scope); return "<tr><td>" + esc(t) + "</td><td>" + esc(h.mode) + "</td><td>" + esc(h.level) + "</td><td><strong>" + Math.round(h.correct / h.total * 100) + "%</strong> (" + h.correct + "/" + h.total + ")</td><td>" + new Date(h.at).toLocaleDateString() + "</td></tr>"; }).join("") + "</tbody></table>" : '<p class="muted">No quizzes yet.</p>') + "</section>";
    $("#pStart").onclick = function () {
      var scope = $("#pScope").value, ch = chapterOf(scope), whole = scope === "final" || !!ch;
      var qs = scope === "final" ? FN.courses.finalQuiz() : ch ? FN.courses.finalQuiz(ch) : FN.courses.find(scope).topic.quiz.map(function (q) { return Object.assign({ _topic: scope }, q); });
      $(".quiz-setup").hidden = true;
      FN.quiz.start($("#pHost"), { questions: qs, topicId: scope, title: scopeName(scope), mode: $("#pMode").value, level: $("#pLvl").value, max: scope === "final" ? 24 : whole ? 16 : 10, sectionName: FN.lesson.sectionName });
      $("#pHost").scrollIntoView({ block: "start" });
    };
    var curCh = FN.courses.activeChapter();
    $("#pScope").value = arg && (arg === "final" || chapterOf(arg)) ? arg : curCh ? "ch-" + curCh.id : "final";
    FN.icons();
  }

  /* ====================== FLASHCARDS ====================== */
  function flashcards() {
    var c = FN.courses.active(); if (!c) { V().innerHTML = noCourse(); return; }
    var topics = FN.courses.topics(c).map(function (x) { return x.topic; }), all = FN.cards.collect(topics);
    V().innerHTML = head("Flashcards", "Spaced repetition: Hard brings a card back in 10 minutes, Medium in a few days, Easy later.", "layers") +
      '<div class="fc-bar"><select id="fcScope" aria-label="Topic"><option value="">All topics (' + all.length + " cards)</option>" + topics.map(function (t) { return '<option value="' + esc(t.id) + '">' + esc(t.title) + "</option>"; }).join("") + '</select><div class="seg">' +
      [["due", "Due now"], ["forgotten", "Only forgotten"], ["saved", "Saved"], ["all", "All"]].map(function (m, k) { return '<button role="tab" data-fm="' + m[0] + '" aria-selected="' + (k === 0) + '">' + m[1] + "</button>"; }).join("") + '</div><label class="switch small"><input type="checkbox" id="fcShuf" checked> <span>Shuffle</span></label></div><div id="fcHost"></div>';
    var mode = "due";
    function go() {
      var sc = $("#fcScope").value, list = sc ? all.filter(function (x) { return x.topicId === sc; }) : all;
      FN.cards.review($("#fcHost"), FN.cards.filter(list, mode), { topicId: sc || "all", mode: mode, shuffle: $("#fcShuf").checked, emptyText: mode === "due" ? "Nothing due — your memory is up to date. Review “All” if you like." : mode === "forgotten" ? "No forgotten cards." : "No saved cards yet — tap the star on a card." });
    }
    V().querySelector(".fc-bar").onclick = function (e) { var b = e.target.closest("[data-fm]"); if (!b) return; mode = b.dataset.fm; FN.$$("[data-fm]").forEach(function (x) { x.setAttribute("aria-selected", x === b); }); go(); };
    $("#fcScope").onchange = go; $("#fcShuf").onchange = go;
    go(); FN.icons();
  }

  /* ====================== STUDY PLANNER ====================== */
  /**
   * planner(): builds a calm plan — remaining topics spread across chosen days.
   */
  function planner() {
    var c = FN.courses.active(), s = FN.store.get(); if (!c) { V().innerHTML = noCourse(); return; }
    var plan = s.plan && s.plan.course === c.id ? s.plan : null;
    V().innerHTML = head("Study Planner", "Plan small, realistic sessions. Missing a day is fine — the plan simply moves with you.", "calendar-clock") +
      '<div class="grid-2"><section class="card"><h3>' + FN.icon("calendar-plus") + ' Make a plan</h3><label>Finish by <input type="date" id="plEnd" min="' + FN.store.today() + '" value="' + FN.store.today(new Date(Date.now() + 13 * 864e5)) + '"></label>' +
      '<label>Daily goal (minutes) <input type="number" id="plGoal" min="5" max="240" value="' + s.goals.dailyMinutes + '"></label>' +
      '<fieldset class="days"><legend>Study days</legend>' + ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(function (d, k) { return '<label class="chip"><input type="checkbox" value="' + k + '"' + (k > 0 && k < 6 ? " checked" : "") + "> " + d + "</label>"; }).join("") + "</fieldset>" +
      '<button class="btn btn-primary" id="plMake">' + FN.icon("sparkles") + " Create plan</button></section>" +
      '<section class="card"><h3>' + FN.icon("timer") + " Focus timer</h3><p class=\"muted\">Presets: 5/2, 15/5, 25/5 — or set your own.</p><button class=\"btn btn-soft\" id=\"plTimer\">Open timer</button><h3>" + FN.icon("coffee") + " Brain break</h3><button class=\"btn btn-soft\" id=\"plBreak\">Take a break now</button></section></div>" +
      '<section class="card"><h3>' + FN.icon("list-ordered") + " Your plan</h3>" + (plan ? plan.days.map(function (d) {
        var past = d.date < FN.store.today();
        return '<div class="plan-day' + (d.date === FN.store.today() ? " today" : "") + (past ? " past" : "") + '"><strong>' + new Date(d.date + "T12:00").toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" }) + "</strong><ul>" + d.topics.map(function (id) { var h = FN.courses.find(id); if (!h) return ""; var done = FN.store.topic(id).complete; return '<li class="' + (done ? "done" : "") + '"><a href="#/learn/' + esc(id) + '/overview">' + FN.icon(done ? "circle-check" : "circle") + " " + esc(h.topic.title) + " <small>" + h.topic.minutes + " min</small></a></li>"; }).join("") + "</ul></div>";
      }).join("") : '<p class="muted">No plan yet. Create one on the left.</p>') + "</section>";
    $("#plTimer").onclick = FN.focus.openTimer; $("#plBreak").onclick = function () { FN.focus.brainBreak(false); };
    $("#plMake").onclick = function () {
      var days = FN.$$(".days input:checked").map(function (x) { return +x.value; }), end = new Date($("#plEnd").value + "T12:00"), goal = Math.max(5, +$("#plGoal").value || 20);
      if (!days.length) { FN.toast("Pick at least one study day."); return; }
      var todo = FN.courses.topics(c).filter(function (x) { return !FN.store.topic(x.topic.id).complete; }).map(function (x) { return x.topic; });
      var dates = []; for (var d = new Date(); d <= end; d = new Date(d.getTime() + 864e5)) if (days.indexOf(d.getDay()) >= 0) dates.push(FN.store.today(d));
      if (!dates.length) { FN.toast("No study days before that date."); return; }
      var out = dates.map(function (x) { return { date: x, topics: [], min: 0 }; }), k = 0;
      todo.forEach(function (t) { var per = Math.ceil(todo.length / dates.length); if (out[k].topics.length >= per && k < out.length - 1) k++; out[k].topics.push(t.id); });
      FN.store.update(function (s) { s.goals.dailyMinutes = goal; s.plan = { course: c.id, days: out.filter(function (x) { return x.topics.length; }) }; });
      planner();
    };
    FN.icons();
  }

  /* ====================== PROGRESS TRACKER ====================== */
  function progress() {
    var c = FN.courses.active(), s = FN.store.get(); if (!c) { V().innerHTML = noCourse(); return; }
    var all = FN.courses.topics(c), done = all.filter(function (x) { return FN.store.topic(x.topic.id).complete; });
    var hist = s.quizHistory.filter(function (h) { return h.scope === "final" || h.scope.indexOf("ch-") === 0 || !!FN.courses.find(h.scope); });
    var avg = hist.length ? Math.round(hist.reduce(function (n, h) { return n + h.correct / h.total; }, 0) / hist.length * 100) : 0;
    var days = []; for (var i = 27; i >= 0; i--) { var d = FN.store.today(new Date(Date.now() - i * 864e5)); days.push({ d: d, m: s.studyLog[d] || 0 }); }
    var activeDays = days.slice(-7).filter(function (x) { return x.m > 0; }).length;
    var weak = weakTopics(c), due = dueCards(c).length;
    V().innerHTML = head("Progress Tracker", "Progress here is based on what you can recall (quizzes, checks, cards) — not on time spent on a page.", "chart-no-axes-column") +
      '<div class="dash-grid">' +
      '<div class="card stat"><span class="eyebrow">Lessons completed</span><strong class="big">' + done.length + "/" + all.length + '</strong><small class="muted">quiz ≥ 60%</small></div>' +
      '<div class="card stat"><span class="eyebrow">Quiz accuracy</span><strong class="big">' + (hist.length ? avg + "%" : "—") + '</strong><small class="muted">' + hist.length + " quizzes</small></div>" +
      '<div class="card stat"><span class="eyebrow">Cards due</span><strong class="big">' + due + '</strong><a class="link small" href="#/flashcards">Review</a></div>' +
      '<div class="card stat"><span class="eyebrow">Consistency</span><strong class="big">' + activeDays + '/7</strong><small class="muted">days with a finished focus session</small></div></div>' +
      '<div class="grid-2"><section class="card"><h3>Quiz performance by topic</h3><div class="hbars">' + all.map(function (x) { var b = FN.store.topic(x.topic.id).quizBest || 0; return '<a class="hbar" href="#/learn/' + esc(x.topic.id) + '/quiz"><span class="lab">' + esc(x.topic.title) + '</span><span class="track"><span style="width:' + b + '%" class="' + (b >= 80 ? "good" : b >= 60 ? "ok" : b ? "low" : "") + '"></span></span><span class="val">' + (b ? b + "%" : "—") + "</span></a>"; }).join("") + "</div></section>" +
      '<section class="card"><h3>Learning consistency (last 4 weeks)</h3><div class="heat" role="img" aria-label="Focus minutes per day for the last 28 days">' + days.map(function (x) { var l = x.m === 0 ? 0 : x.m < 10 ? 1 : x.m < 25 ? 2 : 3; return '<span class="l' + l + '" title="' + x.d + ": " + x.m + ' min"></span>'; }).join("") + '</div><p class="muted small">Gaps are normal. ' + (s.streakEnabled ? "Streak tracking is on (Settings)." : "Streaks are off — turn them on in Settings if they motivate you.") + "</p>" +
      "<h3>Topics needing review</h3>" + (weak.length ? "<ul>" + weak.map(function (w) { return '<li><a href="#/learn/' + esc(w.topic.id) + '/notes">' + esc(w.topic.title) + "</a></li>"; }).join("") + "</ul>" : '<p class="muted">None right now.</p>') +
      "<h3>Badges</h3><div class=\"badges-row\">" + Object.keys(FN.store.BADGES).map(function (k) { var B = FN.store.BADGES[k], on = s.badges.indexOf(k) >= 0; return '<span class="badge' + (on ? "" : " locked") + '" title="' + esc(B.desc) + '">' + FN.icon(B.icon) + esc(B.label) + "</span>"; }).join("") + "</div></section></div>";
    FN.icons();
  }

  /* ====================== SETTINGS ====================== */
  /**
   * settings(): reading accessibility, motion, theme, TTS, streaks, privacy, data.
   */
  function settings() {
    var s = FN.store.get(), st = s.settings;
    function rng(key, label, min, max, step, unit) { return '<label class="set"><span>' + label + ' <output>' + st[key] + unit + '</output></span><input type="range" data-set="' + key + '" min="' + min + '" max="' + max + '" step="' + step + '" value="' + st[key] + '"></label>'; }
    function sel(key, label, opts) { return '<label class="set"><span>' + label + '</span><select data-set="' + key + '">' + opts.map(function (o) { return '<option value="' + o[0] + '"' + (st[key] === o[0] ? " selected" : "") + ">" + o[1] + "</option>"; }).join("") + "</select></label>"; }
    V().innerHTML = head("Settings", "Make the page comfortable for your eyes and attention.", "settings-2") +
      '<div class="grid-2"><section class="card"><h3>' + FN.icon("type") + " Reading</h3>" + rng("fontSize", "Font size", 14, 24, 1, "px") + rng("lineHeight", "Line spacing", 1.4, 2.2, 0.1, "") + rng("width", "Text width", 50, 100, 2, "ch") +
      sel("contrast", "Contrast", [["normal", "Normal"], ["high", "High contrast"]]) + sel("bg", "Background", [["paper", "Soft paper"], ["white", "White"], ["sage", "Sage tint"], ["cream", "Warm cream"], ["blue", "Cool blue"]]) +
      '<p class="sample-text">Sample: “Web analytics is the methodological study of online patterns and trends.”</p></section>' +
      '<section class="card"><h3>' + FN.icon("sun-moon") + " Display & motion</h3>" + sel("theme", "Theme", [["light", "Light"], ["dark", "Dark"]]) +
      '<label class="switch"><input type="checkbox" data-set="reduceMotion"' + (st.reduceMotion ? " checked" : "") + "> <span>Reduce animation</span></label>" +
      "<h3>" + FN.icon("panels-top-left") + " Panels</h3>" +
      '<label class="switch"><input type="checkbox" data-set="navCollapsed"' + (st.navCollapsed ? " checked" : "") + "> <span>Collapse the left sidebar to icons</span></label>" +
      '<label class="switch"><input type="checkbox" data-set="outlineHidden"' + (st.outlineHidden ? " checked" : "") + "> <span>Hide the chapters column</span></label>" +
      "<h3>" + FN.icon("volume-2") + " Read aloud</h3>" +
      // Voice type: the free natural voice (Kokoro, runs on this device) or the device's built-in voice.
      sel("voiceEngine", "Voice type", [["natural", "Natural voice — human-sounding (free, runs on your device)"], ["device", "Device voice — built into your browser"]]) +
      '<div id="naturalBox"' + (st.voiceEngine === "device" ? " hidden" : "") + '>' +
        sel("naturalVoice", "Natural voice", FN.natural ? FN.natural.VOICES : []) +
        sel("naturalQuality", "Voice quality", [["auto", "Smoothest — uses your graphics chip if it can (one-time ~326 MB)"], ["light", "Smaller download (~92 MB) — may pause between sentences"]]) +
        '<p class="small voice-status" id="voiceStatus"></p></div>' +
      '<div id="deviceBox"' + (st.voiceEngine === "device" ? "" : " hidden") + '>' +
        // Device voice chooser: most natural voices first (filled by fillVoices, also when the browser loads voices late).
        '<label class="set"><span>Device voice</span><select data-set="voice" id="voiceSel"></select></label></div>' +
      rng("ttsRate", "Reading speed", 0.7, 1.3, 0.05, "×") +
      '<div class="row"><button class="btn btn-soft" id="ttsTest">' + FN.icon("play") + ' Listen to this voice</button></div>' +
      "<h3>" + FN.icon("flame") + " Motivation</h3><label class=\"switch\"><input type=\"checkbox\" id=\"streakT\"" + (s.streakEnabled ? " checked" : "") + "> <span>Show daily streaks (optional, never punishes gaps)</span></label>" +
            "<h3>" + FN.icon("database") + " Your data</h3><div class=\"row\"><button class=\"btn btn-ghost\" id=\"exportData\">" + FN.icon("download") + " Export progress (.json)</button><button class=\"btn btn-ghost danger\" id=\"resetData\">" + FN.icon("trash-2") + " Reset progress</button></div></section></div>" +
      // Credits: the free tools FocusNest uses for Read aloud (their licenses ask for attribution).
      '<section class="card credits"><h3>' + FN.icon("heart-handshake") + " Credits</h3>" +
      '<p class="muted small">Read aloud uses free, open tools that run inside your browser. Thank you to their authors.</p><ul>' +
      [["Kokoro-82M voice model (Apache-2.0) — hexgrad", "https://huggingface.co/hexgrad/Kokoro-82M"],
       ["Kokoro-82M-v1.0-ONNX — the browser version of the model on Hugging Face", "https://huggingface.co/onnx-community/Kokoro-82M-v1.0-ONNX"],
       ["kokoro-js 1.2.1 (Apache-2.0) — runs Kokoro in the browser", "https://www.npmjs.com/package/kokoro-js"],
       ["Transformers.js — Hugging Face", "https://huggingface.co/docs/transformers.js"],
       ["Running Kokoro-82M in the browser — DEV Community", "https://dev.to/emojiiii/running-kokoro-82m-onnx-tts-model-in-the-browser-eeh"],
       ["StreamingKokoroJS — privacy-first in-browser speech", "https://www.scriptbyai.com/privacy-first-tts-streaming-kokoro"],
       ["HeadTTS — Kokoro in the browser with WebGPU", "https://github.com/met4citizen/HeadTTS"]]
        .map(function (c) { return '<li><a href="' + c[1] + '" target="_blank" rel="noopener noreferrer">' + esc(c[0]) + "</a></li>"; }).join("") +
      "</ul><p class=\"muted small\">Also used: Lucide icons, JSZip, PDF.js, and the Inter and Fraunces fonts.</p></section>";
    V().oninput = function (e) {
      var k = e.target.dataset.set; if (!k) return;
      var v = e.target.type === "checkbox" ? e.target.checked : e.target.type === "range" ? parseFloat(e.target.value) : e.target.value;
      FN.store.update(function (s) { s.settings[k] = v; });
      var out = e.target.parentNode.querySelector("output"); if (out) out.textContent = v + (k === "fontSize" ? "px" : k === "width" ? "ch" : k === "ttsRate" ? "×" : "");
      if (k === "voice" || k === "ttsRate" || k === "voiceEngine" || k === "naturalVoice" || k === "naturalQuality") FN.stopSpeak();
      if (k === "voiceEngine") { $("#naturalBox").hidden = v === "device"; $("#deviceBox").hidden = v !== "device"; voiceStatus(); }
      if (k === "naturalQuality" && FN.natural) { FN.natural.reset(); voiceStatus(); }
      FN.applySettings();
    };
    function fillVoices() {
      var sel = $("#voiceSel"); if (!sel) return;
      var list = FN.voices(), cur = FN.store.get().settings.voice;
      if (!list.length) { sel.innerHTML = "<option>No English voices found in this browser</option>"; sel.disabled = true; return; }
      sel.disabled = false;
      sel.innerHTML = list.map(function (v, i) { return '<option value="' + esc(v.voiceURI) + '"' + (v.voiceURI === cur || (!cur && i === 0) ? " selected" : "") + ">" + esc(v.name.replace(/\s*\(English \((.+)\)\)/, " · $1")) + " — " + esc(v.lang) + (i === 0 ? "  (recommended)" : "") + "</option>"; }).join("");
    }
    fillVoices(); FN.onVoices = fillVoices;
    /** voiceStatus(): shows whether the natural voice is downloaded, downloading, ready or unavailable. */
    function voiceStatus() {
      var el = $("#voiceStatus"); if (!el || !FN.natural) return;
      var n = FN.natural.status();
      el.innerHTML = !FN.natural.supported() ? FN.icon("circle-alert") + " Not available here (open FocusNest through <code>node server.js</code> in a modern browser). The device voice will be used."
        : n.state === "ready" ? FN.icon("circle-check") + " Ready (" + (n.backend === "smooth" ? "smooth, using the graphics chip" : "light, using the processor") + ") — stored on this device, works offline."
        : n.state === "loading" ? FN.icon("loader") + " Getting the voice ready… (see the progress bar)"
        : n.state === "error" ? FN.icon("circle-alert") + " Could not load: " + esc(n.error) + ' <button class="link" id="voiceGet">Try again</button>'
        : n.cached ? FN.icon("circle-check") + " Downloaded before — loads in a moment when you press Listen or Read aloud."
        : FN.icon("download") + ' Downloads once the first time you use it (see Voice quality for the size). <button class="link" id="voiceGet">Download now</button>';
      FN.icons();
      var g = $("#voiceGet"); if (g) g.onclick = function () { FN.natural.load().catch(function () {}); voiceStatus(); };
    }
    voiceStatus(); FN.onVoiceStatus = voiceStatus;
    // Listen button → reads a short natural sample with the chosen voice and speed.
    $("#ttsTest").onclick = function () { FN.speak("Hi! I'll read your lessons to you with this voice. Web analytics is about measuring what people do online, and using that data to make better decisions."); };
    $("#streakT").onchange = function () { var on = this.checked; FN.store.update(function (s) { s.streakEnabled = on; }); };
    $("#exportData").onclick = function () { var a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(FN.store.get(), null, 2)], { type: "application/json" })); a.download = "focusnest-progress.json"; a.click(); };
    $("#resetData").onclick = function () {
      FN.modal("<h3>Reset all progress?</h3><p>XP, badges, quiz history, flashcard schedules, notes and highlights on this device will be erased. Uploaded courses stay. This cannot be undone.</p><div class=\"row\"><button class=\"btn btn-ghost\" data-close>Cancel</button><button class=\"btn btn-primary danger\" id=\"doReset\">Reset</button></div>", function (m) { m.querySelector("#doReset").onclick = function () { FN.store.reset(); FN.applySettings(); FN.closeModal(); renderOutline(); settings(); FN.refreshXP(); FN.toast("Progress reset."); }; });
    };
    FN.icons();
  }

  FN.pages = { dashboard: dashboard, chapters: chapters, slides: slides, notes: notes, visual: visual, practice: practice, flashcards: flashcards, planner: planner, progress: progress, settings: settings };
  FN.renderOutline = renderOutline;
})();
