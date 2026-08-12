/* ==========================================================================
   Páginas de proyecto — "hilo" mobile: intercala cada texto con su
   contenido correspondiente (en vez de "todo el texto, después todo el
   contenido"). Se hace moviendo los elementos reales en el DOM, no con
   CSS (display:contents + order tiene bugs conocidos en Safari/iOS
   justo con contenido posicionado absoluto adentro, como los carruseles).
   Solo corre en mobile — en desktop el layout de dos columnas queda
   intacto, sin tocar nada.
   ========================================================================== */

(function () {
  'use strict';

  if (!window.matchMedia('(max-width: 767px)').matches) return;

  const grid = document.querySelector('.project-detail__grid');
  if (!grid) return;

  const info = grid.querySelector('.project-detail__info');
  const media = grid.querySelector('.project-detail__media');
  if (!info || !media) return;

  const panels = [...info.querySelectorAll('.project-detail__panel')];
  const chapters = [...media.querySelectorAll('.project-detail__chapter')];
  const count = Math.max(panels.length, chapters.length);

  for (let i = 0; i < count; i++) {
    if (panels[i]) grid.appendChild(panels[i]);
    if (chapters[i]) grid.appendChild(chapters[i]);
  }

  info.remove();
  media.remove();
})();
