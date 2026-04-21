// js.magic.js — Production‑ready theme + crown swap controller
document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  const crownImg = document.getElementById('hero-crown');

  // Fail silently if markup is missing
  if (!toggle || !crownImg) return;

  // Use relative paths (GitHub Pages safe)
  const DAY_SRC = './assets/img/day-crown.svg';
  const NIGHT_SRC = './assets/img/night-crown.svg';

  // Smooth transition class
  crownImg.classList.add('crown-transition');

  // Apply theme + crown swap
  function applyTheme(theme) {
    root.dataset.theme = theme;

    // Swap crown image
    crownImg.src = theme === 'dark' ? NIGHT_SRC : DAY_SRC;

    // Trigger CSS transition
    crownImg.style.opacity = '0';
    requestAnimationFrame(() => {
      crownImg.style.opacity = '1';
    });
  }

  // Determine initial theme
  function getInitialTheme() {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;

    // First visit → follow system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  }

  // Initialize
  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  // Toggle handler
  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });
});
