import {mkdir, writeFile} from 'node:fs/promises';

const origin = 'https://stoneflow.pureknight.co.uk';
const app = 'https://stoneflowapp.pureknight.co.uk/';
const demo = '/contact/?intent=demo';
const arrow = '<span aria-hidden="true">↗</span>';
const money = amount => `£${amount.toLocaleString('en-GB')}`;
const plans = [
  {id:'starter', name:'Starter', price:99, desc:'For teams pricing straightforward jobs.', limits:['250', '500', '2 GB'], features:[
    'Projects, customers and product library', 'Single-schedule quotes, material rates and mould costs',
    'Branded quotations, revisions and manual follow-ups', 'Basic sales orders with customer PO and full release']},
  {id:'professional', name:'Professional', price:199, desc:'For estimators handling repeat enquiries and larger sites.', limits:['1,000', '2,500', '10 GB'], features:[
    'Everything in Starter', 'AI-assisted enquiry and attachment intake', 'House type, plot, floor and elevation schedules',
    'Combined quotation PDFs and Excel schedules', 'Team reviews, scheduled follow-ups and staged call-offs']},
  {id:'business', name:'Business', price:399, desc:'For manufacturers managing the factory, despatch and accounts.', limits:['5,000', '10,000', '50 GB'], features:[
    'Everything in Professional', 'Capacity planning, works orders and production tracking',
    'Delivery runs, notes and signed proof of delivery', 'Delivery-based invoicing, payments and credit notes',
    'Accounting import files and operational reports']},
];
const brand = `<a class="brand" href="/" aria-label="StoneFlow home"><img src="/assets/stoneflow-mark-original.png" width="56" height="42" alt=""><span>StoneFlow<small>BY PURE KNIGHT</small></span></a>`;
const button = (label, href = demo, classes = '') => `<a class="button ${classes}" href="${href}">${label} ${arrow}</a>`;
const nav = (id, label, href, current) => `<a href="${href}"${id === current ? ' aria-current="page"' : ''}>${label}</a>`;
const header = current => `<a class="skip" href="#main">Skip to content</a><header class="header"><div class="wrap nav">${brand}<button class="menu-toggle" aria-expanded="false" aria-controls="navigation">Menu <span aria-hidden="true">☰</span></button><nav id="navigation" aria-label="Main navigation">${nav('home', 'Overview', '/', current)}${nav('pricing', 'Pricing', '/pricing/', current)}${nav('contact', 'Contact', '/contact/', current)}<span class="nav-divider"></span><a href="${app}" class="login">Log in ${arrow}</a>${button('Arrange a demo', demo, 'small')}</nav></div></header>`;
const footer = `<footer><div class="wrap footer-top">${brand}<p>Estimating and production software<br>for architectural masonry.</p><div><a href="/pricing/">Pricing</a><a href="/contact/">Contact</a><a href="${app}">App login ↗</a></div></div><div class="wrap footer-bottom"><span>© ${new Date().getFullYear()} Pure Knight Limited</span><a href="https://pureknight.co.uk/">A Pure Knight product ↗</a><a href="/contact/#privacy">Privacy & enquiries</a></div></footer>`;
const dialog = `<dialog class="image-dialog" id="image-dialog"><button class="dialog-close" aria-label="Close screenshot">Close ×</button><img alt=""><p>StoneFlow with example records.</p></dialog>`;

function page(id, title, description, path, content) {
  return `<!doctype html><html lang="en-GB"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | StoneFlow</title><meta name="description" content="${description}"><meta name="robots" content="${id === 'error' ? 'noindex' : 'index,follow'}"><link rel="canonical" href="${origin}${path}">
<meta name="theme-color" content="#f6f4f0"><meta property="og:type" content="website"><meta property="og:title" content="${title} | StoneFlow"><meta property="og:description" content="${description}"><meta property="og:url" content="${origin}${path}"><meta property="og:image" content="${origin}/assets/og-image.jpg"><meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/assets/stoneflow-mark-original.png"><link rel="stylesheet" href="/style.css?v=pre-release"><script defer src="/site.js?v=pre-release"></script></head>
<body>${header(id)}<main id="main">${content}</main>${footer}${id === 'home' ? dialog : ''}</body></html>`;
}

