/* FILE: data/ch3b.js — FocusNest lesson content for Chapter 3 (part B, slides 41–76), written from data/slides-ch3.js (deck ch3).
   Slide-verbatim text lives in `fromSlides`/`definitions`; all other prose is FocusNest's added explanation. */
(window.FN_SEED = window.FN_SEED || []).push({ chapter: "ch3", order: 2, title: "Regular Expressions for GA4 and GTM", topics: [

/* ===================================================================== */
{
  id: "c3t3",
  title: "Regex in GA4",
  slides: [41, 42, 43, 44, 45, 46, 47, 48],
  minutes: 25,
  overview: {
    about: "Where GA4 accepts regex patterns: report filters and Explore segments (safe to try), creating a key event from confirmation pages, excluding internal traffic by IP address, and audiences and custom channel groups built on source and medium. Also the new AI Assistant channel from May 2026.",
    why: "Some GA4 regex settings only change what you see, but others change what GA4 stores, and past data usually cannot be fixed. Knowing which is which, and that GA4 needs a full match, saves you from counting zero bookings or deleting real visits.",
    objectives: [
      "Tell apart GA4 settings that only change the view from settings that change stored data.",
      "Test a pattern safely with a report filter or an Explore segment.",
      "Create a booking_complete event from confirmation pages and explain why the old partial pattern counts zero.",
      "Define internal traffic with an IP regex and move the data filter from Testing to Active safely.",
      "Write regex conditions for audiences, custom channel groups and an AI Assistant audit."
    ],
    vocabulary: [
      { term: "matches regex", def: "GA4's regex match type; it is a full match, so the pattern must describe the whole value.", slide: 47 },
      { term: "Page path", def: "The address without the domain and without the ?pnr= part, so its pattern is shorter than one for page_location.", slide: 43 },
      { term: "page_location", def: "The full URL of the page, used in GA4 event conditions.", slide: 44 },
      { term: "Key event", def: "An event you mark as important; GA4 has no URL-based goals, so you first create an event from the confirmation page views.", slide: 44 },
      { term: "Data filter", def: "A GA4 setting that starts in Testing state (labels visits but keeps them) and, when Active, deletes those visits permanently.", slide: 45 },
      { term: "Source / Medium", def: "Source = where the visit came from (google, facebook); Medium = the type of traffic (organic, cpc, referral, email).", slide: 46 },
      { term: "Custom channel group", def: "Your own grouping of traffic sources for reporting; it relabels old and new data.", slide: 47 },
      { term: "AI Assistant channel", def: "Since 13 May 2026, GA4 groups visits from AI chatbots such as ChatGPT, Gemini and Claude into this channel.", slide: 48 }
    ],
    hook: "You copied a goal pattern from the old Universal Analytics setup and GA4 now shows zero bookings. Nothing is broken except two missing dots and stars. Let's find them."
  },
  notes: [
    {
      id: "c3t3-n1",
      heading: "Two kinds of regex settings in GA4",
      slides: [41, 42],
      fromSlides: [
        { text: "Some GA4 settings only change what you SEE in a report. Others change what GA4 STORES. Try a pattern in the first kind before using it in the second.", slide: 42 },
        { text: "Mistake? Remove the filter; nothing is lost.", slide: 42 },
        { text: "Mistake? Past data usually cannot be fixed.", slide: 42 },
        { text: "Custom channel groups sit in between: they relabel old and new data, so mistakes can be undone but affect everyone's reports.", slide: 42 }
      ],
      simple: "GA4 has two kinds of places where you can type a regex. Report filters, comparisons, Explore segments and funnel steps only change what you see, so a mistake costs nothing. Events, key events, internal traffic rules, data filters, unwanted referrals and audiences change what GA4 stores, so test there last.",
      deep: "Think of the first group as a pair of glasses: report filters and comparisons, Explore segments and funnel steps only change how you look at data that is already stored. If the pattern is wrong you remove the filter and nothing is lost. The second group changes the data itself: creating or modifying events, key events, internal traffic rules and data filters, unwanted referrals, and audiences (which collect users only from today on). A mistake there usually cannot be fixed for past data. Custom channel groups sit in between: they relabel both old and new data, so a mistake can be undone, but while it is live it affects everyone's reports. The working habit is: try the pattern in a view-only place first, check the rows, then copy the same pattern into a setting that stores data.",
      exam: [
        "View-only (safe): report filters and comparisons, Explore segments and funnel steps.",
        "Stored data (test first): create/modify events, key events, internal traffic rules, data filters, unwanted referrals, audiences.",
        "Channel groups are in between: relabel old and new data, can be undone, affect everyone's reports.",
        "Rule: try a pattern in the view-only kind before using it in the stored kind."
      ],
      definitions: [
        { term: "Changes only the view", def: "Report filters and comparisons; Explore segments and funnel steps. Mistake? Remove the filter; nothing is lost.", slide: 42 },
        { term: "Changes stored data", def: "Create or modify events; key events; internal traffic rules and data filters; unwanted referrals; audiences (from today on).", slide: 42 }
      ],
      keyFacts: [
        "Audiences collect users only from the day you create them.",
        "Custom channel groups relabel old and new data."
      ],
      examples: [
        "Before creating a booking_complete event, an analyst first adds the same pattern as a report filter on Pages and screens to see which rows it catches."
      ],
      misconceptions: [
        "A wrong pattern in a data filter or event is not undone by deleting the setting later; past data usually cannot be fixed.",
        "Channel groups are not view-only: they relabel data for everyone, even though the change can be undone."
      ]
    },
    {
      id: "c3t3-n2",
      heading: "Trying a pattern safely: report filters and Explore",
      slides: [43],
      fromSlides: [
        { text: "Report filters and Explore segments let you test a pattern on real data without changing anything.", slide: 43 },
        { text: "Add filter › Page path and screen class › matches regex", slide: 43 },
        { text: "Pattern: ^/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/.*", slide: 43 },
        { text: "Explore › Free form › new user segment › Page path matches regex .*/business/receipt\\.aspx", slide: 43 },
        { text: "Page path has no domain and no ?pnr= part, so the pattern is shorter than one for page_location.", slide: 43 }
      ],
      simple: "To test a pattern, open Reports › Engagement › Pages and screens, add a filter on Page path and screen class with matches regex, and paste the pattern. Then check that every row is a confirmation page and none is missing. Explore segments work the same way for groups of users.",
      deep: "The slide's first example shows only RJ's confirmation pages in all three languages. The pattern starts with ^/ then one language from (en|fr|ar), then one of the three confirmation folder names: booking-?confirmed (the ? makes the hyphen optional, so both English spellings work), reservation-confirmee (French) or tam-alhajz (Arabic), and finally /.* for anything after the folder. Because it is applied to Page path, there is no domain and no ?pnr= query part to worry about. The second example builds a user segment in Explore › Free form with Page path matches regex .*/business/receipt\\.aspx: the leading .* covers any language and folder, and \\. makes the dot a real dot. The check step matters as much as the pattern: every row should be a confirmation page, and no confirmation page should be missing.",
      exam: [
        "Path to the filter: Reports › Engagement › Pages and screens › Add filter › Page path and screen class › matches regex.",
        "booking-?confirmed matches booking-confirmed and bookingconfirmed.",
        "Page path has no domain and no query string, so its pattern is shorter than one for page_location.",
        "Check both ways: every row is a confirmation page AND none is missing."
      ],
      definitions: [
        { term: "Report filter", def: "Lets you test a pattern on real data without changing anything.", slide: 43 }
      ],
      keyFacts: [
        "Example segment: users who booked Business class, Page path matches regex .*/business/receipt\\.aspx.",
        "The three confirmation folders: booking-confirmed (en), reservation-confirmee (fr), tam-alhajz (ar)."
      ],
      examples: [
        "/fr/reservation-confirmee/business/receipt.aspx matches both slide patterns; /en/royal-club/join matches neither."
      ],
      misconceptions: [
        "A pattern written for Page path will not automatically work on page_location, which also contains the domain and query string."
      ]
    },
    {
      id: "c3t3-n3",
      heading: "Turning confirmation pages into a key event",
      slides: [44],
      fromSlides: [
        { text: "GA4 has no URL-based goals. You first create a new event from the confirmation page views, then mark that event as a key event.", slide: 44 },
        { text: "Condition: event_name equals page_view", slide: 44 },
        { text: "Condition: page_location matches regex (pattern below)", slide: 44 },
        { text: "GA4 page_location is the full URL and GA4 needs a full match, so that pattern counts zero bookings.", slide: 44 },
        { text: "Fix: add .* before and the optional query string after.", slide: 44 }
      ],
      simple: "GA4 cannot use a URL as a goal. Instead you create a new event called booking_complete from page_view events whose page_location matches a regex, then mark it as a key event. The pattern must describe the whole full URL, so it needs .* at the front and an optional query string at the end.",
      deep: "In Admin › Events › Create event you name the new event booking_complete and give it two conditions: event_name equals page_view, and page_location matches regex .*/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/(economy|business)/receipt\\.aspx(\\?.*)? . Save it, and when booking_complete appears, mark it as a key event. Universal Analytics used partial matching, so /booking-?confirmed/ used to be enough. In GA4, page_location is the full URL (https://www.rj.com/...?pnr=...) and matches regex is a full match, so that short pattern describes none of the values and counts zero bookings. The fix is .* before (to cover https://www.rj.com) and (\\?.*)? after (an optional ? followed by anything, to cover the query string). The slide adds that it is better still to send a real purchase event from GTM with the booking value and reference.",
      exam: [
        "GA4 has no URL-based goals: create event first, then mark it as a key event.",
        "Conditions: event_name equals page_view AND page_location matches regex.",
        "Old UA partial pattern /booking-?confirmed/ counts zero in GA4 (full URL + full match).",
        "Fix: .* at the start and (\\?.*)? at the end.",
        "Better still: a real purchase event from GTM with value and reference."
      ],
      definitions: [
        { term: "booking_complete", def: "The new event created from confirmation page views, then marked as a key event.", slide: 44 }
      ],
      keyFacts: [
        "Menu path: Admin › Events › Create event.",
        "(\\?.*)? = an optional group: a real question mark followed by anything."
      ],
      examples: [
        "https://www.rj.com/en/booking-confirmed/economy/receipt.aspx?pnr=K7Q2LM matches the full pattern; with only /booking-?confirmed/ GA4 would count it as zero."
      ],
      misconceptions: [
        "A pattern that worked in Universal Analytics does not automatically work in GA4; UA matched partially, GA4 matches fully.",
        "Creating the event does not make it a key event; you still have to mark it."
      ]
    },
    {
      id: "c3t3-n4",
      heading: "Excluding internal traffic, step by step",
      slides: [45],
      fromSlides: [
        { text: "You describe your office IP addresses with a regex, then a data filter removes those visits from your reports.", slide: 45 },
        { text: "Create a rule: traffic_type = internal; match type IP address matches regular expression", slide: 45 },
        { text: "Value: 198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5])  (from the worked example in Part 2)", slide: 45 },
        { text: "Admin › Data filters: the Internal traffic filter starts in Testing state (GA4 labels these visits but keeps them)", slide: 45 },
        { text: "An Active filter deletes those visits permanently, so always check the Testing results first.", slide: 45 }
      ],
      simple: "First you tell GA4 which IP addresses are your office, using a regex. Visits from them get traffic_type = internal. Then a data filter removes them. The filter starts in Testing, where visits are only labelled. Check them, then switch it to Active, which deletes them for good.",
      deep: "The rule lives in Admin › Data streams › your web stream › Configure tag settings › Define internal traffic. You create a rule that sets traffic_type = internal with the match type IP address matches regular expression and the value 198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5]) from Part 2: the dots are escaped, and the group lists 1 to 9, 10 to 19 and 20 to 25. The rule only labels visits. Removing them is the job of the Internal traffic data filter in Admin › Data filters, which starts in Testing state: GA4 labels the visits but keeps them. In a report, add the dimension Test data filter name and check that only staff visits are flagged. Only then change the filter to Active. Because an Active filter deletes those visits permanently, this is a classic 'changes stored data' setting.",
      exam: [
        "Rule: traffic_type = internal; match type IP address matches regular expression.",
        "Testing state = labels but keeps visits; Active = deletes permanently.",
        "Check with the dimension Test data filter name before activating.",
        "198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5]) covers .1 to .25."
      ],
      definitions: [
        { term: "Testing state", def: "GA4 labels these visits but keeps them.", slide: 45 },
        { term: "Active filter", def: "Deletes those visits permanently.", slide: 45 }
      ],
      keyFacts: [
        "Path: Admin › Data streams › your web stream › Configure tag settings › Define internal traffic.",
        "The data filter is in Admin › Data filters."
      ],
      examples: [
        "198.51.100.7 and 198.51.100.25 are flagged as internal; 198.51.100.26 is not, because the pattern stops at 25 and GA4 needs a full match."
      ],
      misconceptions: [
        "Defining the internal traffic rule alone does not remove visits; the data filter does.",
        "Switching straight to Active is not safe: mistakes delete real visits permanently."
      ]
    },
    {
      id: "c3t3-n5",
      heading: "Sources, audiences, channel groups and the AI Assistant channel",
      slides: [46, 47, 48],
      fromSlides: [
        { text: "UTM values are typed by people, so they are messy (Facebook, fb, FB). That is why we use regex and lowercase them in GTM.", slide: 46 },
        { text: "Medium matches (cpc|paid|ppc) AND source matches .*(facebook|instagram|tiktok).*", slide: 47 },
        { text: "Most audience and channel fields offer only \"matches regex\", which is full match: add .* where you mean \"contains\".", slide: 47 },
        { text: "Since 13 May 2026, GA4 automatically groups visits from AI chatbots such as ChatGPT, Gemini and Claude into a new channel called AI Assistant.", slide: 48 },
        { text: "Use the built-in channel for headline numbers and regex to audit it.", slide: 48 }
      ],
      simple: "Every visit gets a source (where from) and a medium (what type). Audiences group users and channel groups group traffic, and both accept regex conditions. Remember they use full match, so add .* when you mean 'contains'. Since May 2026 GA4 has an AI Assistant channel; you can audit it with your own regex on Session source.",
      deep: "Source is where the visit came from (google, facebook, newsletter); medium is the type of traffic (organic, cpc, referral, email); UTM tags such as ?utm_source=facebook&utm_medium=cpc label campaign links; a channel is GA4's group of similar sources and mediums; Direct means no referrer and no UTM tags. Because UTM values are typed by people, they are messy, which is why regex is used. The audience example 'viewed Business class, did not book' includes users where page_location matches .*/business/.* and excludes users with booking_complete; it is used for remarketing, but because audiences only collect users from the day you create them, test the conditions in Explore first. The channel group example, set in Admin › Data display › Channel groups, builds one Paid Social row: medium matches (cpc|paid|ppc) AND source matches .*(facebook|instagram|tiktok).*. A property can have 2 custom groups of up to 50 channels, and they relabel past data. Since 13 May 2026, AI chatbot visits get medium ai-assistant automatically; before, they sat inside Referral. Google has not published its full list, so compare the channel with .*(chatgpt|openai|perplexity|gemini\\.google|copilot|claude\\.ai).* on Session source: visits your pattern finds but the channel misses reveal a gap. Chatbot visits with no referrer still appear as Direct, and no pattern can fix that.",
      exam: [
        "Source = where from; Medium = type of traffic; Direct = no referrer and no UTM tags.",
        "Audience and channel fields use matches regex = full match: add .* for 'contains'.",
        "Audiences collect users only from the day you create them; test in Explore first.",
        "Custom channel groups: 2 per property, up to 50 channels, relabel past data.",
        "AI Assistant channel since 13 May 2026, medium ai-assistant; chatbot visits without a referrer stay Direct."
      ],
      definitions: [
        { term: "Referrer", def: "The page the visitor was on before clicking a link to your site.", slide: 46 },
        { term: "UTM tags", def: "Labels added to a link so GA4 knows the campaign.", slide: 46 },
        { term: "Direct", def: "No referrer and no UTM tags.", slide: 46 },
        { term: "Channel", def: "GA4's group of similar sources and mediums.", slide: 46 }
      ],
      keyFacts: [
        "Channel groups live in Admin › Data display › Channel groups.",
        "Before May 2026 AI chatbot visits sat inside Referral.",
        "Google has not published the full list of chatbots it recognises."
      ],
      examples: [
        "Source m.facebook.com with medium cpc falls into the Paid Social row: .*(facebook|instagram|tiktok).* covers the extra m. at the front."
      ],
      misconceptions: [
        "source matches facebook does not mean 'contains facebook' in a GA4 channel field; it means the whole source is exactly facebook.",
        "The AI Assistant channel does not catch every chatbot visit: visits with no referrer still appear as Direct."
      ]
    }
  ],
  steps: [
    {
      title: "Open Define internal traffic",
      what: "Go to Admin › Data streams › your web stream › Configure tag settings › Define internal traffic.",
      why: "This is where GA4 learns which IP addresses belong to your office.",
      practical: "Have your office IP range ready, for example 198.51.100.1 to 198.51.100.25.",
      check: { q: "Where is the internal traffic rule defined?", options: ["Admin › Data streams › web stream › Configure tag settings › Define internal traffic", "Reports › Engagement › Pages and screens", "Explore › Free form"], answer: 0, explain: "Slide 45 gives this exact path." }
    },
    {
      title: "Create the rule with an IP regex",
      what: "Create a rule: traffic_type = internal; match type IP address matches regular expression; value 198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5]).",
      why: "One regex describes the whole range of office addresses at once.",
      practical: "Escape every dot with a backslash so it means a real dot.",
      visual: "198\\.51\\.100\\.([1-9]|1[0-9]|2[0-5])",
      check: { q: "Which value does the rule give to matching visits?", options: ["traffic_type = internal", "medium = referral", "event_name = page_view"], answer: 0, explain: "Slide 45: traffic_type = internal." }
    },
    {
      title: "Leave the data filter in Testing",
      what: "In Admin › Data filters, the Internal traffic filter starts in Testing state.",
      why: "In Testing, GA4 labels these visits but keeps them, so nothing is lost yet.",
      practical: "Do not switch it to Active on day one.",
      check: { q: "What does GA4 do with internal visits while the filter is in Testing?", options: ["Deletes them", "Labels them but keeps them", "Moves them to Direct"], answer: 1, explain: "Slide 45: Testing labels these visits but keeps them." }
    },
    {
      title: "Check the flagged visits",
      what: "In a report, add the dimension Test data filter name and check that only staff visits are flagged.",
      why: "A wrong pattern could flag real customers.",
      practical: "Look for visits that should not be internal before going further.",
      check: { q: "Which dimension shows the visits the filter would remove?", options: ["Session source", "Test data filter name", "Content group"], answer: 1, explain: "Slide 45: add the dimension Test data filter name." }
    },
    {
      title: "Change the filter to Active",
      what: "When the Testing results are right, change the filter to Active.",
      why: "Only an Active filter removes internal visits from your reports.",
      practical: "Remember: an Active filter deletes those visits permanently.",
      check: { q: "Why must you check Testing results before activating?", options: ["Active deletes those visits permanently", "Active only works for 7 days", "Testing is slower"], answer: 0, explain: "Slide 45: an Active filter deletes those visits permanently." }
    }
  ],
  visual: {
    type: "regex",
    title: "GA4 regex tester (full match)",
    caption: "GA4's matches regex is a full match: your pattern must describe the whole page path. Add .* where you mean 'contains'.",
    slides: [43, 44, 47],
    data: {
      mode: "full",
      samples: [
        "/en/booking-confirmed/economy/receipt.aspx",
        "/en/bookingconfirmed/business/receipt.aspx",
        "/fr/reservation-confirmee/business/receipt.aspx",
        "/ar/tam-alhajz/economy/receipt.aspx",
        "/help/en/booking-confirmed/faq",
        "/en/plan-and-book/fares",
        "/en/royal-club/join",
        "/fr/royal-club/benefits"
      ],
      challenges: [
        { task: "Show only the booking confirmation pages, in all three languages and both English spellings (not the help page).", answer: "^/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/.*", hint: "Start with ^/(en|fr|ar)/ then list the three folder names in brackets, and finish with /.*" },
        { task: "Build the Explore segment: Business-class receipts only.", answer: ".*/business/receipt\\.aspx", hint: "Start with .* to cover any language, and write \\. for the real dot in receipt.aspx." },
        { task: "Any Royal Club page, in any language.", answer: "/(en|fr|ar)/royal-club/.*", hint: "Full match: you need something for the part after royal-club/." },
        { task: "English confirmation pages with either spelling (booking-confirmed or bookingconfirmed). The help page must NOT match.", answer: "/en/booking-?confirmed/.*", hint: "The ? makes the hyphen optional. Because GA4 needs a full match, a pattern starting with /en/ cannot match /help/en/..." },
        { task: "Any value that contains booking-confirmed anywhere, including the help page.", answer: ".*booking-confirmed.*", hint: "In GA4, 'contains' means .* on both sides." }
      ]
    }
  },
  examples: [
    {
      concept: "Why the old Universal Analytics pattern counts zero",
      example: "An analyst copies /booking-?confirmed/ from the old setup into a GA4 Create event condition on page_location.",
      walkthrough: [
        "page_location is the full URL, e.g. https://www.rj.com/en/booking-confirmed/economy/receipt.aspx?pnr=K7Q2LM.",
        "GA4's matches regex needs the pattern to describe the whole value.",
        "/booking-?confirmed/ describes only a small middle part, so no value matches and booking_complete counts zero.",
        "Fix: add .* before and the optional query string (\\?.*)? after, as in the full pattern on slide 44."
      ],
      application: "Whenever a GA4 regex condition shows zero results, first check whether the pattern covers the whole value.",
      check: { q: "What is missing from /booking-?confirmed/ for GA4?", options: ["Something to cover the start and end of the full URL", "A capital letter", "The word page_view"], answer: 0, explain: "Slide 44: add .* before and the optional query string after." }
    },
    {
      concept: "Paid Social channel row",
      example: "RJ wants one Paid Social row in a custom channel group for cpc, paid and ppc traffic from Facebook, Instagram and TikTok.",
      walkthrough: [
        "Open Admin › Data display › Channel groups.",
        "Condition 1: Medium matches (cpc|paid|ppc).",
        "Condition 2 (AND): source matches .*(facebook|instagram|tiktok).*, so values like m.facebook.com also fit.",
        "Remember the group also relabels past data, and a property can have 2 custom groups of up to 50 channels."
      ],
      application: "Use .* around source names in channel fields, because they are full match.",
      check: { q: "Why does the source condition start and end with .*?", options: ["Channel fields use full match, so .* means 'contains'", "It makes the pattern case-insensitive", "It is required for every medium"], answer: 0, explain: "Slide 47: matches regex is full match; add .* where you mean 'contains'." }
    },
    {
      concept: "Auditing the AI Assistant channel",
      example: "An analyst wants to know whether GA4's new AI Assistant channel misses some chatbot visits.",
      walkthrough: [
        "Use the built-in channel for headline numbers.",
        "In a report, filter Session source with .*(chatgpt|openai|perplexity|gemini\\.google|copilot|claude\\.ai).*.",
        "Visits the pattern finds but the channel misses show a gap in Google's list.",
        "Chatbot visits with no referrer still appear as Direct; no pattern can fix that."
      ],
      application: "Built-in channel for reporting, regex for auditing.",
      check: { q: "A chatbot visit arrives with no referrer and no UTM tags. Where does it appear?", options: ["Direct", "AI Assistant", "Paid Social"], answer: 0, explain: "Slide 48: chatbot visits with no referrer still appear as Direct." }
    }
  ],
  flashcards: [
    { id: "c3t3-f1", front: "GA4 settings that only change the view", back: "Report filters and comparisons; Explore segments and funnel steps. Mistake? Remove the filter; nothing is lost.", slide: 42 },
    { id: "c3t3-f2", front: "GA4 settings that change stored data", back: "Create/modify events, key events, internal traffic rules and data filters, unwanted referrals, audiences.", slide: 42 },
    { id: "c3t3-f3", front: "Where do custom channel groups sit?", back: "In between: they relabel old and new data, so mistakes can be undone but affect everyone's reports.", slide: 42 },
    { id: "c3t3-f4", front: "How do you make a booking key event in GA4?", back: "Create event booking_complete (event_name equals page_view AND page_location matches regex), then mark it as a key event.", slide: 44 },
    { id: "c3t3-f5", front: "Why does /booking-?confirmed/ count zero in GA4?", back: "page_location is the full URL and GA4 needs a full match. Fix: .* before and the optional query string after.", slide: 44 },
    { id: "c3t3-f6", front: "Data filter: Testing vs Active", back: "Testing labels internal visits but keeps them; Active deletes them permanently.", slide: 45 },
    { id: "c3t3-f7", front: "Source vs Medium", back: "Source = where the visit came from (google, facebook). Medium = the type of traffic (organic, cpc, referral, email).", slide: 46 },
    { id: "c3t3-f8", front: "matches regex in audiences and channel groups", back: "Full match: add .* where you mean 'contains'.", slide: 47 },
    { id: "c3t3-f9", front: "AI Assistant channel", back: "Since 13 May 2026; medium ai-assistant; visits from AI chatbots. Chatbot visits with no referrer still appear as Direct.", slide: 48 }
  ],
  quiz: [
    { id: "c3t3-q1", type: "mcq", difficulty: "easy", prompt: "Which GA4 setting only changes what you SEE, so a wrong pattern costs nothing?", options: ["A report filter", "A data filter set to Active", "Creating an event", "An audience"], answer: 0, explain: "Report filters and comparisons, Explore segments and funnel steps only change the view.", wrongWhy: { "1": "An Active data filter deletes visits permanently.", "2": "Creating or modifying events changes stored data.", "3": "Audiences change stored data and collect users only from today on." }, slide: 42, section: "c3t3-n1" },
    { id: "c3t3-q2", type: "tf", difficulty: "easy", prompt: "In GA4, the match type 'matches regex' in audience and channel fields is a full match.", answer: true, explain: "Slide 47: \"matches regex\" is full match; add .* where you mean \"contains\".", slide: 47, section: "c3t3-n5" },
    { id: "c3t3-q3", type: "match", difficulty: "easy", prompt: "Match each traffic term to its plain meaning.", options: [["Source", "Where the visit came from"], ["Medium", "The type of traffic"], ["UTM tags", "Labels added to a link so GA4 knows the campaign"], ["Direct", "No referrer and no UTM tags"]], answer: null, explain: "These definitions come from the table on slide 46.", slide: 46, section: "c3t3-n5" },
    { id: "c3t3-q4", type: "mcq", difficulty: "medium", scenario: "After moving from Universal Analytics, an analyst creates booking_complete with page_location matches regex /booking-?confirmed/. A week later it shows zero bookings, although customers are booking.", prompt: "What is the cause?", options: ["page_location is the full URL and GA4 needs a full match, so the pattern describes no value", "GA4 does not allow regex in event conditions", "The hyphen must always be written", "booking_complete must be a key event before it counts"], answer: 0, explain: "Slide 44: GA4 page_location is the full URL and GA4 needs a full match, so that pattern counts zero bookings.", wrongWhy: { "1": "Slide 44 uses page_location matches regex as a condition.", "2": "The ? makes the hyphen optional; that is not the problem.", "3": "Marking it as a key event comes after; the event itself counts zero because nothing matches." }, slide: 44, section: "c3t3-n3" },
    { id: "c3t3-q5", type: "multi", difficulty: "medium", prompt: "Which GA4 settings change what GA4 STORES? Select all.", options: ["Internal traffic rules and data filters", "Explore segments", "Key events", "Unwanted referrals", "Report comparisons"], answer: [0, 2, 3], explain: "Slide 42: events, key events, internal traffic rules and data filters, unwanted referrals and audiences change stored data. Explore segments and comparisons only change the view.", slide: 42, section: "c3t3-n1" },
    { id: "c3t3-q6", type: "tf", difficulty: "medium", prompt: "When the Internal traffic data filter is in Testing state, GA4 already deletes the internal visits.", answer: false, explain: "In Testing state GA4 labels these visits but keeps them; only Active deletes them permanently.", slide: 45, section: "c3t3-n4" },
    { id: "c3t3-q7", type: "fill", difficulty: "medium", prompt: "To check the internal traffic filter before activating it, add the dimension Test data filter ___ to a report.", answer: ["name"], explain: "Slide 45: add the dimension Test data filter name.", slide: 45, section: "c3t3-n4" },
    { id: "c3t3-q8", type: "mcq", difficulty: "medium", prompt: "Why is the pattern for Page path shorter than one for page_location?", options: ["Page path has no domain and no ?pnr= part", "Page path is always lowercase", "Page path uses partial matching", "Page path cannot contain slashes"], answer: 0, explain: "Slide 43: Page path has no domain and no ?pnr= part.", wrongWhy: { "1": "The slide says nothing about case; the difference is the domain and query string.", "2": "GA4's matches regex is full match on both.", "3": "Page paths are made of slashes, e.g. /en/royal-club/join." }, slide: 43, section: "c3t3-n2" },
    { id: "c3t3-q9", type: "mcq", difficulty: "hard", scenario: "A marketer wants an audience of users who viewed Business class pages but did not book, for remarketing ads. She plans to create it today and use it straight away.", prompt: "What is the best advice?", options: ["Test the conditions in Explore first, because audiences only collect users from the day you create them", "Create it with partial matching so it fills faster", "Use a data filter instead, because audiences cannot use regex", "Build it as a channel group, which relabels past data"], answer: 0, explain: "Slide 47: audiences only collect users from the day you create them, so test the conditions in Explore first.", wrongWhy: { "1": "Audience fields use matches regex, which is full match; there is no partial option to speed it up.", "2": "Audiences accept regex conditions (slide 47), and data filters remove internal traffic.", "3": "Channel groups group traffic sources for reporting, not users for marketing." }, slide: 47, section: "c3t3-n5" },
    { id: "c3t3-q10", type: "fill", difficulty: "hard", prompt: "Write the GA4 Session source pattern (full match) that finds any source containing chatgpt or perplexity.", answer: [".*(chatgpt|perplexity).*", ".*(perplexity|chatgpt).*", ".*(chatgpt|perplexity)+.*"], explain: "GA4 needs a full match, so put .* on both sides of the bracketed list. The slide's audit pattern uses the same shape with more chatbot names.", slide: 48, section: "c3t3-n5" },
    { id: "c3t3-q11", type: "mcq", difficulty: "hard", scenario: "Since May 2026, the AI Assistant channel shows 900 sessions. Your own regex on Session source finds 1,050 sessions from chatbots.", prompt: "What does the difference most likely show?", options: ["A gap in Google's list of recognised chatbots", "Your pattern is wrong because the built-in channel is always complete", "The extra visits came with no referrer", "The channel only counts paid chatbot ads"], answer: 0, explain: "Slide 48: if your pattern finds visits the channel misses, you have found a gap in Google's list.", wrongWhy: { "1": "Google has not published the full list, so the channel is not guaranteed complete.", "2": "Visits with no referrer have no source to match, so your pattern could not find them either; they appear as Direct.", "3": "The slide describes visits from AI chatbots, not paid ads." }, slide: 48, section: "c3t3-n5" },
    { id: "c3t3-q12", type: "multi", difficulty: "hard", prompt: "Which are true about custom channel groups? Select all.", options: ["They relabel past data as well as new data", "A property can have 2 custom groups of up to 50 channels", "Mistakes can never be undone", "They are set in Admin › Data display › Channel groups"], answer: [0, 1, 3], explain: "Slides 42 and 47: they relabel old and new data (mistakes can be undone but affect everyone's reports), 2 groups of up to 50 channels, in Admin › Data display › Channel groups.", slide: 47, section: "c3t3-n5" }
  ]
},

/* ===================================================================== */
{
  id: "c3t4",
  title: "Regex in Google Tag Manager",
  slides: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62],
  minutes: 30,
  overview: {
    about: "How GTM triggers use regex (partial matching, so anchors matter), reusable trigger recipes, ignoring test websites, the RegEx Table variable for content groups and clean page paths with capture groups, and removing email addresses from URLs before they reach GA4.",
    why: "GTM decides when tags fire and can clean values before they reach GA4. Fixing data here means every GA4 report afterwards is simpler, and it is where you stop personal data from leaking into analytics.",
    objectives: [
      "Explain why GTM trigger patterns need ^ and $ to stop look-alike pages firing a tag.",
      "Reuse the trigger recipes for confirmations, file downloads, outbound links, one-page apps and test sites.",
      "Read a RegEx Table row by row and order rows from most specific to most general.",
      "Use capture groups ($1, $2) to turn per-customer URLs into one clean page path.",
      "Spot PII in GTM Preview and remove email addresses with a RegEx Table before GA4 sees them."
    ],
    vocabulary: [
      { term: "Trigger", def: "Tells a tag when to fire.", slide: 50 },
      { term: "matches RegEx", def: "GTM checks whether the pattern appears ANYWHERE in the value.", slide: 50 },
      { term: "RegEx Table", def: "A variable that works like a lookup list: the first matching row wins.", slide: 53 },
      { term: "Capture groups", def: "Let the output reuse saved pieces: $1 = piece from bracket 1, $2 = piece from bracket 2.", slide: 53 },
      { term: "Content group", def: "A label for every page's site section, sent to GA4 as the content_group parameter.", slide: 55 },
      { term: "PII", def: "Personally identifiable information: name, email, phone or passport number.", slide: 59 },
      { term: "Data redaction", def: "A GA4 web-stream setting that removes email addresses and chosen URL parameters before data is stored.", slide: 59 },
      { term: "Preview mode (Tag Assistant)", def: "Shows every value GTM reads on a page, including personal data hidden in the URL.", slide: 60 }
    ],
    hook: "Your booking tag just fired on a help page and on the staging site. Two small symbols and one extra condition would have stopped both."
  },
  notes: [
    {
      id: "c3t4-n1",
      heading: "How GTM triggers use regex",
      slides: [49, 50],
      fromSlides: [
        { text: "GTM decides when tags fire and can clean values before they reach GA4.", slide: 49 },
        { text: "A trigger tells a tag when to fire. GTM checks whether the pattern appears ANYWHERE in the value, so add ^ and $ to stop look-alike pages from firing your tag.", slide: 50 },
        { text: "Choose matches RegEx (ignore case) when capital letters may vary. Use Preview mode › Variables to see the exact value GTM is testing.", slide: 50 },
        { text: "/booking-?confirmed/ | /help/en/booking-confirmed/faq | Yes  (unwanted)", slide: 50 },
        { text: "^/en/booking-?confirmed/.*\\.aspx$ | /help/en/booking-confirmed/faq | No", slide: 50 }
      ],
      simple: "GTM is the opposite of GA4: its triggers fire if the pattern appears anywhere in the value. That means /booking-?confirmed/ also fires on a help page. Adding ^ at the start and $ at the end forces the whole value to fit, so look-alike pages no longer fire the tag.",
      deep: "In GTM, a trigger condition such as Page Path matches RegEx is a partial match: if the pattern is found anywhere inside the value, the condition is true. The slide's table shows the effect. /booking-?confirmed/ fires on the real receipt /en/booking-confirmed/economy/receipt.aspx, but also, unwanted, on /help/en/booking-confirmed/faq. The anchored version ^/en/booking-?confirmed/.*\\.aspx$ fires on the receipt but not on the help page, because the value must start with /en/ and end with .aspx. Two practical tips: choose matches RegEx (ignore case) when capital letters may vary, and use Preview mode › Variables to see the exact value GTM is testing, because the pattern can only match what the variable really contains. Compare this with GA4, where matches regex is a full match and you add .* for 'contains'.",
      exam: [
        "GTM triggers: partial match, the pattern may appear ANYWHERE.",
        "Add ^ and $ to stop look-alike pages from firing the tag.",
        "matches RegEx (ignore case) when capitals may vary.",
        "Preview mode › Variables shows the exact value GTM tests.",
        "GA4 = full match (add .*); GTM trigger = partial match (add ^ $)."
      ],
      definitions: [
        { term: "Trigger", def: "A trigger tells a tag when to fire.", slide: 50 }
      ],
      keyFacts: [
        "/booking-?confirmed/ fires on /help/en/booking-confirmed/faq (unwanted).",
        "^/en/booking-?confirmed/.*\\.aspx$ does not fire on the help page."
      ],
      examples: [
        "A booking tag with Page Path matches RegEx /booking-?confirmed/ also counts help-page visits as bookings until ^ and $ are added."
      ],
      misconceptions: [
        "GTM triggers do not need .* at both ends to mean 'contains'; partial matching already does that.",
        "A pattern that 'never matches' is often tested on the wrong variable; check Preview."
      ]
    },
    {
      id: "c3t4-n2",
      heading: "Trigger recipes and ignoring test websites",
      slides: [51, 52],
      fromSlides: [
        { text: "File downloads | Click – Just Links | Click URL matches RegEx (ignore case) \\.(pdf|docx?|xlsx?|pptx?)($|\\?)", slide: 51 },
        { text: "Links to other sites | Click – Just Links | Click URL Hostname does not match RegEx (^|\\.)rj\\.com$", slide: 51 },
        { text: "Steps in a one-page app (URL changes without reloading) | History Change | Page Path matches RegEx ^/app/step-[1-4]$", slide: 51 },
        { text: "Ignore test sites | Any | Page Hostname does not match RegEx ^(staging|dev|test)\\.", slide: 51 },
        { text: "Some Page Views = AND. The tag fires only when BOTH conditions are true.", slide: 52 }
      ],
      simple: "Most tracking needs one of a few trigger patterns: confirmation pages, file downloads, links to other sites, steps in a one-page app, and ignoring test sites. RJ's booking trigger has two conditions: the hostname must not start with staging., dev. or test., and the path must be a confirmation page. Both must be true.",
      deep: "The recipe table pairs each goal with a trigger type and condition. Any booking confirmation: Page View, Page Path matches RegEx ^/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/. File downloads: Click – Just Links, Click URL matches RegEx (ignore case) \\.(pdf|docx?|xlsx?|pptx?)($|\\?), where the escaped dot is a real dot, x? covers old and new formats and ($|\\?) means the extension is followed by the end or a query string. Links to other sites: Click URL Hostname does not match RegEx (^|\\.)rj\\.com$, so rj.com and any subdomain count as your own. Steps in a one-page app, where the URL changes without reloading: History Change, Page Path matches RegEx ^/app/step-[1-4]$. Ignore test sites: Page Hostname does not match RegEx ^(staging|dev|test)\\. . On slide 52 RJ's developers test bookings on staging.rj.com, so the 'Booking confirmation (live site only)' trigger uses Some Page Views with two conditions; in GTM, Some Page Views means AND, so www.rj.com/en/booking-confirmed/... fires, staging.rj.com/en/booking-confirmed/... does not, and www.rj.com/en/help/faq does not.",
      exam: [
        "Downloads: Click – Just Links + Click URL matches RegEx (ignore case) \\.(pdf|docx?|xlsx?|pptx?)($|\\?).",
        "Outbound links: Click URL Hostname does not match RegEx (^|\\.)rj\\.com$.",
        "One-page app steps: History Change + ^/app/step-[1-4]$.",
        "Test sites: Page Hostname does not match RegEx ^(staging|dev|test)\\.",
        "Multiple conditions under Some Page Views = AND."
      ],
      definitions: [
        { term: "History Change", def: "Trigger type for steps in a one-page app (URL changes without reloading).", slide: 51 },
        { term: "Some Page Views", def: "= AND: the tag fires only when BOTH conditions are true.", slide: 52 }
      ],
      keyFacts: [
        "Without the test-site condition, fake bookings on staging.rj.com would count as real sales.",
        "Condition 1: not a test site. Condition 2: a confirmation page, in any of the three languages."
      ],
      examples: [
        "staging.rj.com/en/booking-confirmed/... : condition 2 is true but condition 1 is false, so the tag does not fire."
      ],
      misconceptions: [
        "Two conditions in one trigger are not OR; under Some Page Views both must be true.",
        "The test-site rule uses does not match RegEx, not matches RegEx."
      ]
    },
    {
      id: "c3t4-n3",
      heading: "The RegEx Table variable and content groups",
      slides: [53, 54, 55, 56],
      fromSlides: [
        { text: "A RegEx Table works like a lookup list: if the input matches row 1, return output 1; if not, try row 2, and so on. The first matching row wins.", slide: 53 },
        { text: "Full Matches Only: on by default; each row must match the whole input.", slide: 53 },
        { text: "Order rows from most specific to most general, because the first match wins.", slide: 53 },
        { text: "A Lookup Table needs exact values; a RegEx Table accepts patterns.", slide: 53 },
        { text: "content_group: A name GA4 already knows: it fills GA4's built-in Content group dimension, so no custom dimension is needed.", slide: 56 }
      ],
      simple: "A RegEx Table checks the input against row 1, then row 2, and stops at the first row that matches. If no row matches it returns the default value. RJ uses one to label every page with its site section and sends that label to GA4 as content_group.",
      deep: "Settings to know: Input is the value to test, such as Page Path. Ignore Case is on by default. Full Matches Only is on by default, so inside a RegEx Table each row must match the whole input, unlike a trigger. Capture Groups lets the output reuse saved pieces. Default value is returned when no row matches. RJ's Content group table has four rows: confirmation folders → Confirmation, ^/(en|fr|ar)/plan-and-book/.* → Plan and book, ^/(en|fr|ar)/royal-club/.* → Royal Club, ^/(en|fr|ar)/info-and-tips/.* → Info and tips, with default Other. Reading /fr/royal-club/benefits: row 1 no, row 2 no, row 3 yes, stop, returns Royal Club. /en/plan-and-book/fares stops at row 2, so rows 3 and 4 are never checked. /en/careers matches nothing and returns Other. Put the most specific rows first, because a general row placed first would catch pages meant for later rows. The Google tag then sends Configuration parameter content_group = {{Content group}} with Initialization - All Pages. content_group is a name GA4 already knows, so it fills the built-in Content group dimension without a custom dimension, and Pages and screens can show a handful of section rows instead of thousands of URLs.",
      exam: [
        "RegEx Table: first matching row wins; no match = default value.",
        "Defaults: Ignore Case on, Full Matches Only on.",
        "Order rows from most specific to most general.",
        "Lookup Table = exact values; RegEx Table = patterns.",
        "content_group fills GA4's built-in Content group dimension; no custom dimension needed."
      ],
      definitions: [
        { term: "Default value", def: "Returned when no row matches.", slide: 53 },
        { term: "Input", def: "The value to test, e.g. Page Path.", slide: 53 }
      ],
      keyFacts: [
        "/fr/royal-club/benefits → Royal Club; /en/plan-and-book/fares → Plan and book; /en/careers → Other.",
        "Result in GA4: Reports › Engagement › Pages and screens › change the dimension to Content group."
      ],
      examples: [
        "Report users filter by the simple label Royal Club instead of writing regex."
      ],
      misconceptions: [
        "A RegEx Table does not check every row and combine results; it stops at the first match.",
        "Full Matches Only in a RegEx Table does not change how triggers match; triggers are still partial."
      ]
    },
    {
      id: "c3t4-n4",
      heading: "Capture groups: one row per page, not per customer",
      slides: [57, 58],
      fromSlides: [
        { text: "Every customer creates a new row in the Pages report: 10,000 customers = 10,000 rows for the same seat-selection page. We want ONE row per page.", slide: 57 },
        { text: "^/(en|fr|ar)/manage-booking/[A-Z0-9]{6}/(.*)$", slide: 58 },
        { text: "/$1/manage-booking/{pnr}/$2", slide: 58 },
        { text: "GTM numbers the round brackets ( ) from left to right: the 1st ( ) becomes $1 (en), the 2nd ( ) becomes $2 (seats).", slide: 58 },
        { text: "[A-Z0-9]{6} has no round brackets, so it gets no number and is thrown away. We choose the meaning by where we put the brackets.", slide: 58 }
      ],
      simple: "RJ's Manage Booking addresses contain each customer's booking code, so every customer creates a new report row. A RegEx Table with capture groups keeps the language ($1) and the page name ($2), throws away the code, and rebuilds the address with {pnr} in its place.",
      deep: "The pattern ^/(en|fr|ar)/manage-booking/[A-Z0-9]{6}/(.*)$ has two round brackets. GTM numbers them left to right: the first, (en|fr|ar), becomes $1; the second, (.*), becomes $2. The booking code [A-Z0-9]{6} (six capital letters or digits) has no round brackets, so it gets no number and is thrown away; we choose the meaning by where we put the brackets. The output /$1/manage-booking/{pnr}/$2 rebuilds the address: /en/manage-booking/K7Q2LM/seats and /en/manage-booking/R4T8WX/seats both become /en/manage-booking/{pnr}/seats (the same row), while /fr/manage-booking/B2N6PD/meals becomes /fr/manage-booking/{pnr}/meals. The GTM setup is a RegEx Table called Clean page path on {{Page Path}}, with Set Default Value {{Page Path}} so other pages keep their path, Full Matches Only and Enable Capture Groups and Replace Functionality ticked, and Ignore Case unticked to keep [A-Z0-9] to capital letters. The Google tag sends page_path_clean = {{Clean page path}}, which you then register as a custom dimension. Bonus: booking codes stay out of GA4.",
      exam: [
        "Brackets are numbered left to right: 1st ( ) = $1, 2nd ( ) = $2.",
        "No round brackets = not saved: [A-Z0-9]{6} is thrown away.",
        "Output /$1/manage-booking/{pnr}/$2; default value {{Page Path}}.",
        "Tick Capture Groups; untick Ignore Case to keep [A-Z0-9] to capitals.",
        "page_path_clean must be registered as a custom dimension."
      ],
      definitions: [
        { term: "$1 / $2", def: "$1 = piece from bracket 1, $2 = piece from bracket 2.", slide: 53 }
      ],
      keyFacts: [
        "10,000 customers = 10,000 rows for the same seat-selection page, before cleaning.",
        "Bonus: booking codes stay out of GA4."
      ],
      examples: [
        "/en/manage-booking/K7Q2LM/seats → $1 = en, $2 = seats → /en/manage-booking/{pnr}/seats."
      ],
      misconceptions: [
        "GTM does not know that $1 is the language; it only counts brackets from left to right.",
        "Square brackets [ ] do not create a capture group; only round brackets ( ) do."
      ]
    },
    {
      id: "c3t4-n5",
      heading: "Protecting privacy: spotting and removing email addresses",
      slides: [59, 60, 61, 62],
      fromSlides: [
        { text: "Analytics tools must never collect information that identifies a person.", slide: 59 },
        { text: "GET puts it in the page address (?email=...), where GA4 records it. POST sends it hidden.", slide: 59 },
        { text: "The pattern:  .*@.*", slide: 61 },
        { text: "Some forms write @ as %40. If GTM Preview shows %40, use .*(@|%40).* instead. Also ask developers to send forms with POST.", slide: 61 },
        { text: "Rebuilds the address from Page Hostname and Page Path. Neither includes the part after ?, so the email is gone.", slide: 62 }
      ],
      simple: "Personal data such as email addresses must never reach GA4. First find the leak in GTM Preview: Page URL shows ?email=.... Then a RegEx Table called Page URL - safe uses .*@.* : if the address contains an @, it sends only hostname and path, so the email is dropped. The Google tag sends this safe copy as page_location.",
      deep: "Four privacy terms: PII (name, email, phone or passport number) must never be sent; Google's terms forbid it. GET vs POST: a GET form puts what visitors type in the page address, where GA4 records it, while POST sends it hidden; changing the form to POST is website code, not GA or GTM, so ask RJ's developers. Data redaction is a GA4 web-stream setting that removes email addresses and chosen URL parameters before data is stored; switch it on as a safety net. Consent Mode makes tags wait for the visitor's cookie choice. To see a leak, open GTM Preview, enter www.rj.com, sign up for the newsletter with a test email, pick the event that fired on the thank-you page and open Variables: Page URL is https://www.rj.com/en/newsletter/thanks?email=sara@example.com. The fix is a RegEx Table on {{Page URL}} with one row: pattern .*@.* (anything, then @, then anything; every email has an @ and normal addresses almost never do), output https://{{Page Hostname}}{{Page Path}}, default {{Page URL}}, Ignore Case and Full Matches Only ticked, Capture Groups not needed because the output uses no $. Neither Page Hostname nor Page Path includes the part after ?, so the email is gone. Finally the Google tag sets page_location = {{Page URL - safe}}.",
      exam: [
        "PII = name, email, phone or passport number; never send it.",
        "GET puts form data in the URL; POST sends it hidden; the fix is website code.",
        "Pattern .*@.* = 'the address contains an @'; use .*(@|%40).* if Preview shows %40.",
        "Output https://{{Page Hostname}}{{Page Path}} drops the query string; default {{Page URL}}.",
        "Google tag: page_location = {{Page URL - safe}}."
      ],
      definitions: [
        { term: "PII", def: "Personally identifiable information: name, email, phone or passport number.", slide: 59 },
        { term: "Data redaction", def: "A GA4 web-stream setting that removes email addresses and chosen URL parameters before data is stored.", slide: 59 },
        { term: "Consent Mode", def: "Google's system for following a visitor's cookie choice: tags wait for the yes or no and respect it.", slide: 59 }
      ],
      keyFacts: [
        "Before: https://www.rj.com/en/newsletter/thanks?email=sara@example.com; After: https://www.rj.com/en/newsletter/thanks.",
        "…/en/royal-club/join?ref=newsletter does not match .*@.*, so it is sent unchanged."
      ],
      examples: [
        "In Tag Assistant, Page Path is /en/newsletter/thanks but Page URL shows ?email=sara@example.com: that is the leak."
      ],
      misconceptions: [
        "Data redaction is a safety net, not a replacement for fixing the form (POST) and cleaning in GTM.",
        "Changing GET to POST is not done in GA or GTM; it is website code."
      ]
    }
  ],
  steps: [
    {
      title: "Open Preview and repeat the visitor's action",
      what: "In GTM click Preview, enter www.rj.com, and sign up for the newsletter with a test email address.",
      why: "Before you can fix a privacy leak, you must see it.",
      practical: "Use a test address, never a real customer's.",
      check: { q: "Why start in Preview mode?", options: ["It shows every value GTM reads on a page, including personal data in the URL", "It deletes personal data automatically", "It publishes the container"], answer: 0, explain: "Slide 60: Preview mode (Tag Assistant) shows every value GTM reads." }
    },
    {
      title: "Read the Variables of the thank-you event",
      what: "Pick the event that fired on the thank-you page and open Variables.",
      why: "Page URL shows ?email=..., so personal data would reach GA4.",
      practical: "Compare Page Path (/en/newsletter/thanks) with Page URL (includes ?email=sara@example.com).",
      visual: "Page URL | https://www.rj.com/en/newsletter/thanks?email=sara@example.com",
      check: { q: "Which variable shows the email address?", options: ["Page Path", "Page URL", "Page Hostname"], answer: 1, explain: "Slide 60: Page URL shows ?email=...; Page Path does not." }
    },
    {
      title: "Create the RegEx Table 'Page URL - safe'",
      what: "New variable: RegEx Table, Input Variable {{Page URL}}, one row with pattern .*@.* .",
      why: "The row matches only when the address contains an @.",
      practical: "If Preview shows %40 instead of @, use .*(@|%40).* .",
      visual: ".*@.*",
      check: { q: "What does .*@.* mean in plain words?", options: ["The address contains an @", "The address starts with @", "The address is an email"], answer: 0, explain: "Slide 61: anything, then @, then anything." }
    },
    {
      title: "Set the output and default value",
      what: "Output https://{{Page Hostname}}{{Page Path}}; Set Default Value {{Page URL}}.",
      why: "Neither Page Hostname nor Page Path includes the part after ?, so the email is gone. Addresses without @ are sent unchanged.",
      practical: "Tick Ignore Case and Full Matches Only; Capture Groups is not needed because the output uses no $.",
      check: { q: "What does the variable return for …/en/royal-club/join?ref=newsletter?", options: ["The address unchanged (default value)", "Only the hostname", "An empty value"], answer: 0, explain: "No @, so no row matches and the default {{Page URL}} is used." }
    },
    {
      title: "Send the safe copy from the Google tag",
      what: "In the Google tag set page_location = {{Page URL - safe}}.",
      why: "GA4 then receives the safe copy instead of the raw address.",
      practical: "Check again in Preview that the thank-you page now sends https://www.rj.com/en/newsletter/thanks.",
      check: { q: "Which parameter receives {{Page URL - safe}}?", options: ["page_location", "content_group", "page_path_clean"], answer: 0, explain: "Slide 62: in the Google tag set page_location = {{Page URL - safe}}." }
    },
    {
      title: "Add the long-term fixes",
      what: "Ask the developers to send forms with POST, and switch on GA4's data redaction as a safety net.",
      why: "POST keeps form data out of the address; redaction removes emails and chosen URL parameters before data is stored.",
      practical: "POST is website code (<form method=\"post\">), not GA or GTM.",
      check: { q: "Who changes a form from GET to POST?", options: ["The website developers", "GA4 data redaction", "A GTM trigger"], answer: 0, explain: "Slide 59: it is website code, not GA or GTM." }
    }
  ],
  visual: {
    type: "regex",
    title: "GTM regex tester (partial match)",
    caption: "GTM's matches RegEx fires if the pattern appears anywhere in the value. Use ^ and $ to stop look-alike pages.",
    slides: [50, 51, 57, 61],
    data: {
      mode: "partial",
      samples: [
        "/en/booking-confirmed/economy/receipt.aspx",
        "/help/en/booking-confirmed/faq",
        "/fr/reservation-confirmee/business/receipt.aspx",
        "/app/step-2",
        "/app/step-7",
        "https://www.rj.com/files/timetable.pdf",
        "https://www.rj.com/files/menu.docx?v=2",
        "https://www.rj.com/en/newsletter/thanks?email=sara@example.com",
        "/en/manage-booking/K7Q2LM/seats"
      ],
      challenges: [
        { task: "Type the old pattern /booking-?confirmed/ and see the problem: which values fire?", answer: "/booking-?confirmed/", hint: "Exactly as written: /booking-?confirmed/ . Notice the help page lights up too." },
        { task: "Booking confirmation pages only, in any language, without the help page.", answer: "^/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/", hint: "Start with ^ so the value must begin with the language folder." },
        { task: "One-page app steps 1 to 4 only (not step 7).", answer: "^/app/step-[1-4]$", hint: "Use a character range [1-4] and anchor both ends." },
        { task: "File download links for pdf, doc(x), xls(x) or ppt(x) files.", answer: "\\.(pdf|docx?|xlsx?|pptx?)($|\\?)", hint: "A real dot is \\. ; x? makes the x optional; ($|\\?) allows the end or a query string." },
        { task: "Any value that contains an email address.", answer: ".*@.*", hint: "Every email has an @." },
        { task: "Manage Booking pages that contain a 6-character booking code.", answer: "/manage-booking/[A-Z0-9]{6}/", hint: "[A-Z0-9] is one capital letter or digit; {6} repeats it 6 times." }
      ]
    }
  },
  examples: [
    {
      concept: "Reading a RegEx Table row by row",
      example: "The Content group table receives /fr/royal-club/benefits, /en/plan-and-book/fares and /en/careers.",
      walkthrough: [
        "/fr/royal-club/benefits: row 1 no, row 2 no, row 3 yes, stop. Returns Royal Club.",
        "/en/plan-and-book/fares: row 1 no, row 2 yes, stop. Rows 3 and 4 are never checked.",
        "/en/careers: no row matches, so the default value Other is returned.",
        "The Google tag sends the label as content_group, filling GA4's Content group dimension."
      ],
      application: "Put the most specific rows first; a general row placed first would catch pages meant for later rows.",
      check: { q: "What does the table return for /en/careers?", options: ["Other", "Plan and book", "Nothing is sent"], answer: 0, explain: "Slide 54: no row matches, so GTM uses the default value Other." }
    },
    {
      concept: "Capture groups for a clean page path",
      example: "Three customers open /en/manage-booking/K7Q2LM/seats, /en/manage-booking/R4T8WX/seats and /fr/manage-booking/B2N6PD/meals.",
      walkthrough: [
        "Pattern ^/(en|fr|ar)/manage-booking/[A-Z0-9]{6}/(.*)$ saves the language in $1 and the page name in $2.",
        "The booking code has no round brackets, so it is thrown away.",
        "Output /$1/manage-booking/{pnr}/$2 gives /en/manage-booking/{pnr}/seats twice and /fr/manage-booking/{pnr}/meals once.",
        "Two report rows instead of three, and no booking codes in GA4."
      ],
      application: "Whenever a URL contains an ID per customer, rebuild it with capture groups so reports have one row per page.",
      check: { q: "In this pattern, what is $2 for /fr/manage-booking/B2N6PD/meals?", options: ["meals", "fr", "B2N6PD"], answer: 0, explain: "The 2nd round bracket (.*) captures the page name: meals." }
    },
    {
      concept: "Live site only",
      example: "RJ's developers test bookings on staging.rj.com, and the booking tag counts them as real sales.",
      walkthrough: [
        "Condition 1: Page Hostname does not match RegEx ^(staging|dev|test)\\.",
        "Condition 2: Page Path matches RegEx ^/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/",
        "Some Page Views = AND, so both must be true.",
        "www.rj.com/en/booking-confirmed/… fires; staging.rj.com/en/booking-confirmed/… and www.rj.com/en/help/faq do not."
      ],
      application: "Add a test-site condition to every conversion trigger.",
      check: { q: "Why does staging.rj.com/en/booking-confirmed/… not fire?", options: ["Condition 1 is false, and both conditions must be true", "Condition 2 is false", "Staging pages have no Page Path"], answer: 0, explain: "Slide 52: the hostname must NOT start with staging., dev. or test." }
    }
  ],
  flashcards: [
    { id: "c3t4-f1", front: "How does a GTM trigger match regex?", back: "It checks whether the pattern appears ANYWHERE in the value (partial match). Add ^ and $ to stop look-alikes.", slide: 50 },
    { id: "c3t4-f2", front: "File download trigger", back: "Click – Just Links; Click URL matches RegEx (ignore case) \\.(pdf|docx?|xlsx?|pptx?)($|\\?)", slide: 51 },
    { id: "c3t4-f3", front: "Ignore test sites", back: "Page Hostname does not match RegEx ^(staging|dev|test)\\.", slide: 51 },
    { id: "c3t4-f4", front: "Two conditions under Some Page Views", back: "AND: the tag fires only when BOTH are true.", slide: 52 },
    { id: "c3t4-f5", front: "RegEx Table rule", back: "The first matching row wins; if no row matches, the default value is returned.", slide: 53 },
    { id: "c3t4-f6", front: "Lookup Table vs RegEx Table", back: "A Lookup Table needs exact values; a RegEx Table accepts patterns.", slide: 53 },
    { id: "c3t4-f7", front: "content_group", back: "A name GA4 already knows: it fills the built-in Content group dimension, so no custom dimension is needed.", slide: 56 },
    { id: "c3t4-f8", front: "How does GTM number $1, $2?", back: "It numbers round brackets ( ) from left to right. No round brackets = not saved.", slide: 58 },
    { id: "c3t4-f9", front: "Pattern to spot an email in a URL", back: ".*@.* (or .*(@|%40).* if Preview shows %40).", slide: 61 },
    { id: "c3t4-f10", front: "Output of Page URL - safe", back: "https://{{Page Hostname}}{{Page Path}}, default {{Page URL}}; then page_location = {{Page URL - safe}}.", slide: 62 }
  ],
  quiz: [
    { id: "c3t4-q1", type: "tf", difficulty: "easy", prompt: "A GTM trigger with matches RegEx fires if the pattern appears anywhere in the value.", answer: true, explain: "Slide 50: GTM checks whether the pattern appears ANYWHERE in the value.", slide: 50, section: "c3t4-n1" },
    { id: "c3t4-q2", type: "mcq", difficulty: "easy", prompt: "In a RegEx Table, what happens when two rows could both match the input?", options: ["The first matching row wins", "The last matching row wins", "Both outputs are joined", "GTM returns the default value"], answer: 0, explain: "Slide 53: the first matching row wins.", wrongWhy: { "1": "GTM stops at the FIRST row that matches (slide 54).", "2": "A RegEx Table returns one output, not a combination.", "3": "The default value is used only when no row matches." }, slide: 53, section: "c3t4-n3" },
    { id: "c3t4-q3", type: "match", difficulty: "easy", prompt: "Match each goal to its GTM trigger type (slide 51).", options: [["Any booking confirmation", "Page View"], ["File downloads", "Click – Just Links"], ["Steps in a one-page app", "History Change"]], answer: null, explain: "From the trigger recipe table on slide 51.", slide: 51, section: "c3t4-n2" },
    { id: "c3t4-q4", type: "mcq", difficulty: "easy", prompt: "Which of these is PII that must never be sent to GA4?", options: ["An email address", "The page path /en/plan-and-book/fares", "The content group Royal Club", "The hostname www.rj.com"], answer: 0, explain: "Slide 59: PII includes name, email, phone or passport number.", wrongWhy: { "1": "A normal page path does not identify a person.", "2": "A section label does not identify a person.", "3": "The hostname is the site, not a person." }, slide: 59, section: "c3t4-n5" },
    { id: "c3t4-q5", type: "mcq", difficulty: "medium", scenario: "A booking tag uses Page Path matches RegEx /booking-?confirmed/. The marketing team sees bookings that turn out to be visits to /help/en/booking-confirmed/faq.", prompt: "What is the best fix?", options: ["Anchor the pattern, e.g. ^/en/booking-?confirmed/.*\\.aspx$", "Add .* at both ends", "Switch on Ignore Case", "Use a Lookup Table"], answer: 0, explain: "Slide 50: add ^ and $ to stop look-alike pages from firing your tag.", wrongWhy: { "1": ".* at both ends is the GA4 'contains' trick; in a partial-match trigger it changes nothing.", "2": "Capital letters are not the problem; the help page matches already.", "3": "A Lookup Table is a variable for exact values, not a fix for a trigger condition." }, slide: 50, section: "c3t4-n1" },
    { id: "c3t4-q6", type: "multi", difficulty: "medium", prompt: "Which are default settings of a GTM RegEx Table? Select all.", options: ["Ignore Case on", "Full Matches Only on", "Capture Groups on", "Rows checked from last to first"], answer: [0, 1], explain: "Slide 53: Ignore Case and Full Matches Only are on by default. Capture Groups must be enabled, and rows are checked from row 1 down.", slide: 53, section: "c3t4-n3" },
    { id: "c3t4-q7", type: "fill", difficulty: "medium", prompt: "Write the GTM trigger pattern on Page Path that matches only one-page-app steps /app/step-1 to /app/step-4.", answer: ["^/app/step-[1-4]$", "^/app/step-[1234]$", "^/app/step-(1|2|3|4)$", "^/app/step-[1-4]{1}$"], explain: "Slide 51: ^/app/step-[1-4]$. [1-4] is one digit from 1 to 4, and the anchors stop /app/step-1x or /x/app/step-1 from matching.", slide: 51, section: "c3t4-n2" },
    { id: "c3t4-q8", type: "mcq", difficulty: "medium", prompt: "In the Clean page path table, why is Ignore Case unticked?", options: ["To keep [A-Z0-9] to capital letters", "Because capture groups do not work with Ignore Case", "Because Page Path is always lowercase", "To make the table faster"], answer: 0, explain: "Slide 58: Ignore Case unticked keeps [A-Z0-9] to capital letters.", wrongWhy: { "1": "The slide gives no such rule; the reason is the booking code letters.", "2": "The slide does not say that; the code K7Q2LM contains capitals.", "3": "Speed is not mentioned." }, slide: 58, section: "c3t4-n4" },
    { id: "c3t4-q9", type: "mcq", difficulty: "hard", scenario: "A RegEx Table has row 1: ^/(en|fr|ar)/.* → Other pages, and row 2: ^/(en|fr|ar)/royal-club/.* → Royal Club. Every page in reports shows 'Other pages'.", prompt: "What went wrong?", options: ["The general row is first, so it catches pages meant for the later row", "Full Matches Only is switched off", "Royal Club pages have no Page Path", "The default value overrides all rows"], answer: 0, explain: "Slide 54: put the most specific rows first; a general row placed first would catch pages meant for later rows.", wrongWhy: { "1": "Both rows already describe the whole path, so full matching is not the issue.", "2": "Every page has a Page Path, e.g. /fr/royal-club/benefits.", "3": "The default value is used only when no row matches." }, slide: 54, section: "c3t4-n3" },
    { id: "c3t4-q10", type: "mcq", difficulty: "hard", prompt: "With pattern ^/(en|fr|ar)/manage-booking/[A-Z0-9]{6}/(.*)$ and output /$1/manage-booking/{pnr}/$2, what is sent for /fr/manage-booking/B2N6PD/meals?", options: ["/fr/manage-booking/{pnr}/meals", "/fr/manage-booking/B2N6PD/meals", "/B2N6PD/manage-booking/{pnr}/meals", "/fr/manage-booking/{pnr}/B2N6PD"], answer: 0, explain: "$1 = fr, $2 = meals; the booking code has no round brackets and is thrown away.", wrongWhy: { "1": "That is the original path; the code is replaced by {pnr}.", "2": "$1 is the first round bracket, the language, not the code.", "3": "$2 is the second round bracket (.*), the page name meals." }, slide: 57, section: "c3t4-n4" },
    { id: "c3t4-q11", type: "multi", difficulty: "hard", scenario: "Tag Assistant shows Page URL https://www.rj.com/en/newsletter/thanks?email=sara@example.com.", prompt: "Which actions does the chapter recommend? Select all.", options: ["A RegEx Table 'Page URL - safe' with .*@.* and output https://{{Page Hostname}}{{Page Path}}", "Ask developers to change the form to POST", "Switch on GA4 data redaction as a safety net", "Register the email as a custom dimension"], answer: [0, 1, 2], explain: "Slides 59 to 62: clean it in GTM, use POST, and switch on data redaction. PII must never be sent.", slide: 62, section: "c3t4-n5" },
    { id: "c3t4-q12", type: "fill", difficulty: "hard", prompt: "Preview shows the form writes @ as %40. Write the RegEx Table pattern that catches an email written either way.", answer: [".*(@|%40).*", ".*(%40|@).*"], explain: "Slide 61: if GTM Preview shows %40, use .*(@|%40).* instead.", slide: 61, section: "c3t4-n5" }
  ]
},

/* ===================================================================== */
{
  id: "c3t5",
  title: "Beyond GA4: Data Studio and BigQuery",
  slides: [63, 64, 65, 66, 67, 68, 69, 70],
  minutes: 20,
  overview: {
    about: "The same regex patterns used outside GA4: Data Studio calculated fields with REGEXP_EXTRACT and REGEXP_CONTAINS, and BigQuery SQL queries that turn page_location into language and cabin columns, read in the order BigQuery really runs them.",
    why: "GA4 reports only let you choose from the menu. Data Studio and BigQuery let you build new columns and answers, such as bookings by cabin and language, from the same raw page addresses.",
    objectives: [
      "Tell apart REGEXP_EXTRACT, REGEXP_CONTAINS and REGEXP_MATCH.",
      "Create a Cabin calculated field with REGEXP_EXTRACT in Data Studio.",
      "Read a REGEXP_CONTAINS formula, including the (?i) switch.",
      "Explain what BigQuery is and how it differs from GA4 reports.",
      "Follow a BigQuery query through its four steps in the order BigQuery runs them."
    ],
    vocabulary: [
      { term: "Data Studio", def: "Google's dashboard tool, called Looker Studio from 2022 to April 2026.", slide: 63 },
      { term: "BigQuery", def: "Google's online database for very large tables; GA4 can copy every page view and click into it each day.", slide: 68 },
      { term: "REGEXP_EXTRACT", def: "Pulls a piece out of the text (the part inside the brackets).", slide: 64 },
      { term: "REGEXP_CONTAINS", def: "Answers yes/no: does the pattern appear anywhere?", slide: 64 },
      { term: "REGEXP_MATCH", def: "Answers yes/no: does the pattern describe the whole value?", slide: 64 },
      { term: "(?i)", def: "A switch: ignore capital letters. It is NOT a bracket group.", slide: 66 },
      { term: "SQL", def: "The language you use to ask BigQuery questions; it reads almost like English.", slide: 68 }
    ],
    hook: "The manager wants bookings by cabin, but there is no Cabin column anywhere. One regex can make it appear in every row."
  },
  notes: [
    {
      id: "c3t5-n1",
      heading: "Regex in Data Studio: three functions",
      slides: [63, 64],
      fromSlides: [
        { text: "The same patterns work in Data Studio dashboards (called Looker Studio from 2022 to April 2026)", slide: 63 },
        { text: "REGEXP_EXTRACT  pulls a piece out of the text (the part inside the brackets).", slide: 64 },
        { text: "REGEXP_CONTAINS  answers yes/no: does the pattern appear anywhere?", slide: 64 },
        { text: "REGEXP_MATCH  answers yes/no: does the pattern describe the whole value?", slide: 64 },
        { text: "(empty) means the pattern found nothing on that page, which is correct: it is not a booking page.", slide: 64 }
      ],
      simple: "RJ's manager wants a chart of bookings by cabin, but the GA4 data has a Page path column and no Cabin column. Data Studio has three regex functions: REGEXP_EXTRACT pulls out a piece, REGEXP_CONTAINS asks 'is it anywhere?', and REGEXP_MATCH asks 'does it describe the whole value?'.",
      deep: "Data Studio (called Looker Studio from 2022 to April 2026) and BigQuery, Google's database for raw GA4 data, accept the same patterns you have practised. A new field works like adding a formula column in Excel: Data Studio fills it in for every row. The three functions differ in what they return. REGEXP_EXTRACT returns text: the part inside the brackets, such as economy or business. REGEXP_CONTAINS returns yes/no and behaves like a GTM trigger: the pattern may appear anywhere. REGEXP_MATCH also returns yes/no but behaves like GA4's matches regex: the pattern must describe the whole value. In the before/after table, /en/royal-club/join gets (empty) in the Cabin column, which is correct because it is not a booking page.",
      exam: [
        "REGEXP_EXTRACT = text from inside the brackets.",
        "REGEXP_CONTAINS = yes/no, pattern anywhere (like GTM).",
        "REGEXP_MATCH = yes/no, whole value (like GA4).",
        "A calculated field is like a formula column in Excel.",
        "(empty) on a non-booking page is the correct result."
      ],
      definitions: [
        { term: "REGEXP_EXTRACT", def: "Pulls a piece out of the text (the part inside the brackets).", slide: 64 },
        { term: "REGEXP_CONTAINS", def: "Answers yes/no: does the pattern appear anywhere?", slide: 64 },
        { term: "REGEXP_MATCH", def: "Answers yes/no: does the pattern describe the whole value?", slide: 64 }
      ],
      keyFacts: [
        "Data Studio was called Looker Studio from 2022 to April 2026.",
        "BigQuery is Google's database for raw GA4 data."
      ],
      examples: [
        "/fr/reservation-confirmee/business/receipt.aspx → Cabin = business; /en/royal-club/join → (empty)."
      ],
      misconceptions: [
        "REGEXP_CONTAINS and REGEXP_MATCH are not the same: one checks anywhere, the other the whole value."
      ]
    },
    {
      id: "c3t5-n2",
      heading: "Creating the Cabin field with REGEXP_EXTRACT",
      slides: [65],
      fromSlides: [
        { text: "Add a calculated field called Cabin that pulls economy or business out of each page path.", slide: 65 },
        { text: "REGEXP_EXTRACT(Page path and screen class, '/(economy|business)/')", slide: 65 },
        { text: "REGEXP_EXTRACT reads each page path and returns the text saved by the brackets: economy or business. \"Page path and screen class\" is GA4's page path column.", slide: 65 },
        { text: "Save, then make a bar chart: dimension Cabin, metric Key events. The chart shows bookings by cabin.", slide: 65 }
      ],
      simple: "In your report choose Add a field › Add calculated field, name it Cabin, and use the formula REGEXP_EXTRACT(Page path and screen class, '/(economy|business)/'). The brackets save economy or business. Save, then make a bar chart with dimension Cabin and metric Key events.",
      deep: "The editor opens from Add a field › Add calculated field in a report, or from Add dimension › Create field in a chart. Field Name is Cabin, the name of the new column. In the formula, the first input is GA4's page path column, called Page path and screen class, and the second input is the pattern '/(economy|business)/'. The slashes make sure economy or business is a whole folder name, and the round brackets mark the part to return. For each row, REGEXP_EXTRACT reads the page path and returns the text saved by the brackets: economy for /en/booking-confirmed/economy/receipt.aspx, business for /fr/reservation-confirmee/business/receipt.aspx, and (empty) for /en/royal-club/join. When Data Studio shows Formula is valid, save, and build a bar chart with dimension Cabin and metric Key events to show bookings by cabin.",
      exam: [
        "Formula: REGEXP_EXTRACT(Page path and screen class, '/(economy|business)/').",
        "REGEXP_EXTRACT returns the text saved by the brackets.",
        "Page path and screen class = GA4's page path column.",
        "Chart: dimension Cabin, metric Key events."
      ],
      definitions: [
        { term: "Calculated field", def: "A new field Data Studio fills in for every row, like a formula column in Excel.", slide: 64 }
      ],
      keyFacts: [
        "Open from Add a field › Add calculated field, or in a chart: Add dimension › Create field."
      ],
      examples: [
        "/ar/tam-alhajz/economy/receipt.aspx → economy."
      ],
      misconceptions: [
        "REGEXP_EXTRACT does not return TRUE or FALSE; it returns the text inside the brackets."
      ]
    },
    {
      id: "c3t5-n3",
      heading: "A yes/no field with REGEXP_CONTAINS and (?i)",
      slides: [66, 67],
      fromSlides: [
        { text: "REGEXP_CONTAINS answers that question for each page.", slide: 66 },
        { text: "(?i) a switch: ignore capital letters. It is NOT a bracket group.", slide: 66 },
        { text: "The quotation marks ' ' only show where the pattern starts and ends. The comma separates input 1 from input 2.", slide: 66 },
        { text: "REGEXP_CONTAINS(Page path and screen class, '(?i)business')", slide: 67 },
        { text: "✓ Formula is valid      Type: Boolean (true / false)", slide: 67 }
      ],
      simple: "RJ also wants a yes/no column 'Business booking?'. The formula REGEXP_CONTAINS(Page path and screen class, '(?i)business') answers TRUE when the path contains business in any capitalisation and FALSE otherwise. (?i) is a switch, not a bracket group.",
      deep: "Read the formula piece by piece. REGEXP_CONTAINS is the function name: 'does the text contain the pattern?'. Input 1, Page path, is the column to check, one page at a time. The comma separates input 1 from input 2. Input 2, '(?i)business', is the regex: the quotation marks only show where the pattern starts and ends; (?i) is a switch that ignores capital letters and is not a bracket group; business is the word to look for. The answer is TRUE or FALSE. So /en/booking-confirmed/business/receipt.aspx gives TRUE, /fr/reservation-confirmee/Business/receipt.aspx also gives TRUE because (?i) ignores the capital B, and /en/booking-confirmed/economy/receipt.aspx gives FALSE. The field type is Boolean. Use it in a pie chart with dimension Business booking? and metric Key events to see the Business share, or as a filter control so managers can show Business bookings only.",
      exam: [
        "REGEXP_CONTAINS returns TRUE or FALSE (Boolean).",
        "(?i) = ignore capital letters; NOT a bracket group.",
        "Quotes ' ' mark the pattern's start and end; the comma separates the inputs.",
        "Use: pie chart (dimension Business booking?, metric Key events) or a filter control."
      ],
      definitions: [
        { term: "(?i)", def: "A switch: ignore capital letters. It is NOT a bracket group.", slide: 66 }
      ],
      keyFacts: [
        "/fr/reservation-confirmee/Business/receipt.aspx → TRUE, because (?i) ignores the capital B."
      ],
      examples: [
        "Without (?i), the French page with a capital B would give FALSE."
      ],
      misconceptions: [
        "(?i) does not create a capture group, even though it has round brackets.",
        "The quotation marks are not part of the pattern."
      ]
    },
    {
      id: "c3t5-n4",
      heading: "BigQuery in plain words",
      slides: [68],
      fromSlides: [
        { text: "BigQuery is Google's online database for very large tables. GA4 can copy every single page view and click into it each day.", slide: 68 },
        { text: "GA4 reports are like ready-made meals: quick, but you choose from the menu.", slide: 68 },
        { text: "BigQuery is the kitchen with all the raw ingredients: every event, one row each.", slide: 68 },
        { text: "page_location holds the full address. Regex functions turn it into new columns, such as language and cabin, which you can then count.", slide: 68 }
      ],
      simple: "BigQuery is Google's database for huge tables. GA4 can copy every event into it each day, one row per event, and you ask questions in SQL. GA4 reports are ready-made meals; BigQuery is the kitchen with all the raw ingredients. Regex turns page_location into new columns such as language and cabin.",
      deep: "In BigQuery each row is one event, with columns like event_date (20261108), event_name (page_view or click) and page_location (the full address, e.g. https://www.rj.com/fr/reservation-confirmee/business/receipt.aspx). Because page_location holds the full address, regex functions can cut it into new columns such as language and cabin, which you can then count. That is the kind of analysis GA4 reports cannot do, because in reports you choose from the menu. The slide simplifies one detail: in the real GA4 export, page_location sits inside a list column called event_params and needs one extra step (UNNEST) to read.",
      exam: [
        "BigQuery: Google's online database for very large tables; questions in SQL.",
        "GA4 can copy every page view and click into it each day; one row per event.",
        "Analogy: GA4 reports = ready-made meals; BigQuery = kitchen with raw ingredients.",
        "Real export: page_location is inside event_params and needs UNNEST."
      ],
      definitions: [
        { term: "BigQuery", def: "Google's online database for very large tables.", slide: 68 },
        { term: "UNNEST", def: "The extra step needed to read page_location from the event_params list column in the real GA4 export.", slide: 68 }
      ],
      keyFacts: [
        "Example columns: event_date, event_name, page_location."
      ],
      examples: [
        "Row: 20261108 | click | https://www.rj.com/en/royal-club/join."
      ],
      misconceptions: [
        "In the real GA4 export, page_location is not a simple top-level column; it sits inside event_params."
      ]
    },
    {
      id: "c3t5-n5",
      heading: "Reading a BigQuery query step by step",
      slides: [69, 70],
      fromSlides: [
        { text: "BigQuery does NOT run it top to bottom: it runs the four steps in the order shown on the right.", slide: 69 },
        { text: "REGEXP_EXTRACT(page_location, r'/(en|fr|ar)/') AS language,  -- step 3", slide: 69 },
        { text: "WHERE REGEXP_CONTAINS(page_location,  -- step 2", slide: 69 },
        { text: "Text after -- is a comment: BigQuery ignores it. r'...' tells BigQuery to read the pattern exactly as typed.", slide: 69 },
        { text: "The two identical en + economy rows became one row with count 2.", slide: 70 }
      ],
      simple: "The question: how many bookings in each language and cabin? BigQuery runs the query in four steps: 1 FROM takes the table, 2 WHERE keeps only confirmation pages, 3 REGEXP_EXTRACT adds language and cabin columns, 4 GROUP BY and COUNT put identical rows together and count them.",
      deep: "The query is written SELECT ... FROM ... WHERE ... GROUP BY, but BigQuery runs it in another order. Step 1, FROM rj_page_views: take the table of page views. Step 2, WHERE REGEXP_CONTAINS(page_location, r'/(booking-?confirmed|reservation-confirmee|tam-alhajz)/'): keep only rows whose address has a confirmation folder, a yes/no test. Step 3, REGEXP_EXTRACT(page_location, r'/(en|fr|ar)/') AS language and REGEXP_EXTRACT(page_location, r'/(economy|business)/') AS cabin: copy the text saved by the brackets into two new columns. Step 4, GROUP BY language, cabin with COUNT(*) AS bookings: put identical language + cabin rows together and count them. Text after -- is a comment that BigQuery ignores, and r'...' tells BigQuery to read the pattern exactly as typed. Slide 70 follows six page views: step 2 removes fares and royal-club (2 rows), step 3 adds language and cabin to the four left, and step 4 gives en | economy | 2, ar | economy | 1, en | business | 1, because the two identical en + economy rows become one row with count 2.",
      exam: [
        "Run order: 1 FROM → 2 WHERE → 3 REGEXP_EXTRACT (SELECT columns) → 4 GROUP BY + COUNT.",
        "WHERE uses REGEXP_CONTAINS (yes/no) to keep confirmation pages.",
        "REGEXP_EXTRACT copies bracket text into new columns language and cabin.",
        "-- starts a comment; r'...' = read the pattern exactly as typed.",
        "Result: en economy 2, ar economy 1, en business 1."
      ],
      definitions: [
        { term: "r'...'", def: "Tells BigQuery to read the pattern exactly as typed.", slide: 69 },
        { term: "-- comment", def: "Text after -- is a comment: BigQuery ignores it.", slide: 69 }
      ],
      keyFacts: [
        "Six page views in, 2 removed by WHERE, 3 result rows out.",
        "The table in the example is rj_page_views."
      ],
      examples: [
        "/en/plan-and-book/fares is removed in step 2 because it has no confirmation folder."
      ],
      misconceptions: [
        "BigQuery does not run the query top to bottom; SELECT's columns are made in step 3, after FROM and WHERE.",
        "COUNT(*) does not count all page views; it counts the rows left in each language + cabin group."
      ]
    }
  ],
  steps: [
    {
      title: "Step 1: FROM",
      what: "Take the table of page views (FROM rj_page_views).",
      why: "Every later step works on these rows.",
      practical: "In the example, six page views start the process.",
      check: { q: "Which step runs first in BigQuery?", options: ["FROM", "SELECT", "GROUP BY"], answer: 0, explain: "Slide 69: FROM is step 1." }
    },
    {
      title: "Step 2: WHERE ... REGEXP_CONTAINS",
      what: "Keep only rows whose address has a confirmation folder, using r'/(booking-?confirmed|reservation-confirmee|tam-alhajz)/'.",
      why: "Only confirmation pages are bookings.",
      practical: "2 rows removed: fares and royal-club are not confirmation pages.",
      visual: "/(booking-?confirmed|reservation-confirmee|tam-alhajz)/",
      check: { q: "What kind of answer does REGEXP_CONTAINS give in the WHERE step?", options: ["Yes/no", "A piece of text", "A number"], answer: 0, explain: "Slide 69: a yes/no test." }
    },
    {
      title: "Step 3: REGEXP_EXTRACT",
      what: "Copy the text saved by the brackets into two new columns: language (r'/(en|fr|ar)/') and cabin (r'/(economy|business)/').",
      why: "New columns let you count by language and cabin.",
      practical: "/ar/tam-alhajz/economy/… becomes language ar, cabin economy.",
      check: { q: "What does REGEXP_EXTRACT put in the language column for /en/booking-confirmed/business/…?", options: ["en", "business", "TRUE"], answer: 0, explain: "The brackets in /(en|fr|ar)/ save en." }
    },
    {
      title: "Step 4: GROUP BY + COUNT",
      what: "Put identical language + cabin rows together and count them.",
      why: "This turns rows into the answer: bookings per language and cabin.",
      practical: "Result: en | economy | 2, ar | economy | 1, en | business | 1.",
      check: { q: "Why does en + economy show 2?", options: ["Two identical en + economy rows became one row with count 2", "en pages count double", "Economy is the default cabin"], answer: 0, explain: "Slide 70: the two identical en + economy rows became one row with count 2." }
    }
  ],
  visual: {
    type: "regex",
    title: "REGEXP_CONTAINS tester",
    caption: "REGEXP_CONTAINS answers yes if the pattern appears anywhere, the same as GTM's partial match. Note: (?i) is not used here; JavaScript writes case-insensitive matches differently, so use [Bb] instead.",
    slides: [64, 66, 69, 70],
    data: {
      mode: "partial",
      samples: [
        "/en/plan-and-book/fares",
        "/en/booking-confirmed/economy/receipt.aspx",
        "/ar/tam-alhajz/economy/receipt.aspx",
        "/en/booking-confirmed/business/receipt.aspx",
        "/en/royal-club/join",
        "/fr/reservation-confirmee/Business/receipt.aspx",
        "/ar/tam-alhajz/business/receipt.aspx"
      ],
      challenges: [
        { task: "The WHERE test: keep only pages with a confirmation folder.", answer: "/(booking-?confirmed|reservation-confirmee|tam-alhajz)/", hint: "List the three folder names in brackets, separated by |, with a slash on each side." },
        { task: "Pages whose cabin folder is economy.", answer: "/economy/", hint: "Put slashes around the word so it is a whole folder." },
        { task: "Arabic-language pages only.", answer: "/ar/", hint: "The language folder sits between two slashes." },
        { task: "Pages containing business with a small or capital B (what (?i)business does in Data Studio).", answer: "[Bb]usiness", hint: "A character list [Bb] accepts either letter." },
        { task: "English confirmation pages only (the value starts with /en/booking-confirmed/).", answer: "^/en/booking-?confirmed/", hint: "In a 'contains' test, use ^ to say where the value must start." }
      ]
    }
  },
  examples: [
    {
      concept: "Bookings by cabin in Data Studio",
      example: "RJ's marketing manager wants a dashboard chart of bookings by cabin, but there is no Cabin column.",
      walkthrough: [
        "Add a field › Add calculated field; Field Name Cabin.",
        "Formula REGEXP_EXTRACT(Page path and screen class, '/(economy|business)/').",
        "Each row gets economy, business or (empty) for non-booking pages.",
        "Bar chart: dimension Cabin, metric Key events."
      ],
      application: "Use REGEXP_EXTRACT whenever the piece you want to report on is hidden inside a URL.",
      check: { q: "What does the Cabin field contain for /en/royal-club/join?", options: ["(empty)", "economy", "FALSE"], answer: 0, explain: "Slide 64: (empty) means the pattern found nothing on that page, which is correct." }
    },
    {
      concept: "Following the BigQuery query through its steps",
      example: "Six page views go into the query that counts bookings by language and cabin.",
      walkthrough: [
        "Step 1 FROM: all six page views.",
        "Step 2 WHERE: fares and royal-club are removed, four rows stay.",
        "Step 3 REGEXP_EXTRACT: language and cabin columns are added.",
        "Step 4 GROUP BY + COUNT: en economy 2, ar economy 1, en business 1."
      ],
      application: "When reading any query, start from FROM and WHERE, not from SELECT.",
      check: { q: "How many result rows are left after step 4?", options: ["3", "4", "6"], answer: 0, explain: "Slide 70: en economy, ar economy and en business." }
    }
  ],
  flashcards: [
    { id: "c3t5-f1", front: "REGEXP_EXTRACT", back: "Pulls a piece out of the text: the part inside the brackets.", slide: 64 },
    { id: "c3t5-f2", front: "REGEXP_CONTAINS", back: "Yes/no: does the pattern appear anywhere?", slide: 64 },
    { id: "c3t5-f3", front: "REGEXP_MATCH", back: "Yes/no: does the pattern describe the whole value?", slide: 64 },
    { id: "c3t5-f4", front: "Cabin field formula", back: "REGEXP_EXTRACT(Page path and screen class, '/(economy|business)/')", slide: 65 },
    { id: "c3t5-f5", front: "(?i)", back: "A switch: ignore capital letters. It is NOT a bracket group.", slide: 66 },
    { id: "c3t5-f6", front: "GA4 reports vs BigQuery", back: "Reports = ready-made meals (choose from the menu). BigQuery = kitchen with all the raw ingredients: every event, one row each.", slide: 68 },
    { id: "c3t5-f7", front: "BigQuery run order", back: "1 FROM, 2 WHERE, 3 REGEXP_EXTRACT (new columns), 4 GROUP BY + COUNT.", slide: 69 },
    { id: "c3t5-f8", front: "r'...' in BigQuery", back: "Tells BigQuery to read the pattern exactly as typed.", slide: 69 },
    { id: "c3t5-f9", front: "Data Studio's old name", back: "Looker Studio, from 2022 to April 2026.", slide: 63 }
  ],
  quiz: [
    { id: "c3t5-q1", type: "match", difficulty: "easy", prompt: "Match each Data Studio function to what it returns.", options: [["REGEXP_EXTRACT", "The part inside the brackets"], ["REGEXP_CONTAINS", "Yes/no: pattern appears anywhere"], ["REGEXP_MATCH", "Yes/no: pattern describes the whole value"]], answer: null, explain: "Slide 64 lists the three functions.", slide: 64, section: "c3t5-n1" },
    { id: "c3t5-q2", type: "tf", difficulty: "easy", prompt: "In '(?i)business', the (?i) part is a bracket group that saves text.", answer: false, explain: "Slide 66: (?i) is a switch to ignore capital letters. It is NOT a bracket group.", slide: 66, section: "c3t5-n3" },
    { id: "c3t5-q3", type: "mcq", difficulty: "easy", prompt: "What is BigQuery?", options: ["Google's online database for very large tables", "A GA4 report filter", "A GTM variable type", "Data Studio's old name"], answer: 0, explain: "Slide 68: BigQuery is Google's online database for very large tables.", wrongWhy: { "1": "Report filters are inside GA4 reports.", "2": "GTM variables include the RegEx Table, not BigQuery.", "3": "Data Studio's old name was Looker Studio." }, slide: 68, section: "c3t5-n4" },
    { id: "c3t5-q4", type: "mcq", difficulty: "medium", prompt: "What does REGEXP_EXTRACT(Page path and screen class, '/(economy|business)/') return for /fr/reservation-confirmee/business/receipt.aspx?", options: ["business", "TRUE", "/business/", "fr"], answer: 0, explain: "REGEXP_EXTRACT returns the text saved by the brackets: business.", wrongWhy: { "1": "TRUE/FALSE is what REGEXP_CONTAINS returns.", "2": "The slashes are outside the brackets, so they are not returned.", "3": "The pattern only has brackets around economy|business." }, slide: 65, section: "c3t5-n2" },
    { id: "c3t5-q5", type: "fill", difficulty: "medium", prompt: "Complete the Data Studio formula so it is TRUE for Business and business: REGEXP_CONTAINS(Page path and screen class, '___business')", answer: ["(?i)"], explain: "Slide 67: '(?i)business'; (?i) ignores capital letters.", slide: 67, section: "c3t5-n3" },
    { id: "c3t5-q6", type: "multi", difficulty: "medium", prompt: "Which are true about the BigQuery query on slide 69? Select all.", options: ["Text after -- is a comment that BigQuery ignores", "r'...' tells BigQuery to read the pattern exactly as typed", "BigQuery runs it top to bottom", "WHERE uses REGEXP_CONTAINS as a yes/no test"], answer: [0, 1, 3], explain: "Slide 69. BigQuery does NOT run it top to bottom.", slide: 69, section: "c3t5-n5" },
    { id: "c3t5-q7", type: "mcq", difficulty: "medium", scenario: "A manager wants a filter control on a Data Studio dashboard so she can show Business bookings only.", prompt: "Which field fits best?", options: ["A Boolean field: REGEXP_CONTAINS(Page path and screen class, '(?i)business')", "A Cabin field with REGEXP_MATCH(Page path and screen class, 'business')", "A BigQuery GROUP BY", "A GTM RegEx Table"], answer: 0, explain: "Slide 67: the Business booking? yes/no field can be used in a filter control so managers can show Business bookings only.", wrongWhy: { "1": "REGEXP_MATCH needs the whole value to fit, so 'business' alone would be FALSE for every page path.", "2": "GROUP BY counts rows in SQL; it is not a dashboard filter field.", "3": "A RegEx Table is a GTM variable, not a Data Studio field." }, slide: 67, section: "c3t5-n3" },
    { id: "c3t5-q8", type: "tf", difficulty: "medium", prompt: "In the real GA4 export, page_location sits inside a list column called event_params and needs an extra step (UNNEST) to read.", answer: true, explain: "Slide 68 notes this simplification.", slide: 68, section: "c3t5-n4" },
    { id: "c3t5-q9", type: "mcq", difficulty: "hard", prompt: "In which order does BigQuery run the slide 69 query?", options: ["FROM → WHERE → REGEXP_EXTRACT → GROUP BY + COUNT", "SELECT → FROM → WHERE → GROUP BY", "WHERE → FROM → GROUP BY → REGEXP_EXTRACT", "GROUP BY → REGEXP_EXTRACT → WHERE → FROM"], answer: 0, explain: "Slide 69: steps 1 FROM, 2 WHERE, 3 REGEXP_EXTRACT, 4 GROUP BY + COUNT.", wrongWhy: { "1": "That is the written order; BigQuery does not run it top to bottom.", "2": "BigQuery must take the table (FROM) before it can filter rows.", "3": "Grouping is the last step, after the columns exist." }, slide: 69, section: "c3t5-n5" },
    { id: "c3t5-q10", type: "mcq", difficulty: "hard", scenario: "Six page views enter the query: fares, two en economy confirmations, one ar economy, one en business, and royal-club.", prompt: "What is the result?", options: ["en economy 2, ar economy 1, en business 1", "en economy 1, ar economy 1, en business 1", "6 rows, one per page view", "en 3, ar 1"], answer: 0, explain: "Slide 70: WHERE removes 2 rows, and the two identical en + economy rows become one row with count 2.", wrongWhy: { "1": "GROUP BY + COUNT counts the two identical en + economy rows as 2.", "2": "WHERE removes fares and royal-club, and GROUP BY merges identical rows.", "3": "The query groups by language AND cabin, not language alone." }, slide: 70, section: "c3t5-n5" },
    { id: "c3t5-q11", type: "fill", difficulty: "hard", prompt: "Write the BigQuery pattern (without r'' quotes) for the language column, returning en, fr or ar from a folder like /en/.", answer: ["/(en|fr|ar)/", "/(en|ar|fr)/", "/(fr|en|ar)/", "/(fr|ar|en)/", "/(ar|en|fr)/", "/(ar|fr|en)/"], explain: "Slide 69: REGEXP_EXTRACT(page_location, r'/(en|fr|ar)/'); the brackets mark the part copied into the column.", slide: 69, section: "c3t5-n5" },
    { id: "c3t5-q12", type: "multi", difficulty: "hard", prompt: "Which return a yes/no answer? Select all.", options: ["REGEXP_CONTAINS", "REGEXP_MATCH", "REGEXP_EXTRACT", "COUNT(*)"], answer: [0, 1], explain: "Slide 64: REGEXP_CONTAINS and REGEXP_MATCH answer yes/no; REGEXP_EXTRACT returns text and COUNT returns a number.", slide: 64, section: "c3t5-n1" }
  ]
},

/* ===================================================================== */
{
  id: "c3t6",
  title: "Practice and Review",
  slides: [71, 72, 73, 74, 75, 76],
  minutes: 20,
  overview: {
    about: "The nine common regex mistakes and their fixes, a one-page cheat sheet of symbols, and eight exercises with explained answers covering GA4 full matching and GTM partial matching.",
    why: "Almost every regex problem comes from one of a few mistakes. Practising them once, with the answers explained, is the fastest way to stop seeing 'zero results' or tags firing on the wrong pages.",
    objectives: [
      "Recognise the nine common mistakes from what you see, and apply the fix.",
      "Use the cheat sheet symbols correctly: \\ | ? ( ) [ ] {n} . + * .* ^ $.",
      "Write GA4 (full match) and GTM (anchored) versions of the same pattern.",
      "Explain why a pattern with an empty option matches every value."
    ],
    vocabulary: [
      { term: "\\ (backslash)", def: "Makes a special character a real character, e.g. receipt\\.aspx.", slide: 73 },
      { term: "| (pipe)", def: "Or: (economy|business) matches economy or business.", slide: 73 },
      { term: "? (question mark)", def: "Optional: booking-?confirmed matches both spellings.", slide: 73 },
      { term: "[ ] (character list)", def: "One character from a list, e.g. [0-9] = any single digit.", slide: 73 },
      { term: "{n}", def: "Repeat n times, e.g. [A-Z0-9]{6} = a PNR such as K7Q2LM.", slide: 73 },
      { term: "^ $", def: "Start / end: ^/$ = the home page only.", slide: 73 },
      { term: "Lookahead", def: "(?= or (?! from tutorials; rejected, so rewrite the pattern without it.", slide: 72 }
    ],
    hook: "Nine mistakes cause almost every regex problem. Learn to spot them by their symptoms and you can debug most patterns in a minute."
  },
  notes: [
    {
      id: "c3t6-n1",
      heading: "Common mistakes and how to fix them",
      slides: [71, 72],
      fromSlides: [
        { text: "Almost every regex problem comes from one of these nine mistakes.", slide: 72 },
        { text: "Old partial pattern used in GA4 | Zero results | Add .* at the start and end", slide: 72 },
        { text: "Dot without backslash | receipt.aspx also matches receiptXaspx | receipt\\.aspx", slide: 72 },
        { text: "Pipe at the end | a|b| matches everything | Remove the last pipe", slide: 72 },
        { text: "Wrong GTM variable | Pattern \"never matches\" | Compare Page Path and Page URL in Preview", slide: 72 }
      ],
      simple: "Each mistake has a symptom. Zero results in GA4: add .* at the start and end. Too many matches: check for an unescaped dot, OR without brackets, or a pipe at the end. Tag fires on look-alikes: add ^ and $ in GTM. 'Never matches': check the capital letters, the variable, or a lookahead the tool rejects.",
      deep: "The table on slide 72 is organised by what you see. 1) An old partial pattern used in GA4 gives zero results; add .* at the start and end. 2) A dot without a backslash means any character, so receipt.aspx also matches receiptXaspx; write receipt\\.aspx. 3) A missing backslash before d: \\.d* looks for the letter d; write \\.\\d*. 4) OR without brackets: ^/a|b$ means '^/a' OR 'b$', so it matches far too much; write ^/(a|b)$. 5) A pipe at the end: a|b| has an empty last option that matches everything; remove the last pipe. 6) No anchors in GTM: the tag fires on look-alike pages; add ^ and $. 7) Capital letters differ: Facebook is not matched by facebook; lowercase in GTM, or (?i) in BigQuery. 8) A lookahead from a tutorial, (?= or (?!, gets the pattern rejected; rewrite it without them. 9) The wrong GTM variable makes a pattern 'never match'; compare Page Path and Page URL in Preview.",
      exam: [
        "Zero results in GA4 → add .* at start and end.",
        "Unescaped dot → receipt\\.aspx; missing backslash before d → \\.\\d*.",
        "OR without brackets → ^/(a|b)$; pipe at the end → remove it.",
        "No anchors in GTM → add ^ and $.",
        "Case → lowercase in GTM, (?i) in BigQuery; lookahead → rewrite without (?= or (?!; wrong variable → compare in Preview."
      ],
      definitions: [
        { term: "Dot without backslash", def: "receipt.aspx also matches receiptXaspx. Fix: receipt\\.aspx", slide: 72 },
        { term: "OR without brackets", def: "^/a|b$ matches far too much. Fix: ^/(a|b)$", slide: 72 }
      ],
      keyFacts: [
        "The chapter lists nine mistakes.",
        "Lookahead patterns (?= and (?! are rejected; rewrite without them."
      ],
      examples: [
        "A GTM trigger 'never matches' a ?utm_source value because it tests Page Path, which has no query string; Preview shows the value is only in Page URL."
      ],
      misconceptions: [
        "A trailing pipe is not harmless: the empty option matches everything.",
        "\\.d* is not 'a dot and digits'; without the backslash before d it looks for the letter d."
      ]
    },
    {
      id: "c3t6-n2",
      heading: "Cheat sheet of regex symbols",
      slides: [73],
      fromSlides: [
        { text: "\\ | real special character | receipt\\.aspx | receipt.aspx", slide: 73 },
        { text: "( ) | group | /receipt(-print)? | /receipt, /receipt-print", slide: 73 },
        { text: "{n} | repeat n times | [A-Z0-9]{6} | K7Q2LM (a PNR)", slide: 73 },
        { text: "+ * | one or more / zero or more | [0-9]+ | 7, 2026", slide: 73 },
        { text: "^ $ | start / end | ^/$ | the home page only", slide: 73 }
      ],
      simple: "Ten symbols cover almost everything: \\ makes a special character real, | means or, ? means optional, ( ) groups, [ ] picks one character from a list, {n} repeats, . is any one character, + is one or more, * is zero or more, .* is anything, and ^ $ mark start and end.",
      deep: "Read the cheat sheet as 'symbol, meaning, example, matches'. \\ turns a special character into a real one: receipt\\.aspx matches receipt.aspx. | means or: (economy|business). ? makes the item before it optional: booking-?confirmed matches both spellings. ( ) groups, so ? or | can apply to a whole piece: /receipt(-print)? matches /receipt and /receipt-print. [ ] is one character from a list: [0-9] is any single digit. {n} repeats n times: [A-Z0-9]{6} matches a PNR such as K7Q2LM. . is any one character: r.ceipt matches receipt and rXceipt. + is one or more and * zero or more: [0-9]+ matches 7 and 2026. .* is anything: .*business.* is any value containing business. ^ and $ are start and end: ^/$ is the home page only.",
      exam: [
        "\\ = real special character; . = any one character.",
        "? = optional; ( ) = group; | = or.",
        "[ ] = one character from a list; {n} = repeat n times.",
        "+ = one or more; * = zero or more; .* = anything.",
        "^ = start; $ = end; ^/$ = home page only."
      ],
      definitions: [
        { term: ".", def: "Any one character: r.ceipt matches receipt, rXceipt.", slide: 73 },
        { term: ".*", def: "Anything: .*business.* = any value containing business.", slide: 73 }
      ],
      keyFacts: [
        "[A-Z0-9]{6} matches a PNR such as K7Q2LM.",
        "/receipt(-print)? matches /receipt and /receipt-print."
      ],
      examples: [
        "[0-9]+ matches 7 and 2026, but not an empty value, because + needs at least one digit."
      ],
      misconceptions: [
        "? does not mean 'any character'; it makes the previous item optional. Any one character is the dot.",
        "[ ] does not match a whole word; it matches exactly one character from the list."
      ]
    },
    {
      id: "c3t6-n3",
      heading: "Exercises with explained answers",
      slides: [74, 75, 76],
      fromSlides: [
        { text: "Write each pattern for GA4 (full match) unless the exercise says GTM.", slide: 74 },
        { text: "3 | 10\\.20\\.30\\.[1-9] | One digit from 1 to 9; full match excludes .10 and above.", slide: 75 },
        { text: "4 | ^/(en|ar)/blog/.+ | The + requires at least one character after /blog/, so the main page is excluded.", slide: 75 },
        { text: "7 | form_.*_submit | Full match in GA4 already fixes the start and the end.", slide: 76 },
        { text: "8 | Use .*(chatgpt|perplexity).* | The empty option plus * and .* lets the pattern match every value.", slide: 76 }
      ],
      simple: "The exercises practise both tools. For GA4 you rely on full matching and add .* where you mean 'contains'. For GTM on Page Path you add ^ and $ instead. Small symbols do a lot: [1-9] stops at 9, + needs at least one character, and an empty option makes a pattern match everything.",
      deep: "Answer 1 (GA4, page_location): .*/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/business/receipt\\.aspx.* , the full pattern with business only, with .* at both ends because GA4 needs a full match. Answer 2 (GTM, Page Path): ^/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/business/receipt\\.aspx$ , because Page Path has no domain or query string and GTM needs anchors. Answer 3: 10\\.20\\.30\\.[1-9] , one digit from 1 to 9; full match excludes .10 and above. Answer 4: ^/(en|ar)/blog/.+ , where + requires at least one character after /blog/, so the main page is excluded. Answer 5: .*(google|bing|duckduckgo).* , greedy on purpose so one word covers google.jo, google.co.uk and so on. Answer 6: Click URL matches RegEx (ignore case) \\.(docx?|xlsx?|pptx?)($|\\?) , where x? covers old and new formats and ($|\\?) allows a query string after the file name. Answer 7: form_.*_submit , because full match in GA4 already fixes the start and the end. Answer 8: .*(chatgpt|perplexity|)*.* is bad because the empty option plus * and .* lets it match every value; use .*(chatgpt|perplexity).*.",
      exam: [
        "GA4 page_location: .* at both ends; GTM Page Path: ^ and $.",
        "10\\.20\\.30\\.[1-9]: full match excludes .10 and above.",
        "^/(en|ar)/blog/.+ excludes the blog's main page.",
        "form_.*_submit needs no anchors in GA4.",
        ".*(chatgpt|perplexity|)*.* matches every value; use .*(chatgpt|perplexity).*"
      ],
      definitions: [
        { term: "Greedy on purpose", def: ".*(google|bing|duckduckgo).*: one word covers google.jo, google.co.uk and so on.", slide: 75 }
      ],
      keyFacts: [
        "Exercise 6: x? covers old and new formats; ($|\\?) allows a query string after the file name.",
        "Exercise 2: Page Path has no domain or query string."
      ],
      examples: [
        "/en/blog/ does not match ^/(en|ar)/blog/.+ but /en/blog/new-routes does."
      ],
      misconceptions: [
        "The same booking pattern cannot be copied unchanged between GA4 and GTM; GA4 needs .*, GTM Page Path needs anchors.",
        "Adding more options with a trailing | does not make a pattern more flexible; it makes it match everything."
      ]
    }
  ],
  steps: [],
  visual: {
    type: "regex",
    title: "Practice tester (GA4 full match)",
    caption: "Exercises from slides 74 to 76. GA4 full match: the pattern must describe the whole value.",
    slides: [74, 75, 76],
    data: {
      mode: "full",
      samples: [
        "10.20.30.5",
        "10.20.30.12",
        "form_contact_submit",
        "form_newsletter_submit",
        "form_contact_start",
        "/en/blog/",
        "/en/blog/new-routes",
        "/ar/blog/summer-offers",
        "/fr/blog/new-routes",
        "google.co.uk"
      ],
      challenges: [
        { task: "Internal traffic from 10.20.30.1 to 10.20.30.9.", answer: "10\\.20\\.30\\.[1-9]", hint: "Escape the dots, and use [1-9] for one digit. Full match excludes .10 and above." },
        { task: "Event names that start with form_ and end with _submit.", answer: "form_.*_submit", hint: "Full match already fixes the start and the end." },
        { task: "Any page in the /en/ or /ar/ blog, but not the blog's main page.", answer: "^/(en|ar)/blog/.+", hint: "+ requires at least one character after /blog/." },
        { task: "Session source from Google, Bing or DuckDuckGo, in any country.", answer: ".*(google|bing|duckduckgo).*", hint: "Greedy on purpose: .* on both sides covers google.co.uk." },
        { task: "Any blog page in any of the three languages, including the main page.", answer: "/(en|fr|ar)/blog/.*", hint: "* allows zero characters after /blog/." }
      ]
    }
  },
  examples: [
    {
      concept: "Why a pipe at the end breaks a pattern",
      example: "Someone writes .*(chatgpt|perplexity|)*.* to find AI chatbot sources.",
      walkthrough: [
        "The last option after the final | is empty, and an empty option matches nothing at all, which always fits.",
        "The * after the group and the .* on both sides then let any value fit.",
        "So the pattern matches every source, not just chatbots.",
        "Fix: remove the last pipe and the extra *: .*(chatgpt|perplexity).*"
      ],
      application: "If a pattern suddenly matches every row, look for a trailing | or an empty option.",
      check: { q: "What does .*(chatgpt|perplexity|)*.* match?", options: ["Every value", "Only chatgpt and perplexity", "Nothing"], answer: 0, explain: "Slide 76: the empty option plus * and .* lets the pattern match every value." }
    },
    {
      concept: "Same goal, two tools",
      example: "Business-class receipts in all three languages, as a GA4 condition on page_location and as a GTM trigger on Page Path.",
      walkthrough: [
        "Core: /(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/business/receipt\\.aspx",
        "GA4 page_location: add .* at the start (domain) and .* at the end (query string).",
        "GTM Page Path: add ^ at the start and $ at the end; there is no domain or query string.",
        "Both use \\. so the dot in receipt.aspx is a real dot."
      ],
      application: "Write the core pattern once, then wrap it for the tool: .* ... .* for GA4, ^ ... $ for GTM.",
      check: { q: "Which wrapper does the GTM Page Path version need?", options: ["^ at the start and $ at the end", ".* at both ends", "(?i) at the start"], answer: 0, explain: "Slide 75: Page Path has no domain or query string, and GTM needs anchors." }
    }
  ],
  flashcards: [
    { id: "c3t6-f1", front: "GA4 shows zero results with an old pattern", back: "Old partial pattern used in GA4. Fix: add .* at the start and end.", slide: 72 },
    { id: "c3t6-f2", front: "receipt.aspx also matches receiptXaspx", back: "Dot without backslash. Fix: receipt\\.aspx", slide: 72 },
    { id: "c3t6-f3", front: "^/a|b$ matches far too much", back: "OR without brackets. Fix: ^/(a|b)$", slide: 72 },
    { id: "c3t6-f4", front: "a|b| matches everything", back: "Pipe at the end. Fix: remove the last pipe.", slide: 72 },
    { id: "c3t6-f5", front: "Pattern rejected after copying from a tutorial", back: "Lookahead. Fix: rewrite without (?= or (?!", slide: 72 },
    { id: "c3t6-f6", front: "? vs .", back: "? = optional (booking-?confirmed); . = any one character (r.ceipt).", slide: 73 },
    { id: "c3t6-f7", front: "[A-Z0-9]{6}", back: "Six characters, each a capital letter or digit: a PNR such as K7Q2LM.", slide: 73 },
    { id: "c3t6-f8", front: "^/(en|ar)/blog/.+", back: "Any /en/ or /ar/ blog page except the main page: + requires at least one character after /blog/.", slide: 75 },
    { id: "c3t6-f9", front: "Why is form_.*_submit enough in GA4?", back: "Full match in GA4 already fixes the start and the end.", slide: 76 }
  ],
  quiz: [
    { id: "c3t6-q1", type: "match", difficulty: "easy", prompt: "Match each symbol to its meaning (cheat sheet).", options: [["?", "optional"], ["|", "or"], ["[ ]", "one character from a list"], ["^ $", "start / end"]], answer: null, explain: "Slide 73 cheat sheet.", slide: 73, section: "c3t6-n2" },
    { id: "c3t6-q2", type: "mcq", difficulty: "easy", prompt: "Which value does ^/$ match?", options: ["The home page only", "Every page", "Any page ending in /", "No page"], answer: 0, explain: "Slide 73: ^/$ = the home page only.", wrongWhy: { "1": "^ and $ force the whole value to be just /.", "2": "/en/blog/ ends in / but has more characters after ^/.", "3": "The home page / matches." }, slide: 73, section: "c3t6-n2" },
    { id: "c3t6-q3", type: "tf", difficulty: "easy", prompt: "In regex, receipt.aspx also matches receiptXaspx.", answer: true, explain: "Slide 72: a dot without backslash means any character. Write receipt\\.aspx.", slide: 72, section: "c3t6-n1" },
    { id: "c3t6-q4", type: "mcq", difficulty: "medium", scenario: "A GTM click trigger uses Click URL matches RegEx \\.(pdf|docx?). It fires on report.pdf but not on Report.PDF.", prompt: "Which mistake from the table is this, and what is the fix?", options: ["Capital letters differ: choose matches RegEx (ignore case)", "Pipe at the end: remove the last pipe", "Old partial pattern in GA4: add .* at both ends", "Lookahead: rewrite without (?="], answer: 0, explain: "Slides 72 and 50: capital letters differ; use matches RegEx (ignore case), as in the download recipe.", wrongWhy: { "1": "There is no trailing pipe in \\.(pdf|docx?).", "2": "This is a GTM trigger, which already matches partially.", "3": "The pattern has no lookahead." }, slide: 72, section: "c3t6-n1" },
    { id: "c3t6-q5", type: "multi", difficulty: "medium", prompt: "Which values does /receipt(-print)? match fully? Select all.", options: ["/receipt", "/receipt-print", "/receipt-", "/receipts"], answer: [0, 1], explain: "Slide 73: ( ) groups -print, and ? makes the whole group optional: /receipt and /receipt-print.", slide: 73, section: "c3t6-n2" },
    { id: "c3t6-q6", type: "fill", difficulty: "medium", prompt: "Write the GA4 pattern (full match) for event names that start with form_ and end with _submit.", answer: ["form_.*_submit", "^form_.*_submit$"], explain: "Slide 76: form_.*_submit; full match in GA4 already fixes the start and the end.", slide: 76, section: "c3t6-n3" },
    { id: "c3t6-q7", type: "mcq", difficulty: "medium", prompt: "Why does 10\\.20\\.30\\.[1-9] in GA4 not match 10.20.30.12?", options: ["[1-9] is one digit, and full match requires the value to end there", "The dots are escaped", "GA4 cannot match IP addresses", "[1-9] excludes the digit 2"], answer: 0, explain: "Slide 75: one digit from 1 to 9; full match excludes .10 and above.", wrongWhy: { "1": "Escaped dots are correct: they mean real dots.", "2": "GA4 has IP address matches regular expression for internal traffic.", "3": "[1-9] includes 2; the problem is the extra digit." }, slide: 75, section: "c3t6-n3" },
    { id: "c3t6-q8", type: "fill", difficulty: "hard", prompt: "Write the GA4 internal traffic pattern for 10.20.30.1 to 10.20.30.9.", answer: ["10\\.20\\.30\\.[1-9]", "10\\.20\\.30\\.[123456789]", "^10\\.20\\.30\\.[1-9]$", "10\\.20\\.30\\.(1|2|3|4|5|6|7|8|9)"], explain: "Slide 75: 10\\.20\\.30\\.[1-9]. Escape each dot; [1-9] is one digit from 1 to 9.", slide: 75, section: "c3t6-n3" },
    { id: "c3t6-q9", type: "mcq", difficulty: "hard", prompt: "Why is .*(chatgpt|perplexity|)*.* a bad pattern?", options: ["The empty option plus * and .* lets it match every value", "It is too short to match chatgpt.com", "Brackets are not allowed in GA4", "It only matches perplexity"], answer: 0, explain: "Slide 76: the empty option plus * and .* lets the pattern match every value. Use .*(chatgpt|perplexity).*.", wrongWhy: { "1": "It matches chatgpt.com, and everything else too.", "2": "Brackets are allowed; the cheat sheet uses them.", "3": "It matches every value, not just perplexity." }, slide: 76, section: "c3t6-n3" },
    { id: "c3t6-q10", type: "mcq", difficulty: "hard", scenario: "A GTM trigger on Page Path uses ^/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/business/receipt\\.aspx$. An analyst copies it unchanged into a GA4 condition on page_location, and it counts zero.", prompt: "What should the GA4 version look like?", options: [".*/(en|fr|ar)/(booking-?confirmed|reservation-confirmee|tam-alhajz)/business/receipt\\.aspx.*", "The same pattern without the backslash", "/business/", "^/business/receipt\\.aspx$"], answer: 0, explain: "Slide 75: page_location is the full URL with domain and query string, so GA4 needs .* at both ends instead of anchors.", wrongWhy: { "1": "Removing the backslash makes the dot mean any character; the start and end are still the problem.", "2": "GA4 is full match, so /business/ alone matches no full URL.", "3": "This still says the value starts with /business, which no full URL does." }, slide: 75, section: "c3t6-n3" },
    { id: "c3t6-q11", type: "multi", difficulty: "hard", prompt: "Which fixes match their mistakes in the slide 72 table? Select all.", options: ["Backslash missing before d → \\.\\d*", "OR without brackets → ^/(a|b)$", "No anchors in GTM → add .* at both ends", "Wrong GTM variable → compare Page Path and Page URL in Preview"], answer: [0, 1, 3], explain: "Slide 72. No anchors in GTM is fixed with ^ and $, not .*.", slide: 72, section: "c3t6-n1" },
    { id: "c3t6-q12", type: "tf", difficulty: "medium", prompt: "^/(en|ar)/blog/.+ matches the blog's main page /en/blog/.", answer: false, explain: "Slide 75: the + requires at least one character after /blog/, so the main page is excluded.", slide: 75, section: "c3t6-n3" }
  ]
}

]});
