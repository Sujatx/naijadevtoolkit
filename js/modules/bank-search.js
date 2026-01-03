import { banks } from '../data/banks.js';
import { copyToClipboard } from '../utils/toast.js';
import { isPidgin } from './pidgin-toggle.js';

let selectedBankIndex = -1;

export function initBankSearch() {
  const bankSearch = document.getElementById('bankSearch');
  const bankList = document.getElementById('bankList');

  function renderBanks(query = "") {
    bankList.innerHTML = "";
    const filtered = banks.filter(b => 
      b.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      const noResult = document.createElement('div');
      noResult.className = "dropdown-item";
      noResult.style.pointerEvents = "none";
      noResult.style.opacity = "0.6";
      noResult.innerText = isPidgin 
        ? "No bank match wetin you find" 
        : "No banks found";
      bankList.appendChild(noResult);
      return;
    }

    filtered.forEach((b, index) => {
      const item = document.createElement('div');
      item.className = "dropdown-item";
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);
      item.innerHTML = `<span>${b.name}</span><strong>${b.code}</strong>`;
      item.onclick = () => {
        copyToClipboard(b.code, isPidgin, b.name + " code");
        bankSearch.value = b.name;
        bankList.style.display = 'none';
        bankSearch.setAttribute('aria-expanded', 'false');
      };
      bankList.appendChild(item);
    });

    selectedBankIndex = -1;
  }

  function updateSelectedBank(items) {
    items.forEach((item, idx) => {
      if (idx === selectedBankIndex) {
        item.style.background = 'var(--primary)';
        item.style.color = 'white';
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.style.background = '';
        item.style.color = '';
      }
    });
  }

  bankSearch.addEventListener('focus', () => {
    bankList.style.display = 'block';
    bankSearch.setAttribute('aria-expanded', 'true');
    renderBanks(bankSearch.value);
  });

  bankSearch.addEventListener('input', (e) => {
    renderBanks(e.target.value);
    selectedBankIndex = -1;
  });

  bankSearch.addEventListener('keydown', (e) => {
    const items = bankList.querySelectorAll('.dropdown-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedBankIndex = (selectedBankIndex + 1) % items.length;
      updateSelectedBank(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedBankIndex = selectedBankIndex <= 0 ? items.length - 1 : selectedBankIndex - 1;
      updateSelectedBank(items);
    } else if (e.key === 'Enter' && selectedBankIndex >= 0) {
      e.preventDefault();
      items[selectedBankIndex].click();
    } else if (e.key === 'Escape') {
      bankList.style.display = 'none';
      bankSearch.setAttribute('aria-expanded', 'false');
      selectedBankIndex = -1;
    }
  });

  document.addEventListener('click', (e) => {
    if (!bankSearch.contains(e.target) && !bankList.contains(e.target)) {
      bankList.style.display = 'none';
      bankSearch.setAttribute('aria-expanded', 'false');
    }
  });

  renderBanks();
}
