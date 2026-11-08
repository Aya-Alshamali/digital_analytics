/* =====================================================================
   FILE: tests/validate-seed.js
   PURPOSE: checks the bundled sample course data against js/schema.js
     and checks every slide reference points at a real slide.
   RUN:  node tests/validate-seed.js        (exit code 1 = problems found)
   ===================================================================== */
const fs = require("fs"), vm = require("vm"), path = require("path");
const root = path.join(__dirname, "..");
const ctx = { window: {}, console };
ctx.globalThis = ctx.window;
vm.createContext(ctx);
for (const f of ["js/schema.js", "data/slides.js", "data/ch1.js", "data/ch2a.js", "data/ch2b.js"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) vm.runInContext(fs.readFileSync(p, "utf8"), ctx, { filename: f });
}
const W = ctx.window, errors = [];
const slideCount = {};
(W.FN_SEED_SLIDES || []).forEach(d => (slideCount[d.id] = d.slides.length));
const parts = W.FN_SEED || [];
if (!parts.length) errors.push("no FN_SEED parts loaded");
let topics = 0, questions = 0, cards = 0;
for (const part of parts) {
  const max = slideCount[part.chapter];
  if (!max) errors.push("unknown chapter deck " + part.chapter);
  for (const t of part.topics) {
    topics++; questions += (t.quiz || []).length; cards += (t.flashcards || []).length;
    errors.push(...W.FN.schema.validateTopic(t, part.chapter + "/" + t.id));
    const refs = [...t.slides];
    JSON.stringify(t, (k, v) => { if ((k === "slide") && typeof v === "number") refs.push(v); if (k === "slides" && Array.isArray(v)) refs.push(...v); return v; });
    refs.filter(n => !(n >= 1 && n <= max)).forEach(n => errors.push(`${part.chapter}/${t.id}: slide ${n} does not exist (deck has ${max})`));
    const levels = new Set((t.quiz || []).map(q => q.difficulty));
    if (levels.size < 3) errors.push(`${part.chapter}/${t.id}: quiz should cover easy, medium and hard`);
  }
}
console.log(`topics=${topics} questions=${questions} flashcards=${cards}`);
if (errors.length) { console.log(errors.join("\n")); process.exit(1); }
console.log("OK");
