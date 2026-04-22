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
   HERO GALLERY LANES
   ------------------------------------------------------------ */

function startGalleryLane(selector) {
  const lane = document.querySelector(selector);
  if (!lane) return;

  // Collect gallery images from gallery page
  const galleryImages = Array.from(
    document.querySelectorAll('.magic-gallery-tile img')
  );

  if (galleryImages.length === 0) return;

  function cycle() {
    const img = galleryImages[Math.floor(Math.random() * galleryImages.length)].cloneNode();
    img.classList.add('lane-img');
    lane.appendChild(img);

    requestAnimationFrame(() => img.style.opacity = 1);

    setTimeout(() => {
      img.style.opacity = 0;
      setTimeout(() => img.remove(), 4000);
    }, 6000);
  }

  cycle();
  setInterval(cycle, 5000);
}

startGalleryLane('.gallery-left');
startGalleryLane('.gallery-right');


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
