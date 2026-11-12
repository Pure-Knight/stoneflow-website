const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
function setMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
}
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    setMenu(false);
    menu.focus();
  }
});

const dialog = document.querySelector('#image-dialog');
if (dialog) {
  const image = dialog.querySelector('img');
  for (const button of document.querySelectorAll('[data-image]')) {
    button.addEventListener('click', () => {
      image.src = button.dataset.image;
      image.alt = button.querySelector('img').alt;
      dialog.showModal();
    });
  }
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
}

const frequency = document.querySelector('#billing-frequency');
frequency?.addEventListener('change', () => {
  const annual = frequency.value === 'year';
  const pounds = new Intl.NumberFormat('en-GB', {style:'currency', currency:'GBP', maximumFractionDigits:0});
  for (const card of document.querySelectorAll('.plan')) {
    const price = card.querySelector('[data-monthly]');
    const amount = Number(price.dataset.monthly);
    const value = Object.assign(document.createElement('span'), {textContent:pounds.format(annual ? amount * 10 : amount)});
    price.replaceChildren(value, document.createTextNode(annual ? ' / year upfront' : ' / month'));
    card.querySelector('[data-billing-note]').textContent = annual
      ? `Save ${pounds.format(amount * 2)} a year · excluding VAT`
      : 'Per workspace · excluding VAT';
  }
});

const form = document.querySelector('#enquiry-form');
if (form) {
  const params = new URLSearchParams(location.search);
  const {plan, intent} = form.elements;
  const status = document.querySelector('#form-status');
  const prepared = document.querySelector('#prepared-message');
  const recipient = 'info@pureknight.co.uk';
  if ([...plan.options].some(option => option.value === params.get('plan'))) plan.value = params.get('plan');
  if (params.get('intent') === 'question') intent.value = 'question';

  form.addEventListener('submit', event => {
    event.preventDefault();
    const data = new FormData(form);
    const subject = intent.value === 'question' ? 'StoneFlow product enquiry' : 'StoneFlow pre-release demo';
    const message = data.get('message').trim();
    const details = [
      'Hello Pure Knight,', '',
      intent.value === 'question' ? 'I have a question about StoneFlow.' : 'I’d like to arrange a pre-release demo of StoneFlow.', '',
      `Name: ${data.get('name').trim()}`,
      `Work email: ${data.get('email').trim()}`,
      `Company: ${data.get('company').trim()}`,
      `Plan interest: ${plan.selectedOptions[0].textContent}`,
    ];
    if (message) details.push('', message);
    prepared.value = details.join('\n');
    document.querySelector('#email-fallback').hidden = false;
    status.textContent = 'Your email is ready to send. You can also copy the message below.';
    location.href = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(prepared.value)}`;
  });
  document.querySelector('#copy-message').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(prepared.value);
      status.textContent = `Message copied. Paste it into an email to ${recipient}.`;
    } catch {
      prepared.select();
      status.textContent = `Copy the selected message and email it to ${recipient}.`;
    }
  });
}
