# Blade and Shade — Maintenance

This file is the **current ops truth** for editing and hosting the site. If `README.md` disagrees (old registrar notes, Square booking URL, Afterpay footer line, etc.), **trust this file**.

Day-to-day owners: **Bre** and **Bre's Bot**.  
Escalations only (Chief of Staff / infra): **All-Day** (Matthew). Do not wait on All-Day for copy, photos, or prices.

---

## Standing edit rules

**Read these before every change. They are not optional.**

1. **Always pull / read latest `main` first.** Fetch a fresh copy from GitHub (`git pull origin main`, or a fresh API/tarball). **Never edit from a stale workspace copy.**
2. **Never overwrite or revert Bre’s or Matthew’s wording.** If copy looks stomped, check `git log` / `git blame` and restore their **exact** text.
3. **Change ONLY what was asked.** Do not rewrite surrounding copy, restructure pages, or “improve” unrelated files.
4. **Ask before touching anything ambiguous.** Guessing is how Contact headings and booking links get broken.
5. **Keep the site simple and human-editable.** Plain HTML / CSS / JS only. No frameworks, no CMS, no build step.
6. **Prefer small PRs to `main`** with clear commit messages. Direct commits to `main` only if that is already the team’s practice.

---

## Purpose

Maintain Bre’s Blade and Shade brochure site: services, portfolio, FAQs, policies, testimonials, and contact. Booking product stays on Square; the public website does **not**.

---

## Stack map

```
GitHub  Calithrix/bladeandshade   (source of truth: branch main)
        │
        │  push to main
        ▼
Cloudflare Pages  project: bladeandshade
        │  output directory: site/   (no build command)
        │
        ├─ Pages URL: https://bladeandshade.pages.dev/
        └─ custom:    https://www.bladeandshadepmu.com
```

**DNS (Squarespace Domains)**

| Host | Record | Target / behavior |
|---|---|---|
| `www` | CNAME | `bladeandshade.pages.dev` |
| apex `bladeandshadepmu.com` | forward | `https://www.bladeandshadepmu.com` (Squarespace) |
| mail | Google MX + mail A | **Do not delete** |

Live check (2026-09-12): `www` is Cloudflare Pages; apex returns Squarespace `302` to `https://www.bladeandshadepmu.com`.

---

## File map

Production files live under `site/`. There is no app server and no compile step.

| Path | What it is |
|---|---|
| `site/index.html` | Home |
| `site/portfolio.html` | Before/after gallery |
| `site/services.html` | Service list and prices |
| `site/faqs.html` | FAQs (keep verbatim unless Bre asks) |
| `site/info.html` | Essential client policies (keep verbatim unless Bre asks) |
| `site/testimonials.html` | Google reviews |
| `site/contact.html` | Phone, email, Facebook, address, form |
| `site/partials/footer.html` | **Only** shared footer — edit this file, nowhere else |
| `site/assets/js/site.js` | Mobile menu, footer inject, contact `mailto:` form |
| `site/assets/css/styles.css` | Site styles |
| `site/assets/img/` | Logo, favicons, hero, Afterpay graphic, `bre.jpg` |
| `site/assets/img/portfolio/` | Gallery photos (`p01.jpg` … `p11.jpg`) |

Every page mounts the footer with:

```html
<div id="site-footer"></div>
<script src="assets/js/site.js"></script>
```

`site.js` fetches `partials/footer.html` and replaces that div. If the fetch fails, it falls back to a one-line legal footer.

**Legal line (current):** `Blade and Shade Customized Brows.`  
Do **not** add a Square / Afterpay line back unless Bre asks.

---

## How to edit safely

1. Start from latest `main` (fresh clone/pull — not yesterday’s workspace).
2. Make a **surgical** diff: one ask, one change set.
3. If wording looks wrong, **check history first** (`git log -p -- path`) and restore Bre/Matthew text. Do not “fix” it.
4. Preview locally (optional):

   ```bash
   cd site
   python3 -m http.server 8080
   ```

   Open http://127.0.0.1:8080/ — needed to see the injected footer (`file://` will not fetch the partial).
5. Open a small PR to `main` (or follow existing team practice). Write a message that says **what** changed and **why**.

