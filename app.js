let projectsData = [];

/* Load from localStorage first (admin), fallback to JSON */
const localProjects = JSON.parse(localStorage.getItem("projects"));
if (localProjects && localProjects.length) {
  projectsData = localProjects;
  renderProjects(projectsData);
} else {
  fetch("projects.json")
    .then(res => res.json())
    .then(data => {
      projectsData = data;
      renderProjects(data);
    });
}

const grid = document.getElementById("projects");
const modal = document.getElementById("modal");

/* Render */
function renderProjects(list) {
  if (!grid) return;
  grid.innerHTML = "";

  const sorted = [...list].sort((a, b) => b.featured - a.featured);

  sorted.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.category = p.category;

    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>${p.tagline}</p>
        <div class="details">${p.breakdown}</div>
        <button onclick="openModal(${p.id})">View Project</button>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* Modal */
function openModal(id) {
  const p = projectsData.find(x => x.id === id);
  modal.innerHTML = `
    <div>
      <h2>${p.title}</h2>
      <p>${p.case}</p>
      <button onclick="closeModal()">Close</button>
    </div>
  `;
  modal.classList.remove("hidden");
}

function closeModal() {
  modal.classList.add("hidden");
}

/* Filters */
document.querySelectorAll(".filters button").forEach(btn => {
  btn.onclick = () => {
    const f = btn.dataset.filter;
    if (f === "all") renderProjects(projectsData);
    else if (f === "featured") renderProjects(projectsData.filter(p => p.featured));
    else renderProjects(projectsData.filter(p => p.category === f));
  };
});

/* Dark Mode with memory */
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("theme");
if (savedTheme) document.documentElement.dataset.theme = savedTheme;

themeToggle?.addEventListener("click", () => {
  const current = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = current;
  localStorage.setItem("theme", current);
});

/* Recruiter Mode */
document.getElementById("recruiterToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("recruiter");
});

/* Auto Language Detection */
const userLang = navigator.language.startsWith("es") ? "es" : "en";

fetch("i18n.json")
  .then(r => r.json())
  .then(data => {
    const langData = data[userLang];
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.dataset.i18n;
      el.textContent = langData[key];
    });
  });

/* Privacy Analytics (local only) */
const visits = Number(localStorage.getItem("visits") || 0) + 1;
localStorage.setItem("visits", visits);
console.log("Total Visits:", visits);

/* PWA */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}
