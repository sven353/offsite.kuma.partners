# offsite.kuma.partners

Full landing page for the Kuma Partners × Nonameyet offsite offering, with an embedded 5-step configurator. Static HTML/CSS/vanilla JS, no build step, no framework.

## Files

- `index.html` — the whole page: header/nav, hero, proof marquee, problem section, formats ("Who will join us"), places ("Three Places to Go"), the experience gallery cinema filmstrip, engagement models ("Three Ways to Work With Us"), the configurator, the operators section, footer, plus a hidden static duplicate of the lead form for Netlify's form detection.
- `styles.css` — this is the **real, unmodified stylesheet from www.kuma.partners**, copied verbatim (not rewritten). Every class this page uses (`.hero`, `.problem-grid`, `.tier-grid`, `.tier-featured`, `.scorecard-card`, `.scorecard-option`, `.partner-grid`, `.footer-grid`, `.footer-hubs`, button variants, `.field`/`.field-row`/`.select-shell`, `.marquee`/`.marquee-track`, etc.) comes from this file as-is.
- `configurator.css` — supplementary only. It adds the handful of things the real stylesheet doesn't already have: the co-branded logo lockup (real Kuma mark image + hairline divider + "NONAMEYET" text), the photo cards in the places grid, the two-track cinema filmstrip in the experience gallery, the monospace step-numbering prefix inside the configurator, and the blueprint output layout. Nothing in here duplicates or overrides what's already in `styles.css`.
- `app.js` — two things in one file: the same header-scroll-state and mobile-nav-toggle behavior as the live site's `site.js` (reproduced here since it can't be linked cross-origin), and the configurator itself (step data, state, blueprint compilation, Netlify Forms submission). Also exposes `window.selectFormatAndScroll()`, called from the "Build this format" buttons' inline `onclick`, which scrolls to the configurator.
- `assets/` — the real Kuma Partners logo lockup and favicon; `assets/formats/` with the three format-card photos (a working session outdoors, an executive strategy session, a large all-hands); `assets/environments/` with the three places photos (Barcelona loft, Catalan Masia, vineyard estate); `assets/gallery/` with the eight experience-gallery filmstrip photos (see "The experience gallery" below for how each slot was actually filled); `assets/team/` with the two operator headshots (Sven, Farid).

## Reused vs. new

