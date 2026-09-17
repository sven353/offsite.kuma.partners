# offsite.kuma.partners

Full landing page for the Kuma Partners × Nonameyet offsite offering, with an embedded 5-step configurator. Static HTML/CSS/vanilla JS, no build step, no framework.

## Files

- `index.html` — the whole page: header/nav, hero, proof marquee, problem section, three formats, the configurator, the operators section, footer, plus a hidden static duplicate of the lead form for Netlify's form detection.
- `styles.css` — this is the **real, unmodified stylesheet from www.kuma.partners**, copied verbatim (not rewritten). Every class this page uses (`.hero`, `.problem-grid`, `.tier-grid`, `.tier-featured`, `.scorecard-card`, `.scorecard-option`, `.partner-grid`, `.footer-grid`, `.footer-hubs`, button variants, etc.) comes from this file as-is.
- `configurator.css` — supplementary only. It adds the handful of things the real stylesheet doesn't already have: the co-branded header lockup (`.logo-lockup-jv`, `.jv-sep`, `.jv-brand`), a 4-column variant of `.problem-grid` (the live site only ever uses 3), a photo slot on top of `.tier-card` for the format cards, the monospace step-numbering prefix inside the configurator, and the blueprint output layout. Nothing in here duplicates or overrides what's already in `styles.css`.
- `app.js` — two things in one file: the same header-scroll-state and mobile-nav-toggle behavior as the live site's `site.js` (reproduced here since it can't be linked cross-origin), and the configurator itself (step data, state, blueprint compilation, Netlify Forms submission).
- `assets/` — logo lockup and favicon (pulled from the live site), three format photos, and four photos for the "Inside the room" strip.

## Reused vs. new

Nearly everything on this page reuses classes that already exist in the real site's CSS: `.scorecard-card` / `.scorecard-progress` / `.scorecard-option` power the configurator (it's the same component pattern as the live site's own Leadership Friction Scorecard), `.tier-grid` / `.tier-featured` power the three formats, `.partner-grid.partner-grid-2col` powers the operators section, `.offsite-proof-grid` powers the photo strip, `.debrief-form` styling powers the lead capture fields. `configurator.css` only fills genuine gaps, it never redefines something `styles.css` already handles.

## How the blueprint logic works

Each of the 5 steps stores one selection (`archetype`, `tension`, `setting`, `hospitality`, `facilitation`) in `app.js`. After step 5, it compiles a title, four pill tags, and four spec rows from two lookup tables: `TITLE_MATRIX` (keyed by `[tension][setting]`, 12 hand-written title combinations) and `DELIVERABLE_MATRIX` (keyed by tension, 4 deliverable phrases). Edit those tables directly to change the blueprint copy, nothing else needs to change.

## Lead capture

Posts to Netlify Forms natively (no third-party webhook, since the site is already on Netlify). Submissions appear under **Site configuration → Forms** in the Netlify dashboard. Set up email notifications there under Forms → your form → Settings.

## One thing flagged, not resolved

Every "Nonameyet" in this build (header lockup, footer copyright, the second operator's firm name) is shipped exactly as specified in the brief. Flagging it here in case it's still a placeholder rather than the final co-brand name, since it now appears in several places and would need updating everywhere at once if it changes.

## Deploying

Already connected to Netlify via continuous deployment from `sven353/offsite.kuma.partners`, and offsite.kuma.partners is already pointed at it. To push manually:

1. Extract this zip locally.
2. On GitHub, open the repo and use **Add file → Upload files**, dragging in the loose contents of the extracted folder (not the folder itself), so `assets/` lands at the repo root alongside `index.html`.
3. Commit directly to `main`.
4. Netlify redeploys automatically, usually within a minute or two.
5. Once live, check **Site configuration → Forms** in Netlify to confirm the `offsite-blueprint` form was detected.
