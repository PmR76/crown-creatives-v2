/* ============================================================
   Crown Creatives — Theme Toggle Engine (v4)
   JS-driven theme system (Option A)
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
  } else {
    body.setAttribute("data-theme", "day");
  }

  updateIcon(body.getAttribute("data-theme"));

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
    toggleIcon.src = "/assets/icons/sun-moon-magic.svg";
    toggleIcon.alt = theme === "night"
      ? "Switch to day mode"
      : "Switch to night mode";
  }
});
