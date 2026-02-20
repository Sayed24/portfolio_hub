const toggle = document.getElementById("themeToggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}

toggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "light" ? "dark" : "light";
  setTheme(newTheme);
});

document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("theme") || "light";
  setTheme(saved);
});
