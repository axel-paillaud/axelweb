document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-collapse');
    if (!btn) return;

    const isActive = btn.classList.toggle('active');
    btn.setAttribute('aria-expanded', isActive);

    const targetId = btn.getAttribute('aria-controls');
    if (!targetId) return;

    const content = document.getElementById(targetId);
    if (!content) return;

    if (isActive) {
      content.style.maxHeight = content.scrollHeight + 'px';
    } else {
      content.style.maxHeight = '';
    }
  });
});
