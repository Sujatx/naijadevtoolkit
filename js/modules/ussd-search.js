import { ussdCodes } from '../data/ussd.js';
import { copyToClipboard } from '../utils/toast.js';
import { isPidgin } from './pidgin-toggle.js';

let selectedUssdIndex = -1;

export function initUssdSearch() {
  const ussdSearch = document.getElementById('ussdSearch');
  const ussdList = document.getElementById('ussdList');

  function renderUssd(query = "") {
    ussdList.innerHTML = "";
    const filtered = ussdCodes.filter(u => 
      u.service.toLowerCase().includes(query.toLowerCase()) ||
      u.code.includes(query)
    );

    if (filtered.length === 0) {
      const noResult = document.createElement('div');
      noResult.className = "dropdown-item";
      noResult.style.pointerEvents = "none";
      noResult.style.opacity = "0.6";
      noResult.innerText = isPidgin 
        ? "No service match wetin you find" 
        : "No services found";
      ussdList.appendChild(noResult);
      return;
    }

    filtered.forEach((u, index) => {
      const item = document.createElement('div');
      item.className = "dropdown-item";
      item.setAttribute('role', 'option');
      item.setAttribute('data-index', index);
      item.innerHTML = `<span>${u.service}</span><strong>${u.code}</strong>`;
      item.onclick = () => {
        copyToClipboard(u.code, isPidgin, u.service);
        ussdSearch.value = u.service;
        ussdList.style.display = 'none';
        ussdSearch.setAttribute('aria-expanded', 'false');
      };
      ussdList.appendChild(item);
    });

    selectedUssdIndex = -1;
  }

  function updateSelectedUssd(items) {
    items.forEach((item, idx) => {
      if (idx === selectedUssdIndex) {
        item.style.background = 'var(--primary)';
        item.style.color = 'white';
        item.scrollIntoView({ block: 'nearest' });
      } else {
        item.style.background = '';
        item.style.color = '';
      }
    });
  }

  ussdSearch.addEventListener('focus', () => {
    ussdList.style.display = 'block';
    ussdSearch.setAttribute('aria-expanded', 'true');
    renderUssd(ussdSearch.value);
  });

  ussdSearch.addEventListener('input', (e) => {
    renderUssd(e.target.value);
    selectedUssdIndex = -1;
  });

  ussdSearch.addEventListener('keydown', (e) => {
    const items = ussdList.querySelectorAll('.dropdown-item');
    if (items.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      selectedUssdIndex = (selectedUssdIndex + 1) % items.length;
      updateSelectedUssd(items);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      selectedUssdIndex = selectedUssdIndex <= 0 ? items.length - 1 : selectedUssdIndex - 1;
      updateSelectedUssd(items);
    } else if (e.key === 'Enter' && selectedUssdIndex >= 0) {
      e.preventDefault();
      items[selectedUssdIndex].click();
    } else if (e.key === 'Escape') {
      ussdList.style.display = 'none';
      ussdSearch.setAttribute('aria-expanded', 'false');
      selectedUssdIndex = -1;
    }
  });

  document.addEventListener('click', (e) => {
    if (!ussdSearch.contains(e.target) && !ussdList.contains(e.target)) {
      ussdList.style.display = 'none';
      ussdSearch.setAttribute('aria-expanded', 'false');
    }
  });

  renderUssd();
}
