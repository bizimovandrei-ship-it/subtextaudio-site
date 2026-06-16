document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav-links]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }
  document.querySelectorAll('form[data-static-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const message = form.querySelector('[data-form-message]');
      if (message) {
        message.hidden = false;
        message.focus?.();
      }
    });
  });
});
