document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  if (!header) return;

  // Sticky: shrink header on scroll
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Burger: toggle mobile nav
  const burger = header.querySelector('.site-burger');
  if (!burger) return;

  burger.addEventListener('click', () => {
    const isOpen = header.classList.toggle('is-nav-open');
    burger.setAttribute('aria-expanded', isOpen);
  });
});
