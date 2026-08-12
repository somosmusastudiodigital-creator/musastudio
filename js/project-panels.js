/* ==========================================================================
   MUSA STUDIO — página de proyecto: el panel izquierdo (fijo) cambia de
   contenido según qué "capítulo" del lado derecho está cruzando el medio
   de la pantalla mientras se hace scroll.
   ========================================================================== */

(function () {
  'use strict';

  const chapters = [...document.querySelectorAll('.project-detail__chapter')];
  const panels = [...document.querySelectorAll('.project-detail__panel')];

  if (!chapters.length || !panels.length) return;

  const setActive = (index) => {
    panels.forEach((panel, i) => {
      panel.classList.toggle('is-active', i === index);
    });
  };

  // "línea" imaginaria a la mitad de la pantalla: el capítulo que la está
  // cruzando en cada momento es el que manda sobre el panel izquierdo.
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = chapters.indexOf(entry.target);
          setActive(index);
        }
      });
    },
    { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
  );

  chapters.forEach((chapter) => observer.observe(chapter));
})();
