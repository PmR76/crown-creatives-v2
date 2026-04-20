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
/*  HERO GALLERY — FINAL PRODUCTION VERSION           */
/* -------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {

  /* Only run on home page */
  if (!document.body.classList.contains("home")) return;

  const leftLane = document.querySelector(".gallery-left");
  const rightLane = document.querySelector(".gallery-right");
  if (!leftLane || !rightLane) return;

  const galleryImages = [];

  /* Auto-scan gallery folder */
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

  /* Start cycle */
  function startGalleryCycle() {
    showRandomImage();
    setInterval(showRandomImage, 16000);
  }

  /* Show random image */
  function showRandomImage() {
    if (galleryImages.length === 0) return;

    const imgSrc = galleryImages[Math.floor(Math.random() * galleryImages.length)];
    const lane = Math.random() < 0.5 ? leftLane : rightLane;

    const img = document.createElement("img");
    img.src = imgSrc;
    img.style.opacity = "0";

    lane.innerHTML = "";
    lane.appendChild(img);

    setTimeout(() => { img.style.opacity = "1"; }, 100);
    setTimeout(() => { img.style.opacity = "0"; }, 13000);
  }

});
