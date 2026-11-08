# FocusNest — Feature Guide

| Area | Feature | Where (file) | Notes |
|---|---|---|---|
| Layout | Sage sidebar with topographic pattern, chapter outline, lesson workspace | `index.html`, `css/style.css` §3 | The outline becomes a drawer at tablet width; the sidebar becomes a drawer on mobile |
| Chapters | One course (Digital and Social Media Analytics); choose a chapter first, the column shows only its topics; switch with the Chapter picker or the Chapters page | `js/course.js`, `js/pages.js` `renderOutline()`, `chapters()` | Choice is remembered |
| Add a chapter | Upload the next chapter's .pptx/.pdf → it becomes Chapter 3, 4, … ; live progress log; added chapters can be removed | `js/pages.js` `handle()`, `js/parser.js` | Read in the browser; checked by `schema.js` before saving |
| Organisation | Chapters per file, topics from shared slide headings, slide references everywhere | `js/parser.js` `groupTopics()` | Very long runs split at about 8 slides |
| Tab 1 Overview | About, why it matters, objectives, vocabulary, study time, hook, learning path | `js/lesson.js` `tabOverview` | |
| Tab 2 Notes | Explain Simply / Understand Deeply / Exam Preparation; definitions, key facts, examples, misconceptions; "From your slides" vs "Added explanation" | `tabNotes` | Mark each section as understood (+XP) |
| Tab 3 Step-by-Step | Stepper: what happens, why, visual, practical tip, checkpoint question; progress saved | `tabSteps` | Only for topics that are real processes |
| Tab 4 Visual | Flow, hierarchy tree, timeline, bar comparison, live calculator, drag-and-drop sorting, CSS-selector playground, comparison table; Play/Pause/Restart and Reduce motion | `js/visuals.js` | No decorative visuals: a topic gets none when a diagram would not help |
| Tab 5 Examples | Concept → Example → Walkthrough → Application → Knowledge check | `tabExamples` | |
| Tab 6 Flashcards | Flip, shuffle, Easy/Medium/Hard, spaced repetition, save difficult cards, "only forgotten" | `js/flashcards.js` | Keys: Space flips, 1/2/3 rate |
| Tab 7 Quiz | MCQ, true/false, multiple answer, matching, fill-in and problem solving, scenarios; Easy/Medium/Hard; Practice/Exam | `js/quiz.js` | Wrong answers explain why yours is wrong, the right answer, why it is right, and which section to revise |
| Chapter & final quiz | 2 questions per topic — for one chapter, or across all chapters | `js/course.js` `finalQuiz()` | In the chapters column and on the Practice page |
| Original slides | Side panel: slide title, text, pictures, speaker notes, slide navigation | `js/lesson.js` `drawSide()` | Any "Slide N" chip opens it |
| Focus mode + Microlearning | Full-screen, one 2–5 min block at a time: takeaway, recall question, Continue | `js/focus.js` `open()` | Key F; Esc exits |
| Pomodoro | 5/2, 15/5, 25/5 or custom; drift-free; chime | `focus.js` | Finishing a focus session logs study minutes |
| Brain breaks | Box breathing (animated), stretch, 20-20-20 screen rest, movement | `focus.js` `brainBreak()` | Optional, never forced |
| Parking lot | Quick scratchpad from the top bar | `focus.js` `openParkingLot()` | Listed under My Notes |
| Gamification | XP, levels, 8 badges, optional streaks (off by default), progress bars | `js/store.js` | No points are ever taken away |
| Reading accessibility | Font size, line spacing, text width, contrast, 5 background tints, dark mode, reduced motion, text-to-speech speed | `js/pages.js` `settings()`, `js/ui.js` `applySettings()` | System reduced-motion is respected |
| Personal study | Personal notes per topic, highlights (select text → Highlight), bookmarks | `js/lesson.js` | Collected on the My Notes page |
| Resume | Opening the app returns to the exact topic, tab and note section | `js/app.js`, `lesson.js` scroll tracking | |
| Tutor | Ask FocusNest chat: 7 quick actions + free questions answered with matching slide excerpts (current chapter first) and slide numbers; refuses to guess | `js/tutor.js` | Works offline; nothing is sent anywhere |
| Revision | Dashboard recommendations, "needs review" from quiz misses, cards due, 28-day consistency, quiz performance by topic | `js/pages.js` `dashboard()`, `progress()` | Completion = quiz ≥ 60%, not time on page |
| Planner | Spreads unfinished topics over chosen study days until a date | `pages.js` `planner()` | |
| Privacy | No visitor tracking at all; progress stays in the browser; export/reset data | Settings | |
| Panels | Collapse the left sidebar to icons, hide the chapters column, close the tutor and slide panels | `js/app.js` `togglePanel()`, Settings → Panels | Remembered on this device |
