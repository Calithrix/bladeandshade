# Blade and Shade — agent maintenance playbook

This file is for **AI agents and human editors** who maintain the live static site. Read it before any edit. If something is ambiguous, stop and ask.

## Owner

- **Day-to-day site edits:** Bre’s Bot (Matthew’s wife Bre’s assistant)
- **Escalation:** All-Day (Matthew’s Chief of Staff) for DNS, hosting, architecture, or restoring stomped edits

Matthew owns the repo. Bre owns business copy, photos, and how she takes bookings (currently by phone, on paper — no Square Appointments). Do not treat this playbook as permission to change infrastructure.

## Stack

| Item | Fact |
|---|---|
| Repo | This repo (`Calithrix/bladeandshade`) |
| Production source of truth | `main` |
| Site path | `site/` — static HTML, no build step |
| Host | Cloudflare Pages Free — auto-deploys on push to `main` |
| Live URLs | https://www.bladeandshadepmu.com and https://bladeandshade.pages.dev |
| Domain registrar | **Squarespace Domains** (not Register.com anymore) |
| DNS | `www` CNAME → `bladeandshade.pages.dev` |
| Apex | Should forward to `https://www.bladeandshadepmu.com` |
| Mail | Keep Google MX + mail A records |

Preview locally (does not replace reading latest `main`):

```bash
cd site
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/

## Standing rules

Follow these as written:

1. Always pull/read latest `main` before any edit — never edit from a stale copy.
2. Change only what was asked — never rewrite surrounding content.
3. Never overwrite Matthew’s or Bre’s edits — check git history / restore if stomped.
4. Ask before ambiguous changes.
5. Keep the site simple so Bre/Matthew can edit HTML themselves.

Practical implications:

- Fetch current `main` (`git pull` / read files from latest `main`) **before** opening or editing files. Recent contact-page copy has already been stomped and restored more than once.
- If a requested change would replace copy Matthew or Bre wrote (headings, appointment instructions, footer legal line, prices, policies), stop. Diff against git history. Restore their version if an agent overwrote it.
- Do not “improve” voice, layout, or nearby paragraphs while fixing one line.
- Do not introduce a build step, CMS, framework, or design-system rewrite.

## Architecture notes agents always miss

### Shared footer

Edit **only** `site/partials/footer.html`.

Pages mount `<div id="site-footer"></div>`. `site/assets/js/site.js` fetches and injects that partial. Do **not** paste a full footer back into each HTML page.

If a page is missing the mount point, add the placeholder + `site.js` — do not inline the footer markup.

### Contact page (verify on `main` before changing)

Current copy (Matthew):

- `h1` is `Contact Me!`
- Appointment line says reach by **phone** (currently: “The best way to schedule an appointment is to reach me by phone!”)

Do not “correct” this to Contact Us, drop the exclamation point, or switch phone back to text without an explicit ask. **Verify the exact strings on latest `main` before editing** — they have changed.

### Book links

Book now / Book an appointment point to `contact.html` permanently. Bre is done with Square Appointments and books on paper; clients reach her by phone. There is no online booking system, and adding one would be needless overhead.

- Do **not** add an online booking system, embed, or calendar (Square, Squarespace Scheduling, Calendly, or otherwise).
- Do **not** invent or restore a Square URL (`squareup.com`, `square.site`, `/s/appointments`, or otherwise). The old `/s/appointments` path is dead; leave it.
- Only change where Book links go if Bre or Matthew explicitly asks.

### Footer legal line

Currently:

`Blade and Shade Customized Brows.`

Do not add a Square Appointments booking or Afterpay line to the footer. The home-page Afterpay section was removed (2026-09-12) — do not restore it unless Bre or Matthew asks.

### Location

**Never put Carmel, IN on the site.** The business is at Jeannie’s Salon & Spa, 1762 Niles Cortland Rd NE, Warren, OH 44484. Older Carmel listings for this domain are stale.

## How to ship

1. Read the exact files from latest `main` (not a stale checkout or memory of last week’s copy).
2. Make the smallest possible diff. Touch only the files that must change.
3. Prefer a pull request for anything non-trivial (copy changes across pages, booking URL changes, CSS/JS, anything structural). Tiny typo/phone fixes can still go through a PR if there is any doubt.
4. After merge, Cloudflare Pages rebuilds from `main`. Verify the live URLs:
   - https://www.bladeandshadepmu.com
   - https://bladeandshade.pages.dev

Check the requested page **and** any shared surface you touched (nav Book now, footer, contact). Confirm you did not stomp someone else’s edit.

## Out of scope for routine maintenance

Do **not** do these as day-to-day site work. Escalate to All-Day:

- Moving the domain registrar
- Cloudflare account changes (project, custom domains, DNS, nameservers, billing)
- Rewriting the whole design system
- Changing Google MX / mail A records
- Disconnecting or reconnecting the domain at the registrar without an explicit infra request
