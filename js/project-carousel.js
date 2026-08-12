/* ==========================================================================
   MUSA STUDIO — carruseles chicos dentro de una página de proyecto
   (logos, feed, etc.). Puede haber varios en la misma página, cada uno
   se maneja de forma independiente. Sin autoplay: solo avanza al tocar
   la flecha o el punto.
   ========================================================================== */

(function () {
  'use strict';

  document.querySelectorAll('.project-carousel').forEach((carousel) => {
    const slides = [...carousel.querySelectorAll('.project-carousel__slide')];
    const dots = [...carousel.querySelectorAll('.project-carousel__dot')];
    const prevBtn = carousel.querySelector('.project-carousel__arrow--prev');
    const nextBtn = carousel.querySelector('.project-carousel__arrow--next');

    if (slides.length < 2) return; // nada que rotar

    let index = slides.findIndex((slide) => slide.classList.contains('is-active'));
    if (index < 0) index = 0;

    const goTo = (i) => {
      slides[index].classList.remove('is-active');
      dots[index]?.classList.remove('is-active');
      dots[index]?.setAttribute('aria-selected', 'false');

      index = (i + slides.length) % slides.length;

      slides[index].classList.add('is-active');
      dots[index]?.classList.add('is-active');
      dots[index]?.setAttribute('aria-selected', 'true');
    };

    nextBtn?.addEventListener('click', () => goTo(index + 1));
    prevBtn?.addEventListener('click', () => goTo(index - 1));

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => goTo(i));
    });
  });
})();
