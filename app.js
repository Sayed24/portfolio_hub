let projectsData = [];

const grid = document.getElementById("projects");
const modal = document.getElementById("modal");

fetch("projects.json")
  .then(res => res.json())
  .then(data => {
    projectsData = data;
    renderProjects(data);
  });

function renderProjects(list) {
  grid.innerHTML = "";
  list.forEach(p => {
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

function openModal(id) {
  const p = projectsData.find(x => x.id === id);
  modal.innerHTML = `
    <div>
      <h2>${p.title}</h2>
      <p>${p.case}</p>
      <a href="#" target="_blank">Visit Project →</a><br><br>
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

/* Theme */
document.getElementById("themeToggle").onclick = () => {
  const html = document.documentElement;
  html.dataset.theme = html.dataset.theme === "dark" ? "light" : "dark";
};

/* Recruiter Mode */
document.getElementById("recruiterToggle").onclick = () => {
  document.body.classList.toggle("recruiter");
};

/* PWA */
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js");
}

