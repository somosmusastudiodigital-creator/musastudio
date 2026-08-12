/* ==========================================================================
   MUSA STUDIO — testimonios: tocar la máquina dispensa la siguiente tarjeta
   ========================================================================== */

(function () {
  'use strict';

  const stage = document.querySelector('.testimonials__stage');
  const machine = document.querySelector('.testimonials__machine');
  const cardsBox = document.querySelector('.testimonials__cards');

  if (!stage || !machine || !cardsBox) return;

  let order = [...cardsBox.querySelectorAll('.testimonials__card')];
  if (order.length < 2) return; // nada para rotar

  const render = () => {
    order.forEach((card, i) => {
      card.dataset.stack = String(i);
      card.setAttribute('aria-hidden', i === 0 ? 'false' : 'true');
    });
  };

  const advance = () => {
    order.push(order.shift());
    render();
  };

  render();
  machine.addEventListener('click', advance);
})();
