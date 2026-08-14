/* ==========================================================================
   MUSA STUDIO — carrusel banner promocional (autoplay + controles manuales)
   ========================================================================== */

(function () {
  'use strict';

  const carousel = document.querySelector('.carousel');
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll('.carousel__slide')];
  const dots = [...carousel.querySelectorAll('.carousel__dot')];
  const prevBtn = carousel.querySelector('.carousel__arrow--prev');
  const nextBtn = carousel.querySelector('.carousel__arrow--next');

  if (slides.length < 2) return; // nada que rotar

  const AUTOPLAY_MS = 6500;
  let index = slides.findIndex((slide) => slide.classList.contains('is-active'));
  if (index < 0) index = 0;
  let timer = null;

  const goTo = (i) => {
    slides[index].classList.remove('is-active');
    dots[index]?.classList.remove('is-active');
    dots[index]?.setAttribute('aria-selected', 'false');

    index = (i + slides.length) % slides.length;

    slides[index].classList.add('is-active');
    dots[index]?.classList.add('is-active');
    dots[index]?.setAttribute('aria-selected', 'true');
  };

  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  const startAutoplay = () => {
    stopAutoplay();
    timer = setInterval(next, AUTOPLAY_MS);
  };

  const stopAutoplay = () => {
    if (timer) clearInterval(timer);
    timer = null;
  };

  nextBtn?.addEventListener('click', () => {
    next();
    startAutoplay();
  });

  prevBtn?.addEventListener('click', () => {
    prev();
    startAutoplay();
  });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startAutoplay();
    });
  });

  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);

  startAutoplay();
})();
