// JavaScript will go here as we add interactivity

// Copy to Clipboard Function
function copyToClipboard(text, event) {
  const btn = event ? event.target.closest('.copy-btn') : document.activeElement;
  
  // Try using the modern Clipboard API first
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showCopiedFeedback(btn);
    }).catch(() => {
      // Fallback to older method
      fallbackCopyToClipboard(text, btn);
    });
  } else {
    // Use fallback method for older browsers
    fallbackCopyToClipboard(text, btn);
  }
}

// Fallback copy method using textarea
function fallbackCopyToClipboard(text, btn) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showCopiedFeedback(btn);
  } catch (err) {
    console.error('Fallback: Could not copy text', err);
  } finally {
    document.body.removeChild(textarea);
  }
}

// Show feedback when copied
function showCopiedFeedback(btn) {
  if (!btn) return;
  
  const originalHTML = btn.innerHTML;
  btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
  btn.classList.add('copied');
  
  setTimeout(() => {
    btn.innerHTML = originalHTML;
    btn.classList.remove('copied');
  }, 2000);
}