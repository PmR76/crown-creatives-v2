/* ============================================================
   Crown Creatives — Gallery Engine (v3)
   Handles:
   - Staggered fade-in of gallery tiles
   - Scroll-based reveal
   - Performance-friendly intersection observer
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const tiles = document.querySelectorAll(".magic-gallery-tile");
  if (!tiles.length) return;

  /* ------------------------------------------------------------
     STAGGERED INITIAL FADE-IN
     ------------------------------------------------------------ */
  let delay = 150;

  tiles.forEach(tile => {
    setTimeout(() => {
      tile.style.opacity = "1";
    }, delay);
    delay += 120;
  });

  /* ------------------------------------------------------------
     SCROLL REVEAL (Intersection Observer)
     ------------------------------------------------------------ */
  const revealOptions = {
    threshold: 0.15
  };

  const revealTile = (entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
    }
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(revealTile);
  }, revealOptions);

  tiles.forEach(tile => observer.observe(tile));
});
