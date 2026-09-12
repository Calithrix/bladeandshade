# Blade and Shade

This is the designated repo for Bre’s Blade and Shade (bladeandshadepmu.com). `main` is the source of truth for the static site that replaces Square Online.

The live Square site is a brochure plus booking, not a store. Square’s 2026 Plus plan (~$49–$50/month) is what you pay to keep a custom domain on their website builder. The domain already lives at Register.com, so that fee is avoidable. This repo is the cheaper replacement.

## What’s here

| Path | What it is |
|---|---|
| `site/` | The production static website (no build step) |
| `site/index.html` | Home |
| `site/portfolio.html` | Before/after gallery |
| `site/services.html` | Service list and prices |
| `site/faqs.html` | FAQs, verbatim from the live site |
| `site/info.html` | Essential client policies |
| `site/testimonials.html` | Three Google reviews, unnamed, 5/5 |
| `site/contact.html` | Phone, email, Facebook, address |
| `site/assets/` | Logo, photos, CSS, JS |

There is no app server, cart, or CMS. Open the HTML and it works.

## Business facts 

- **Name:** Blade and Shade / Blade and Shade Customized Brows
- **Artist:** Bre / Breanna Konopka
- **Location:** Jeannie’s Salon & Spa, 1762 Niles Cortland Rd NE, Warren, OH 44484
- **Phone:** 330-609-9109
- **Email:** brekonopka01@gmail.com
- **Facebook:** https://www.facebook.com/profile.php?id=61559056214686
- **Hours on site:** “Open until 7:00 pm” (no full weekly grid)
- Older Carmel, IN listings for this domain are stale. Do not put Carmel on the site.

### Services

| Service | Price | Duration | Notes |
|---|---|---|---|
| Combination Brow | $350 | 3 hrs 30 mins | First initial touchup included |
| Microblade | $325 | 2 hrs 30 mins | First initial touchup included |
| Ombré/Powder Brow | $325 | 3 hrs | First initial touchup included |
| Cover Up | $275 | 3 hrs | Typically powder brow technique |
| Color Correction | $225 | 3 hrs | No extra description on the live site |
| Touchup | $125 | 2 hrs | Annual recommended, not required |
| Consultation | Free | 30 min | Recommended, not required |

### Policies that must stay

- Book at least 3 days ahead. Date can be adjusted after the medical form.
- $50 deposit to secure; applied to the service; refundable if not a PMU candidate. Appointment is not confirmed until the deposit invoice is paid.
- Google medical form before the appointment.
- Pre-care PDF after booking.
- 18+ (parent/guardian if a medical or hair-loss exception for a minor).
- Consent signed in person.
- $100 no-show if they do not reschedule or notify.
- Afterpay is advertised on the current site; keep a short mention while Square checkout still offers it.

Copy on FAQs, policies, reviews, and service descriptions should stay verbatim unless Bre asks for a rewrite.

## Booking stays on Square (for now)

Do **not** cancel Square Appointments. Only the $49/month Square Online *website* is being replaced.

`Book now` currently goes to:

https://www.bladeandshadepmu.com/s/appointments

That path is hosted by Square. After DNS leaves Square, that URL will 404 unless we either:

1. Point Book now at the Square Appointments link from her dashboard (squareup.com / square.site), or
2. Add a redirect from `/s/appointments` to that link.

Until that is confirmed in her Square dashboard, leave the current booking URL in place.

Deposits and Afterpay still go through Square payments on the Free plan (online card rate on this site was already showing 3.3% + 30¢). Paying Plus does not obviously pay for itself on processing alone.

## Preview locally

```bash
cd site
python3 -m http.server 8080
```

Open http://127.0.0.1:8080/

No install, no build. `npx serve site` also works.

## Deploy (free)

### Cloudflare Pages (preferred)

1. Cloudflare → Workers & Pages → Create → Pages → Connect to Git → this repo.
2. Production branch: `main`
3. Framework preset: None
4. Build command: empty
5. Output directory: `site`
6. Confirm the `*.pages.dev` URL.
7. Custom domains: `www.bladeandshadepmu.com` and `bladeandshadepmu.com`.

### GitHub Pages

1. Settings → Pages → Deploy from a branch
2. Branch: `main` / folder `/site`
3. Temporary URL: `https://calithrix.github.io/bladeandshade/`

## Point the domain (Register.com)

- Registrar: Register.com
- Expires: **2026-10-09** — renew before then
- Today: DNS still aims at Square/Weebly (`dns1/dns2.register.com`, Square IPs)

After the Pages project is live:

1. Add `www` CNAME to the Pages hostname Cloudflare or GitHub gives you.
2. Point the apex (`@`) with the A/AAAA records they list, or move nameservers to Cloudflare and let it flatten the apex.
3. Wait for TLS.
4. Disconnect the domain inside Square Online so Plus is no longer serving the public site.
5. Then drop the Square Online Plus subscription. Keep Square Appointments / payments if she still wants that calendar.

TTL 300–600 seconds while testing.

## What this is not

- Not a Shopify/Square store
- Not a gift-card or Instagram-feed project
- Not a reason to pay Wix/Squarespace
- Not a rewrite of Bre’s voice

## Contact for cutover

Matthew owns this repo. Bre owns the business copy, photos, and whether booking stays on Square. Domain DNS is the last human step.
