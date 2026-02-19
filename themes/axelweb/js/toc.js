document.addEventListener('DOMContentLoaded', () => {
  const toc = document.querySelector('.content-layout-toc');
  const prose = document.querySelector('[data-toc-content]');

  if (!toc || !prose) return;

  const headings = prose.querySelectorAll('h2, h3');
  if (headings.length === 0) return;

  // Add IDs to headings that don't have one
  headings.forEach((heading, i) => {
    if (!heading.id) {
      heading.id = 'section-' + (i + 1);
    }
  });

  // Build TOC nav
  const nav = document.createElement('nav');
  nav.className = 'toc';
  nav.setAttribute('aria-label', 'Sommaire');

  const list = document.createElement('ul');
  list.className = 'toc-list';

  headings.forEach((heading) => {
    const li = document.createElement('li');
    li.className = 'toc-item' + (heading.tagName === 'H3' ? ' toc-item--sub' : '');

    const a = document.createElement('a');
    a.className = 'toc-link';
    a.href = '#' + heading.id;
    a.textContent = heading.textContent;

    li.appendChild(a);
    list.appendChild(li);
  });

  nav.appendChild(list);
  toc.appendChild(nav);

  // Intersection Observer for active state
  const items = nav.querySelectorAll('.toc-item');
  const headingMap = new Map();
  items.forEach((item) => {
    const link = item.querySelector('.toc-link');
    const id = link.getAttribute('href').slice(1);
    headingMap.set(id, item);
  });

  const visibleHeadings = new Set();

  const updateActive = () => {
    items.forEach((item) => item.classList.remove('is-active'));
    // Activate the last heading (in DOM order) that is visible
    let current = null;
    headings.forEach((heading) => {
      if (visibleHeadings.has(heading.id)) {
        current = heading.id;
      }
    });
    if (current) {
      const active = headingMap.get(current);
      if (active) active.classList.add('is-active');
    }
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleHeadings.add(entry.target.id);
        } else {
          visibleHeadings.delete(entry.target.id);
        }
      });
      updateActive();
    },
    { rootMargin: '0px 0px -85% 0px', threshold: 0 }
  );

  headings.forEach((heading) => observer.observe(heading));
});
