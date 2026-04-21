/* -------------------------------------------------- */
/*  CROWN CREATIVES — THEME ENGINE                    */
/* -------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  const body = document.body;

  /* Restore saved theme */
  const savedTheme = localStorage.getItem('cc-theme');
  if (savedTheme === 'day' || savedTheme === 'night') {
    body.setAttribute('data-theme', savedTheme);
  } else {
    body.setAttribute('data-theme', 'day');
  }

  /* Theme toggle */
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

/* -------------------------------------------------- */
/*  HERO GALLERY — AUTOSCAN ENGINE (FINAL VERSION)    */
/* -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  /* Only run on home page */
  if (!document.body.classList.contains("home")) return;

  const LEFT_LANE = document.querySelector(".gallery-left");
  const RIGHT_LANE = document.querySelector(".gallery-right");
  if (!LEFT_LANE || !RIGHT_LANE) return;

  const GALLERY_URL = "/crown-creatives-v2/gallery/";

  /* Utility: Shuffle array */
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  /* Fetch gallery page → extract <img> tags */
  async function fetchGalleryImages() {
    try {
      const response = await fetch(GALLERY_URL);
      if (!response.ok) {
        console.error("Gallery fetch failed:", response.status);
        return [];
      }

      const html = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, "text/html");

      const imgs = [...doc.querySelectorAll("img")];

      const sources = imgs
        .map(img => img.getAttribute("src"))
        .filter(src => src && src.trim() !== "");

      return [...new Set(sources)];

    } catch (err) {
      console.error("Error fetching gallery:", err);
      return [];
    }
  }

  /* Create lane image */
  function createLaneImage(src) {
    const img = document.createElement("img");
    img.src = src;
    img.loading = "lazy";
    img.decoding = "async";
    img.classList.add("lane-img");
    return img;
  }

  /* Populate lanes */
  function populateLanes(images) {
    if (!images.length) {
      console.warn("No gallery images found.");
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

  /* Initialise */
  async function initGalleryLanes() {
    const images = await fetchGalleryImages();
    populateLanes(images);
  }

  initGalleryLanes();

});
