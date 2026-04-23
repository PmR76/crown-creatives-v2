/* ============================================================
   Crown Creatives — Inspirational Ticker Engine (v2)
   Ensures smooth infinite scrolling and resets on resize
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".ticker-track");
  if (!track) return;

  function resetTicker() {
    track.style.animation = "none";
    void track.offsetWidth; // force reflow
    track.style.animation = "";
  }

  window.addEventListener("resize", resetTicker);
});
