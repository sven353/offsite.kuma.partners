# The Barcelona Offsite Configurator

A single-page, 5-step interactive configurator for offsite.kuma.partners. Pure HTML/CSS/vanilla JS, no build step, no framework, no bulky dependencies.

## Files

- `index.html` — page shell, header, progress bar, and a hidden static copy of the lead form so Netlify's build bot can detect it.
- `styles.css` — all styling. Design tokens (colors, fonts, hairline rules) are pulled directly from the live www.kuma.partners stylesheet, not invented.
- `app.js` — step data, state management, navigation, blueprint compilation logic, and form submission.
- `netlify.toml` — build/publish config and security headers.
- `robots.txt` — allows indexing.
- `assets/` — logo and favicon pulled from the live site.

## How the blueprint logic works

Each of the 5 steps stores one selection (`archetype`, `tension`, `setting`, `hospitality`, `facilitation`). After step 5, `app.js` compiles a title, four summary pills, and four detail blocks from a lookup table keyed by the tension + setting combination (see `TITLE_MATRIX` and `DELIVERABLE_MATRIX` near the top of `app.js`). Adjust the copy there directly, no other file needs to change.

## Lead capture

The form posts to Netlify Forms (native, no third-party service required since this is already deploying on Netlify). Submissions appear under **Site configuration → Forms** in the Netlify dashboard, and you can wire up email notifications there (Forms → your form → Settings → Form notifications).

If you'd rather route leads to Make.com, Zapier, or Formspree instead, change the `fetch("/", ...)` call inside `onSubmitLeadForm` in `app.js` to POST to that service's endpoint URL, and remove the two `data-netlify` form declarations (one in `index.html`, one rendered by `app.js`) since they're only needed for Netlify's native handling.

## One thing flagged for review

The original brief's header lockup text included a placeholder second brand name (`KUMA PARTNERS × NONAMEYET`) that reads like an unfilled template field. This build ships with just `KUMA PARTNERS` in the header until you confirm what, if anything, belongs after it.

## Deploying

This repo is already connected to Netlify via continuous deployment, and offsite.kuma.partners is already pointed at it. If you're pushing manually rather than through a connected local clone:

1. On GitHub, open `sven353/offsite.kuma.partners`.
2. Use **Add file → Upload files**, and drag in the loose contents of this folder (not the folder itself), so `assets/` lands at the repo root alongside `index.html`.
3. Commit directly to `main`.
4. Netlify picks up the push automatically and redeploys, usually within a minute or two. Watch progress under **Deploys** in the Netlify dashboard.
5. Once live, open **Site configuration → Forms** in Netlify to confirm the `offsite-blueprint` form was detected. If it doesn't show up, the most common cause is the hidden `<form>` in `index.html` getting stripped or edited, redeploy with it intact.

No GitHub Pages or Vercel setup is needed since Netlify is already the live target for this domain.
