# MeND Sourcing Solutions - Main Website

## Tech Stack
- Next.js 16 (App Router), Tailwind CSS, TypeScript
- Hosted on Railway, DNS on Cloudflare, domain on GoDaddy
- Contact form via Resend API

## Connected Services
- **CRM (MeND Services):** https://services.mendsourcing.com — repo: mendsourcing/mend-services-crm
- **GovPacking:** https://govpacking.com — repo in /PARA/Projects/GovPacking/govpacking
- **GovScraper:** https://govscraper.com (external)

## API Connections
- `/api/stats` → fetches live data from `https://govpacking.com/api/site/stats`
- `/api/contact` → sends email via Resend to sales@mendsourcing.com
- CRM's `/api/govpacking-stats` feeds into GovPacking's `/api/site/stats`

## Deployment
- Railway project: mend-website, service: "MeND - Main Website"
- Deploy: `railway up --detach --ci --service "MeND - Main Website"`
- PORT=3000 env var set on Railway

## CRM Integration
When changes span both projects, clone CRM to /tmp to avoid iCloud Drive git issues:
```bash
cd /tmp && rm -rf mend-crm-deploy && git clone https://github.com/mendsourcing/mend-services-crm.git mend-crm-deploy
# make changes in /tmp/mend-crm-deploy/
# commit and push from there
```

## Design
- Option 1 Bold Dark theme, C-17 military transport hero background
- Brand colors: #03ACED (primary cyan), #E94615 (orange accent), #0a0a0a (bg)
- Font: Inter
- All logos in /public/images/
