/* FILE: data/ch2b.js — FocusNest sample lesson content for Chapter 2 (part B, slides 45–75), written from data/slides.js (deck ch2).
   Slide-verbatim text lives in `fromSlides`/`definitions`; all other prose is FocusNest's added explanation. */
(window.FN_SEED = window.FN_SEED || []).push({ chapter: "ch2", order: 2, title: "The Technical Essentials of Web Analytics", topics: [

/* ===================================================================== */
{
  id: "c2t5",
  title: "Consent Mode v2 & the Google Tag Gateway",
  slides: [45, 46, 47],
  minutes: 15,
  overview: {
    about: "How Google tags behave before and after a visitor answers the cookie banner (consent mode, basic vs advanced, the four consent types, GTM's newer consent controls), and how the Google tag gateway loads Google's code from your own domain.",
    why: "If consent is wired up wrongly, GA4 either breaks the law or silently shows far fewer users than you really have. The gateway explains why some visits never reach GA4 and how first-party serving helps, without changing what you are allowed to collect.",
    objectives: [
      "Explain the difference between basic and advanced consent mode.",
      "Name the four consent types and what each one controls.",
      "Describe what GA4 does before and after a visitor clicks Accept.",
      "Explain first party vs third party and how the Google tag gateway changes the snippet address.",
      "Spot a consent race condition and know how to test both consent states in Preview."
    ],
    vocabulary: [
      { term: "CMP", def: "The cookie banner (Consent Management Platform) that asks visitors for consent.", slide: 45 },
      { term: "Consent mode", def: "Lets Google tags adjust their behaviour to the visitor's choice in the cookie banner.", slide: 45 },
      { term: "Cookieless ping", def: "A basic signal that a page view or event happened, carrying no cookie identifier.", slide: 46 },
      { term: "analytics_storage", def: "Consent type that controls cookies for analytics (e.g., GA4 visit duration).", slide: 45 },
      { term: "Race condition", def: "A tag that fires before the banner's choice is applied.", slide: 45 },
      { term: "First party", def: "The site the visitor is on (e.g., shop.com); any other site the page contacts is a third party.", slide: 47 },
      { term: "Google tag gateway", def: "Serves Google's tag code from a path on your own domain (e.g., shop.com/metrics) instead of googletagmanager.com.", slide: 47 }
    ],
    hook: "Your visitor clicked Reject. Does GA4 go blind, or does it still whisper? Let's find out."
  },
  notes: [
    {
      id: "c2t5-n1",
      heading: "Consent mode: basic vs advanced",
      slides: [45],
      fromSlides: [
        { text: "Consent mode lets Google tags adjust their behaviour to the visitor's choice in the cookie banner (the CMP).", slide: 45 },
        { text: "Basic: tags do not load until the visitor consents.", slide: 45 },
        { text: "Advanced: tags load with consent \"denied\" by default and send cookieless pings that Google uses for modelling.", slide: 45 },
        { text: "Privacy laws (e.g., GDPR in the EU) require websites to ask before storing cookies.", slide: 45 }
      ],
      simple: "Privacy laws say a site must ask before storing cookies. Consent mode connects the cookie banner to Google tags. In basic mode the tags wait until the visitor says yes. In advanced mode the tags load straight away but stay in a 'denied' state and only send cookieless pings.",
      deep: "Consent mode is the bridge between the Consent Management Platform (CMP) and Google tags. Basic consent mode is the strict option: Google tags are blocked until the visitor accepts, so nothing is sent before consent. Advanced consent mode loads the tags immediately with consent set to \"denied\". While denied, the tags send cookieless pings, and Google uses them to model (estimate) missing conversions and behaviour. Consent mode v2, required by Google for EEA advertising since 2024, added two signals, ad_user_data and ad_personalization, to the original analytics_storage and ad_storage. So the full set is four consent types.",
      exam: [
        "Basic = tags blocked until consent; Advanced = tags load with 'denied' and send cookieless pings.",
        "Cookieless pings are used by Google for modelling missing data.",
        "Consent mode v2 added ad_user_data and ad_personalization.",
        "The CMP is the cookie banner."
      ],
      definitions: [
        { term: "Consent mode", def: "Lets Google tags respect the visitor's cookie choices.", slide: 74 },
        { term: "Basic consent mode", def: "Tags do not load until the visitor consents.", slide: 45 },
        { term: "Advanced consent mode", def: "Tags load with consent \"denied\" by default and send cookieless pings that Google uses for modelling.", slide: 45 }
      ],
      keyFacts: [
        "Consent mode v2 has been required by Google for EEA advertising since 2024.",
        "Original two types: analytics_storage and ad_storage; v2 added ad_user_data and ad_personalization."
      ],
      examples: [
        "A visitor in the EU sees the banner. With basic mode, GA4 sends nothing until Accept. With advanced mode, GA4 sends cookieless pings straight away."
      ],
      misconceptions: [
        "Advanced mode does not mean full tracking without consent; tags stay 'denied' and send only cookieless pings.",
        "Consent mode is not the banner itself; the banner (CMP) collects the choice, consent mode passes it to Google tags."
      ]
    },
    {
      id: "c2t5-n2",
      heading: "The four consent types and GTM's consent controls",
      slides: [45],
      fromSlides: [
        { text: "analytics_storage | Cookies for analytics (e.g., GA4 visit duration)", slide: 45 },
        { text: "ad_storage | Cookies for advertising", slide: 45 },
        { text: "ad_user_data | Sending user data to Google for ads", slide: 45 },
        { text: "ad_personalization | Personalised advertising / remarketing", slide: 45 },
        { text: "Consent mode override (Aug 2024): sets default consent to denied for chosen regions.", slide: 45 }
      ],
      simple: "There are four consent switches: one for analytics cookies and three for advertising. GTM also has newer tools: an override that defaults consent to denied in chosen regions, a 2026 setting that holds back ad requests until ad_storage is granted, and Preview showing which requests were delayed.",
      deep: "Each consent type controls one kind of data use. analytics_storage covers analytics cookies such as those GA4 uses for visit duration. ad_storage covers advertising cookies, ad_user_data covers sending user data to Google for ads, and ad_personalization covers personalised advertising and remarketing. GTM added the consent mode override in August 2024: it sets default consent to denied for selected regions, overriding the site's own default code. In 2026, 'Manage data transmission' can delay or fully block advertising requests until ad_storage is granted. Also in 2026, Preview shows which requests were delayed because consent was missing. Together these controls let you set safe defaults and then check what really happens.",
      exam: [
        "Know all four consent types and match each to what it controls.",
        "Consent mode override (Aug 2024) = default denied for chosen regions.",
        "Manage data transmission (2026) = block or delay ad requests until ad_storage is granted.",
        "Preview (2026) shows requests delayed for missing consent."
      ],
      definitions: [
        { term: "ad_user_data", def: "Sending user data to Google for ads.", slide: 45 },
        { term: "ad_personalization", def: "Personalised advertising / remarketing.", slide: 45 },
        { term: "Consent mode override", def: "Sets default consent to denied for chosen regions.", slide: 45 },
        { term: "Manage data transmission", def: "Block or delay advertising requests until ad_storage is granted.", slide: 45 }
      ],
      keyFacts: [
        "analytics_storage is the only one of the four that is about analytics; the other three are about advertising.",
        "The override replaces the site's own default consent code for the selected regions."
      ],
      examples: [
        "A company sets the override so visitors in chosen regions start with all consent denied, while other regions start granted."
      ],
      misconceptions: [
        "ad_storage is not the GA4 analytics cookie switch; that is analytics_storage."
      ]
    },
    {
      id: "c2t5-n3",
      heading: "What GA4 does before and after Accept",
      slides: [45, 46],
      fromSlides: [
        { text: "GA4 still works before the visitor accepts, but it works in a limited, cookieless way.", slide: 46 },
        { text: "analytics_storage is set to denied, so GA4 does not create or read its cookies (such as _ga).", slide: 46 },
        { text: "The cookie banner (CMP) sends a consent update with analytics_storage: granted.", slide: 46 },
        { text: "If the cookie banner is not connected to consent mode, GA4 stays \"denied\" for everyone, even visitors who click Accept.", slide: 46 },
        { text: "A tag that fires before the banner's choice is applied is a consent \"race condition\".", slide: 45 }
      ],
      simple: "Before Accept, the Google tag loads but cannot use cookies, so GA4 only gets cookieless pings and cannot recognise returning visitors. After Accept, the banner sends 'analytics_storage: granted' and GA4 tracks fully. If the banner never sends that update, GA4 stays denied for everyone.",
      deep: "The denied default does not block the Google tag; it only sets its starting state. With analytics_storage denied, GA4 does not create or read cookies such as _ga, but it still receives cookieless pings that say a page view or event happened. Because there is no cookie identifier, GA4 cannot link pages or visits to the same person, so that visitor's sessions and users are not counted normally. With enough traffic, GA4 can model the missing behaviour in reports. When the visitor clicks Accept, the CMP sends a consent update with analytics_storage: granted, and from then on GA4 sets its cookies and tracks fully. If the visitor rejects or ignores the banner, GA4 stays cookieless for them. 'Specific analytics parameters' means choosing which consent types start denied and in which regions, for example denying only in EU countries.",
      exam: [
        "Default denied does not block the Google tag; it sets the starting state.",
        "Denied = no _ga cookie, cookieless pings only, users/sessions not counted normally.",
        "Accept triggers a consent update: analytics_storage: granted.",
        "Banner not connected to consent mode = GA4 denied for everyone, far fewer users in reports.",
        "Test Accept and Reject in GTM Preview to catch race conditions."
      ],
      definitions: [
        { term: "Cookieless pings", def: "Basic signals that a page view or event happened. These pings carry no cookie identifier.", slide: 46 },
        { term: "Specific analytics parameters", def: "You choose which consent types start as denied, and in which regions.", slide: 46 }
      ],
      keyFacts: [
        "Modelling of missing behaviour needs enough traffic in the property.",
        "Reject or ignoring the banner both keep GA4 in cookieless mode for that visitor."
      ],
      examples: [
        "A shop's reports suddenly show far fewer users than real. Cause: the banner was never connected to consent mode, so even visitors who click Accept stay 'denied'."
      ],
      misconceptions: [
        "'Denied' does not mean GA4 receives nothing; it still gets cookieless pings.",
        "Clicking Accept does not help if the banner never sends the consent update signal."
      ]
    },
    {
      id: "c2t5-n4",
      heading: "Google tag gateway: loading Google's code from your own site",
      slides: [47],
      fromSlides: [
        { text: "When a visitor is on shop.com, shop.com is the first party. Any other site the page contacts, such as googletagmanager.com, is a third party.", slide: 47 },
        { text: "Ad blockers and browser privacy settings often block third parties, so some visits never reach GA4.", slide: 47 },
        { text: "https://shop.com/metrics/gtm.js?id=GTM-ABC1234", slide: 47 },
        { text: "Result: the browser only talks to shop.com, which passes the data on to Google.", slide: 47 },
        { text: "It changes where the code comes from, not what you are allowed to collect — you still need the visitor's consent.", slide: 47 }
      ],
      simple: "Normally the browser fetches Google's code from googletagmanager.com, a third party that ad blockers often block. With the Google tag gateway, the code comes from a path on your own site, like shop.com/metrics, and your hosting network forwards it to Google. Consent rules still apply.",
      deep: "In the normal setup the browser on shop.com asks Google's tag server (a third party) for the code, and an ad blocker may stop that request, so the visit is missing from GA4 and Google Ads. With the Google tag gateway for advertisers, the site serves Google's code from a path on its own domain. The browser now asks shop.com (first party), and the hosting network (a CDN such as Cloudflare, Akamai or Fastly) or load balancer forwards those requests to Google and returns the answer. In the snippet, only the address changes: www.googletagmanager.com becomes shop.com/metrics, while the container ID GTM-ABC1234 stays the same. '/metrics' is just an example path that you choose. It launched as 'first-party mode' with Cloudflare in late 2024, was renamed Google tag gateway and opened to everyone in May 2025, and more hosting providers were added in 2026. It is not server-side tagging: the gateway only passes Google's requests through your domain, while server-side tagging runs your own server that can change data.",
      exam: [
        "First party = the site you are on; third party = any other site the page contacts.",
        "Gateway changes the snippet address only; the container ID stays the same.",
        "Set up usually in a few clicks from GTM through the website's host (e.g., Cloudflare).",
        "Gateway does not remove the need for consent.",
        "Gateway is not server-side tagging: it does not change the data."
      ],
      definitions: [
        { term: "First party", def: "When a visitor is on shop.com, shop.com is the first party.", slide: 47 },
        { term: "Third party", def: "Any other site the page contacts, such as googletagmanager.com.", slide: 47 }
      ],
      keyFacts: [
        "Normal snippet: https://www.googletagmanager.com/gtm.js?id=GTM-ABC1234",
        "Gateway snippet: https://shop.com/metrics/gtm.js?id=GTM-ABC1234",
        "Timeline: 'first-party mode' with Cloudflare late 2024 → renamed and opened to everyone May 2025 → more providers (Akamai, Fastly, Google Cloud, Amazon CloudFront) in 2026."
      ],
      examples: [
        "A visitor with an ad blocker opens shop.com. The blocker stops googletagmanager.com, but a request to shop.com/metrics looks like the shop's own site and reaches Google through the CDN."
      ],
      misconceptions: [
        "The gateway does not give permission to collect more data.",
        "The gateway is not the same as server-side tagging."
      ]
    }
  ],
  steps: [
    {
      title: "The page loads with consent denied",
      what: "The Google tag still loads, but analytics_storage starts as denied.",
      why: "The denied setting does not block the Google tag; it only sets its starting state.",
      practical: "In GTM Preview, check the Consent tab on the first event: analytics_storage should show denied before any banner click.",
      visual: "analytics_storage: denied",
      check: { q: "Before Accept, is the Google tag blocked?", options: ["Yes, nothing loads", "No, it loads in a limited, cookieless way", "Only on mobile"], answer: 1, explain: "Slide 46: the setting doesn't block the Google tag; it only sets its starting state." }
    },
    {
      title: "No GA4 cookies are created or read",
      what: "Because analytics_storage is denied, GA4 does not create or read cookies such as _ga.",
      why: "Without consent, analytics cookies must not be stored.",
      practical: "In the browser's storage panel, no _ga cookie should appear yet.",
      check: { q: "Which cookie does GA4 NOT set while analytics_storage is denied?", options: ["_ga", "gtm.js", "GTM-ABC1234"], answer: 0, explain: "Slide 46 names _ga as the GA4 cookie that is not created or read." }
    },
    {
      title: "Cookieless pings are sent",
      what: "GA4 still receives basic signals that a page view or event happened, with no cookie identifier.",
      why: "These pings let Google estimate (model) missing behaviour when the property has enough traffic.",
      practical: "Expect fewer recognised users; the visitor's sessions and users are not counted normally.",
      check: { q: "Why can't GA4 recognise the same visitor across pages before consent?", options: ["The ping carries no cookie identifier", "The tag never loads", "The page has no events"], answer: 0, explain: "No cookie means no identifier to link pages or visits." }
    },
    {
      title: "The visitor clicks Accept",
      what: "The cookie banner (CMP) sends a consent update with analytics_storage: granted.",
      why: "The update signal is what switches GA4 out of cookieless mode.",
      practical: "In Preview, click Accept and look for a consent update event showing granted.",
      visual: "analytics_storage: granted",
      check: { q: "What must the banner send when the visitor clicks Accept?", options: ["A new container ID", "A consent update with analytics_storage: granted", "A purchase event"], answer: 1, explain: "Slide 46: the CMP sends a consent update with analytics_storage: granted." }
    },
    {
      title: "GA4 tracks fully (or stays cookieless)",
      what: "After Accept, GA4 sets its cookies and tracks the visitor fully. After Reject or no answer, it stays cookieless for that visitor.",
      why: "Behaviour follows the visitor's actual choice.",
      practical: "Test both Accept and Reject in Preview. If the banner is not connected, GA4 stays denied for everyone and reports show far fewer users than real.",
      check: { q: "A visitor ignores the banner. What happens?", options: ["GA4 tracks fully", "GA4 stays in cookieless mode for that visitor", "The page will not load"], answer: 1, explain: "Slide 46: Reject or ignoring the banner keeps GA4 cookieless." }
    }
  ],
  visual: {
    type: "compare",
    title: "Basic vs advanced consent mode",
    caption: "Both respect the visitor's choice; they differ in what happens before the choice is made.",
    slides: [45, 46],
    data: {
      columns: ["Basic", "Advanced"],
      rows: [
        { label: "Before consent, do tags load?", values: ["No, tags do not load until the visitor consents", "Yes, tags load with consent \"denied\" by default"], detail: "Slide 45." },
        { label: "Data before consent", values: ["Nothing sent", "Cookieless pings"], detail: "Pings carry no cookie identifier (slide 46)." },
        { label: "Modelling", values: ["No pings to model from", "Google uses the pings for modelling"], detail: "Needs enough traffic in the property (slide 46)." },
        { label: "After Accept", values: ["Tags load and track", "Consent update → granted; GA4 sets cookies and tracks fully"], detail: "The banner must send the update signal." }
      ]
    }
  },
  examples: [
    {
      concept: "Banner not connected to consent mode",
      example: "A shop launches a new cookie banner. A week later GA4 shows far fewer users than real, even though many visitors click Accept.",
      walkthrough: [
        "GA4 starts every visit with analytics_storage denied.",
        "Visitors click Accept, but the banner was never connected to consent mode.",
        "No consent update is sent, so GA4 stays denied for everyone.",
        "Fix: connect the banner so it sends analytics_storage: granted, then test Accept and Reject in GTM Preview."
      ],
      application: "Whenever users drop sharply after a banner change, test the consent update in Preview first.",
      check: { q: "What is the root cause here?", options: ["Ad blockers", "The banner does not send the consent update signal", "Wrong container ID"], answer: 1, explain: "Slide 46: if the banner is not connected, GA4 stays denied even for visitors who click Accept." }
    },
    {
      concept: "Google tag gateway snippet change",
      example: "shop.com moves from the normal setup to the Google tag gateway with the path /metrics.",
      walkthrough: [
        "Before: https://www.googletagmanager.com/gtm.js?id=GTM-ABC1234 (third party).",
        "After: https://shop.com/metrics/gtm.js?id=GTM-ABC1234 (first party).",
        "The container ID GTM-ABC1234 stays the same.",
        "The hosting network forwards the requests to Google, and consent is still required."
      ],
      application: "If GA4 is missing visits because of ad blockers, the gateway is a way to serve Google's code from your own domain.",
      check: { q: "What changes in the snippet?", options: ["The container ID", "Only the address the code comes from", "The consent rules"], answer: 1, explain: "Only www.googletagmanager.com becomes shop.com/metrics; the ID stays the same." }
    }
  ],
  flashcards: [
    { id: "c2t5-f1", front: "Basic consent mode", back: "Tags do not load until the visitor consents.", slide: 45 },
    { id: "c2t5-f2", front: "Advanced consent mode", back: "Tags load with consent \"denied\" by default and send cookieless pings that Google uses for modelling.", slide: 45 },
    { id: "c2t5-f3", front: "The four consent types", back: "analytics_storage, ad_storage, ad_user_data, ad_personalization.", slide: 45 },
    { id: "c2t5-f4", front: "Consent race condition", back: "A tag that fires before the banner's choice is applied.", slide: 45 },
    { id: "c2t5-f5", front: "Consent mode override (Aug 2024)", back: "Sets default consent to denied for chosen regions.", slide: 45 },
    { id: "c2t5-f6", front: "What happens to _ga before Accept?", back: "analytics_storage is denied, so GA4 does not create or read its cookies such as _ga.", slide: 46 },
    { id: "c2t5-f7", front: "Banner not connected to consent mode", back: "GA4 stays denied for everyone, even visitors who click Accept; reports show far fewer users than real.", slide: 46 },
    { id: "c2t5-f8", front: "Google tag gateway", back: "Loads Google's code from a path on your own site (e.g., shop.com/metrics) so the browser only talks to the first party.", slide: 47 },
    { id: "c2t5-f9", front: "Does the gateway remove the need for consent?", back: "No. It changes where the code comes from, not what you are allowed to collect.", slide: 47 }
  ],
  quiz: [
    { id: "c2t5-q1", type: "mcq", difficulty: "easy", prompt: "In basic consent mode, what happens before the visitor consents?", options: ["Tags load with consent denied", "Tags do not load", "Tags send full data with cookies", "Only Google Ads tags load"], answer: 1, explain: "Basic: tags do not load until the visitor consents.", wrongWhy: { "0": "That describes advanced consent mode.", "2": "No mode sends full cookie data before consent.", "3": "Basic mode blocks Google tags in general, not selectively." }, slide: 45, section: "c2t5-n1" },
    { id: "c2t5-q2", type: "tf", difficulty: "easy", prompt: "In advanced consent mode, tags send cookieless pings while consent is denied.", answer: true, explain: "Advanced: tags load with consent denied and send cookieless pings that Google uses for modelling.", slide: 45, section: "c2t5-n1" },
    { id: "c2t5-q3", type: "match", difficulty: "medium", prompt: "Match each consent type to what it controls.", options: [["analytics_storage", "Cookies for analytics"], ["ad_storage", "Cookies for advertising"], ["ad_user_data", "Sending user data to Google for ads"], ["ad_personalization", "Personalised advertising / remarketing"]], answer: null, explain: "These are the four consent types in the table on slide 45.", slide: 45, section: "c2t5-n2" },
    { id: "c2t5-q4", type: "fill", difficulty: "easy", prompt: "Before Accept, analytics_storage is denied, so GA4 does not create or read its ___ cookie.", answer: ["_ga", "ga"], explain: "Slide 46 names _ga as the GA4 cookie.", slide: 46, section: "c2t5-n3" },
    { id: "c2t5-q5", type: "mcq", difficulty: "medium", scenario: "A marketer notices GA4 users dropped sharply right after a new cookie banner went live. Many visitors are clicking Accept.", prompt: "What is the most likely cause?", options: ["The banner is not connected to consent mode, so no consent update is sent", "Advanced consent mode blocks the Google tag", "The container ID changed", "GA4 stopped modelling"], answer: 0, explain: "If the banner is not connected, GA4 stays denied for everyone, even visitors who click Accept.", wrongWhy: { "1": "The denied default does not block the Google tag; it only sets its starting state.", "2": "Nothing in the scenario changes the container.", "3": "Modelling estimates missing data; it does not explain users who accepted being missing." }, slide: 46, section: "c2t5-n3" },
    { id: "c2t5-q6", type: "multi", difficulty: "medium", prompt: "Which are true before a visitor clicks Accept (advanced setup)? Select all.", options: ["The Google tag still loads", "GA4 sets the _ga cookie", "GA4 receives cookieless pings", "GA4 can recognise the visitor across visits"], answer: [0, 2], explain: "The tag loads and sends cookieless pings, but no cookie is set, so the visitor cannot be recognised across pages or visits.", slide: 46, section: "c2t5-n3" },
    { id: "c2t5-q7", type: "mcq", difficulty: "hard", scenario: "In GTM Preview you click Reject on the banner, yet a GA4 event with full cookies was already sent a moment earlier.", prompt: "What is this problem called?", options: ["A consent race condition", "The consent mode override", "Modelling", "First-party serving"], answer: 0, explain: "A tag that fires before the banner's choice is applied is a consent race condition.", wrongWhy: { "1": "The override sets default consent to denied for chosen regions; it is a control, not a bug.", "2": "Modelling estimates missing behaviour from pings.", "3": "That relates to the Google tag gateway, not to consent timing." }, slide: 45, section: "c2t5-n2" },
    { id: "c2t5-q8", type: "mcq", difficulty: "hard", prompt: "Which GTM control, introduced in 2026, can block or delay advertising requests until ad_storage is granted?", options: ["Consent mode override", "Manage data transmission", "Google tag gateway", "Specific analytics parameters"], answer: 1, explain: "Manage data transmission (2026): block or delay advertising requests until ad_storage is granted.", wrongWhy: { "0": "The override (Aug 2024) sets default consent to denied for chosen regions.", "2": "The gateway changes where the code is loaded from.", "3": "That chooses which consent types start denied and in which regions." }, slide: 45, section: "c2t5-n2" },
    { id: "c2t5-q9", type: "fill", difficulty: "medium", prompt: "With the Google tag gateway, the snippet https://www.googletagmanager.com/gtm.js?id=GTM-ABC1234 becomes https://shop.com/___/gtm.js?id=GTM-ABC1234 (use the slide's example path).", answer: ["metrics", "/metrics"], explain: "Slide 47 uses /metrics as the example path, which you can choose.", slide: 47, section: "c2t5-n4" },
    { id: "c2t5-q10", type: "tf", difficulty: "medium", prompt: "Because the Google tag gateway makes Google's code first party, you no longer need the visitor's consent.", answer: false, explain: "It changes where the code comes from, not what you are allowed to collect.", slide: 47, section: "c2t5-n4" },
    { id: "c2t5-q11", type: "mcq", difficulty: "hard", prompt: "How does the Google tag gateway differ from server-side tagging?", options: ["The gateway only passes Google's requests through your domain; server-side tagging runs your own server that can change data", "The gateway can hash e-mails; server-side cannot", "They are the same thing with different names", "The gateway changes the container ID"], answer: 0, explain: "Speaker notes on slide 47 make exactly this distinction.", wrongWhy: { "1": "Changing data (like hashing) is a server-side tagging feature.", "2": "The notes warn not to confuse them.", "3": "The container ID stays the same." }, slide: 47, section: "c2t5-n4" },
    { id: "c2t5-q12", type: "multi", difficulty: "hard", prompt: "Which consent types did consent mode v2 ADD? Select all.", options: ["analytics_storage", "ad_user_data", "ad_storage", "ad_personalization"], answer: [1, 3], explain: "v2 added ad_user_data and ad_personalization to the original analytics_storage and ad_storage.", slide: 45, section: "c2t5-n1" }
  ]
},

/* ===================================================================== */
{
  id: "c2t6",
  title: "Client-Side vs Server-Side Tagging",
  slides: [48, 49, 50, 51, 52, 53, 54, 55, 56],
  minutes: 22,
  overview: {
    about: "The two ways tag data can travel: client-side (every tag runs in the browser and sends its own request) and server-side (the browser sends one request to the company's own tagging server, which cleans and forwards it). Also the two meanings of 'client', storing events in the server container, and where data cleaning happens.",
    why: "Choosing between the two affects page speed, how much data ad blockers remove, how much control you have over personal data, and cost. Exams love the 'client has two meanings' trap.",
    objectives: [
      "Walk through the 6 steps of client-side tagging and the 6 steps of server-side tagging.",
      "Explain the two meanings of 'client' and name the parts of web vs server containers.",
      "Describe how a server container can store an event and send cleaned versions to each partner.",
      "Name the three places where cleaning happens in a server container.",
      "Compare client-side and server-side on location, requests, speed, ad blockers, control and cost."
    ],
    vocabulary: [
      { term: "Client-side tagging", def: "All tags run inside the visitor's browser, which sends a separate request to every company.", slide: 49 },
      { term: "Server-side tagging", def: "The browser sends ONE request to the company's server, which passes the data on.", slide: 51 },
      { term: "Client (meaning 1)", def: "The visitor's browser.", slide: 52 },
      { term: "Client (meaning 2)", def: "A receiver program in a GTM server container that receives and reads the browser's request.", slide: 52 },
      { term: "Server tag", def: "A tag in the server container that sends the event on to each company.", slide: 51 },
      { term: "Transformations", def: "Rules in the server container that change the event data for specific tags.", slide: 54 },
      { term: "Tag firing priority", def: "Lets you make one tag (e.g., the database tag) run before another.", slide: 53 }
    ],
    hook: "One messenger carrying four letters, or one parcel to your own post office? Same click, two very different journeys."
  },
  notes: [
    {
      id: "c2t6-n1",
      heading: "Client-side tagging: the browser carries every letter",
      slides: [48, 49],
      fromSlides: [
        { text: "Everything below happens inside the visitor's browser — the client.", slide: 48 },
        { text: "The browser sends 3 separate messages: to Google Analytics, to Google Ads and to Meta.", slide: 48 },
        { text: "4 tags = 4 separate requests from the visitor's browser", slide: 49 },
        { text: "Good: free, quick to set up — one snippet on the site. This is what we built in this chapter.", slide: 49 },
        { text: "Weak: many scripts slow the page; ad blockers stop some requests; each company receives the visitor's data directly.", slide: 49 }
      ],
      simple: "In client-side tagging, the browser downloads the GTM container and runs every tag itself. Each tag sends its own request straight to its company. It is free and easy, but many scripts slow the page and ad blockers can stop some requests.",
      deep: "'Client' here means the visitor's browser on a laptop or phone. The browser downloads the page and the GTM web container (gtm.js), which contains every tag, trigger and variable you published. Triggers wait for events such as page views, clicks and form submissions. When the add_to_cart trigger matches, the GA4 tag, the Google Ads tag and the Meta Pixel each run on the visitor's device and each send their own request: three tags means three requests, four tags means four. The weak point is that these requests go from the visitor's device to third-party domains, so ad blockers and privacy features can stop some, and every extra script adds weight to the page. Each company's script runs on your page and can collect what it likes from the browser. Still, it is free, simple and well supported, which is why almost every website starts here.",
      exam: [
        "Client-side: tags run in the browser; one request per company.",
        "Weak point is the step where separate requests leave the browser.",
        "Good: free, quick, one snippet. Weak: slower pages, blocked requests, each company gets data directly.",
        "Analogy: the browser is a messenger carrying a separate letter to every company."
      ],
      definitions: [
        { term: "Client-side tagging", def: "Client = the visitor's browser. All tags run inside the browser, and the browser sends a separate request to every company.", slide: 49 }
      ],
      keyFacts: [
        "This is the method used throughout the chapter.",
        "Number of tags = number of separate requests from the browser."
      ],
      examples: [
        "shop.com with GA4, Google Ads, Meta Pixel and TikTok Pixel tags sends 4 separate requests; an ad blocker may stop some of them."
      ],
      misconceptions: [
        "Client-side does not mean 'on the company's client computer'; it means the visitor's browser."
      ]
    },
    {
      id: "c2t6-n2",
      heading: "Server-side tagging: one parcel to your own post office",
      slides: [50, 51],
      fromSlides: [
        { text: "The browser sends a single message to metrics.shop.com — the company's own address.", slide: 50 },
        { text: "A receiver program on the server (GTM calls it a \"client\") reads the message.", slide: 50 },
        { text: "For example: remove the IP address, hash the e-mail, drop fields partners should not get.", slide: 50 },
        { text: "Good: lighter, faster pages; fewer requests blocked; the company decides what data each partner receives.", slide: 51 },
        { text: "Weak: the server costs money every month (e.g., Google Cloud) and needs technical skills to set up.", slide: 51 }
      ],
      simple: "In server-side tagging the browser runs a small container, often just one GA4 tag, and sends ONE request to the company's own address (like metrics.shop.com). A server container there receives it, cleans it, and forwards it to GA4, Google Ads, Meta and others.",
      deep: "The browser still loads a GTM web container, but it is small, because the other companies' tags have moved to the server. When the trigger matches, the GA4 tag fires and sends one request to the company's own subdomain, metrics.shop.com. Because that is a first-party address, ad blockers block it far less often. The address points to a GTM server container running on Google Cloud or with a provider such as Stape. Inside it, a receiver program that GTM calls a 'client' turns the request into event data. The company then decides what each partner receives, for example removing the IP address or hashing an e-mail. Server tags forward the event to GA4, Google Ads, Meta (Conversions API) and others. The trade-offs are a monthly server cost and the technical skills needed, and consent rules still apply.",
      exam: [
        "Server-side: browser sends ONE request to the company's own domain.",
        "The server container's receiver is called a 'client'.",
        "Cleaning examples: remove IP, hash e-mail, drop fields.",
        "Hosted on Google Cloud or a provider such as Stape.",
        "Server-side does not remove the need for consent."
      ],
      definitions: [
        { term: "Server", def: "A computer the company controls.", slide: 51 },
        { term: "GTM server container", def: "The company's tagging server, e.g., at metrics.shop.com.", slide: 51 }
      ],
      keyFacts: [
        "Meta receives server data through its Conversions API.",
        "No Meta or TikTok scripts are in the page in the server-side setup."
      ],
      examples: [
        "Analogy: the browser sends one parcel to the company's own post office, which checks it and forwards copies to each company."
      ],
      misconceptions: [
        "Server-side tagging does not remove the web container; the browser still runs a small one.",
        "A first-party server does not mean consent is no longer needed."
      ]
    },
    {
      id: "c2t6-n3",
      heading: "\"Client\" has two meanings",
      slides: [52],
      fromSlides: [
        { text: "Meaning 1 — in \"client-side tagging\": Client = the visitor's browser", slide: 52 },
        { text: "Meaning 2 — inside a GTM server container: A \"client\" = a receiver program", slide: 52 },
        { text: "It catches the browser's request when it arrives at the server.", slide: 52 },
        { text: "Client receives. Tag sends. Only server containers have clients.", slide: 52 },
        { text: "Server container (on the server) | Clients · Tags · Triggers · Variables", slide: 52 }
      ],
      simple: "'Client' can mean the visitor's browser (as in client-side tagging) or a receiver program inside a GTM server container. The receiver catches the incoming request; triggers decide when; tags send it on. Only server containers have clients.",
      deep: "In 'client-side tagging', client means the visitor's browser and the opposite is the server, a computer the company controls. Inside a GTM server container, a 'client' is a receiver program: when the browser's request arrives at metrics.shop.com, a client such as the built-in GA4 client catches it, reads it and turns it into event data. Triggers then decide which server tags run, and server tags send the data on. That is why a web container has three building blocks (tags, triggers, variables) while a server container has four (clients, tags, triggers, variables). Read the context to know which meaning is intended. The memory tip: client receives, tag sends.",
      exam: [
        "Web container parts: Tags, Triggers, Variables.",
        "Server container parts: Clients, Tags, Triggers, Variables.",
        "Inside a server container: Client receives → Trigger decides when → Tag sends it on.",
        "Only server containers have clients."
      ],
      definitions: [
        { term: "Client (server container)", def: "A receiver program. It catches the browser's request when it arrives at the server.", slide: 52 }
      ],
      keyFacts: [
        "Example of a server-container client: the built-in GA4 client."
      ],
      examples: [
        "Request arrives at metrics.shop.com → GA4 client reads it → trigger matches → GA4, Google Ads and Meta server tags send it on."
      ],
      misconceptions: [
        "A server-container 'client' is not the browser.",
        "Web containers do not have clients."
      ]
    },
    {
      id: "c2t6-n4",
      heading: "Storing and cleaning data in the server container",
      slides: [53, 54, 55],
      fromSlides: [
        { text: "The company can save each event to its own database inside the server container, in the same step where it would send the data to GA4.", slide: 53 },
        { text: "With tag firing priority, you can make the database tag run first, before the GA4 tag. Or all the tags can simply run side by side.", slide: 53 },
        { text: "Tag 2 sends a cleaned version to GA4, with no customer ID and no IP address.", slide: 54 },
        { text: "Inside the server container, between \"the client receives the event\" and \"the tag sends it\".", slide: 54 },
        { text: "E-mail | ✔ (if consent and law allow) | ✘ never (GA4 forbids personal data) | hashed only", slide: 55 }
      ],
      simple: "One event in the server container can fire several tags: one saves the full order to the company's own database (like BigQuery), others send cleaned versions to GA4 and Google Ads. Cleaning happens between 'the client receives' and 'the tag sends', using transformations, the tag's own settings, or variables.",
      deep: "The client turns the request into event data such as event name, page, product, value, client ID and consent state. Several server tags can fire on that one event, and one of them can be a 'store' tag that writes the event to the company's own storage. Tag firing priority can make the database tag run first, or the tags can run side by side. In the purchase example, Tag 1 saves the full order (order ID, items, value, customer ID) to BigQuery, Tag 2 sends GA4 a version with no customer ID and no IP address, and Tag 3 sends the conversion to Google Ads. Cleaning has three places: transformations (exclude fields, allow only approved fields, add or change fields such as profit margin), the tag's own settings (the GA4 server tag can exclude or override parameters like the IP address), and variables (for example hashing an e-mail for Google Ads enhanced conversions). The analytics or martech team writes these rules in the server container interface, often following what the privacy or legal team decides must be removed.",
      exam: [
        "Three cleaning places: Transformations, the tag's own settings, Variables.",
        "Transformations can exclude fields, allow only an approved list, or add/change fields.",
        "GA4 never receives e-mail (GA4 forbids personal data); Google Ads gets it hashed only.",
        "Customer ID goes to BigQuery only; excluded for GA4 and Google Ads.",
        "Who: analytics/martech team builds it; privacy/legal often decides what to remove."
      ],
      definitions: [
        { term: "Transformations", def: "Rules in the server container that change the event data for specific tags.", slide: 54 },
        { term: "Hash", def: "Turn an e-mail address into a scrambled code before a tag uses it.", slide: 54 }
      ],
      keyFacts: [
        "Field table (slide 55): Event name, value, items → all three; Order ID → all three; Customer ID → BigQuery only; E-mail → BigQuery if consent and law allow, never GA4, hashed only for Google Ads; Full IP → BigQuery (or masked), removed/overridden for GA4, not sent to Google Ads."
      ],
      examples: [
        "Purchase event: Tag 1 → full order to BigQuery; Tag 2 → cleaned version to GA4; Tag 3 → conversion to Google Ads."
      ],
      misconceptions: [
        "Cleaning does not happen in the browser in this setup; it happens inside the server container.",
        "Hashing an e-mail does not make it allowed in GA4; GA4 never receives e-mail."
      ]
    },
    {
      id: "c2t6-n5",
      heading: "Side by side: which should a business use?",
      slides: [56],
      fromSlides: [
        { text: "Small websites: client-side is enough.", slide: 56 },
        { text: "Large online shops with big ad budgets or strict privacy rules usually use BOTH — the web container collects the data, the server container sends it on.", slide: 56 },
        { text: "Requests from the browser | One per company (many) | One, to the company's own domain", slide: 56 },
        { text: "Cost and skills | Free; marketers can set it up | Monthly server cost; technical setup", slide: 56 }
      ],
      simple: "Small sites usually only need client-side. Big shops with large ad budgets or strict privacy needs often use both: the web container collects, the server container sends on.",
      deep: "Client-side runs tags in the visitor's browser, sends one request per company, slows the page with many tags, is often blocked by ad blockers, and lets each company collect directly, but it is free and marketers can set it up. Server-side runs tags on the company's own server, sends one request to the company's own domain, is faster with fewer scripts, gets blocked far less, and lets the company clean data first, but it costs money monthly and needs technical setup. Many companies combine them: a web container to collect and a server container to process and distribute. The decision is a trade-off between cost and skills on one side and performance, control and data durability on the other.",
      exam: [
        "Memorise the six rows of the comparison table.",
        "Small sites: client-side is enough; large shops: usually BOTH.",
        "In the combined setup the web container collects, the server container sends on."
      ],
      definitions: [
        { term: "Combined setup", def: "The web container collects the data, the server container sends it on.", slide: 56 }
      ],
      keyFacts: [
        "Server-side improves performance, control and data durability at a hosting cost."
      ],
      examples: [
        "A small blog with one GA4 tag: client-side is enough. A large online shop with big ad budgets: web + server containers."
      ],
      misconceptions: [
        "Server-side is not a full replacement for the web container; large shops usually use both."
      ]
    }
  ],
  steps: [
    {
      title: "Client-side 1: Visitor opens shop.com",
      what: "The browser downloads the web page and the GTM web container (gtm.js) with all its tags.",
      why: "Every tag, trigger and variable you published travels to the visitor's device.",
      practical: "More tags in the container means a heavier download.",
      visual: "shop.com → gtm.js (all tags)",
      check: { q: "Where is the GTM web container downloaded to in client-side tagging?", options: ["The company's server", "The visitor's browser", "Google Ads"], answer: 1, explain: "Everything happens inside the visitor's browser — the client." }
    },
    {
      title: "Client-side 2: GTM listens",
      what: "Triggers wait for events on the page: page views, clicks, form submissions.",
      why: "Tags only fire when a trigger condition is met.",
      practical: "In Preview you see these events appear in the timeline.",
      check: { q: "What waits for events on the page?", options: ["Triggers", "Variables", "Reports"], answer: 0, explain: "Triggers wait for events such as page views, clicks and form submissions." }
    },
    {
      title: "Client-side 3: Visitor clicks \"Add to cart\"",
      what: "The add_to_cart trigger matches, so its tags are told to fire.",
      why: "The trigger you built for this button connects the action to the tags.",
      practical: "Test the click in Preview and confirm the trigger matched.",
      check: { q: "What happens when the add_to_cart trigger matches?", options: ["The page reloads", "Its tags are told to fire", "Consent is granted"], answer: 1, explain: "A matching trigger tells its tags to fire." }
    },
    {
      title: "Client-side 4: Tags run in the browser",
      what: "The GA4 tag, the Google Ads tag and the Meta Pixel each run on the visitor's device.",
      why: "In client-side tagging the vendor code executes on the visitor's device.",
      practical: "Each vendor script can collect what it likes from the browser.",
      check: { q: "Where do the GA4, Google Ads and Meta tags run?", options: ["On the visitor's device", "On metrics.shop.com", "In BigQuery"], answer: 0, explain: "Client-side: tags run on the visitor's device." }
    },
    {
      title: "Client-side 5: Separate requests leave",
      what: "The browser sends 3 separate messages: to Google Analytics, to Google Ads and to Meta.",
      why: "This is the weak point: requests go to third-party domains that ad blockers can stop.",
      practical: "Three tags = three separate requests.",
      check: { q: "Why is this step the weak point?", options: ["Requests go to third-party domains that ad blockers can block", "The browser cannot send requests", "Triggers stop working"], answer: 0, explain: "Ad blockers and privacy features can stop requests to tracking domains." }
    },
    {
      title: "Client-side 6: Reports update",
      what: "Each company records the event — unless an ad blocker stopped its message on the way.",
      why: "Blocked messages mean missing visits in reports.",
      practical: "Gaps between platforms can come from blocked requests.",
      check: { q: "When does a company NOT record the event?", options: ["When an ad blocker stopped its message", "When the trigger matched", "When the tag ran"], answer: 0, explain: "Slide 48: unless an ad blocker stopped its message on the way." }
    },
    {
      title: "Server-side 1: Visitor opens shop.com",
      what: "The browser loads the page and a small GTM web container — usually just one GA4 tag.",
      why: "The other companies' tags have moved to the server.",
      practical: "No Meta or TikTok scripts in the page.",
      check: { q: "What does the web container usually contain in server-side tagging?", options: ["Every vendor tag", "Just one GA4 tag", "Nothing at all"], answer: 1, explain: "Slide 50: a small container, usually just one GA4 tag." }
    },
    {
      title: "Server-side 2: Visitor clicks \"Add to cart\"",
      what: "The trigger matches and the GA4 tag fires in the browser.",
      why: "The browser still detects the interaction.",
      practical: "Trigger setup in the web container works the same way as before.",
      check: { q: "Which tag fires in the browser?", options: ["The GA4 tag", "The Meta Pixel", "The TikTok Pixel"], answer: 0, explain: "Only the GA4 tag fires in the browser in this setup." }
    },
    {
      title: "Server-side 3: ONE request leaves",
      what: "The browser sends a single message to metrics.shop.com — the company's own address.",
      why: "A first-party address is blocked by ad blockers far less often.",
      practical: "metrics.shop.com points to the tagging server.",
      visual: "browser → metrics.shop.com (1 request)",
      check: { q: "Where does the single request go?", options: ["googletagmanager.com", "metrics.shop.com", "facebook.com"], answer: 1, explain: "To the company's own address, metrics.shop.com." }
    },
    {
      title: "Server-side 4: The server receives it",
      what: "A receiver program on the server (GTM calls it a \"client\") reads the message.",
      why: "The client turns the request into event data.",
      practical: "The server container runs on Google Cloud or with a provider such as Stape.",
      check: { q: "What does GTM call the receiver program in a server container?", options: ["A trigger", "A client", "A pixel"], answer: 1, explain: "GTM calls it a 'client' — the second meaning of the word." }
    },
    {
      title: "Server-side 5: The company cleans it",
      what: "For example: remove the IP address, hash the e-mail, drop fields partners should not get.",
      why: "The company decides what each partner receives.",
      practical: "Use transformations, the tag's own settings, or variables.",
      check: { q: "Which is a cleaning example from the slides?", options: ["Hash the e-mail", "Add more vendor scripts", "Change the container ID"], answer: 0, explain: "Remove the IP, hash the e-mail, drop fields." }
    },
    {
      title: "Server-side 6: Server tags send it on",
      what: "The server forwards the event to GA4, Google Ads and Meta. Reports update.",
      why: "Server tags deliver to each destination.",
      practical: "Meta receives it through its Conversions API.",
      check: { q: "What sends the data from the server to each company?", options: ["Server tags", "The browser", "The CMP"], answer: 0, explain: "Server tags forward the event to each company." }
    }
  ],
  visual: {
    type: "compare",
    title: "Client-side vs. server-side: side by side",
    caption: "Small websites: client-side is enough. Large online shops with big ad budgets or strict privacy rules usually use BOTH.",
    slides: [56],
    data: {
      columns: ["Client-side", "Server-side"],
      rows: [
        { label: "Where do the tags run?", values: ["In the visitor's browser", "On the company's own server"], detail: "Client = the visitor's browser; server = a computer the company controls." },
        { label: "Requests from the browser", values: ["One per company (many)", "One, to the company's own domain"], detail: "e.g., metrics.shop.com." },
        { label: "Page speed", values: ["Slower with many tags", "Faster — fewer scripts"], detail: "Every extra script makes the page heavier." },
        { label: "Ad blockers", values: ["Often block requests", "Block far fewer requests"], detail: "The browser only talks to the company's own domain." },
        { label: "Control over data", values: ["Each company collects directly", "Company can clean data first"], detail: "Remove IP, hash e-mail, drop fields." },
        { label: "Cost and skills", values: ["Free; marketers can set it up", "Monthly server cost; technical setup"], detail: "e.g., Google Cloud or Stape hosting." }
      ]
    }
  },
  examples: [
    {
      concept: "One purchase, three server tags",
      example: "A visitor buys a product. The server container receives the 'purchase' event.",
      walkthrough: [
        "The client receives the request and turns it into event data.",
        "Tag 1 saves the full order (order ID, items, value, customer ID) to the company's BigQuery table.",
        "Tag 2 sends a cleaned version to GA4, with no customer ID and no IP address.",
        "Tag 3 sends the conversion to Google Ads (e-mail hashed only)."
      ],
      application: "Use this pattern when you need a full internal record but partners should only get what they are allowed.",
      check: { q: "Which destination receives the customer ID?", options: ["GA4", "Google Ads", "The company's BigQuery table"], answer: 2, explain: "Slide 55: Customer ID is excluded for GA4 and Google Ads." }
    },
    {
      concept: "Counting requests",
      example: "shop.com has GA4, Google Ads, Meta Pixel and TikTok Pixel.",
      walkthrough: [
        "Client-side: each of the 4 tags runs in the browser.",
        "So the browser sends 4 separate requests, any of which an ad blocker may stop.",
        "Server-side: the page keeps one GA4 tag and sends 1 request to metrics.shop.com.",
        "The server container forwards it to all four companies."
      ],
      application: "Fewer browser requests means lighter pages and fewer blocked requests.",
      check: { q: "How many requests does the browser send in the server-side version?", options: ["1", "4", "0"], answer: 0, explain: "The browser sends ONE request to the company's server." }
    }
  ],
  flashcards: [
    { id: "c2t6-f1", front: "Client-side tagging", back: "All tags run inside the browser, and the browser sends a separate request to every company.", slide: 49 },
    { id: "c2t6-f2", front: "Server-side tagging", back: "The browser sends ONE request to the company's server, which passes the data on.", slide: 51 },
    { id: "c2t6-f3", front: "Two meanings of 'client'", back: "1) the visitor's browser; 2) a receiver program inside a GTM server container.", slide: 52 },
    { id: "c2t6-f4", front: "Memory tip for server containers", back: "Client receives. Tag sends. Only server containers have clients.", slide: 52 },
    { id: "c2t6-f5", front: "Parts of a server container", back: "Clients · Tags · Triggers · Variables.", slide: 52 },
    { id: "c2t6-f6", front: "Tag firing priority", back: "Lets the database tag run first, before the GA4 tag (or tags run side by side).", slide: 53 },
    { id: "c2t6-f7", front: "Three places to clean data in a server container", back: "Transformations, the tag's own settings, variables.", slide: 54 },
    { id: "c2t6-f8", front: "E-mail in the field table", back: "BigQuery: if consent and law allow; GA4: never; Google Ads: hashed only.", slide: 55 },
    { id: "c2t6-f9", front: "Which setup for a large shop with big ad budgets?", back: "Usually BOTH: web container collects, server container sends it on.", slide: 56 }
  ],
  quiz: [
    { id: "c2t6-q1", type: "mcq", difficulty: "easy", prompt: "In client-side tagging, what does 'client' mean?", options: ["The visitor's browser", "A receiver program in a server container", "The company paying for ads", "Google's tag server"], answer: 0, explain: "Meaning 1: client = the visitor's browser.", wrongWhy: { "1": "That is meaning 2, inside a server container.", "2": "Not a meaning used on the slides.", "3": "Google's tag server is a third party, not the client." }, slide: 52, section: "c2t6-n3" },
    { id: "c2t6-q2", type: "tf", difficulty: "easy", prompt: "In client-side tagging, 4 tags means 4 separate requests from the visitor's browser.", answer: true, explain: "Slide 49: 4 tags = 4 separate requests.", slide: 49, section: "c2t6-n1" },
    { id: "c2t6-q3", type: "fill", difficulty: "easy", prompt: "In the server-side example, the browser sends its single request to ___ (the company's own address).", answer: ["metrics.shop.com"], explain: "Slide 50: metrics.shop.com.", slide: 50, section: "c2t6-n2" },
    { id: "c2t6-q4", type: "match", difficulty: "medium", prompt: "Match each server-container part to its job.", options: [["Client", "Receives & reads the request"], ["Trigger", "Decides when"], ["Tag", "Sends it on"]], answer: null, explain: "Slide 52: Client receives, trigger decides when, tag sends.", slide: 52, section: "c2t6-n3" },
    { id: "c2t6-q5", type: "mcq", difficulty: "medium", scenario: "A large online shop wants lighter pages, fewer blocked requests, and to remove IP addresses before partners receive data. It has a technical team and budget.", prompt: "What setup fits best?", options: ["Web container plus a server container", "Only client-side tags with more pixels", "Only the Google tag gateway", "Basic consent mode"], answer: 0, explain: "Large shops usually use BOTH: the web container collects, the server container cleans and sends it on.", wrongWhy: { "1": "More pixels means more scripts and more blocked requests.", "2": "The gateway passes requests through your domain but cannot change the data.", "3": "Consent mode handles consent, not data cleaning or speed." }, slide: 56, section: "c2t6-n5" },
    { id: "c2t6-q6", type: "multi", difficulty: "medium", prompt: "Which are weaknesses of client-side tagging? Select all.", options: ["Many scripts slow the page", "Ad blockers stop some requests", "Monthly server cost", "Each company receives the visitor's data directly"], answer: [0, 1, 3], explain: "Monthly server cost is a server-side weakness.", slide: 49, section: "c2t6-n1" },
    { id: "c2t6-q7", type: "tf", difficulty: "medium", prompt: "Web containers have clients, triggers, tags and variables.", answer: false, explain: "Only server containers have clients. Web containers: tags, triggers, variables.", slide: 52, section: "c2t6-n3" },
    { id: "c2t6-q8", type: "mcq", difficulty: "hard", scenario: "In a server container, a purchase event arrives. The legal team says GA4 must not receive the customer_id field, but BigQuery should keep it.", prompt: "Which tool lets you exclude customer_id only for the GA4 tag?", options: ["A transformation", "The consent mode override", "A web-container Click trigger", "The Google tag gateway"], answer: 0, explain: "Transformations change event data for specific tags, e.g., removing customer_id for the GA4 tag.", wrongWhy: { "1": "The override sets default consent by region.", "2": "Web triggers decide when tags fire in the browser, not what fields a server tag sends.", "3": "The gateway only changes where Google's code is loaded from." }, slide: 54, section: "c2t6-n4" },
    { id: "c2t6-q9", type: "match", difficulty: "hard", prompt: "Match how the e-mail field is handled for each destination (slide 55).", options: [["Company's BigQuery", "Kept if consent and law allow"], ["GA4", "Never sent (GA4 forbids personal data)"], ["Google Ads", "Hashed only"]], answer: null, explain: "Row 'E-mail' of the field table.", slide: 55, section: "c2t6-n4" },
    { id: "c2t6-q10", type: "multi", difficulty: "hard", prompt: "Which are the three places where cleaning can happen inside the server container? Select all.", options: ["Transformations", "The tag's own settings", "The cookie banner", "Variables"], answer: [0, 1, 3], explain: "Slide 54 lists transformations, the tag's own settings and variables.", slide: 54, section: "c2t6-n4" },
    { id: "c2t6-q11", type: "fill", difficulty: "hard", prompt: "With tag firing ___, you can make the database tag run first, before the GA4 tag.", answer: ["priority"], explain: "Slide 53: tag firing priority.", slide: 53, section: "c2t6-n4" },
    { id: "c2t6-q12", type: "mcq", difficulty: "easy", prompt: "Which is listed as a weakness of server-side tagging?", options: ["The server costs money every month and needs technical skills", "Ad blockers block more requests", "Pages get slower", "The company cannot clean data"], answer: 0, explain: "Slide 51: monthly cost and technical skills.", wrongWhy: { "1": "Server-side gets far fewer requests blocked.", "2": "Pages get lighter and faster.", "3": "Cleaning data is a server-side strength." }, slide: 51, section: "c2t6-n2" }
  ]
},

/* ===================================================================== */
{
  id: "c2t7",
  title: "The DOM, CSS Selectors, Web Scraping & the dataLayer",
  slides: [57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74],
  minutes: 25,
  overview: {
    about: "Why visual tagging and DOM/CSS tracking can break and when to use the dataLayer instead; what the DOM tree is; how web scraping and web analytics share HTML, CSS and the DOM; CSS selectors; the DOM Element variable case study (capturing the price span.amount); the SodaPDF tracking table; and the Chapter 2 glossary.",
    why: "Almost every custom GTM trigger or variable points at a page element with a CSS selector. Knowing how to find and test the right selector lets you track interactions without waiting for developers, and knowing when to use the dataLayer keeps revenue data reliable.",
    objectives: [
      "Explain why selectors can break and when to prefer the dataLayer.",
      "Describe the DOM tree (root, parent, child nodes) and how GTM reads it.",
      "Explain how web scraping and web analytics share HTML, CSS and the DOM.",
      "Write CSS selectors (.class, #id, a[href$=\".pdf\"], descendant) for real elements.",
      "Build a DOM Element variable that captures a product price and verify it in Preview."
    ],
    vocabulary: [
      { term: "DOM", def: "The browser's tree model of a web page that scripts can read.", slide: 74 },
      { term: "CSS selector", def: "A pattern (.class, #id, a[href$='.pdf']) that finds page elements.", slide: 74 },
      { term: "dataLayer", def: "A JavaScript array into which developers push business data that GTM reads with Data Layer Variables.", slide: 57 },
      { term: "Web scraping", def: "The automated process of collecting and parsing data from web pages.", slide: 59 },
      { term: "DOM Element variable", def: "A GTM variable that returns the text (or an attribute) of the first element matching an ID or CSS selector.", slide: 68 },
      { term: "Element Visibility trigger", def: "A trigger that watches whether an element appears on screen (impression tracking).", slide: 72 },
      { term: "Variable", def: "A value (e.g., page URL, price) used by tags and triggers.", slide: 74 }
    ],
    hook: "Every price, button and banner on a page has an address. Learn to write it, and you can track almost anything."
  },
  notes: [
    {
      id: "c2t7-n1",
      heading: "Visual tagging vs. the dataLayer",
      slides: [57],
      fromSlides: [
        { text: "Visual tagging (beta, 2026) lets you click a button on your page and GTM writes the selector for you.", slide: 57 },
        { text: "A redesign renames a class (.price → .product-price) and the tag silently stops collecting.", slide: 57 },
        { text: "Developers push business data (order ID, value, currency) into a JavaScript array called dataLayer. GTM reads it with Data Layer Variables.", slide: 57 },
        { text: "Use the dataLayer for revenue-critical events such as purchases; use DOM/CSS methods for quick, low-risk tracking.", slide: 57 },
        { text: "In GTM: trigger = Custom Event \"purchase\"; tag = GA4 Event \"purchase\" with the e-commerce data.", slide: 57 }
      ],
      simple: "Visual tagging lets you click an element and GTM writes the CSS selector for you, but selectors can break when a page is redesigned. The dataLayer is more reliable: developers push business data into it and GTM reads it. Use the dataLayer for purchases, and DOM/CSS for quick, low-risk tracking.",
      deep: "Visual tagging (beta, 2026) creates CSS-selector-based rules behind the scenes, at first mainly for Google Ads purchase conversions, so understanding the DOM and selectors is still essential. DOM/CSS tracking is fragile: if a redesign renames .price to .product-price, the selector stops matching and data silently disappears, and the same class may appear many times on a page. The dataLayer avoids this because the data does not depend on how the page looks. Developers run window.dataLayer = window.dataLayer || [] and then dataLayer.push with an event name and e-commerce data such as transaction_id, value, currency and items. In GTM you then use a Custom Event trigger 'purchase' and a GA4 Event tag 'purchase' with the e-commerce data, reading values with Data Layer Variables. Rule of thumb: dataLayer for revenue-critical events (purchases, leads); DOM/CSS for banner clicks, downloads and similar.",
      exam: [
        "Selectors break when classes are renamed; data disappears silently.",
        "dataLayer = JavaScript array; read with Data Layer Variables.",
        "Purchase setup: Custom Event trigger 'purchase' + GA4 Event tag 'purchase'.",
        "dataLayer for revenue-critical; DOM/CSS for quick, low-risk."
      ],
      definitions: [
        { term: "Visual tagging", def: "Lets you click a button on your page and GTM writes the selector for you.", slide: 57 },
        { term: "dataLayer", def: "A JavaScript array into which developers push business data (order ID, value, currency).", slide: 57 }
      ],
      keyFacts: [
        "Slide example push: event 'purchase', transaction_id 'T-10045', value 25.00, currency 'JOD', item 'PDF Pro' at price 25.00.",
        "Visual tagging is in beta (2026) and still relies on the DOM and CSS selectors."
      ],
      examples: [
        "window.dataLayer = window.dataLayer || [];\ndataLayer.push({ event: 'purchase', ecommerce: { transaction_id: 'T-10045', value: 25.00, currency: 'JOD', items: [{ item_name: 'PDF Pro', price: 25.00 }] } });"
      ],
      misconceptions: [
        "Visual tagging does not remove the need to understand selectors; it writes selectors for you.",
        "The dataLayer is not tied to page design, so a redesign does not break it."
      ]
    },
    {
      id: "c2t7-n2",
      heading: "The DOM tree and why analysts care",
      slides: [58, 65],
      fromSlides: [
        { text: "A Document Object Model (DOM) tree is a hierarchical representation of an HTML document.", slide: 58 },
        { text: "It consists of a root node, which is the document itself, and a series of child nodes that represent the elements, attributes, and text content of the document.", slide: 58 },
        { text: "Each node in the tree has a parent node, except for the root node, and can have multiple child nodes.", slide: 58 },
        { text: "This code interacts with the DOM to gather data about user interactions, page views, events, and other relevant information.", slide: 58 }
      ],
      simple: "The DOM is the browser's live tree of a page. The document is the root; elements like html, body, headings and links are nodes below it. Every node has one parent (except the root) and can have children. GTM triggers and variables work by reading this tree.",
      deep: "When tracking code runs in the browser, it interacts with the DOM to collect data about interactions, page views and events. A Click trigger checks properties of the clicked node, such as its text, classes, ID or URL. A DOM Element variable reads the text of a specific node, and an Element Visibility trigger watches whether a node appears on screen. You can see the DOM yourself in Chrome by right-clicking an element and choosing Inspect, which opens the Elements panel. GTM Preview mode (Tag Assistant) shows a timeline of events such as Consent Initialization, Initialization, Container Loaded, DOM Ready and Window Loaded. Selecting an event and opening the Variables tab shows each variable's value at that moment, for example the ProductPrice DOM Element variable. Always confirm a variable there before sending it to GA4.",
      exam: [
        "Root node = the document; each other node has exactly one parent.",
        "Click trigger, DOM Element variable and Element Visibility trigger all read the DOM.",
        "Inspect in Chrome opens the Elements panel showing the DOM.",
        "Preview timeline: Consent Initialization, Initialization, Container Loaded, DOM Ready, Window Loaded."
      ],
      definitions: [
        { term: "DOM tree", def: "A hierarchical representation of an HTML document.", slide: 58 },
        { term: "Root node", def: "The document itself; the only node without a parent.", slide: 58 }
      ],
      keyFacts: [
        "Use the Variables tab in Preview to see a variable's value at each event."
      ],
      examples: [
        "document → html → body → div.summary → span.amount (the price text)."
      ],
      misconceptions: [
        "The DOM is not the same as the raw HTML file; it is the browser's live tree model of the page."
      ]
    },
    {
      id: "c2t7-n3",
      heading: "Web scraping and web analytics share one foundation",
      slides: [59, 60, 61, 62, 63],
      fromSlides: [
        { text: "Web scraping refers to the automated process of collecting and parsing data from web pages.", slide: 59 },
        { text: "Scraping is an application of data retrieval and transformation from unstructured or semi-structured sources into structured datasets.", slide: 59 },
        { text: "Both rely on the same structural foundation: HTML, CSS, and the Document Object Model (DOM).", slide: 60 },
        { text: "Listen for specific events, such as clicks on links or buttons.", slide: 61 },
        { text: "Format and organize this data into a structure that analytics platforms can understand.", slide: 62 }
      ],
      simple: "A scraper requests a page, reads the HTML, finds elements and extracts content like prices. Analytics tags do something similar: they find elements and watch interactions with them. Both use HTML, CSS and the DOM, so knowing one helps with the other.",
      deep: "A scraper mimics a browser: it requests the page, reads the HTML source, identifies relevant elements and extracts content such as titles, prices, reviews or metadata into structured data like a table. Marketing uses include competitor price monitoring, review collection for sentiment analysis and building product datasets, always respecting terms of service, robots.txt and privacy laws without overloading servers. A scraper asks 'where is the price so I can copy it?', and a GTM trigger asks 'where is the Buy button so I can detect clicks?'; both answer with a CSS selector or element path. In client-side tagging, scripts listen for events, capture data about them, format it into a structure the platform understands (e.g., event file_download with parameter file_name) and send it to the platform's servers. Slide 61's Custom JavaScript variable reads form fields with getElementsByTagName and returns true only if all are filled and the e-mail contains '@', so form_submit is sent only for valid forms. In GTM, most custom tracking is built from triggers (when), variables (what values) and GA4 Event tags (send).",
      exam: [
        "Scraping: request → read HTML → identify elements → extract into structured data.",
        "Scraping extracts content; analytics monitors interactions; both use HTML, CSS, DOM.",
        "Client-side scripts: listen, capture, format, send.",
        "Three DOM uses in GA tracking: tracking events, data transmission, custom tracking.",
        "Slide 61 code returns true only when all fields are filled and the e-mail contains '@'."
      ],
      definitions: [
        { term: "Web scraping", def: "The automated process of collecting and parsing data from web pages.", slide: 59 },
        { term: "Custom tracking", def: "Defining specific events or interactions to track (e.g., form submissions, video views) and using JavaScript with the DOM to capture and send them.", slide: 63 }
      ],
      keyFacts: [
        "Respect terms of service, robots.txt and privacy laws when scraping.",
        "GTM building blocks for custom tracking: triggers (when) + variables (what values) + GA4 Event tags (send)."
      ],
      examples: [
        "A form-submission trigger with the slide 61 variable as a condition sends form_submit to GA4 only for complete, valid forms."
      ],
      misconceptions: [
        "Scraping and analytics are not unrelated skills; they target elements the same way."
      ]
    },
    {
      id: "c2t7-n4",
      heading: "CSS selectors: the shared query language",
      slides: [64, 72, 73],
      fromSlides: [
        { text: ".class | Targets elements by class name. | <span class=\"price\">$19.99</span>", slide: 64 },
        { text: "#id | Targets one unique element by ID. | <div id=\"promo\">Special Offer</div>", slide: 64 },
        { text: "a[href*=\".pdf\"] | Targets links pointing to PDFs.", slide: 64 },
        { text: "div.banner img | Targets images inside a banner.", slide: 64 },
        { text: "Id: #tags\\.monthlyprice48", slide: 73 }
      ],
      simple: "A dot means class (.price), a hash means ID (#promo), square brackets match attributes (a[href$=\".pdf\"]), and a space means 'inside' (div.banner img). GTM uses selectors in click conditions, Element Visibility triggers and DOM Element variables.",
      deep: "CSS defines how elements look, but it also serves as the main query language for finding elements. .price matches every element with class price, while #promo matches the single element with that ID, since IDs should be unique. a[href*=\".pdf\"] matches links whose URL contains .pdf, and a[href$=\".pdf\"] matches links whose URL ends with .pdf. div.banner img matches images inside a div with class banner. If an ID contains a dot, the dot must be escaped with a backslash, as in #tags\\.monthlyprice48. Choose the selector that is unique and least likely to change. Test it in the Console with document.querySelectorAll('.price') or document.querySelector(), then in GTM Preview before publishing. The SodaPDF table maps business goals to selectors and triggers, for example .split-btn with a Click trigger and .promo-banner img with an Element Visibility trigger.",
      exam: [
        ". = class, # = ID, [attr*=x] = contains, [attr$=x] = ends with, space = inside.",
        "IDs should be unique on a page.",
        "Escape a dot in an ID: #tags\\.monthlyprice48.",
        "Test with document.querySelectorAll() in the Console, then GTM Preview.",
        "SodaPDF: a[href$=\".pdf\"] + Link Click trigger = completed downloads."
      ],
      definitions: [
        { term: "CSS selector", def: "A pattern (.class, #id, a[href$='.pdf']) that finds page elements.", slide: 74 },
        { term: "a[href*=\".pdf\"]", def: "Targets links pointing to PDFs.", slide: 64 }
      ],
      keyFacts: [
        "SodaPDF: .split-btn → Click Trigger → active tool usage (conversion).",
        "SodaPDF: .from-google-drive → Click Trigger → cloud service preference.",
        "SodaPDF: a[href$=\".pdf\"] → Link Click Trigger → completed task outcome.",
        "SodaPDF: .promo-banner img → Element Visibility Trigger → impression tracking.",
        "SodaPDF: .share-linkedin → Click Trigger → content virality or social amplification."
      ],
      examples: [
        "Banner impressions (Element Visibility) combined with banner clicks give a banner click-through rate."
      ],
      misconceptions: [
        "*= and $= are different: contains vs ends with.",
        "A class can match many elements; it is not automatically unique."
      ]
    },
    {
      id: "c2t7-n5",
      heading: "Case study: capturing the product price with a DOM Element variable",
      slides: [65, 66, 67, 68, 69, 70, 71],
      fromSlides: [
        { text: "Our scenario involves a Demo Shop, where we aim to capture the product price, which is £12.00, and pass it to our tracking systems for analysis.", slide: 66 },
        { text: "Manually updating tracking code each time the price changes is impractical.", slide: 66 },
        { text: "You can select the element that you want to pull out by enabling the Inspector Tool.", slide: 70 },
        { text: "The element may not have an ID, which would be unique to this element, so we won't be able to use our ID option as the Selection Method.", slide: 71 },
        { text: "The element that we have selected has a span.amount as a CSS Selector", slide: 71 }
      ],
      simple: "Goal: read the product price (£12.00) from the page instead of hard-coding it. Create a new DOM Element variable, inspect the price in Chrome, and since it has no ID, use the CSS selector span.amount. Then check the value in Preview.",
      deep: "Prices change and there may be thousands of products, so reading the price from the page keeps tracking in line with what the customer saw, for events such as add_to_cart. In GTM go to Variables → User-Defined Variables → New, and choose the DOM Element type from the Page Elements group, with a clear name like 'DOM – Product Price'. A DOM Element variable returns the text, or an attribute, of the first element that matches the ID or CSS selector. Right-click the price and choose Inspect, then use the Inspector arrow in DevTools to hover over the price and see its HTML. Look for an ID first because it is unique and stable; this element has none, so pick Selection Method = CSS Selector and enter span.amount. If span.amount also appears in the mini-cart or related products, the variable might return the wrong price, so use something more specific like .summary span.amount and confirm in Preview. For real e-commerce, prices should come from the dataLayer; the DOM approach suits cases where you cannot change the site code or need a quick solution.",
      exam: [
        "Path: Variables → User-Defined Variables → New → DOM Element.",
        "DOM Element variable returns the first matching element's text (or an attribute).",
        "Prefer an ID; if none, use CSS Selector (span.amount).",
        "Make it unique: .summary span.amount.",
        "Confirm in Preview (Variables tab) before publishing."
      ],
      definitions: [
        { term: "Selection Method", def: "The DOM Element variable setting: ID or CSS Selector.", slide: 71 },
        { term: "span.amount", def: "A span element with class \"amount\".", slide: 71 }
      ],
      keyFacts: [
        "The demo product price is £12.00.",
        "DOM Element is in the Page Elements group of variable types."
      ],
      examples: [
        "Variable 'DOM – Product Price', Selection Method CSS Selector, selector .summary span.amount → Preview shows £12.00."
      ],
      misconceptions: [
        "The variable does not return every match; it returns the first one, which may be the wrong price.",
        "The DOM method is not the best practice for real e-commerce revenue; the dataLayer is."
      ]
    }
  ],
  steps: [
    {
      title: "Create a new user-defined variable",
      what: "In GTM go to Variables → User-Defined Variables → New.",
      why: "Variables are reusable values; once created, the price variable can be used in any tag or trigger.",
      practical: "Start from the Variables menu in your web container.",
      check: { q: "Where do you start creating the price variable?", options: ["Tags → New", "Variables → User-Defined Variables → New", "Admin → Data streams"], answer: 1, explain: "Slide 67 notes: Variables → User-Defined Variables → New." }
    },
    {
      title: "Choose the DOM Element type",
      what: "Pick DOM Element from the Page Elements group and name it clearly, e.g., \"DOM – Product Price\".",
      why: "A DOM Element variable returns the text (or an attribute) of the first element that matches the ID or CSS selector.",
      practical: "Clear names make variables easy to find later.",
      check: { q: "What does a DOM Element variable return?", options: ["All matching elements", "The text or attribute of the first matching element", "The page URL"], answer: 1, explain: "It returns the first element that matches." }
    },
    {
      title: "Inspect the price on the page",
      what: "Right-click the price → Inspect. Chrome DevTools opens the Elements panel with the price highlighted.",
      why: "You need to see the element's tag, classes and ID to write a selector.",
      practical: "Use Google Chrome; you are looking at the DOM.",
      check: { q: "What does Inspect open?", options: ["The Elements panel of DevTools", "GTM Preview", "GA4 reports"], answer: 0, explain: "Slide 69 notes: DevTools opens the Elements panel." }
    },
    {
      title: "Use the Inspector tool to find the HTML",
      what: "Click the Inspector arrow in the top-left of DevTools and hover over the price to find its position in the code.",
      why: "Look for an ID first (unique and stable); if there is none, look for a class or parent + child classes.",
      practical: "Here the price element has no ID.",
      visual: "<span class=\"amount\">£12.00</span>",
      check: { q: "What should you look for first?", options: ["An ID", "The longest class name", "The image source"], answer: 0, explain: "An ID is unique and stable." }
    },
    {
      title: "Set Selection Method = CSS Selector",
      what: "Because there is no ID, choose CSS Selector and enter span.amount.",
      why: "span.amount means a span element with class \"amount\".",
      practical: "If span.amount also appears in the mini-cart or related products, use .summary span.amount instead.",
      visual: ".summary span.amount",
      check: { q: "Why might span.amount return the wrong price?", options: ["It may also appear in the mini-cart or related products", "Spans cannot hold text", "CSS selectors don't work in GTM"], answer: 0, explain: "The variable returns the first match, which might not be the product price." }
    },
    {
      title: "Confirm the value in Preview",
      what: "Open GTM Preview, select an event, open the Variables tab and check that the price variable shows £12.00.",
      why: "Always confirm a variable returns the value you expect before you send it to GA4.",
      practical: "Then use the variable in tags such as an add_to_cart event.",
      check: { q: "Where do you confirm the variable's value?", options: ["The Variables tab in GTM Preview", "The GA4 Admin page", "The CMP"], answer: 0, explain: "Slide 65 notes: the Variables tab shows each variable's value at that moment." }
    }
  ],
  visual: {
    type: "selector",
    title: "Selector playground",
    caption: "Write a CSS selector that matches exactly the elements described. Elements come from slides 64, 66, 71 and 72.",
    slides: [64, 71, 72],
    data: {
      html: '<div class="mini-cart">Cart total: <span class="amount">£12.00</span></div>\n<div id="promo">Special Offer</div>\n<div class="promo-banner"><img src="sale.jpg" alt="Sale"></div>\n<div class="summary"><h2>Demo product</h2><span class="amount">£12.00</span> <span class="price">$19.99</span></div>\n<button class="split-btn">Split PDF</button>\n<button class="from-google-drive">From Google Drive</button>\n<a href="result.pdf" class="download-btn">Download PDF</a>\n<a href="pricing.html">Pricing</a>\n<a class="share-linkedin">Share</a>',
      challenges: [
        { task: "Select every element with the class price.", answer: ".price", hint: "A dot means class." },
        { task: "Select the one unique element with the ID promo.", answer: "#promo", hint: "A hash means ID." },
        { task: "Select the link whose URL ends with .pdf (not the pricing page).", answer: 'a[href$=".pdf"]', hint: "Use an attribute selector with $= (ends with)." },
        { task: "Select the image inside the promo banner.", answer: ".promo-banner img", hint: "A space means 'inside'." },
        { task: "Select ONLY the product price span.amount inside .summary, not the one in the mini-cart.", answer: ".summary span.amount", hint: "Put the parent class before span.amount." },
        { task: "Select the Split PDF button.", answer: ".split-btn", hint: "Look at the button's class." }
      ]
    }
  },
  examples: [
    {
      concept: "Mapping a business goal to a selector and trigger (SodaPDF)",
      example: "SodaPDF wants to measure completed PDF downloads.",
      walkthrough: [
        "Find the element: <a href=\"result.pdf\" class=\"download-btn\">Download PDF</a>.",
        "Write a selector: a[href$=\".pdf\"] (links whose URL ends with .pdf).",
        "Pick the trigger type: Link Click Trigger.",
        "Analytical value: measures completed task outcome."
      ],
      application: "Repeat the same four columns (goal, HTML, selector, trigger, value) for any website.",
      check: { q: "Which trigger type does the slide pair with a[href$=\".pdf\"]?", options: ["Element Visibility Trigger", "Link Click Trigger", "Custom Event"], answer: 1, explain: "Slide 72: Link Click Trigger for completed PDF downloads." }
    },
    {
      concept: "Escaping a dot in an ID",
      example: "A price box has the ID tags.monthlyprice48 and the class tagsmonthlyprice4.",
      walkthrough: [
        "The class selector is .tagsmonthlyprice4.",
        "The ID contains a dot, which CSS would read as a class.",
        "Escape the dot with a backslash: #tags\\.monthlyprice48.",
        "Test it with document.querySelector() in the Console, then in GTM Preview."
      ],
      application: "Whenever an ID or class contains special characters, escape them before using the selector in GTM.",
      check: { q: "What is the correct ID selector?", options: ["#tags.monthlyprice48", "#tags\\.monthlyprice48", ".tags.monthlyprice48"], answer: 1, explain: "Slide 73: a dot inside an ID must be escaped with a backslash." }
    },
    {
      concept: "Choosing dataLayer vs DOM",
      example: "A shop wants to track purchases (revenue) and promo banner clicks.",
      walkthrough: [
        "Purchases are revenue-critical, so developers push them into the dataLayer.",
        "GTM uses a Custom Event trigger 'purchase' and a GA4 Event tag 'purchase'.",
        "Banner clicks are quick, low-risk tracking, so a CSS selector click trigger is fine.",
        "If a redesign renames the banner class, only the low-risk tracking is affected."
      ],
      application: "Ask 'is this revenue-critical?' before choosing DOM/CSS tracking.",
      check: { q: "Which method suits purchases?", options: ["The dataLayer", "A CSS selector on the price", "Visual tagging only"], answer: 0, explain: "Slide 57: use the dataLayer for revenue-critical events such as purchases." }
    }
  ],
  flashcards: [
    { id: "c2t7-f1", front: "DOM", back: "The browser's tree model of a web page that scripts can read.", slide: 74 },
    { id: "c2t7-f2", front: "Why can selectors break?", back: "A redesign renames a class (.price → .product-price) and the tag silently stops collecting; the same class may appear many times.", slide: 57 },
    { id: "c2t7-f3", front: "dataLayer vs DOM/CSS rule of thumb", back: "dataLayer for revenue-critical events such as purchases; DOM/CSS for quick, low-risk tracking.", slide: 57 },
    { id: "c2t7-f4", front: "Web scraping", back: "The automated process of collecting and parsing data from web pages.", slide: 59 },
    { id: "c2t7-f5", front: "a[href*=\".pdf\"] vs a[href$=\".pdf\"]", back: "*= URL contains .pdf; $= URL ends with .pdf.", slide: 64 },
    { id: "c2t7-f6", front: "div.banner img", back: "Images inside a div with class banner (a space means 'inside').", slide: 64 },
    { id: "c2t7-f7", front: "DOM Element variable", back: "Returns the text (or an attribute) of the first element that matches the ID or CSS selector.", slide: 68 },
    { id: "c2t7-f8", front: "Selector used for the demo shop price", back: "span.amount (more specific: .summary span.amount).", slide: 71 },
    { id: "c2t7-f9", front: "Trigger type for banner impressions (SodaPDF)", back: "Element Visibility Trigger on .promo-banner img.", slide: 72 },
    { id: "c2t7-f10", front: "Escaping a dot in an ID", back: "#tags\\.monthlyprice48", slide: 73 }
  ],
  quiz: [
    { id: "c2t7-q1", type: "mcq", difficulty: "easy", prompt: "Which selector targets one unique element by ID?", options: ["#promo", ".promo", "promo", "[promo]"], answer: 0, explain: "A hash targets an ID.", wrongWhy: { "1": "A dot targets a class, which can match many elements.", "2": "Without a symbol, this would target a <promo> tag.", "3": "This is an attribute selector for an attribute named promo." }, slide: 64, section: "c2t7-n4" },
    { id: "c2t7-q2", type: "tf", difficulty: "easy", prompt: "In the DOM tree, every node has a parent node except the root node.", answer: true, explain: "Slide 58: each node has a parent, except the root.", slide: 58, section: "c2t7-n2" },
    { id: "c2t7-q3", type: "fill", difficulty: "medium", prompt: "Problem solving: write the CSS selector that matches links whose URL ENDS with .pdf, such as <a href=\"result.pdf\" class=\"download-btn\">.", answer: ["a[href$=\".pdf\"]", "a[href$='.pdf']", "a[href$=.pdf]"], explain: "$= means 'ends with'. Slide 72 uses a[href$=\".pdf\"] for completed downloads.", slide: 72, section: "c2t7-n4" },
    { id: "c2t7-q4", type: "match", difficulty: "medium", prompt: "Match each SodaPDF selector to its trigger type.", options: [[".split-btn", "Click Trigger"], ["a[href$=\".pdf\"]", "Link Click Trigger"], [".promo-banner img", "Element Visibility Trigger"], [".share-linkedin", "Click Trigger (social share)"]], answer: null, explain: "From the SodaPDF table on slide 72.", slide: 72, section: "c2t7-n4" },
    { id: "c2t7-q5", type: "mcq", difficulty: "medium", scenario: "After a website redesign, the class .price was renamed to .product-price. No one changed GTM.", prompt: "What happens to a tag that relied on .price?", options: ["It silently stops collecting", "GTM automatically updates the selector", "It starts collecting twice", "It switches to the dataLayer"], answer: 0, explain: "Slide 57: a renamed class makes the tag silently stop collecting.", wrongWhy: { "1": "GTM does not update selectors on its own.", "2": "Nothing would match, so nothing is collected.", "3": "The dataLayer must be set up by developers; it is not automatic." }, slide: 57, section: "c2t7-n1" },
    { id: "c2t7-q6", type: "mcq", difficulty: "hard", scenario: "Your DOM Element variable uses span.amount. In Preview it shows the mini-cart total instead of the product price.", prompt: "What is the best fix?", options: ["Use a more specific selector such as .summary span.amount", "Switch the selection method to ID with 'amount'", "Delete the mini-cart", "Use a[href$=\".pdf\"]"], answer: 0, explain: "The variable returns the first match; a parent class makes the selector unique.", wrongWhy: { "1": "The element has no ID, so the ID method cannot work.", "2": "Changing the site is not the analyst's fix.", "3": "That selector targets PDF links, not prices." }, slide: 71, section: "c2t7-n5" },
    { id: "c2t7-q7", type: "multi", difficulty: "medium", prompt: "Which GTM features read the DOM? Select all.", options: ["Click trigger", "DOM Element variable", "Element Visibility trigger", "Consent mode override"], answer: [0, 1, 2], explain: "Slide 58 notes name Click triggers, DOM Element variables and Element Visibility triggers.", slide: 58, section: "c2t7-n2" },
    { id: "c2t7-q8", type: "fill", difficulty: "hard", prompt: "Problem solving: write the ID selector for an element whose ID is tags.monthlyprice48.", answer: ["#tags\\.monthlyprice48"], explain: "A dot inside an ID must be escaped with a backslash.", slide: 73, section: "c2t7-n4" },
    { id: "c2t7-q9", type: "mcq", difficulty: "hard", prompt: "In GTM, which trigger and tag does slide 57 pair with the dataLayer purchase push?", options: ["Custom Event 'purchase' trigger + GA4 Event 'purchase' tag", "Click trigger + Meta Pixel", "Element Visibility trigger + Google tag", "Page View trigger + DOM Element variable"], answer: 0, explain: "In GTM: trigger = Custom Event \"purchase\"; tag = GA4 Event \"purchase\" with the e-commerce data.", wrongWhy: { "1": "The dataLayer push is not a click.", "2": "Visibility tracks impressions, not pushed events.", "3": "A DOM Element variable reads the page, not the dataLayer." }, slide: 57, section: "c2t7-n1" },
    { id: "c2t7-q10", type: "tf", difficulty: "easy", prompt: "Web scraping and web analytics rely on the same foundation: HTML, CSS and the DOM.", answer: true, explain: "Slide 60.", slide: 60, section: "c2t7-n3" },
    { id: "c2t7-q11", type: "multi", difficulty: "hard", prompt: "The Custom JavaScript variable on slide 61 returns true only when... Select all that apply.", options: ["The three text boxes are filled", "The dropdown has a value", "The e-mail contains '@'", "The page has a PDF link"], answer: [0, 1, 2], explain: "It checks the text boxes, dropdown and that the e-mail includes '@'.", slide: 61, section: "c2t7-n3" },
    { id: "c2t7-q12", type: "match", difficulty: "easy", prompt: "Match each glossary term to its definition.", options: [["Tag", "Code that sends data to a platform"], ["Trigger", "The rule that tells a tag when to fire"], ["Variable", "A value used by tags and triggers"], ["DOM", "The browser's tree model of a web page"]], answer: null, explain: "Slide 74 glossary.", slide: 74, section: "c2t7-n2" }
  ]
}

] });
