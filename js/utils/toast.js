let toastTimeout = null;

export function showToast(message) {
  const toast = document.getElementById('toast');

  if (toastTimeout) clearTimeout(toastTimeout);

  toast.innerText = message;
  toast.style.display = "block";

  toastTimeout = setTimeout(() => {
    toast.style.display = "none";
  }, 2500);
}

export function copyToClipboard(text, isPidgin = false, label = "") {
  navigator.clipboard.writeText(text);

  let message;
  if (isPidgin) {
    message = label ? `${label} don copy!` : "E don set! Copied.";
  } else {
    message = label ? `${label} copied!` : "Copied to clipboard!";
  }

  showToast(message);
}
