// Campus Navigation App - Simplified (Botpress Only)
document.addEventListener('DOMContentLoaded', function () {
  // Remove any leftover header or facility links if present
  const oldHeader = document.getElementById('campus-header');
  if (oldHeader) oldHeader.remove();

  // Remove Back to Home Button if present
  const oldBackBtn = document.querySelector('a[href="http://127.0.0.1:5500/index.html"]');
  if (oldBackBtn) oldBackBtn.remove();

  console.log('✅ Find Your Way app loaded successfully - using Botpress chatbot');
});
