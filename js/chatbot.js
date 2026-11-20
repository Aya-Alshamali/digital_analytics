/* =====================================================================
   FILE: js/chatbot.js
   PURPOSE (beginner summary):
     The AI part of "Ask FocusNest". It sends the student's question,
     together with the course material they are studying (built by
     js/tutor.js), to Groq's free chat API and returns the answer.
       - Uses the models listed in js/chat-config.js; if the first one is
         busy or over its free limit, it tries the next.
       - The key comes from Settings → Chatbot (saved only in this browser),
         or a relay set in js/chat-config.js keeps it on a server instead.
       - Errors are turned into plain-language messages; js/tutor.js then
         answers from the slides instead.
   DEPENDENCIES: js/chat-config.js (FN_CHAT).
   ===================================================================== */
(function () {
  "use strict";
  var FN = (window.FN = window.FN || {});
  var KEY_STORE = "focusnest:groqKey";

  function cfg() { return window.FN_CHAT || {}; }
  function getKey() { try { return localStorage.getItem(KEY_STORE) || ""; } catch (e) { return ""; } }
  function setKey(k) { try { if (k) localStorage.setItem(KEY_STORE, k); else localStorage.removeItem(KEY_STORE); } catch (e) {} }
  /** available(): true when the chatbot can be used (a relay is configured, or a key was saved). */
  function available() { var c = cfg(); return !!(c.endpoint && (c.relay || getKey())); }

  var SYSTEM = [
    'You are "Ask FocusNest", a warm, patient tutor for a university student (who may have ADHD) studying the course "Digital and Social Media Analytics".',
    "You are given COURSE MATERIALS: the lesson the student has open and the slides that best match the question. Treat them as the source of truth.",
    "How to answer:",
    "- Base answers on the COURSE MATERIALS and cite them like (slide 12). For a slide from another chapter write (Ch.1 slide 30).",
    "- If the materials do not cover something, say so honestly. You may add a short general explanation, but start that sentence with [Extra] so the student knows it is not from their slides.",
    "- Never invent numbers, dates or product features and present them as course facts.",
    "- Make it easy to absorb: short paragraphs (max 3 sentences), \"- \" bullet lists, **bold** key terms, one everyday example when it helps. Usually under 180 words unless the student asks for more depth.",
    "- Connect the answer to what the student is studying, and point to the lesson tab that helps next (Notes, Step-by-Step, Visual, Flashcards, Quiz) when useful.",
    '- End with one short "**Quick check:**" question so the student actively recalls the idea (do not give its answer).',
    "- On the very last line write: FOLLOWUPS: <question 1> | <question 2> | <question 3>   (three short next questions the student could ask, each under 10 words).",
    "Plain text with the light formatting above only: no headings, no tables, no code fences unless the student asks about code or regex."
  ].join("\n");

  function friendly(status, body) {
    var msg = (body && body.error && (body.error.message || body.error)) || "";
    if (status === 401 || status === 403) return "The chatbot key isn't accepted — check it in Settings → Chatbot.";
    if (status === 429) return "The free chatbot limit is used up for now — please try again a little later.";
    if (!status) return "Couldn't reach the chatbot — check your internet connection.";
    return "The chatbot had a problem (" + status + (msg ? ": " + String(msg).slice(0, 120) : "") + ").";
  }

  /**
   * FUNCTION: ask(question, materials, history)
   * INPUTS: the question, a text block of course material, and earlier turns
   *   [{role:"user"|"assistant", content}].
   * OUTPUT: Promise<{answer, followups[], model}>. Rejects with a friendly Error.
   */
  function ask(question, materials, history) {
    var c = cfg(), models = (c.models || []).slice(), url = c.relay || c.endpoint, lastErr = null;
    var headers = { "Content-Type": "application/json" };
    if (!c.relay) headers.Authorization = "Bearer " + getKey();
    var messages = [{ role: "system", content: SYSTEM }, { role: "system", content: "=== COURSE MATERIALS ===\n" + materials }]
      .concat((history || []).slice(-6)).concat([{ role: "user", content: question }]);
    function tryNext() {
      var model = models.shift();
      if (!model) return Promise.reject(new Error(lastErr || friendly(0)));
      return fetch(url, { method: "POST", headers: headers, body: JSON.stringify({ model: model, messages: messages, temperature: 0.4, max_tokens: 1000, reasoning_effort: "low" }) })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (j) {
            if (r.ok && j.choices && j.choices[0]) {
              var raw = String(j.choices[0].message.content || "").trim();
              var m = raw.match(/\n?\s*FOLLOWUPS:\s*(.+)\s*$/i);
              return { answer: (m ? raw.slice(0, m.index) : raw).trim(), followups: m ? m[1].split("|").map(function (s) { return s.trim(); }).filter(Boolean).slice(0, 3) : [], model: model };
            }
            lastErr = friendly(r.status, j);
            if (r.status === 429 || r.status >= 500) return tryNext();     // busy or over limit → try the next model
            throw new Error(lastErr);
          });
        }, function () { lastErr = friendly(0); return tryNext(); });
    }
    return tryNext();
  }

  FN.chatbot = { available: available, ask: ask, getKey: getKey, setKey: setKey, usesRelay: function () { return !!cfg().relay; } };
})();
