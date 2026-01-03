export let isPidgin = false;

export function togglePidgin() {
  isPidgin = !isPidgin;

  const btn = document.getElementById('lang-btn');
  const sub = document.getElementById('sub-header');

  const labels = {
    phone: document.getElementById('label-phone'),
    naira: document.getElementById('label-naira'),
    bank: document.getElementById('label-bank'),
    id: document.getElementById('label-id'),
    ussd: document.getElementById('label-ussd')
  };

  const inputs = {
    phone: document.getElementById('phoneInput'),
    naira: document.getElementById('nairaInput'),
    bank: document.getElementById('bankSearch'),
    id: document.getElementById('idInput'),
    ussd: document.getElementById('ussdSearch')
  };

  if (isPidgin) {
    sub.innerText = "Tools wey go make your dev life easy for Naija.";
    btn.innerText = "Change to English";
    labels.phone.innerText = "Phone Number Checker";
    labels.naira.innerText = "Money Format";
    labels.bank.innerText = "Bank Code Finder";
    labels.id.innerText = "ID Number Checker";
    labels.ussd.innerText = "USSD Code Finder";
    inputs.phone.placeholder = "Put phone number (e.g. 0803...)";
    inputs.naira.placeholder = "Put money amount";
    inputs.bank.placeholder = "Find bank for here...";
    inputs.id.placeholder = "Put BVN or NIN";
    inputs.ussd.placeholder = "Find service...";
  } else {
    sub.innerText = "Everyday utilities built for Nigerian developers.";
    btn.innerText = "Switch to Pidgin";
    labels.phone.innerText = "Phone Validator";
    labels.naira.innerText = "Naira Formatter";
    labels.bank.innerText = "Bank Codes";
    labels.id.innerText = "ID Validator";
    labels.ussd.innerText = "USSD Codes";
    inputs.phone.placeholder = "0803...";
    inputs.naira.placeholder = "Enter amount";
    inputs.bank.placeholder = "Search bank...";
    inputs.id.placeholder = "BVN or NIN";
    inputs.ussd.placeholder = "Search service...";
  }

  return isPidgin;
}

// Make it globally accessible for onclick in HTML
window.togglePidgin = togglePidgin;
