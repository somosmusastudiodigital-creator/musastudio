/* ==========================================================================
   MUSA STUDIO — burbuja de contacto (se abre desde el link "Contact" del
   navbar). No bloquea la página: sigue siendo scrolleable/usable detrás,
   se cierra solo con el botón X (o Escape, como bonus de accesibilidad).
   ========================================================================== */

(function () {
  'use strict';

  const modal = document.getElementById('contact-modal');
  if (!modal) return;

  const triggers = document.querySelectorAll('[data-modal-trigger="contact"]');
  const closers = modal.querySelectorAll('[data-modal-close]');
  let lastFocused = null;

  const open = () => {
    lastFocused = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    const closeBtn = modal.querySelector('.contact-modal__close');
    if (closeBtn) closeBtn.focus();
  };

  const close = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (lastFocused) lastFocused.focus();
  };

  triggers.forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      open();
    });
  });

  closers.forEach((closer) => {
    closer.addEventListener('click', close);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      close();
    }
  });
})();
