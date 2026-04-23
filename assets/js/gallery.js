/* ============================================================
   Crown Creatives — Hero Gallery Engine (v3)
   Handles:
   - Left + right lane image fading
   - Smooth crossfade timing
   - Infinite looping
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const leftLane = document.querySelectorAll(".gallery-left .lane-img");
  const rightLane = document.querySelectorAll(".gallery-right .lane-img");

  if (!leftLane.length || !rightLane.length) return;

  let leftIndex = 0;
  let rightIndex = 0;

  /* ------------------------------------------------------------
     INITIAL STATE
     ------------------------------------------------------------ */
  leftLane[0].style.opacity = 1;
  rightLane[0].style.opacity = 1;

  /* ------------------------------------------------------------
     FADE FUNCTION
     ------------------------------------------------------------ */
  function fadeNext(lane, index) {
    lane.forEach(img => (img.style.opacity = 0));
    lane[index].style.opacity = 1;
  }

  /* ------------------------------------------------------------
     LOOP ENGINE
     ------------------------------------------------------------ */
  setInterval(() => {
    leftIndex = (leftIndex + 1) % leftLane.length;
    rightIndex = (rightIndex + 1) % rightLane.length;

    fadeNext(leftLane, leftIndex);
    fadeNext(rightLane, rightIndex);

  }, 4000); // 4s per image
});
