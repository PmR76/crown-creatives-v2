/* -------------------------------------------------- */
/*  CROWN CREATIVES — BACKGROUND + THEME ENGINE       */
/* -------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  /* -------------------------------------------------- */
  /* 1. RESTORE SAVED THEME                             */
  /* -------------------------------------------------- */
  const savedTheme = localStorage.getItem('cc-theme');

  if (savedTheme === 'day' || savedTheme === 'night') {
    body.setAttribute('data-theme', savedTheme);
  } else {
    body.setAttribute('data-theme', 'day'); // default
  }

  /* -------------------------------------------------- */
  /* 2. THEME TOGGLE HANDLER                            */
  /* -------------------------------------------------- */
  const toggle = document.querySelector('.header-toggle, .toggle-icon, [data-role="theme-toggle"]');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      const next = current === 'day' ? 'night' : 'day';

      body.setAttribute('data-theme', next);
      localStorage.setItem('cc-theme', next);
    });
  }

});
