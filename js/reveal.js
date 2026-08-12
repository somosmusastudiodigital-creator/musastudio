/* ==========================================================================
   MUSA STUDIO — reveal de imágenes al mover el cursor
   Cómo funciona:
   .manifesto__mask es una capa sólida (color de fondo) que tapa las imágenes
   de .manifesto__reveal-layer. Le aplicamos un mask-image radial cuyo centro
   (--mx, --my) sigue al mouse y cuyo radio (--reveal-r) crece al entrar a la
   sección: eso "recorta" un agujero circular que deja ver la imagen debajo.
   Solo se activa en dispositivos con mouse real (hover:hover + pointer:fine);
   en touch no hay cursor, así que la sección queda simplemente estática.
   ========================================================================== */

(function () {
  'use strict';

  const section = document.querySelector('[data-reveal]');
  const mask = section ? section.querySelector('.manifesto__mask') : null;

  if (!section || !mask) return;

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!canHover) return;

  const REVEAL_RADIUS = 100; // px, radio del "agujero" cuando está activo — sutil
  const LERP = 0.16; // suavizado: más bajo = más "delay" detrás del cursor

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  let active = false;
  let rafId = null;

  // Las variables se setean en .manifesto (la sección), no en .manifesto__mask:
  // así cualquier capa descendiente (mask, y también .manifesto__logo-reveal)
  // puede leerlas por herencia de custom properties.
  const setRadius = (px) => {
    section.style.setProperty('--reveal-r', `${px}px`);
  };

  const tick = () => {
    currentX += (targetX - currentX) * LERP;
    currentY += (targetY - currentY) * LERP;

    section.style.setProperty('--mx', `${currentX}px`);
    section.style.setProperty('--my', `${currentY}px`);

    const closeEnough =
      Math.abs(targetX - currentX) < 0.5 && Math.abs(targetY - currentY) < 0.5;

    if (active || !closeEnough) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = null;
    }
  };

  const startLoop = () => {
    if (rafId === null) {
      rafId = requestAnimationFrame(tick);
    }
  };

  section.addEventListener('mouseenter', (event) => {
    active = true;
    section.classList.add('is-reveal-active');
    setRadius(REVEAL_RADIUS);
    const rect = section.getBoundingClientRect();
    currentX = targetX = event.clientX - rect.left;
    currentY = targetY = event.clientY - rect.top;
    section.style.setProperty('--mx', `${currentX}px`);
    section.style.setProperty('--my', `${currentY}px`);
    startLoop();
  });

  section.addEventListener('mousemove', (event) => {
    const rect = section.getBoundingClientRect();
    targetX = event.clientX - rect.left;
    targetY = event.clientY - rect.top;
    startLoop();
  });

  section.addEventListener('mouseleave', () => {
    active = false;
    section.classList.remove('is-reveal-active');
    setRadius(0);
  });
})();
