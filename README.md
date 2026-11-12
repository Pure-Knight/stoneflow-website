# StoneFlow marketing website

The public marketing site is https://stoneflow.pureknight.co.uk/. Existing users sign in at https://stoneflowapp.pureknight.co.uk/.

## Pre-release site

The homepage, pricing and contact pages are public. All plan calls to action lead to the demo enquiry page. Old `intent=trial` and `intent=purchase` contact links also open the demo form. The form prepares an email to `info@pureknight.co.uk` and provides a copy fallback. The visitor sends it from their own email app.

The indicative UK prices are £99, £199 and £399 per company workspace per month, excluding VAT. Annual upfront pricing uses ten monthly payments. The plans and feature comparison in `build.mjs` describe the proposed launch packaging. Application entitlements and billing are managed in the separate StoneFlow app. Public checkout and trial signup are held at the app until launch approval.

The current workflow screenshots were captured from the StoneFlow interface with fictional companies and records. Do not add customer records, private attachments or secrets to this public repository.

## Build and deploy

Run `npm run build` with Node 22 or newer. The dependency-free `build.mjs` generates the homepage, pricing, contact, sitemap, robots and 404 in `dist/`. Static styles, scripts and images are tracked in `dist/`. Cloudflare Pages deploys `main` automatically and creates previews for other branches.

Check the three pages, the mobile menu, screenshot viewer, annual selector, demo form and app signup hold. Before paid launch, confirm packaging and pricing against app entitlements and verify live billing and tax end to end.

## Marketing hostname and email

`stoneflow.pureknight.co.uk` also receives enquiry mail. The Cloudflare Worker `stoneflow-marketing-router` forwards web requests to the production Pages build at `stoneflow-website.pages.dev`. The Worker source is `cloudflare/marketing-proxy.js`. Publishing the marketing site uses the Pages build. Keep the existing route, proxied A records and MX records in place.
