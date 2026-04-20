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
/* -------------------------------------------------- */
/* HERO GALLERY RANDOM IMAGE ENGINE                   */
/* -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  // Only run on home page
  if (!document.body.classList.contains("home")) return;

  const leftLane = document.querySelector(".gallery-left");
  const rightLane = document.querySelector(".gallery-right");

  const galleryImages = [];

  // Fetch directory listing and extract image names
  fetch("/assets/images/gallery/")
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const html = parser.parseFromString(text, "text/html");

      html.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (href.match(/\.(jpg|jpeg|png)$/i)) {
          galleryImages.push("/assets/images/gallery/" + href);
        }
      });

      if (galleryImages.length > 0) {
        startGalleryCycle();
      }
    });

  function startGalleryCycle() {
    showRandomImage();
    setInterval(showRandomImage, 16000); // 3s fade in + 10s hold + 3s fade out
  }

  function showRandomImage() {
    const imgSrc = galleryImages[Math.floor(Math.random() * galleryImages.length)];
    const lane = Math.random() < 0.5 ? leftLane : rightLane;

    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.opacity = "0";

    lane.innerHTML = "";
    lane.appendChild(img);

    setTimeout(() => { img.style.opacity = "1"; }, 100);   // fade in
    setTimeout(() => { img.style.opacity = "0"; }, 13000); // fade out
  }

});
