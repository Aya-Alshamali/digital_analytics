/* =====================================================================
   FILE: js/chat-config.js
   PURPOSE (beginner summary): settings for the "Ask FocusNest" chatbot.
     The chatbot talks to Groq (free plan, no billing) using the
     OpenAI-compatible chat API, straight from the browser — so it works
     on GitHub Pages without a server.
   WHERE THE KEY COMES FROM (no key is stored in this repository):
     - Settings → Chatbot: each person can paste a free Groq key
       (https://console.groq.com/keys). It is saved only in their own browser.
     - OR set `relay` below to the address of a small relay (for example a free
       Cloudflare Worker) that keeps the key secret on the server side. Then
       nobody needs to enter a key.
   SAFE TO EDIT: models (first = preferred; the next is used if the first is busy).
   ===================================================================== */
window.FN_CHAT = {
  provider: "Groq",
  endpoint: "https://api.groq.com/openai/v1/chat/completions",
  relay: "",                                   // e.g. "https://focusnest-chat.<you>.workers.dev" — leave "" to use a key from Settings
  models: ["openai/gpt-oss-120b", "openai/gpt-oss-20b"]
};
