# bad-blog

I ran an experiment to see if Claude could make intentionally bad web designs if instructed to do so. Theory is that LLMs can only pull from their own training corpus, so even with explicit "bad design" rules they wouldn't be able to make a "bad" page.

The experiment was a success in that it was a failure - even when provided with hard guardrails on the designs (old != bad), it landed on designs that were just aesthetics of certain eras. I even had it draft a "SMELLS.md" to codify what makes designs smell like they were AI.

Sometimes a negative result is just as interesting as a positive result. I went multiple rounds with Opus 5.5 and the same thing occurred - "bad" became "old".

**Archived October 2026**

---

Run with Hugo:

```sh
npm ci && hugo server   # preview
npm test                # everything CI runs
```
