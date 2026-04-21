// js.magic.js — Theme engine, crown swap, hero gallery

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  /* -------------------------------------------------- */
  /* THEME ENGINE — DAY / NIGHT                         */
  /* -------------------------------------------------- */

  const toggle =
    document.getElementById('theme-toggle') ||
    document.querySelector('.header-toggle, .toggle-icon, [data-role="theme-toggle"]');

  const heroCrown = document.getElementById('hero-crown');
  const DAY_CROWN_SRC = './assets/img/day-crown.svg';
  const NIGHT_CROWN_SRC = './assets/img/night-crown.svg';

  function applyTheme(theme) {
    const safeTheme = theme === 'night' ? 'night' : 'day';
    body.setAttribute('data-theme', safeTheme);
    localStorage.setItem('cc-theme', safeTheme);

    // Optional: single hero crown image swap
    if (heroCrown) {
      heroCrown.src = safeTheme === 'night' ? NIGHT_CROWN_SRC : DAY_CROWN_SRC;
      heroCrown.style.opacity = '0';
      requestAnimationFrame(() => {
        heroCrown.style.opacity = '1';
      });
    }
  }

  function getInitialTheme() {
    const saved = localStorage.getItem('cc-theme');
    if (saved === 'day' || saved === 'night') return saved;

    // Fallback: follow system preference on first visit
    const prefersDark = window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'night' : 'day';
  }

  const initialTheme = getInitialTheme();
  applyTheme(initialTheme);

  if (toggle) {
    toggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme') || 'day';
      const next = current === 'day' ? 'night' : 'day';
      applyTheme(next);
    });
  }

  /* -------------------------------------------------- */
  /* HERO GALLERY — AUTOSCAN ENGINE                     */
  /* -------------------------------------------------- */

  // Only run on home page
  if (!body.classList.contains('home')) return;

  const LEFT_LANE = document.querySelector('.gallery-left');
  const RIGHT_LANE = document.querySelector('.gallery-right');

  if (!LEFT_LANE || !RIGHT_LANE) return;

  // GitHub Pages–safe relative URL
  const GALLERY_URL = './gallery/';

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function fetchGalleryImages() {
    try {
      const response = await fetch(GALLERY_URL, { credentials: 'omit' });
      if (!response.ok) {
        console.error('Gallery fetch failed:', response.status);
        return [];
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');

      const imgs = Array.from(doc.querySelectorAll('img'));

      const sources = imgs
        .map(img => img.getAttribute('src'))
        .filter(src => src && src.trim() !== '');

      // Deduplicate
      return Array.from(new Set(sources));
    } catch (err) {
      console.error('Error fetching gallery:', err);
      return [];
    }
  }

  function createLaneImage(src) {
    const img = document.createElement('img');
    img.src = src;
    img.loading = 'lazy';
    img.decoding = 'async';
    img.classList.add('lane-img');
    // Fade in once loaded
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    return img;
  }

  function populateLanes(images) {
    if (!images.length) {
      console.warn('No gallery images found.');
      return;
    }

    shuffle(images);

    images.forEach((src, index) => {
      const img = createLaneImage(src);
      if (index % 2 === 0) {
        LEFT_LANE.appendChild(img);
      } else {
        RIGHT_LANE.appendChild(img);
      }
    });
  }

  async function initGalleryLanes() {
    const images = await fetchGalleryImages();
    populateLanes(images);
  }

  initGalleryLanes();
});
