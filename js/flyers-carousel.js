/* ==========================================================================
   MUSA STUDIO — carrusel vertical de flyers/posters (autoplay + controles)
   ========================================================================== */

(function () {
  'use strict';

  const carousel = document.querySelector('.flyers-carousel');
  if (!carousel) return;

  // las flechas viven en el panel amarillo, no encima de las imágenes —
  // por eso se buscan en toda la sección, no solo dentro del carrusel.
  const root = document.querySelector('.flyers') || carousel;

  const slides = [...carousel.querySelectorAll('.flyers-carousel__slide')];
  const dots = [...carousel.querySelectorAll('.flyers-carousel__dot')];
  const prevBtn = root.querySelector('.flyers__nav-btn--prev');
  const nextBtn = root.querySelector('.flyers__nav-btn--next');

  if (slides.length < 2) return; // nada que rotar

  const AUTOPLAY_MS = 4500;
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
