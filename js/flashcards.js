/* =====================================================================
   FILE: js/flashcards.js
   PURPOSE (beginner summary):
     Flashcards with spaced repetition. You flip a card, then rate it:
       Hard   → you forgot: the card comes back in 10 minutes and is
                marked "forgotten" (review-only-forgotten mode uses this).
       Medium → interval grows ×1.6 (at least 1 day).
       Easy   → interval grows ×2.5 (at least 3 days).
     Star a card to "save it for revision". Shuffle mixes the order.
   DEPENDENCIES: js/ui.js, js/store.js.
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var esc = FN.esc, DAY = 864e5;

  /**
   * FUNCTION: schedule(card, rating, now)  — pure; tested in tests/check.js
   * INPUTS: stored card state (or {}), "easy"|"medium"|"hard", time in ms.
   * OUTPUT: new state { interval (days), due (ms), reps, lapses, last }
   */
  function schedule(c, rating, now) {
    c = Object.assign({ interval: 0, reps: 0, lapses: 0 }, c || {});
    now = now || Date.now();
    if (rating === "hard") { c.lapses++; c.interval = 0; c.due = now + 10 * 60e3; }
    else if (rating === "medium") { c.interval = Math.max(1, Math.round(c.interval * 1.6 * 10) / 10); c.due = now + c.interval * DAY; }
    else { c.interval = Math.max(3, Math.round(c.interval * 2.5 * 10) / 10); c.due = now + c.interval * DAY; }
    c.reps++; c.last = rating;
    return c;
  }
  function isDue(id) { var c = FN.store.get().cards[id]; return !c || !c.due || c.due <= Date.now(); }

  /** collect(topics): [{card, topicId}] for a list of topic objects. */
  function collect(topics) {
    var out = [];
    topics.forEach(function (t) { (t.flashcards || []).forEach(function (c) { out.push({ card: c, topicId: t.id }); }); });
    return out;
  }
  /** filter(list, mode): "all" | "due" | "forgotten" | "saved" */
  function filter(list, mode) {
    var S = FN.store.get().cards;
    return list.filter(function (x) {
      var s = S[x.card.id] || {};
      if (mode === "due") return isDue(x.card.id);
      if (mode === "forgotten") return s.last === "hard";
      if (mode === "saved") return !!s.saved;
      return true;
    });
  }

  /**
   * FUNCTION: FN.cards.review(el, list, opts)
   * PURPOSE: shows a deck one card at a time.
   * USER ACTION: Flashcards tab in a lesson or the Flashcards page.
   * EXPECTED WEBSITE RESULT: card flips on click/Space; rate buttons appear after flipping.
   * FAILURE: empty deck → friendly message
   */
  function review(el, list, o) {
    o = o || {};
    var deck = o.shuffle ? FN.shuffle(list) : list.slice(), i = 0, flipped = false, rated = 0;
    if (!deck.length) {
      el.innerHTML = '<div class="empty">' + FN.icon("party-popper") + "<p>" + esc(o.emptyText || "No cards in this selection right now.") + "</p></div>"; FN.icons(); return;
    }
    function draw() {
      if (i >= deck.length) {
        el.innerHTML = '<div class="empty">' + FN.icon("sparkles") + "<p><strong>Session done — " + rated + " card" + (rated === 1 ? "" : "s") + " reviewed.</strong></p><p class=\"muted\">Cards you rated Hard come back in 10 minutes. Use “Only forgotten” to revisit them.</p><button class=\"btn btn-primary\" data-fc=\"again\">" + FN.icon("rotate-ccw") + " Review again</button></div>";
        FN.icons(); return;
      }
      var x = deck[i], st = FN.store.get().cards[x.card.id] || {};
      el.innerHTML =
        '<div class="fc"><div class="fc-top"><span class="muted">Card ' + (i + 1) + " / " + deck.length + "</span>" +
        '<button class="icon-btn' + (st.saved ? " on" : "") + '" data-fc="save" aria-pressed="' + !!st.saved + '" title="Save for revision">' + FN.icon("star") + "</button></div>" +
        '<button class="flip' + (flipped ? " is-flipped" : "") + '" data-fc="flip" aria-label="Flip card"><span class="face front"><small>Question</small><span>' + esc(x.card.front) + '</span><em>Click or press Space to flip</em></span><span class="face back"><small>Answer</small><span>' + esc(x.card.back) + "</span>" + (x.card.slide ? "<em>From slide " + x.card.slide + "</em>" : "") + "</span></button>" +
        '<div class="rate" ' + (flipped ? "" : "hidden") + '><p class="muted small">How well did you remember it?</p>' +
        '<button class="btn rate-hard" data-rate="hard">Hard <small>forgot</small></button><button class="btn rate-med" data-rate="medium">Medium</button><button class="btn rate-easy" data-rate="easy">Easy</button></div></div>';
      FN.icons();
      el.querySelector(".flip").focus();
    }
    el.onclick = function (e) {
      var b = e.target.closest("[data-fc],[data-rate]"); if (!b) return;
      var x = deck[i];
      if (b.dataset.fc === "flip") { flipped = !flipped; b.classList.toggle("is-flipped", flipped); el.querySelector(".rate").hidden = !flipped; }
      // Star button: toggles "saved for revision"
      if (b.dataset.fc === "save") { FN.store.update(function (s) { var c = s.cards[x.card.id] = s.cards[x.card.id] || {}; c.saved = !c.saved; }); draw(); }
      if (b.dataset.fc === "again") { i = 0; rated = 0; flipped = false; draw(); }
      // Rating buttons → schedule() and move to the next card.
      if (b.dataset.rate) {
        FN.store.update(function (s) { s.cards[x.card.id] = Object.assign(schedule(s.cards[x.card.id], b.dataset.rate), { saved: (s.cards[x.card.id] || {}).saved }); });
        FN.store.addXP(FN.store.XP.card);
        rated++;
        var reviews = Object.keys(FN.store.get().cards).reduce(function (n, k) { return n + (FN.store.get().cards[k].reps || 0); }, 0);
        if (reviews >= 50) FN.store.award("card-shark");
        i++; flipped = false; draw();
      }
    };
    el.onkeydown = function (e) {
      if (e.target.closest(".flip") && e.key === " ") { e.preventDefault(); e.target.closest(".flip").click(); }
      if (flipped && ["1", "2", "3"].indexOf(e.key) >= 0) { var r = el.querySelectorAll("[data-rate]")[+e.key - 1]; if (r) r.click(); }
    };
    draw();
  }

  FN.cards = { schedule: schedule, collect: collect, filter: filter, review: review, isDue: isDue };
})();
