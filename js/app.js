// Campus Navigation App
document.addEventListener('DOMContentLoaded', function () {
  // Remove any leftover header or facility links if present
  const oldHeader = document.getElementById('campus-header');
  if (oldHeader) oldHeader.remove();

  // Welcome overlay logic (if present)
  window.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('welcome-overlay');
    const btn = document.getElementById('welcome-btn');
    if (overlay && btn) {
      btn.addEventListener('click', () => {
        overlay.style.opacity = '0';
        setTimeout(() => overlay.style.display = 'none', 500);
      });
    }
    
    // Remove intro section if present
    const intro = document.getElementById('intro');
    if (intro) intro.parentNode.removeChild(intro);
  });

  // Remove Back to Home Button if present
  const oldBackBtn = document.querySelector('a[href="http://127.0.0.1:5500/index.html"]');
  if (oldBackBtn) oldBackBtn.remove();
});