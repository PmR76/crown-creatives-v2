/* ============================================================
   Crown Creatives — Magic Engine (v3)
   Handles:
   - Hero crown fade-in
   - Hero gallery lane animations
   - Lightbox system
   - Smooth scroll to top
   ============================================================ */


/* ------------------------------------------------------------
   HERO CROWN FADE-IN
   ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const homeCrown = document.querySelector(".home-crown");
  if (homeCrown) {
    setTimeout(() => {
      homeCrown.style.opacity = "1";
    }, 300);
  }
});


/* ------------------------------------------------------------
   HERO GALLERY — FLOATING LANES
   ------------------------------------------------------------ */

function fadeInLaneImages() {
  const laneImages = document.querySelectorAll(".lane-img");
  let delay = 200;

  laneImages.forEach(img => {
    setTimeout(() => {
      img.style.opacity = "1";
    }, delay);
    delay += 400;
  });
}

document.addEventListener("DOMContentLoaded", fadeInLaneImages);


/* ------------------------------------------------------------
   LIGHTBOX ENGINE
   ------------------------------------------------------------ */

const lightbox = document.querySelector(".magic-lightbox");
const lightboxImage = document.querySelector(".magic-lightbox-image");
const lightboxBackdrop = document.querySelector(".magic-lightbox-backdrop");
const lightboxClose = document.querySelector(".magic-lightbox-close");
const lightboxPrev = document.querySelector(".magic-lightbox-prev");
const lightboxNext = document.querySelector(".magic-lightbox-next");

let galleryImages = [];
let currentIndex = 0;

function openLightbox(index) {
  currentIndex = index;
  lightboxImage.src = galleryImages[index].src;
  lightbox.classList.add("is-active");
}

function closeLightbox() {
  lightbox.classList.remove("is-active");
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  lightboxImage.src = galleryImages[currentIndex].src;
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  lightboxImage.src = galleryImages[currentIndex].src;
}

document.addEventListener("DOMContentLoaded", () => {
  galleryImages = Array.from(document.querySelectorAll(".magic-gallery-tile img"));

  galleryImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener("click", closeLightbox);
  if (lightboxPrev) lightboxPrev.addEventListener("click", showPrev);
  if (lightboxNext) lightboxNext.addEventListener("click", showNext);

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
});


/* ------------------------------------------------------------
   SMOOTH SCROLL TO TOP
   ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const backToTop = document.querySelector(".footer-backtotop a");
  if (backToTop) {
    backToTop.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
});
/* ------------------------------------------------------------
   THEME TOGGLE (Day/Night Mode)
   ------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.querySelector(".theme-toggle");
  const html = document.documentElement;

  const dayCrown = document.querySelector(".crown-day");
  const nightCrown = document.querySelector(".crown-night");

  if (!toggleButton) return;

  toggleButton.addEventListener("click", () => {
    html.classList.toggle("dark-theme");

    const isDark = html.classList.contains("dark-theme");

    if (dayCrown && nightCrown) {
      dayCrown.style.display = isDark ? "none" : "block";
      nightCrown.style.display = isDark ? "block" : "none";
    }
  });
});