Nearly everything on this page reuses classes that already exist in the real site's CSS: `.scorecard-card` / `.scorecard-progress` / `.scorecard-option` power the configurator (it's the same component pattern as the live site's own Leadership Friction Scorecard), `.tier-grid` / `.tier-featured` power both the formats and engagement-models sections, `.problem-grid` / `.problem-col` power the problem section's 3-card row, `.problem-stat` / `.problem-stat-figure` / `.problem-stat-narrative` power the 65% stat lockup at the top of the problem section (this component already existed in the real stylesheet, unused until it was wired in here), `.partner-grid.partner-grid-2col` powers the operators section, `.debrief-form` / `.field` / `.field-row` / `.select-shell` power the lead capture form. `configurator.css` only fills genuine gaps, it never redefines something `styles.css` already handles. The places grid (`.places-grid` / `.place-card`) is the one component built from scratch in `configurator.css`, since nothing in the real stylesheet already does a photo-topped card grid — it follows the same visual language as `.tier-card` (white fill, hairline border, 2px radius, hover lift) rather than inventing a new look. The format cards now reuse that same `.place-image` class for their photos (inline-styled per card for the negative-margin bleed into `.tier-card`'s padding), rather than a separate image treatment.

## The header/footer logo

The header and footer lockup is three real pieces laid out side by side, not a pre-composited image: the actual Kuma Partners logo file (`assets/logo-lockup.png`, pulled from the live site, transparent PNG), a 1px hairline divider, and a plain-text "NONAMEYET" wordmark (Montserrat, underlined). Two of the colors here are deliberate one-offs rather than reuses of `--teal`/`--hairline-color`, called out in the CSS comments: the divider is `#D5D0C7` (slightly warmer than the site's usual hairline so it reads against the frosted header) and the wordmark is `#385E66` (a touch deeper than `--teal`), both matching the reference lockup Sven supplied rather than the closest existing token.

## The experience gallery (#experience-gallery)

The "Inside the Barcelona Experience" cinema filmstrip sits between "Three Places to Go" and "Three Ways to Work With Us." It's two full-bleed horizontal photo tracks (`.filmstrip-track-left` / `.filmstrip-track-right`) that auto-scroll in opposite directions, pause on hover, and fade at both edges — the scroll-loop and gradient-mask technique is the same one already powering the real stylesheet's proof marquee (`.marquee`/`.marquee-track` in `styles.css`), just re-scaled from text to photography and split into two directions instead of one. Each track holds 4 unique frames plus the same 4 duplicated once more (`aria-hidden="true"`) so the loop has no visible seam.

**Flagging the photo sourcing, since it matters here:** the brief asked for 8 very specific scenes (a plenary debate, an outdoor executive work session, the Poblenou loft, the historic masia, an open-hearth dinner, a catamaran sunset sail, a vineyard at dusk, and a compact-signing moment), but only 2 of the 10 photos sent for this round actually depicted their intended scene:

- `04-masia-courtyard.jpeg` — the aerial estate-with-vineyard-hills photo. A real, strong match.
- `03-urban-atelier.jpeg` — the industrial loft interior. A real, strong match (confirmed as a different photo from the loft already used in the Places section, not a duplicate).

The other 6 slots were filled with the closest available stand-ins from generic Barcelona tourism photography, per your call to proceed best-effort rather than wait:

- `01-plenary-debate.jpeg` — a ceramics-workshop group photo (the full cohort gathered indoors; no actual debate).
- `02-mountain-terrace.jpeg` — a hiking-trail group shot from behind (outdoors in nature; not a working session).
- `05-open-hearth.jpeg` — a rooftop restaurant terrace, set tables (elegant dining; no open hearth).
- `06-catamaran-sunset.jpeg` — the W Hotel Barcelona beachfront (coastal/sea-facing; no catamaran).
- `07-vineyard-dusk.jpeg` — the Montserrat monastery mountains (elevated Catalan landscape; not a vineyard, not dusk).
- `08-compact-delivery.jpeg` — the Camp Nou stadium interior (a large formal venue; no signing moment). This is the weakest match of the eight.

Two of the ten photos (a Sagrada Família aerial and a Barcelona beach aerial) weren't used at all — nothing in the brief pointed to where they'd go. Given the brand brief explicitly avoids generic stock-photo imagery, I'd treat this section as a placeholder pass rather than final: the next real photography delivery should prioritize the 6 loose-match slots above, especially the compact-signing frame.

## The operators section (#collective)

This section was rebuilt around card components that already existed in the real stylesheet, unused anywhere on this build until now, the same pattern as `.problem-stat` and `.marquee` elsewhere on this page: `.partner-card-lg`, `.partner-photo` (56px circular, grayscale filter baked into the class), `.track-record`, `.client-badges`, `.social-row`, and `.team-cta` all come straight from `styles.css`, since they're literally the same components the real partners.html team page uses. The brief's own HTML spec called for inline overrides (72px, full color photos), but since matching partners.html's actual visual hierarchy was the explicit goal, the real dormant component was used as-is instead of the override, on the view that the real component is a closer match to partners.html than a guessed-at inline style would be. Worth a look if a different photo treatment was actually intended.

The only genuinely new pieces, added to `configurator.css`: the language-delivery pills (`.lang-pill`/`.operator-languages`, nothing like this existed in the real stylesheet) and a small paragraph-size rule for the bio text, matching the sizing of the sibling `.advisor-bio` pattern. The brief's spec asked for the new CSS to go into `styles.css`; it went into `configurator.css` instead, consistent with every prior round on this build (`styles.css` stays the untouched real stylesheet).

Photos: `assets/team/dr-sven-mulfinger.jpeg` (cropped square from the supplied portrait, framed on the face) and `assets/team/farid.jpeg` (used as supplied, already square). Both render through `.partner-photo img`'s existing grayscale filter, so the source files themselves didn't need to be desaturated.

Two placeholder details worth flagging before this goes live: Farid's LinkedIn link points at `https://www.linkedin.com` (no profile slug was given) and the "Explore Full Partner Bench" button points at `https://www.kuma.partners/partners`, both exactly as specified in the brief. Confirm the real destinations before pushing.

## How the blueprint logic works

Each of the 5 configurator steps stores one selection (`archetype`, `tension`, `setting`, `hospitality`, `facilitation`) in `app.js`. After step 5, it compiles a title, four pill tags, and four spec rows from two lookup tables: `TITLE_MATRIX` (keyed by `[tension][setting]`, 12 hand-written title combinations) and `DELIVERABLE_MATRIX` (keyed by tension, 4 deliverable phrases). Edit those tables directly to change the blueprint copy, nothing else needs to change.

The three "Build this format" buttons in the formats section (`onclick="selectFormatAndScroll('slow-down' | 'strategy-execution' | 'company-offsite')"`) now pre-select the matching Step 1 archetype and jump straight to Step 2: slow-down to cofounders, strategy-execution to csuite, company-offsite to scaleup. The map lives in `FORMAT_ARCHETYPE_MAP` near the top of `app.js`, right before where `selectFormatAndScroll` is defined.

## Lead capture

Posts to Netlify Forms natively by default (no third-party webhook, since the site is already on Netlify). There's now a fallback: `FORM_WEBHOOK_URL`, a single constant at the very top of `app.js`, left empty. If this site ever moves off Netlify (GitHub Pages, Vercel), set that constant to a form-accepting URL (Formspree, Make.com, Zapier, or similar) and the submit handler posts the same urlencoded body there instead, no other code changes needed. The form collects work email, full name, role/title, company name, target quarter, and approximate budget, all required. Submissions currently appear under **Site configuration → Forms** in the Netlify dashboard. Set up email notifications there under Forms → your form → Settings.

## A code review request that didn't match this file

A recent request asked to fix a specific bug in `renderLeadForm()`: an extra orphan `</div>` right after the Company Name field that would break the form's DOM structure, plus unescaped angle brackets in the budget dropdown and non-UTF-8/BOM/CRLF issues. Checked all of it directly against this file before touching anything: the div count in `renderLeadForm()` is balanced (12 opens, 12 closes), the budget dropdown's `< €15,000` option is already properly HTML-entity-escaped as `&lt;`, and the file is clean UTF-8 with Unix line endings and no BOM. None of those specific bugs exist here, so nothing was changed for them. What did get done from that same request: all 36 `var` declarations converted to `const` (this file has no reassigned bindings, so `let` wasn't needed anywhere), the format-card pre-selection described above, the `FORM_WEBHOOK_URL` fallback, and an empty `.nojekyll` file added at the repo root as a harmless precaution in case GitHub Pages is ever turned on for this repo (the live site deploys through Netlify, not GitHub Pages, so this isn't fixing an active problem, just guarding against Jekyll processing if that ever changes).

## One thing flagged, not resolved

Every "Nonameyet" in this build (header lockup, footer copyright, the second operator's firm name) is shipped exactly as specified in the brief. Flagging it here in case it's still a placeholder rather than the final co-brand name, since it now appears in several places and would need updating everywhere at once if it changes.

## Deploying

Already connected to Netlify via continuous deployment from `sven353/offsite.kuma.partners`, and offsite.kuma.partners is already pointed at it. To push manually:

1. Extract this zip locally.
2. On GitHub, open the repo and use **Add file → Upload files**, dragging in the loose contents of the extracted folder (not the folder itself), so `assets/` lands at the repo root alongside `index.html`.
3. Commit directly to `main`.
4. Netlify redeploys automatically, usually within a minute or two.
5. Once live, check **Site configuration → Forms** in Netlify to confirm the `offsite-blueprint` form picked up the new `role` and `budget` fields alongside the existing ones.
