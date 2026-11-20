/* FILE: data/ch3a.js — FocusNest lesson content for Chapter 3 (part A, slides 2–40), written from data/slides-ch3.js (deck ch3).
   Slide-verbatim text lives in `fromSlides`/`definitions`; all other prose is FocusNest's added explanation. */
(window.FN_SEED = window.FN_SEED || []).push({ chapter: "ch3", order: 1, title: "Regular Expressions for GA4 and GTM", topics: [

/* ============================== c3t1 ============================== */
{
  id: "c3t1",
  title: "What Regular Expressions Are & How Matching Works",
  slides: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
  minutes: 25,
  overview: {
    about: "What a regular expression is, the difference between normal and special characters, full versus partial matching in GA4, GTM, Data Studio, BigQuery and Search Console, why patterns match more than you expect, and why Google's RE2 engine rejects some patterns that work elsewhere.",
    why: "The same pattern can give a different result in each Google tool. Knowing which tool uses full or partial matching, and which symbols RE2 understands, explains most 'my regex doesn't work' problems before they cost you wrong reports.",
    objectives: [
      "Explain what a regex is and how one pattern can replace a list of values.",
      "Tell normal characters from the 12 special characters (metacharacters).",
      "Say which tools use full matching and which use partial matching, and how .* and (?i) change the result.",
      "Explain why patterns are greedy and how to make them more specific.",
      "Explain what a regex engine is, why Google built RE2, and how to replace (?!, (?=, (?<= and \\1."
    ],
    vocabulary: [
      { term: "Regular expression (regex)", def: "A short rule that describes a group of texts, instead of listing every text one by one.", slide: 8 },
      { term: "Pattern / match", def: "A regex is a pattern; a value \"matches\" when it fits the pattern.", slide: 3 },
      { term: "Metacharacter", def: "A special character that gives an instruction instead of meaning itself, such as ? or |.", slide: 9 },
      { term: "Full match", def: "GA4 checks whether the pattern describes the WHOLE value.", slide: 10 },
      { term: "Partial match", def: "GTM and many other tools only check whether the pattern appears SOMEWHERE inside the value.", slide: 10 },
      { term: "Greedy", def: "A pattern matches every value that fits it, which is often more than you intended.", slide: 15 },
      { term: "Regex engine", def: "The program inside a tool that reads your pattern and checks the data against it.", slide: 17 },
      { term: "RE2", def: "Google's version of regex, used by GA4, Data Studio, BigQuery and the GTM server container.", slide: 16 }
    ],
    hook: "One booking, four different confirmation URLs. Regex lets one short rule count them all, if you know how each tool reads it."
  },
  notes: [
    {
      id: "c3t1-n1",
      heading: "Platform words, URL parts and the Royal Jordanian example",
      slides: [2, 3, 4, 5],
      fromSlides: [
        { text: "Key idea:  Regex is a tool used inside analytics platforms, so first make sure the platform terms are clear.", slide: 3 },
        { text: "Key idea:  An airline wants to count tickets sold online, but one booking can end on many different confirmation pages.", slide: 4 },
        { text: "\"How many tickets did we sell online, by language and by cabin (Economy or Business)?\"", slide: 4 },
        { text: "Key idea:  A URL has several parts, and GA4 and GTM store them in different fields. Before writing a pattern, check which part you are testing.", slide: 5 }
      ],
      simple: "Before learning regex symbols, know the words around them: GA4 records events, GTM decides when tags fire, and a URL is split into hostname, path and query string. The chapter uses one example all the way through: Royal Jordanian's booking-confirmation pages, which come in many versions.",
      deep: "GA4 collects visits and actions and shows them in reports; an event is one recorded action such as page_view, and a key event is an event you mark as important (GA4's new name for a conversion or goal). GTM uses triggers, rules that say when a tag should fire. The running example is RJ, which sells tickets on rj.com in several languages and in Economy and Business class. Its confirmation pages differ because each language uses a different word for 'confirmed', an old app version writes bookingconfirmed with no hyphen, and every booking carries its own PNR in the query string. That is why exact URLs do not work and one rule is needed. A URL such as https://www.rj.com/en/booking-confirmed/economy/receipt.aspx?pnr=K7Q2LM has a protocol, a hostname (GTM Page Hostname), a path (GA4 Page path, GTM Page Path), a query string after the ?, parameters joined with &, and the full URL (GA4 page_location, GTM Page URL). The slides note that these URLs are teaching examples, not RJ's real booking pages.",
      exam: [
        "page_location = the full address; Page path = only the part after the domain.",
        "Key event = GA4's new name for a conversion or goal.",
        "PNR = the 6-character booking code, e.g. K7Q2LM.",
        "Exact URLs fail for RJ because of different language words, the hyphen-less old app spelling and the unique PNR.",
        "Check which URL part (hostname, path, query string, full URL) a field holds before writing a pattern."
      ],
      definitions: [
        { term: "Trigger", def: "A rule in GTM that says when a tag should fire", slide: 3 },
        { term: "Page path", def: "Only the part after the domain: /en/booking-confirmed/economy/receipt.aspx", slide: 3 },
        { term: "Query string", def: "Everything after the ?; it carries parameters", slide: 5 },
        { term: "Parameter", def: "A name=value pair; several are joined with &", slide: 5 }
      ],
      keyFacts: [
        "GA4 Page path and GTM Page Path hold the path; GA4 page_location and GTM Page URL hold the full URL.",
        "www is a subdomain of rj.com; the hostname appears in GTM as Page Hostname.",
        "By the end of Part 2 you can write one rule that matches all four RJ confirmation pages."
      ],
      examples: [
        "https://www.rj.com/fr/reservation-confirmee/economy/receipt.aspx?pnr=R4T8WX and https://www.rj.com/ar/tam-alhajz/business/receipt.aspx are both RJ confirmation pages, but they share almost no words."
      ],
      misconceptions: [
        "Myth: page_location and Page path are the same thing. page_location is the full address; Page path is only the part after the domain."
      ]
    },
    {
      id: "c3t1-n2",
      heading: "What a regex is: normal and special characters",
      slides: [7, 8, 9],
      fromSlides: [
        { text: "Key idea:  A regular expression (regex) is a short rule that describes a group of texts, instead of listing every text one by one.", slide: 8 },
        { text: "The ? means \"the character just before me is optional\".", slide: 8 },
        { text: "Remember:  A field uses regex only when you choose a regex option, such as \"matches regex\" in GA4 or \"matches RegEx\" in GTM.", slide: 8 },
        { text: "Key idea:  Most characters in a pattern simply mean themselves. A small set of special characters (called metacharacters) give instructions instead.", slide: 9 }
      ],
      simple: "A regex is one short rule instead of a long list. booking-?confirmed covers both booking-confirmed and bookingconfirmed. Most characters mean themselves; only 12 special symbols give instructions.",
      deep: "Think of a regex like a description on a 'wanted' poster: it does not list every face, it describes the features. The pattern booking-?confirmed says 'booking, an optional hyphen, then confirmed'. It matches booking-confirmed and bookingconfirmed, but not booking--confirmed (two hyphens) or booking-cancelled. Normal characters, like the letters in amman, simply look for themselves. The special characters each carry an instruction: \\ treats the next character as normal, | means OR, ? makes the item before it optional, ( ) groups items, [ ] means exactly one character from a list, { } repeats a set number of times, . is any single character, + repeats one or more times, * repeats zero or more times, ^ marks the start, $ marks the end, and .* means anything at all. A field only reads your text as regex when you pick a regex option such as 'matches regex' in GA4 or 'matches RegEx' in GTM.",
      exam: [
        "Regex = a short rule describing a group of texts.",
        "booking-?confirmed matches booking-confirmed and bookingconfirmed, not booking--confirmed.",
        "? = the character just before it is optional.",
        "Metacharacters: \\ | ? ( ) [ ] { } . + * ^ $ (and .* = anything at all).",
        "Regex only applies when you choose a regex operator (GA4 'matches regex', GTM 'matches RegEx')."
      ],
      definitions: [
        { term: "Metacharacters", def: "A small set of special characters (called metacharacters) give instructions instead.", slide: 9 },
        { term: ".*", def: "Anything at all (any characters, any length)", slide: 9 }
      ],
      keyFacts: [
        "The pattern amman looks for the letters a-m-m-a-n.",
        "booking-cancelled does not match booking-?confirmed."
      ],
      examples: [
        "Instead of listing booking-confirmed and bookingconfirmed, write booking-?confirmed."
      ],
      misconceptions: [
        "Myth: every filter field reads regex. Only when you pick a regex option such as 'matches regex'.",
        "Myth: ? means 'any character'. It makes the item before it optional; the dot is 'any single character'."
      ]
    },
    {
      id: "c3t1-n3",
      heading: "Full match versus partial match, tool by tool",
      slides: [10, 11, 12, 13, 14],
      fromSlides: [
        { text: "Key idea:  GA4 checks whether the pattern describes the WHOLE value. GTM and many other tools only check whether the pattern appears SOMEWHERE inside the value.", slide: 10 },
        { text: "Key idea:  Before typing a pattern, check which kind of matching the tool uses and whether it treats capital and small letters as different.", slide: 11 },
        { text: "Remember:  Same pattern, different tool, different result. This table explains most \"my regex doesn't work\" problems.", slide: 11 },
        { text: "Better: lowercase the value in GTM so GA4 never sees capitals.", slide: 12 }
      ],
      simple: "GA4 wants your pattern to describe the whole value. GTM triggers only need it to appear somewhere. Add .* at both ends to say 'contains' in a full-match tool, and (?i) to ignore capitals in Data Studio, BigQuery and Search Console.",
      deep: "Full matching is like a key that must fit the whole lock; partial matching is like a word search, where finding the word anywhere is enough. On https://www.rj.com/en/booking-confirmed/economy/receipt.aspx?pnr=K7Q2LM the pattern booking-confirmed is a partial match (GTM, BigQuery) but not a full match (GA4); .*booking-confirmed.* matches in both. GA4 report filters also offer a 'matches partial regex' option. Tool by tool: GA4 filters, audiences and admin settings use full matching and treat capitals as different. A GTM trigger 'matches RegEx' is partial and case-sensitive unless you pick 'ignore case'. A GTM RegEx Table variable is full by default with Ignore Case on by default. Data Studio REGEXP_MATCH is full; REGEXP_CONTAINS (Data Studio and BigQuery) and the Search Console regex filter are partial; all three are case-sensitive and accept (?i) at the start to ignore capitals. The slides test /en/Booking-Confirmed/economy/receipt.aspx with booking-confirmed in six tools: GA4 fails on position and capitals (fix .*[Bb]ooking-[Cc]onfirmed.*), the GTM trigger fails only on capitals (fix: matches RegEx (ignore case)), the RegEx Table fails only on position (fix .*booking-confirmed.*), REGEXP_MATCH fails on both (fix (?i).*booking-confirmed.*), and REGEXP_CONTAINS and Search Console fail only on capitals (fix (?i)booking-confirmed).",
      exam: [
        "Full match: GA4, GTM RegEx Table (default), Data Studio REGEXP_MATCH.",
        "Partial match: GTM trigger 'matches RegEx', REGEXP_CONTAINS, Search Console regex filter.",
        "In a full-match tool, .* at both ends means 'contains'.",
        "(?i) at the start ignores capitals in Data Studio, BigQuery and Search Console.",
        "RegEx Table: Full Matches Only and Ignore Case are ticked by default."
      ],
      definitions: [
        { term: "REGEXP_MATCH / REGEXP_CONTAINS", def: "REGEXP_MATCH and REGEXP_CONTAINS are functions: commands you type in Data Studio or BigQuery.", slide: 11 }
      ],
      keyFacts: [
        "GA4 report filters also offer a 'matches partial regex' option.",
        "REGEXP_CONTAINS needs no .* because CONTAINS already looks anywhere.",
        "The slides' better fix for GA4: lowercase the value in GTM so GA4 never sees capitals."
      ],
      examples: [
        "REGEXP_MATCH(Page path, 'booking-confirmed') is FALSE on /en/Booking-Confirmed/economy/receipt.aspx; REGEXP_MATCH(Page path, '(?i).*booking-confirmed.*') is TRUE."
      ],
      misconceptions: [
        "Myth: a pattern that works in GTM will work the same in GA4. GTM triggers are partial; GA4 is full.",
        "Myth: in a GTM RegEx Table, capitals break the match. Ignore Case is ticked by default; Full Matches Only is the usual problem."
      ]
    },
    {
      id: "c3t1-n4",
      heading: "Regex is greedy: it matches everything it can",
      slides: [15],
      fromSlides: [
        { text: "Key idea:  A pattern matches every value that fits it, which is often more than you intended. This is called being \"greedy\".", slide: 15 },
        { text: "Greed is helpful when you want one short pattern to cover many values, and harmful when it catches pages you did not mean. The fix is to be more specific, for example by naming the folder: /booking-?confirmed/", slide: 15 },
        { text: "Remember:  After writing a pattern, always ask: what else could this match?", slide: 15 }
      ],
      simple: "A pattern catches every value it fits, even ones you did not want. confirmed also catches booking-unconfirmed, a failed booking. Be more specific, and always ask what else the pattern could match.",
      deep: "Greed works like a fishing net: a wide net catches the fish you want plus some you do not. With partial matching, confirmed matches /en/booking-confirmed/ (wanted) but also /en/booking-unconfirmed/ (not wanted, because that is a failed booking). Greed can also help: google matches google.jo and google.co.uk, so you do not need to list every country. The fix for unwanted matches is to describe more of the value, for example naming the whole folder with /booking-?confirmed/, so the slashes on both sides stop it from matching inside booking-unconfirmed.",
      exam: [
        "Greedy = matches every value that fits, often more than intended.",
        "confirmed (partial) also matches /en/booking-unconfirmed/.",
        "Fix: be more specific, e.g. /booking-?confirmed/.",
        "Always ask: what else could this match?"
      ],
      definitions: [
        { term: "Greedy", def: "A pattern matches every value that fits it, which is often more than you intended.", slide: 15 }
      ],
      keyFacts: [
        "google matches google.jo and google.co.uk: useful greed.",
        "confirmed matching booking-unconfirmed: harmful greed."
      ],
      examples: [
        "Counting /booking-?confirmed/ instead of confirmed keeps failed (unconfirmed) bookings out of the ticket count."
      ],
      misconceptions: [
        "Myth: greed is always a bug. It is useful when one short pattern should cover many values, such as every Google country domain."
      ]
    },
    {
      id: "c3t1-n5",
      heading: "RE2: Google's regex engine and the symbols it does not understand",
      slides: [16, 17, 18, 19, 20],
      fromSlides: [
        { text: "Key idea:  A regex engine is the program inside a tool that reads your pattern and checks the data against it. Different tools use different engines.", slide: 17 },
        { text: "Key idea:  Some patterns make most regex engines slow down dramatically as the text gets longer. RE2 stays fast. We measured it.", slide: 18 },
        { text: "Use two simple conditions instead: Page path matches ^/en/.* AND Page path does not match ^/en/help/.*", slide: 16 },
        { text: "Key idea:  You may see these symbols in tutorials or chatbot answers. Each has a simple replacement, so you never need them in GA4, GTM, Data Studio or BigQuery.", slide: 20 }
      ],
      simple: "Different tools read regex with different engines, like dialects of one language. Google's tools mostly use RE2, which is always fast but does not understand (?!, (?=, (?<= or \\1. Replace them with simpler patterns or two conditions.",
      deep: "A regex engine is the program that reads your pattern and checks data against it; each engine's version of regex is called a flavour, like Jordanian, Egyptian and Moroccan Arabic. GA4, Data Studio, BigQuery and the GTM server container use RE2; the GTM web container uses the browser's JavaScript; regex101.com uses PCRE unless you choose 'Golang'. Google built RE2 so computers never freeze: with the pattern (a+)+b on texts of only a's, a backtracking engine (measured in Python) tries every way of splitting the a's into groups, and each extra a doubles the ways: 0.1 ms for 10 a's, 6 seconds for 26, about 1.5 minutes estimated for 30 and about a day estimated for 40. RE2 checks all ways at once and stays instant. The cost is that RE2 lacks some advanced symbols. (?!help), 'not followed by', is rejected by GA4, so 'all English pages except help' becomes two conditions: matches ^/en/.* AND does not match ^/en/help/.*. (?=...) becomes simply including the following text (rj\\.com instead of rj(?=\\.com)), (?<=...) becomes including the preceding text (/en/help), and \\1, 'the same text again', is rarely needed in analytics; check repeated values in a spreadsheet or BigQuery instead.",
      exam: [
        "RE2: GA4, Data Studio, BigQuery, GTM server container. GTM web container: browser JavaScript.",
        "regex101.com uses PCRE unless you choose Golang.",
        "RE2 stays fast on (a+)+b; a backtracking engine doubles its work with each extra a.",
        "RE2 does not understand (?! — use two conditions (matches + does not match).",
        "Replace (?=...) and (?<=...) by writing the following or preceding text into the pattern."
      ],
      definitions: [
        { term: "Flavour", def: "Each engine's version of regex is called a flavour.", slide: 17 },
        { term: "(?!...)", def: "(?!help) means \"not followed by help\". GA4 rejects this pattern.", slide: 19 }
      ],
      keyFacts: [
        "Timings were measured in Python 3 (re module) and Google's RE2 library, Nov 2026; times vary by computer.",
        "\"Instant\" = under 0.01 ms.",
        "A page is shown only if it starts with /en/ (condition 1) AND is not a help page (condition 2)."
      ],
      examples: [
        "/en/plan-and-book/fares is shown; /en/help/baggage is not (help page); /ar/plan-and-book/fares is not (not English)."
      ],
      misconceptions: [
        "Myth: if a pattern works on a regex website, it will work in GA4. The site may use a different engine (PCRE) unless you pick Golang.",
        "Myth: you need lookaheads to say 'except' in GA4. Use a 'does not match' condition instead."
      ]
    }
  ],
  steps: [
    {
      title: "Collect",
      what: "Copy 50 to 100 real values, including some that must NOT match.",
      why: "A pattern is only correct when it matches everything it should and nothing it should not.",
      practical: "For RJ, include booking-unconfirmed pages so you can see whether your pattern catches failed bookings.",
      visual: "Real values → should match / should NOT match",
      check: {
        q: "Why must your test list include values that should NOT match?",
        options: ["To make the list longer", "Because a correct pattern must also reject what it should not match", "Because GA4 requires 100 values", "To test the GTM container ID"],
        answer: 1,
        explain: "The slide's key idea: test both sides, matches and non-matches."
      }
    },
    {
      title: "Test outside",
      what: "Test the pattern on regex101.com with the Golang option; add ^ and $ to imitate GA4.",
      why: "regex101.com uses PCRE by default; Golang is closer to Google's RE2, and ^ and $ imitate GA4's full matching.",
      practical: "If a symbol is rejected in Golang mode, GA4 will reject it too.",
      visual: "regex101.com → Golang → ^pattern$",
      check: {
        q: "On regex101.com, how do you imitate GA4?",
        options: ["Use the default PCRE option", "Choose Golang and add ^ and $", "Add (?!) at the start", "Remove all dots"],
        answer: 1,
        explain: "Golang approximates RE2; ^ and $ make the test a full match like GA4."
      }
    },
    {
      title: "Test in reports",
      what: "Use the pattern as a report filter or Explore segment and check the counts.",
      why: "Real data shows whether the pattern catches the right number of pages.",
      practical: "Compare the count with what you expect, e.g. the number of confirmation pages.",
      visual: "Report filter / Explore segment → check counts",
      check: {
        q: "Where do you test the pattern in step 3?",
        options: ["In GTM Preview", "As a GA4 report filter or Explore segment", "In admin data filters only", "In the website code"],
        answer: 1,
        explain: "Step 3 is testing in reports: a report filter or Explore segment."
      }
    },
    {
      title: "Test in Preview",
      what: "In GTM, open pages that should and should not fire the tag.",
      why: "GTM triggers use partial matching, so you must see the tag fire, and not fire, on real pages.",
      practical: "Open a booking-confirmed page and an unconfirmed page and check both results.",
      visual: "GTM Preview → page that should fire / page that should not",
      check: {
        q: "What do you check in GTM Preview?",
        options: ["Only pages that should fire", "Pages that should and should not fire the tag", "The GA4 property ID", "The hostname only"],
        answer: 1,
        explain: "Both sides again: pages that should fire and pages that should not."
      }
    },
    {
      title: "Deploy",
      what: "Only now use it in admin settings; start data filters in Testing.",
      why: "Admin settings change how data is collected, so they come last, after testing.",
      practical: "Keep a simple list of every pattern you use: where, what it means, examples, who owns it, last tested.",
      visual: "Admin settings → data filter in Testing → pattern log",
      check: {
        q: "How should a new GA4 data filter start?",
        options: ["Active immediately", "In Testing", "Deleted", "In GTM Preview"],
        answer: 1,
        explain: "The slide says to start data filters in Testing."
      }
    }
  ],
  visual: {
    type: "regex",
    title: "GA4 full-match tester",
    caption: "GA4 'matches regex' needs the pattern to describe the WHOLE path. Use .* to say 'contains' and ^ to say 'starts with'.",
    slides: [10, 15, 19],
    data: {
      mode: "full",
      samples: [
        "/en/booking-confirmed/economy/receipt.aspx",
        "/en/bookingconfirmed/business/receipt.aspx",
        "/fr/reservation-confirmee/economy/receipt.aspx",
        "/ar/tam-alhajz/business/receipt.aspx",
        "/en/booking-unconfirmed/economy/receipt.aspx",
        "/en/plan-and-book/fares",
        "/en/help/baggage",
        "/ar/plan-and-book/fares",
        "/en/royal-club/join",
        "/en/help/contact-us"
      ],
      challenges: [
        { task: "Select every path that contains booking-confirmed or bookingconfirmed (hyphen optional).", answer: ".*booking-?confirmed.*", hint: "GA4 needs .* at both ends, and ? makes the hyphen optional." },
        { task: "Select every path that contains the word confirmed anywhere. Notice what else it catches.", answer: ".*confirmed.*", hint: "Greedy: this also catches booking-unconfirmed." },
        { task: "Select all English pages (paths that start with /en/).", answer: "^/en/.*", hint: "In GA4, ^/en/ alone would have to be the whole value; add .* after it." },
        { task: "Select only the English help pages.", answer: "^/en/help/.*", hint: "Name the help folder after /en/." },
        { task: "Select the Business-class pages.", answer: ".*/business/.*", hint: "Include the slashes so the folder name is matched." },
        { task: "Select the Arabic pages.", answer: "^/ar/.*", hint: "Start with ^/ar/ and cover the rest with .*" }
      ]
    }
  },
  examples: [
    {
      concept: "Same pattern, different tools",
      example: "The old RJ app sends the path /en/Booking-Confirmed/economy/receipt.aspx. The pattern booking-confirmed is tested in GA4, a GTM trigger, a GTM RegEx Table and Data Studio REGEXP_MATCH.",
      walkthrough: [
        "GA4 report filter: No. GA4 needs a full match, and Booking is not booking. Fix: .*[Bb]ooking-[Cc]onfirmed.*",
        "GTM trigger matches RegEx: No. Position is fine (partial match), but capitals count. Fix: matches RegEx (ignore case).",
        "GTM RegEx Table: 'Other'. Full Matches Only is ticked; capitals are not the problem because Ignore Case is ticked. Fix: .*booking-confirmed.*",
        "REGEXP_MATCH: FALSE. Full match and case-sensitive, two problems at once. Fix: (?i).*booking-confirmed.*"
      ],
      application: "When a pattern 'doesn't work', first ask two questions: does this tool use full or partial matching, and does it treat capitals as different?",
      check: {
        q: "Why does REGEXP_CONTAINS(page_path, 'booking-confirmed') return FALSE on /en/Booking-Confirmed/economy/receipt.aspx?",
        options: ["Because CONTAINS is a full match", "Only because of the capital letters", "Because .* is missing", "Because RE2 does not understand hyphens"],
        answer: 1,
        explain: "CONTAINS is partial, so position is fine; only the capitals stop it. Fix: (?i)booking-confirmed."
      }
    },
    {
      concept: "Saying 'except' without (?!",
      example: "An RJ analyst wants all English pages except the help pages. A chatbot gives ^/en/(?!help).* and GA4 rejects it.",
      walkthrough: [
        "(?!help) means 'not followed by help'; RE2 does not understand it.",
        "Condition 1: Page path matches regex ^/en/.*",
        "Condition 2 (AND): Page path does not match regex ^/en/help/.*",
        "/en/plan-and-book/fares passes both and is shown; /en/help/baggage fails condition 2; /ar/plan-and-book/fares fails condition 1."
      ],
      application: "Whenever a tutorial or chatbot gives you (?!, split the rule into a 'matches' and a 'does not match' condition.",
      check: {
        q: "Is /en/royal-club/join shown by the two conditions?",
        options: ["Yes: it starts with /en/ and is not a help page", "No: it is not a help page", "No: RE2 rejects it", "Only in GTM"],
        answer: 0,
        explain: "It passes condition 1 (starts with /en/) and condition 2 (not a help page)."
      }
    }
  ],
  flashcards: [
    { id: "c3t1-f1", front: "What is a regular expression?", back: "A short rule that describes a group of texts, instead of listing every text one by one.", slide: 8 },
    { id: "c3t1-f2", front: "What does ? mean in booking-?confirmed?", back: "The character just before it (the hyphen) is optional.", slide: 8 },
    { id: "c3t1-f3", front: "Full match vs partial match?", back: "Full (GA4): the pattern must describe the WHOLE value. Partial (GTM triggers): the pattern can appear SOMEWHERE in the value.", slide: 10 },
    { id: "c3t1-f4", front: "How do you say 'contains' in GA4?", back: "Put .* at both ends, e.g. .*booking-confirmed.*, or use the 'matches partial regex' option in report filters.", slide: 10 },
    { id: "c3t1-f5", front: "What does (?i) do?", back: "Ignores capital/small letters when placed at the start, in Data Studio, BigQuery and Search Console.", slide: 11 },
    { id: "c3t1-f6", front: "GTM RegEx Table variable defaults?", back: "Full Matches Only is ticked and Ignore Case is ticked by default.", slide: 13 },
    { id: "c3t1-f7", front: "What does 'greedy' mean?", back: "A pattern matches every value that fits it, often more than you intended (confirmed also matches booking-unconfirmed).", slide: 15 },
    { id: "c3t1-f8", front: "Which tools use RE2?", back: "GA4, Data Studio, BigQuery and the GTM server container. The GTM web container uses the browser's JavaScript.", slide: 17 },
    { id: "c3t1-f9", front: "Why did Google build RE2?", back: "To avoid frozen computers: RE2 stays fast on patterns like (a+)+b where backtracking engines slow down dramatically.", slide: 18 },
    { id: "c3t1-f10", front: "How do you write 'all English pages except help' in GA4?", back: "Page path matches ^/en/.* AND Page path does not match ^/en/help/.*", slide: 19 }
  ],
  quiz: [
    {
      id: "c3t1-q1", type: "mcq", difficulty: "easy",
      prompt: "What is a regular expression?",
      options: ["A list of every URL on a website", "A short rule that describes a group of texts", "A GA4 report type", "A GTM tag that sends events"],
      answer: 1,
      explain: "A regex is a short rule that describes a group of texts, instead of listing every text one by one.",
      wrongWhy: { "0": "A regex replaces the list; it does not list every value.", "2": "Regex is used inside reports as a filter, but it is not a report type.", "3": "Tags send data; a regex is a pattern used in conditions and variables." },
      slide: 8, section: "c3t1-n2"
    },
    {
      id: "c3t1-q2", type: "tf", difficulty: "easy",
      prompt: "The pattern booking-?confirmed matches both booking-confirmed and bookingconfirmed.",
      answer: true,
      explain: "The ? makes the hyphen optional, so both spellings match.",
      slide: 8, section: "c3t1-n2"
    },
    {
      id: "c3t1-q3", type: "fill", difficulty: "easy",
      prompt: "Google's own regex engine, used by GA4, Data Studio and BigQuery, is called ____.",
      answer: ["RE2"],
      explain: "RE2 is Google's version of regex.",
      slide: 17, section: "c3t1-n5"
    },
    {
      id: "c3t1-q4", type: "match", difficulty: "medium",
      prompt: "Match each place you type a pattern to how it matches.",
      options: [
        ["GA4 report filter", "Full match; capitals count"],
        ["GTM trigger 'matches RegEx'", "Partial match; capitals count unless you pick ignore case"],
        ["GTM RegEx Table variable", "Full match by default; Ignore Case on by default"],
        ["REGEXP_CONTAINS", "Partial match; add (?i) to ignore capitals"]
      ],
      explain: "Same pattern, different tool, different result: the slide's table explains most 'my regex doesn't work' problems.",
      slide: 11, section: "c3t1-n3"
    },
    {
      id: "c3t1-q5", type: "mcq", difficulty: "medium",
      prompt: "Why does the report show nothing?",
      scenario: "An analyst filters GA4 page_location with 'matches regex' booking-confirmed. The value is https://www.rj.com/en/booking-confirmed/economy/receipt.aspx?pnr=K7Q2LM, all lowercase.",
      options: ["GA4 needs a full match, so the pattern must describe the whole value", "The hyphen must be escaped", "GA4 does not support regex", "page_location only holds the hostname"],
      answer: 0,
      explain: "GA4 uses full matching. .*booking-confirmed.* (or 'matches partial regex') would match.",
      wrongWhy: { "1": "A hyphen outside square brackets is a normal character.", "2": "GA4 offers 'matches regex' in report filters.", "3": "page_location is the full URL." },
      slide: 10, section: "c3t1-n3"
    },
    {
      id: "c3t1-q6", type: "multi", difficulty: "medium",
      prompt: "Which of these use the RE2 engine? (Select all that apply.)",
      options: ["GA4", "Data Studio", "BigQuery", "GTM server container", "GTM web container", "regex101.com by default"],
      answer: [0, 1, 2, 3],
      explain: "GA4, Data Studio, BigQuery and the GTM server container use RE2. The GTM web container uses the browser's JavaScript; regex101.com uses PCRE unless you choose Golang.",
      slide: 17, section: "c3t1-n5"
    },
    {
      id: "c3t1-q7", type: "mcq", difficulty: "medium",
      prompt: "In https://www.rj.com/en/booking-confirmed/economy/receipt.aspx?pnr=K7Q2LM, what is ?pnr=K7Q2LM?",
      options: ["The hostname", "The path", "The query string", "The protocol"],
      answer: 2,
      explain: "The query string is everything after the ?; it carries parameters such as pnr=K7Q2LM.",
      wrongWhy: { "0": "The hostname is www.rj.com.", "1": "The path is /en/booking-confirmed/economy/receipt.aspx.", "3": "The protocol is https://." },
      slide: 5, section: "c3t1-n1"
    },
    {
      id: "c3t1-q8", type: "tf", difficulty: "hard",
      prompt: "In a GTM RegEx Table variable with default settings, the pattern booking-confirmed fails on /en/Booking-Confirmed/economy/receipt.aspx because of the capital letters.",
      answer: false,
      explain: "Ignore Case is ticked by default, so capitals are not the problem. Full Matches Only is ticked, so the pattern must describe the whole path: use .*booking-confirmed.*",
      slide: 13, section: "c3t1-n3"
    },
    {
      id: "c3t1-q9", type: "mcq", difficulty: "hard",
      prompt: "What should she do?",
      scenario: "An RJ analyst wants all English pages except help pages. A chatbot gives ^/en/(?!help).*, it works on a regex website, but GA4 rejects it.",
      options: ["Use two conditions: matches ^/en/.* AND does not match ^/en/help/.*", "Add (?i) at the start", "Switch the filter to 'matches partial regex'", "Escape the brackets as \\(\\?!help\\)"],
      answer: 0,
      explain: "RE2 does not understand (?!. Two simple conditions do the same job.",
      wrongWhy: { "1": "(?i) ignores capitals; it does not make RE2 understand (?!.", "2": "Partial matching does not add support for (?!.", "3": "Escaping turns the symbols into literal text, so the pattern would look for the characters (?!help) instead of meaning 'except'." },
      slide: 19, section: "c3t1-n5"
    },
    {
      id: "c3t1-q10", type: "mcq", difficulty: "hard",
      prompt: "Why does a backtracking engine take so long to say 'no match' for (a+)+b on a long text of only a's?",
      options: ["It tries every way of splitting the a's into groups, and each extra a doubles the ways", "It downloads the text from Google first", "The letter b is a special character", "It must convert the text to lowercase"],
      answer: 0,
      explain: "Each extra a doubles the ways to split; RE2 checks all ways at once and stays instant.",
      wrongWhy: { "1": "Nothing is downloaded; the slowness comes from trying combinations.", "2": "b is a normal character.", "3": "Case conversion is not involved." },
      slide: 18, section: "c3t1-n5"
    },
    {
      id: "c3t1-q11", type: "fill", difficulty: "hard",
      prompt: "Problem-solving: write a GA4 'matches regex' pattern (full match) that keeps every page path containing booking-confirmed anywhere.",
      answer: [".*booking-confirmed.*", "^.*booking-confirmed.*$"],
      explain: "GA4 needs the pattern to describe the whole value, so .* covers what comes before and after.",
      slide: 10, section: "c3t1-n3"
    },
    {
      id: "c3t1-q12", type: "mcq", difficulty: "medium",
      prompt: "What is the best fix?",
      scenario: "A GTM trigger uses the partial pattern confirmed to count tickets sold. It also fires on /en/booking-unconfirmed/, a failed booking.",
      options: ["Be more specific, e.g. /booking-?confirmed/", "Add .* at both ends", "Use (?i)confirmed", "Remove the pattern and list every URL"],
      answer: 0,
      explain: "The pattern is greedy. Naming the folder with slashes stops it from matching inside booking-unconfirmed.",
      wrongWhy: { "1": "In partial matching .* changes nothing; it still matches unconfirmed.", "2": "(?i) only ignores capitals; unconfirmed still contains confirmed.", "3": "Listing URLs fails because every booking has its own PNR and spellings differ." },
      slide: 15, section: "c3t1-n4"
    }
  ]
},

/* ============================== c3t2 ============================== */
{
  id: "c3t2",
  title: "Regex Building Blocks",
  slides: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
  minutes: 30,
  overview: {
    about: "Every special character one at a time: backslash, pipe, question mark, parentheses for grouping and capturing, square brackets, braces, dot, plus, star, anchors and shortcut codes, then how capturing works in a GTM RegEx Table, how to read a long pattern, and how to describe a range of office IP addresses.",
    why: "These building blocks appear in every GA4 filter, GTM trigger and RegEx Table you will write. Capturing even turns information hidden in a URL, like the cabin class, into a column you can report on.",
    objectives: [
      "Use \\ to make special characters normal, and | inside parentheses for OR.",
      "Use ? for optional parts and parentheses to group and capture.",
      "Set up a GTM RegEx Table that returns $1 or $2 and send it to GA4.",
      "Use [ ], { }, ., +, *, ^, $ and shortcut codes such as \\d.",
      "Read a long pattern piece by piece and build an exact IP-range pattern."
    ],
    vocabulary: [
      { term: "Backslash \\", def: "Treat the next character as a normal character, e.g. \\. means a real dot.", slide: 22 },
      { term: "Pipe |", def: "OR: this option or that option.", slide: 23 },
      { term: "Capturing", def: "The brackets also SAVE the piece of text they matched, numbered 1, 2, 3 from left to right.", slide: 26 },
      { term: "$1, $2", def: "In GTM, $ plus a number means \"put the saved piece here\".", slide: 28 },
      { term: "Square brackets [ ]", def: "Match exactly ONE character, chosen from the list or range inside them.", slide: 33 },
      { term: "Braces { }", def: "Say how many times the item before them repeats: {4} exactly 4, {2,5} between 2 and 5, {3,} 3 or more.", slide: 34 },
      { term: "Anchors ^ and $", def: "^ means \"the value starts here\" and $ means \"the value ends here\".", slide: 36 },
      { term: "IP address", def: "The number that identifies an internet connection, like a postal address for data.", slide: 39 }
    ],
    hook: "GA4 knows a ticket was sold, but not which cabin. Two pairs of brackets in a GTM variable fix that."
  },
  notes: [
    {
      id: "c3t2-n1",
      heading: "Backslash and pipe: literal characters and OR",
      slides: [21, 22, 23],
      fromSlides: [
        { text: "Key idea:  In regex the dot (.) and question mark (?) are special, yet URLs are full of them. A backslash in front makes them ordinary characters again.", slide: 22 },
        { text: "Characters that need a backslash when you mean them literally:  . ? + * ^ $ | ( ) [ ] { } \\", slide: 22 },
        { text: "Key idea:  The pipe means OR. When it is part of a longer pattern, put the options inside parentheses so the OR applies only to them.", slide: 23 },
        { text: "Remember:  Never end a pattern with a pipe, as in economy|business|. The empty last option matches every value.", slide: 23 }
      ],
      simple: "A backslash turns a special character back into a normal one: \\. is a real dot. The pipe | means OR; wrap the options in parentheses so the OR does not split your whole pattern.",
      deep: "The backslash is like quotation marks around a word: it says 'take this literally'. receipt\\.aspx matches receipt.aspx but not receiptXaspx, while the unescaped receipt.aspx also matches receiptXaspx, because a plain dot means any character. receipt\\.aspx\\?pnr= matches receipt.aspx?pnr= because \\? is a real question mark. The pipe works like the word 'or', but it splits everything on its left and right unless you put parentheses around the options. /(economy|business)/receipt matches /economy/receipt and /business/receipt but not /car/receipt. Without brackets, /economy|business/receipt means '/economy' OR 'business/receipt', so it also matches just /economy. Never end with a pipe, as in economy|business|, because the empty last option matches every value.",
      exam: [
        "Escape with \\ when you mean these literally: . ? + * ^ $ | ( ) [ ] { } \\",
        "receipt\\.aspx matches receipt.aspx only; receipt.aspx also matches receiptXaspx.",
        "Put OR options in parentheses: /(economy|business)/receipt.",
        "/economy|business/receipt = '/economy' OR 'business/receipt'.",
        "A trailing pipe (economy|business|) matches every value."
      ],
      definitions: [
        { term: "Backslash \\", def: "Treat the next character as a normal character", slide: 9 },
        { term: "Pipe |", def: "OR: this option or that option", slide: 9 }
      ],
      keyFacts: [
        "URLs are full of dots and question marks, so escaping is needed constantly.",
        "/(economy|business)/receipt does not match /car/receipt."
      ],
      examples: [
        "receipt\\.aspx\\?pnr= matches receipt.aspx?pnr= with a real dot and a real question mark."
      ],
      misconceptions: [
        "Myth: a dot in a pattern means a dot. Unescaped, it means any single character.",
        "Myth: the pipe only applies to the words next to it. Without parentheses it splits the whole pattern."
      ]
    },
    {
      id: "c3t2-n2",
      heading: "Question mark and parentheses: optional parts and grouping",
      slides: [24, 25],
      fromSlides: [
        { text: "Key idea:  A question mark makes the character (or group) just before it optional: it may appear once or not at all.", slide: 24 },
        { text: "Remember:  Use it for spelling variations, singular and plural forms, and http versus https.", slide: 24 },
        { text: "Key idea:  Parentheses glue several characters together, so that one instruction (such as ? or |) applies to the whole group, just like brackets in maths.", slide: 25 },
        { text: "Remember:  Brackets decide what an OR, a ? or a repeat applies to.", slide: 25 }
      ],
      simple: "? makes the item just before it optional (zero or one time). Parentheses glue characters into a group, so ?, | or a repeat applies to the whole group, just like brackets in maths.",
      deep: "booking-?confirmed matches booking-confirmed and the old app's bookingconfirmed, but not booking--confirmed, because ? allows only zero or one hyphen. https?:// matches http:// and https://, and bookings? matches booking and bookings. On its own, ? only affects one character: /receipt-print? matches /receipt-print and /receipt-prin, because only the t is optional. With brackets, /receipt(-print)? makes the whole group -print optional: it matches /receipt and /receipt-print but not /receipt-pr, because the group must be fully there or fully missing. The same idea makes /(economy|business)/ limit the OR to the two words inside the brackets.",
      exam: [
        "? = zero or one of the item before it.",
        "booking-?confirmed does not match booking--confirmed.",
        "https?:// matches http:// and https://; bookings? matches booking and bookings.",
        "/receipt-print? makes only the t optional; /receipt(-print)? makes the whole group optional.",
        "Brackets decide what an OR, a ? or a repeat applies to."
      ],
      definitions: [
        { term: "Question mark ?", def: "The item before me is optional", slide: 9 },
        { term: "Parentheses ( )", def: "Group items together", slide: 9 }
      ],
      keyFacts: [
        "/receipt(-print)? matches /receipt and /receipt-print, not /receipt-pr.",
        "Use ? for spelling variations, singular/plural and http/https."
      ],
      examples: [
        "https?:// covers both secure and non-secure addresses in one pattern."
      ],
      misconceptions: [
        "Myth: -print? makes the word -print optional. Without brackets only the last letter t is optional."
      ]
    },
    {
      id: "c3t2-n3",
      heading: "Capturing: saving pieces of a URL in a GTM RegEx Table",
      slides: [26, 27, 28, 29, 30, 31, 32],
      fromSlides: [
        { text: "Key idea:  Capturing means the brackets also SAVE the piece of text they matched. The saved pieces are numbered 1, 2, 3 from left to right, so you can reuse them later, for example as a Language column in a report.", slide: 26 },
        { text: "GA4's purchase event records THAT a booking happened, but not WHICH cabin.", slide: 27 },
        { text: "Remember:  Capturing turns information hidden inside a URL into a column you can report on. The next slide shows the GTM setup.", slide: 27 },
        { text: "Must be ticked. If not, GTM returns the text \"$2\" itself instead of the saved piece.", slide: 29 },
        { text: "Then in GA4: Admin › Custom definitions › create custom dimensions cabin and site_language (event scope). Simplified drawing of the GTM screen.", slide: 31 }
      ],
      simple: "Brackets can also save the text they matched. In ^/(en|fr|ar)/[^/]+/(economy|business)/receipt\\.aspx$, bracket 1 saves the language and bracket 2 saves the cabin. A GTM RegEx Table returns $1 or $2, and the purchase tag sends them to GA4.",
      deep: "Capturing is like highlighting two words on a page and copying them out. RJ's marketing team wants purchases by cabin and language, but GA4's purchase event does not record the cabin; it only appears in the confirmation address, e.g. /fr/reservation-confirmee/business/receipt.aspx. The pattern ^/(en|fr|ar)/[^/]+/(economy|business)/receipt\\.aspx$ saves fr as 1 and business as 2, and [^/]+ means 'one folder name, whatever it is', so it works for every language's word for 'confirmed'. The pieces are saved only for a moment, in the tool's memory, while it checks this one value. In GTM you create a RegEx Table variable 'Cabin from URL' with input {{Page Path}}, the pattern, Output $2, and Full Matches Only plus Enable Capture Groups and Replace Functionality ticked. A second variable 'Language from URL' uses the same pattern with Output $1. If the Capture Groups box is not ticked, GTM returns the text $2 or $1 itself. $2 is not money: it means 'put saved piece 2 here'. The GA4 purchase tag then sends event parameters cabin = {{Cabin from URL}} and site_language = {{Language from URL}}, triggered only on receipt pages, and in GA4 you create custom dimensions cabin and site_language (event scope) to report on them.",
      exam: [
        "Capturing brackets save matched text, numbered 1, 2, 3 from left to right.",
        "In GTM, $1 / $2 = 'put saved piece 1 / 2 here' (not money).",
        "RegEx Table settings: Full Matches Only + Enable Capture Groups and Replace Functionality ticked.",
        "Capture Groups box not ticked → GTM returns the text \"$2\" itself.",
        "GA4: create custom dimensions cabin and site_language (event scope) under Admin › Custom definitions."
      ],
      definitions: [
        { term: "[^/]+", def: "[^/]+ means \"one folder name, whatever it is\", so the pattern works for every language.", slide: 26 },
        { term: "$2", def: "$2 = \"put saved piece 2 here\". On the page above, the variable returns: business", slide: 29 }
      ],
      keyFacts: [
        "/en/booking-confirmed/economy/receipt.aspx → $1 = en, $2 = economy.",
        "/ar/tam-alhajz/business/receipt.aspx → $1 = ar, $2 = business.",
        "purchase is GA4's standard name for a completed sale."
      ],
      examples: [
        "On /fr/reservation-confirmee/business/receipt.aspx, 'Cabin from URL' returns business and 'Language from URL' returns fr."
      ],
      misconceptions: [
        "Myth: $2 is a price. In GTM it means the text saved by bracket 2.",
        "Myth: the saved pieces are stored permanently. They are saved only for a moment while the tool checks one value."
      ]
    },
    {
      id: "c3t2-n4",
      heading: "Lists, counts, wildcards, anchors and shortcuts",
      slides: [33, 34, 35, 36, 37],
      fromSlides: [
        { text: "Key idea:  Square brackets match exactly ONE character, chosen from the list or range inside them.", slide: 33 },
        { text: "Key idea:  Braces say how many times the item before them repeats: {4} exactly 4, {2,5} between 2 and 5, {3,} 3 or more.", slide: 34 },
        { text: ".* is safe at the start or end of a pattern. In the middle it can swallow too much: /en/.*/receipt also matches /en/a/b/c/receipt.", slide: 35 },
        { text: "In GTM (partial matching) anchors are essential. In GA4 (full matching) the whole value must fit anyway, so ^St matches only \"St\"; write ^St.* for \"starts with St\".", slide: 36 }
      ],
      simple: "[ ] picks one character from a list, { } says how many times, . is any one character, + is one or more, * is zero or more, ^ marks the start and $ the end. Shortcuts like \\d save typing.",
      deep: "Square brackets are like a multiple-choice box for one character: [0-9] is one digit, [a-z] one lowercase letter (so Q fails), [A-Z0-9] one capital or digit, and [^/] any one character except /. Most special characters lose their meaning inside brackets, so [.?] matches a real dot or question mark. RJ[0-9][0-9][0-9] matches the flight number RJ181. Braces count: [A-Z0-9]{6} full-matches the PNR K7Q2LM but not K7Q2L (5 characters) or k7q2lm (small letters), and 20[0-9]{2} matches 2026. The dot is any one character (r.ceipt matches rXceipt), + is one or more ([0-9]+ matches 2026 but not an empty value), * is zero or more (10* matches 1 or 1000), and .* is anything including nothing. In the middle of a pattern .* can swallow too much: /en/.*/receipt also matches /en/a/b/c/receipt. Anchors stop matches in the wrong place: in GTM ^/en/ matches /en/booking-confirmed/ but not /help/en/faq, \\.aspx$ matches /economy/receipt.aspx but not /economy/receipt.aspx-faq, and ^/$ is the home page only. Shortcuts: \\d any digit ([0-9]), \\w letter, digit or underscore, \\s a space or tab, \\b edge of a word, and (?i) ignore capitals, which works in BigQuery, Data Studio and Search Console; in GA4 convert values to lowercase in GTM instead.",
      exam: [
        "[ ] = exactly one character; ^ inside brackets = NOT.",
        "{6} exactly 6; {2,5} between 2 and 5; {3,} 3 or more.",
        "+ one or more; * zero or more; . any one character; .* anything.",
        "GTM (partial): anchors are essential. GA4 (full): ^St matches only 'St'; write ^St.*",
        "\\d = [0-9]; \\w = [A-Za-z0-9_]; \\b = edge of a word."
      ],
      definitions: [
        { term: "\\d", def: "any digit", slide: 37 },
        { term: "\\w", def: "letter, digit or underscore", slide: 37 },
        { term: "\\s", def: "a space or tab", slide: 37 },
        { term: "\\b", def: "edge of a word", slide: 37 }
      ],
      keyFacts: [
        "[A-Z0-9]{6} describes an airline booking code (PNR) such as K7Q2LM.",
        "RJ\\d{3,4} matches RJ181 and RJ1501.",
        "\\bseo\\b does not match museo.",
        "In GA4, .* at both ends is how you say 'contains'."
      ],
      examples: [
        "^/$ in a GTM trigger fires on the home page only."
      ],
      misconceptions: [
        "Myth: ^ always means 'start'. Inside square brackets it means NOT, as in [^/].",
        "Myth: .* is always safe. In the middle of a pattern it can swallow several folders."
      ]
    },
    {
      id: "c3t2-n5",
      heading: "Reading a long pattern and excluding office IP addresses",
      slides: [38, 39, 40],
      fromSlides: [
        { text: "Key idea:  A long pattern is just the building blocks in a row. Read it left to right, one piece at a time.", slide: 38 },
        { text: "The common form (IPv4) is four numbers from 0 to 255 separated by dots: 198.51.100.7", slide: 39 },
        { text: "Key idea:  Visits by your own staff distort your data. One regex can describe a whole range of office IP addresses so GA4 can exclude them.", slide: 40 }
      ],
      simple: "A long pattern is just building blocks in a row; read it left to right. To exclude office visits, describe the office's IP range exactly: 198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5]) covers .1 to .25.",
      deep: "The full RJ pattern .*/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/(economy|business)/receipt\\.aspx(\\?.*)? reads like a sentence: anything first (https:// and the domain), a language folder (group 1), the word for 'confirmed' in each language with an optional hyphen (group 2), the cabin class (group 3), the file name with a real dot, and optionally a ? followed by anything, such as ?pnr=K7Q2LM. An IP address identifies an internet connection like a postal address; IPv4 is four numbers from 0 to 255 separated by dots, and the dots must be escaped. RJ's staff open rj.com all day, so their visits distort the numbers; a regex describing the office addresses lets GA4 label them as internal and remove them. GA4 sees the address only to check the internal-traffic rule and does not show addresses in reports. IPv6 addresses (e.g. 2001:db8::1) look different, so an IPv4 pattern will not match them. For an office using 198.51.100.1 to 198.51.100.25: attempt 1, 198\\.51\\.100\\.d*, is wrong because d without a backslash is the letter d; attempt 2, 198\\.51\\.100\\.\\d*, works but is too wide (.0 to .255); attempt 3, 198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5]), is exact: 1 to 9, OR 10 to 19, OR 20 to 25.",
      exam: [
        "Read long patterns piece by piece, left to right.",
        "(\\?.*)? = optionally a ? followed by anything, e.g. ?pnr=K7Q2LM.",
        "Escape the dots in IP addresses: 198\\.51\\.100\\.7",
        "198\\.51\\.100\\.d* is wrong: d without a backslash is the letter d.",
        "Exact range .1 to .25: ([1-9]|1[0-9]|2[0-5])."
      ],
      definitions: [
        { term: "IP address", def: "An IP address is the number that identifies an internet connection, like a postal address for data.", slide: 39 }
      ],
      keyFacts: [
        "198.51.100.x is a range reserved for examples; ask your IT team for your office's real addresses.",
        "GA4 does not show visitor IP addresses in reports.",
        "An IPv4 pattern will not match IPv6 addresses such as 2001:db8::1."
      ],
      examples: [
        "198\\.51\\.100\\.\\d* also matches 198.51.100.200, which is outside the office range."
      ],
      misconceptions: [
        "Myth: \\d* is precise enough for an IP range. It accepts any number of digits, so .0 to .255 also match."
      ]
    }
  ],
  steps: [
    {
      title: "Create a RegEx Table variable",
      what: "In GTM go to Variables › New, name it Cabin from URL and choose the type RegEx Table.",
      why: "A RegEx Table reads a value and returns an output for the row that matches.",
      practical: "Name variables after what they return, so the tag screen is easy to read.",
      visual: "GTM › Variables › New → RegEx Table",
      check: {
        q: "Which variable type extracts the cabin from the URL?",
        options: ["Constant", "RegEx Table", "Data Layer Variable", "Custom Event"],
        answer: 1,
        explain: "The slides use a RegEx Table variable called Cabin from URL."
      }
    },
    {
      title: "Set the input and the pattern",
      what: "Set Input Variable to {{Page Path}} and the pattern to ^/(en|fr|ar)/[^/]+/(economy|business)/receipt\\.aspx$",
      why: "Page Path is the address without the domain; bracket 1 saves the language and bracket 2 saves the cabin.",
      practical: "[^/]+ accepts whatever folder name each language uses for 'confirmed'.",
      visual: "{{Page Path}} → ^/(en|fr|ar)/[^/]+/(economy|business)/receipt\\.aspx$",
      check: {
        q: "What does bracket 2 save on /fr/reservation-confirmee/business/receipt.aspx?",
        options: ["fr", "reservation-confirmee", "business", "receipt.aspx"],
        answer: 2,
        explain: "Bracket 2 is (economy|business), so it saves business."
      }
    },
    {
      title: "Set the output to $2",
      what: "Enter $2 in the Output column.",
      why: "$2 means 'put saved piece 2 here', so the variable returns the cabin.",
      practical: "$ plus a number is a saved piece, not money.",
      visual: "Output: $2 → business",
      check: {
        q: "What does $2 mean in a GTM RegEx Table output?",
        options: ["Two dollars", "Put the piece saved by bracket 2 here", "Repeat the pattern twice", "The second row of the table"],
        answer: 1,
        explain: "$2 = the text saved by bracket 2."
      }
    },
    {
      title: "Tick the advanced settings",
      what: "Under Advanced Settings tick Full Matches Only and Enable Capture Groups and Replace Functionality.",
      why: "Without the Capture Groups box, GTM returns the text $2 itself instead of the saved piece.",
      practical: "Ignore Case is also ticked by default.",
      visual: "☑ Ignore Case ☑ Full Matches Only ☑ Enable Capture Groups and Replace Functionality",
      check: {
        q: "The variable returns the text \"$2\". What is wrong?",
        options: ["The pattern has no brackets", "Enable Capture Groups and Replace Functionality is not ticked", "Ignore Case is ticked", "The input is Page URL"],
        answer: 1,
        explain: "The Capture Groups box must be ticked, or GTM returns the text \"$2\" itself."
      }
    },
    {
      title: "Create the language variable",
      what: "Create a second RegEx Table, Language from URL, with exactly the same pattern and Output $1.",
      why: "Bracket 1 (en|fr|ar) saves the language.",
      practical: "Tick the Capture Groups box here too.",
      visual: "Language from URL → Output $1 → fr",
      check: {
        q: "What does Language from URL return on /fr/reservation-confirmee/business/receipt.aspx?",
        options: ["business", "fr", "$1", "receipt"],
        answer: 1,
        explain: "$1 is the piece saved by bracket 1: fr."
      }
    },
    {
      title: "Send both values with the purchase tag",
      what: "In the GA4 Event tag with Event Name purchase, add event parameters cabin = {{Cabin from URL}} and site_language = {{Language from URL}}, triggered on the booking receipt page.",
      why: "The parameters carry the cabin and language to GA4 with each purchase.",
      practical: "The trigger fires only on receipt pages: Page Path matches RegEx with the same pattern.",
      visual: "GA4 - purchase → cabin, site_language → Booking receipt page trigger",
      check: {
        q: "Which event name does the tag use?",
        options: ["page_view", "purchase", "booking_confirmed", "cabin"],
        answer: 1,
        explain: "purchase is GA4's standard name for a completed sale."
      }
    },
    {
      title: "Register the custom dimensions in GA4",
      what: "In GA4 go to Admin › Custom definitions and create custom dimensions cabin and site_language (event scope).",
      why: "GA4 can then compare purchases by cabin and language.",
      practical: "Use exactly the same parameter names as in the GTM tag.",
      visual: "Admin › Custom definitions → cabin, site_language (event scope)",
      check: {
        q: "Which scope do cabin and site_language get?",
        options: ["User scope", "Event scope", "Item scope", "Session scope"],
        answer: 1,
        explain: "The slide says to create them as event-scoped custom dimensions."
      }
    }
  ],
  visual: {
    type: "regex",
    title: "GTM partial-match tester",
    caption: "GTM 'matches RegEx' is a partial match: the pattern may appear anywhere. Use ^ and $ to pin it to the start or end.",
    slides: [22, 24, 34, 36, 40],
    data: {
      mode: "partial",
      samples: [
        "/en/booking-confirmed/economy/receipt.aspx?pnr=K7Q2LM",
        "/en/bookingconfirmed/business/receipt.aspx",
        "/fr/reservation-confirmee/business/receipt.aspx",
        "/ar/tam-alhajz/economy/receipt.aspx",
        "/en/car/receipt.aspx",
        "/help/en/faq",
        "/economy/receipt.aspx-faq",
        "/",
        "198.51.100.7",
        "198.51.100.200"
      ],
      challenges: [
        { task: "Select every value that starts with /en/.", answer: "^/en/", hint: "In GTM, ^ pins the pattern to the start; /help/en/faq must not match." },
        { task: "Select every value that ends with .aspx (a real dot).", answer: "\\.aspx$", hint: "Escape the dot with \\ and anchor the end with $." },
        { task: "Select the confirmation pages spelled booking-confirmed or bookingconfirmed.", answer: "booking-?confirmed", hint: "? makes the hyphen optional." },
        { task: "Select the home page only.", answer: "^/$", hint: "Start, a slash, end." },
        { task: "Select values with a booking code: a real ?pnr= followed by 6 capitals or digits.", answer: "\\?pnr=[A-Z0-9]{6}", hint: "Escape the ? and use [A-Z0-9]{6}." },
        { task: "Select only office addresses 198.51.100.1 to 198.51.100.25.", answer: "^198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5])$", hint: "Partial matching would let .200 slip through as .20; add ^ and $." }
      ]
    }
  },
  examples: [
    {
      concept: "Reading a real pattern",
      example: ".*/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/(economy|business)/receipt\\.aspx(\\?.*)?",
      walkthrough: [
        ".* covers anything first: https:// and the domain.",
        "/(en|fr|ar)/ is the language folder (group 1).",
        "(booking-?confirmed|reservation-confirmee|tam-alhajz) is the word for 'confirmed' in each language, hyphen optional (group 2).",
        "/(economy|business)/ is the cabin class (group 3), then receipt\\.aspx with a real dot.",
        "(\\?.*)? optionally allows a ? followed by anything, e.g. ?pnr=K7Q2LM."
      ],
      application: "This one rule matches all four RJ confirmation pages from the introduction, so GA4 can count online ticket sales.",
      check: {
        q: "Which part makes the ?pnr=K7Q2LM ending optional?",
        options: ["(\\?.*)?", "receipt\\.aspx", ".*", "(en|fr|ar)"],
        answer: 0,
        explain: "(\\?.*)? is a group (a real ? then anything) made optional by the final ?."
      }
    },
    {
      concept: "Excluding office IP addresses",
      example: "RJ's office uses 198.51.100.1 to 198.51.100.25 and its staff visits must be excluded from GA4.",
      walkthrough: [
        "Escape the dots: 198\\.51\\.100\\. so each dot is a real dot.",
        "Attempt 1, 198\\.51\\.100\\.d*, is wrong: d without a backslash is the letter d.",
        "Attempt 2, 198\\.51\\.100\\.\\d*, works but is too wide: it also matches .0 to .255.",
        "Attempt 3, 198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5]), is exact: 1 to 9, OR 10 to 19, OR 20 to 25."
      ],
      application: "Use the exact pattern in GA4's internal-traffic rule, with your IT team's real office addresses.",
      check: {
        q: "Does attempt 3 (as a full match) accept 198.51.100.26?",
        options: ["Yes", "No: 26 is outside 1 to 9, 10 to 19 and 20 to 25", "Only in GTM", "Only for IPv6"],
        answer: 1,
        explain: "2[0-5] stops at 25, so 26 is not covered."
      }
    },
    {
      concept: "Capturing the cabin and language",
      example: "A visitor opens /fr/reservation-confirmee/business/receipt.aspx and GTM tests ^/(en|fr|ar)/[^/]+/(economy|business)/receipt\\.aspx$",
      walkthrough: [
        "Bracket 1 (en|fr|ar) saves fr.",
        "[^/]+ matches the folder reservation-confirmee, whatever its name.",
        "Bracket 2 (economy|business) saves business.",
        "Output $2 makes Cabin from URL return business; Output $1 makes Language from URL return fr."
      ],
      application: "The purchase tag sends cabin = business and site_language = fr, so GA4 can show purchases by cabin and language.",
      check: {
        q: "What does Cabin from URL return on /ar/tam-alhajz/business/receipt.aspx?",
        options: ["ar", "tam-alhajz", "business", "$2"],
        answer: 2,
        explain: "Bracket 2 saves the cabin: business."
      }
    }
  ],
  flashcards: [
    { id: "c3t2-f1", front: "receipt\\.aspx versus receipt.aspx: what is the difference?", back: "receipt\\.aspx matches only receipt.aspx; plain receipt.aspx also matches receiptXaspx because . means any character.", slide: 22 },
    { id: "c3t2-f2", front: "Why put OR options in parentheses?", back: "So the OR applies only to them: /economy|business/receipt means '/economy' OR 'business/receipt'.", slide: 23 },
    { id: "c3t2-f3", front: "What does ? do?", back: "Makes the character (or group) just before it optional: once or not at all.", slide: 24 },
    { id: "c3t2-f4", front: "What is capturing?", back: "Brackets SAVE the text they matched, numbered 1, 2, 3 from left to right, for reuse (e.g. $1, $2 in GTM).", slide: 26 },
    { id: "c3t2-f5", front: "A RegEx Table returns the text \"$2\". Why?", back: "Enable Capture Groups and Replace Functionality is not ticked.", slide: 29 },
    { id: "c3t2-f6", front: "What does [^/]+ mean?", back: "One folder name, whatever it is: one or more characters that are not /.", slide: 26 },
    { id: "c3t2-f7", front: "What does [A-Z0-9]{6} describe?", back: "6 capitals or digits: an airline booking code (PNR) such as K7Q2LM.", slide: 34 },
    { id: "c3t2-f8", front: "+ versus *?", back: "+ = one or more of the item; * = zero or more of the item.", slide: 35 },
    { id: "c3t2-f9", front: "What do ^ and $ mean?", back: "^ = the value starts here; $ = the value ends here. Essential in GTM's partial matching.", slide: 36 },
    { id: "c3t2-f10", front: "Exact pattern for 198.51.100.1 to .25?", back: "198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5])", slide: 40 }
  ],
  quiz: [
    {
      id: "c3t2-q1", type: "mcq", difficulty: "easy",
      prompt: "What does the backslash in receipt\\.aspx do?",
      options: ["Makes the dot a real dot", "Makes the dot optional", "Means any character", "Ends the pattern"],
      answer: 0,
      explain: "A backslash treats the next character as a normal character, so \\. is a real dot.",
      wrongWhy: { "1": "? makes things optional, not \\.", "2": "That is what an unescaped dot means.", "3": "$ marks the end of the value." },
      slide: 22, section: "c3t2-n1"
    },
    {
      id: "c3t2-q2", type: "tf", difficulty: "easy",
      prompt: "[0-9] matches exactly one digit.",
      answer: true,
      explain: "Square brackets match exactly ONE character from the list or range.",
      slide: 33, section: "c3t2-n4"
    },
    {
      id: "c3t2-q3", type: "fill", difficulty: "easy",
      prompt: "In GTM, the output ____ means 'put the piece saved by bracket 1 here'.",
      answer: ["$1"],
      explain: "$ plus a number means 'put the saved piece here'; $1 is bracket 1.",
      slide: 28, section: "c3t2-n3"
    },
    {
      id: "c3t2-q4", type: "match", difficulty: "medium",
      prompt: "Match each symbol to its instruction.",
      options: [
        ["?", "The item before me is optional"],
        ["{6}", "Repeat exactly 6 times"],
        ["[^/]", "Any one character except /"],
        ["+", "Repeat one or more times"],
        ["^ (outside brackets)", "The value starts here"]
      ],
      explain: "Each building block gives one instruction.",
      slide: 9, section: "c3t2-n4"
    },
    {
      id: "c3t2-q5", type: "mcq", difficulty: "medium",
      prompt: "Why does /economy|business/receipt match the value /economy?",
      options: ["Without parentheses the OR splits the pattern into '/economy' OR 'business/receipt'", "The pipe is a normal character", "GTM ignores slashes", "Because of greedy .*"],
      answer: 0,
      explain: "Put the options in brackets: /(economy|business)/receipt.",
      wrongWhy: { "1": "The pipe is special: it means OR.", "2": "Slashes are normal characters and are matched.", "3": "There is no .* in this pattern." },
      slide: 23, section: "c3t2-n1"
    },
    {
      id: "c3t2-q6", type: "multi", difficulty: "medium",
      prompt: "Which values does [A-Z0-9]{6} fully match? (Select all that apply.)",
      options: ["K7Q2LM", "K7Q2L", "k7q2lm", "R4T8WX"],
      answer: [0, 3],
      explain: "Both are exactly 6 capitals or digits. K7Q2L has only 5 characters; k7q2lm uses small letters, which are not in the list.",
      slide: 34, section: "c3t2-n4"
    },
    {
      id: "c3t2-q7", type: "mcq", difficulty: "medium",
      prompt: "Which value does NOT match /receipt(-print)? as a full match?",
      options: ["/receipt", "/receipt-print", "/receipt-pr", "All of them match"],
      answer: 2,
      explain: "The group -print must be fully there or fully missing; -pr is only part of it.",
      wrongWhy: { "0": "The group is missing, which ? allows.", "1": "The group is fully present.", "3": "/receipt-pr does not match." },
      slide: 25, section: "c3t2-n2"
    },
    {
      id: "c3t2-q8", type: "mcq", difficulty: "hard",
      prompt: "What is the most likely cause?",
      scenario: "An analyst builds the Cabin from URL RegEx Table with Output $2. In Preview, on a Business receipt page, the variable's value is the text $2.",
      options: ["Enable Capture Groups and Replace Functionality is not ticked", "Ignore Case is ticked", "The input is {{Page Path}}", "$2 must be written as 2$"],
      answer: 0,
      explain: "The Capture Groups box must be ticked; otherwise GTM returns the text \"$2\" itself.",
      wrongWhy: { "1": "Ignore Case is ticked by default and does not stop capturing.", "2": "Page Path is the correct input in the slides.", "3": "The slides write the output as $2." },
      slide: 29, section: "c3t2-n3"
    },
    {
      id: "c3t2-q9", type: "mcq", difficulty: "hard",
      prompt: "Which pattern describes exactly the office range?",
      scenario: "RJ's office uses IP addresses 198.51.100.1 to 198.51.100.25. You must exclude only these from GA4.",
      options: ["198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5])", "198\\.51\\.100\\.d*", "198\\.51\\.100\\.\\d*", "198.51.100.25"],
      answer: 0,
      explain: "1 to 9, OR 10 to 19, OR 20 to 25: exactly the office range.",
      wrongWhy: { "1": "d without a backslash is the letter d.", "2": "Too wide: also matches .0 to .255.", "3": "Unescaped dots mean any character, and it describes only one address." },
      slide: 40, section: "c3t2-n5"
    },
    {
      id: "c3t2-q10", type: "tf", difficulty: "hard",
      prompt: "In GA4 (full matching), the pattern ^St matches the value Stockholm.",
      answer: false,
      explain: "In full matching the whole value must fit, so ^St matches only 'St'. Write ^St.* for 'starts with St'.",
      slide: 36, section: "c3t2-n4"
    },
    {
      id: "c3t2-q11", type: "fill", difficulty: "hard",
      prompt: "Problem-solving: write a pattern for an RJ flight number: RJ followed by 3 or 4 digits (e.g. RJ181, RJ1501).",
      answer: ["RJ\\d{3,4}", "RJ[0-9]{3,4}", "^RJ\\d{3,4}$", "^RJ[0-9]{3,4}$"],
      explain: "\\d is any digit and {3,4} repeats it 3 or 4 times.",
      slide: 37, section: "c3t2-n4"
    },
    {
      id: "c3t2-q12", type: "mcq", difficulty: "medium",
      prompt: "What does the Language from URL variable (Output $1) return?",
      scenario: "A visitor opens /ar/tam-alhajz/business/receipt.aspx. The pattern is ^/(en|fr|ar)/[^/]+/(economy|business)/receipt\\.aspx$.",
      options: ["ar", "business", "tam-alhajz", "$1"],
      answer: 0,
      explain: "Bracket 1 is (en|fr|ar), which saves ar.",
      wrongWhy: { "1": "business is saved by bracket 2 ($2).", "2": "[^/]+ is not in brackets, so it is not saved.", "3": "GTM returns the text $1 only when the Capture Groups box is not ticked." },
      slide: 30, section: "c3t2-n3"
    }
  ]
}

]});
