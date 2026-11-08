/* FILE: data/ch2a.js — FocusNest sample lesson content for Chapter 2 (part A, slides 2–44), written from data/slides.js (deck ch2).
   Slide-verbatim text lives in `fromSlides`/`definitions`; all other prose is FocusNest's added explanation. */
(window.FN_SEED = window.FN_SEED || []).push({ chapter: "ch2", order: 1, title: "The Technical Essentials of Web Analytics", topics: [

/* ============================== c2t1 ============================== */
{
  id: "c2t1",
  title: "GA4 Account Structure & Data Streams",
  slides: [2, 3, 4, 5, 6, 7, 8, 9, 10, 19, 20, 21, 22, 23],
  minutes: 20,
  overview: {
    about: "How Google Analytics 4 organises data: Organization, Account, Property and Data stream, where the G- Measurement ID lives, why UA- IDs belong to the past, and what limits and design choices apply to data streams.",
    why: "Implementing tracking is the step every report depends on. If the account structure or the Measurement ID is wrong, every KPI built on that data is wrong too, and data cannot be moved between properties later.",
    objectives: [
      "Name the four GA4 levels in order and say what each level controls.",
      "Explain that the Measurement ID (G- plus ten characters) belongs to a web data stream.",
      "Recognise UA- IDs as Universal Analytics, which Google has retired.",
      "State the data stream limits (50 in total, up to 30 app streams) and explain why GA4 has no views.",
      "Design a property and stream structure for a simple business scenario."
    ],
    vocabulary: [
      { term: "Organization", def: "Optional top level that groups several Google Analytics accounts, useful for large companies and agencies.", slide: 5 },
      { term: "Account", def: "The top level for one business. It holds one or more properties and controls who can access the data.", slide: 5 },
      { term: "Property", def: "The reporting unit (a website, an app, or both). Reports, key events and most settings live here.", slide: 5 },
      { term: "Data stream", def: "A flow of data from a customer touchpoint (e.g., app, website) to Analytics.", slide: 9 },
      { term: "Measurement ID", def: "The ID of a web data stream. It starts with G- (e.g., G-PSW1MY7HB4) and appears in the tracking code.", slide: 7 },
      { term: "UA- ID", def: "Tracking ID of Universal Analytics, the previous version of Google Analytics, which Google has retired.", slide: 7 },
      { term: "Enhanced measurement", def: "Automatic tracking of page views, scrolls, outbound clicks, site search, video engagement and file downloads, switchable per web stream.", slide: 9 },
      { term: "Data filter", def: "GA4 setting used instead of views, for example to exclude internal traffic from your office.", slide: 9 }
    ],
    hook: "One tiny ID decides which property your data lands in. Get it wrong and the data is mixed up for good."
  },
  notes: [
    {
      id: "c2t1-n1",
      heading: "Why tracking comes first: the analytics cycle",
      slides: [2, 3, 4],
      fromSlides: [
        { text: "This chapter moves from 'what web analytics is' to 'how the data is actually collected'.", slide: 3 },
        { text: "define KPIs → implement tracking → create reports → analyse → produce insights and recommendations → implement changes → analyse the website again.", slide: 4 },
        { text: "if tracking is missing or wrong, every report, KPI and recommendation built on it will also be wrong.", slide: 4 }
      ],
      simple: "Web analytics is a cycle that keeps repeating. This chapter is about one step in it: implementing tracking. Every later step uses the data this step collects, so mistakes here spread everywhere.",
      deep: "The slide shows the web analytics process as a loop: define KPIs, implement tracking, create reports, analyse, produce insights and recommendations, implement changes, then analyse the website again. The arrow points to Implement Tracking because this chapter covers it. Analysts sum up the risk as 'garbage in, garbage out': bad input data produces bad reports and bad decisions. In practice, implementing tracking means three things: setting up GA4 correctly, installing tags on the website (usually through GTM), and testing that the right data arrives. The six chapter objectives cover the GA4 hierarchy, client-side tagging, the two installation methods, the tag-trigger-variable model, the 2024–2026 GTM changes, and DOM and CSS selectors.",
      exam: [
        "Implement Tracking is the step every later step depends on.",
        "Garbage in, garbage out: wrong tracking means wrong reports and KPIs.",
        "Implementing tracking = set up GA4, install tags (usually via GTM), test that data arrives.",
        "The process is a cycle, not a one-time project."
      ],
      definitions: [
        { term: "Implement tracking", def: "Setting up the analytics tool (GA4) correctly, installing tags on the website, usually through GTM, and testing that the right data arrives.", slide: 4 }
      ],
      keyFacts: [
        "The analytics process is a repeating cycle.",
        "Objective 5 (GTM in 2024–2026) is new this year; objectives 1–4 are unchanged foundations."
      ],
      examples: [
        "If a shop forgets to track purchases, its revenue KPI report will be empty or wrong, and any recommendation built on it is unreliable."
      ],
      misconceptions: [
        "Myth: tracking is set up once and then forgotten. The slides describe a cycle that keeps analysing and changing the site."
      ]
    },
    {
      id: "c2t1-n2",
      heading: "The four-level GA4 hierarchy",
      slides: [5, 6],
      fromSlides: [
        { text: "GA4 organises data in a four-level hierarchy: Organization → Account → Property → Data stream.", slide: 5 },
        { text: "Account: the top level for one business. It holds one or more properties and controls who can access the data.", slide: 5 },
        { text: "Property: the reporting unit — a website, an app, or both. Reports, key events and most settings live here.", slide: 5 },
        { text: "one property per brand or product whose users you want to analyse together; one data stream per website or app platform.", slide: 6 }
      ],
      simple: "GA4 is organised like nested boxes. The Organization (optional) holds Accounts, an Account holds Properties, and a Property receives data through Data streams. Reports live at the Property level.",
      deep: "From top to bottom the levels are Organization, Account, Property and Data stream. The Organization is optional and is used by large companies or agencies to group several Google Analytics accounts and manage users in one place. The Account is normally one per business and controls access. The Property is the reporting unit: reports, key events, audiences and most settings live there, and it can combine a website and apps so you can analyse one customer journey across platforms. The Data stream is the actual flow of data from one website, one iOS app or one Android app into the property. A coffee chain example from the slides: one account, one property for the brand, and three streams (website, iOS app, Android app).",
      exam: [
        "Order: Organization → Account → Property → Data stream.",
        "Organization is optional.",
        "Account controls access; Property holds reports, key events and most settings.",
        "Rule of thumb: one property per brand/product analysed together; one stream per website or app platform.",
        "Be able to draw the hierarchy for a business scenario."
      ],
      definitions: [
        { term: "Organization (optional)", def: "Groups several Google Analytics accounts — useful for large companies and agencies.", slide: 5 },
        { term: "Property", def: "The reporting unit — a website, an app, or both. Reports, key events and most settings live here.", slide: 5 },
        { term: "Data stream", def: "The flow of data from one website, iOS app or Android app into the property.", slide: 5 }
      ],
      keyFacts: [
        "One account can contain several GA4 properties.",
        "Streams can be web streams or app streams (iOS and Android)."
      ],
      examples: [
        "Coffee chain: one account, one brand property, three data streams (website, iOS app, Android app)."
      ],
      misconceptions: [
        "Myth: reports live at the account level. Reports, key events and most settings live at the property level.",
        "Myth: the Organization level is required. It is optional."
      ]
    },
    {
      id: "c2t1-n3",
      heading: "Properties and the G- Measurement ID (UA- is retired)",
      slides: [7, 8],
      fromSlides: [
        { text: "In GA4 the unique ID belongs to each data stream. A web stream's Measurement ID starts with G- (e.g., G-PSW1MY7HB4) and appears in the tracking code.", slide: 7 },
        { text: "Old tutorials show IDs starting with UA- — those belonged to Universal Analytics, which Google has retired.", slide: 7 },
        { text: "The code is identical except for the ID — that ID is the only thing that tells Google where to send each site's data.", slide: 8 },
        { text: "If two websites accidentally share one ID, their data will be mixed in one stream.", slide: 8 }
      ],
      simple: "Each web data stream gets a Measurement ID that starts with G-. That ID is written into the tracking code and tells Google where the data should go. IDs starting with UA- come from Universal Analytics, which no longer exists.",
      deep: "Every Google Analytics account has at least one property, and each property collects its data independently with its own reports and settings. In GA4 the unique ID belongs to the data stream: a web stream's Measurement ID is G- followed by ten characters, for example G-PSW1MY7HB4. Universal Analytics, the previous version, used property tracking IDs starting with UA-; it was switched off in 2023 and its data deleted in 2024. Because properties are independent, data in one property never mixes with another, and data cannot be moved between properties later, so the structure must be chosen carefully at the start. When one account manages four websites, each has its own snippet; the code is identical except for the ID. If two sites accidentally share one ID, their data is mixed in one stream, which is a common error to check in audits.",
      exam: [
        "GA4: the ID belongs to the data stream, not the property.",
        "Web stream Measurement ID = G- + ten characters (e.g., G-PSW1MY7HB4).",
        "UA- = Universal Analytics: switched off 2023, data deleted 2024.",
        "Data cannot be moved between properties later.",
        "Two sites sharing one G- ID = mixed data (audit check)."
      ],
      definitions: [
        { term: "Property", def: "Every Google Analytics account has at least one property. Each property collects its data independently and has its own reports and settings.", slide: 7 },
        { term: "Measurement ID", def: "A web stream's ID that starts with G- and appears in the tracking code.", slide: 7 }
      ],
      keyFacts: [
        "When you add a property, GA4 asks you to create a data stream and then generates the Google tag code.",
        "The snippet has three parts: the script that downloads gtag.js, the dataLayer and gtag() function, and gtag('config', 'G-…')."
      ],
      examples: [
        "Four websites in one account: snippets with G-1A2B3C4D51, G-1A2B3C4D52, G-1A2B3C4D53 and G-1A2B3C4D54 — only the ID differs."
      ],
      misconceptions: [
        "Myth: a UA- ID from an old tutorial still works for GA4. Universal Analytics has been retired.",
        "Myth: you can merge or move data between properties later. You cannot."
      ]
    },
    {
      id: "c2t1-n4",
      heading: "Data streams: collection starts when the code is live",
      slides: [9, 10, 19, 20, 21, 22],
      fromSlides: [
        { text: "Data stream: is a flow of data from a customer touchpoint (e.g., app, website) to Analytics.", slide: 9 },
        { text: "Data is collected from the time you add the code, and that data forms the basis of your reports.", slide: 9 },
        { text: "Note: GA4 has no 'views' (that was Universal Analytics) — you use data filters, comparisons and Explorations instead.", slide: 9 },
        { text: "You can have a data stream for your website, Android app, and iOS app, allowing you to compare and consolidate user behavior across different platforms", slide: 21 }
      ],
      simple: "A data stream is the pipe that carries data from your website or app into GA4. When you create it, GA4 gives you code to install, and data only starts arriving once that code is live. GA4 has no views; you use data filters, comparisons and Explorations instead.",
      deep: "When you create a web data stream, GA4 gives you a Measurement ID and a code snippet. Data collection starts only when that code is installed, so GA4 cannot collect data from the past; if a client asks why last year has no data, the usual answer is that tracking was not installed then. Universal Analytics used filtered views, but GA4 has none: you use data filters (for example excluding internal traffic), comparisons and segments, and Explorations. Web streams include enhanced measurement, which automatically tracks page views, scrolls, outbound clicks, site search, video engagement and file downloads, switchable per stream. One property can hold web, iOS and Android streams, so it can show a user who browses on the app and buys on the website; app streams use the Firebase SDK rather than gtag.js but send the same kind of event data (event name plus parameters). After collection, data appears in standard reports and Explorations and can be exported to BigQuery or through the Analytics Data API.",
      exam: [
        "No data from before the code was installed.",
        "GA4 has no views: use data filters, comparisons/segments and Explorations.",
        "Enhanced measurement: page views, scrolls, outbound clicks, site search, video engagement, file downloads.",
        "App streams use the Firebase SDK; web streams use gtag.js.",
        "Export paths: BigQuery (SQL on raw events) and the Analytics Data API."
      ],
      definitions: [
        { term: "Data streams", def: "Source of information that feed into your Google Analytics property.", slide: 21 },
        { term: "BigQuery", def: "Google's data warehouse, where analysts can query raw GA4 event data with SQL.", slide: 10 }
      ],
      keyFacts: [
        "The Data streams page lists each stream's name, URL or app ID and stream ID.",
        "The stream details page shows the Measurement ID in the top-right, enhanced measurement settings and tag instructions.",
        "Tag settings on the stream page include cross-domain measurement and internal traffic definitions."
      ],
      examples: [
        "A user browses products in the iOS app and buys on the website; with both streams in one property GA4 can show that journey."
      ],
      misconceptions: [
        "Myth: GA4 can backfill data from before installation. Collection starts only when the code is live.",
        "Myth: you create filtered views in GA4. Views were Universal Analytics; GA4 uses data filters."
      ]
    },
    {
      id: "c2t1-n5",
      heading: "Stream limits and structure decisions",
      slides: [23],
      fromSlides: [
        { text: "Each Google Analytics 4 property can have up to 50 data streams (any combination of app and web data streams, including a limit of 30 app data streams).", slide: 23 },
        { text: "In practice most businesses need only one to three streams.", slide: 23 }
      ],
      simple: "One GA4 property can hold up to 50 data streams, and at most 30 of them can be app streams. Most businesses only need one to three.",
      deep: "The hard limit is 50 data streams per property in any mix of web and app, with app streams capped at 30. The limit rarely matters in practice because most businesses use one to three streams. The more interesting question is design: a company with ten country websites could create ten properties or one property with ten streams. One property makes global reporting easy, while separate properties keep data and access separate. Many companies choose one property with clear naming. Because data cannot be moved between properties later, this decision should be made before tracking starts.",
      exam: [
        "Max 50 data streams per property.",
        "Of those, max 30 app streams.",
        "One property = easy global reporting; separate properties = separate data and access.",
        "Most businesses need one to three streams."
      ],
      definitions: [
        { term: "Data stream limit", def: "Up to 50 data streams per GA4 property, including a limit of 30 app data streams.", slide: 23 }
      ],
      keyFacts: ["50 total streams", "30 app streams maximum"],
      examples: [
        "Ten country websites: one property with ten clearly named web streams gives one global report."
      ],
      misconceptions: [
        "Myth: the 30 app streams are on top of the 50. The 30 app streams count inside the 50 total."
      ]
    }
  ],
  steps: [],
  visual: {
    type: "tree",
    title: "GA4 hierarchy for a coffee chain",
    caption: "Organization (optional) → Account → Property → Data streams. The G- Measurement ID belongs to the web stream.",
    slides: [5, 6, 7, 21],
    data: {
      root: {
        label: "Organization (optional)",
        detail: "Groups several Google Analytics accounts; used by large companies and agencies.",
        children: [
          {
            label: "Account: Coffee Chain",
            detail: "One per business. Controls who can access the data.",
            children: [
              {
                label: "Property: Coffee Chain brand",
                detail: "Reporting unit. Reports, key events, audiences and most settings live here.",
                children: [
                  { label: "Web stream: website", detail: "Measurement ID such as G-PSW1MY7HB4, placed in the Google tag code.", children: [] },
                  { label: "App stream: iOS app", detail: "Uses the Firebase SDK rather than gtag.js.", children: [] },
                  { label: "App stream: Android app", detail: "Uses the Firebase SDK; sends the same kind of event data.", children: [] }
                ]
              }
            ]
          }
        ]
      }
    }
  },
  examples: [
    {
      concept: "Designing a property and stream structure",
      example: "A coffee chain has a website, an iOS app and an Android app, and wants to analyse all customers together.",
      walkthrough: [
        "One business, so one Account.",
        "One brand whose users should be analysed together, so one Property.",
        "Three platforms, so three Data streams: web, iOS, Android.",
        "The web stream gets a G- Measurement ID that goes into the Google tag on the website."
      ],
      application: "Before creating anything in GA4, sketch the hierarchy for the business, because data cannot be moved between properties later.",
      check: {
        q: "How many data streams should the coffee chain create?",
        options: ["One", "Two", "Three", "Fifty"],
        answer: 2,
        explain: "One stream per website or app platform: website, iOS app and Android app."
      }
    },
    {
      concept: "Auditing Measurement IDs",
      example: "An agency manages four websites. Two of them show the same snippet with G-1A2B3C4D52.",
      walkthrough: [
        "Compare the snippets: the code is identical except for the ID.",
        "Notice two sites share one Measurement ID.",
        "Conclude that both sites' data is mixed in one stream.",
        "Fix: give the second site its own stream and its own G- ID."
      ],
      application: "In any tracking audit, check that each site has its own Measurement ID.",
      check: {
        q: "What is the effect of two websites sharing one G- ID?",
        options: ["Nothing, GA4 separates them automatically", "Their data is mixed in one stream", "The second site sends no data", "GA4 creates a view for each"],
        answer: 1,
        explain: "The ID is the only thing that tells Google where to send data, so both sites end up in one stream."
      }
    }
  ],
  flashcards: [
    { id: "c2t1-f1", front: "GA4 hierarchy from top to bottom?", back: "Organization (optional) → Account → Property → Data stream.", slide: 5 },
    { id: "c2t1-f2", front: "Where do reports, key events and most settings live?", back: "At the Property level.", slide: 5 },
    { id: "c2t1-f3", front: "In GA4, what level does the unique ID belong to?", back: "The data stream. A web stream's Measurement ID starts with G-.", slide: 7 },
    { id: "c2t1-f4", front: "What does an ID starting with UA- mean?", back: "Universal Analytics, the previous version, which Google has retired (switched off 2023, data deleted 2024).", slide: 7 },
    { id: "c2t1-f5", front: "Does GA4 have views?", back: "No. Use data filters, comparisons and Explorations instead.", slide: 9 },
    { id: "c2t1-f6", front: "When does GA4 start collecting data for a stream?", back: "From the time you add the code. It cannot collect data from the past.", slide: 9 },
    { id: "c2t1-f7", front: "Data stream limits per property?", back: "Up to 50 in total, including a limit of 30 app data streams.", slide: 23 },
    { id: "c2t1-f8", front: "What do app streams use instead of gtag.js?", back: "The Firebase SDK.", slide: 21 }
  ],
  quiz: [
    { id: "c2t1-q1", type: "mcq", difficulty: "easy", prompt: "Which list shows the GA4 hierarchy from top to bottom?",
      options: ["Account → Organization → Data stream → Property", "Organization → Account → Property → Data stream", "Property → Account → Organization → Data stream", "Organization → Property → Account → View"],
      answer: 1, explain: "GA4 organises data as Organization → Account → Property → Data stream.",
      wrongWhy: { "0": "Organization sits above Account, and Property sits above Data stream.", "2": "Property is below Account, not at the top.", "3": "GA4 has no views, and Account comes before Property." },
      slide: 5, section: "c2t1-n2" },
    { id: "c2t1-q2", type: "tf", difficulty: "easy", prompt: "The Organization level is required in every GA4 setup.",
      answer: false, explain: "The Organization is optional; it groups several accounts for large companies and agencies.", slide: 5, section: "c2t1-n2" },
    { id: "c2t1-q3", type: "fill", difficulty: "easy", prompt: "A GA4 web stream's Measurement ID starts with the prefix ____.",
      answer: ["G-", "G"], explain: "Web stream Measurement IDs start with G-, e.g., G-PSW1MY7HB4.", slide: 7, section: "c2t1-n3" },
    { id: "c2t1-q4", type: "mcq", difficulty: "medium", prompt: "What should you tell the student?",
      scenario: "A student follows an old YouTube tutorial that asks for a tracking ID starting with UA-.",
      options: ["Create a UA- property in GA4", "UA- IDs belonged to Universal Analytics, which Google has retired; use the G- Measurement ID of a GA4 web stream", "UA- and G- are interchangeable", "UA- IDs are for app streams"],
      answer: 1, explain: "UA- IDs were Universal Analytics, switched off in 2023. GA4 uses the stream's G- Measurement ID.",
      wrongWhy: { "0": "Universal Analytics has been retired; you cannot use it for new tracking.", "2": "They belong to different products; only G- works in GA4.", "3": "App streams use the Firebase SDK; UA- is Universal Analytics." },
      slide: 7, section: "c2t1-n3" },
    { id: "c2t1-q5", type: "multi", difficulty: "medium", prompt: "GA4 has no views. Which tools replace them? (Select all that apply.)",
      options: ["Data filters", "Comparisons", "Explorations", "Filtered views", "UA- properties"],
      answer: [0, 1, 2], explain: "The slides list data filters, comparisons and Explorations as the GA4 alternatives to views.", slide: 9, section: "c2t1-n4" },
    { id: "c2t1-q6", type: "match", difficulty: "medium", prompt: "Match each GA4 level to what it does.",
      options: [["Organization", "Groups several accounts (optional)"], ["Account", "Controls who can access the data"], ["Property", "Reporting unit with reports and key events"], ["Data stream", "Flow of data from one website or app"]],
      explain: "Each level has a distinct job in the hierarchy.", slide: 5, section: "c2t1-n2" },
    { id: "c2t1-q7", type: "mcq", difficulty: "medium", prompt: "Why is there no data from last year?",
      scenario: "A client installed the GA4 code this month and asks to see last year's traffic.",
      options: ["Data collection starts only when the code is live", "GA4 deletes data after one month", "Views were not configured", "The account has too many streams"],
      answer: 0, explain: "Data is collected from the time you add the code; GA4 cannot collect data from the past.",
      wrongWhy: { "1": "Nothing on the slides says GA4 deletes data after a month.", "2": "GA4 has no views.", "3": "The stream limit does not affect historical data." },
      slide: 22, section: "c2t1-n4" },
    { id: "c2t1-q8", type: "fill", difficulty: "hard", prompt: "A GA4 property can have up to 50 data streams, including a limit of ____ app data streams.",
      answer: ["30", "thirty"], explain: "Up to 50 streams in total, of which up to 30 can be app streams.", slide: 23, section: "c2t1-n5" },
    { id: "c2t1-q9", type: "tf", difficulty: "hard", prompt: "If two websites share one Measurement ID, GA4 automatically separates their data into two streams.",
      answer: false, explain: "The ID is the only thing that tells Google where to send data, so the data is mixed in one stream.", slide: 8, section: "c2t1-n3" },
    { id: "c2t1-q10", type: "mcq", difficulty: "hard", prompt: "A company with ten country websites wants easy global reporting. Which structure fits best?",
      options: ["One property with ten web streams", "Ten accounts", "Ten organizations", "One property with ten views"],
      answer: 0, explain: "One property makes global reporting easy; many companies choose one property with clear stream naming.",
      wrongWhy: { "1": "Separate accounts would split data and access, making global reporting harder.", "2": "Organizations group accounts; this adds complexity, not global reporting.", "3": "GA4 has no views." },
      slide: 23, section: "c2t1-n5" },
    { id: "c2t1-q11", type: "multi", difficulty: "hard", prompt: "Problem-solving: a shop has a website, an iOS app and an Android app in one property. Which statements are true? (Select all that apply.)",
      options: ["It needs three data streams", "The web stream has a G- Measurement ID", "App streams use gtag.js", "GA4 can show a user who browses on the app and buys on the website", "It is over the stream limit"],
      answer: [0, 1, 3], explain: "Three platforms mean three streams; the web stream has a G- ID; app streams use the Firebase SDK; one property shows cross-platform journeys; three streams are well under 50.", slide: 21, section: "c2t1-n4" }
  ]
},

/* ============================== c2t2 ============================== */
{
  id: "c2t2",
  title: "Client-Side Tagging & Installing the Google Tag (gtag.js)",
  slides: [11, 12, 13, 14, 15, 16, 17, 18],
  minutes: 18,
  overview: {
    about: "What client-side tagging is, the seven-step GA4 setup roadmap, how to create a GA4 account, what each line of the Google tag (gtag.js) does, and how to install it natively in the <head> of every page.",
    why: "Every GA4 hit starts with a tag running in the visitor's browser. Knowing how the Google tag works lets you install it correctly, audit any website and understand why some data never arrives.",
    objectives: [
      "Define client-side tagging and contrast it with server-side tagging.",
      "List the seven GA4 setup steps in order, including the updated terms key events and data filters.",
      "Explain each line of the Google tag snippet.",
      "Describe where to place the snippet and how to find it in GA4.",
      "Check any website for GA4 or GTM using View page source."
    ],
    vocabulary: [
      { term: "Client-side tagging", def: "Tracking tags and scripts are implemented and executed on the client-side, i.e., within the user's web browser.", slide: 12 },
      { term: "Server-side tagging", def: "Part of the work moves to a server you control: the browser sends one stream of data to your server, which forwards it to Google Analytics and other tools.", slide: 12 },
      { term: "Hit", def: "A small request the browser sends to Google's collection servers, for example google-analytics.com/g/collect.", slide: 11 },
      { term: "Google tag (gtag.js)", def: "The tag used for GA4, formerly called the Global Site Tag.", slide: 15 },
      { term: "dataLayer", def: "A JavaScript array that stores events and commands; the same dataLayer Google Tag Manager uses.", slide: 15 },
      { term: "Key events", def: "GA4 name (since 2024) for what were called goals in Universal Analytics and conversions in GA4.", slide: 13 },
      { term: "Consent mode", def: "Makes Google tags adjust to the visitor's cookie consent choice.", slide: 13 }
    ],
    hook: "Seven lines of code, pasted once, and every page view starts flowing into GA4."
  },
  notes: [
    {
      id: "c2t2-n1",
      heading: "Client-side tagging: the tag runs in the browser",
      slides: [11, 12],
      fromSlides: [
        { text: "Client-side tagging is a methodology wherein tracking tags and scripts are implemented and executed on the client-side, i.e., within the user's web browser.", slide: 12 },
        { text: "Unlike server-side tracking, which relies on the web server to collect and send data to analytics platforms, client-side tagging shifts this responsibility to the user's device.", slide: 12 },
        { text: "the browser sends a small request ('hit') to Google's collection servers, for example google-analytics.com/g/collect.", slide: 11 }
      ],
      simple: "In client-side tagging, the tracking code runs inside the visitor's browser. The browser loads the page, the tag runs, watches what the visitor does, and sends a small message called a hit to Google. Because the browser is not under your control, ad blockers and privacy settings can stop some data.",
      deep: "The client is the visitor's browser. The page loads, the Google tag or GTM container runs, and the browser sends a hit to Google's collection servers, for example google-analytics.com/g/collect. Because the tag runs on the same page as the visitor, it can observe page views, clicks, scrolls and form submissions. The limitation is that ad blockers, privacy settings, slow connections and cookie restrictions can stop or change what is sent. In server-side tagging, the browser sends one stream of data to a server you control, and that server forwards it to Google Analytics and other tools. Most websites start client-side because it is free, quick and well supported by GTM; server-side is added later for more control, better performance or stronger privacy. The Google tag gateway and server-side tagging exist partly to address the browser's limitations.",
      exam: [
        "Client-side = scripts run in the user's browser.",
        "Server-side = data goes to your own server, which forwards it.",
        "Hit = small request to e.g. google-analytics.com/g/collect.",
        "Limits: ad blockers, privacy settings, slow connections, cookie restrictions.",
        "Most sites start client-side: free, quick, well supported by GTM."
      ],
      definitions: [
        { term: "Client-side tagging", def: "A method used in web analytics to collect data about user interactions and behavior on a website, executing tracking scripts directly within the user's web browser.", slide: 12 }
      ],
      keyFacts: [
        "The tag can observe page views, clicks, scrolls and form submissions.",
        "Server-side tagging is usually added later for control, performance or privacy."
      ],
      examples: [
        "A visitor with an ad blocker loads the page; the tag may be blocked, so that visit may not reach GA4."
      ],
      misconceptions: [
        "Myth: in client-side tagging the web server sends the analytics data. The visitor's browser does.",
        "Myth: client-side tags always capture every visit. Ad blockers and privacy settings can stop them."
      ]
    },
    {
      id: "c2t2-n2",
      heading: "The seven-step GA4 setup roadmap",
      slides: [13],
      fromSlides: [
        { text: "Step 1: Create a Google Analytics account, property and web data stream", slide: 13 },
        { text: "Step 3: Connect GA4 through GTM (Google tag — or a Destination in optimized containers)", slide: 13 },
        { text: "Step 4: Mark key events (formerly 'goals' / 'conversions')", slide: 13 },
        { text: "Step 7: Configure consent mode and test in Preview and DebugView", slide: 13 }
      ],
      simple: "Setting up GA4 has seven steps: create the account, property and stream; set up GTM; connect GA4 through GTM; mark key events; set up data filters; set up event tracking; then configure consent and test. Some names have changed, so goals and conversions are now called key events.",
      deep: "The roadmap is: (1) create a Google Analytics account, property and web data stream; (2) set up Google Tag Manager with an account and web container; (3) connect GA4 through GTM using the Google tag, or a Destination in optimized containers; (4) mark key events; (5) set up data filters, such as excluding internal traffic; (6) set up event tracking with triggers and GA4 Event tags; (7) configure consent mode and test in Preview and DebugView. Terminology changed: goals in Universal Analytics became key events in GA4, and in 2024 Google renamed GA4 conversions to key events, keeping the word conversion for actions imported into Google Ads for bidding. Filters became data filters. Step 7 is new: in many countries you must respect cookie consent, and consent mode makes Google tags adjust to the visitor's choice. Always finish by testing in GTM Preview (Tag Assistant) and GA4 DebugView.",
      exam: [
        "7 steps: account/property/stream → GTM → connect GA4 → key events → data filters → event tracking → consent + testing.",
        "Goals (UA) → key events (GA4); 2024 rename of GA4 conversions to key events.",
        "Conversion now = actions imported into Google Ads for bidding.",
        "Common data filter: exclude internal traffic.",
        "Test in GTM Preview (Tag Assistant) and GA4 DebugView."
      ],
      definitions: [
        { term: "Key events", def: "Formerly 'goals' / 'conversions'.", slide: 13 },
        { term: "Data filters", def: "Set up e.g. to exclude internal traffic.", slide: 13 }
      ],
      keyFacts: [
        "Step 3 can use a Destination in optimized containers.",
        "Step 7 (consent) is new."
      ],
      examples: [
        "A company excludes its own office traffic with a data filter so staff visits do not inflate reports."
      ],
      misconceptions: [
        "Myth: 'conversion' and 'key event' mean the same thing in GA4 today. Conversion is now used for actions imported into Google Ads."
      ]
    },
    {
      id: "c2t2-n3",
      heading: "Step 1 in practice: creating the GA4 account",
      slides: [14],
      fromSlides: [
        { text: "Click on Admin", slide: 14 },
        { text: "From Admin, click on create account", slide: 14 },
        { text: "At the end GA4 shows the Measurement ID (G-…) and installation instructions. Keep this ID — you will need it in Google Tag Manager.", slide: 14 }
      ],
      simple: "You create the account from Admin. Then you set up a property and a web data stream. At the end GA4 shows the G- Measurement ID, which you keep for GTM.",
      deep: "The path is Admin → Create → Account. You name the account, usually after the business, and choose data-sharing settings. Next you create a property with a name, time zone and currency; choose these carefully because they affect your reports. You add business details and finally create a web data stream by entering the website URL. GA4 then shows the Measurement ID (G-…) and installation instructions. Keep the ID, because Step 3 needs it in Google Tag Manager.",
      exam: [
        "Admin → Create → Account.",
        "Property needs name, time zone and currency (they affect reports).",
        "Web data stream = enter the website URL.",
        "Output: the G- Measurement ID and installation instructions."
      ],
      definitions: [
        { term: "Account name", def: "Usually the business name.", slide: 14 }
      ],
      keyFacts: ["Time zone and currency are chosen at property creation."],
      examples: ["A bakery names the account after the business, sets its local time zone and currency, then adds its website URL as a web stream."],
      misconceptions: ["Myth: time zone and currency are cosmetic. The slide notes say they affect your reports."]
    },
    {
      id: "c2t2-n4",
      heading: "The Google tag (gtag.js) line by line",
      slides: [15],
      fromSlides: [
        { text: "Google Analytics tracking code: Google tag (gtag.js) — formerly called the Global Site Tag", slide: 15 },
        { text: "<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-PSW1MY7HB4\"></script>", slide: 15 },
        { text: "gtag('config', 'G-PSW1MY7HB4');", slide: 15 }
      ],
      simple: "The Google tag has two scripts. The first downloads the gtag.js library without slowing the page. The second creates the dataLayer, defines gtag(), records the load time and tells the library which data stream to send to.",
      deep: "The first script downloads gtag.js asynchronously; async means it does not block the page from loading. The second script creates window.dataLayer, a JavaScript array that stores events and commands, and defines gtag(), which simply pushes commands into dataLayer. gtag('js', new Date()) records the time the tag loaded. gtag('config', 'G-…') tells the library which GA4 data stream to send data to. The dataLayer here is the same dataLayer GTM uses, which is why the two tools work well together. Google used to call this the Global Site Tag; the code is the same.",
      exam: [
        "async = does not block page loading.",
        "window.dataLayer = array of events and commands.",
        "gtag() just pushes commands into dataLayer.",
        "gtag('js', new Date()) = load time; gtag('config', 'G-…') = destination stream.",
        "Global Site Tag = old name for the Google tag."
      ],
      definitions: [
        { term: "gtag()", def: "A function that simply pushes commands into dataLayer.", slide: 15 },
        { term: "gtag('config', 'G-…')", def: "Tells the library which GA4 data stream to send data to.", slide: 15 }
      ],
      keyFacts: ["The dataLayer is shared with Google Tag Manager."],
      examples: ["Changing only the G- ID in the config line sends the same site's data to a different stream."],
      misconceptions: ["Myth: the Global Site Tag and the Google tag are different codes. Same code, new name."]
    },
    {
      id: "c2t2-n5",
      heading: "Native installation: first item in the <head>",
      slides: [16, 17, 18],
      fromSlides: [
        { text: "Copy and paste this code as the first item into the <HEAD> of every webpage you want to track.", slide: 16 },
        { text: "The Google tag (gtag.js) is the tag used for GA4", slide: 18 },
        { text: "In GA4, find it under Admin → Data streams → (your web stream) → View tag instructions → Install manually", slide: 18 }
      ],
      simple: "The native method is to copy the Google tag from GA4 and paste it high in the <head> of every page. Usually you send it to the developers with clear instructions. You can check any site by viewing the page source and searching for gtag or googletagmanager.",
      deep: "Method 1, native installation, means pasting the Google tag into the HTML of every page you want to track, as high in the <head> as possible; Google recommends immediately after the opening <head> tag. Placing it high makes it load early, so visitors who leave quickly are still counted. In real companies the marketing team usually does not edit website code: the analyst sends the code to the development team with instructions. On WordPress or Shopify, the code is usually added once in the theme header or through a plugin or integration. To find the tag in GA4: Admin → Data collection and modification → Data streams → your web stream → View tag instructions → Install manually; the same page offers 'Install with a website builder or CMS', where you only paste the Measurement ID. To audit a site, right-click → View page source and search (Ctrl+F) for 'gtag' or 'googletagmanager'.",
      exam: [
        "Paste as the first item in the <head> of every page to track.",
        "High placement = early loading, quick leavers still counted.",
        "Find it: Admin → Data streams → web stream → View tag instructions → Install manually.",
        "CMS option: paste only the Measurement ID.",
        "Audit: View page source, search 'gtag' or 'googletagmanager'."
      ],
      definitions: [
        { term: "Native GA implementation", def: "Copy/pasting this code to source code of the webpage.", slide: 16 }
      ],
      keyFacts: [
        "Menu names change occasionally; search the GA4 Help Center if a screen looks different.",
        "Marketing teams usually send the code to developers rather than editing the site."
      ],
      examples: ["On a Shopify store the tag is added once in the theme header, so it appears on every page automatically."],
      misconceptions: [
        "Myth: pasting the tag at the bottom of the page is just as good. Placing it high means quick leavers are still counted.",
        "Myth: the tag only needs to be on the home page. It goes on every page you want to track."
      ]
    }
  ],
  steps: [
    { title: "Create the GA4 account, property and web data stream", what: "In GA4 go to Admin → Create → Account, then create a property and a web data stream.", why: "This produces the G- Measurement ID every later step needs.", practical: "Pick the property's time zone and currency carefully; they affect reports.", visual: "Admin → Create → Account → Property → Web stream → G-XXXXXXXXXX",
      check: { q: "What does GA4 show at the end of Step 1?", options: ["A GTM- container ID", "The G- Measurement ID and installation instructions", "A UA- tracking ID", "A BigQuery table"], answer: 1, explain: "At the end GA4 shows the Measurement ID (G-…) and installation instructions." } },
    { title: "Set up Google Tag Manager", what: "Create a GTM account and a web container.", why: "GTM lets you add and change tags later without editing website code.", practical: "One website gets one container.", visual: "GTM account → Web container (GTM-XXXXXXX)",
      check: { q: "What do you create in Step 2?", options: ["A GA4 view", "A GTM account and web container", "A data filter", "A key event"], answer: 1, explain: "Step 2 is setting up Google Tag Manager: account + web container." } },
    { title: "Connect GA4 through GTM", what: "Add the Google tag with your G- ID in GTM, or a Destination in an optimized container.", why: "This makes GTM deliver GA4 data on every page.", practical: "Use the Measurement ID you kept from Step 1.",
      check: { q: "In an optimized container, how is GA4 connected?", options: ["As a Destination", "As a UA- tag", "As a view", "It cannot be connected"], answer: 0, explain: "Step 3 says Google tag, or a Destination in optimized containers." } },
    { title: "Mark key events", what: "Mark the actions that matter most to the business as key events.", why: "Key events replace goals and the old GA4 name conversions.", practical: "Remember that 'conversion' now refers to actions imported into Google Ads for bidding.",
      check: { q: "What were key events formerly called?", options: ["Views", "Goals / conversions", "Streams", "Hits"], answer: 1, explain: "Key events were formerly goals (UA) and conversions (GA4, renamed in 2024)." } },
    { title: "Set up data filters", what: "Create data filters, most commonly to exclude internal traffic.", why: "Your own staff or developers would otherwise inflate the data.", practical: "GA4 has no views, so filtering is done with data filters.",
      check: { q: "What is the most common GA4 data filter?", options: ["Exclude internal traffic", "Exclude mobile users", "Exclude key events", "Exclude page views"], answer: 0, explain: "The most common filter excludes internal (staff) or developer traffic." } },
    { title: "Set up event tracking", what: "Build triggers and GA4 Event tags for the actions you want to track.", why: "The Google tag alone sends page views; custom actions need their own event tags.", practical: "Create one GA4 Event tag per custom event, such as form_submit.",
      check: { q: "What two things does event tracking need in GTM?", options: ["Views and filters", "Triggers and GA4 Event tags", "UA- IDs and views", "Streams and organizations"], answer: 1, explain: "Step 6: event tracking with triggers + GA4 Event tags." } },
    { title: "Configure consent mode and test", what: "Set up consent mode, then test in GTM Preview (Tag Assistant) and GA4 DebugView.", why: "In many countries you must respect cookie consent, and untested tags may silently fail.", practical: "Always finish with testing before relying on reports.",
      check: { q: "Which two tools does Step 7 use for testing?", options: ["BigQuery and the Data API", "GTM Preview and GA4 DebugView", "View page source and Ctrl+F", "Explorations and comparisons"], answer: 1, explain: "Always finish by testing in GTM Preview (Tag Assistant) and GA4 DebugView." } }
  ],
  visual: {
    type: "flow",
    title: "How a client-side hit reaches GA4",
    caption: "Everything happens in the visitor's browser until the hit is sent.",
    slides: [11, 12, 15],
    data: {
      nodes: [
        { label: "Browser loads the page", detail: "The visitor's browser (the client) requests and renders the page." },
        { label: "Google tag or GTM container runs", detail: "gtag.js downloads asynchronously, so it does not block the page." },
        { label: "Tag observes the page", detail: "It can see page views, clicks, scrolls and form submissions because it runs on the same page." },
        { label: "Commands queue in the dataLayer", detail: "gtag() pushes commands such as config into window.dataLayer." },
        { label: "Browser sends a hit", detail: "A small request goes to Google's collection servers, e.g., google-analytics.com/g/collect." },
        { label: "Data arrives in the GA4 stream", detail: "The G- ID in the config line decides which stream receives it." }
      ]
    }
  },
  examples: [
    {
      concept: "Reading the Google tag",
      example: "<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-PSW1MY7HB4\"></script> followed by the dataLayer, gtag('js', new Date()) and gtag('config', 'G-PSW1MY7HB4').",
      walkthrough: [
        "The first script downloads gtag.js; async means the page keeps loading.",
        "window.dataLayer = window.dataLayer || [] creates the array if it does not exist.",
        "function gtag(){dataLayer.push(arguments);} pushes commands into it.",
        "gtag('js', new Date()) records the load time.",
        "gtag('config', 'G-PSW1MY7HB4') names the destination stream."
      ],
      application: "When auditing a site, find the config line to know which stream receives its data.",
      check: { q: "Which line tells the tag which GA4 stream to send data to?", options: ["gtag('js', new Date())", "gtag('config', 'G-PSW1MY7HB4')", "window.dataLayer = window.dataLayer || []", "<!-- Google tag (gtag.js) -->"], answer: 1, explain: "The config line names the G- Measurement ID." }
    },
    {
      concept: "Auditing a website for GA4",
      example: "You want to know whether a competitor's site uses GA4 or GTM.",
      walkthrough: [
        "Right-click the page and choose View page source.",
        "Press Ctrl+F and search for 'gtag'.",
        "Search for 'googletagmanager'.",
        "Check whether the snippet sits inside the <head>."
      ],
      application: "A quick source check tells you what tracking is installed before you start an audit.",
      check: { q: "Which search term in the page source helps reveal the Google tag?", options: ["gtag", "UA-views", "BigQuery", "DebugView"], answer: 0, explain: "Search for 'gtag' or 'googletagmanager'." }
    }
  ],
  flashcards: [
    { id: "c2t2-f1", front: "What is client-side tagging?", back: "Tracking tags and scripts are executed within the user's web browser.", slide: 12 },
    { id: "c2t2-f2", front: "What is a hit?", back: "A small request the browser sends to Google's collection servers, e.g., google-analytics.com/g/collect.", slide: 11 },
    { id: "c2t2-f3", front: "Old name of the Google tag (gtag.js)?", back: "The Global Site Tag. The code is the same.", slide: 15 },
    { id: "c2t2-f4", front: "What does async do in the gtag.js script tag?", back: "Downloads the library without blocking the page from loading.", slide: 15 },
    { id: "c2t2-f5", front: "Where should the Google tag be pasted?", back: "As the first item in the <head> of every webpage you want to track.", slide: 16 },
    { id: "c2t2-f6", front: "Path to the tag code in GA4?", back: "Admin → Data streams → your web stream → View tag instructions → Install manually.", slide: 18 },
    { id: "c2t2-f7", front: "What did Google rename GA4 conversions to in 2024?", back: "Key events.", slide: 13 },
    { id: "c2t2-f8", front: "Step 7 of the GA4 setup?", back: "Configure consent mode and test in Preview and DebugView.", slide: 13 }
  ],
  quiz: [
    { id: "c2t2-q1", type: "mcq", difficulty: "easy", prompt: "In client-side tagging, where do the tracking scripts run?",
      options: ["On the web server", "In the user's web browser", "In BigQuery", "In the GA4 property"],
      answer: 1, explain: "Client-side tagging executes tracking scripts within the user's web browser.",
      wrongWhy: { "0": "That describes server-side tracking.", "2": "BigQuery is where exported data is queried, not where tags run.", "3": "The property receives data; it does not run scripts." },
      slide: 12, section: "c2t2-n1" },
    { id: "c2t2-q2", type: "tf", difficulty: "easy", prompt: "The Google tag (gtag.js) was formerly called the Global Site Tag.",
      answer: true, explain: "Google used to call it the Global Site Tag; the code is the same.", slide: 15, section: "c2t2-n4" },
    { id: "c2t2-q3", type: "fill", difficulty: "easy", prompt: "In 2024 Google renamed GA4 'conversions' to ____ ____.",
      answer: ["key events", "keyevents"], explain: "Conversions became key events; 'conversion' is now used for actions imported into Google Ads.", slide: 13, section: "c2t2-n2" },
    { id: "c2t2-q4", type: "match", difficulty: "medium", prompt: "Match each part of the Google tag to its job.",
      options: [["async script tag", "Downloads gtag.js without blocking the page"], ["window.dataLayer", "Array that stores events and commands"], ["gtag('js', new Date())", "Records when the tag loaded"], ["gtag('config', 'G-…')", "Names the GA4 data stream to send to"]],
      explain: "Each line of the snippet has one job.", slide: 15, section: "c2t2-n4" },
    { id: "c2t2-q5", type: "mcq", difficulty: "medium", prompt: "What is the best advice?",
      scenario: "A developer wants to add the Google tag at the very bottom of each page to keep the <head> tidy.",
      options: ["Fine, location does not matter", "Place it as high in the <head> as possible so it loads early and quick leavers are counted", "Put it only on the home page", "Put it in the <noscript> section"],
      answer: 1, explain: "Placing it high means it loads early, so visitors who leave quickly are still counted.",
      wrongWhy: { "0": "Location matters: low placement loads later and can miss quick leavers.", "2": "It must be on every page you want to track.", "3": "The <noscript> part belongs to the GTM snippet and only serves browsers with JavaScript off." },
      slide: 16, section: "c2t2-n5" },
    { id: "c2t2-q6", type: "multi", difficulty: "medium", prompt: "Which can stop or change what a client-side tag sends? (Select all that apply.)",
      options: ["Ad blockers", "Privacy settings", "Slow connections", "Cookie restrictions", "The G- prefix"],
      answer: [0, 1, 2, 3], explain: "The browser is not under your control; ad blockers, privacy settings, slow connections and cookie restrictions can all interfere.", slide: 11, section: "c2t2-n1" },
    { id: "c2t2-q7", type: "mcq", difficulty: "medium", prompt: "Which is Step 5 of the GA4 setup roadmap?",
      options: ["Set up data filters (e.g., exclude internal traffic)", "Mark key events", "Set up Google Tag Manager", "Configure consent mode"],
      answer: 0, explain: "Step 5 is setting up data filters, such as excluding internal traffic.",
      wrongWhy: { "1": "Key events are Step 4.", "2": "GTM setup is Step 2.", "3": "Consent mode and testing are Step 7." },
      slide: 13, section: "c2t2-n2" },
    { id: "c2t2-q8", type: "tf", difficulty: "hard", prompt: "In GA4 today, 'conversion' and 'key event' mean exactly the same thing.",
      answer: false, explain: "Key events are GA4's term; 'conversion' is now used for actions imported into Google Ads for bidding.", slide: 13, section: "c2t2-n2" },
    { id: "c2t2-q9", type: "mcq", difficulty: "hard", prompt: "What should the analyst do?",
      scenario: "A marketing analyst has the Google tag but no access to edit the website's code.",
      options: ["Send the code to the development team with instructions to paste it first in the <head> of every page", "Paste the code into a GA4 Exploration", "Email the code to Google", "Wait for GA4 to install itself"],
      answer: 0, explain: "In real companies the analyst sends the code to developers with clear instructions.",
      wrongWhy: { "1": "Explorations are for analysis, not installing code.", "2": "Google does not install code on your site.", "3": "GA4 cannot collect anything until the code is live on the site." },
      slide: 16, section: "c2t2-n5" },
    { id: "c2t2-q10", type: "fill", difficulty: "hard", prompt: "The gtag() function simply pushes commands into the ____.",
      answer: ["dataLayer", "data layer", "window.dataLayer"], explain: "function gtag(){dataLayer.push(arguments);} pushes commands into dataLayer.", slide: 15, section: "c2t2-n4" },
    { id: "c2t2-q11", type: "multi", difficulty: "hard", prompt: "Problem-solving: you see a hit to google-analytics.com/g/collect from a visitor's browser. Which statements are true? (Select all that apply.)",
      options: ["This is client-side tagging", "The tag ran on the same page as the visitor", "The web server created the hit", "An ad blocker could have stopped it"],
      answer: [0, 1, 3], explain: "The browser sends hits in client-side tagging; the tag runs on the page; ad blockers can block it. The web server sending data would be server-side.", slide: 11, section: "c2t2-n1" }
  ]
},

/* ============================== c2t3 ============================== */
{
  id: "c2t3",
  title: "Google Tag Manager: Tags, Triggers, Preview & Publish",
  slides: [24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  minutes: 22,
  overview: {
    about: "What Google Tag Manager is, the container-tag-trigger-variable model, how to add the Google tag with a G- Tag ID and an Initialization – All Pages trigger, how to install the two GTM snippets, and why nothing goes live until you Preview, Submit and Publish.",
    why: "GTM is how most websites deliver GA4 and other tags. Understanding tags and triggers lets you add tracking in minutes without a website release, and testing before publishing protects the data.",
    objectives: [
      "Explain what GTM does and why it has no reports of its own.",
      "Define container, tag, trigger and variable.",
      "Add a Google tag with a Tag ID and the recommended trigger.",
      "Place the two GTM snippets correctly.",
      "Describe the Preview → Submit → Publish workflow and rollback."
    ],
    vocabulary: [
      { term: "Google Tag Manager", def: "A free tag management system from Google.", slide: 24 },
      { term: "Container", def: "Holds all the tags, triggers and variables for one website (or app); its ID starts with GTM-.", slide: 27 },
      { term: "Tag", def: "Code that sends data somewhere: what to do.", slide: 27 },
      { term: "Trigger", def: "The rule that makes a tag fire: when to do it.", slide: 27 },
      { term: "Variable", def: "The values used by tags and triggers (e.g., Page URL, Click Text, a product price).", slide: 27 },
      { term: "Preview (Tag Assistant)", def: "Opens your site and shows which tags fired, which did not, and why.", slide: 35 },
      { term: "Exception (blocking) trigger", def: "A trigger that stops a tag firing in certain cases.", slide: 36 }
    ],
    hook: "Send THIS data to THAT tool WHEN this happens. That one sentence is all of GTM."
  },
  notes: [
    {
      id: "c2t3-n1",
      heading: "What GTM is: a delivery system for tags",
      slides: [24, 25, 26],
      fromSlides: [
        { text: "Google Tag Manager is a free tag management system from Google.", slide: 24 },
        { text: "How it works: you install one container snippet; inside it you choose which tags send data, where, and when.", slide: 24 },
        { text: "Tags are small code inserts in the backend of your website that allow us to send certain information to external applications or measure certain events on our website.", slide: 25 },
        { text: "This tag, once implemented on your website, will send all the necessary information to Google Analytics to measure the sessions that our website has had, the users, the page views, etc..", slide: 26 }
      ],
      simple: "GTM is a free tool that lets you manage tracking codes in one place. You install one container snippet on the website once, then add or change tags inside GTM. GTM itself collects nothing and has no reports; it only delivers tags.",
      deep: "Instead of asking developers to add every tracking code, you install one GTM container snippet once. Marketers and analysts then add, edit and remove tags in the GTM interface. The container can send data to Google Analytics, Google Ads, Floodlight, and third-party tools such as Meta Pixel, LinkedIn Insight or Hotjar. GTM does not collect data by itself and has no reports: it decides which tags run, when, and with which values. Benefits are speed (tracking live in minutes without a website release), control (every change is a version you can roll back), testing (Preview mode) and collaboration (workspaces and user permissions). Most tags are built from templates, so you fill in fields instead of writing JavaScript. In the flow on slide 26, the server delivers the page, the browser runs the container, the container pushes data into the dataLayer and fires the Google tag, and data goes to Google Analytics.",
      exam: [
        "GTM = free tag management system; no data collection or reports of its own.",
        "Install one container snippet once; then manage tags in GTM.",
        "Benefits: speed, control (versions/rollback), testing (Preview), collaboration.",
        "Can send to GA4, Google Ads, Floodlight, Meta Pixel, LinkedIn Insight, Hotjar.",
        "Tags are mostly built from templates."
      ],
      definitions: [
        { term: "Tag", def: "Small code inserts in the backend of your website that allow us to send certain information to external applications or measure certain events on our website.", slide: 25 }
      ],
      keyFacts: [
        "In an optimized container (2026), GA4 is connected as a Destination and data is sent directly without loading gtag.js separately."
      ],
      examples: ["A marketer adds a LinkedIn Insight tag in GTM in minutes, without waiting for a website release."],
      misconceptions: [
        "Myth: GTM has its own reports. GTM is only a delivery system; reports are in GA4.",
        "Myth: every new tag needs a developer to edit the site. After the container is installed, changes happen in GTM."
      ]
    },
    {
      id: "c2t3-n2",
      heading: "The GTM vocabulary: container, tag, trigger, variable",
      slides: [27, 28],
      fromSlides: [
        { text: "Container = one site's tags", slide: 27 },
        { text: "Tag = code that sends data", slide: 27 },
        { text: "Trigger = when a tag fires", slide: 27 },
        { text: "Configuration. Where the data collected by the tag will go.", slide: 28 },
        { text: "Triggering. What type of data you want to collect and when to run (fire) the code", slide: 28 }
      ],
      simple: "A container holds everything for one website. A tag is what to do, a trigger is when to do it, and a variable holds values like the page URL. Every tag has two parts: configuration (where data goes) and triggering (when it fires).",
      deep: "The container holds all the tags, triggers and variables for one website or app and is installed with one snippet whose ID starts with GTM-; one website gets one container. A tag is what to do: code that sends data somewhere. A trigger is when to do it: the rule that makes a tag fire, such as all pages or a click on a button. A variable holds values used by tags and triggers, such as Page URL, Click Text or a product price. Every tag has a Tag Configuration (what type of tag it is and where the data goes, e.g., a Google tag with a G- ID) and Triggering (when it fires). A tag without a trigger never runs. To add a tag: Workspace → Tags → New, or 'Add a new tag' on the Overview page.",
      exam: [
        "Container = one site's tags, triggers, variables; ID starts with GTM-.",
        "Tag = what; Trigger = when; Variable = values.",
        "Tag Configuration = where data goes; Triggering = when it fires.",
        "A tag without a trigger never runs.",
        "One website → one container."
      ],
      definitions: [
        { term: "Container", def: "Holds all the tags, triggers and variables for one website (or app). You install it with one snippet whose ID starts with GTM-.", slide: 27 },
        { term: "Variable", def: "The values used by tags and triggers (e.g., Page URL, Click Text, a product price).", slide: 27 }
      ],
      keyFacts: ["Add a tag via Workspace → Tags → New."],
      examples: ["Send page_view data (tag) to GA4 G-PSW1MY7HB4 (configuration) on every page (trigger)."],
      misconceptions: ["Myth: a tag fires once it is saved. Without a trigger, a tag never runs."]
    },
    {
      id: "c2t3-n3",
      heading: "Adding the Google tag: Tag ID and trigger",
      slides: [29, 30, 31, 32],
      fromSlides: [
        { text: "Click on the Tag Configuration button to choose the type of tag you want to create.", slide: 29 },
        { text: "You'll then be taken to a new window where you enter your Tag ID — the GA4 Measurement ID that starts with G- (e.g., G-PSW1MY7HB4).", slide: 31 },
        { text: "Google recommends Initialization – All Pages for the Google tag so it loads before other tags; older tutorials use All Pages, which also works.", slide: 32 },
        { text: "2026 update: in an optimized container, GA4 can be added as a Destination in Settings instead.", slide: 29 }
      ],
      simple: "Open Tag Configuration, choose Google Analytics, then Google Tag. Enter the G- Measurement ID as the Tag ID. For triggering, Google recommends Initialization – All Pages so the Google tag loads before other tags.",
      deep: "Clicking Tag Configuration opens the tag gallery; Google Analytics and Google Ads are featured, and many others (Meta, LinkedIn, TikTok, Hotjar) are in the Community Template Gallery. Under Google Analytics there are two main options: Google Tag, which loads GA4 on every page and sends the page_view event and replaced the old 'GA4 Configuration' tag in 2023; and Google Analytics: GA4 Event, which sends a specific event such as form_submit or purchase, one per custom event. Universal Analytics tags appear only as legacy items. Enter the Tag ID, the G- Measurement ID. A Constant variable such as {{GA4 ID}} lets you change the ID in one place, and 'Google Tag: Configuration Settings' or 'Event Settings' variables reuse settings across tags. For triggering, Initialization – All Pages fires before ordinary page-view triggers, so the Google tag and consent defaults load first; All Pages also works on most sites. In an optimized container, GA4 can instead be a Destination in Settings, but the classic method still works.",
      exam: [
        "Tag Configuration → Google Analytics → Google Tag.",
        "Google Tag replaced 'GA4 Configuration' tag in 2023; GA4 Event tag = one per custom event.",
        "Tag ID = G- Measurement ID.",
        "Recommended trigger: Initialization – All Pages (fires before page-view triggers).",
        "Tip: store the ID in a Constant variable."
      ],
      definitions: [
        { term: "Google Tag (in GTM)", def: "Loads GA4 on every page and sends the page_view event.", slide: 30 },
        { term: "Google Analytics: GA4 Event", def: "Sends a specific event (e.g., form_submit, purchase) with parameters.", slide: 30 }
      ],
      keyFacts: [
        "Common trigger types: Page View, DOM Ready, Window Loaded, Click – All Elements, Click – Just Links, Form Submission, Element Visibility, Scroll Depth, Custom Event.",
        "Universal Analytics no longer processes data."
      ],
      examples: ["Store G-PSW1MY7HB4 in a Constant variable {{GA4 ID}}; if the stream changes, edit one variable instead of every tag."],
      misconceptions: [
        "Myth: you must use 'GA4 Configuration' tags. The Google Tag replaced it in 2023.",
        "Myth: All Pages is wrong. It still works on most sites; Initialization – All Pages is the recommendation."
      ]
    },
    {
      id: "c2t3-n4",
      heading: "Installing the container: two snippets",
      slides: [33, 34],
      fromSlides: [
        { text: "Copy/past your Google Tag Manager code to your website", slide: 33 },
        { text: "JavaScript code (main code)", slide: 34 },
        { text: "Non JavaScript (JS) when JS is disabled by the user", slide: 34 }
      ],
      simple: "GTM gives you two snippets. The JavaScript one goes as high as possible in the <head>. The <noscript> one goes right after the opening <body> tag for browsers with JavaScript turned off.",
      deep: "To get the code, click the container ID (GTM-XXXXXXX) at the top of the workspace or go to Admin → Install Google Tag Manager. The JavaScript snippet goes as high as possible in the <head> of every page; it loads gtm.js, the container. The <noscript> snippet goes immediately after the opening <body> tag; it is a fallback iframe for rare browsers with JavaScript turned off and can only support very simple tags. You install the container once, and from then on all tracking changes are made inside GTM.",
      exam: [
        "Get code: click GTM-XXXXXXX or Admin → Install Google Tag Manager.",
        "JS snippet: high in <head>; loads gtm.js.",
        "<noscript> snippet: right after opening <body>; JS-disabled fallback.",
        "Install once; then change tracking in GTM."
      ],
      definitions: [
        { term: "gtm.js", def: "The container, loaded by the JavaScript snippet.", slide: 34 },
        { term: "<noscript> snippet", def: "A fallback iframe for the rare browsers that have JavaScript turned off; it can only support very simple tags.", slide: 34 }
      ],
      keyFacts: ["The container ID looks like GTM-XXXXXXX."],
      examples: ["A developer pastes the JS snippet in <head> and the iframe after <body> once; the marketing team never asks for code changes again for tracking."],
      misconceptions: ["Myth: both snippets go in the <head>. The <noscript> snippet goes right after the opening <body> tag."]
    },
    {
      id: "c2t3-n5",
      heading: "Triggers listen; Preview, Submit and Publish",
      slides: [35, 36],
      fromSlides: [
        { text: "If you don't submit, your GTM will not work.", slide: 35 },
        { text: "You should debug your tags using the 'preview' option before you click on submit", slide: 35 },
        { text: "Tags fire in response to events. In Google Tag Manager, a trigger listens to your web page or mobile app for certain types of events like form submissions, button clicks, or page views.", slide: 36 },
        { text: "Every tag must have at least one trigger in order to fire (work).", slide: 36 }
      ],
      simple: "A trigger listens for an event like a click, and when its conditions are true it fires the tag. Nothing you build reaches the live site until you Submit and Publish. Always test with Preview first.",
      deep: "When an event happens and the trigger's conditions are true, for example Click Text equals 'Download', the trigger tells the tag to fire. Every tag needs at least one trigger, and a tag can also have exception (blocking) triggers, such as not firing the purchase tag on the test environment. The workflow is: build in a workspace → Preview (Tag Assistant shows which tags fired, which did not, and why) → fix problems → Submit → give the version a clear name and description → Publish. Since September 2026 the Submit page suggests an AI-written version name and description; always read and correct it, because version history is your audit trail. If a published version causes problems, go to Versions and publish the previous version (rollback). The model in summary: website (property) → GTM container → tags (code) → triggers (rules that run the code).",
      exam: [
        "Triggers listen for events (page views, clicks, form submissions).",
        "Every tag needs at least one trigger; exception triggers block firing.",
        "Workflow: workspace → Preview → fix → Submit → name/describe → Publish.",
        "Since Sep 2026: AI-suggested version name/description; review it.",
        "Rollback: Versions → publish the previous version."
      ],
      definitions: [
        { term: "Trigger", def: "Listens to your web page or mobile app for certain types of events like form submissions, button clicks, or page views.", slide: 36 },
        { term: "Rollback", def: "Going to Versions and publishing the previous version when a published version causes problems.", slide: 35 }
      ],
      keyFacts: [
        "Nothing reaches the live website until you Submit and Publish.",
        "Version history is the audit trail when something breaks."
      ],
      examples: ["Exception trigger: do not fire the purchase tag on the test environment."],
      misconceptions: [
        "Myth: saving a tag makes it live. It is live only after Submit and Publish.",
        "Myth: the AI-suggested version name can be accepted without reading. Always review and correct it."
      ]
    }
  ],
  steps: [
    { title: "Add a new tag", what: "In GTM go to Workspace → Tags → New, or click 'Add a new tag' on the Overview page.", why: "Every piece of tracking in GTM starts as a tag.", practical: "Give the tag a clear name so others understand it.",
      check: { q: "Where do you add a new tag?", options: ["Workspace → Tags → New", "GA4 → Explorations", "Admin → Data filters", "View page source"], answer: 0, explain: "To add a tag: Workspace → Tags → New (or 'Add a new tag' on the Overview page)." } },
    { title: "Choose the tag type", what: "Click Tag Configuration, choose Google Analytics, then Google Tag.", why: "Tag Configuration decides what the tag is and where its data goes.", practical: "Other tools are in the Community Template Gallery.", visual: "Tag Configuration → Google Analytics → Google Tag",
      check: { q: "Which tag loads GA4 on every page and sends page_view?", options: ["Google Analytics: GA4 Event", "Google Tag", "Universal Analytics", "Custom HTML"], answer: 1, explain: "The Google Tag loads GA4 on every page and sends page_view; it replaced GA4 Configuration in 2023." } },
    { title: "Enter the Tag ID", what: "Type the GA4 Measurement ID (G-…) as the Tag ID.", why: "The ID tells the tag which data stream receives the data.", practical: "Store it in a Constant variable like {{GA4 ID}} to change it in one place.", visual: "Tag ID: G-PSW1MY7HB4",
      check: { q: "What goes into the Tag ID field?", options: ["The GTM- container ID", "The G- Measurement ID", "A UA- ID", "The website URL"], answer: 1, explain: "The Tag ID is the GA4 Measurement ID that starts with G-." } },
    { title: "Add the trigger", what: "Open Triggering and choose Initialization – All Pages.", why: "A tag without a trigger never runs; Initialization fires before other page-view triggers.", practical: "All Pages also works on most sites, as older tutorials show.",
      check: { q: "Which trigger does Google recommend for the Google tag?", options: ["Click – Just Links", "Initialization – All Pages", "Scroll Depth", "Form Submission"], answer: 1, explain: "Initialization – All Pages loads the Google tag before other tags." } },
    { title: "Install the container snippets", what: "Copy the JS snippet into the top of <head> and the <noscript> snippet right after the opening <body>.", why: "Without the container on the site, no GTM tag can run.", practical: "Find them by clicking GTM-XXXXXXX or via Admin → Install Google Tag Manager.",
      check: { q: "Where does the <noscript> snippet go?", options: ["At the end of <head>", "Immediately after the opening <body> tag", "In GA4 Admin", "In a Constant variable"], answer: 1, explain: "The <noscript> fallback goes immediately after the opening <body> tag." } },
    { title: "Test in Preview", what: "Click Preview; Tag Assistant opens your site and shows which tags fired, which did not, and why.", why: "You catch problems before visitors and reports are affected.", practical: "Fix any problems, then preview again.",
      check: { q: "What does Preview (Tag Assistant) show?", options: ["Which tags fired, which did not, and why", "Last year's GA4 data", "BigQuery tables", "The Meta Pixel ID"], answer: 0, explain: "Tag Assistant shows which tags fired, which did not, and why." } },
    { title: "Submit and Publish", what: "Click Submit, name and describe the version, then Publish.", why: "If you don't submit, your GTM will not work; nothing is live before publishing.", practical: "Review the AI-suggested version name (since September 2026). Roll back via Versions if needed.",
      check: { q: "What happens if you never click Submit?", options: ["Tags go live after 24 hours", "Your GTM changes never reach the live site", "GA4 publishes them for you", "Only the noscript snippet works"], answer: 1, explain: "Nothing you build in GTM reaches the live website until you Submit and Publish." } }
  ],
  visual: {
    type: "dragsort",
    title: "Container, tag, trigger or variable?",
    caption: "Sort each item into the GTM building block it belongs to.",
    slides: [27, 28, 30, 32],
    data: {
      buckets: [
        { id: "container", label: "Container" },
        { id: "tag", label: "Tag (what)" },
        { id: "trigger", label: "Trigger (when)" },
        { id: "variable", label: "Variable (values)" }
      ],
      items: [
        { text: "GTM-ABC1234", bucket: "container", why: "The container ID starts with GTM- and holds one site's tags, triggers and variables." },
        { text: "Google Tag with ID G-PSW1MY7HB4", bucket: "tag", why: "A tag is code that sends data; this one sends to a GA4 stream." },
        { text: "GA4 Event: form_submit", bucket: "tag", why: "GA4 Event tags send a specific event with parameters." },
        { text: "Initialization – All Pages", bucket: "trigger", why: "It decides when the Google tag fires." },
        { text: "Click Text equals 'Download'", bucket: "trigger", why: "A trigger condition that fires a tag when the event happens." },
        { text: "Page URL", bucket: "variable", why: "A value used by tags and triggers." },
        { text: "{{GA4 ID}} Constant", bucket: "variable", why: "A Constant variable storing the Measurement ID." },
        { text: "Click Text", bucket: "variable", why: "A value that triggers can check." }
      ]
    }
  },
  examples: [
    {
      concept: "Tracking a Download button",
      example: "You want GA4 to record clicks on a button whose text is 'Download'.",
      walkthrough: [
        "Tag: Google Analytics: GA4 Event that sends the event.",
        "Trigger: a click trigger with the condition Click Text equals 'Download'.",
        "Variable: Click Text is the value the trigger checks.",
        "Preview to confirm it fires, then Submit and Publish."
      ],
      application: "Any custom action follows the same pattern: what (tag), when (trigger), values (variables).",
      check: { q: "Which part decides WHEN the event is sent?", options: ["The tag", "The trigger", "The container", "The Measurement ID"], answer: 1, explain: "A trigger is the rule that makes a tag fire." }
    },
    {
      concept: "Fixing a broken publish",
      example: "After publishing a new version, the purchase tag stops sending data.",
      walkthrough: [
        "Open Versions in GTM.",
        "Publish the previous working version (rollback).",
        "Fix the issue in a workspace and test in Preview.",
        "Submit with a clear version name and description, then Publish."
      ],
      application: "Clear version names and descriptions make the history a useful audit trail.",
      check: { q: "How do you roll back a bad GTM version?", options: ["Delete the container", "Go to Versions and publish the previous version", "Change the G- ID", "Remove the noscript snippet"], answer: 1, explain: "Rollback = Versions → publish the previous version." }
    }
  ],
  flashcards: [
    { id: "c2t3-f1", front: "Does GTM collect data or have reports?", back: "No. It is a delivery system that decides which tags run, when, and with which values.", slide: 24 },
    { id: "c2t3-f2", front: "Container, tag, trigger in one line each?", back: "Container = one site's tags; Tag = code that sends data; Trigger = when a tag fires.", slide: 27 },
    { id: "c2t3-f3", front: "Two parts of every GTM tag?", back: "Tag Configuration (where data goes) and Triggering (when it fires).", slide: 28 },
    { id: "c2t3-f4", front: "Which tag replaced 'GA4 Configuration' in 2023?", back: "The Google Tag.", slide: 30 },
    { id: "c2t3-f5", front: "Recommended trigger for the Google tag?", back: "Initialization – All Pages.", slide: 32 },
    { id: "c2t3-f6", front: "Where do the two GTM snippets go?", back: "JS snippet high in <head>; <noscript> right after the opening <body>.", slide: 34 },
    { id: "c2t3-f7", front: "What happens if you don't Submit?", back: "Your GTM will not work; nothing reaches the live site.", slide: 35 },
    { id: "c2t3-f8", front: "Minimum number of triggers for a tag to fire?", back: "At least one.", slide: 36 },
    { id: "c2t3-f9", front: "What changed on the Submit page in September 2026?", back: "It suggests an AI-written version name and description to review.", slide: 35 }
  ],
  quiz: [
    { id: "c2t3-q1", type: "tf", difficulty: "easy", prompt: "Google Tag Manager is a free tag management system.",
      answer: true, explain: "The slide calls GTM a free tag management system from Google.", slide: 24, section: "c2t3-n1" },
    { id: "c2t3-q2", type: "mcq", difficulty: "easy", prompt: "In GTM, what is a trigger?",
      options: ["Code that sends data", "The rule that decides when a tag fires", "A GA4 report", "The container snippet"],
      answer: 1, explain: "Trigger = when a tag fires.",
      wrongWhy: { "0": "That is a tag.", "2": "GTM has no reports.", "3": "The snippet installs the container." },
      slide: 27, section: "c2t3-n2" },
    { id: "c2t3-q3", type: "fill", difficulty: "easy", prompt: "A GTM container ID starts with the prefix ____.",
      answer: ["GTM-", "GTM"], explain: "The container is installed with a snippet whose ID starts with GTM-.", slide: 27, section: "c2t3-n2" },
    { id: "c2t3-q4", type: "match", difficulty: "medium", prompt: "Match each GTM term to its meaning.",
      options: [["Container", "Holds one site's tags, triggers and variables"], ["Tag", "Code that sends data"], ["Trigger", "When a tag fires"], ["Variable", "Values like Page URL or Click Text"]],
      explain: "These four words are the core GTM vocabulary.", slide: 27, section: "c2t3-n2" },
    { id: "c2t3-q5", type: "mcq", difficulty: "medium", prompt: "Why is nothing happening?",
      scenario: "A marketer builds a perfect Google tag in GTM and tests it in Preview, but GA4 shows no live data from real visitors a day later.",
      options: ["The tag was never submitted and published", "GA4 needs a view", "The Tag ID should be a UA- ID", "Preview publishes automatically after 24 hours"],
      answer: 0, explain: "Nothing you build in GTM reaches the live website until you Submit and Publish.",
      wrongWhy: { "1": "GA4 has no views.", "2": "UA- belonged to Universal Analytics, which is retired.", "3": "Preview only tests; it never publishes." },
      slide: 35, section: "c2t3-n5" },
    { id: "c2t3-q6", type: "multi", difficulty: "medium", prompt: "Which are benefits of GTM listed on the slides? (Select all that apply.)",
      options: ["Speed: tracking live in minutes", "Control: versions you can roll back", "Testing with Preview mode", "Built-in GA4-style reports", "Collaboration via workspaces and permissions"],
      answer: [0, 1, 2, 4], explain: "Speed, control, testing and collaboration. GTM has no reports.", slide: 25, section: "c2t3-n1" },
    { id: "c2t3-q7", type: "mcq", difficulty: "medium", prompt: "Where should the GTM <noscript> snippet be placed?",
      options: ["Immediately after the opening <body> tag", "At the bottom of the <head>", "In the GA4 data stream", "Inside the Google tag"],
      answer: 0, explain: "The <noscript> fallback iframe goes immediately after the opening <body> tag.",
      wrongWhy: { "1": "The JavaScript snippet goes in the <head>; the noscript part goes in the <body>.", "2": "Snippets go on the website, not in GA4.", "3": "It is a separate GTM fallback, not part of gtag.js." },
      slide: 34, section: "c2t3-n4" },
    { id: "c2t3-q8", type: "tf", difficulty: "hard", prompt: "A tag with a perfect configuration but no trigger will still fire on every page.",
      answer: false, explain: "A tag without a trigger never runs; every tag needs at least one trigger.", slide: 36, section: "c2t3-n5" },
    { id: "c2t3-q9", type: "mcq", difficulty: "hard", prompt: "Which trigger setup is best?",
      scenario: "You want the Google tag and consent defaults to load before every other tag on the site.",
      options: ["Initialization – All Pages", "Window Loaded", "Click – All Elements", "Scroll Depth"],
      answer: 0, explain: "Initialization triggers fire before ordinary page-view triggers, so the Google tag and consent defaults load first.",
      wrongWhy: { "1": "Window Loaded fires late, after the page has loaded.", "2": "Click triggers only fire when a visitor clicks.", "3": "Scroll Depth only fires when the visitor scrolls." },
      slide: 32, section: "c2t3-n3" },
    { id: "c2t3-q10", type: "fill", difficulty: "hard", prompt: "A trigger that stops a tag firing in certain cases is called an exception or ____ trigger.",
      answer: ["blocking"], explain: "Exception (blocking) triggers stop a tag firing, e.g., the purchase tag on the test environment.", slide: 36, section: "c2t3-n5" },
    { id: "c2t3-q11", type: "multi", difficulty: "hard", prompt: "Problem-solving: you must track clicks on a 'Download' button. What do you need? (Select all that apply.)",
      options: ["A GA4 Event tag", "A trigger with Click Text equals 'Download'", "A new GA4 property", "Preview, then Submit and Publish", "A UA- tracking ID"],
      answer: [0, 1, 3], explain: "A GA4 Event tag (what), a click trigger (when), and testing then publishing. No new property or UA- ID is needed.", slide: 36, section: "c2t3-n5" },
    { id: "c2t3-q12", type: "mcq", difficulty: "hard", prompt: "What should you do with the AI-suggested version name on the Submit page?",
      options: ["Read and correct it before publishing", "Always accept it unchanged", "Delete the version history", "Ignore it; names are not saved"],
      answer: 0, explain: "Since September 2026 the Submit page suggests one; always review it, because version history is your audit trail.",
      wrongWhy: { "1": "The slides say to review and edit it.", "2": "Version history is needed for audits and rollback.", "3": "Names are saved as part of the version history." },
      slide: 35, section: "c2t3-n5" }
  ]
},

/* ============================== c2t4 ============================== */
{
  id: "c2t4",
  title: "What's New in GTM (2024–2026) & Reading GTM-, G-, AW- IDs",
  slides: [37, 38, 39, 40, 41, 42, 43, 44],
  minutes: 22,
  overview: {
    about: "The GTM changes from June 2024 to October 2026, the unification of the Google tag and GTM, optimized containers and destinations, the new Settings page, the step-by-step container upgrade, and how to recognise GTM-, G- and AW- snippets and what each may run.",
    why: "Today's GTM screens differ from older tutorials. Recognising the new vocabulary and reading snippet IDs correctly helps you follow current documentation and avoid tags that silently do not run.",
    objectives: [
      "Describe the main GTM changes on the 2024–2026 timeline.",
      "Explain destinations and optimized containers and why they are faster.",
      "List the main options on the new Settings page.",
      "Follow the seven container upgrade steps safely.",
      "Tell GTM-, G- and AW- snippets apart and predict which tags can run."
    ],
    vocabulary: [
      { term: "Destination", def: "The place your data goes, for example your GA4 property or your Google Ads account.", slide: 39 },
      { term: "Optimized container", def: "A GTM container that sends data to its destinations directly (available since October 2026).", slide: 39 },
      { term: "Settings page", def: "In an optimized container, settings entered once for the whole container and used by every destination.", slide: 40 },
      { term: "Visual tagging (test version)", def: "Click a button on your own website and GTM creates the tracking for it.", slide: 38 },
      { term: "gtm.js", def: "Your whole container: every tag, trigger and variable you published in GTM.", slide: 42 },
      { term: "AW- ID", def: "A Google Ads account ID, used for Google Ads conversion tracking.", slide: 44 },
      { term: "Consent override", def: "Google tags stay blocked until the cookie banner says the visitor accepted.", slide: 40 }
    ],
    hook: "Same website, three different IDs. Read the right one and you know exactly what can run."
  },
  notes: [
    {
      id: "c2t4-n1",
      heading: "The 2024–2026 timeline",
      slides: [37],
      fromSlides: [
        { text: "You do not need to memorise the dates — focus on what each change means for you.", slide: 37 },
        { text: "Aug 2026 Google announces: the Google tag and GTM become one tool", slide: 37 },
        { text: "Oct 2026 GTM can send data straight to GA4 and Google Ads", slide: 37 }
      ],
      simple: "Google keeps changing GTM, so new screens look different from old videos. The biggest change, announced in August 2026, is that the Google tag and GTM are becoming one tool. Focus on what each change means, not the exact dates.",
      deep: "The timeline: June 2024, GTM warns you when a tag is broken or missing; August 2024, Google tags can wait until the visitor accepts cookies; May 2025, Google's tracking code can load from your own website address; December 2025, new ready-made variables Client ID, Session ID and Session Number; July 2026, a new-look Overview page and rules on which tags each ID may run; August 2026, Google announces the Google tag and GTM become one tool; September 2026, GTM suggests a name and description when you publish; October 2026, GTM can send data straight to GA4 and Google Ads. The orange items (2024 to mid-2026) are mostly diagnostics, consent and data quality improvements. The blue items (August to October 2026) are part of the unified Google tag plus GTM experience. The classic setup (Google tag plus All Pages or Initialization trigger) still works; the new features are optional upgrades.",
      exam: [
        "Biggest change: Google tag + GTM merging into one (announced Aug 2026).",
        "Oct 2026: optimized containers send data straight to GA4 and Google Ads.",
        "Sep 2026: suggested version name/description on publish.",
        "Jul 2026: new Overview page + rules on which tags each ID may run.",
        "Classic setup still works; new features are optional."
      ],
      definitions: [
        { term: "Unified experience", def: "The Google tag and GTM being merged into one system (August–October 2026 changes).", slide: 37 }
      ],
      keyFacts: [
        "Dec 2025: Client ID, Session ID, Session Number variables.",
        "May 2025: tracking code can load from your own website address.",
        "Aug 2024: Google tags can wait for cookie consent."
      ],
      examples: ["A tutorial from 2023 shows a different Overview page; that is expected after the July 2026 redesign."],
      misconceptions: ["Myth: the classic Google tag setup stopped working in 2026. It still works; the new features are optional upgrades."]
    },
    {
      id: "c2t4-n2",
      heading: "Two tools become one: destinations and optimized containers",
      slides: [38, 39],
      fromSlides: [
        { text: "In August 2026, Google announced it is joining them into one tool.", slide: 38 },
        { text: "Good to know: nothing changes by itself — you choose when to upgrade your container.", slide: 38 },
        { text: "a destination is the place your data goes — for example your GA4 property or your Google Ads account.", slide: 39 },
        { text: "GTM must first download a second file (gtag.js)", slide: 39 }
      ],
      simple: "The Google tag sends data only to Google products and needs code edits to change. GTM can send to Google and other tools and is managed in its interface. Now they are merging, and an optimized container sends data to destinations directly without downloading gtag.js, so pages load faster.",
      deep: "Tool 1, the Google tag (gtag.js), is one piece of code that sends data only to Google products, and changes require editing website code. Tool 2, GTM, is one container installed once that can send data to Google and other tools such as Meta, with tags changed in GTM. After the August 2026 announcement, GTM shows a clearer Overview page that maps where data goes (rarely used menus under 'Show more'), one Settings page for the whole container, and visual tagging in a test version. Nothing changes automatically; the account owner must review and publish the upgrade. Before optimization, GTM loaded, then the Google tag downloaded gtag.js for each tag ID, which added delay and sometimes caused timing problems such as an event firing before configuration loaded. In an optimized container (October 2026), data goes straight to each destination using Destination tags, with settings applied once. Benefits: faster pages, less lost data, one place for settings. Event tags, triggers and variables keep working, and the Conversion Linker tag becomes unnecessary for optimized destinations, but check non-optimized destinations before removing it.",
      exam: [
        "Google tag: Google products only, code edits needed. GTM: any tools, managed in interface.",
        "Destination = GA4 stream (G-) or Google Ads account (AW-).",
        "Optimized container: no extra gtag.js download; faster, less lost data, settings in one place.",
        "Event tags, triggers and variables keep working.",
        "Upgrade is never automatic; Conversion Linker unnecessary only for optimized destinations."
      ],
      definitions: [
        { term: "Optimized container", def: "A GTM container that sends data to its destinations directly (available since October 2026).", slide: 39 },
        { term: "Destination", def: "The place your data goes — for example your GA4 property or your Google Ads account.", slide: 39 }
      ],
      keyFacts: [
        "Less-used items (triggers, variables, templates, folders) move under 'Show more'/Advanced.",
        "Visual tagging is a beta (test version)."
      ],
      examples: ["Before: page → gtm.js → gtag.js → GA4. Now: page → gtm.js → GA4 directly."],
      misconceptions: [
        "Myth: Google upgrades every container automatically. You choose when to upgrade.",
        "Myth: optimizing deletes your event tags. Event tags, triggers and variables keep working."
      ]
    },
    {
      id: "c2t4-n3",
      heading: "The new Settings page",
      slides: [40],
      fromSlides: [
        { text: "Before: every Google tag had its own settings. With three tags, you typed the same settings three times — and they could disagree.", slide: 40 },
        { text: "Now: in an optimized container you enter them once, on the Settings page, and every destination uses them.", slide: 40 },
        { text: "Check who has access: connecting a destination can give its users permission to view your container. Review it in Admin → External Account Links.", slide: 40 }
      ],
      simple: "Instead of repeating settings in every Google tag, an optimized container keeps them once on the Settings page. It also lists destinations, domains, automatic events and consent options. Linking a destination can give other people view access, so check it.",
      deep: "The Destinations list shows every GA4 property and Google Ads account the container sends to, marked 'Optimized: Yes / No', and whether an External account link exists. Configure your domains handles cross-domain measurement so a visit from site.com to shop.site.com is one session, not two. Manage automatic event detection covers enhanced measurement events (scrolls, outbound clicks, site search, file downloads); turn off any you track with your own tags to avoid double counting. Allow user-provided data capabilities supports enhanced conversions, letting Google Ads match sales using a hashed e-mail or phone number. Consent override keeps Google tags blocked until the cookie banner says the visitor accepted, and data transmission decides whether ad data is delayed or fully blocked until consent. Linking can change permissions: people with access to the Google tag may get Read access to the container, so audit Admin → External Account Links.",
      exam: [
        "Settings entered once for all destinations (no disagreeing tags).",
        "Destinations list: Optimized Yes/No.",
        "Domains: site.com + shop.site.com = one visit.",
        "Automatic events: turn off ones you track yourself to avoid double counting.",
        "User-provided data = hashed e-mail/phone; consent override; data transmission; audit External Account Links."
      ],
      definitions: [
        { term: "User-provided data", def: "Lets Google Ads match sales using a scrambled (hashed) e-mail or phone number.", slide: 40 },
        { term: "Data transmission", def: "Decide whether ad data is delayed or fully blocked until the visitor gives consent.", slide: 40 }
      ],
      keyFacts: ["Access changes from linking are reviewed under Admin → External Account Links."],
      examples: ["You built your own scroll tag; turn off automatic scroll detection in Settings so scrolls are not counted twice."],
      misconceptions: ["Myth: connecting a destination never changes who can see your container. It can give its users permission to view it."]
    },
    {
      id: "c2t4-n4",
      heading: "Upgrading a container step by step",
      slides: [41],
      fromSlides: [
        { text: "Hover over the Google tag picture and click Get started ('Optimize for faster, easier tagging').", slide: 41 },
        { text: "GTM lists every change. Click Add to workspace — nothing is live yet.", slide: 41 },
        { text: "Tip: practise on a test copy (a separate workspace) first. Only publish when Preview shows everything still works.", slide: 41 }
      ],
      simple: "Upgrading has seven steps: open Overview, click Get started, choose destinations, settle disagreements, review the summary, test in Preview, then publish. Changes go into a workspace first, so nothing is live until you publish.",
      deep: "Open the Overview page; hover over the Google tag picture and click Get started; tick the GA4 and Google Ads IDs to send data to directly and click Next; if two tags have different settings, choose which to keep (or configure them yourself); review the summary and click Add to workspace; click Preview and check tags still fire, accepting and rejecting cookies; finally Submit and Publish and check the GA4 Realtime report. Changes sit in the workspace until publishing, but access changes created by linking accounts take effect immediately. Test with Preview/Tag Assistant and GA4 DebugView, with consent both granted and denied. Professional practice is to upgrade in a separate workspace and test e-commerce events and custom dimensions carefully before publishing.",
      exam: [
        "7 steps: Overview → Get started → choose destinations → settle disagreements → review summary → Preview → Publish.",
        "Add to workspace = not live yet.",
        "Exception: access changes from linking take effect immediately.",
        "Test with cookies accepted AND rejected.",
        "Confirm in GA4 Realtime after publishing."
      ],
      definitions: [
        { term: "Settle disagreements", def: "If two tags have different settings, choose which one to keep.", slide: 41 }
      ],
      keyFacts: ["Practise on a separate workspace first."],
      examples: ["Two Google tags list different cross-domain domains; during the upgrade you pick which list becomes the container default."],
      misconceptions: ["Myth: clicking Add to workspace makes the upgrade live. Nothing is live until you publish (except access changes from linking)."]
    },
    {
      id: "c2t4-n5",
      heading: "Reading snippets: GTM-, G- and AW-",
      slides: [42, 43, 44],
      fromSlides: [
        { text: "gtm.js is your whole container: every tag, trigger and variable you published in GTM.", slide: 42 },
        { text: "Sends the data to one Google product: a G- ID → that GA4 data stream; an AW- ID → that Google Ads account.", slide: 43 },
        { text: "Recognise it by: gtag/js?id=G-  or  gtag/js?id=AW-   •   A site can list both IDs: one config line for each.", slide: 43 },
        { text: "A G- or AW- snippet only runs Google's own tags, so a Meta Pixel or Custom HTML tag would not work.", slide: 44 }
      ],
      simple: "The ID and the file a snippet loads tell you what is installed. GTM- loads gtm.js, your whole container, and can run any tag. G- and AW- load gtag.js and can only run Google's own tags, so if you build Meta Pixel in GTM, the site needs the GTM- snippet.",
      deep: "The GTM snippet has Part A in the <head>: comment lines that do nothing, w[l]=w[l]||[] which creates the dataLayer and pushes gtm.start and the event gtm.js, code that builds a script element pointing to googletagmanager.com/gtm.js?id=..., and the container ID GTM-ABC1234 passed in on the last line. Part B is a <noscript> iframe after the opening <body>, only for visitors with JavaScript off. The Google tag downloads gtag/js (not gtm.js), creates the dataLayer and gtag(), and its config line sends data to a G- GA4 stream or an AW- Google Ads account; a site can have one config line per ID, and changes require editing code. GTM- IDs are found at the top of the GTM workspace, G- in GA4 → Admin → Data streams, AW- in Google Ads → Goals → Conversions. Since July 2026, because the tools are merging, a G- or AW- ID can also load a container, but such a container can run only Google-provided tags and variables, while a GTM- loaded container is unrestricted. Since October 2026, container snippets start as soon as they load and Google tag settings appear in the dataLayer as an event called gtag.config, so a trigger on every custom event (regex .*) should exclude it.",
      exam: [
        "GTM- → gtm.js → whole container → any tag (GA4, Ads, Meta Pixel, LinkedIn, Custom HTML).",
        "G- → gtag.js → GA4 web data stream → Google's own tags only.",
        "AW- → gtag.js → Google Ads account → Google's own tags only.",
        "Find: GTM- top of workspace; G- GA4 Admin → Data streams; AW- Google Ads → Goals → Conversions.",
        "Using non-Google tags in GTM? Install the GTM- snippet."
      ],
      definitions: [
        { term: "GTM-XXXXXXX", def: "Google Tag Manager container. Loads gtm.js (your whole container).", slide: 44 },
        { term: "G-XXXXXXXXXX", def: "GA4 web data stream (Measurement ID). Loads gtag.js (the Google tag).", slide: 44 },
        { term: "AW-XXXXXXXXX", def: "Google Ads account. Loads gtag.js (the Google tag).", slide: 44 }
      ],
      keyFacts: [
        "Recognise GTM by gtm.js?id=GTM-; the Google tag by gtag/js?id=G- or AW-.",
        "Part B (noscript) only matters for visitors with JavaScript turned off.",
        "Many sites have the GTM snippet only, with GA4 and Google Ads configured inside GTM."
      ],
      examples: ["View page source, search 'GTM-' and 'G-': many sites have the GTM snippet plus GA4 configured inside GTM."],
      misconceptions: [
        "Myth: gtag.js and gtm.js are the same file. gtag.js is the Google tag library; gtm.js is your container.",
        "Myth: any snippet can run a Meta Pixel. G- and AW- snippets run only Google's own tags."
      ]
    }
  ],
  steps: [
    { title: "Open Overview", what: "In your GTM container, open the Overview page.", why: "The guided upgrade starts from the new Overview page.", practical: "Work in a separate workspace (test copy) first.",
      check: { q: "Where does the container upgrade start?", options: ["The Overview page", "GA4 DebugView", "Google Ads → Goals", "View page source"], answer: 0, explain: "Step 1: in your GTM container, open the Overview page." } },
    { title: "Click Get started", what: "Hover over the Google tag picture and click Get started ('Optimize for faster, easier tagging').", why: "This launches Google's guided optimization path.", practical: "Look for the Google tag picture on the Overview map.",
      check: { q: "What text accompanies Get started?", options: ["Optimize for faster, easier tagging", "Delete all tags", "Create a new property", "Install Universal Analytics"], answer: 0, explain: "The button reads Get started ('Optimize for faster, easier tagging')." } },
    { title: "Choose destinations", what: "Tick the GA4 and Google Ads IDs you want GTM to send data to directly, then click Next.", why: "Only ticked IDs become optimized destinations.", practical: "Keep the Conversion Linker for any destination that is not optimized yet.", visual: "[x] G-1A2B3C4D51   [x] AW-123456789",
      check: { q: "Which IDs do you tick in this step?", options: ["GTM- IDs", "GA4 and Google Ads IDs", "UA- IDs", "Meta Pixel IDs"], answer: 1, explain: "Tick the GA4 (G-) and Google Ads (AW-) IDs to send data to directly." } },
    { title: "Settle disagreements", what: "If two tags have different settings, choose which one to keep.", why: "An optimized container has one set of settings for every destination.", practical: "You can also choose not to import them and configure settings yourself.",
      check: { q: "What do you do when two Google tags have different cross-domain lists?", options: ["Choose which settings become the container default", "Keep both forever", "Delete the container", "Nothing; GTM merges them silently"], answer: 0, explain: "You must choose which settings become the default, or configure them yourself." } },
    { title: "Review the summary", what: "GTM lists every change. Click Add to workspace.", why: "You see exactly what will change before anything goes live.", practical: "Remember: access changes from linking accounts take effect immediately.",
      check: { q: "After Add to workspace, is the upgrade live?", options: ["Yes, immediately", "No, nothing is live until you publish", "Only on mobile", "Only in GA4"], answer: 1, explain: "Add to workspace — nothing is live yet (except access changes from linking)." } },
    { title: "Test in Preview", what: "Click Preview and check your tags still fire. Try accepting and rejecting cookies.", why: "Consent behaviour and e-commerce events must still work after the upgrade.", practical: "Use Tag Assistant and GA4 DebugView.",
      check: { q: "How should consent be tested?", options: ["Only with cookies accepted", "With cookies both accepted and rejected", "Consent cannot be tested", "Only in the Realtime report"], answer: 1, explain: "Test with consent both granted and denied." } },
    { title: "Publish", what: "Click Submit, then Publish. Check the GA4 Realtime report to confirm data arrives.", why: "Only publishing makes the optimized container live.", practical: "Only publish when Preview shows everything still works.",
      check: { q: "Which GA4 report confirms data arrives after publishing?", options: ["Realtime", "BigQuery export", "Explorations", "Data filters"], answer: 0, explain: "Check the GA4 Realtime report to confirm data arrives." } }
  ],
  visual: {
    type: "dragsort",
    title: "GTM-, G- or AW-?",
    caption: "Sort each snippet fragment or fact by the kind of ID it belongs to.",
    slides: [42, 43, 44],
    data: {
      buckets: [
        { id: "gtm", label: "GTM- (Tag Manager container)" },
        { id: "g", label: "G- (GA4 web stream)" },
        { id: "aw", label: "AW- (Google Ads account)" }
      ],
      items: [
        { text: "j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;", bucket: "gtm", why: "gtm.js is the container file loaded by the GTM snippet." },
        { text: "<noscript><iframe src=\"https://www.googletagmanager.com/ns.html?id=GTM-ABC1234\">", bucket: "gtm", why: "Part B of the GTM snippet, for visitors with JavaScript off." },
        { text: "Can run Meta Pixel, LinkedIn and Custom HTML tags", bucket: "gtm", why: "A GTM- container can run any tag." },
        { text: "gtag('config', 'G-1A2B3C4D51');", bucket: "g", why: "A G- config line sends data to that GA4 web data stream." },
        { text: "Found in GA4 → Admin → Data streams", bucket: "g", why: "The Measurement ID lives on the data stream." },
        { text: "gtag/js?id=AW-123456789", bucket: "aw", why: "The Google tag configured for a Google Ads account." },
        { text: "Found in Google Ads → Goals → Conversions", bucket: "aw", why: "AW- IDs belong to Google Ads accounts." }
      ]
    }
  },
  examples: [
    {
      concept: "How the GTM snippet works",
      example: "(function(w,d,s,l,i){w[l]=w[l]||[]; w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'}); ... j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl; ...})(window,document,'script','dataLayer','GTM-ABC1234');",
      walkthrough: [
        "Comment lines mark where the snippet starts and ends; they do nothing.",
        "w[l]=w[l]||[] creates the dataLayer if it does not exist (l = 'dataLayer', w = window).",
        "The push records gtm.start and an event called gtm.js.",
        "A new script element loads googletagmanager.com/gtm.js?id=..., your whole container.",
        "The last line passes GTM-ABC1234 so Google knows which container to send."
      ],
      application: "Once this snippet is on the site, tracking changes happen in GTM, not in website code.",
      check: { q: "What does gtm.js contain?", options: ["Only the GA4 config line", "Every tag, trigger and variable you published", "The website's HTML", "Last month's GA4 data"], answer: 1, explain: "gtm.js is your whole container." }
    },
    {
      concept: "Will a non-Google tag run?",
      example: "A website loads only gtag/js?id=AW-123456789. The marketer builds a Meta Pixel tag in GTM.",
      walkthrough: [
        "Read the ID: AW- means a Google Ads account loading gtag.js.",
        "Since July 2026, a container loaded with a G- or AW- ID can run only Google-provided tags and variables.",
        "Meta Pixel is not a Google tag, so it will not run.",
        "Fix: install the GTM- snippet on the website."
      ],
      application: "Before building non-Google tags in GTM, check the site has the GTM- snippet installed.",
      check: { q: "What is the fix so the Meta Pixel runs?", options: ["Add a second AW- config line", "Install the GTM- snippet", "Switch to a UA- ID", "Turn on enhanced measurement"], answer: 1, explain: "Only a GTM- loaded container is unrestricted and can run third-party tags." }
    },
    {
      concept: "Avoiding double counting with automatic events",
      example: "A team already tracks outbound clicks with their own GA4 Event tag and then optimizes the container.",
      walkthrough: [
        "Open the Settings page in the optimized container.",
        "Find Automatic events (manage automatic event detection).",
        "Turn off outbound clicks because you already track them.",
        "Test in Preview so each click is counted once."
      ],
      application: "Review automatic events whenever you also build your own tags for the same actions.",
      check: { q: "Why turn off an automatic event you already track?", options: ["To avoid counting twice", "To speed up GA4 reports", "To remove the Measurement ID", "It is required by GTM"], answer: 0, explain: "Turn off any you already track, to avoid counting twice." }
    }
  ],
  flashcards: [
    { id: "c2t4-f1", front: "What did Google announce in August 2026?", back: "The Google tag and GTM become one tool.", slide: 37 },
    { id: "c2t4-f2", front: "What is a destination?", back: "The place your data goes, e.g., your GA4 property or Google Ads account.", slide: 39 },
    { id: "c2t4-f3", front: "What is an optimized container?", back: "A GTM container that sends data to destinations directly, without downloading gtag.js (since October 2026).", slide: 39 },
    { id: "c2t4-f4", front: "Does Google upgrade containers automatically?", back: "No. Nothing changes by itself; you choose when to upgrade.", slide: 38 },
    { id: "c2t4-f5", front: "Where do you review access after linking destinations?", back: "Admin → External Account Links.", slide: 40 },
    { id: "c2t4-f6", front: "After 'Add to workspace', is the upgrade live?", back: "No, not until you publish (access changes from linking are immediate).", slide: 41 },
    { id: "c2t4-f7", front: "GTM- vs G- vs AW-: which file does each load?", back: "GTM- loads gtm.js (the container); G- and AW- load gtag.js (the Google tag).", slide: 44 },
    { id: "c2t4-f8", front: "Which ID can run a Meta Pixel or Custom HTML tag?", back: "Only GTM-. G- and AW- run only Google's own tags.", slide: 44 },
    { id: "c2t4-f9", front: "Where do you find an AW- ID?", back: "Google Ads → Goals → Conversions.", slide: 44 }
  ],
  quiz: [
    { id: "c2t4-q1", type: "mcq", difficulty: "easy", prompt: "In August 2026, what did Google announce?",
      options: ["The Google tag and GTM become one tool", "GA4 is being retired", "Universal Analytics returns", "GTM will stop being free"],
      answer: 0, explain: "The timeline says Google announced the Google tag and GTM become one tool.",
      wrongWhy: { "1": "Nothing on the slides says GA4 is retired.", "2": "Universal Analytics has been retired.", "3": "The slides describe GTM as free; no pricing change is mentioned." },
      slide: 37, section: "c2t4-n1" },
    { id: "c2t4-q2", type: "tf", difficulty: "easy", prompt: "Upgrading to an optimized container happens automatically for every account.",
      answer: false, explain: "Nothing changes by itself; you choose when to upgrade your container.", slide: 38, section: "c2t4-n2" },
    { id: "c2t4-q3", type: "fill", difficulty: "easy", prompt: "The GTM snippet downloads a file called ____, which is your whole container.",
      answer: ["gtm.js", "gtm"], explain: "gtm.js is your whole container: every tag, trigger and variable you published.", slide: 42, section: "c2t4-n5" },
    { id: "c2t4-q4", type: "match", difficulty: "medium", prompt: "Match each ID to where you find it.",
      options: [["GTM-XXXXXXX", "Top of your GTM workspace"], ["G-XXXXXXXXXX", "GA4 → Admin → Data streams"], ["AW-XXXXXXXXX", "Google Ads → Goals → Conversions"]],
      explain: "Slide 44 lists where each ID is found.", slide: 44, section: "c2t4-n5" },
    { id: "c2t4-q5", type: "multi", difficulty: "medium", prompt: "Why are optimized containers better? (Select all that apply.)",
      options: ["Pages load faster (one file less)", "Less data is lost while the extra file loads", "All settings are kept in one place", "Event tags must be rebuilt from scratch"],
      answer: [0, 1, 2], explain: "Faster pages, less lost data, one place for settings. Event tags, triggers and variables keep working.", slide: 39, section: "c2t4-n2" },
    { id: "c2t4-q6", type: "mcq", difficulty: "medium", prompt: "Which Settings option fixes this?",
      scenario: "A visitor moves from site.com to shop.site.com and GA4 counts one visit as two.",
      options: ["Your domains (cross-domain measurement)", "User-provided data", "Data transmission", "Automatic events"],
      answer: 0, explain: "Configuring your domains tells GA4 that site.com and shop.site.com are one website.",
      wrongWhy: { "1": "User-provided data is for matching sales with hashed e-mail or phone in Google Ads.", "2": "Data transmission controls ad data before consent.", "3": "Automatic events handles scrolls, outbound clicks and downloads." },
      slide: 40, section: "c2t4-n3" },
    { id: "c2t4-q7", type: "mcq", difficulty: "medium", prompt: "During the upgrade, what does clicking 'Add to workspace' do?",
      options: ["Adds the changes to a workspace; nothing is live yet", "Publishes the upgrade immediately", "Deletes old tags", "Creates a new GA4 property"],
      answer: 0, explain: "GTM lists every change; Add to workspace means nothing is live yet.",
      wrongWhy: { "1": "Only Submit and Publish make it live.", "2": "Event tags, triggers and variables keep working.", "3": "The upgrade does not create GA4 properties." },
      slide: 41, section: "c2t4-n4" },
    { id: "c2t4-q8", type: "mcq", difficulty: "hard", prompt: "Will the Meta Pixel tag run?",
      scenario: "A website loads only gtag/js?id=AW-123456789. The marketer builds a Meta Pixel tag in GTM and publishes it.",
      options: ["No — a G- or AW- snippet only runs Google's own tags; install the GTM- snippet", "Yes — AW- can run any tag", "Yes, but only on mobile", "No — Meta Pixel needs a UA- ID"],
      answer: 0, explain: "Since July 2026, a container loaded with G- or AW- can run only Google-provided tags and variables. Install the GTM- snippet.",
      wrongWhy: { "1": "Only a GTM- loaded container is unrestricted.", "2": "The slides mention no mobile exception.", "3": "UA- is retired Universal Analytics and unrelated to Meta Pixel." },
      slide: 44, section: "c2t4-n5" },
    { id: "c2t4-q9", type: "tf", difficulty: "hard", prompt: "During a container upgrade, access changes created by linking accounts take effect immediately, even before you publish.",
      answer: true, explain: "Changes are added to a workspace first, but access changes from linking accounts take effect immediately.", slide: 41, section: "c2t4-n4" },
    { id: "c2t4-q10", type: "multi", difficulty: "hard", prompt: "Problem-solving: which snippet fragments show that a site uses the Google tag (not GTM)? (Select all that apply.)",
      options: ["gtag/js?id=G-1A2B3C4D51", "gtag('config', 'AW-123456789');", "gtm.js?id=GTM-ABC1234", "ns.html?id=GTM-ABC1234"],
      answer: [0, 1], explain: "gtag/js?id=G- or AW- and gtag('config', ...) belong to the Google tag; gtm.js and ns.html with GTM- belong to Tag Manager.", slide: 43, section: "c2t4-n5" },
    { id: "c2t4-q11", type: "fill", difficulty: "hard", prompt: "Since October 2026, Google tag settings appear in the dataLayer as an event called ____, so a .* custom-event trigger should exclude it.",
      answer: ["gtag.config"], explain: "A trigger on every custom event (regex .*) may now also fire on gtag.config, so exclude that event.", slide: 44, section: "c2t4-n5" },
    { id: "c2t4-q12", type: "mcq", difficulty: "hard", prompt: "When can you remove the Conversion Linker tag?",
      options: ["When all relevant Google Ads destinations are optimized", "Never", "As soon as you open the Overview page", "Whenever GA4 is installed"],
      answer: 0, explain: "It becomes unnecessary for optimized destinations, but check destinations that are not yet optimized before removing it.",
      wrongWhy: { "1": "The slides say it becomes unnecessary for optimized destinations.", "2": "Opening Overview changes nothing.", "3": "The Conversion Linker relates to Google Ads, not GA4 installation." },
      slide: 39, section: "c2t4-n2" }
  ]
}

] });
