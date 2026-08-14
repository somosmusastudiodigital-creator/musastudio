/* ==========================================================================
   MUSA STUDIO — navbar: menú mobile + link activo según sección visible
   ========================================================================== */

/* Safari en iOS no aplica :active/:hover por CSS en toques a menos que
   haya algún listener de touch en la página — sin esto, el pintado de
   color clave al tocar (archive-index, etc.) deja de funcionar de forma
   intermitente. No hace falta que haga nada, solo que exista. */
document.addEventListener('touchstart', function () {}, { passive: true });

(function () {
  'use strict';

  const toggle = document.querySelector('.navbar__toggle');
  const menu = document.querySelector('.navbar__menu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Cierra el menú al elegir un link (mobile)
    menu.querySelectorAll('.navbar__link').forEach((link) => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Resalta el link de nav correspondiente a la sección visible
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.navbar__link[href^="#"]');

  if (sections.length && navLinks.length && 'IntersectionObserver' in window) {
    const setActive = (id) => {
      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();

/* ==========================================================================
   Videos con autoplay (hero de Home, videos de las páginas de proyecto) —
   refuerzo de autoplay para mobile.
   Con autoplay+muted+playsinline el video debería arrancar solo, pero
   algunos navegadores (modo bajo consumo de iOS, ahorro de datos, etc.)
   igual lo bloquean y muestran el botón de play. Si eso pasa, intentamos
   de nuevo apenas el usuario toca por primera vez en cualquier parte de
   la página — ahí sí el navegador siempre lo permite.
   ========================================================================== */
(function () {
  'use strict';

  const videos = [...document.querySelectorAll('video[autoplay]')];
  if (!videos.length) return;

  const tryPlayAll = () => videos.forEach((v) => v.play().catch(() => {}));

  tryPlayAll();

  const retryOnInteraction = () => {
    tryPlayAll();
    document.removeEventListener('touchstart', retryOnInteraction);
    document.removeEventListener('click', retryOnInteraction);
  };

  if (videos.some((v) => v.paused)) {
    document.addEventListener('touchstart', retryOnInteraction, { once: true, passive: true });
    document.addEventListener('click', retryOnInteraction, { once: true });
  }
})();

/* ==========================================================================
   Toast — aviso breve para links que todavía no llevan a ningún lado
   (ej. "Tienda"): en vez de romper la navegación con un 404, muestra un
   mensaje flotante que se desvanece solo.
   ========================================================================== */
(function () {
  'use strict';

  const triggers = document.querySelectorAll('[data-soon]');
  if (!triggers.length) return;

  let toast = null;
  let hideTimer = null;

  const showToast = (message) => {
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }

    toast.textContent = message;
    clearTimeout(hideTimer);

    requestAnimationFrame(() => toast.classList.add('is-visible'));

    hideTimer = setTimeout(() => {
      toast.classList.remove('is-visible');
    }, 2200);
  };

  triggers.forEach((el) => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      showToast(el.getAttribute('data-soon') || 'Muy pronto');
    });
  });
})();
