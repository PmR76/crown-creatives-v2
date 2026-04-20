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
/* -------------------------------------------------- */
/* HERO GALLERY RANDOM IMAGE ENGINE — FINAL VERSION   */
/* -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  // Only run on the home page
  if (!document.body.classList.contains("home")) return;

  const leftLane = document.querySelector(".gallery-left");
  const rightLane = document.querySelector(".gallery-right");

  if (!leftLane || !rightLane) return;

  const galleryImages = [];

  /* -------------------------------------------------- */
  /* 1. AUTO‑SCAN THE GALLERY FOLDER                    */
  /* -------------------------------------------------- */
  fetch("/assets/images/gallery/")
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const html = parser.parseFromString(text, "text/html");

      html.querySelectorAll("a").forEach(link => {
        const href = link.getAttribute("href");
        if (href && href.match(/\.(jpg|jpeg|png|webp)$/i)) {
          galleryImages.push("/assets/images/gallery/" + href);
        }
      });

      if (galleryImages.length > 0) {
        startGalleryCycle();
      }
    })
    .catch(err => console.error("Gallery scan failed:", err));

  /* -------------------------------------------------- */
  /* 2. START THE CYCLE                                 */
  /* -------------------------------------------------- */
  function startGalleryCycle() {
    showRandomImage();
    // 3s fade in + 10s hold + 3s fade out = 16s cycle
    setInterval(showRandomImage, 16000);
  }

  /* -------------------------------------------------- */
  /* 3. SHOW A RANDOM IMAGE IN A RANDOM LANE            */
  /* -------------------------------------------------- */
  function showRandomImage() {
    if (galleryImages.length === 0) return;

    const imgSrc = galleryImages[Math.floor(Math.random() * galleryImages.length)];
    const lane = Math.random() < 0.5 ? leftLane : rightLane;

    // Create the image element
    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.opacity = "0";

    // Clear previous image
    lane.innerHTML = "";
    lane.appendChild(img);

    // Fade in
    setTimeout(() => {
      img.style.opacity = "1";
    }, 100);

    // Fade out after 13 seconds (3s fade in + 10s hold)
    setTimeout(() => {
      img.style.opacity = "0";
    }, 13000);
  }

});
