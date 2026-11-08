/* =====================================================================
   FILE: tests/check.js
   PURPOSE: one runnable self-check for the logic that must not break:
     quiz grading, spaced-repetition scheduling, calculator math and the slide→course builder (run on the
     two real decks' text from data/slides.js).
   RUN:  node tests/check.js
   ===================================================================== */
const fs = require("fs"), vm = require("vm"), path = require("path"), assert = require("assert");
const root = path.join(__dirname, "..");
const store = {};
const ctx = {
  console, setTimeout, clearTimeout, setInterval, clearInterval,
  localStorage: { getItem: k => store[k] || null, setItem: (k, v) => { store[k] = String(v); } },
  document: { addEventListener() {}, getElementById() { return null; } }
};
ctx.window = ctx; ctx.globalThis = ctx;
vm.createContext(ctx);
["js/schema.js", "js/ui.js", "data/slides.js", "js/parser.js", "js/quiz.js", "js/flashcards.js", "js/visuals.js"]
  .forEach(f => vm.runInContext(fs.readFileSync(path.join(root, f), "utf8"), ctx, { filename: f }));
const FN = ctx.FN;
FN.shuffle = a => a.slice();

// 1. Quiz grading
const g = FN.quiz.grade;
assert.strictEqual(g({ type: "mcq", answer: 2 }, 2), true);
assert.strictEqual(g({ type: "mcq", answer: 2 }, 1), false);
assert.strictEqual(g({ type: "tf", answer: false }, false), true);
assert.strictEqual(g({ type: "multi", answer: [0, 3] }, [3, 0]), true);
assert.strictEqual(g({ type: "multi", answer: [0, 3] }, [0]), false);
assert.strictEqual(g({ type: "match", options: [["a", "1"], ["b", "2"]] }, ["1", "2"]), true);
assert.strictEqual(g({ type: "match", options: [["a", "1"], ["b", "2"]] }, ["2", "1"]), false);
assert.strictEqual(g({ type: "fill", answer: ["75%"] }, " 75 "), true);
assert.strictEqual(g({ type: "fill", answer: ["Data stream"] }, "data  stream"), true);
assert.strictEqual(g({ type: "fill", answer: ['a[href$=".pdf"]'] }, "a[href$='.pdf']"), true);
assert.strictEqual(g({ type: "fill", answer: ["75"] }, ""), false);
// level picking prefers the chosen difficulty
const qs = [{ difficulty: "easy" }, { difficulty: "hard" }, { difficulty: "medium" }];
assert.strictEqual(FN.quiz.pick(qs, "hard")[0].difficulty, "hard");

// 2. Spaced repetition
const now = 1e12, DAY = 864e5;
let c = FN.cards.schedule({}, "easy", now); assert.strictEqual(c.interval, 3); assert.strictEqual(c.due, now + 3 * DAY);
c = FN.cards.schedule(c, "easy", now); assert.strictEqual(c.interval, 7.5);
c = FN.cards.schedule(c, "hard", now); assert.strictEqual(c.interval, 0); assert.strictEqual(c.lapses, 1); assert.strictEqual(c.due, now + 600000); assert.strictEqual(c.last, "hard");
c = FN.cards.schedule(c, "medium", now); assert.strictEqual(c.interval, 1);

// 3. Calculator — numbers from Chapter 1 slides 41, 43, 46
assert.strictEqual(FN.visuals.calc("percentChange", 200, 350).value, 75);
assert.strictEqual(FN.visuals.calc("percentChange", 20, 42).value.toFixed(2), "110.00");
assert.strictEqual(FN.visuals.calc("rate", 60652, 97838).value.toFixed(2), "61.99");
assert.strictEqual(FN.visuals.calc("rate", 629, 339904).value.toFixed(2), "0.19");
assert.ok(FN.visuals.calc("percentChange", 0, 5).error);

// 4. Parser on the real decks' text → a valid course with honest content
const decks = ctx.FN_SEED_SLIDES.map(d => ({ name: d.name, slides: d.slides.map(s => ({ ...s, images: [] })) }));
const course = FN.parser.buildCourse(decks, { id: "test-course" });
const v = FN.schema.validateCourse(course);
assert.ok(v.ok, v.errors.slice(0, 5).join("\n"));
assert.strictEqual(course.chapters.length, 2);
const topics = course.chapters.flatMap(ch => ch.topics);
assert.ok(topics.length >= 6 && topics.length <= 30, "topic count " + topics.length);
const allSlideText = decks.flatMap(d => d.slides.flatMap(s => s.text.concat(s.notes || ""))).join("\n");
topics.forEach(t => t.notes.forEach(n => n.fromSlides.forEach(f => assert.ok(allSlideText.includes(f.text), "fromSlides must be verbatim: " + f.text))));
topics.forEach(t => assert.strictEqual(t.examples.length, 0, "builder must not invent examples"));
const defs = FN.parser.findDefinitions([{ text: "Data stream: is a flow of data from a customer touchpoint (e.g., app, website) to Analytics.", slide: 9 }]);
assert.strictEqual(defs[0].term, "Data stream");
const ch2 = course.chapters[1].topics.find(t => t.steps.length >= 3);
assert.ok(ch2, "slide 13's 'Step 1…Step 7' list should become a step-by-step lesson");

// 5. Read aloud: symbols are spoken as words, slide references are dropped, long text is split into sentences
const sp = FN.speechTest;
assert.strictEqual(sp.cleanForSpeech("Organization → Account (slide 5)\nKey facts"), "Organization, then Account. Key facts.");
assert.strictEqual(sp.cleanForSpeech("e.g. GA4 & GTM"), "for example, GA4 and GTM.");
const parts = sp.sentences("First sentence. Second one! " + "word ".repeat(80));
assert.ok(parts.length >= 3 && parts.every(x => x.length <= 221), "sentences are short");
assert.ok(sp.voiceScore({ name: "Ava (Premium)", lang: "en-US", localService: true }) > sp.voiceScore({ name: "Samantha", lang: "en-US", localService: true }));

console.log("check.js: all assertions passed (" + topics.length + " topics built from the real decks)");
