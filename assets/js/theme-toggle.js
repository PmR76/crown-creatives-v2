(function () {
  const STORAGE_KEY = 'cc-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');

  function getPreferredTheme() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') return stored;

    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    return mq.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    localStorage.setItem(STORAGE_KEY, theme);
  }

  function initTheme() {
    applyTheme(getPreferredTheme());
  }

  function toggleTheme() {
    const current = root.getAttribute('data-theme') || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    applyTheme(next);
  }

  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    if (toggle) toggle.addEventListener('click', toggleTheme);
  });
})();
