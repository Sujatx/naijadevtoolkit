export function initNairaFormatter() {
  const input = document.getElementById('nairaInput');
  const result = document.getElementById('nairaResult');

  input.addEventListener('input', (e) => {
    let inputVal = e.target.value.replace(/[^0-9.-]/g, '');
    e.target.value = inputVal;

    const val = parseFloat(inputVal);

    if (isNaN(val) || inputVal === '' || inputVal === '-' || inputVal === '.') {
      result.innerText = '₦0.00';
      return;
    }

    const isNegative = val < 0;
    const absVal = Math.abs(val);

    let formatted = '';
    if (absVal >= 1_000_000_000) {
      formatted = (absVal / 1_000_000_000).toFixed(2) + 'B';
    } else if (absVal >= 1_000_000) {
      formatted = (absVal / 1_000_000).toFixed(2) + 'M';
    } else {
      formatted = absVal.toLocaleString('en-NG', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
      });
    }

    result.innerText = `${isNegative ? '-' : ''}₦${formatted}`;
  });
}
