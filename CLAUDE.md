# MeND Sourcing Solutions - Main Website

## Tech Stack
- Next.js 16 (App Router), Tailwind CSS, TypeScript
- Hosted on Railway, DNS on Cloudflare, domain on GoDaddy (mendsourcing.com)
- Contact form via Resend API + CRM integration
- Blog fetched from CRM database
- react-markdown + remark-gfm for blog rendering

## Pages (17 total)
| Route | Page | Type |
|---|---|---|
| `/` | Homepage | Static + client components |
| `/govscraper` | GovScraper product page | Client (demo form) |
| `/packaging-logistics` | GovPacking product page | Client (quote form) |
| `/govtraining` | GovTraining overview | Static |
| `/masterclass` | MasterClass details ($4,000) | Static |
| `/jumpstart` | Jumpstart details ($500) | Static |
| `/upcoming-courses` | Course listings | Static |
| `/government-contracting` | Aerospace Distribution | Static |
| `/government-defense-contracting` | Defense Contracting + lead form | Client |
| `/part-identifier` | Stock list + inventory | Static |
| `/about-us` | Mission, Vision, Team, Careers | Static |
| `/quality` | AS9100 & ISO9001 certs | Static |
| `/po-terms-conditions` | T&C link | Static |
| `/ppe-safety-distribution` | PPE products | Static |
| `/blog` | Blog listing (from CRM) | Dynamic SSR |
| `/blog/[slug]` | Single blog post | Dynamic SSR |
| `/api/stats` | Live stats endpoint | API |
| `/api/contact` | Contact form handler | API |

## Navigation Order
GovScraper → GovPacking → GovTraining (dropdown) → Government Contracting (dropdown) → Blog → About Us (dropdown) → Get a Quote

## Connected Services
- **CRM (MeND Services):** https://services.mendsourcing.com — repo: mendsourcing/mend-services-crm
- **GovPacking:** https://govpacking.com — repo in /PARA/Projects/GovPacking/govpacking
- **GovScraper:** https://govscraper.com

## API Connections & Data Flow
```
/api/contact (POST)
  ├→ Resend email: from noreply@mendsourcing.com, to sales@, BCC tristan@
  └→ CRM /api/website-contact (cross-ref customer, create contact, log activity)
       Source field identifies form: "MeND Website Contact Form", "GovScraper Demo Form", "GovPacking Quote Form"

/api/stats (GET)
  └→ govpacking.com/api/site/stats (DLA contracts, value, orders, in-progress)

/blog (SSR)
  └→ CRM /api/blog?site=mend&published=true

/blog/[slug] (SSR)
  └→ CRM /api/blog?site=mend&published=true&slug=X
```

## Homepage Features
- Hero: C-17 background, headline, CTAs, AS9100+ISO cert badges (white pills)
- Right side: 6 vertical glass cards with live stats (DLA Contracts, Contract Value, GovPacking Orders Completed, GovPacking Orders In Progress + static: 62 Manufacturing Partners, 16+ Years Experience)
- Vendor logos: scrolling marquee (Boeing, Acufast, MS Aerospace, Novaria Group, Space-Lok, WG)
- Our Solutions: GovScraper, GovPacking, GovTraining cards with "For Those Looking To:" taglines
- B2G Services, Why MeND, Contact form with Company field + CRM integration

## GovScraper Page (/govscraper)
- Dashboard screenshot, pricing (LITE $35/mo, PRO $100/mo)
- Search tools highlight: 15M+ NSNs, 1.6M+ CAGE codes (replaces NSN-Now, WBParts)
- Member stats: contracts won (258 base + 1.3/3 days auto-increment), $5.4M awards, SPRS 300+
- Demo form → Calendly (calendly.com/mendsourcing/govscraper)

## GovPacking Page (/packaging-logistics)
- GovPacking.com screenshot, services, 376 packing codes decoder
- Labels pricing ($50/1000), How It Works (4 steps)
- Quote form → Calendly (calendly.com/mendsourcing/govpacking)

## Blog System
- Posts managed in CRM at /mend-site/blog (AI generate, SEO review, enhance)
- Saved to blog_posts table with site='mend'
- Fetched via CRM /api/blog?site=mend&published=true

## Contact Forms (all 3 share same /api/contact endpoint)
- Required: firstName, email, company
- Phone auto-formats to (xxx) xxx-xxxx
- Each form passes unique `source` field for CRM tracking
- Email: to sales@mendsourcing.com, BCC tristan@mendsourcing.com
- CRM: cross-references company name + email domain, creates customer if new (service_type='website'), creates contact, logs activity

## Deployment
- Railway project: mend-website, service: "MeND - Main Website"
- Deploy: `railway up --detach --ci --service "MeND - Main Website"`
- ENV vars on Railway: PORT=3000, RESEND_API_KEY
- Do NOT deploy without user approval
- If push fails with large files: `git config http.postBuffer 524288000`

## CRM Integration (cross-project changes)
Clone CRM to /tmp to avoid iCloud Drive git issues:
```bash
cd /tmp && rm -rf mend-crm-deploy && git clone https://github.com/mendsourcing/mend-services-crm.git mend-crm-deploy
# make changes in /tmp/mend-crm-deploy/
# commit and push from there
```

## Design
- Option 1 Bold Dark theme, C-17 military transport hero background
- Brand colors: #03ACED (primary cyan), #E94615 (orange accent), #0a0a0a (bg)
- Text: white headings, #ccc body, #bbb secondary, #999 muted
- Font: Inter
- All logos in /public/images/, vendor logos in /public/images/vendors/
