import { isPidgin } from './pidgin-toggle.js';

export function initIdValidator() {
  const input = document.getElementById('idInput');
  const result = document.getElementById('idResult');

  input.addEventListener('input', (e) => {
    const val = e.target.value.replace(/\D/g, '');
    e.target.value = val;

    if (val.length === 11) {
      result.innerHTML = `<i class="fas fa-check-circle" style="color: var(--primary);"></i> ${
        isPidgin 
          ? "ID correct! 11 digits complete" 
          : "Valid ID (11 digits)"
      }`;
    } else if (val.length > 0) {
      result.innerHTML = `<i class="fas fa-info-circle" style="color: #888;"></i> ${
        isPidgin 
          ? `You put ${val.length}/11 digits` 
          : `Enter ${11 - val.length} more digit(s)`
      }`;
    } else {
      result.innerHTML = isPidgin ? "Waiting for ID..." : "Waiting for input…";
    }
  });
}
