/* ==========================================================================
   MUSA STUDIO — reloj en vivo, hora de Argentina (ART, UTC-3)
   ========================================================================== */

(function () {
  'use strict';

  const clock = document.getElementById('art-clock');
  if (!clock) return;

  const formatter = new Intl.DateTimeFormat('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const tick = () => {
    clock.textContent = `${formatter.format(new Date())} — ART`;
  };

  tick();
  setInterval(tick, 1000);
})();
