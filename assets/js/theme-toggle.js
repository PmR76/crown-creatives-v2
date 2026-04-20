// ============================================================
//  Crown Creatives — Theme Toggle Engine (Production Ready)
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const icon = document.querySelector(".theme-icon");

  if (!toggle || !icon) {
    console.warn("Theme toggle not found.");
    return;
  }

  // ------------------------------------------------------------
  // Load saved theme
  // ------------------------------------------------------------
  const saved = localStorage.getItem("cc-theme");

  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  } else {
    root.setAttribute("data-theme", "light");
  }

  // ------------------------------------------------------------
  // Smooth transition
  // ------------------------------------------------------------
  function applyTransition() {
    root.style.transition =
      "background 1s ease, color 1s ease, filter 1s ease";
  }

  setTimeout(applyTransition, 50);

  // ------------------------------------------------------------
  // Update icon
  // ------------------------------------------------------------
  function updateIcon(theme) {
    icon.src = theme === "dark"
      ? "/assets/icons/moon.svg"
      : "/assets/icons/sun.svg";
  }

  updateIcon(root.getAttribute("data-theme"));

  // ------------------------------------------------------------
  // Toggle theme
  // ------------------------------------------------------------
  toggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";

    root.setAttribute("data-theme", next);
    localStorage.setItem("cc-theme", next);
    updateIcon(next);
    applyTransition();
  });
});
