import { isPidgin } from './pidgin-toggle.js';

export function initPhoneValidator() {
  const input = document.getElementById('phoneInput');
  const result = document.getElementById('phoneResult');

  const networks = {
    mtn: /^(0703|0706|0803|0806|0810|0813|0814|0816|0903|0906|0913|0916)/,
    airtel: /^(0701|0708|0802|0808|0812|0901|0902|0904|0907|0912)/,
    glo: /^(0705|0805|0807|0811|0815|0905|0915)/,
    m9: /^(0809|0817|0818|0908|0909)/
  };

  input.addEventListener('input', (e) => {
    let val = e.target.value.replace(/\D/g, '');
    e.target.value = val;

    if (!val) {
      result.classList.add('hidden');
      return;
    }

    result.classList.remove('hidden');

    let html = "";
    if (networks.mtn.test(val)) {
      html = `<i class="fas fa-check-circle" style="color: #FFCC00;"></i> ${isPidgin ? "Na MTN User" : "MTN User"}`;
    } else if (networks.airtel.test(val)) {
      html = `<i class="fas fa-check-circle" style="color: #ED1C24;"></i> ${isPidgin ? "Na Airtel User" : "Airtel User"}`;
    } else if (networks.glo.test(val)) {
      html = `<i class="fas fa-check-circle" style="color: #00B140;"></i> ${isPidgin ? "Na Glo User" : "Glo User"}`;
    } else if (networks.m9.test(val)) {
      html = `<i class="fas fa-check-circle" style="color: #00923F;"></i> ${isPidgin ? "Na 9mobile User" : "9mobile User"}`;
    } else {
      html = `<i class="fas fa-question-circle" style="color: #888;"></i> ${isPidgin ? "We no know dis number" : "Unknown Network"}`;
    }

    result.innerHTML = html;
  });
}
