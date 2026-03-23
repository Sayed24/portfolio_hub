const toggle = document.getElementById("themeToggle");

toggle.onclick = () => {
  const current = document.documentElement.getAttribute("data-theme");

  const newTheme = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

(function () {
  const saved = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", saved);
})();