const quotationScreenshot = {
  name:'multi-plot-quotation', label:'Multi-plot quotation', width:1138, height:708,
  alt:'StoneFlow quotation editor showing Hawthorn on plots 1–4 and Rowan on plots 5–10, with combined component quantities, unit prices and line totals',
};
const screenshots = [
  {name:'sales-orders', label:'Sales orders', alt:'StoneFlow sales order register with accepted work, customer PO references and call-off progress', copy:'Convert a won quotation to a sales order. Record the customer PO, send an acknowledgement and release work by plot, section or quantity.'},
  {name:'production', label:'Production queue', alt:'StoneFlow production queue with call-offs, required dates and production estimates', copy:'Plan against material capacity, mould availability and curing time. Print works orders and record quantities made and ready for despatch.'},
  {name:'deliveries', label:'Delivery notes', alt:'StoneFlow delivery notes register showing delivery destinations, quantities and delivery status', copy:'Build delivery runs and print notes for each load. Capture signatures and photos, and track shortages or replacements.'},
  {name:'invoices', label:'Invoices', alt:'StoneFlow invoice register with draft, issued and paid invoices and outstanding totals', copy:'Draft invoices from confirmed deliveries. Record part-payments and credits, review aged debt and export accounting import files.'},
];
const screenshot = ({name, label, alt, width = 1440, height = 900}, eager = false) => `<button class="screenshot-button" type="button" data-image="/assets/${name}.webp" aria-label="Enlarge ${label} screenshot"><img src="/assets/${name}.webp" width="${width}" height="${height}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}></button>`;
const home = `
<section class="hero wrap">
  <div class="hero-copy"><p class="eyebrow"><span></span> PRE-RELEASE DEMOS</p><h1>From cast stone enquiry<br>to <em>invoice.</em></h1><p class="lead">Forward an enquiry and StoneFlow drafts the first schedule for your estimator to check. Price it with your own rates, then carry the accepted work through production, delivery and invoicing.</p><div class="actions">${button('Arrange a pre-release demo')}<a class="text-link" href="#product">See StoneFlow in action <span aria-hidden="true">↓</span></a></div></div>
  <figure class="hero-visual">${screenshot(quotationScreenshot, true)}<figcaption class="screenshot-note">Build one quotation from multiple house types, with quantities and pricing rolled up across plots. Example records shown.</figcaption></figure>
</section>
<div class="material-strip"><div class="wrap"><span>SET UP WITH YOUR OWN MATERIALS AND RATES</span><div>Wetcast <i>+</i> Semi-dry <i>+</i> GRC</div></div></div>
<section class="workflow section"><div class="wrap"><h2>Spend less time building the first quote.</h2><div class="steps">
  <article><h3>Forward the enquiry</h3><p>StoneFlow can read supported emails, PDFs, spreadsheets and images, set up a project and draft a component schedule for review. Your estimator checks dimensions, quantities and anything flagged.</p></article>
  <article><h3>Build and price the schedule</h3><p>Use your product library, material rates and mould allowances. Bring in Excel or CSV, or combine reusable house types, plots, floors and elevations into one priced quotation.</p></article>
  <article><h3>Issue and follow up</h3><p>Send branded quotations and track revisions and follow-ups. Customers can accept online with a purchase order. The accepted revision stays linked to the order.</p></article>
</div></div></section>
<section class="section wrap" id="product"><div class="section-heading"><div><h2>From accepted quote<br>to confirmed delivery.</h2></div><p>Track what’s been released, made, despatched, delivered and invoiced on the same job.</p></div>
<div class="workflow-shots">${screenshots.map(item => `<article><div>${screenshot(item)}</div><h3>${item.label}</h3><p>${item.copy}</p></article>`).join('')}</div><p class="caption">StoneFlow screenshots using example records. Select a screenshot to enlarge it.</p></section>
<section class="closing wrap"><div><h2>See it on a job<br>like yours.</h2><p>Tell us how you quote and release work. We’ll tailor the walkthrough to your team.</p></div><div>${button('Arrange a pre-release demo')}<a class="text-link" href="/pricing/">Compare proposed plans ${arrow}</a></div></section>`;

