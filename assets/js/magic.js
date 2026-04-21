// magic.js — theme engine + slow magical hero gallery

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;

  /* -------------------------------------------------- */
  /* THEME ENGINE — DAY / NIGHT                         */
  /* -------------------------------------------------- */

  const toggle =
    document.getElementById('theme-toggle') ||
    document.querySelector('.header-toggle, .toggle-icon, [data-role="theme-toggle"]');

  function applyTheme(theme) {
    const safeTheme = theme === 'night' ? 'night' : 'day';
    body.setAttribute('data-theme', safeTheme);
    localStorage.setItem('cc-theme', safeTheme);
  }

  function getInitialTheme() {
    const saved = localStorage.getItem('cc-theme');
    if (saved === 'day' || saved === 'night') return saved;

    const prefersDark =
      window.matchMedia &&
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
  /* HERO GALLERY — SLOW, MAGICAL FADES                 */
  /* -------------------------------------------------- */

  if (!body.classList.contains('home')) return;

  const LEFT_LANE = document.querySelector('.gallery-left');
  const RIGHT_LANE = document.querySelector('.gallery-right');

  if (!LEFT_LANE || !RIGHT_LANE) return;

  const GALLERY_PAGE_URL = '/crown-creatives-v2/gallery/';
  const GALLERY_PREFIX = '/crown-creatives-v2/assets/images/gallery/';

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async function fetchGalleryImages() {
    try {
      const response = await fetch(GALLERY_PAGE_URL, { credentials: 'omit' });
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
        .filter(src =>
          src &&
          src.trim() !== '' &&
          src.startsWith(GALLERY_PREFIX)
        );

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
    return img;
  }

  function startGalleryCycle(images) {
    if (!images.length) {
      console.warn('No gallery images found.');
      return;
    }

    shuffle(images);

    let index = 0;
    let useLeft = true;

    const VISIBLE_TIME = 8000; // image fully visible
    const FADE_TIME = 4000;    // slow magical fade

    function showNext() {
      const lane = useLeft ? LEFT_LANE : RIGHT_LANE;
      lane.innerHTML = '';

      const src = images[index];
      const img = createLaneImage(src);
      lane.appendChild(img);

      // fade in
      requestAnimationFrame(() => {
        img.style.opacity = '1';
      });

      // schedule fade out
      setTimeout(() => {
        img.style.opacity = '0';

        // after fade, move to next image + lane
        setTimeout(() => {
          index = (index + 1) % images.length;
          useLeft = !useLeft;
          showNext();
        }, FADE_TIME);
      }, VISIBLE_TIME);
    }

    showNext();
  }

  async function initGallery() {
    const images = await fetchGalleryImages();
    startGalleryCycle(images);
  }

  initGallery();
});
