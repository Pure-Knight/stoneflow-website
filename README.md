# StoneFlow marketing website

Public marketing site: https://stoneflow.pureknight.co.uk/
Application, signup and billing: https://stoneflowapp.pureknight.co.uk/
Source: https://github.com/Pure-Knight/stoneflow-website

Cloudflare Pages deploys `main` automatically. Build command: `npm run build`. Output: `dist`. The dependency-free `build.mjs` generates homepage, pricing, contact, sitemap and 404. Static CSS, JavaScript and optimised product screenshots are tracked in `dist/`.

## Subscription journey

Pricing links open the app's `/signup?plan=starter|professional|business`. Signup verifies the purchaser's email, collects payment details in Stripe Checkout and creates the workspace after a signed provider confirmation. The first eligible subscription includes a 14-day trial and automatically becomes paid unless cancelled. The app sends expiry and deletion warnings and removes only eligible abandoned cancelled trial workspaces after 60 days of inactivity following expiry. Paid accounts and existing pilots are excluded. The app's billing setup must be connected before checkout can operate; the signup page reports an unavailable payment connection clearly.

Starter £99, Professional £199 and Business £399 per month, excluding VAT. Stripe Checkout is authoritative for the final amount/tax/discount. Starter excludes AI. Professional and Business include AI. Business Sage/Xero exports remain planned and are clearly labelled unavailable. Numerical user/storage quotas are not sold as enforced features.

General questions and demonstration enquiries still use the contact email composer. It does not send anything until the visitor sends the prepared email from their email app. Trial/purchase links bypass the contact form and open actual signup.

## Deployment and maintenance

Push changes to `main` to deploy production; other branches create Cloudflare previews. Only the marketing hostname is attached here. Application hosting remains on Railway and mail-related DNS records must be preserved. No payment, email or infrastructure secrets belong in this public repository. No OpenAI/Sites hosting identity is needed by this independent Cloudflare deployment.

Build locally with Node 22 or newer and `npm run build`. Check the three pages, images, mobile navigation, screenshot viewer, calculator, signup links and contact composer after changes. App lifecycle/security checks live in Pure-Knight/stoneflow (`npm run test:billing`, `npm run test:subscriptions`).

### Marketing hostname and email

`stoneflow.pureknight.co.uk` also receives enquiry mail. Its MX record is preserved. Cloudflare Worker `stoneflow-marketing-router` routes the proxied marketing hostname to the production Pages build at `stoneflow-website.pages.dev`; it streams responses and never forwards browser cookies or authorisation. The route is `stoneflow.pureknight.co.uk/*`. Worker source is `cloudflare/marketing-proxy.js`. Marketing changes deploy automatically through Pages without changing this stable routing code. The two original A records remain available for rollback; only their proxy setting is enabled. Do not replace the mail-enabled hostname with a CNAME or change its MX record.