---

## How deploys work

1. Merge or push to **`main`**.
2. Cloudflare Pages project **bladeandshade** builds automatically.
3. Settings that must stay: **Framework preset: None**. **Build command: empty**. **Output directory: `site`**.
4. Production URLs update in a minute or two:
   - https://bladeandshade.pages.dev/
   - https://www.bladeandshadepmu.com

No `npm install`. No Wrangler deploy step for normal content edits.

---

## Current booking / contact (do not “fix” these)

- **Book now** (header, mobile nav, page CTAs, footer “Book an appointment”) currently points to **`contact.html`**. That is temporary. It is **not** the Square Appointments URL. Do not point it at `/s/appointments` or invent a `squareup.com` link unless Bre provides the dashboard URL.
- Contact heading is **`Contact Me!`** (with the bang). Do not change it.
- Latest contact intro: best way to schedule is **by phone**. Do not revert Matthew/Bre copy (including older “text to book” wording) unless they ask.

---

## Common tasks

### Update prices or services

Edit `site/services.html` (each `<article class="service">`: name, `.amt` price, `.meta` duration, description).  
If the home page teaser prices in `site/index.html` list the same service, update those numbers too — and **only** those numbers/labels that match the ask.  
Do not rewrite service descriptions unless Bre asked.

### Swap portfolio photos

1. Replace or add files in `site/assets/img/portfolio/` (keep short names like `p12.jpg`).
2. Add or update the matching `<img>` tags in `site/portfolio.html`.
3. Use descriptive `alt` text. Do not rearrange the gallery unless asked.

### Change contact copy

Edit `site/contact.html` only. Keep **Contact Me!** and the current phone-first scheduling line unless Bre explicitly changes them.  
The form in `site.js` opens `mailto:brekonopka01@gmail.com` — it does not store submissions.

### Edit the footer (once)

Edit **only** `site/partials/footer.html`.  
Do not paste a full `<footer>` back into the HTML pages. Do not change the `#site-footer` placeholder.

### Favicon / logo

| File | Used as |
|---|---|
| `site/assets/img/logo-header.png` | Header / footer mark |
| `site/assets/img/logo.png` | Full logo / `og:image` |
| `site/assets/img/favicon.ico` | Browser tab (`sizes="any"`) |
| `site/assets/img/favicon-32.png` | 32×32 PNG favicon |
| `site/assets/img/apple-touch-icon.png` | Apple touch icon |

Replace the file in place when possible so every page’s `<link>` / `<img>` paths stay the same. Extra sizes (`favicon-48.png`, `favicon-512.png`, `favicon.png`) exist in the folder — update those if you regenerate the set.

---

## What NOT to do

- **Do not invent a Carmel, IN address.** The studio is Jeannie’s Salon & Spa, 1762 Niles Cortland Rd NE, Warren, OH 44484. Older Carmel listings are stale.
- **Do not cancel Square Appointments.** Replacing Square Online (the website) is done. The calendar / deposits product stays unless Bre says otherwise.
- **Do not stomp `Contact Me!`** or rewrite the phone-first scheduling sentence.
- **Do not rewrite FAQs or policies verbatim** (`faqs.html`, `info.html`) unless Bre asks.
- **Do not delete Google MX or the mail A record.** Site DNS and email DNS are different jobs.
- **Do not add a Square/Afterpay line to the footer** unless Bre asks it back. Afterpay on the **home page** is existing marketing copy — leave it unless asked.
- **Do not introduce a framework, CMS, bundler, or build step.**
- **Do not “helpfully” retarget Book now** to a guessed Square URL.
- **Do not edit DNS, the Pages project, or the Squarespace domain** without an All-Day escalation.

---

## Escalation

**Bre / Bre's Bot** handle copy, photos, prices, footer text, and normal PRs.

**All-Day / Matthew** handle:

- DNS, Squarespace domain forwarding, Google MX / mail A
- Cloudflare Pages project settings, custom domains, TLS
- Anything that would take the site or email offline

If the live site and `main` disagree, stop and ask. Do not “reconcile” by rewriting Bre’s or Matthew’s words.
