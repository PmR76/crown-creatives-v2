/* ============================================================
   Crown Creatives — magic.js (Production Ready)
   Handles:
   - Theme toggle
   - Crown day/night transition
   - Hero gallery lanes
   - Lightbox (gallery page)
   ============================================================ */

/* ------------------------------------------------------------
   THEME TOGGLE
   ------------------------------------------------------------ */

const html = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');

themeToggle.addEventListener('click', () => {
  html.classList.toggle('dark-theme');
  updateCrown();
});


/* ------------------------------------------------------------
   CROWN TRANSITION (HOME HERO)
   ------------------------------------------------------------ */

const dayCrown = document.querySelector('.crown-day');
const nightCrown = document.querySelector('.crown-night');

function updateCrown() {
  if (!dayCrown || !nightCrown) return;

  if (html.classList.contains('dark-theme')) {
    dayCrown.style.opacity = 0;
    nightCrown.style.opacity = 1;
  } else {
    dayCrown.style.opacity = 1;
    nightCrown.style.opacity = 0;
  }
}

updateCrown();

/* ------------------------------------------------------------
   HERO GALLERY — AUTO SCAN + RANDOM + FADE + HOLD 10s
   HOME PAGE ONLY
   ------------------------------------------------------------ */

(function() {

  // Only run on the home page
  if (!document.body.classList.contains('home')) return;

  const leftLane = document.querySelector('.gallery-left');
  const rightLane = document.querySelector('.gallery-right');

  if (!leftLane || !rightLane) return;

  // Folder to scan
  const galleryPath = '/assets/images/gallery/';

  // File types allowed
  const extensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

  // Auto-scan engine
  async function loadGalleryImages() {
    try {
      const response = await fetch(galleryPath);
      const text = await response.text();

      // Extract filenames
      const matches = [...text.matchAll(/href="([^"]+)"/g)]
        .map(m => m[1])
        .filter(file => extensions.some(ext => file.toLowerCase().endsWith(ext)));

      return matches.map(file => galleryPath + file);

    } catch (e) {
      console.error('Gallery scan failed:', e);
      return [];
    }
  }

  // Fade cycle: fade in → hold 10s → fade out
  function cycleImage(lane, images) {
    if (!images.length) return;

    const src = images[Math.floor(Math.random() * images.length)];
    const img = document.createElement('img');
    img.src = src;
    img.classList.add('lane-img');
    lane.appendChild(img);

    // Fade in
    requestAnimationFrame(() => img.style.opacity = 1);

    // Hold 10 seconds
    setTimeout(() => {
      img.style.opacity = 0;

      // Remove after fade out
      setTimeout(() => img.remove(), 2000);

    }, 10000);
  }

  // Start engine
  loadGalleryImages().then(images => {
    if (!images.length) return;

    // Left lane cycle
    setInterval(() => cycleImage(leftLane, images), 14000);
    cycleImage(leftLane, images);

    // Right lane cycle
    setInterval(() => cycleImage(rightLane, images), 14000);
    setTimeout(() => cycleImage(rightLane, images), 7000); // offset for staggered magic
  });

})();


/* ------------------------------------------------------------
   LIGHTBOX (GALLERY PAGE)
   ------------------------------------------------------------ */

const lightbox = document.querySelector('.magic-lightbox');
if (lightbox) {
  const lightboxImg = document.querySelector('.magic-lightbox-image');
  const tiles = document.querySelectorAll('.magic-gallery-tile img');
  const closeBtn = document.querySelector('.magic-lightbox-close');
  const prevBtn = document.querySelector('.magic-lightbox-prev');
  const nextBtn = document.querySelector('.magic-lightbox-next');

  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = tiles[index].src;
    lightbox.classList.add('is-active');
  }

  function closeLightbox() {
    lightbox.classList.remove('is-active');
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + tiles.length) % tiles.length;
    lightboxImg.src = tiles[currentIndex].src;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % tiles.length;
    lightboxImg.src = tiles[currentIndex].src;
  }

  tiles.forEach((tile, index) => {
    tile.addEventListener('click', () => openLightbox(index));
  });

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrev);
  nextBtn.addEventListener('click', showNext);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
