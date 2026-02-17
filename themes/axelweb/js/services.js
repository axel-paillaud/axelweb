document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('[data-service]');
  if (!items.length) return;

  const open = (item) => {
    const desc = item.querySelector('[data-service-description]');
    if (desc) desc.style.maxHeight = desc.scrollHeight + 'px';
    item.classList.add('is-open');
  };

  const close = (item) => {
    const desc = item.querySelector('[data-service-description]');
    if (desc) desc.style.maxHeight = '';
    item.classList.remove('is-open');
  };

  const closeAll = () => items.forEach(close);

  // Hover: open on enter, close on leave
  items.forEach((item) => {
    item.addEventListener('mouseenter', () => {
      closeAll();
      open(item);
    });
    item.addEventListener('mouseleave', () => {
      close(item);
    });
  });

  // Touch: toggle on tap only (not mouse clicks — hover handles desktop)
  items.forEach((item) => {
    item.addEventListener('pointerup', (e) => {
      if (e.pointerType !== 'touch') return;
      if (e.target.closest('a')) return;
      const wasOpen = item.classList.contains('is-open');
      closeAll();
      if (!wasOpen) open(item);
    });
  });
});
