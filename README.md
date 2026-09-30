# Msurshima Nzouke — UGC portfolio (static site)

A dependency-free rebuild of the Framer site at https://msurshimaugc.framer.website/ so it can be edited and deployed without Framer credits.

Live: https://msurshimanzouke.github.io/ (GitHub Pages, org site `msurshimanzouke/msurshimanzouke.github.io`). Resume: https://msurshimanzouke.github.io/resume/ (HTML + PDF). Outreach template: `outreach/email-template.md`.

## Files
- `index.html` — page structure and all copy (left column: profile, about, services, stack, experience, testimonials, contact).
- `css/styles.css` — dark theme, Switzer font (loaded from Fontshare), sticky sidebar, two-column 9:16 video grid.
- `js/data.js` — the video list. Add, remove or re-order videos here. Each entry needs `id` (the TikTok video id), `category` (`skincare`, `fashion`, `beauty` or `lifestyle`) and `title`. Set `featured: true` to pin it to the top of its section.
- `js/app.js` — renders the sections, handles the filter pills, and opens the official TikTok embed (`tiktok.com/embed/v2/<id>`) in a modal when a card is clicked.
- `assets/thumbs/<id>.jpg` — one cover image per video, pulled from TikTok on 2026-09-29 and downscaled to 720px. When you add a video to `data.js`, drop its cover here with the same id (or run `scripts/fetch-thumbs.py`).
- `assets/avatar.jpg` — square profile photo (640px).
- `assets/logos/` — `tool-*.png` are the official App Store icons for the six tools in the Stack section; `brand-*` are the brands' own logo files (wordmarks from Wikimedia Commons or the brand's site), rendered white on dark via a CSS filter in the Brands section. To add a brand, drop a transparent-background logo here and add an `<li>` in `index.html`.

## Run locally
Any static server works, for example:

```bash
cd site && python3 -m http.server 8080
```

Then open http://localhost:8080. Embeds need a real http origin, so don't open `index.html` as a `file://` URL.

## Deploy
Drag the `site` folder into Netlify Drop, or push it to GitHub and enable Pages, or run `vercel` inside the folder. No build step.

## Known behaviour of TikTok embeds
- TikTok's embed endpoint (`tiktok.com/embed/v2/<id>`) returned "Internal Server Error" on roughly one request in five during testing, for any video. The modal has a **Retry** button and an **Open on TikTok** link for that case.
- First-time visitors in the EU see TikTok's cookie prompt inside the player. That is TikTok's, not ours, and cannot be suppressed.
- Framer's original site used `tiktok.com/player/v1/`, which is what was showing "Access Denied". `embed/v2` is the supported public embed.

## Custom domain
GitHub Pages supports a custom domain. After buying one (e.g. msurshimaugc.com), add a file named `CNAME` at the repo root containing just the domain, then at the registrar add four A records for the apex pointing to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, and a CNAME record for `www` pointing to `msurshimanzouke.github.io`. Then tick "Enforce HTTPS" in the repo's Pages settings once the certificate is issued.

## To-do before going live
- Confirm the contact email and Instagram link in the footer of `index.html` (Instagram currently points to instagram.com).
- Replace the two placeholder testimonials with real quotes, or delete that section.
- Swap in real stats under "About me" if 30+ brands / 150+ videos are not accurate.
