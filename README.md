# Msurshima Nzouke — UGC portfolio (static site)

A dependency-free rebuild of the Framer site at https://msurshimaugc.framer.website/ so it can be edited and deployed without Framer credits.

## Files
- `index.html` — page structure and all copy (left column: profile, about, services, stack, experience, testimonials, contact).
- `css/styles.css` — dark theme, Switzer font (loaded from Fontshare), sticky sidebar, two-column 9:16 video grid.
- `js/data.js` — the video list. Add, remove or re-order videos here. Each entry needs `id` (the TikTok video id), `category` (`skincare`, `fashion`, `beauty` or `lifestyle`) and `title`. Set `featured: true` to pin it to the top of its section.
- `js/app.js` — renders the sections, handles the filter pills, and opens the official TikTok embed (`tiktok.com/embed/v2/<id>`) in a modal when a card is clicked.
- `assets/thumbs/<id>.jpg` — one cover image per video, pulled from TikTok on 2026-09-29 and downscaled to 720px. When you add a video to `data.js`, drop its cover here with the same id (or run `scripts/fetch-thumbs.py`).
- `assets/avatar.jpg` — **missing, add it.** Drop a square profile photo here. Until then the slot shows a dark gradient.

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

## To-do before going live
- Add `assets/avatar.jpg`.
- Confirm the contact email and Instagram link in the footer of `index.html` (Instagram currently points to instagram.com).
- Replace the two placeholder testimonials with real quotes, or delete that section.
- Swap in real stats under "About me" if 30+ brands / 150+ videos are not accurate.
