/* ============================================================
   Crown Creatives — Theme Toggle Engine (v3)
   Handles:
   - Day/Night theme switching
   - Icon swapping
   - Local storage persistence
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggleButton = document.querySelector(".theme-toggle");
  const toggleIcon = document.querySelector(".theme-icon");

  if (!toggleButton || !toggleIcon) return;

  /* ------------------------------------------------------------
     LOAD SAVED THEME
     ------------------------------------------------------------ */
  const savedTheme = localStorage.getItem("cc-theme");

  if (savedTheme === "night" || savedTheme === "day") {
    body.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);
  } else {
    // Default to day
    body.setAttribute("data-theme", "day");
    updateIcon("day");
  }

  /* ------------------------------------------------------------
     TOGGLE THEME
     ------------------------------------------------------------ */
  toggleButton.addEventListener("click", () => {
    const current = body.getAttribute("data-theme");
    const next = current === "day" ? "night" : "day";

    body.setAttribute("data-theme", next);
    localStorage.setItem("cc-theme", next);
    updateIcon(next);
  });

  /* ------------------------------------------------------------
     ICON SWAP
     ------------------------------------------------------------ */
  function updateIcon(theme) {
    if (theme === "night") {
      toggleIcon.src = "/assets/icons/moon.svg";
      toggleIcon.alt = "Switch to day mode";
    } else {
      toggleIcon.src = "/assets/icons/sun.svg";
      toggleIcon.alt = "Switch to night mode";
    }
  }
});
