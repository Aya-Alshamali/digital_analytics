# FocusNest — Button Guide

Every interactive control and what it does. The site records nothing about who visits; progress is stored only in the student's own browser.

## Always visible

| Button | Handler | Visible result |
|---|---|---|
| Sidebar links (Dashboard … Settings) | `route()` in `js/app.js` | Draws that page |
| Collapse sidebar (bottom of the left sidebar) | `togglePanel("navCollapsed")` in `js/app.js` | Shrinks the sidebar to icons (hover an icon for its name); click again to expand. Remembered |
| Hide chapters (icon at the top of the chapters column) | `togglePanel("outlineHidden")` | Hides the chapters column so the lesson gets the full width. Remembered |
| Chapters icon (top bar, when the column is hidden) | `outlineBtn.onclick` | Brings the chapters column back |
| ☰ Menu (mobile) | `menuBtn.onclick` | Opens the sidebar drawer |
| Outline icon (tablet/mobile) | `outlineBtn.onclick` | Opens the chapter list |
| Chapter cards / list (when no chapter is chosen) | `chooseChapter(id, true)` in `js/pages.js` | Selects that chapter and opens its next topic |
| Chapter ▾ picker (top of the chapters column) | `chapterSel.onchange` → `chooseChapter()` | Switches chapter; the column lists only that chapter's topics |
| Chapter quiz / Final course quiz / All chapters (bottom of the column) | links | Opens the quiz / the Chapters page |
| Topic row (outline) | outline click handler | Opens/expands the topic |
| Timer chip | `FN.focus.openTimer` | Timer panel |
| Parking lot icon | `FN.focus.openParkingLot` | Scratchpad dialog |
| Ask FocusNest | `FN.tutor.toggle` | Opens the tutor panel |

## Lesson header

| Button | Handler | Visible result |
|---|---|---|
| Focus mode | `FN.focus.open` | Full-screen micro-blocks |
| Original slides | `side = "slides"` | Slide panel |
| My notes | `side = "mynotes"` | Notes + highlights panel |
| Bookmark | lesson click handler | Toggles bookmark |
| 🔊 Read aloud | `FN.speak` | Reads the tab aloud |
| Tabs 1–7 (or keys 1–7) | links | Switch tab |
| Next / previous tab bar | links | Next tab / next topic / final quiz |
| "Slide N" chips | `openSlide(n)` | Shows that slide |
| Highlight (after selecting text) | `hlPop.onclick` | Marks the text in yellow |

## Notes tab

| Button | Result |
|---|---|
| Explain Simply / Understand Deeply / Exam Preparation | Switches the explanation level |
| Mark as understood | Ticks the section, +5 XP the first time |
| ⤢ on a section | Focus mode starting at that block |
| 🔊 on a section | Reads that section aloud |

## Step-by-step, Visual, Examples

| Button | Result |
|---|---|
| Step dots / Previous / Next step | Moves between steps (position saved) |
| Checkpoint option | Locks in an answer, shows feedback |
| Visual: Play/Pause, Restart, Reduce motion | Controls the animation |
| Visual: any node/row/bar | Shows its explanation |
| Drag-sort: Check my sorting / Reset | Marks cards right/wrong / returns them |
| Selector: Highlight matches / Check / Hint | Highlights on the sample page / grades / hint |
| Example knowledge-check option | Feedback |

## Flashcards

| Button | Result |
|---|---|
| Card (or Space) | Flips |
| Hard / Medium / Easy (or 1/2/3) | Schedules the card, next card |
| ☆ Save | Saves the card for revision |
| All / Due / Only forgotten / Saved, Shuffle | Filters/reorders the deck |

## Quiz

| Button | Result |
|---|---|
| Start quiz | Starts at the chosen level/mode |
| Check answer (practice) | Explains the answer |
| Back / Next | Navigates questions |
| See results / Submit exam | Summary: score, strengths, sections to revise |
| Revise: … | Opens that note section |
| Try again | New attempt |

## Focus mode, timer, breaks

| Button | Result |
|---|---|
| Recall answer / Show answer | Feedback |
| Continue / Finish | Next block (+XP) |
| Exit focus (or Esc) | Back to the lesson |
| Timer presets / custom minutes | Sets the lengths |
| Start focus / Pause / Resume / Reset | Countdown |
| Brain break cards | Activity + break timer |

## Pages

| Page | Button | Result |
|---|---|---|
| Chapters | Study this chapter / Continue | Selects the chapter and opens its next topic |
| Chapters | Add a chapter: drop zone / file picker | Builds the new chapter from the slides and opens it |
| Chapters | Remove → confirm (added chapters only) | Deletes that chapter and its slides from this device |
| Lecture Slides | Deck tabs, search | Filters the slide cards |
| Practice | Start | Topic or final quiz |
| Planner | Create plan, Open timer, Take a break | Plan list / dialogs |
| Settings | Sliders, selects, switches (incl. Panels: collapse sidebar / hide chapters) | Applies instantly |
| Settings | Export progress / Reset progress → confirm | Downloads .json / wipes progress |
| Dashboard | Chapter cards (first visit), change chapter, Resume, Begin, Start a focus session, Review now, Add a chapter | Navigates / opens the timer |
| Tutor | Quick actions (7) | Answers from the lesson data |
| Tutor | Send question | Matching slide excerpts with slide numbers |

## Ask FocusNest chat

| Button | Handler | Visible result |
|---|---|---|
| Send / Enter | `ask()` in `js/tutor.js` | Matching slide excerpts (current chapter first), or "not in your slides" |
| Slide chips in an answer | `FN.lesson.openSlide(n)` | Opens that original slide beside the lesson |
| Quick actions (7) | `action()` | Simpler explanation, example, steps, quiz question, summary, compare, prerequisites — from the lesson data |
| ↺ Clear | clears `log` | Empties the chat |
| ✕ Close | `toggle(false)` | Hides the chat panel |