const cards = plans.map((plan, index) => `<article class="plan ${index === 1 ? 'featured' : ''}">
<p class="plan-name">${plan.name}</p><p class="plan-desc">${plan.desc}</p><p class="price" data-monthly="${plan.price}"><span>${money(plan.price)}</span> / month</p><p class="plan-meta" data-billing-note>Per workspace · excluding VAT</p>
${button('Arrange a demo', `${demo}&amp;plan=${plan.id}`, index === 1 ? '' : 'outline')}<ul>${plan.features.map(feature => `<li>${feature}</li>`).join('')}</ul></article>`).join('');
const comparison = [
  ['Single-schedule estimating and basic sales orders', 'Included', 'Included', 'Included'],
  ['AI-assisted enquiry intake and team review', '—', 'Included', 'Included'],
  ['Multi-plot and sectional quotes, holds and staged call-offs', '—', 'Included', 'Included'],
  ['Factory planning, works orders and delivery management', '—', '—', 'Included'],
  ['Invoicing, credit notes and accounting import files', '—', '—', 'Included'],
  ...['Emails per month', 'File saves per month', 'Retained attachment storage'].map((label, i) => [label, ...plans.map(plan => plan.limits[i])]),
];
const pricing = `<section class="page-heading wrap centered"><p class="eyebrow">PRE-RELEASE PRICING</p><h1>Choose the workflow<br>that <em>fits.</em></h1><p class="lead">Proposed UK pricing per company workspace, excluding VAT. Plans and allowances will be confirmed at launch. Pre-release demos are available now.</p></section>
<section class="wrap pricing-section"><label class="billing-frequency">View pricing <select id="billing-frequency"><option value="month">Monthly</option><option value="year">Annual upfront</option></select></label><div class="plans">${cards}</div><p class="pricing-footnote">Proposed annual pricing covers 12 months for the price of 10 monthly payments. Usage allowances stay monthly. Online purchasing and trial signup are closed during pre-release.</p></section>
<section class="wrap section compare"><div class="section-heading"><h2>Compare the plans.</h2></div><div class="table-scroll" tabindex="0" role="region" aria-label="Proposed plan feature comparison"><table><thead><tr><th scope="col">Proposed features and allowances</th>${plans.map(plan => `<th scope="col">${plan.name}</th>`).join('')}</tr></thead><tbody>${comparison.map(([label, ...cells]) => `<tr><th scope="row">${label}</th>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>
<section class="wrap section faq"><h2>Common questions.</h2><div class="faq-grid">
<details><summary>How does AI-assisted estimating work?</summary><p>Forward a supported enquiry and StoneFlow drafts a schedule for your estimator to review. Your team checks the source and controls what goes into the issued quote.</p></details>
<details><summary>Which accounting packages are supported?</summary><p>StoneFlow generates import files for Xero, Sage 50, QuickBooks Online, FreeAgent and KashFlow. Download the file and import it into your accounting package. Live synchronisation is on the roadmap.</p></details>
<details><summary>Can I see my workflow in a demo?</summary><p>Yes. Tell us the materials you work with, how your schedules are structured and where you’d like to save time. <a href="${demo}">Arrange a pre-release demo.</a></p></details>
</div></section>`;

const contact = `<section class="page-heading wrap"><p class="eyebrow">PRE-RELEASE DEMOS</p><h1>See StoneFlow<br>with <em>your team.</em></h1><p class="lead">Tell us how you handle enquiries, quoting and production today. We’ll arrange a walkthrough that covers the parts you want to see.</p></section>
<section class="wrap contact-grid"><div class="contact-aside"><h2>Talk to Pure Knight.</h2><p>StoneFlow is built by Pure Knight, who also produce CAD drawings for UK cast stone and GRC manufacturers.</p><a class="email-link" href="mailto:info@pureknight.co.uk?subject=StoneFlow%20pre-release%20demo">info@pureknight.co.uk ↗</a><div class="aside-note"><a href="${app}" class="text-link">Log in to an existing workspace ↗</a></div></div>
<div class="contact-form"><form id="enquiry-form"><div class="form-row"><label>Your name<input name="name" autocomplete="name" required maxlength="120"></label><label>Work email<input name="email" type="email" autocomplete="email" required maxlength="254"></label></div><label>Company<input name="company" autocomplete="organization" required maxlength="160"></label><div class="form-row"><label>I’d like to<select name="intent" id="intent"><option value="demo">Arrange a pre-release demo</option><option value="question">Ask a question</option></select></label><label>Plan interest<select name="plan" id="plan"><option value="undecided">Help me choose</option>${plans.map(plan => `<option value="${plan.id}">${plan.name}</option>`).join('')}</select></label></div><label>What would you like to see?<textarea name="message" rows="5" maxlength="4000" placeholder="For example, how you quote multi-plot sites or manage call-offs…"></textarea></label><p class="form-hint">This prepares a message in your email app for you to send.</p><button class="button" type="submit">Prepare my email ${arrow}</button><p class="form-status" id="form-status" role="status"></p><div id="email-fallback" hidden><p>You can also copy the message and email it to <a href="mailto:info@pureknight.co.uk">info@pureknight.co.uk</a>.</p><textarea id="prepared-message" rows="9" readonly aria-label="Prepared enquiry message"></textarea><button class="button outline small" type="button" id="copy-message">Copy message</button></div></form></div></section>
<section class="wrap contact-bottom" id="privacy"><h2>How we handle your enquiry.</h2><p>The form prepares an email on your device. If you send it, Pure Knight Limited uses your details to respond to your enquiry. To ask about access, correction or deletion of enquiry information, email info@pureknight.co.uk. Hosting providers may process technical request data to serve and protect the website.</p></section>`;

await mkdir('dist/pricing', {recursive:true});
await mkdir('dist/contact', {recursive:true});
await Promise.all([
  writeFile('dist/index.html', page('home', 'Cast Stone Estimating and Production Software', 'StoneFlow brings AI-assisted estimating, multi-plot quotations, sales orders, production, delivery and invoicing together for architectural masonry teams.', '/', home)),
  writeFile('dist/pricing/index.html', page('pricing', 'Proposed Plans and Pricing', 'Compare the proposed Starter, Professional and Business plans for StoneFlow. Arrange a pre-release demonstration.', '/pricing/', pricing)),
  writeFile('dist/contact/index.html', page('contact', 'Arrange a Pre-release Demo', 'Arrange a StoneFlow pre-release walkthrough with Pure Knight for your cast stone, GRC or architectural masonry team.', '/contact/', contact)),
  writeFile('dist/404.html', page('error', 'Page not found', 'This page could not be found.', '/404', `<section class="wrap page-heading"><h1>Page not found.</h1>${button('Back to the homepage', '/')}</section>`)),
  writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`),
  writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${['/', '/pricing/', '/contact/'].map(path => `<url><loc>${origin}${path}</loc></url>`).join('')}</urlset>\n`),
]);
console.log('Built the StoneFlow pre-release marketing site.');
