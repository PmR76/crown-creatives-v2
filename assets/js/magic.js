// ===============================
// Crown Creatives — magic.js
// Production‑ready autoscan engine
// ===============================

// CONFIG
const GALLERY_URL = "/crown-creatives-v2/gallery/";   // Page to autoscan
const LEFT_LANE = document.querySelector(".gallery-left");
const RIGHT_LANE = document.querySelector(".gallery-right");

// Utility: Shuffle array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fetch gallery page → extract all <img> tags → return list of src URLs
async function fetchGalleryImages() {
  try {
    const response = await fetch(GALLERY_URL);
    if (!response.ok) {
      console.error("Gallery fetch failed:", response.status);
      return [];
    }

    const html = await response.text();

    // Parse HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Extract all <img> tags
    const imgs = [...doc.querySelectorAll("img")];

    // Extract src values
    const sources = imgs
      .map(img => img.getAttribute("src"))
      .filter(src => src && src.trim() !== "");

    // Remove duplicates
    return [...new Set(sources)];

  } catch (err) {
    console.error("Error fetching gallery:", err);
    return [];
  }
}

// Create an <img> element for the lane
function createLaneImage(src) {
  const img = document.createElement("img");
  img.src = src;
  img.loading = "lazy";
  img.decoding = "async";
  img.classList.add("lane-img");
  return img;
}

// Populate lanes with alternating images
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

// Initialise autoscan + lane population
async function initGalleryLanes() {
  const images = await fetchGalleryImages();
  populateLanes(images);
}

// Run when DOM is ready
document.addEventListener("DOMContentLoaded", initGalleryLanes);
