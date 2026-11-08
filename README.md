# FocusNest — Learn Your Way

An ADHD-friendly learning app that turns lecture slides (.pptx / .pdf) into bite-sized lessons, step-by-step walkthroughs, interactive visuals, flashcards and quizzes, built **only from what the slides say**.

FocusNest is built for one course, and students study it **one chapter at a time**: they choose a chapter first, and the chapters column then shows only that chapter's topics. It comes with the course built from your two decks:
**Digital and Social Media Analytics**, Chapter 1 (55 slides) and Chapter 2 (75 slides), with 12 topics, 141 quiz questions and 110 flashcards.

## Run it

```bash
cd focusnest
node server.js       # → http://localhost:8080   (no npm install needed)
```

## The Ask FocusNest chat

The chat answers **only from the slides and lesson notes**. It finds the matching slides, preferring the chapter you are studying, and shows them with slide numbers. If nothing matches, it says so instead of guessing. It runs entirely in the browser: no AI service, no API key, nothing sent anywhere.

You can also open `index.html` directly (file://); everything works the same.

## Folder map

| Path | What it is |
|---|---|
| `index.html` | The single app page (three-column layout) |
| `css/style.css` | All styling: tokens, themes, layout, responsive rules |
| `js/schema.js` | The course data shape + validator (built-in and added chapters both pass through it) |
| `js/store.js` | Progress, XP, badges, flashcard schedule, notes, chosen chapter (localStorage) + added chapters (IndexedDB) |
| `js/course.js` | Builds the one course from `data/` + any added chapters, tracks the chosen chapter, builds chapter and final quizzes |
| `js/parser.js` | "Add a chapter" pipeline: reads .pptx/.pdf in the browser and builds topics/quizzes from slide text |
| `js/lesson.js` | A topic with its 7 tabs, the original-slides panel, highlights, bookmarks and personal notes |
| `js/visuals.js` | 8 interactive visual types (flow, tree, timeline, bars, calculator, drag-sort, CSS-selector playground, compare) |
| `js/quiz.js` | Quiz engine: 5 question types, practice/exam modes, 3 levels, feedback and summary |
| `js/flashcards.js` | Flashcards with spaced repetition |
| `js/focus.js` | Focus mode + microlearning, Pomodoro timer, brain breaks, parking lot |
| `js/tutor.js` | Ask FocusNest chat: answers from the slides only |
| `js/pages.js` | Sidebar pages (dashboard, chapters, slides, notes, visual, practice, flashcards, planner, progress, settings) and the middle outline |
| `js/app.js` | Startup, router, resume-where-I-left-off |
| `data/slides.js` | Text, speaker notes and pictures extracted from your two .pptx files |
| `data/ch1.js`, `data/ch2a.js`, `data/ch2b.js` | Lesson content written from those slides |
| `assets/slides/` | Pictures taken from the decks |
| `server.js` | Tiny local web server (serves these files only) |
| `tests/` | `validate-seed.js` (content checks) and `check.js` (logic self-check) |

## Tests

```bash
node tests/validate-seed.js   # every topic valid, every slide reference exists, all 3 quiz levels present
node tests/check.js           # grading, spaced repetition, formulas, parser on the real decks
```

## How "no invented content" is enforced

- **Slide wording and explanation are kept apart.** Text in blue **From your slides** boxes is copied from the decks. Text under **Added explanation** is FocusNest's own explanation. Every section and question links to its slide numbers.
- **Added chapters** use only sentences found in the slides:
  - Definitions come from lines written as "Term: …" or "Term is …".
  - Steps are created only when the slides contain "Step 1…" or numbered lines.
  - A visual is created only when the slides contain a real sequence or dated stages.
  - Examples are left empty, and the tab says so.
- **The chat** answers with slide excerpts only, and says so when the slides don't cover a question.

## What's different from the original brief, and why

| Brief asked for | Built | Why / how to upgrade |
|---|---|---|
| React + Next.js + Tailwind + shadcn | Plain HTML/CSS/vanilla JS | Your standing rule is beginner-readable vanilla code. The data layer (`schema.js`) carries straight over if you port it. |
| Supabase auth, database, storage | localStorage + IndexedDB on the device | No accounts or keys are needed, and nothing leaves the device. Add Supabase when the app needs more than one user or device. |
| Server-side PPTX extraction | In-browser extraction (JSZip / pdf.js) | Files never leave the device. |
| Framer Motion, React Flow, Recharts | CSS animations + custom interactive visuals | No build step is needed. Reduced-motion settings are respected everywhere. |

## Privacy

FocusNest has no analytics and no visitor tracking: no Google Analytics, no Tag Manager, no cookie banner. Progress, notes and added chapters stay in the student's own browser. The chat works offline too, so nothing the student types is sent anywhere.

## Choosing a chapter

- On first visit the dashboard and the chapters column ask **which chapter** to study.
- Switch any time with the **Chapter ▾** picker at the top of the chapters column, or on the **Chapters** page.
- Each chapter ends with a **chapter quiz**; the **final course quiz** covers all chapters.
- **Add a chapter** (Chapters page): upload the next chapter's .pptx/.pdf and it becomes Chapter 3, 4, … of the same course. Added chapters can be removed; Chapters 1 and 2 cannot.

## Hiding panels

- **Collapse sidebar** (bottom of the green sidebar) → icons only.
- **Hide chapters** (icon at the top of the chapters column) → the lesson uses the full width; the chapters icon in the top bar brings it back.
- Both are also in Settings → Panels and are remembered.

## Known limits

- Old `.ppt` files: save them as `.pptx` first.
- Scanned PDFs with no text layer give no readable text. The app refuses to guess the content.
- Pictures in uploaded slides are shown as images. FocusNest does not interpret charts inside pictures.
- Progress lives in one browser. Use **Export progress** in Settings to keep a copy.
- Two worked examples use illustrative numbers that are not on the slides: the lead-generation example in Ch.1 topic 4 and one funnel line in Ch.1 topic 2. They appear under "Added explanation".

## Deploy

Upload the `focusnest/` folder to GitHub Pages / Netlify. It is a fully static site.
