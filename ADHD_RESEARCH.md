# ADHD research behind FocusNest's features

Evidence key: **S** = peer-reviewed study · **G** = expert or organisation guidance. Most ADHD studies here are small, so treat them as promising, not proven.

## Added in this update (local branch `adhd-features`)

| Feature | ADHD problem | Evidence |
|---|---|---|
| **Draining ring timer**: the timer shows time as a shrinking circle, and the top-bar chip has a mini ring | Time blindness | G: [Understood: time blindness](https://www.understood.org/en/articles/adhd-time-blindness), [CHADD: managing time blindness](https://chadd.org/adhd-news/adhd-news-adults/attention-time-unbound-managing-time-blindness-at-work/) |
| **"Just 2 min (get started)" preset** | Hard to start a task | G: Understood (start with 2 minutes), [CHADD: college with ADHD](https://chadd.org/for-parents/succeeding-in-college-with-adhd/) |
| **If-then plan**: pick one plan, such as "If I want to check my phone, then I'll park it" | Distraction and inhibition | S: [Gawrilow & Gollwitzer, implementation intentions in ADHD](https://www.socmot.uni-konstanz.de/publications/implementation-intentions-facilitate-response-inhibition-adhd-children) (children, small samples) |
| **Halfway check-in, "Still on track?"**, with on-track % on Progress | Drifting off without noticing | S: [Scheithauer & Kelley, self-monitoring trial with college students](https://repository.lsu.edu/gradschool_dissertations/1857) (53 students, self-reported) |
| **Welcome back, no guilt**: after 3+ days away, a kind banner and "Start with 2 minutes" | Shame and rejection sensitivity after missed days | G: [ADDitude: RSD and emotional dysregulation](https://www.additudemag.com/rejection-sensitive-dysphoria-adhd-emotional-dysregulation/) |

## Added in the second update

| Feature | ADHD problem | Evidence |
|---|---|---|
| **Practise until right**: quiz "Practise the missed until right", and Hard flashcards come back in the same session | Weak memory encoding | S: [Knouse et al., retrieval practice in ADHD college students](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10397724/) (recommends practising to criterion) |
| **Time guess vs real time** in focus mode, with your pattern on Progress | Underestimating time | G: [Understood: time blindness](https://www.understood.org/en/articles/adhd-time-blindness) |
| **Pick an easy win**: the shortest blocks, or a surprise pick | Getting started; interest-based motivation | G: [CHADD: college students](https://chadd.org/attention-article/how-to-help-college-and-grad-students-stay-on-top-of-their-game/) |
| **Celebrations**: a confetti burst and soft chime after blocks, quizzes, cards and sessions; respects Reduce motion and can be turned off | Need for immediate, frequent rewards | Theory: [delay aversion / reward](https://pmc.ncbi.nlm.nih.gov/articles/PMC3688618) |
| **Study with me**: a calm companion card with gentle messages and optional brown noise | Accountability (body doubling) | G: [CHADD: body doubling](https://chadd.org/adhd-weekly/could-a-body-double-help-you-increase-your-productivity/). Evidence is mixed ([one study found no effect](https://arxiv.org/html/2509.12153v1)). This is a solo version with no other real person. |

## Already in FocusNest (backed by the same sources)

- **Focus mode with 2–5 minute blocks:** [W3C COGA](https://www.w3.org/TR/coga-usable/), "Avoid Too Much Content".
- **Distraction parking lot**
- **Brain breaks with movement:** [exercise and executive function meta-analysis](https://pmc.ncbi.nlm.nih.gov/articles/PMC8141166)
- **Quizzes and spaced flashcards (retrieval practice):** [Knouse et al.](https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10397724/)
- **XP for each finished block (immediate rewards):** [delay-aversion / reward theory](https://pmc.ncbi.nlm.nih.gov/articles/PMC3688618)
- **Resume where you left off**
- **Streaks off by default**
- **Read-aloud:** [TTS and ADHD comprehension](https://journals.sagepub.com/doi/abs/10.1177/0162643417742898)
- **Reading settings:** COGA, "Support Adaptation and Personalization".

## Notes

- A real shared body-double session, with other students live, would need a server. "Study with me" is the solo version.

## Privacy

Check-in answers, time guesses and the if-then plan are saved only in your browser (localStorage). Nothing is sent anywhere.
