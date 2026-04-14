# MeND Sourcing Solutions - Main Website

## Tech Stack
- Next.js 16 (App Router), Tailwind CSS, TypeScript
- Hosted on Railway, DNS on Cloudflare, domain on GoDaddy
- Contact form via Resend API + CRM integration
- Blog fetched from CRM database

## Connected Services
- **CRM (MeND Services):** https://services.mendsourcing.com — repo: mendsourcing/mend-services-crm
- **GovPacking:** https://govpacking.com — repo in /PARA/Projects/GovPacking/govpacking
- **GovScraper:** https://govscraper.com (external)

## API Connections
- `/api/stats` → fetches live data from `https://govpacking.com/api/site/stats`
- `/api/contact` → sends email via Resend (to: sales@, BCC: tristan@) → pushes to CRM `/api/website-contact` (cross-references customers, creates contacts, logs activity)
- CRM `/api/blog?site=mend&published=true` → feeds `/blog` and `/blog/[slug]` pages
- CRM `/api/govpacking-stats` feeds into GovPacking's `/api/site/stats`

## Contact Form Flow
```
User submits form (firstName, lastName, email, phone, company, topic, message)
  ├→ Resend email: from noreply@mendsourcing.com, to sales@mendsourcing.com, BCC tristan@mendsourcing.com
  └→ CRM /api/website-contact
       ├→ Match company by name or email domain
       ├→ Create customer (service_type='website') if new
       ├→ Create contact record linked to customer
       └→ Log "Website Contact" activity
```

## Blog System
- Posts are created/managed in CRM at `/mend-site/blog` (full editor with AI generate, AI enhance, SEO review)
- Posts saved to `blog_posts` table with `site='mend'`
- Main site fetches from CRM: `/api/blog?site=mend&published=true`
- `/blog` shows listing, `/blog/[slug]` shows full post with markdown rendering

## Deployment
- Railway project: mend-website, service: "MeND - Main Website"
- Deploy: `railway up --detach --ci --service "MeND - Main Website"`
- PORT=3000, RESEND_API_KEY set on Railway
- Do NOT deploy without user approval

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
