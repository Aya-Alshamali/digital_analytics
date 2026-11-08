/* FILE: data/ch1.js — FocusNest sample lesson content for Chapter 1, written from the slides in data/slides.js (deck ch1).
   Slide-verbatim text lives in `fromSlides`/`definitions`; all other prose is FocusNest's added explanation. */
(window.FN_SEED = window.FN_SEED || []).push({ chapter: "ch1", order: 1, title: "Introduction to Web / Digital Analytics", topics: [

/* ===================================================================== TOPIC 1 */
{
  id: "c1t1",
  title: "What Digital Analytics Is & Why It Matters",
  slides: [2, 3, 4, 5, 6, 7, 8, 9, 10],
  minutes: 15,
  overview: {
    about: "What web or digital analytics means, why businesses measure their digital initiatives, and how analytics data shows the performance of each digital marketing channel.",
    why: "Every later idea in this course (sessions, KPIs, conversions, AI in GA4) builds on knowing what analytics is for and which traffic channels bring visitors to a site.",
    objectives: [
      "Define web or digital analytics using the two definitions on the slides.",
      "Explain the idea 'what gets measured gets managed' and why businesses need metrics.",
      "Tell apart the eight traffic types: paid search, organic search, direct, affiliate, email, in-app, referral and social.",
      "Explain how visitor data supports personas, audience targeting and KPI-based content decisions.",
      "Explain why the real challenge is deciding what should be measured, not what can be measured."
    ],
    vocabulary: [
      { term: "Web / digital analytics", def: "The process of measuring digital initiatives and using the data to improve business performance.", slide: 2 },
      { term: "Web analytics", def: "The methodological study of online patterns and trends; a technique to collect, measure, report, and analyze website data.", slide: 3 },
      { term: "KPI", def: "Key performance indicators represent measurable values which give an indication of campaigns' performance.", slide: 8 },
      { term: "Paid search traffic", def: "Marketing a business using paid advertisements that appear on search engine results pages (SERPs).", slide: 6 },
      { term: "Organic search (SEO) traffic", def: "Improving the quality and quantity of website traffic from search engines; SEO targets unpaid traffic.", slide: 6 },
      { term: "Direct traffic", def: "When someone types or pastes your web address into their browser or clicks a bookmark.", slide: 6 },
      { term: "Referral traffic", def: "Visitors who arrive after clicking a link provided by another website without commission.", slide: 6 },
      { term: "Affiliate traffic", def: "Referral traffic based on commission.", slide: 6 }
    ],
    hook: "Every click leaves a clue. Digital analytics is how a business learns to read them."
  },
  notes: [
    {
      id: "c1t1-n1",
      heading: "What web / digital analytics is",
      slides: [2, 3],
      fromSlides: [
        { text: "Web, or digital, analytics is the process of measuring digital initiatives and using the data to improve business performance.", slide: 2 },
        { text: "The discovery of insights through analysis of collected data and the communication of those insights to influence decisions.", slide: 2 },
        { text: "Web Analytics is the methodological study of online patterns and trends.", slide: 3 },
        { text: "It is a technique that you can employ to collect, measure, report, and analyze your website data.", slide: 3 },
        { text: "We use web analytics to track key metrics and analyze visitors' activity and traffic flow.", slide: 3 }
      ],
      simple: "Digital analytics means measuring what happens in your digital channels and using those numbers to make the business work better. Collecting data is only the start: the goal is to find insights and share them so people make better decisions.",
      deep: "The slides offer two complementary definitions. The first is outcome-oriented: analytics is the process of measuring digital initiatives and using the data to improve business performance. The second describes an analytical chain in which insights are discovered through analysis of collected data and then communicated to influence decisions. Web analytics specifically is framed as the methodological study of online patterns and trends, a technique for collecting, measuring, reporting and analyzing website data. It is normally carried out to analyze website performance and optimize web usage by tracking key metrics, visitor activity and traffic flow. Calling it a tactical approach to collect data and generate reports signals that analytics supports business strategy rather than replacing it.",
      exam: [
        "Digital analytics = measuring digital initiatives + using the data to improve business performance.",
        "The four actions of web analytics: collect, measure, report, analyze.",
        "Insights must be communicated to influence decisions, not only discovered.",
        "Web analytics tracks key metrics, visitors' activity and traffic flow."
      ],
      definitions: [
        { term: "Web / digital analytics", def: "The process of measuring digital initiatives and using the data to improve business performance.", slide: 2 },
        { term: "Web analytics", def: "The methodological study of online patterns and trends; a technique you can employ to collect, measure, report, and analyze your website data.", slide: 3 }
      ],
      keyFacts: [
        "Web analytics is normally carried out to analyze the performance of a website and optimize its web usage.",
        "Web analytics is described as a tactical approach to collect data and generate reports."
      ],
      examples: [
        "A store notices from its reports that many visitors leave on the shipping page, shares this with the team, and the page is redesigned. That is measuring, analyzing and communicating an insight."
      ],
      misconceptions: [
        "Analytics is just collecting data. The slide definition also requires analysis and communicating insights that influence decisions."
      ]
    },
    {
      id: "c1t1-n2",
      heading: "Why measure: metrics, KPIs and goals",
      slides: [4, 8, 9, 10],
      fromSlides: [
        { text: "'what gets measured gets managed.'", slide: 4 },
        { text: "If businesses want to manage their digital investments, they need metrics to quantify their performance.", slide: 4 },
        { text: "Key performance indicators represent measurable values which give an indication of campaigns' performance.", slide: 8 },
        { text: "Whatever the goal is, your KPIs should be helping to support the objective related to the digital marketing strategy", slide: 9 },
        { text: "Often the real challenge is not what can be measured, but what should be measured.", slide: 10 }
      ],
      simple: "If you do not measure something, you cannot manage it. Businesses set a goal for each marketing effort and pick KPIs, a few key numbers that show whether the goal is being reached. Tracking everything is not the answer; tracking the right things is.",
      deep: "Slide 4 frames measurement as the basis of management: the driving force behind measuring digital initiatives is gaining meaningful insights that help maximize the return or success of digital marketing investments. Metrics quantify performance, and KPIs are the subset of measurable values that indicate how campaigns are performing. Slide 8 stresses that accurate data is essential for effective marketing decisions and that every marketing initiative should have a goal, such as more visitors, registrations, email collections or calls-to-action. Slides 9 and 10 add alignment: whatever the goal, KPIs should support the objective of the digital marketing strategy. When businesses do not know what to measure, they track many things that do not matter, so the real analytical challenge is selection rather than collection.",
      exam: [
        "'What gets measured gets managed' is the driving idea behind measuring digital initiatives.",
        "KPIs = measurable values that indicate campaign performance.",
        "Every marketing decision should have a goal (visitors, registrations, email collections, call-to-action...).",
        "KPIs must support the objective of the digital marketing strategy.",
        "The real challenge is what should be measured, not what can be measured."
      ],
      definitions: [
        { term: "Key performance indicators (KPIs)", def: "Measurable values which give an indication of campaigns' performance.", slide: 8 }
      ],
      keyFacts: [
        "Having accurate data is essential for making effective marketing decisions.",
        "Measuring aims to maximize the return or success of digital marketing investments.",
        "Businesses that don't know what to measure end up tracking a lot of things that don't really matter."
      ],
      examples: [
        "A university whose goal is more registrations chooses completed registrations as a KPI rather than reporting every possible metric."
      ],
      misconceptions: [
        "More metrics always means better analytics. The slides warn that tracking everything leads to measuring things that don't matter.",
        "A KPI is any number in a report. A KPI must indicate performance against a goal tied to the strategy."
      ]
    },
    {
      id: "c1t1-n3",
      heading: "Knowing channel performance: the eight traffic types",
      slides: [5, 6],
      fromSlides: [
        { text: "Knowing the performance of the digital marketing channels", slide: 5 },
        { text: "Paid search traffic: is the strategy of marketing a business using paid advertisements that appear on search engine results pages (or SERPs).", slide: 6 },
        { text: "Direct traffic: is when someone types or pastes your web address into their browser or clicks a bookmark", slide: 6 },
        { text: "Affiliate traffic: referral traffic based on commission", slide: 6 },
        { text: "Referral traffic: visitors who visit your website after clicking a link provided by another website without commission", slide: 6 }
      ],
      simple: "Visitors reach a website through different doors, called channels. Analytics tells you how each door performs: paid ads, unpaid search results, typing the address, links from other sites, social media, emails and apps. The key difference between referral and affiliate is whether a commission is paid.",
      deep: "One of the main reasons web analytics data matters in digital marketing is that it reveals the performance of each digital marketing channel. Slide 6 defines eight traffic types. Paid search uses paid advertisements on search engine results pages, while organic search (SEO) improves the quality and quantity of traffic from search engines and targets unpaid traffic. Direct traffic occurs when someone types or pastes the web address or clicks a bookmark. Referral traffic comes from a link on another website without commission; affiliate traffic is referral traffic based on commission. Email, in-app and social traffic are visitors who click a link provided in an email, a mobile application or a social media platform respectively. Distinguishing these channels lets a business compare where its visitors come from and judge each channel's contribution.",
      exam: [
        "Paid search = paid ads on SERPs; organic search (SEO) = unpaid search traffic.",
        "Direct = typed or pasted URL, or a bookmark.",
        "Referral = link from another website WITHOUT commission; affiliate = referral WITH commission.",
        "Email, in-app and social traffic = visitors clicking a link you provided in that channel.",
        "SEO targets unpaid traffic rather than direct or paid traffic."
      ],
      definitions: [
        { term: "Paid search traffic", def: "The strategy of marketing a business using paid advertisements that appear on search engine results pages (SERPs).", slide: 6 },
        { term: "Organic search (SEO) traffic", def: "The strategy of improving the quality and quantity of website traffic to a website or web page from search engines; SEO targets unpaid traffic rather than direct or paid traffic.", slide: 6 },
        { term: "Direct traffic", def: "When someone types or pastes your web address into their browser or clicks a bookmark.", slide: 6 },
        { term: "Affiliate traffic", def: "Referral traffic based on commission.", slide: 6 },
        { term: "Email traffic", def: "The number of visitors who visit your website after clicking a link you've provided within the email.", slide: 6 },
        { term: "In-app traffic", def: "The number of visitors who visit your website after clicking a link you've provided within the mobile application.", slide: 6 },
        { term: "Referral traffic", def: "Visitors who visit your website after clicking a link provided by another website without commission.", slide: 6 },
        { term: "Social traffic", def: "Visitors who visit your website after clicking a link provided on social media (Facebook, Instagram, ...).", slide: 6 }
      ],
      keyFacts: [
        "Slide 6 lists eight traffic types.",
        "SERP stands for search engine results page."
      ],
      examples: [
        "A blogger links to your shop without being paid: referral. The same link through a commission program: affiliate.",
        "A customer clicks a bookmark to your site: direct."
      ],
      misconceptions: [
        "Any link from another website is affiliate traffic. Only commission-based referrals are affiliate; the rest are referral."
      ]
    },
    {
      id: "c1t1-n4",
      heading: "Visitors, personas and intent",
      slides: [7],
      fromSlides: [
        { text: "You can track the type of visitors (for example: new and returning) that come to your website and build personas around those who engage to then target other people similar to your current customer base.", slide: 7 },
        { text: "You can use data to determine what things your audience interacts with on your site and in your campaigns such as emails and ads.", slide: 7 },
        { text: "When deciding on audiences to target, you need to determine their intent.", slide: 7 }
      ],
      simple: "Analytics shows who visits (for example new or returning visitors) and what they interact with. You can turn the visitors who engage into personas and then target similar people. Before targeting, ask what those people actually want: their intent.",
      deep: "Slide 7 extends the value of analytics from channels to audiences. By tracking visitor types such as new and returning visitors, a business can build personas around those who engage and then target other people similar to its current customer base. Data also shows what the audience interacts with on the site and in campaigns such as emails and ads. Choosing audiences requires determining their intent, and this links back to having set KPIs so that content decisions fit the audience. Later in the chapter this same targeting idea reappears in automated form as GA4 predictive audiences.",
      exam: [
        "Visitor types such as new vs returning can be tracked.",
        "Personas are built around engaged visitors to target similar people.",
        "Data shows what the audience interacts with on the site and in emails and ads.",
        "Audience targeting requires determining intent, tied to set KPIs."
      ],
      definitions: [
        { term: "Visitor type", def: "The type of visitors that come to your website, for example new and returning.", slide: 7 }
      ],
      keyFacts: [
        "Determining intent relates back to having set KPIs to make content decisions fitting for the audience."
      ],
      examples: [
        "Returning visitors who read many product guides become a persona; the business then targets new people with similar interests."
      ],
      misconceptions: [
        "Targeting only needs demographics. The slide says you need to determine the audience's intent."
      ]
    }
  ],
  steps: [],
  visual: {
    type: "dragsort",
    title: "Sort the visitor into the right traffic type",
    caption: "Each card describes how a visitor arrived. Drop it into the traffic type defined on slide 6.",
    slides: [6],
    data: {
      buckets: [
        { id: "paid", label: "Paid search" },
        { id: "organic", label: "Organic search" },
        { id: "direct", label: "Direct" },
        { id: "affiliate", label: "Affiliate" },
        { id: "email", label: "Email" },
        { id: "inapp", label: "In-app" },
        { id: "referral", label: "Referral" },
        { id: "social", label: "Social" }
      ],
      items: [
        { text: "Clicks a sponsored ad at the top of the search results page", bucket: "paid", why: "Paid advertisements on search engine results pages are paid search." },
        { text: "Clicks an unpaid search result after searching for a product", bucket: "organic", why: "Unpaid traffic from search engines is organic search (SEO)." },
        { text: "Types the shop's web address straight into the browser", bucket: "direct", why: "Typing or pasting the address, or using a bookmark, is direct traffic." },
        { text: "Clicks a link on a blogger's site who earns commission per sale", bucket: "affiliate", why: "Affiliate traffic is referral traffic based on commission." },
        { text: "Clicks a link inside the monthly newsletter", bucket: "email", why: "Visitors from a link you provided within an email are email traffic." },
        { text: "Taps a link inside the company's mobile application", bucket: "inapp", why: "A link you provided within a mobile application is in-app traffic." },
        { text: "Clicks a link on a news website that mentioned the shop for free", bucket: "referral", why: "A link from another website without commission is referral traffic." },
        { text: "Clicks a link in an Instagram post", bucket: "social", why: "A link provided on social media is social traffic." }
      ]
    }
  },
  examples: [
    {
      concept: "Channel performance",
      example: "An online bookshop wants to know whether its newsletter or its paid search ads bring more visitors.",
      walkthrough: [
        "Identify the channels involved: email traffic and paid search traffic (slide 6).",
        "Check analytics data for the number of visitors from each channel over the same period.",
        "Compare the two channels against the goal of the campaign, for example more visitors to the site.",
        "Communicate the insight to the marketing team so it can influence the budget decision (slide 2)."
      ],
      application: "This is the core reason slide 5 gives for analytics: knowing the performance of the digital marketing channels.",
      check: {
        q: "A visitor clicks a link in the bookshop's newsletter. Which traffic type is it?",
        options: ["Direct traffic", "Email traffic", "Referral traffic", "Paid search traffic"],
        answer: 1,
        explain: "Slide 6: email traffic is visitors who visit after clicking a link you provided within the email."
      }
    },
    {
      concept: "Choosing what should be measured",
      example: "A charity's website goal is more email collections, but its monthly report lists 40 different metrics.",
      walkthrough: [
        "Start from the goal: email collections (slide 8 lists email collections as a possible goal).",
        "Ask which measurable values indicate progress toward that goal; these become the KPIs.",
        "Drop metrics that do not support the objective of the digital marketing strategy (slide 9).",
        "Report the few KPIs that matter, avoiding tracking a lot of things that don't really matter (slide 10)."
      ],
      application: "The real challenge is not what can be measured but what should be measured.",
      check: {
        q: "Which metric best fits as a KPI for the charity's goal?",
        options: ["Number of browser types used", "Number of email sign-ups completed", "Total number of pages on the site", "Number of colors on the home page"],
        answer: 1,
        explain: "A KPI should be a measurable value that supports the goal; completed email sign-ups directly measure email collections."
      }
    }
  ],
  flashcards: [
    { id: "c1t1-f1", front: "Define web / digital analytics.", back: "The process of measuring digital initiatives and using the data to improve business performance.", slide: 2 },
    { id: "c1t1-f2", front: "What four things does web analytics let you do with website data?", back: "Collect, measure, report, and analyze.", slide: 3 },
    { id: "c1t1-f3", front: "Complete the quote: 'What gets measured...'", back: "...gets managed.", slide: 4 },
    { id: "c1t1-f4", front: "What is a KPI?", back: "Key performance indicators represent measurable values which give an indication of campaigns' performance.", slide: 8 },
    { id: "c1t1-f5", front: "Referral vs affiliate traffic?", back: "Referral: link from another website without commission. Affiliate: referral traffic based on commission.", slide: 6 },
    { id: "c1t1-f6", front: "What is direct traffic?", back: "When someone types or pastes your web address into their browser or clicks a bookmark.", slide: 6 },
    { id: "c1t1-f7", front: "What kind of traffic does SEO target?", back: "Unpaid traffic rather than direct traffic or paid traffic.", slide: 6 },
    { id: "c1t1-f8", front: "What must you determine when deciding which audiences to target?", back: "Their intent.", slide: 7 },
    { id: "c1t1-f9", front: "According to slide 10, what is often the real challenge in measurement?", back: "Not what can be measured, but what should be measured.", slide: 10 }
  ],
  quiz: [
    { id: "c1t1-q1", type: "mcq", difficulty: "easy", prompt: "Which statement matches the slide definition of web or digital analytics?", options: ["Designing websites that load quickly", "The process of measuring digital initiatives and using the data to improve business performance", "Buying ads on search engine results pages", "Storing customer passwords securely"], answer: 1, explain: "Slide 2 defines web/digital analytics as measuring digital initiatives and using the data to improve business performance.", wrongWhy: { "0": "Page speed is a web development concern, not the definition of analytics.", "2": "That describes paid search, one traffic channel.", "3": "Security is not part of the analytics definition." }, slide: 2, section: "c1t1-n1" },
    { id: "c1t1-q2", type: "tf", difficulty: "easy", prompt: "Affiliate traffic is referral traffic based on commission.", answer: true, explain: "Slide 6 defines affiliate traffic exactly as referral traffic based on commission.", slide: 6, section: "c1t1-n3" },
    { id: "c1t1-q3", type: "fill", difficulty: "easy", prompt: "Complete the quote from slide 4: 'what gets measured gets ______.'", answer: ["managed"], explain: "The driving force behind measuring digital initiatives is 'what gets measured gets managed.'", slide: 4, section: "c1t1-n2" },
    { id: "c1t1-q4", type: "match", difficulty: "medium", prompt: "Match each traffic type to its definition.", options: [["Direct traffic", "Types or pastes your web address, or clicks a bookmark"], ["Paid search traffic", "Paid advertisements on search engine results pages"], ["Social traffic", "Clicks a link provided on social media"], ["In-app traffic", "Clicks a link you provided within a mobile application"]], answer: null, explain: "All four definitions come from slide 6.", slide: 6, section: "c1t1-n3" },
    { id: "c1t1-q5", type: "mcq", difficulty: "medium", scenario: "A travel site is mentioned in a free article on a news website. A reader clicks the link in the article and lands on the travel site. No commission is paid.", prompt: "How should this visit be classified?", options: ["Affiliate traffic", "Referral traffic", "Direct traffic", "Organic search traffic"], answer: 1, explain: "Slide 6: referral traffic is visitors who click a link provided by another website without commission.", wrongWhy: { "0": "Affiliate traffic requires a commission, and none is paid here.", "2": "Direct traffic means typing the address or using a bookmark, not clicking a link on another site.", "3": "Organic search traffic comes from unpaid search engine results, not from a news website link." }, slide: 6, section: "c1t1-n3" },
    { id: "c1t1-q6", type: "multi", difficulty: "medium", prompt: "Which of these are given on slide 8 as examples of goals for marketing initiatives? (Select all that apply.)", options: ["More visitors to the site", "Registrations", "Email collections", "Hiring more IT staff"], answer: [0, 1, 2], explain: "Slide 8 lists more visitors, registrations, email collections and call-to-action as possible goals.", slide: 8, section: "c1t1-n2" },
    { id: "c1t1-q7", type: "tf", difficulty: "medium", prompt: "According to the slides, the real challenge in analytics is usually what can be measured, not what should be measured.", answer: false, explain: "Slide 10 says the opposite: the real challenge is not what can be measured, but what should be measured.", slide: 10, section: "c1t1-n2" },
    { id: "c1t1-q8", type: "mcq", difficulty: "hard", scenario: "A fitness brand sees that its returning visitors who engage with workout videos often buy. The marketing manager wants to find more people like them.", prompt: "Which use of analytics from slide 7 does this describe?", options: ["Building personas around engaged visitors to target similar people", "Measuring paid search ads on SERPs", "Removing non-human traffic from log files", "Calculating percentage change"], answer: 0, explain: "Slide 7: track visitor types, build personas around those who engage, then target other people similar to your current customer base.", wrongWhy: { "1": "Paid search measurement is about one channel, not building personas from engaged visitors.", "2": "Removing robot traffic is a log-file issue from the evolution of analytics, not audience targeting.", "3": "Percentage change compares old and new values; it does not identify similar audiences." }, slide: 7, section: "c1t1-n4" },
    { id: "c1t1-q9", type: "multi", difficulty: "hard", prompt: "Which statements about KPIs are supported by the slides? (Select all that apply.)", options: ["KPIs are measurable values that indicate campaigns' performance", "KPIs should support the objective of the digital marketing strategy", "The more KPIs a business tracks, the better its decisions", "Accurate data is essential for effective marketing decisions"], answer: [0, 1, 3], explain: "Slides 8 and 9 define KPIs and tie them to the strategy objective; slide 8 stresses accurate data. Slide 10 warns against tracking too many things.", slide: 9, section: "c1t1-n2" },
    { id: "c1t1-q10", type: "fill", difficulty: "hard", prompt: "Problem: A visitor saved your site as a bookmark last month and today clicks that bookmark to return. Which traffic type is this? (one word)", answer: ["direct", "direct traffic"], explain: "Slide 6: direct traffic is when someone types or pastes your web address or clicks a bookmark.", slide: 6, section: "c1t1-n3" },
    { id: "c1t1-q11", type: "mcq", difficulty: "hard", prompt: "Which part of the slide 2 definition goes beyond simply collecting data?", options: ["Hosting the data on a server", "The communication of insights to influence decisions", "Counting hits in a log file", "Using JavaScript tags"], answer: 1, explain: "Slide 2 says analytics is the discovery of insights through analysis and the communication of those insights to influence decisions.", wrongWhy: { "0": "Hosting is infrastructure, not part of the definition.", "2": "Counting hits is a historical collection method, still only collection.", "3": "JavaScript tags are a collection technique, not the insight and communication step." }, slide: 2, section: "c1t1-n1" }
  ]
},

/* ===================================================================== TOPIC 2 */
{
  id: "c1t2",
  title: "The Evolution of Web Analytics (Stages I–V)",
  slides: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26],
  minutes: 25,
  overview: {
    about: "How web analytics evolved through five stages: log files, page tagging, rapid growth, the transition to digital analytics with tag management and privacy laws, and today's AI-powered era with GA4.",
    why: "Each stage solved a problem of the previous one. Knowing why log files gave way to page tags, and why AI now models missing data, explains how modern tools like GA4 work and where their limits are.",
    objectives: [
      "Name the five stages and their date ranges.",
      "Explain how log file analysis worked and why hits stopped being a relevant metric.",
      "List the advantages page tagging had over log file analysis, including the role of cookies.",
      "Describe Stage III behavioral features and Stage IV tag management systems and privacy laws.",
      "Explain the four steps of the analytics ladder and how Consent Mode with behavioral modeling fills privacy gaps."
    ],
    vocabulary: [
      { term: "Log file", def: "A file in which the web server records each request or hit made for a page's content.", slide: 11 },
      { term: "Page tagging", def: "Using JavaScript code to send data about web pages and visitors to a third-party web analytics vendor.", slide: 13 },
      { term: "Caching", def: "Web browsers storing a local copy of previously viewed pages so they load quickly.", slide: 13 },
      { term: "Cookie", def: "A small text file that stores information related to the visitor in the web browser so the website can remember previous activity and preferences.", slide: 17 },
      { term: "Tag management system (TMS)", def: "A system that streamlines deploying and managing JavaScript code by introducing a container tag that houses all of the different tags.", slide: 21 },
      { term: "PII", def: "Personally identifiable information, such as e-mail addresses or full names.", slide: 23 },
      { term: "Consent Mode", def: "When a visitor declines cookies, it sends cookieless signals with no identifiers.", slide: 26 }
    ],
    hook: "From reading server logs to asking AI 'what happens next?': thirty years of analytics in five stages."
  },
  notes: [
    {
      id: "c1t2-n1",
      heading: "Stage I: The birth of web analytics and log files (1993–1998)",
      slides: [11, 12],
      fromSlides: [
        { text: "IT departments found they needed to monitor the performance of their corporate websites.", slide: 11 },
        { text: "First web analytics tools were based on log file analysis", slide: 11 },
        { text: "When users visit a web page, a request is made to the web server for the page's content and the web server records each request or hits in a log file.", slide: 11 },
        { text: "Hits were no longer a relevant web metric once web pages included more than just plain text and links.", slide: 11 },
        { text: "11.222.333.44 - - [11/Dec/2018:11:01:28 –0600] 'GET /blog/page-address.htm HTTP/1.1' 200 182 '-' 'Mozilla/5.0 Chrome/60.0.3112.113'", slide: 12 }
      ],
      simple: "The first analytics tools read the web server's log file, a list of every request (hit) the server received. From it, webmasters saw IP addresses, referrers, pages, error codes and browsers. It was costly, depended on IT, and could capture sensitive data.",
      deep: "In Stage I, IT departments needed to monitor corporate website performance, so the first tools analyzed server log files. Each time a user visited a page, the browser requested the content from the web server, which recorded each request or hit in a log file. Webmasters could obtain basic reports on visitors' IP addresses, referrers, pages, status codes such as 404 page-not-found errors, and web browsers. The slide 12 example shows one log line: the client IP, a timestamp, the GET request for the page, status code 200 meaning the server found the file, and the browser string for Chrome. Clickstream data was very IT-dependent and costly, and raised privacy concerns because it could capture everything, including passwords and credit card numbers. Once pages contained more than plain text and links, hits stopped being a relevant metric.",
      exam: [
        "Stage I = 1993–1998, log file analysis, driven by IT departments.",
        "The web server records each request or hit in a log file.",
        "Log reports: IP addresses, referrers, pages, status codes (404), browsers.",
        "Problems: IT-dependent, costly, privacy concerns (could capture passwords, credit card numbers).",
        "Status code 200 means the server found the file."
      ],
      definitions: [
        { term: "Log file analysis", def: "The basis of the first web analytics tools: the web server records each request or hit in a log file.", slide: 11 },
        { term: "Hit", def: "A request made to the web server for a page's content, recorded in the log file.", slide: 11 }
      ],
      keyFacts: [
        "404 is a page-not-found status code; 200 means the server found the file.",
        "Hits were no longer relevant once pages included more than plain text and links."
      ],
      examples: [
        "Slide 12: on 11 December 2018 someone using Google Chrome loaded /blog/page-address.htm from IP 11.222.333.44 and got status 200."
      ],
      misconceptions: [
        "Log files only recorded harmless data. The slides note they could capture everything, including passwords and credit card numbers."
      ]
    },
    {
      id: "c1t2-n2",
      heading: "Stage II: The emergence of page tagging (1999–2004)",
      slides: [13, 14, 15, 16, 17, 18],
      fromSlides: [
        { text: "By default, web server log files captured both human and non-human interactions.", slide: 13 },
        { text: "Caching meant web content was being viewed without requests being made to the web server, which lowered the volume of traffic reported by log files.", slide: 13 },
        { text: "JavaScript code was used to send online data about web pages and visitors imperceptibly to a third-party web analytics vendor, which hosted all of the collected data.", slide: 13 },
        { text: "Robots and spiders could not execute JavaScript, therefore, non-human traffic was not collected so it didn't interfere with understanding actual visitor behaviors.", slide: 16 },
        { text: "A cookie is a small text file that stores information related to the visitor in the web browser so that, in the future, the website can remember each user's previous activity and preferences", slide: 17 }
      ],
      simple: "Log files had two big problems: robots filled them with fake visits, and browser caching hid real visits. Page tagging fixed this: a small JavaScript code on each page sends data to an analytics vendor whenever the page is actually viewed. Cookies let tools recognize returning visitors, and reports moved online as one of the first SaaS services.",
      deep: "Stage II responded to two weaknesses of log files. Robots and search engine spiders crawled sites repeatedly, and because log files captured both human and non-human interactions, analysts constantly had to remove non-human traffic. Browser caching stored local copies of previously viewed pages, so content was viewed without server requests, lowering reported traffic. As JavaScript became the standard for client-side scripting, the hit counter evolved into page tagging: JavaScript sent data about pages and visitors to a third-party vendor that hosted the data. Analysts accessed reports through an online interface, one of the earliest forms of SaaS or cloud computing, paying a recurring monthly fee based on data volume instead of a one-time software fee. Page tagging was unaffected by caching, ignored robots that could not execute JavaScript, could measure in-page events such as button clicks, captured custom data more flexibly, and offered near real-time self-service reports. It relied on cookies to anonymously identify visitors across visits and within a session. Slide 18 also contrasts synchronous execution, where routines run one after another, with asynchronous execution, where you can move on before a task finishes.",
      exam: [
        "Stage II = 1999–2004, page tagging with JavaScript.",
        "Two log-file problems: non-human traffic (robots/spiders) and caching lowering reported traffic.",
        "Page tag advantages: not affected by caching, no robot traffic, in-page events, custom data, near real-time self-service reports.",
        "Early SaaS: recurring monthly fee depending on data collected instead of a one-time fee.",
        "Cookies anonymously identify visitors across visits and within a session."
      ],
      definitions: [
        { term: "Caching", def: "Web browsers stored a local copy of previously viewed pages on a user's computer so that they would load quickly.", slide: 13 },
        { term: "Cookie", def: "A small text file that stores information related to the visitor in the web browser so that the website can remember each user's previous activity and preferences.", slide: 17 },
        { term: "Synchronous execution", def: "Execution happens in a single series: A runs and finishes, then B starts, then C.", slide: 18 },
        { term: "Asynchronous execution", def: "You can move on to another task before the current one finishes.", slide: 18 }
      ],
      keyFacts: [
        "JavaScript became the standard for client-side scripting in the late 1990s.",
        "Marketers still needed web developers to insert page tags, but no longer depended on IT for batch-processed log reports.",
        "Tags were activated by the page being viewed, not requested from the web server."
      ],
      examples: [
        "A visitor clicks the browser back button and sees a cached page. A log file records nothing, but the page tag still fires because the page was viewed."
      ],
      misconceptions: [
        "Page tagging removed the need for developers entirely. Developers were still needed to insert the tags; only the dependence on IT reports ended.",
        "Cookies in page tagging identify visitors by name. Slide 17 says cookies identified visitors anonymously."
      ]
    },
    {
      id: "c1t2-n3",
      heading: "Stage III: The rapid growth of web analytics (2005–2009)",
      slides: [19, 20],
      fromSlides: [
        { text: "By embedding JavaScript tags in the apps and videos, web analysts could use event tracking to measure key actions (micro-conversions) and milestones (percent of video viewed).", slide: 19 },
        { text: "Marketers turned their focus to measuring visitor engagement and not only page views", slide: 19 },
        { text: "Conversion funnels (displaying key abandonment points in an online process)", slide: 19 },
        { text: "Heat map overlays (revealing visually which links on a page were 'hottest' and being clicked on most).", slide: 19 }
      ],
      simple: "In Stage III, tags were placed in apps and videos too, so analysts could track actions like how much of a video was watched. Marketers started caring about engagement, not only page views. Tools added conversion funnels, heat maps and segmentation.",
      deep: "Stage III saw analytics expand beyond pages. Embedding JavaScript tags in apps and videos enabled event tracking of key actions, called micro-conversions, and milestones such as percent of video viewed. The focus shifted from page views toward visitor engagement and toward understanding the behaviors of key visitor segments. Vendors added behavioral analysis features: conversion funnels that display key abandonment points in an online process, heat map overlays that reveal which links on a page are clicked most, and segmentation features for understanding pre-defined audiences. Slide 20 shows an example conversion funnel.",
      exam: [
        "Stage III = 2005–2009, rapid growth.",
        "Event tracking in apps and videos: micro-conversions and milestones (percent of video viewed).",
        "Focus moved to engagement, not only page views, and to visitor segments.",
        "Features: conversion funnels (abandonment points), heat map overlays (hottest links), segmentation."
      ],
      definitions: [
        { term: "Conversion funnel", def: "A display of key abandonment points in an online process.", slide: 19 },
        { term: "Heat map overlay", def: "Reveals visually which links on a page were 'hottest' and being clicked on most.", slide: 19 },
        { term: "Micro-conversion", def: "A key action measured through event tracking.", slide: 19 }
      ],
      keyFacts: [
        "Segmentation features enabled marketers to understand behaviors and attributes of pre-defined audiences."
      ],
      examples: [
        "A checkout funnel shows 1 in 2 shoppers leaving at the payment step: that step is a key abandonment point."
      ],
      misconceptions: [
        "Stage III still measured only page views. The slide says marketers turned to engagement, not only page views."
      ]
    },
    {
      id: "c1t2-n4",
      heading: "Stage IV: Transition to digital analytics, tag management and privacy (2010–present)",
      slides: [21, 22, 23],
      fromSlides: [
        { text: "Tag management systems (TMS) streamlined the process of deploying and managing JavaScript code by introducing a container tag that houses all of the different tags.", slide: 21 },
        { text: "Although tag management doesn't entirely remove IT involvement, digital marketers no longer need to bother their IT team with simple code changes.", slide: 21 },
        { text: "California's Consumer Privacy Act (CCPA) – 2018", slide: 23 },
        { text: "The European Union's General Data Protection Regulation (GDPR) – 2018", slide: 23 },
        { text: "Websites had to seek informed consent from users before setting a cookie on their computer.", slide: 23 }
      ],
      simple: "Tag management systems such as Google Tag Manager put all tracking tags in one container, so marketers can add or remove tags themselves. At the same time, privacy laws (GDPR and CCPA, both 2018) made websites ask for consent before setting cookies. Analytics should stay anonymous: collecting names or emails in reports can break the tool's terms.",
      deep: "Stage IV is defined by two forces. First, tag management systems streamlined deploying and managing JavaScript code through a single container tag that houses all the other tags. Through a user-friendly console marketers can deploy new tags, remove unnecessary ones and build rules controlling how data is collected; this reduces IT concerns about page load performance and makes marketers more agile, though it does not entirely remove IT involvement. Google Tag Manager and Adobe Launch are the examples given. Second, online privacy concerns drew the attention of lawmakers, browsers, industry associations and businesses, with new data protection measures, particularly in Europe. The CCPA and GDPR, both from 2018, required websites to seek informed consent before setting cookies, with each country interpreting informed consent anywhere from strict opt-in to a cookie policy banner. Web analytics tools collect anonymous data by default, recognizing visitors through a random cookie identifier; collecting PII such as e-mail addresses or full names in custom reports most likely violates the licensing terms and potentially the privacy policy.",
      exam: [
        "Stage IV = 2010–present; TMS uses a container tag housing all tags.",
        "TMS examples: Google Tag Manager, Adobe Launch.",
        "TMS lets marketers deploy/remove tags and build rules; reduces IT page-load concerns; IT not entirely removed.",
        "CCPA (California) and GDPR (EU) both 2018: informed consent before setting cookies.",
        "Analytics data is anonymous by default (random cookie identifier); collecting PII likely violates terms."
      ],
      definitions: [
        { term: "Tag management system (TMS)", def: "Streamlines deploying and managing JavaScript code by introducing a container tag that houses all of the different tags.", slide: 21 },
        { term: "Informed consent", def: "Consent websites must seek from users before setting a cookie; each country interprets it, from strict opt-in to a cookie policy banner.", slide: 23 },
        { term: "Personally identifiable information (PII)", def: "Information such as e-mail addresses or full names.", slide: 23 }
      ],
      keyFacts: [
        "GDPR and CCPA were both introduced in 2018.",
        "Individual visitors are recognized through a random identifier assigned through a cookie."
      ],
      examples: [
        "A marketer adds a new tracking tag through Google Tag Manager's console instead of asking IT to edit every page."
      ],
      misconceptions: [
        "Tag management removes IT completely. Slide 21 says it doesn't entirely remove IT involvement.",
        "It is fine to store visitors' email addresses in analytics custom reports. Slide 23 says this most likely violates the licensing agreement."
      ]
    },
    {
      id: "c1t2-n5",
      heading: "Stage V: The AI-powered analytics era (2020–present)",
      slides: [24, 25, 26],
      fromSlides: [
        { text: "Google Analytics 4 (GA4), launched in October 2020, was built with machine learning at its core. Universal Analytics stopped processing data on July 1, 2023.", slide: 24 },
        { text: "Machine learning now models missing data, predicts user behavior, flags unusual changes and shares conversion credit across channels.", slide: 24 },
        { text: "Stages I–IV 'What happened on our website?' Stage V 'Why did it happen, what will happen next, and what should we do?'", slide: 24 },
        { text: "Value increases with each step, and so does the need for clean, complete data.", slide: 25 },
        { text: "Modeled data is an estimate, not an observation.", slide: 26 }
      ],
      simple: "Privacy rules mean some data will always be missing. GA4, launched in October 2020, uses machine learning to fill gaps, predict behavior, spot unusual changes and share credit between channels. The question moves from 'what happened?' to 'why, what next, and what should we do?'. When visitors decline cookies, Consent Mode plus modeling estimates their behavior, but that is an estimate.",
      deep: "Stage V extends the timeline because tag management made collection easier, but privacy laws and cookie consent left gaps in the data. GA4, launched in October 2020, was built with machine learning at its core, and Universal Analytics stopped processing data on July 1, 2023, making GA4 the standard. Machine learning models missing data, predicts user behavior, flags unusual changes and shares conversion credit across channels, and generative AI (Gemini) lets marketers query data in plain language. Slide 25 presents a four-step ladder: descriptive (what happened: sessions, users, bounce rate, conversions), diagnostic (why: anomaly detection, automated insights, key-driver analysis), predictive (what will happen: purchase and churn probability, predicted revenue) and prescriptive (what should we do: predictive audiences, data-driven attribution, AI recommendations); value and the need for clean, complete data rise with each step. Slide 26 shows how AI fills the privacy gap: consenting visitors are observed directly, while for visitors who decline, Consent Mode sends cookieless signals with no identifiers and machine learning estimates their behavior from similar consented visitors, so reports combine observed and modeled data. This requires Consent Mode on every page and enough daily traffic, about 1,000 consented users and 1,000 non-consented events per day, and the reporting identity setting shows when modeled data is included.",
      exam: [
        "Stage V = 2020–present; GA4 launched October 2020; Universal Analytics stopped processing data July 1, 2023.",
        "ML in GA4: models missing data, predicts behavior, flags unusual changes, shares conversion credit.",
        "Ladder: descriptive -> diagnostic -> predictive -> prescriptive; this chapter's metrics sit on step 1.",
        "Consent Mode: declined cookies -> cookieless signals, no identifiers -> ML estimates from similar consented visitors.",
        "Modeled data is an estimate; requires Consent Mode on every page and about 1,000 consented users and 1,000 non-consented events per day."
      ],
      definitions: [
        { term: "Descriptive analytics", def: "What happened? Standard reports: sessions, users, bounce rate, conversions.", slide: 25 },
        { term: "Diagnostic analytics", def: "Why did it happen? Anomaly detection, automated insights, key-driver analysis.", slide: 25 },
        { term: "Predictive analytics", def: "What will happen? Purchase probability, churn probability, predicted revenue.", slide: 25 },
        { term: "Prescriptive analytics", def: "What should we do? Predictive audiences, data-driven attribution, AI recommendations.", slide: 25 },
        { term: "Consent Mode", def: "When a visitor declines cookies, Consent Mode sends cookieless signals with no identifiers.", slide: 26 }
      ],
      keyFacts: [
        "Generative AI (Gemini) lets marketers ask questions about their data in plain language.",
        "GA4 reports show observed + modeled users and sessions.",
        "Check the reporting identity setting to know when reports include modeled data.",
        "Per the speaker notes, the advanced implementation loads tags before the consent banner, with thresholds measured over 7 days within the previous 28."
      ],
      examples: [
        "If some visitors decline cookies, GA4 can still show an estimate of their sessions by learning from similar visitors who accepted."
      ],
      misconceptions: [
        "Modeled users in GA4 are real observed users. Slide 26: modeled data is an estimate, not an observation.",
        "AI removes the need for clean data. Slide 25: the need for clean, complete data increases with each step."
      ]
    }
  ],
  steps: [
    {
      title: "A visitor arrives and sees the consent banner",
      what: "Every page has Consent Mode running. The visitor either accepts or declines analytics cookies.",
      why: "GDPR and CCPA require consent, so some visitors will always be missing from directly observed data (slide 26).",
      practical: "Consent Mode must be on every page for modeling to work.",
      visual: "Visitor -> consent banner -> accept OR decline",
      check: { q: "Why will some visitors always be missing from observed data?", options: ["Robots block JavaScript", "Consent is required, and some visitors decline cookies", "Caching hides all visits", "GA4 only counts paid traffic"], answer: 1, explain: "Slide 26 links this to GDPR and CCPA: consent is required, so some visitors decline and are not observed directly." }
    },
    {
      title: "Path A: the visitor accepts cookies",
      what: "GA4 observes sessions, events and conversions directly.",
      why: "With consent, the normal cookie-based measurement works and produces observed data.",
      practical: "These consented visitors also become the training examples for the model.",
      visual: "Accept -> GA4 observes sessions, events, conversions -> observed data",
      check: { q: "What does GA4 do for a visitor who accepts cookies?", options: ["Estimates their behavior", "Observes their sessions, events and conversions directly", "Deletes their data", "Sends only cookieless signals"], answer: 1, explain: "Slide 26: when the visitor accepts cookies, GA4 observes sessions, events and conversions directly." }
    },
    {
      title: "Path B: the visitor declines cookies",
      what: "Consent Mode lets the Google tag send cookieless signals with no identifiers.",
      why: "The visitor's choice is respected (no identifiers) while GA4 still learns that some activity happened.",
      practical: "Per the speaker notes, the advanced implementation loads tags before the consent banner so these signals can be sent.",
      visual: "Decline -> cookieless signals (no identifiers)",
      check: { q: "What does Consent Mode send when a visitor declines cookies?", options: ["Full cookie data with a user ID", "Cookieless signals with no identifiers", "The visitor's e-mail address", "Nothing at all, ever"], answer: 1, explain: "Slide 26: Consent Mode sends cookieless signals with no identifiers." }
    },
    {
      title: "Machine learning estimates the missing behavior",
      what: "GA4's model estimates the behavior of non-consenting visitors from similar consented visitors.",
      why: "This fills the privacy gap that Stage IV left in the data.",
      practical: "The model needs enough data: about 1,000 consented users and 1,000 non-consented events per day.",
      visual: "Consented visitors (training) + cookieless signals -> ML -> modeled data",
      check: { q: "Which traffic level does slide 26 give as needed to train the model?", options: ["About 10 users per day", "About 1,000 consented users and 1,000 non-consented events per day", "At least 1 million sessions per month", "No minimum is required"], answer: 1, explain: "Slide 26: enough daily traffic, about 1,000 consented users and 1,000 non-consented events per day." }
    },
    {
      title: "Reports combine observed and modeled data",
      what: "GA4 reports show observed + modeled users and sessions.",
      why: "Analysts get a more complete picture, but part of it is an estimate.",
      practical: "Check the reporting identity setting to know when reports include modeled data.",
      visual: "GA4 report = observed data + modeled data",
      check: { q: "How should an analyst treat modeled data?", options: ["As exact observed counts", "As an estimate, not an observation", "As robot traffic", "As PII"], answer: 1, explain: "Slide 26: modeled data is an estimate, not an observation." }
    }
  ],
  visual: {
    type: "timeline",
    title: "Five stages of web analytics",
    caption: "Stages and dates from slides 11–24. Stages IV and V overlap: both continue to the present.",
    slides: [11, 13, 19, 21, 23, 24],
    data: {
      events: [
        { date: "1993–1998", label: "Stage I: Birth of web analytics", detail: "Log file analysis. The web server records each request or hit. IT-dependent, costly, privacy concerns." },
        { date: "1999–2004", label: "Stage II: Emergence of page tagging", detail: "JavaScript tags send data to a third-party vendor; cookies identify visitors anonymously; early SaaS reporting." },
        { date: "2005–2009", label: "Stage III: Rapid growth", detail: "Event tracking in apps and videos, engagement focus, conversion funnels, heat maps, segmentation." },
        { date: "2010–present", label: "Stage IV: Transition to digital analytics", detail: "Tag management systems (Google Tag Manager, Adobe Launch) and rising privacy concerns." },
        { date: "2018", label: "CCPA and GDPR", detail: "Websites must seek informed consent before setting a cookie." },
        { date: "2020–present", label: "Stage V: AI-powered analytics", detail: "Machine learning models missing data, predicts behavior, flags unusual changes, shares conversion credit." },
        { date: "October 2020", label: "GA4 launched", detail: "Built with machine learning at its core." },
        { date: "July 1, 2023", label: "Universal Analytics stops processing data", detail: "GA4 becomes the standard." }
      ]
    }
  },
  examples: [
    {
      concept: "Reading a log file line",
      example: "Slide 12 log line: 11.222.333.44 - - [11/Dec/2018:11:01:28 –0600] 'GET /blog/page-address.htm HTTP/1.1' 200 182 '-' 'Mozilla/5.0 Chrome/60.0.3112.113'",
      walkthrough: [
        "11.222.333.44 is the IP address of the client, the software that requested the file.",
        "[11/Dec/2018:11:01:28 –0600] is when the request was made: 11 December 2018.",
        "GET /blog/page-address.htm is the page that was requested.",
        "200 means the server found the file.",
        "Mozilla/5.0 Chrome/60.0.3112.113 shows the visitor was using Google Chrome."
      ],
      application: "This is the raw material Stage I tools used to report IP addresses, pages, status codes and browsers.",
      check: { q: "In the log line, what does the 200 mean?", options: ["200 visitors", "The server found the file", "The page took 200 ms", "Page not found"], answer: 1, explain: "Slide 12: the '200' means the server found the file. A 404 would mean page not found." }
    },
    {
      concept: "Why page tagging beat log files",
      example: "A news site's log files show traffic falling, yet editors feel readership is growing; the logs are also full of search engine spiders.",
      walkthrough: [
        "Caching: browsers show stored copies of pages without contacting the server, so the log misses real views (slide 13).",
        "Robots: log files capture human and non-human interactions, inflating and distorting counts (slide 13).",
        "Page tags fire when a page is viewed, so cached views are still counted (slide 16).",
        "Robots and spiders could not execute JavaScript, so tags ignored them (slide 16)."
      ],
      application: "Moving to page tagging gives a truer picture of human visitor behavior.",
      check: { q: "Why were page tags not affected by caching?", options: ["They were activated by the page being viewed, not requested from the server", "They deleted the browser cache", "They ran on the web server", "They blocked robots from loading pages"], answer: 0, explain: "Slide 16: tags were activated by the page being viewed, not requested from the web server." }
    }
  ],
  flashcards: [
    { id: "c1t2-f1", front: "Name the five stages of web analytics with dates.", back: "I Birth (1993–1998), II Page tagging (1999–2004), III Rapid growth (2005–2009), IV Transition to digital analytics (2010–present), V AI-powered (2020–present).", slide: 24 },
    { id: "c1t2-f2", front: "What were the first web analytics tools based on?", back: "Log file analysis: the web server records each request or hit in a log file.", slide: 11 },
    { id: "c1t2-f3", front: "Two problems of log files that page tagging solved?", back: "Non-human traffic from robots/spiders, and caching lowering the traffic reported.", slide: 13 },
    { id: "c1t2-f4", front: "What is a cookie?", back: "A small text file storing visitor information in the browser so the website can remember previous activity and preferences.", slide: 17 },
    { id: "c1t2-f5", front: "Synchronous vs asynchronous execution?", back: "Synchronous: one routine after another (A then B then C). Asynchronous: you can move on before the task finishes.", slide: 18 },
    { id: "c1t2-f6", front: "What did Stage III heat map overlays show?", back: "Which links on a page were 'hottest' and being clicked on most.", slide: 19 },
    { id: "c1t2-f7", front: "What is a tag management system?", back: "A system using a container tag that houses all the different tags; examples Google Tag Manager, Adobe Launch.", slide: 21 },
    { id: "c1t2-f8", front: "When did GA4 launch and when did Universal Analytics stop processing data?", back: "GA4: October 2020. UA stopped: July 1, 2023.", slide: 24 },
    { id: "c1t2-f9", front: "The four steps of the analytics ladder?", back: "Descriptive (what happened), diagnostic (why), predictive (what will happen), prescriptive (what should we do).", slide: 25 },
    { id: "c1t2-f10", front: "What does Consent Mode send when cookies are declined?", back: "Cookieless signals with no identifiers; ML then estimates behavior from similar consented visitors.", slide: 26 }
  ],
  quiz: [
    { id: "c1t2-q1", type: "mcq", difficulty: "easy", prompt: "What were the first web analytics tools (Stage I) based on?", options: ["Page tagging with JavaScript", "Log file analysis", "Tag management systems", "Machine learning"], answer: 1, explain: "Slide 11: first web analytics tools were based on log file analysis.", wrongWhy: { "0": "Page tagging is Stage II (1999–2004).", "2": "Tag management systems belong to Stage IV.", "3": "Machine learning at the core is Stage V." }, slide: 11, section: "c1t2-n1" },
    { id: "c1t2-q2", type: "tf", difficulty: "easy", prompt: "Universal Analytics stopped processing data on July 1, 2023.", answer: true, explain: "Slide 24 states Universal Analytics stopped processing data on July 1, 2023.", slide: 24, section: "c1t2-n5" },
    { id: "c1t2-q3", type: "fill", difficulty: "easy", prompt: "A small text file that stores information related to the visitor in the web browser is called a ______.", answer: ["cookie", "a cookie"], explain: "Slide 17 defines a cookie as a small text file that stores visitor information in the browser.", slide: 17, section: "c1t2-n2" },
    { id: "c1t2-q4", type: "match", difficulty: "medium", prompt: "Match each analytics ladder step to its question.", options: [["Descriptive", "What happened?"], ["Diagnostic", "Why did it happen?"], ["Predictive", "What will happen?"], ["Prescriptive", "What should we do?"]], answer: null, explain: "Slide 25 defines the four steps of the ladder.", slide: 25, section: "c1t2-n5" },
    { id: "c1t2-q5", type: "multi", difficulty: "medium", prompt: "Which were advantages of page tagging over log file analysis? (Select all that apply.)", options: ["Data collection wasn't impacted by page caching", "Robots and spiders could not execute JavaScript, so non-human traffic was not collected", "In-page events such as button clicks could be measured", "It needed no web developers at all"], answer: [0, 1, 2], explain: "Slide 16 lists these advantages. Slide 14 says marketers still needed web developers to insert the tags.", slide: 16, section: "c1t2-n2" },
    { id: "c1t2-q6", type: "mcq", difficulty: "medium", scenario: "A marketing team wants to add a new tracking tag for a campaign. In the past they had to wait weeks for IT to change the website code.", prompt: "Which Stage IV technology lets them deploy the tag themselves through a console?", options: ["Log file analysis", "A tag management system such as Google Tag Manager", "Browser caching", "A heat map overlay"], answer: 1, explain: "Slide 21: through a user-friendly console of a TMS, marketers can deploy new tags without bothering IT with simple code changes.", wrongWhy: { "0": "Log file analysis was IT-dependent, the opposite of what they need.", "2": "Caching stores local copies of pages; it does not deploy tags.", "3": "A heat map overlay shows clicked links; it does not manage tags." }, slide: 21, section: "c1t2-n4" },
    { id: "c1t2-q7", type: "tf", difficulty: "medium", prompt: "Tag management systems entirely remove IT involvement.", answer: false, explain: "Slide 21: tag management doesn't entirely remove IT involvement; marketers just no longer bother IT with simple code changes.", slide: 21, section: "c1t2-n4" },
    { id: "c1t2-q8", type: "mcq", difficulty: "hard", scenario: "A website's log files show traffic dropping, while sales are stable. Investigation shows many visitors use the browser back button and revisit pages they already loaded.", prompt: "What most likely explains the drop in reported traffic?", options: ["Caching meant content was viewed without requests to the web server", "Robots were executing JavaScript", "GDPR deleted the log files", "Hits became more accurate"], answer: 0, explain: "Slide 13: caching meant content was viewed without server requests, lowering the traffic reported by log files.", wrongWhy: { "1": "Robots could not execute JavaScript; and robots would inflate, not lower, log traffic.", "2": "The slides do not say GDPR deletes log files.", "3": "Hits became less relevant, not more accurate, and that would not lower traffic." }, slide: 13, section: "c1t2-n2" },
    { id: "c1t2-q9", type: "mcq", difficulty: "hard", scenario: "An analyst's GA4 report includes modeled users because 40% of visitors declined cookies.", prompt: "Which statement about this report is correct according to slide 26?", options: ["Modeled users are exact counts of real visitors", "Modeled data is an estimate based on similar consented visitors, and the reporting identity setting shows when it is included", "Modeling works without Consent Mode on every page", "Declining visitors are tracked with full identifiers"], answer: 1, explain: "Slide 26: ML estimates behavior from similar consented visitors; modeled data is an estimate; check the reporting identity setting.", wrongWhy: { "0": "Slide 26 says modeled data is an estimate, not an observation.", "2": "Slide 26 requires Consent Mode on every page.", "3": "Consent Mode sends cookieless signals with no identifiers." }, slide: 26, section: "c1t2-n5" },
    { id: "c1t2-q10", type: "fill", difficulty: "hard", prompt: "Problem: A site wants GA4 behavioral modeling. Per slide 26, about how many consented users per day are needed to train the model? (number)", answer: ["1000", "1,000", "about 1000", "about 1,000"], explain: "Slide 26: about 1,000 consented users and 1,000 non-consented events per day.", slide: 26, section: "c1t2-n5" },
    { id: "c1t2-q11", type: "multi", difficulty: "hard", prompt: "Which tasks does machine learning perform in GA4 according to slide 24? (Select all that apply.)", options: ["Models missing data", "Predicts user behavior", "Flags unusual changes", "Removes the need for consent"], answer: [0, 1, 2], explain: "Slide 24: ML models missing data, predicts user behavior, flags unusual changes and shares conversion credit across channels. Consent is still required.", slide: 24, section: "c1t2-n5" },
    { id: "c1t2-q12", type: "mcq", difficulty: "easy", prompt: "Which feature from Stage III displays key abandonment points in an online process?", options: ["Heat map overlay", "Conversion funnel", "Log file", "Container tag"], answer: 1, explain: "Slide 19: conversion funnels display key abandonment points in an online process.", wrongWhy: { "0": "Heat maps show which links are clicked most.", "2": "Log files record server requests (Stage I).", "3": "A container tag is part of tag management (Stage IV)." }, slide: 19, section: "c1t2-n3" }
  ]
},

/* ===================================================================== TOPIC 3 */
{
  id: "c1t3",
  title: "Sessions, Time Comparison, Campaigns & UTM Tags",
  slides: [27, 28, 29, 30, 31, 32, 33, 34, 35, 36],
  minutes: 20,
  overview: {
    about: "How sessions are defined and counted (including the 30-minute rule and GA4 differences), why comparing over time gives context, how campaigns are described by source, medium and UTM parameters, and what views and bounce rate measure.",
    why: "Sessions are the denominator of many later metrics such as conversion rate, and UTM tags are what make channels and attribution visible. Getting these basics right makes every later report trustworthy.",
    objectives: [
      "Define a session and apply the 30-minute inactivity rule.",
      "Explain how new sessions and new users are counted in a date range, and how GA4 differs from UA.",
      "Explain why week-over-week and year-over-year comparison and trends matter.",
      "Define campaign, source, medium and the five UTM parameters.",
      "Define views and bounce rate and explain why segmenting traffic helps diagnose a high bounce rate."
    ],
    vocabulary: [
      { term: "Sessions", def: "The number of individual sessions initiated by all the users to your site.", slide: 27 },
      { term: "Digital marketing campaign", def: "An online marketing effort put forward by a company to drive engagement, conversions, traffic, or revenue.", slide: 32 },
      { term: "Source", def: "The origin of your traffic, such as a search engine (google) or a domain (example.com).", slide: 32 },
      { term: "Medium", def: "The general category of the source, for example organic, cpc, referral.", slide: 32 },
      { term: "utm_campaign", def: "The individual campaign name, slogan, promo code, etc. for a product.", slide: 33 },
      { term: "Views", def: "The number of visits during which a specified page(s) was viewed once.", slide: 34 },
      { term: "Bounce rate", def: "A percentage: the number of visits in which a person left a site from the initial entry page.", slide: 35 }
    ],
    hook: "A 30-minute coffee break can turn one visit into two. Here is how analytics counts."
  },
  notes: [
    {
      id: "c1t3-n1",
      heading: "Sessions and how they are calculated",
      slides: [27, 30, 31],
      fromSlides: [
        { text: "Sessions represent the number of individual sessions initiated by all the users to your site.", slide: 27 },
        { text: "If a user is inactive on your site for 30 minutes or more, any future activity is attributed to a new session.", slide: 30 },
        { text: "Users that leave your site and return within 30 minutes are counted as part of the original session.", slide: 30 },
        { text: "Any future sessions from the same user during the selected time period are counted as additional sessions, but not as additional users.", slide: 30 },
        { text: "Sessions are not restarted at midnight or when new campaign parameters are encountered.", slide: 31 }
      ],
      simple: "A session is one visit. If someone stops doing anything on your site for 30 minutes or more, their next action starts a new session. If they leave and come back within 30 minutes, it is still the same session. The same person can have many sessions but counts as one user in the date range.",
      deep: "Slide 27 defines sessions as the number of individual sessions initiated by all users to the site. Slide 30 explains the calculation: after 30 minutes or more of inactivity, any further activity is attributed to a new session, while users who leave and return within 30 minutes remain in the original session. The first session by a user in a date range counts as both an additional session and an additional user; later sessions from the same user in that period add sessions but not users. Slide 31 contrasts Universal Analytics, where every change of campaign source opened a new session, with GA4, where a session ends after more than 30 minutes of inactivity (depending on session timeout settings) and is not restarted at midnight or by new campaign parameters. A user who returns after a timeout starts a new session.",
      exam: [
        "Session = visit; 30+ minutes of inactivity -> next activity is a new session.",
        "Leave and return within 30 minutes = same session.",
        "First session in date range = +1 session and +1 user; later sessions = +1 session only.",
        "UA: campaign source change opens a new session.",
        "GA4: no restart at midnight or on new campaign parameters; timeout depends on session timeout settings."
      ],
      definitions: [
        { term: "Sessions", def: "The number of individual sessions initiated by all the users to your site.", slide: 27 },
        { term: "Session timeout (GA4)", def: "A session will end when there has been more than a 30-minute period of inactivity (depending on the session timeout settings).", slide: 31 }
      ],
      keyFacts: [
        "Visits and sessions are the same thing in Google Analytics (slide 41).",
        "In UA, every time a user's campaign source changes, Analytics opens a new session."
      ],
      examples: [
        "A user browses at 9:00, leaves at 9:10, and returns at 9:25: one session. Returning at 9:45 instead: two sessions."
      ],
      misconceptions: [
        "In GA4 a session restarts at midnight. Slide 31 says sessions are not restarted at midnight.",
        "Every session adds a new user. Repeat sessions from the same user in the period are not additional users."
      ]
    },
    {
      id: "c1t3-n2",
      heading: "Time comparison and trends",
      slides: [28, 29],
      fromSlides: [
        { text: "The element of time is a fundamental building block for comparisons and a great starting point for evaluating results.", slide: 28 },
        { text: "By comparing week-over-week or year-over-year performance, businesses can determine whether they are performing better or worse than the previous time period", slide: 28 },
        { text: "When you're evaluating your metrics, it's important to evaluate how they trend and not just focus on a specific point in time", slide: 29 }
      ],
      simple: "A number alone does not tell you much. Comparing it with last week or last year shows whether you are doing better or worse. Looking at the trend over time is better than looking at a single day.",
      deep: "Slide 28 positions time as a fundamental building block for comparison and a starting point for evaluating results. Week-over-week and year-over-year comparisons let a business judge whether performance is better or worse than the previous period. Slide 29 illustrates a year-to-date view (January 1st to August 16th) with an increase in traffic of 273,277, or +22%. It adds that metrics should be evaluated as trends rather than at a single point in time, because one point can be misleading. This idea returns later as percentage change and as GA4 anomaly detection, which automates comparison against a learned normal range.",
      exam: [
        "Time is a fundamental building block for comparisons.",
        "Compare week-over-week (WoW) or year-over-year (YoY) to judge better/worse.",
        "Evaluate trends, not just a specific point in time.",
        "Slide 29 example: year to date (Jan 1 – Aug 16) traffic up 273,277 (+22%)."
      ],
      definitions: [
        { term: "Year to date", def: "The period from January 1st to the current date (slide 29 example: January 1st – August 16th).", slide: 29 }
      ],
      keyFacts: [
        "Slide 29 example: increase in traffic 273,277 (+22%) year to date."
      ],
      examples: [
        "Sessions this week vs last week shows whether a newsletter sent on Monday changed traffic."
      ],
      misconceptions: [
        "One day's number is enough to judge performance. Slide 29 says evaluate how metrics trend, not a specific point in time."
      ]
    },
    {
      id: "c1t3-n3",
      heading: "Campaigns, source, medium and UTM parameters",
      slides: [32, 33],
      fromSlides: [
        { text: "Campaign Name: is one of the four main dimensions (along with source, medium and channel) for reporting and analyzing marketing campaigns", slide: 32 },
        { text: "Source: the origin of your traffic, such as a search engine (for example, google) or a domain (example.com).", slide: 32 },
        { text: "Medium: the general category of the source, for example, organic search (organic), cost-per-click paid search (cpc), web referral (referral).", slide: 32 },
        { text: "utm_source: Identify the advertiser, site, publication, etc. that is sending traffic to your property, for example: google, newsletter4, billboard.", slide: 33 },
        { text: "utm_content: Used to differentiate similar content, or links within the same ad.", slide: 33 }
      ],
      simple: "A campaign is a marketing push like a newsletter or an ad. To know which campaign brought a visitor, you add UTM tags to the link. Source says who sent the visitor (google, newsletter4), medium says what kind of channel (cpc, email), and campaign gives the campaign name.",
      deep: "Slide 32 defines a digital marketing campaign as an online marketing effort to drive engagement, conversions, traffic or revenue. Campaign name is one of four main dimensions for reporting campaigns, along with source, medium and channel. Source is the origin of traffic, such as google or example.com, while medium is the general category of the source, such as organic, cpc or referral. Slide 33 lists the five UTM parameters: utm_source identifies the advertiser, site or publication; utm_medium identifies the advertising or marketing medium; utm_campaign is the individual campaign name, slogan or promo code; utm_term identifies paid search keywords when manually tagging paid keyword campaigns; and utm_content differentiates similar content or links within the same ad, for example two call-to-action links in one email. Accurate UTM tagging later becomes the foundation that data-driven attribution depends on.",
      exam: [
        "Four main campaign dimensions: campaign name, source, medium, channel.",
        "Source = origin (google, example.com); medium = category (organic, cpc, referral).",
        "Five UTMs: utm_source, utm_medium, utm_campaign, utm_term, utm_content.",
        "utm_term = paid search keywords; utm_content = differentiate similar content/links in the same ad."
      ],
      definitions: [
        { term: "utm_source", def: "Identify the advertiser, site, publication, etc. that is sending traffic to your property, for example: google, newsletter4, billboard.", slide: 33 },
        { term: "utm_medium", def: "The advertising or marketing medium, for example: cpc, banner, email newsletter.", slide: 33 },
        { term: "utm_campaign", def: "The individual campaign name, slogan, promo code, etc. for a product.", slide: 33 },
        { term: "utm_term", def: "Identify paid search keywords; use it to specify the keyword when manually tagging paid keyword campaigns.", slide: 33 },
        { term: "utm_content", def: "Used to differentiate similar content, or links within the same ad.", slide: 33 }
      ],
      keyFacts: [
        "cpc = cost-per-click paid search.",
        "Two call-to-action links in the same email can get different utm_content values to see which is more effective."
      ],
      examples: [
        "A newsletter link tagged utm_source=newsletter4, utm_medium=email, utm_campaign=spring_sale, with utm_content=top_button and utm_content=bottom_button for two buttons."
      ],
      misconceptions: [
        "Source and medium are the same thing. Source is the origin (google); medium is the general category (cpc, organic).",
        "utm_content is for keywords. Keywords go in utm_term; utm_content differentiates similar links or content."
      ]
    },
    {
      id: "c1t3-n4",
      heading: "Views and bounce rate",
      slides: [34, 35, 36],
      fromSlides: [
        { text: "views: This is the number of visits during which a specified page(s) was viewed once.", slide: 34 },
        { text: "Bounce rate: is expressed as a percentage and is the number of visits in which a person left a site from the initial entry page.", slide: 35 },
        { text: "Consider segmenting the incoming traffic to see if there are any issues for specific segments of visitors", slide: 36 }
      ],
      simple: "Views count visits where a page was seen. Bounce rate is the percentage of visits where the person left from the first page they landed on. If the bounce rate is high, split the traffic into groups (source, country, browser, new vs returning) to find where the problem is.",
      deep: "Slide 34 defines views as the number of visits during which a specified page or pages was viewed once. Slide 35 defines bounce rate as a percentage representing visits in which a person left the site from the initial entry page, and raises questions an analyst should ask: what threshold counts as high, whether all pages are equal, what industry benchmarks for landing page bounce rates say, and what causes a high bounce rate. Slide 36 recommends segmenting incoming traffic to find issues affecting specific visitor segments, such as traffic sources, geographies, browser types and new versus returning visitors. Segmentation turns one average number into comparisons that can point to a cause.",
      exam: [
        "Views = visits during which a specified page was viewed once.",
        "Bounce rate = % of visits where the person left from the initial entry page.",
        "Questions: threshold? are all pages equal? industry benchmarks? reasons?",
        "Segment traffic by source, geography, browser type, new/returning to diagnose issues."
      ],
      definitions: [
        { term: "Views", def: "The number of visits during which a specified page(s) was viewed once.", slide: 34 },
        { term: "Bounce rate", def: "Expressed as a percentage; the number of visits in which a person left a site from the initial entry page.", slide: 35 }
      ],
      keyFacts: [
        "Bounce rate thresholds depend on the page; slide 35 asks 'Are all pages equal?'",
        "Segments listed on slide 36: traffic sources, geographies, browser types, new/returning visitors."
      ],
      examples: [
        "Overall bounce rate looks high, but segmenting by browser shows the problem is mostly one browser, hinting at a display bug."
      ],
      misconceptions: [
        "A single bounce-rate threshold applies to every page. Slide 35 questions whether all pages are equal and points to benchmarks."
      ]
    }
  ],
  steps: [
    {
      title: "The user's first activity starts a session",
      what: "When a user starts interacting with the site, a session begins.",
      why: "Sessions represent the individual sessions initiated by users (slide 27).",
      practical: "If this is the user's first session in the chosen date range, it counts as an additional session AND an additional user.",
      visual: "First activity -> session 1 (+1 session, +1 user)",
      check: { q: "A user's first session in the date range adds...", options: ["One session only", "One session and one user", "One user only", "Nothing until they convert"], answer: 1, explain: "Slide 30: the initial session by a user in a date range is an additional session and an additional user." }
    },
    {
      title: "Measure the gap of inactivity",
      what: "Look at how long the user is inactive between actions.",
      why: "The 30-minute rule decides whether later activity belongs to the same session.",
      practical: "Note the time of the last action and the time of the next action, then subtract.",
      visual: "gap = next action time - last action time",
      check: { q: "Last action at 10:05, next action at 10:50. What is the gap?", options: ["15 minutes", "45 minutes", "50 minutes", "5 minutes"], answer: 1, explain: "10:50 - 10:05 = 45 minutes." }
    },
    {
      title: "Apply the 30-minute rule",
      what: "If the gap is 30 minutes or more, the next activity starts a new session; under 30 minutes, it stays in the original session.",
      why: "Slide 30: inactivity of 30 minutes or more attributes future activity to a new session; returning within 30 minutes keeps the original session.",
      practical: "In GA4 the timeout depends on the session timeout settings (slide 31).",
      visual: "gap >= 30 min -> new session | gap < 30 min -> same session",
      check: { q: "A user leaves and returns after 20 minutes. What happens?", options: ["A new session starts", "It is still the original session", "A new user is counted", "The session is deleted"], answer: 1, explain: "Slide 30: users who return within 30 minutes are counted as part of the original session." }
    },
    {
      title: "Check GA4-specific rules",
      what: "In GA4, do not start a new session at midnight or when new campaign parameters appear.",
      why: "Slide 31: GA4 sessions are not restarted at midnight or when new campaign parameters are encountered; in UA a campaign source change opened a new session.",
      practical: "So a visitor who clicks a second ad mid-visit in GA4 stays in the same session.",
      visual: "UA: new campaign source -> new session | GA4: no restart",
      check: { q: "In GA4, a user active at 23:50 continues at 00:05 after clicking a link with new campaign parameters. How many sessions?", options: ["One", "Two, because of midnight", "Two, because of new campaign parameters", "Three"], answer: 0, explain: "The gap is 15 minutes, and GA4 does not restart sessions at midnight or on new campaign parameters." }
    },
    {
      title: "Count sessions and users for the period",
      what: "Add up all sessions; count each user only once in the date range.",
      why: "Later sessions from the same user are additional sessions but not additional users (slide 30).",
      practical: "That is why sessions are usually higher than users.",
      visual: "users = unique people | sessions = all visits",
      check: { q: "One user visits 3 times in a week, each visit more than 30 minutes apart. Sessions and users?", options: ["3 sessions, 3 users", "3 sessions, 1 user", "1 session, 1 user", "1 session, 3 users"], answer: 1, explain: "Each visit is a separate session, but the same user is counted once in the period." }
    }
  ],
  visual: {
    type: "flow",
    title: "How a session is counted",
    caption: "The 30-minute rule from slide 30 and the GA4 notes from slide 31.",
    slides: [30, 31],
    data: {
      nodes: [
        { label: "User starts activity", detail: "First session in the date range = +1 session and +1 user." },
        { label: "User becomes inactive", detail: "Measure the gap until the next activity." },
        { label: "Gap under 30 minutes?", detail: "Returning within 30 minutes keeps the original session." },
        { label: "Gap 30 minutes or more", detail: "Any future activity is attributed to a new session (+1 session, not +1 user)." },
        { label: "GA4 check", detail: "No restart at midnight or on new campaign parameters; timeout depends on session timeout settings." }
      ]
    }
  },
  examples: [
    {
      concept: "Counting sessions with the 30-minute rule",
      example: "Lina visits a store site at 18:00, browses until 18:10, returns at 18:25, browses until 18:30, then returns at 19:15.",
      walkthrough: [
        "18:00 is her first activity in the date range: session 1, and she counts as one user.",
        "Gap 18:10 to 18:25 is 15 minutes, under 30, so she stays in session 1.",
        "Gap 18:30 to 19:15 is 45 minutes, 30 or more, so 19:15 starts session 2.",
        "Total: 2 sessions and 1 user."
      ],
      application: "This is why sessions and users differ in reports, and why session counts depend on the timeout rule.",
      check: { q: "How many sessions and users did Lina create?", options: ["1 session, 1 user", "2 sessions, 1 user", "3 sessions, 1 user", "2 sessions, 2 users"], answer: 1, explain: "One gap is under 30 minutes (same session), one is 45 minutes (new session); she is still one user." }
    },
    {
      concept: "Tagging an email campaign with UTM parameters",
      example: "A shop sends its fourth newsletter with two buttons (top and bottom) promoting a spring sale.",
      walkthrough: [
        "utm_source identifies who sends the traffic: newsletter4 (slide 33 example).",
        "utm_medium is the marketing medium: email newsletter.",
        "utm_campaign is the individual campaign name: spring sale.",
        "utm_content gets different values for the top and bottom buttons to see which link is more effective."
      ],
      application: "With these tags, reports can show campaign, source and medium, and later attribution can see the email touchpoint.",
      check: { q: "Which parameter tells the two buttons apart?", options: ["utm_source", "utm_term", "utm_content", "utm_medium"], answer: 2, explain: "Slide 33: utm_content differentiates similar content or links within the same ad or email." }
    }
  ],
  flashcards: [
    { id: "c1t3-f1", front: "What do sessions represent?", back: "The number of individual sessions initiated by all the users to your site.", slide: 27 },
    { id: "c1t3-f2", front: "The 30-minute rule?", back: "Inactive 30 minutes or more -> future activity is a new session. Return within 30 minutes -> same session.", slide: 30 },
    { id: "c1t3-f3", front: "Does a user's second session in the period add a user?", back: "No. It adds a session but not an additional user.", slide: 30 },
    { id: "c1t3-f4", front: "GA4: do sessions restart at midnight or on new campaign parameters?", back: "No, neither.", slide: 31 },
    { id: "c1t3-f5", front: "Source vs medium?", back: "Source: origin of traffic (google, example.com). Medium: general category (organic, cpc, referral).", slide: 32 },
    { id: "c1t3-f6", front: "List the five UTM parameters.", back: "utm_source, utm_medium, utm_campaign, utm_term, utm_content.", slide: 33 },
    { id: "c1t3-f7", front: "What is utm_term for?", back: "Identifying paid search keywords.", slide: 33 },
    { id: "c1t3-f8", front: "Define bounce rate.", back: "A percentage: visits in which a person left a site from the initial entry page.", slide: 35 },
    { id: "c1t3-f9", front: "Which segments does slide 36 suggest for diagnosing bounce rate?", back: "Traffic sources, geographies, browser types, new/returning visitors.", slide: 36 }
  ],
  quiz: [
    { id: "c1t3-q1", type: "mcq", difficulty: "easy", prompt: "After how much inactivity does future activity count as a new session?", options: ["5 minutes", "15 minutes", "30 minutes or more", "24 hours"], answer: 2, explain: "Slide 30: inactive for 30 minutes or more -> any future activity is a new session.", wrongWhy: { "0": "5 minutes is too short; the rule is 30 minutes.", "1": "15 minutes is under the 30-minute threshold.", "3": "The rule is about 30 minutes, not a full day." }, slide: 30, section: "c1t3-n1" },
    { id: "c1t3-q2", type: "tf", difficulty: "easy", prompt: "In GA4, sessions are restarted at midnight.", answer: false, explain: "Slide 31: GA4 sessions are not restarted at midnight or when new campaign parameters are encountered.", slide: 31, section: "c1t3-n1" },
    { id: "c1t3-q3", type: "fill", difficulty: "easy", prompt: "The UTM parameter used to identify paid search keywords is utm_______.", answer: ["term", "utm_term"], explain: "Slide 33: utm_term identifies paid search keywords.", slide: 33, section: "c1t3-n3" },
    { id: "c1t3-q4", type: "match", difficulty: "medium", prompt: "Match each UTM parameter to what it identifies.", options: [["utm_source", "The advertiser, site or publication sending traffic"], ["utm_medium", "The advertising or marketing medium, e.g. cpc, banner"], ["utm_campaign", "The individual campaign name, slogan or promo code"], ["utm_content", "Differentiates similar content or links within the same ad"]], answer: null, explain: "All definitions come from slide 33.", slide: 33, section: "c1t3-n3" },
    { id: "c1t3-q5", type: "mcq", difficulty: "medium", scenario: "In a report, a visit is shown with source 'google' and medium 'cpc'.", prompt: "What does this tell you?", options: ["The visitor typed the URL directly", "The visitor came from Google via cost-per-click paid search", "The visitor came from an unpaid Google result", "The visitor came from a newsletter"], answer: 1, explain: "Slide 32: source is the origin (google); medium cpc means cost-per-click paid search.", wrongWhy: { "0": "Typing the URL is direct traffic, not google/cpc.", "2": "Unpaid search would have medium organic, not cpc.", "3": "A newsletter would have a source like newsletter4 and medium email." }, slide: 32, section: "c1t3-n3" },
    { id: "c1t3-q6", type: "multi", difficulty: "medium", prompt: "Which are the four main dimensions for reporting and analyzing marketing campaigns? (Select all that apply.)", options: ["Campaign name", "Source", "Medium", "Channel", "Bounce rate"], answer: [0, 1, 2, 3], explain: "Slide 32: campaign name is one of four main dimensions along with source, medium and channel. Bounce rate is a metric.", slide: 32, section: "c1t3-n3" },
    { id: "c1t3-q7", type: "tf", difficulty: "medium", prompt: "When evaluating metrics, it is important to evaluate how they trend and not just focus on a specific point in time.", answer: true, explain: "This is stated on slide 29.", slide: 29, section: "c1t3-n2" },
    { id: "c1t3-q8", type: "mcq", difficulty: "hard", scenario: "A site's overall bounce rate jumped this month. The manager wants to redesign the whole home page immediately.", prompt: "What does slide 36 suggest doing first?", options: ["Redesign every page", "Segment the incoming traffic (sources, geographies, browser types, new/returning) to find which segment has the issue", "Stop all campaigns", "Remove the tracking code"], answer: 1, explain: "Slide 36: consider segmenting incoming traffic to see if there are issues for specific segments of visitors.", wrongWhy: { "0": "Redesigning without diagnosis ignores the slide's advice to segment first.", "2": "Stopping campaigns is not suggested and loses data.", "3": "Removing tracking would make the problem impossible to measure." }, slide: 36, section: "c1t3-n4" },
    { id: "c1t3-q9", type: "fill", difficulty: "hard", prompt: "Problem: In GA4 a user is active until 14:00, returns at 14:20, is active until 14:25, then returns at 15:05. Using the 30-minute rule, how many sessions? (number)", answer: ["2", "two"], explain: "14:00 to 14:20 is 20 minutes (same session); 14:25 to 15:05 is 40 minutes (new session). Total 2 sessions.", slide: 30, section: "c1t3-n1" },
    { id: "c1t3-q10", type: "mcq", difficulty: "hard", scenario: "In Universal Analytics, a user browsing the site clicks a second campaign link from a different source during the same visit, 5 minutes after the first.", prompt: "How would UA and GA4 treat this differently?", options: ["Both start a new session", "UA opens a new session because the campaign source changed; GA4 does not restart the session", "GA4 opens a new session; UA does not", "Neither counts the visit"], answer: 1, explain: "Slide 31: in UA every campaign source change opens a new session; in GA4 sessions are not restarted when new campaign parameters are encountered.", wrongWhy: { "0": "GA4 does not restart sessions on new campaign parameters.", "2": "It is the reverse: UA restarts, GA4 does not.", "3": "Both count the visit; they differ only in session splitting." }, slide: 31, section: "c1t3-n1" },
    { id: "c1t3-q11", type: "multi", difficulty: "hard", prompt: "A user has 4 sessions during the selected week. Which statements are correct? (Select all that apply.)", options: ["The first session adds one session and one user", "The other three add sessions but not users", "The user is counted 4 times as a user", "Total for this person: 4 sessions, 1 user"], answer: [0, 1, 3], explain: "Slide 30: the initial session is an additional session and user; future sessions are additional sessions but not additional users.", slide: 30, section: "c1t3-n1" },
    { id: "c1t3-q12", type: "fill", difficulty: "medium", prompt: "According to slide 29, year-to-date traffic increased by what percent? (number)", answer: ["22", "22%", "+22", "+22%"], explain: "Slide 29: year to date (January 1st – August 16th) increase in traffic 273,277 (+22%).", slide: 29, section: "c1t3-n2" }
  ]
},

/* ===================================================================== TOPIC 4 */
{
  id: "c1t4",
  title: "Business Models, KPIs, Conversions & Percentage Change",
  slides: [37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
  minutes: 25,
  overview: {
    about: "How to choose KPIs by starting from the business model (e-commerce or lead generation), what conversions and goals are, how to calculate goal and e-commerce conversion rates, and why percentage change and comparison give data context.",
    why: "These are the core calculations of the chapter. Knowing which metric fits which business, and how to compute and compare rates, turns raw counts into decisions.",
    objectives: [
      "List the basic questions for choosing KPIs and align metrics with the business model.",
      "Define and compute the key e-commerce metrics (revenue, orders, conversion rate, AOV, revenue per visit).",
      "Define the key lead generation metrics (leads, inquiries, inquiry conversion rate, cost per lead, form completion rate, micro conversions).",
      "Define a conversion and a goal, and calculate goal and e-commerce conversion rates with the slide numbers.",
      "Calculate percentage change and explain why comparison adds context to data."
    ],
    vocabulary: [
      { term: "Conversion (key event)", def: "Anytime a customer or site visitor completes a desired action on your web property.", slide: 40 },
      { term: "Goal", def: "In Google Analytics, an action you want visitors to complete.", slide: 40 },
      { term: "Conversion rate", def: "Number of conversions divided by total ad interactions that can be tracked to a conversion in the same time period.", slide: 41 },
      { term: "Average Order Value", def: "Revenue / Orders: how much customers spend on each transaction on average.", slide: 38 },
      { term: "Cost per Lead", def: "Acquisition Cost / Leads: the marketing cost of acquiring each lead or inquiry.", slide: 39 },
      { term: "Form Completion Rate", def: "Inquiry Completions / Inquiry Starts: how often a form is completed after it is started.", slide: 39 },
      { term: "Percentage change", def: "((new value – old value) / old value) * 100: the percentage of rise or fall relative to the old value.", slide: 46 }
    ],
    hook: "Visits up 75%, conversions up 110%, but did the site really get better? Let's do the math."
  },
  notes: [
    {
      id: "c1t4-n1",
      heading: "Start from the business model",
      slides: [37],
      fromSlides: [
        { text: "What's the main purpose of your website, app, or campaign?", slide: 37 },
        { text: "What do you want visitors or users to accomplish?", slide: 37 },
        { text: "How do you define success?", slide: 37 },
        { text: "Organizations' digital metrics should be aligned with the online business models", slide: 37 }
      ],
      simple: "Before choosing KPIs, ask basic questions: what is the site for, what should visitors do, and what does success look like? Then pick metrics that match the business model, for example selling online or collecting leads.",
      deep: "Slide 37 gives six guiding questions for choosing KPIs: the main purpose of the website, app or campaign; how it contributes to overall organizational success; which business challenges it is meant to resolve; what visitors or users should accomplish; the expected outcome; and how success is defined. The conclusion is that digital metrics should be aligned with the online business model. This continues the earlier point that the challenge is choosing what should be measured: the business model supplies the criteria for that choice.",
      exam: [
        "Six questions: purpose, contribution to organization, business challenges, what users should accomplish, expected outcome, definition of success.",
        "Digital metrics should be aligned with the online business model.",
        "Two models covered: e-commerce and lead generation."
      ],
      definitions: [
        { term: "Business model alignment", def: "Organizations' digital metrics should be aligned with the online business models.", slide: 37 }
      ],
      keyFacts: [
        "KPI choice begins with basic questions about purpose, outcomes and success."
      ],
      examples: [
        "A software company's site exists to get demo requests, so it should measure leads, not just page views."
      ],
      misconceptions: [
        "All websites should use the same KPIs. Slide 37 says metrics should align with each business model."
      ]
    },
    {
      id: "c1t4-n2",
      heading: "E-commerce and lead generation metrics",
      slides: [38, 39],
      fromSlides: [
        { text: "Main objective: Grow online sales of products or services", slide: 38 },
        { text: "Average Order Value (Revenue/Orders): Shows on average how much customers are spending on each transaction.", slide: 38 },
        { text: "Main objective: Increase the number of qualified leads that result in future sales of products or services.", slide: 39 },
        { text: "Cost per Lead (Acquisition Cost/Leads). Indicates the marketing costs of acquiring each lead or inquiry.", slide: 39 },
        { text: "Form Completion Rate (Inquiry Completions/Inquiry Starts). Shows how often an online form is completed after it's started.", slide: 39 }
      ],
      simple: "E-commerce sites want more online sales, so they watch revenue, orders, conversion rate, average order value and revenue per visit. Lead generation sites want more qualified leads, so they watch leads, inquiries, inquiry conversion rate, cost per lead, form completion rate and micro conversions.",
      deep: "For e-commerce (retail, travel, high tech, consumer products, subscription media), the main objective is to grow online sales. Revenue is the most important focus; orders show transactions processed; conversion rate (orders/visitors or orders/visits) shows how effectively traffic becomes orders; average order value (revenue/orders) shows spending per transaction; and revenue per visit (revenue/visits) indicates each visit's average contribution and helps compare traffic source quality. For lead generation (B2B manufacturing and services, high tech, automotive, financial services, health care, education, non-profit), the objective is more qualified leads that become future sales. Leads are prospects more likely to become customers than general inquiries, with qualification being subjective to each business; inquiries are raw business inquiries; inquiry conversion rate is inquiry completions/visits; cost per lead is acquisition cost/leads; form completion rate is inquiry completions/inquiry starts and can expose form inefficiencies; and micro conversions such as downloads, trials and demo views mark steps toward becoming a qualified lead.",
      exam: [
        "E-commerce: Revenue (most important), Orders, Conversion Rate (Orders/Visits), AOV (Revenue/Orders), Revenue per Visit (Revenue/Visits).",
        "Lead gen: Leads, Inquiries, Inquiry Conversion Rate (Inquiry Completions/Visits), Cost per Lead (Acquisition Cost/Leads), Form Completion Rate (Completions/Starts), Micro Conversions.",
        "Revenue per visit helps evaluate the quality of traffic sources.",
        "What makes a lead qualified is subjective and unique to each business."
      ],
      definitions: [
        { term: "Revenue per Visit", def: "Revenue/Visits: the average contribution of each visit to revenue goals; useful for evaluating traffic source quality.", slide: 38 },
        { term: "Inquiry Conversion Rate", def: "Inquiry Completions/Visits: what portion of visits end up submitting an inquiry.", slide: 39 },
        { term: "Leads", def: "Potential prospects that are more likely to become customers than just general business inquiries.", slide: 39 },
        { term: "Micro Conversions", def: "Downloads, trials, demo views: key steps or milestones in the overall conversion process of becoming a qualified lead.", slide: 39 }
      ],
      keyFacts: [
        "Revenue represents the most important focus for retailers.",
        "Form completion rate can highlight inefficiencies related to online forms."
      ],
      examples: [
        "Revenue 5,000 from 100 orders gives an average order value of 50 (Revenue/Orders)."
      ],
      misconceptions: [
        "Leads and inquiries are the same. Inquiries are raw (qualified or unqualified); leads are more likely to become customers.",
        "Form completion rate uses visits as the denominator. It is completions divided by inquiry starts."
      ]
    },
    {
      id: "c1t4-n3",
      heading: "Conversions, goals and conversion rate",
      slides: [40, 41, 42, 43],
      fromSlides: [
        { text: "Conversions (key event): A conversion is anytime a customer or site visitors complete a desired action on your web property.", slide: 40 },
        { text: "The action must be fully completed to be considered a conversion.", slide: 40 },
        { text: "Goal conversion rate = (goal completions / sessions)*100 = (60,652 / 97,838)*100 = 61.99%", slide: 41 },
        { text: "Note: Visits and sessions are the same thing in Google Analytics.", slide: 41 },
        { text: "Ecommerce conversion rate = (transactions/sessions) * 100 = (629/339,904) * 100 = 0.19%", slide: 43 }
      ],
      simple: "A conversion is when a visitor fully completes something you want, like a purchase or a sign-up. Conversion rate is conversions divided by sessions, times 100. In the slide example, 60,652 goal completions from 97,838 sessions is 61.99%.",
      deep: "Slide 40 defines a conversion, also called a key event, as any time a customer or visitor completes a desired action on the web property; conversions vary by business, such as a sale, newsletter sign-up, app download or event registration, and the action must be fully completed to count. A goal in Google Analytics is an action you want visitors to complete, such as a completed sale or sign-up, a specific page destination or an amount of time on site. Conversion rate in general is conversions divided by the total ad interactions that can be tracked to a conversion in the same period. In Google Analytics the goal conversion rate is (goal completions / sessions) * 100, which in the slide example is (60,652 / 97,838) * 100 = 61.99%, noting that visits and sessions are the same. An e-commerce conversion is a successful online purchase, and the e-commerce conversion rate is (transactions / sessions) * 100, giving (629 / 339,904) * 100 = 0.19% in the example.",
      exam: [
        "Conversion (key event) = completed desired action; must be fully completed.",
        "Goal conversion rate = (goal completions / sessions) * 100; example 60,652 / 97,838 = 61.99%.",
        "E-commerce conversion rate = (transactions / sessions) * 100; example 629 / 339,904 = 0.19%.",
        "Visits and sessions are the same thing in Google Analytics.",
        "Goal examples: completed sale or sign-up, specific page destination, time spent on site."
      ],
      definitions: [
        { term: "Conversion (key event)", def: "Anytime a customer or site visitors complete a desired action on your web property.", slide: 40 },
        { term: "Goal", def: "In Google Analytics, an action you want visitors to complete: a completed sale or sign-up, a specific page destination, an amount of time spent on the site, etc.", slide: 40 },
        { term: "Ecommerce conversion", def: "When a customer makes a successful purchase while online.", slide: 42 },
        { term: "Ecommerce conversion rate", def: "(transactions/sessions) * 100.", slide: 43 }
      ],
      keyFacts: [
        "Examples of conversions: a sale, newsletter sign-up, app download, event registration.",
        "Slide 41 goal example: 61.99%; slide 43 e-commerce example: 0.19%."
      ],
      examples: [
        "A visitor who adds a product to the cart but does not pay has not completed an e-commerce conversion."
      ],
      misconceptions: [
        "Starting a sign-up form counts as a conversion. The action must be fully completed.",
        "Conversion rate is divided by users. In Google Analytics the formula uses sessions (visits)."
      ]
    },
    {
      id: "c1t4-n4",
      heading: "Context, comparison and percentage change",
      slides: [44, 45, 46, 47],
      fromSlides: [
        { text: "Ok good. But what insight you can get from it and what action can you take? The short and sweet answer is 'nothing much'.", slide: 44 },
        { text: "Without context, data is meaningless. Comparison adds context to data and makes it more meaningful.", slide: 45 },
        { text: "Percentage change= ((new value – old value) / old value) * 100", slide: 46 },
        { text: "Visits percentage change = ((350 - 200) / 200) * 100 = 75%", slide: 46 },
        { text: "Conversions percentage change = ((42 - 20) / 20) * 100 = 110%", slide: 46 }
      ],
      simple: "A single conversion rate tells you little on its own. Compare it: by channel (organic vs email) and over time (last month vs this month). Percentage change shows how much a number rose or fell compared with its old value: new minus old, divided by old, times 100.",
      deep: "Slide 44 challenges the reader: after calculating a site-wide conversion rate, what insight or action follows? Mostly nothing. Better questions are segmented and time-bound, such as the conversion rate of the 'registration' goal for organic traffic, or for email traffic, and whether it improved in the last month. Slide 45 shows why focus matters: transaction volume increased by more than 7000% in five months, yet the e-commerce conversion rate stayed flat at 0.5%, so there was virtually no improvement in that rate. Comparison adds context and makes data meaningful. Slide 46 defines percentage change as ((new value – old value) / old value) * 100, used when there is an old and a new value. With July at 200 visits, 20 conversions and 10% conversion rate and August at 350 visits, 42 conversions and 12%, visits changed by 75% and conversions by 110%; applying the same formula to the conversion rate gives ((12 - 10) / 10) * 100 = 20%.",
      exam: [
        "A site-wide metric alone gives little insight; ask segmented, time-bound questions.",
        "'Without context, data is meaningless. Comparison adds context.'",
        "Percentage change = ((new – old) / old) * 100.",
        "Slide 46: visits 200 -> 350 = 75%; conversions 20 -> 42 = 110%; conversion rate 10% -> 12% = 20%.",
        "Slide 45: transactions up more than 7000% but e-commerce conversion rate flat at 0.5%."
      ],
      definitions: [
        { term: "Percentage change", def: "The percentage of rise or fall in relation to the old value; used when there is an old value and a new value.", slide: 46 }
      ],
      keyFacts: [
        "July: 200 visits, 20 conversions, 10% conversion rate. August: 350 visits, 42 conversions, 12% conversion rate.",
        "Percentage change is always calculated relative to the OLD value."
      ],
      examples: [
        "Asking 'What is the conversion rate of my registration goal for email traffic, and did it improve in the last month?' is a useful, actionable question."
      ],
      misconceptions: [
        "If conversions grow a lot, the conversion rate must also have grown a lot. Slide 45 shows volume rising over 7000% while the rate stayed at 0.5%.",
        "Percentage change of a rate from 10% to 12% is 2%. That is the difference in points; the percentage change is 20%."
      ]
    }
  ],
  steps: [
    {
      title: "Find the completions and the sessions",
      what: "Take the number of goal completions and the number of sessions for the same period.",
      why: "Goal conversion rate compares completed actions with all visits (slide 41).",
      practical: "Slide 41: 60,652 goal completions and 97,838 sessions. Remember visits = sessions.",
      visual: "completions = 60,652 | sessions = 97,838",
      check: { q: "In Google Analytics, which number goes in the denominator of goal conversion rate?", options: ["Users", "Sessions (visits)", "Page views", "Revenue"], answer: 1, explain: "Slide 41: goal conversion rate = (goal completions / sessions) * 100." }
    },
    {
      title: "Divide completions by sessions",
      what: "Divide 60,652 by 97,838.",
      why: "This gives the share of sessions that completed the goal, as a decimal.",
      practical: "60,652 / 97,838 = about 0.6199.",
      visual: "60,652 / 97,838 = 0.6199",
      check: { q: "60,652 / 97,838 is approximately...", options: ["0.06", "0.62", "1.61", "6.2"], answer: 1, explain: "60,652 / 97,838 is about 0.62 (0.6199)." }
    },
    {
      title: "Multiply by 100 to get a percentage",
      what: "Multiply the decimal by 100.",
      why: "Conversion rates are expressed as percentages.",
      practical: "0.6199 * 100 = 61.99%. The same method gives the e-commerce rate on slide 43: (629 / 339,904) * 100 = 0.19%.",
      visual: "0.6199 * 100 = 61.99%",
      check: { q: "What is the e-commerce conversion rate for 629 transactions and 339,904 sessions?", options: ["1.9%", "0.19%", "19%", "54%"], answer: 1, explain: "Slide 43: (629 / 339,904) * 100 = 0.19%." }
    },
    {
      title: "Percentage change: identify old and new values",
      what: "Decide which value is old (earlier period) and which is new (later period).",
      why: "Percentage change measures rise or fall in relation to the old value (slide 46).",
      practical: "Slide 46 visits: July (old) = 200, August (new) = 350.",
      visual: "old = 200 (July) | new = 350 (Aug)",
      check: { q: "For visits on slide 46, which is the old value?", options: ["350", "200", "42", "20"], answer: 1, explain: "July is the earlier month, so 200 visits is the old value." }
    },
    {
      title: "Subtract, divide by the old value, multiply by 100",
      what: "Compute (new – old), divide by old, then multiply by 100.",
      why: "This is the percentage change formula on slide 46.",
      practical: "Visits: (350 – 200) / 200 = 0.75 -> 75%. Conversions: (42 – 20) / 20 = 1.1 -> 110%.",
      visual: "((350 - 200) / 200) * 100 = 75%",
      check: { q: "Conversions went from 20 to 42. Percentage change?", options: ["22%", "52%", "110%", "210%"], answer: 2, explain: "((42 - 20) / 20) * 100 = 110% (slide 46)." }
    },
    {
      title: "Apply it to the conversion rate",
      what: "Use the same formula on the conversion rates: July 10% (old), August 12% (new).",
      why: "Slide 46 asks for the conversion rate percentage change; this shows whether efficiency, not just volume, improved.",
      practical: "((12 – 10) / 10) * 100 = 20%. Note: the rate rose by 2 percentage points, which is a 20% change.",
      visual: "((12 - 10) / 10) * 100 = 20%",
      check: { q: "Conversion rate went from 10% to 12%. Percentage change?", options: ["2%", "12%", "20%", "120%"], answer: 2, explain: "((12 - 10) / 10) * 100 = 20%. 2 is the difference in percentage points, not the percentage change." }
    }
  ],
  visual: {
    type: "calculator",
    title: "Percentage change calculator",
    caption: "Defaults use the slide 46 visits example: July 200, August 350. Try conversions (20 -> 42) or conversion rate (10 -> 12).",
    slides: [46],
    data: {
      kind: "percentChange",
      labels: { a: "Old value (July)", b: "New value (August)" },
      defaults: { a: 200, b: 350 },
      formula: "((new value - old value) / old value) * 100",
      detail: "Slide 46: visits 200 -> 350 = 75%; conversions 20 -> 42 = 110%; conversion rate 10% -> 12% = 20%."
    }
  },
  examples: [
    {
      concept: "Percentage change with the slide 46 table",
      example: "July: 200 visits, 20 conversions, 10% conversion rate. August: 350 visits, 42 conversions, 12% conversion rate.",
      walkthrough: [
        "Visits: ((350 - 200) / 200) * 100 = 75%.",
        "Conversions: ((42 - 20) / 20) * 100 = 110%.",
        "Check the August rate: 42 / 350 * 100 = 12%.",
        "Conversion rate: ((12 - 10) / 10) * 100 = 20%."
      ],
      application: "Reporting all three changes shows growth in volume (visits, conversions) and in efficiency (conversion rate).",
      check: { q: "Which change shows that a higher share of visits converted?", options: ["Visits +75%", "Conversions +110%", "Conversion rate +20%", "None of them"], answer: 2, explain: "Conversion rate measures the share of visits that convert; it rose 20% (from 10% to 12%)." }
    },
    {
      concept: "Volume vs rate (slide 45)",
      example: "A shop's transaction volume increased by more than 7000% over five months, but the e-commerce conversion rate stayed flat at 0.5%.",
      walkthrough: [
        "Volume metric: transactions grew enormously.",
        "Rate metric: transactions / sessions stayed 0.5%, so sessions grew at about the same pace.",
        "If the focus is the e-commerce conversion rate, there is virtually no improvement.",
        "Conclusion: comparison adds context; the right metric depends on the question."
      ],
      application: "Always state which metric reflects the objective before claiming improvement.",
      check: { q: "If the focus is the e-commerce conversion rate, what is the conclusion?", options: ["Huge improvement", "Virtually no improvement", "The site lost money", "Tracking is broken"], answer: 1, explain: "Slide 45: there is virtually no improvement (flat 0.5% conversion rate)." }
    },
    {
      concept: "Lead generation metrics",
      example: "A university site has 400 form starts, 100 form completions and 5,000 visits in a month.",
      walkthrough: [
        "Form completion rate = inquiry completions / inquiry starts = 100 / 400 = 25% (formula from slide 39).",
        "Inquiry conversion rate = inquiry completions / visits = 100 / 5,000 = 2%.",
        "A low form completion rate can highlight inefficiencies related to the online form.",
        "Decide which KPI matches the objective of more qualified leads."
      ],
      application: "The two rates answer different questions: is the form working, and how many visits end in an inquiry.",
      check: { q: "What is the form completion rate?", options: ["2%", "8%", "25%", "400%"], answer: 2, explain: "Inquiry completions / inquiry starts = 100 / 400 = 25%." }
    }
  ],
  flashcards: [
    { id: "c1t4-f1", front: "What is a conversion (key event)?", back: "Anytime a customer or site visitor completes a desired action on your web property; it must be fully completed.", slide: 40 },
    { id: "c1t4-f2", front: "Goal conversion rate formula (Google Analytics)?", back: "(goal completions / sessions) * 100. Example: (60,652 / 97,838) * 100 = 61.99%.", slide: 41 },
    { id: "c1t4-f3", front: "E-commerce conversion rate formula and slide example?", back: "(transactions / sessions) * 100 = (629 / 339,904) * 100 = 0.19%.", slide: 43 },
    { id: "c1t4-f4", front: "Average Order Value formula?", back: "Revenue / Orders.", slide: 38 },
    { id: "c1t4-f5", front: "Cost per Lead formula?", back: "Acquisition Cost / Leads.", slide: 39 },
    { id: "c1t4-f6", front: "Form Completion Rate formula?", back: "Inquiry Completions / Inquiry Starts.", slide: 39 },
    { id: "c1t4-f7", front: "Percentage change formula?", back: "((new value – old value) / old value) * 100.", slide: 46 },
    { id: "c1t4-f8", front: "Visits went from 200 to 350. Percentage change?", back: "75%.", slide: 46 },
    { id: "c1t4-f9", front: "Are visits and sessions the same in Google Analytics?", back: "Yes.", slide: 41 },
    { id: "c1t4-f10", front: "Complete: 'Without context, data is ...'", back: "...meaningless. Comparison adds context to data and makes it more meaningful.", slide: 45 }
  ],
  quiz: [
    { id: "c1t4-q1", type: "mcq", difficulty: "easy", prompt: "What is the main objective of the e-commerce business model?", options: ["Increase qualified leads", "Grow online sales of products or services", "Reduce bounce rate", "Collect email addresses"], answer: 1, explain: "Slide 38: the e-commerce main objective is to grow online sales of products or services.", wrongWhy: { "0": "Increasing qualified leads is the lead generation objective (slide 39).", "2": "Bounce rate is a metric, not a business model objective.", "3": "Email collection is a possible goal, not the e-commerce main objective." }, slide: 38, section: "c1t4-n2" },
    { id: "c1t4-q2", type: "tf", difficulty: "easy", prompt: "To be considered a conversion, the action must be fully completed.", answer: true, explain: "Slide 40: the action must be fully completed to be considered a conversion.", slide: 40, section: "c1t4-n3" },
    { id: "c1t4-q3", type: "fill", difficulty: "easy", prompt: "Average Order Value = Revenue / ______.", answer: ["orders", "order"], explain: "Slide 38: Average Order Value (Revenue/Orders).", slide: 38, section: "c1t4-n2" },
    { id: "c1t4-q4", type: "match", difficulty: "medium", prompt: "Match each metric to its formula.", options: [["Revenue per Visit", "Revenue / Visits"], ["Cost per Lead", "Acquisition Cost / Leads"], ["Form Completion Rate", "Inquiry Completions / Inquiry Starts"], ["Inquiry Conversion Rate", "Inquiry Completions / Visits"]], answer: null, explain: "Formulas from slides 38 and 39.", slide: 39, section: "c1t4-n2" },
    { id: "c1t4-q5", type: "fill", difficulty: "medium", prompt: "Problem: Using slide 46, visits rose from 200 in July to 350 in August. What is the percentage change? (number)", answer: ["75", "75%", "75 %", "+75%"], explain: "((350 - 200) / 200) * 100 = 75%.", slide: 46, section: "c1t4-n4" },
    { id: "c1t4-q6", type: "mcq", difficulty: "medium", scenario: "A B2B software company's website exists to get potential customers to request a demo. Its manager asks which group of metrics to focus on.", prompt: "Which business model and metrics fit best?", options: ["E-commerce: revenue, orders, average order value", "Lead generation: leads, inquiries, cost per lead, form completion rate", "Only page views", "Only bounce rate"], answer: 1, explain: "Slide 39: lead generation aims to increase qualified leads and lists B2B as a relevant industry, with these metrics.", wrongWhy: { "0": "E-commerce metrics suit sites selling online, not demo requests.", "2": "Page views alone do not align with the business model (slide 37).", "3": "Bounce rate alone does not measure leads." }, slide: 39, section: "c1t4-n2" },
    { id: "c1t4-q7", type: "multi", difficulty: "medium", prompt: "Which are listed on slide 40 as examples of conversions? (Select all that apply.)", options: ["A sale", "Newsletter sign-up", "App download", "Event registration", "Seeing the home page"], answer: [0, 1, 2, 3], explain: "Slide 40 lists a sale, newsletter sign-up, app download and event registration.", slide: 40, section: "c1t4-n3" },
    { id: "c1t4-q8", type: "fill", difficulty: "hard", prompt: "Problem: Using slide 46, the conversion rate rose from 10% in July to 12% in August. What is the percentage change of the conversion rate? (number)", answer: ["20", "20%", "20 %", "+20%"], explain: "((12 - 10) / 10) * 100 = 20%. The 2-point difference is not the percentage change.", slide: 46, section: "c1t4-n4" },
    { id: "c1t4-q9", type: "mcq", difficulty: "hard", scenario: "A shop's transactions grew more than 7000% over five months. The CEO says the site has become far better at converting visitors. The e-commerce conversion rate stayed at 0.5% the whole time.", prompt: "What is the best response based on slide 45?", options: ["Agree: more transactions means better conversion", "Disagree: the conversion rate is flat, so there is virtually no improvement in converting visitors", "The data must be wrong", "Conversion rate cannot be measured for e-commerce"], answer: 1, explain: "Slide 45: transaction volume rose over 7000%, but with a flat 0.5% conversion rate there is virtually no improvement.", wrongWhy: { "0": "Volume can grow simply because traffic grew; the rate did not change.", "2": "Nothing suggests broken data; volume and rate measure different things.", "3": "Slides 42–43 show how to measure e-commerce conversion rate." }, slide: 45, section: "c1t4-n4" },
    { id: "c1t4-q10", type: "mcq", difficulty: "hard", prompt: "Using slide 43's numbers, (629 / 339,904) * 100 gives which e-commerce conversion rate?", options: ["0.019%", "0.19%", "1.9%", "6.29%"], answer: 1, explain: "Slide 43: (629/339,904) * 100 = 0.19%.", wrongWhy: { "0": "This is ten times too small; 629/339,904 is about 0.0019, times 100 = 0.19.", "2": "This is ten times too large.", "3": "This just moves the decimal of 629 and ignores the sessions." }, slide: 43, section: "c1t4-n3" },
    { id: "c1t4-q11", type: "tf", difficulty: "medium", prompt: "According to slide 41, visits and sessions are the same thing in Google Analytics.", answer: true, explain: "Slide 41 note: visits and sessions are the same thing in Google Analytics.", slide: 41, section: "c1t4-n3" },
    { id: "c1t4-q12", type: "multi", difficulty: "hard", prompt: "Which questions are on slide 37 for choosing KPIs? (Select all that apply.)", options: ["What's the main purpose of your website, app, or campaign?", "What do you want visitors or users to accomplish?", "How do you define success?", "Which web browser is most popular?"], answer: [0, 1, 2], explain: "Slide 37 lists purpose, contribution, challenges, what users should accomplish, expected outcome and definition of success.", slide: 37, section: "c1t4-n1" }
  ]
},

/* ===================================================================== TOPIC 5 */
{
  id: "c1t5",
  title: "Events, Landing Pages & AI in GA4",
  slides: [48, 49, 50, 51, 52, 53, 54, 55],
  minutes: 20,
  overview: {
    about: "Final chapter terms (event, landing page, hostname, pages per visit, A/B testing) and how AI in GA4 builds on every concept in the chapter: predictive metrics and audiences, anomaly detection and insights, data-driven attribution, and the Gemini-powered Analytics Advisor.",
    why: "AI features in GA4 only work if the basics are right. Seeing how each AI capability extends a chapter concept helps you use them critically instead of trusting them blindly.",
    objectives: [
      "Define event, landing page, hostname, pages per visit and A/B testing.",
      "Explain purchase probability, churn probability, predicted revenue, predictive audiences and their eligibility.",
      "Explain how anomaly detection and insights automate time comparison, and why the analyst must still explain causes.",
      "Compare last-click and data-driven attribution using the slide 52 example.",
      "Describe Analytics Advisor and link each AI capability back to its chapter concept."
    ],
    vocabulary: [
      { term: "Event", def: "An interaction that is tracked from your website into Google Analytics, for example clicks on a call to action (CTA).", slide: 48 },
      { term: "Landing page", def: "The first page viewed during a session.", slide: 49 },
      { term: "A/B testing", def: "Comparing different versions of digital advertising or website landing pages to determine which performs better.", slide: 49 },
      { term: "Purchase probability", def: "Likelihood that a user active in the last 28 days will purchase in the next 7 days.", slide: 50 },
      { term: "Churn probability", def: "Likelihood that a user active in the last 7 days will not be active in the next 7 days.", slide: 50 },
      { term: "Data-driven attribution", def: "Uses machine learning to compare paths of users who converted and did not, then shares the credit; the default model in GA4.", slide: 52 },
      { term: "Analytics Advisor", def: "A Gemini-powered assistant inside Google Analytics.", slide: 53 }
    ],
    hook: "GA4 can now guess who will buy next week. But it is only as smart as your tracking."
  },
  notes: [
    {
      id: "c1t5-n1",
      heading: "Events, landing page, hostname, pages per visit and A/B testing",
      slides: [48, 49],
      fromSlides: [
        { text: "Event: An interaction that is tracked from your website into Google Analytics, for example, tracking clicks on a click to action (CTA)", slide: 48 },
        { text: "Landing Page: The landing page is the first page viewed during a session", slide: 49 },
        { text: "Hostname: The part of your website's URL that identifies where the Google Analytics tracking code was loaded.", slide: 49 },
        { text: "Pages per visit: It is simply the number of pages a person viewed during a single session.", slide: 49 },
        { text: "A/B testing: A method used to compare different versions of digital advertising or website landing pages to determine which one performs better", slide: 49 }
      ],
      simple: "An event is any interaction you track, like a button click. The landing page is the first page someone sees in a session. Hostname shows which website the tracking code ran on. Pages per visit counts pages seen in one session. A/B testing compares two versions to see which works better.",
      deep: "Slide 48 defines an event as an interaction tracked from the website into Google Analytics, such as clicks on a call to action. Slide 49 adds four terms. The landing page is the first page viewed during a session, which connects to bounce rate measured from the initial entry page. The hostname is the part of the URL identifying where the Google Analytics tracking code was loaded, for example regnew.psut.edu.jo. Pages per visit is the number of pages a person viewed in a single session, and knowing how many and which pages were visited shows which content resonated. A/B testing compares versions of digital advertising or landing pages to determine which performs better on conversion rates, revenue, sessions and more.",
      exam: [
        "Event = tracked interaction, e.g. CTA clicks.",
        "Landing page = first page viewed during a session.",
        "Hostname = part of URL where the GA tracking code was loaded (e.g. regnew.psut.edu.jo).",
        "Pages per visit = pages viewed in a single session; shows which content resonated.",
        "A/B testing compares versions of ads or landing pages by conversion rates, revenue, sessions, etc."
      ],
      definitions: [
        { term: "Event", def: "An interaction that is tracked from your website into Google Analytics, for example, tracking clicks on a CTA.", slide: 48 },
        { term: "Landing page", def: "The first page viewed during a session.", slide: 49 },
        { term: "Hostname", def: "The part of your website's URL that identifies where the Google Analytics tracking code was loaded.", slide: 49 },
        { term: "Pages per visit", def: "The number of pages a person viewed during a single session.", slide: 49 },
        { term: "A/B testing", def: "A method used to compare different versions of digital advertising or website landing pages to determine which one performs better in terms of conversion rates, revenue, sessions, and more.", slide: 49 }
      ],
      keyFacts: [
        "Hostname example on slide 49: https://regnew.psut.edu.jo/"
      ],
      examples: [
        "Two versions of a landing page are shown to visitors; the one with the higher conversion rate wins the A/B test."
      ],
      misconceptions: [
        "The landing page is always the home page. It is whatever page is viewed first in the session."
      ]
    },
    {
      id: "c1t5-n2",
      heading: "Predictive metrics and predictive audiences",
      slides: [50],
      fromSlides: [
        { text: "GA4 uses machine learning on past events to predict what each user is likely to do next.", slide: 50 },
        { text: "Purchase probability: Likelihood that a user active in the last 28 days will purchase in the next 7 days", slide: 50 },
        { text: "Churn probability: Likelihood that a user active in the last 7 days will not be active in the next 7 days", slide: 50 },
        { text: "Predicted revenue: Revenue expected from a user active in the last 28 days over the next 28 days", slide: 50 },
        { text: "Eligibility: at least 1,000 returning users who purchased (or churned) and 1,000 who did not, within a 7-day period in the last 28 days.", slide: 50 }
      ],
      simple: "Before, we counted conversions after they happened. GA4 now uses past behavior to predict what each user will do: buy soon, stop coming back, or how much they will spend. It can build ready-made audiences like 'Likely 7-day purchasers' and share them with Google Ads.",
      deep: "Earlier in the chapter, conversions and e-commerce conversion rate were measured after the fact. Slide 50 shows GA4 applying machine learning to past events to predict each user's next behavior. Purchase probability is the likelihood that a user active in the last 28 days will purchase in the next 7 days; churn probability is the likelihood that a user active in the last 7 days will not be active in the next 7 days; predicted revenue is revenue expected from a user active in the last 28 days over the next 28 days. Predictive audiences such as 'Likely 7-day purchasers' and 'Likely 7-day churning users' can be shared with Google Ads, automating the targeting idea from slide 7. Eligibility requires at least 1,000 returning users who triggered the condition and 1,000 who did not within a 7-day period in the last 28 days, and per the speaker notes purchase events need value and currency.",
      exam: [
        "Purchase probability: active last 28 days -> purchase in next 7 days.",
        "Churn probability: active last 7 days -> NOT active in next 7 days.",
        "Predicted revenue: active last 28 days -> revenue over next 28 days.",
        "Predictive audiences ('Likely 7-day purchasers', 'Likely 7-day churning users') can be shared with Google Ads.",
        "Eligibility: 1,000 returning users who purchased/churned and 1,000 who did not, in a 7-day period within the last 28 days."
      ],
      definitions: [
        { term: "Purchase probability", def: "Likelihood that a user active in the last 28 days will purchase in the next 7 days.", slide: 50 },
        { term: "Churn probability", def: "Likelihood that a user active in the last 7 days will not be active in the next 7 days.", slide: 50 },
        { term: "Predicted revenue", def: "Revenue expected from a user active in the last 28 days over the next 28 days.", slide: 50 },
        { term: "Predictive audiences", def: "Ready-made segments such as 'Likely 7-day purchasers' and 'Likely 7-day churning users' that can be shared with Google Ads.", slide: 50 }
      ],
      keyFacts: [
        "Predictive audiences automate the targeting and personas idea from earlier in the chapter.",
        "Per the speaker notes, purchase events need value and currency."
      ],
      examples: [
        "A shop targets the 'Likely 7-day purchasers' audience with a reminder ad in Google Ads."
      ],
      misconceptions: [
        "Churn probability uses a 28-day lookback like purchase probability. Churn uses users active in the last 7 days.",
        "Any small site can use predictive metrics. Eligibility requires at least 1,000 users on each side of the condition."
      ]
    },
    {
      id: "c1t5-n3",
      heading: "Anomaly detection and automated insights",
      slides: [51],
      fromSlides: [
        { text: "Earlier we compared week-over-week and calculated percentage change by hand.", slide: 51 },
        { text: "GA4 learns each metric's normal range from history and flags values outside it.", slide: 51 },
        { text: "Insights on the Home page explain anomalies and trends in plain language; custom insights can email you when, for example, conversions drop by 20%.", slide: 51 },
        { text: "The analyst explains why: campaign launch? Broken tracking code? Bot traffic? Seasonality?", slide: 51 }
      ],
      simple: "Instead of comparing weeks by hand, GA4 learns what is normal for each metric and warns you when something is unusual. It can even email you if, say, conversions drop by 20%. But you still have to figure out why it happened.",
      deep: "Slide 51 connects to time comparison and percentage change: what analysts did by hand, GA4 now partly automates. GA4 learns each metric's normal range from historical data and flags values that fall outside it. Insights on the Home page and in the Insights panel explain anomalies and trends in plain language, and custom insights can send an email when a condition is met, such as conversions dropping by 20%. Detection is not explanation: the analyst still determines the cause, for example a campaign launch, broken tracking code, bot traffic or seasonality. The slide's chart data is illustrative.",
      exam: [
        "Anomaly detection automates week-over-week comparison and percentage change.",
        "GA4 learns each metric's normal range and flags values outside it.",
        "Insights explain anomalies/trends in plain language; custom insights can email (e.g. conversions drop 20%).",
        "Analyst still explains the cause: campaign launch, broken tracking, bot traffic, seasonality."
      ],
      definitions: [
        { term: "Anomaly detection", def: "GA4 learns each metric's normal range from history and flags values outside it.", slide: 51 },
        { term: "Custom insights", def: "Insights that can email you when a condition is met, for example when conversions drop by 20%.", slide: 51 }
      ],
      keyFacts: [
        "Insights appear on the Home page (and the Insights panel per the speaker notes)."
      ],
      examples: [
        "GA4 flags a sudden spike in sessions; the analyst discovers it was bot traffic, not real visitors."
      ],
      misconceptions: [
        "GA4 anomaly detection tells you the cause. The analyst still has to explain why."
      ]
    },
    {
      id: "c1t5-n4",
      heading: "Data-driven attribution",
      slides: [52],
      fromSlides: [
        { text: "Last click gives all the credit to the final channel, so upper-funnel channels such as social and email look weak.", slide: 52 },
        { text: "Data-driven attribution uses machine learning to compare the paths of users who converted and users who did not, then shares the credit. It is the default attribution model in GA4.", slide: 52 },
        { text: "It only works if each touchpoint is visible: accurate utm_source, utm_medium and utm_campaign tags come first. (Percentages are illustrative.)", slide: 52 }
      ],
      simple: "Customers often touch several channels before buying. Last click gives 100% of the credit to the final one. Data-driven attribution uses machine learning to share the credit, so channels like social and email get recognized. It is GA4's default, and it needs good UTM tags.",
      deep: "Slide 52 builds on traffic channels and UTM parameters. In the illustrative customer journey, a user touches social, organic search, email and paid search before purchasing. Under last click, paid search receives 100% of the credit and every earlier channel receives 0%, making upper-funnel channels such as social and email look weak. Data-driven attribution uses machine learning to compare the paths of converting and non-converting users and gives each touchpoint fractional credit: in the example social 20%, organic search 30%, email 15% and paid search 35%. It is the default attribution model in GA4; per the speaker notes, Google retired first click, linear, time decay and position-based models in 2023. The model only works when every touchpoint is visible, so accurate utm_source, utm_medium and utm_campaign tagging comes first.",
      exam: [
        "Last click: 100% credit to the final channel; upper-funnel channels look weak.",
        "Data-driven: ML compares converting vs non-converting paths and shares credit; GA4 default.",
        "Slide 52 example (illustrative): Social 0%->20%, Organic 0%->30%, Email 0%->15%, Paid search 100%->35%.",
        "Requires accurate utm_source, utm_medium, utm_campaign tags.",
        "Speaker notes: in 2023 Google retired first click, linear, time decay and position-based models."
      ],
      definitions: [
        { term: "Last click attribution", def: "Gives all the credit to the final channel.", slide: 52 },
        { term: "Data-driven attribution", def: "Uses machine learning to compare the paths of users who converted and users who did not, then shares the credit; the default attribution model in GA4.", slide: 52 }
      ],
      keyFacts: [
        "The slide 52 percentages are illustrative.",
        "Customers rarely convert after one visit (speaker notes)."
      ],
      examples: [
        "Under last click, the email campaign seems useless; under data-driven attribution it receives 15% of the credit in the slide example."
      ],
      misconceptions: [
        "Data-driven attribution works even without UTM tags. Each touchpoint must be visible, so accurate UTM tags come first.",
        "The slide 52 percentages are real benchmarks. They are illustrative."
      ]
    },
    {
      id: "c1t5-n5",
      heading: "Analytics Advisor and connecting the chapter to AI",
      slides: [53, 54, 55],
      fromSlides: [
        { text: "Analytics Advisor is a Gemini-powered assistant inside Google Analytics (rolled out from December 2025 to English-language accounts).", slide: 53 },
        { text: "When a metric spikes or drops, it runs key-driver analysis to rank the likely causes.", slide: 53 },
        { text: "AI helps answer faster, but you still choose the KPIs and check the answer.", slide: 53 },
        { text: "Remember: AI is only as good as the data. Correct tracking code, events, UTM tags and consent setup come first.", slide: 54 }
      ],
      simple: "Analytics Advisor lets you ask Google Analytics questions in plain language and builds the report for you. When a number jumps or drops, it ranks likely causes. Every AI feature in GA4 builds on a basic concept from this chapter, and all of them need correct tracking first.",
      deep: "Slide 53 introduces Analytics Advisor, a Gemini-powered conversational assistant inside Google Analytics, rolled out from December 2025 to English-language accounts (per the notes, announced in November 2025, for Standard and 360 accounts). You ask a question and it builds the report and visualization; when a metric spikes or drops, it runs key-driver analysis to rank likely causes. The slide's conversation about email conversions falling 18% is an illustrative example, not real output. It recalls the earlier question of what insight and action a metric offers: AI answers faster, but the analyst still chooses the KPIs and checks the answer. Slide 54 maps every AI capability to a chapter concept: consent and GDPR/CCPA to behavioral modeling; targeting and personas to predictive audiences; conversions and e-commerce conversion rate to predictive metrics; time comparison and percentage change to anomaly detection and insights; traffic channels, source/medium and UTM to data-driven attribution; and asking the right question to Analytics Advisor. The bottom line is that AI is only as good as the data from tracking code, events, UTM tags and consent setup. Slide 55 closes with discussion prompts on trusting modeled data, designing a win-back campaign for likely churners, and whether to move budget after attribution changes.",
      exam: [
        "Analytics Advisor = Gemini-powered assistant in Google Analytics, rolled out from December 2025 to English-language accounts.",
        "Ask a question -> it builds the report and visualization; key-driver analysis ranks likely causes.",
        "Analyst still chooses KPIs and checks the answer.",
        "Mapping: consent -> behavioral modeling; personas -> predictive audiences; conversions -> predictive metrics; time comparison -> anomaly detection; UTM/channels -> data-driven attribution; right question -> Analytics Advisor.",
        "AI is only as good as the data: tracking code, events, UTM tags, consent setup come first."
      ],
      definitions: [
        { term: "Analytics Advisor", def: "A Gemini-powered assistant inside Google Analytics (rolled out from December 2025 to English-language accounts).", slide: 53 },
        { term: "Key-driver analysis", def: "Run when a metric spikes or drops, to rank the likely causes.", slide: 53 }
      ],
      keyFacts: [
        "The Analytics Advisor conversation on slide 53 is an illustrative example.",
        "Behavioral modeling (Consent Mode) estimates visitors who decline cookies (slide 54)."
      ],
      examples: [
        "A marketer asks 'Why did conversions from email drop last week?' and checks the suggested cause, such as UTM tags on the newsletter campaign."
      ],
      misconceptions: [
        "With Analytics Advisor, the analyst no longer needs to choose KPIs. Slide 53: you still choose the KPIs and check the answer.",
        "AI can fix bad tracking. Slide 54: AI is only as good as the data."
      ]
    }
  ],
  steps: [],
  visual: {
    type: "bars",
    title: "Who gets the credit? Last click vs data-driven",
    caption: "Credit per channel in the slide 52 customer journey. Percentages are illustrative, as stated on the slide.",
    slides: [52],
    data: {
      groups: ["Last click", "Data-driven"],
      series: [
        { label: "Social", values: [0, 20], detail: "Upper-funnel channel: 0% under last click, 20% under data-driven." },
        { label: "Organic search", values: [0, 30], detail: "0% under last click, 30% under data-driven." },
        { label: "Email", values: [0, 15], detail: "Upper-funnel channel: 0% under last click, 15% under data-driven." },
        { label: "Paid search", values: [100, 35], detail: "Final touchpoint before purchase: 100% under last click, 35% under data-driven." }
      ],
      unit: "%"
    }
  },
  examples: [
    {
      concept: "Reading the attribution example",
      example: "Slide 52 journey: Social -> Organic search -> Email -> Paid search -> Purchase.",
      walkthrough: [
        "Last click: the final channel, paid search, gets 100%; the others get 0%.",
        "Data-driven: ML compares converting and non-converting paths and shares the credit.",
        "Result in the example: social 20%, organic search 30%, email 15%, paid search 35% (total 100%).",
        "Social and email no longer look weak; paid search still gets the largest share."
      ],
      application: "Before cutting an upper-funnel channel, check how it looks under data-driven attribution, and make sure UTM tags make every touchpoint visible.",
      check: { q: "Under data-driven attribution in the example, how much credit does email get?", options: ["0%", "15%", "35%", "100%"], answer: 1, explain: "Slide 52 data-driven column: email 15%." }
    },
    {
      concept: "Using predictive audiences",
      example: "An online store sees the 'Likely 7-day churning users' audience available in GA4 (slide 55 discussion).",
      walkthrough: [
        "Churn probability: users active in the last 7 days likely not to be active in the next 7 days.",
        "The predictive audience can be shared with Google Ads.",
        "Choose a channel and message to win them back, tracked with UTM tags.",
        "Pick a KPI tied to the goal, such as returning sessions or conversions from that campaign."
      ],
      application: "This is the slide 7 idea of targeting audiences, now automated with machine learning.",
      check: { q: "Which users does churn probability describe?", options: ["Users active in the last 28 days who will buy in 7 days", "Users active in the last 7 days who will not be active in the next 7 days", "Users who declined cookies", "Users who bounced from the landing page"], answer: 1, explain: "Slide 50: churn probability is the likelihood that a user active in the last 7 days will not be active in the next 7 days." }
    }
  ],
  flashcards: [
    { id: "c1t5-f1", front: "What is an event?", back: "An interaction that is tracked from your website into Google Analytics, e.g. clicks on a CTA.", slide: 48 },
    { id: "c1t5-f2", front: "What is the landing page?", back: "The first page viewed during a session.", slide: 49 },
    { id: "c1t5-f3", front: "What does hostname identify?", back: "The part of the URL where the Google Analytics tracking code was loaded.", slide: 49 },
    { id: "c1t5-f4", front: "Define purchase probability.", back: "Likelihood that a user active in the last 28 days will purchase in the next 7 days.", slide: 50 },
    { id: "c1t5-f5", front: "Define churn probability.", back: "Likelihood that a user active in the last 7 days will not be active in the next 7 days.", slide: 50 },
    { id: "c1t5-f6", front: "Predictive metrics eligibility?", back: "At least 1,000 returning users who purchased (or churned) and 1,000 who did not, within a 7-day period in the last 28 days.", slide: 50 },
    { id: "c1t5-f7", front: "What does GA4 anomaly detection do?", back: "Learns each metric's normal range from history and flags values outside it.", slide: 51 },
    { id: "c1t5-f8", front: "Last click vs data-driven attribution?", back: "Last click: all credit to the final channel. Data-driven: ML compares converting and non-converting paths and shares credit (GA4 default).", slide: 52 },
    { id: "c1t5-f9", front: "What is Analytics Advisor?", back: "A Gemini-powered assistant inside Google Analytics, rolled out from December 2025 to English-language accounts.", slide: 53 },
    { id: "c1t5-f10", front: "What must come first for AI in GA4 to work?", back: "Correct tracking code, events, UTM tags and consent setup. AI is only as good as the data.", slide: 54 }
  ],
  quiz: [
    { id: "c1t5-q1", type: "mcq", difficulty: "easy", prompt: "What is the landing page?", options: ["The last page viewed in a session", "The first page viewed during a session", "The home page", "The checkout page"], answer: 1, explain: "Slide 49: the landing page is the first page viewed during a session.", wrongWhy: { "0": "The landing page is the first, not the last, page.", "2": "The home page is the landing page only if it is viewed first.", "3": "Checkout is usually late in a session, not the first page." }, slide: 49, section: "c1t5-n1" },
    { id: "c1t5-q2", type: "tf", difficulty: "easy", prompt: "Data-driven attribution is the default attribution model in GA4.", answer: true, explain: "Slide 52: data-driven attribution is the default attribution model in GA4.", slide: 52, section: "c1t5-n4" },
    { id: "c1t5-q3", type: "fill", difficulty: "easy", prompt: "Analytics Advisor is powered by Google's generative AI called ______.", answer: ["gemini"], explain: "Slide 53: Analytics Advisor is a Gemini-powered assistant inside Google Analytics.", slide: 53, section: "c1t5-n5" },
    { id: "c1t5-q4", type: "match", difficulty: "medium", prompt: "Match each chapter concept to the AI capability in GA4 that builds on it (slide 54).", options: [["Cookies, consent, GDPR / CCPA", "Behavioral modeling (Consent Mode)"], ["Targeting and personas", "Predictive audiences"], ["Time comparison, percentage change", "Anomaly detection, insights"], ["Traffic channels, source / medium, UTM", "Data-driven attribution"], ["Asking the right question", "Analytics Advisor (Gemini)"]], answer: null, explain: "Slide 54 maps each concept to its AI capability.", slide: 54, section: "c1t5-n5" },
    { id: "c1t5-q5", type: "mcq", difficulty: "medium", prompt: "Which definition matches purchase probability?", options: ["Likelihood that a user active in the last 7 days will not be active in the next 7 days", "Likelihood that a user active in the last 28 days will purchase in the next 7 days", "Revenue expected over the next 28 days", "Share of sessions that bounced"], answer: 1, explain: "Slide 50 defines purchase probability with a 28-day lookback and a 7-day prediction window.", wrongWhy: { "0": "That is churn probability.", "2": "That is predicted revenue.", "3": "That describes bounce rate, not a predictive metric." }, slide: 50, section: "c1t5-n2" },
    { id: "c1t5-q6", type: "multi", difficulty: "medium", prompt: "According to slide 51, which could the analyst check as causes of a flagged anomaly? (Select all that apply.)", options: ["Campaign launch", "Broken tracking code", "Bot traffic", "Seasonality"], answer: [0, 1, 2, 3], explain: "Slide 51 lists campaign launch, broken tracking code, bot traffic and seasonality.", slide: 51, section: "c1t5-n3" },
    { id: "c1t5-q7", type: "mcq", difficulty: "medium", scenario: "A marketing manager notices that under last-click attribution, the social media campaigns get 0% of the credit for purchases.", prompt: "What does slide 52 say about this?", options: ["Social media never helps conversions", "Last click gives all credit to the final channel, so upper-funnel channels such as social look weak", "Social should get 100% of the credit", "The tracking code is definitely broken"], answer: 1, explain: "Slide 52: last click gives all credit to the final channel, so upper-funnel channels such as social and email look weak.", wrongWhy: { "0": "In the data-driven example social gets 20%, so it does contribute.", "2": "No model on the slide gives social 100%.", "3": "0% under last click is expected for an upper-funnel channel, not proof of broken tracking." }, slide: 52, section: "c1t5-n4" },
    { id: "c1t5-q8", type: "fill", difficulty: "hard", prompt: "Problem: In slide 52, paid search gets 100% of the credit under last click and 35% under data-driven attribution. How many percentage points of credit move from paid search to the other channels? (number)", answer: ["65", "65%", "65 points", "65 percentage points"], explain: "100 - 35 = 65 points, shared as social 20 + organic 30 + email 15 = 65.", slide: 52, section: "c1t5-n4" },
    { id: "c1t5-q9", type: "mcq", difficulty: "hard", scenario: "A small blog with about 200 returning users per week wants to use GA4's 'Likely 7-day purchasers' audience.", prompt: "What is the most likely problem, based on slide 50?", options: ["Predictive audiences cannot be shared with Google Ads", "It probably does not meet eligibility: at least 1,000 returning users who purchased and 1,000 who did not, within a 7-day period in the last 28 days", "Predictive metrics only work in Universal Analytics", "It needs data-driven attribution turned off"], answer: 1, explain: "Slide 50 eligibility requires at least 1,000 returning users on each side of the condition.", wrongWhy: { "0": "Slide 50 says predictive audiences can be shared with Google Ads.", "2": "Predictive metrics are a GA4 feature; UA stopped processing data in 2023.", "3": "Attribution settings are not part of predictive metric eligibility." }, slide: 50, section: "c1t5-n2" },
    { id: "c1t5-q10", type: "tf", difficulty: "hard", prompt: "Because Analytics Advisor answers questions in plain language, the analyst no longer needs to choose KPIs or check the answer.", answer: false, explain: "Slide 53: AI helps answer faster, but you still choose the KPIs and check the answer.", slide: 53, section: "c1t5-n5" },
    { id: "c1t5-q11", type: "multi", difficulty: "hard", prompt: "Which must be correct before AI in GA4 can be trusted, according to slide 54? (Select all that apply.)", options: ["Tracking code", "Events", "UTM tags", "Consent setup", "The color of the website"], answer: [0, 1, 2, 3], explain: "Slide 54: AI is only as good as the data. Correct tracking code, events, UTM tags and consent setup come first.", slide: 54, section: "c1t5-n5" },
    { id: "c1t5-q12", type: "mcq", difficulty: "easy", prompt: "Which method compares different versions of ads or landing pages to see which performs better?", options: ["Hostname", "A/B testing", "Pages per visit", "Churn probability"], answer: 1, explain: "Slide 49 defines A/B testing this way.", wrongWhy: { "0": "Hostname identifies where the tracking code was loaded.", "2": "Pages per visit counts pages viewed in a session.", "3": "Churn probability predicts users becoming inactive." }, slide: 49, section: "c1t5-n1" }
  ]
}

] });
