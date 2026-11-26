/* =====================================================================
   FILE: tests/regex-lab-check.js
   PURPOSE: checks the Regex Lab logic: every slide answer (slides 75–76)
     passes its own exercise, a known-bad pattern fails, and full vs
     partial matching behaves like GA4 vs GTM.
   RUN:  node tests/regex-lab-check.js
   ===================================================================== */
const fs = require("fs"), vm = require("vm"), path = require("path"), assert = require("assert");
const ctx = { console }; ctx.window = ctx; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "..", "js/regex-lab.js"), "utf8"), ctx);
const L = ctx.FN.regexLab;

L.EXERCISES.forEach(ex => {
  const g = L.grade(ex, ex.answer);
  assert.ok(g.pass, ex.id + " slide answer should pass: " + JSON.stringify(g.rows.filter(r => r.want !== r.got)));
});
assert.ok(!L.grade(L.EXERCISES[7], ".*(chatgpt|perplexity|)*.*").pass, "the bad pattern from exercise 8 must fail");
assert.ok(!L.grade(L.EXERCISES[0], "booking-confirmed").pass, "a partial pattern fails in GA4");
// full (GA4) vs partial (GTM)
assert.ok(!L.run(L.compile("booking", "ga4").re, "/en/booking/").ok);
assert.ok(L.run(L.compile("booking", "gtm").re, "/en/booking/").ok);
assert.ok(L.run(L.compile("(?i)royal", "bq").re, "ROYAL").ok, "(?i) ignores capitals");
assert.ok(L.compile("^/en/(?!help).*", "ga4").warn.length, "RE2 lookahead warning");
assert.ok(L.compile("(a", "ga4").error, "invalid pattern reports an error");
const r = L.run(L.compile("^/(en|fr|ar)/[^/]+/(economy|business)/receipt\\.aspx$", "table").re, "/fr/reservation-confirmee/business/receipt.aspx");
assert.deepStrictEqual(Array.from(r.groups), ["fr", "business"], "$1 / $2 capture groups");
console.log("regex-lab-check.js: all " + L.EXERCISES.length + " slide answers pass, matching rules OK");
