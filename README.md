# offsite.kuma.partners

Full landing page for the Kuma Partners × Nonameyet offsite offering, with an embedded 5-step configurator. Static HTML/CSS/vanilla JS, no build step, no framework.

## Files

- `index.html` — the whole page: header/nav, hero, proof marquee, problem section, formats ("Who will join us"), places ("Three Places to Go"), engagement models ("Three Ways to Work With Us"), the configurator, the operators section, footer, plus a hidden static duplicate of the lead form for Netlify's form detection.
- `styles.css` — this is the **real, unmodified stylesheet from www.kuma.partners**, copied verbatim (not rewritten). Every class this page uses (`.hero`, `.problem-grid`, `.tier-grid`, `.tier-featured`, `.scorecard-card`, `.scorecard-option`, `.partner-grid`, `.footer-grid`, `.footer-hubs`, button variants, `.field`/`.field-row`/`.select-shell`, etc.) comes from this file as-is.
- `configurator.css` — supplementary only. It adds the handful of things the real stylesheet doesn't already have: the co-branded logo lockup (real Kuma mark image + hairline divider + "NONAMEYET" text), the photo cards in the places grid, a photo slot on top of `.tier-card` for the format cards, the monospace step-numbering prefix inside the configurator, and the blueprint output layout. Nothing in here duplicates or overrides what's already in `styles.css`.
- `app.js` — two things in one file: the same header-scroll-state and mobile-nav-toggle behavior as the live site's `site.js` (reproduced here since it can't be linked cross-origin), and the configurator itself (step data, state, blueprint compilation, Netlify Forms submission). Also wires up the "Build this format" buttons in the formats section to scroll straight to the configurator.
- `assets/` — the real Kuma Partners logo lockup and favicon, three format photos (slowing-down offsite, strategy-to-execution offsite, company offsite), and `assets/environments/` with the three places photos (Barcelona loft, Catalan Masia, vineyard estate).

## Reused vs. new

Nearly everything on this page reuses classes that already exist in the real site's CSS: `.scorecard-card` / `.scorecard-progress` / `.scorecard-option` power the configurator (it's the same component pattern as the live site's own Leadership Friction Scorecard), `.tier-grid` / `.tier-featured` power both the formats and engagement-models sections, `.problem-grid` / `.problem-col` power the problem section's 3-card row, `.problem-stat` / `.problem-stat-figure` / `.problem-stat-narrative` power the 65% stat lockup at the top of the problem section (this component already existed in the real stylesheet, unused until it was wired in here), `.partner-grid.partner-grid-2col` powers the operators section, `.debrief-form` / `.field` / `.field-row` / `.select-shell` power the lead capture form. `configurator.css` only fills genuine gaps, it never redefines something `styles.css` already handles. The places grid (`.places-grid` / `.place-card`) is the one section built from scratch in `configurator.css`, since nothing in the real stylesheet already does a photo-topped card grid — it follows the same visual language as `.tier-card` (white fill, hairline border, 2px radius, hover lift) rather than inventing a new look.

## The header/footer logo

The header and footer lockup is three real pieces laid out side by side, not a pre-composited image: the actual Kuma Partners logo file (`assets/logo-lockup.png`, pulled from the live site, transparent PNG), a 1px hairline divider, and a plain-text "NONAMEYET" wordmark (Montserrat, underlined). Two of the colors here are deliberate one-offs rather than reuses of `--teal`/`--hairline-color`, called out in the CSS comments: the divider is `#D5D0C7` (slightly warmer than the site's usual hairline so it reads against the frosted header) and the wordmark is `#385E66` (a touch deeper than `--teal`), both matching the reference lockup Sven supplied rather than the closest existing token.

## How the blueprint logic works

Each of the 5 configurator steps stores one selection (`archetype`, `tension`, `setting`, `hospitality`, `facilitation`) in `app.js`. After step 5, it compiles a title, four pill tags, and four spec rows from two lookup tables: `TITLE_MATRIX` (keyed by `[tension][setting]`, 12 hand-written title combinations) and `DELIVERABLE_MATRIX` (keyed by tension, 4 deliverable phrases). Edit those tables directly to change the blueprint copy, nothing else needs to change.

The three "Build this format" buttons in the formats section (`data-select-format="slow-down" | "strategy-execution" | "company-offsite"`) currently just scroll to the configurator — they don't yet pre-fill a step. Wiring a format choice to a pre-selected `archetype`/`tension` combination would be a small follow-up in `app.js` if wanted.

## Lead capture

Posts to Netlify Forms natively (no third-party webhook, since the site is already on Netlify). The form now collects work email, full name, role/title, company name, target quarter, and approximate budget, all required. Submissions appear under **Site configuration → Forms** in the Netlify dashboard. Set up email notifications there under Forms → your form → Settings.

## One thing flagged, not resolved

Every "Nonameyet" in this build (header lockup, footer copyright, the second operator's firm name) is shipped exactly as specified in the brief. Flagging it here in case it's still a placeholder rather than the final co-brand name, since it now appears in several places and would need updating everywhere at once if it changes.

## Deploying

Already connected to Netlify via continuous deployment from `sven353/offsite.kuma.partners`, and offsite.kuma.partners is already pointed at it. To push manually:

1. Extract this zip locally.
2. On GitHub, open the repo and use **Add file → Upload files**, dragging in the loose contents of the extracted folder (not the folder itself), so `assets/` lands at the repo root alongside `index.html`.
3. Commit directly to `main`.
4. Netlify redeploys automatically, usually within a minute or two.
5. Once live, check **Site configuration → Forms** in Netlify to confirm the `offsite-blueprint` form picked up the new `role` and `budget` fields alongside the existing ones.
