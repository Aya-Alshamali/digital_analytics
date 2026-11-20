/* =====================================================================
   FILE: relay/worker.js  — a tiny Cloudflare Worker (free plan)
   PURPOSE (beginner summary):
     Lets EVERY visitor use the Ask FocusNest chatbot without entering a key.
     The website sends the chat request here; this relay adds the secret Groq
     key (stored in Cloudflare as the secret GROQ_KEY — never in this file or
     the repository) and forwards it to Groq.
   PROTECTION:
     - Only answers requests coming from the FocusNest website (ALLOWED_ORIGINS).
     - Only allows the chat models FocusNest uses, and caps the answer length,
       so the relay can't be used as a free general-purpose AI service.
   DEPLOY: see relay/README.md
   ===================================================================== */
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const ALLOWED_ORIGINS = ["https://aya-alshamali.github.io", "http://localhost:8080"];
const ALLOWED_MODELS = ["openai/gpt-oss-120b", "openai/gpt-oss-20b"];

function cors(origin) {
  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin"
  };
}
function reply(status, body, origin) {
  return new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json", ...(origin ? cors(origin) : {}) } });
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const allowed = ALLOWED_ORIGINS.includes(origin);
    if (request.method === "OPTIONS") return new Response(null, { status: allowed ? 204 : 403, headers: allowed ? cors(origin) : {} });
    if (!allowed) return reply(403, { error: { message: "This relay only serves the FocusNest website." } });
    if (request.method !== "POST") return reply(405, { error: { message: "Use POST." } }, origin);
    if (!env.GROQ_KEY) return reply(500, { error: { message: "The relay has no GROQ_KEY secret yet." } }, origin);

    let body;
    try { body = await request.json(); } catch { return reply(400, { error: { message: "Bad JSON." } }, origin); }
    if (!ALLOWED_MODELS.includes(body.model)) return reply(400, { error: { message: "Model not allowed." } }, origin);
    if (!Array.isArray(body.messages) || JSON.stringify(body.messages).length > 60000) return reply(400, { error: { message: "Message too long." } }, origin);

    const upstream = await fetch(GROQ_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + env.GROQ_KEY },
      body: JSON.stringify({
        model: body.model,
        messages: body.messages,
        temperature: typeof body.temperature === "number" ? Math.min(Math.max(body.temperature, 0), 1) : 0.4,
        max_tokens: Math.min(Number(body.max_tokens) || 1000, 1200),
        reasoning_effort: "low"
      })
    });
    return new Response(upstream.body, { status: upstream.status, headers: { "Content-Type": "application/json", ...cors(origin) } });
  }
};
