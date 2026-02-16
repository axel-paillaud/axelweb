document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-carousel]').forEach((carousel) => {
    const track = carousel.querySelector('[data-carousel-track]');
    const btnPrev = carousel.querySelector('[data-carousel-prev]');
    const btnNext = carousel.querySelector('[data-carousel-next]');

    if (!track || !btnPrev || !btnNext) return;

    let currentIndex = 0;

    const getCards = () => Array.from(track.children);
    const getVisibleCount = () => 3;

    const getCardWidthWithGap = () => {
      const cards = getCards();
      if (cards.length < 2) return cards[0]?.offsetWidth || 0;
      return cards[1].offsetLeft - cards[0].offsetLeft;
    };

    const getMaxIndex = () => {
      const cards = getCards();
      return Math.max(0, cards.length - getVisibleCount());
    };

    const updateButtons = () => {
      btnPrev.disabled = currentIndex <= 0;
      btnNext.disabled = currentIndex >= getMaxIndex();
    };

    const slideTo = (index) => {
      currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
      const offset = currentIndex * getCardWidthWithGap();
      track.style.transform = `translateX(-${offset}px)`;
      updateButtons();
    };

    btnPrev.addEventListener('click', () => slideTo(currentIndex - 1));
    btnNext.addEventListener('click', () => slideTo(currentIndex + 1));

    updateButtons();
  });
});
