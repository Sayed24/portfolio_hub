const app = document.getElementById("app");
let projects = [];

/* LOAD PROJECTS */
async function loadProjects() {
  const res = await fetch("data/projects.json");
  projects = await res.json();
  renderProjects(projects);
}

/* RENDER GRID */
function renderProjects(data) {
  app.innerHTML = "";

  data.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <img src="${p.image}">
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    `;

    card.onclick = () => showProject(p);

    app.appendChild(card);
  });
}

/* PROJECT PAGE */
function showProject(p) {
  app.innerHTML = `
    <div class="project-page">
      <button onclick="renderProjects(projects)">← Back</button>
      <img src="${p.image}">
      <h1>${p.title}</h1>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">Visit Project</a>
    </div>
  `;
}

/* SEARCH */
document.getElementById("search").oninput = e => {
  const val = e.target.value.toLowerCase();
  renderProjects(projects.filter(p =>
    p.title.toLowerCase().includes(val)
  ));
};

/* THEME */
document.getElementById("themeToggle").onclick = () => {
  const t = document.documentElement.getAttribute("data-theme");
  document.documentElement.setAttribute("data-theme", t === "dark" ? "light" : "dark");
};

/* RECRUITER MODE */
document.getElementById("recruiterBtn").onclick = () => {
  renderProjects(projects.slice(0,5));
};

/* ANALYTICS */
document.getElementById("dashboardBtn").onclick = () => {
  app.innerHTML = "<h2>Analytics (Basic)</h2>";
};

/* CHATBOT */
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");

chatBtn.onclick = () => chatBox.classList.toggle("open");

document.getElementById("chatInput").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const msg = e.target.value;
    document.getElementById("messages").innerHTML += `<p>${msg}</p>`;
    e.target.value = "";
  }
});

/* START */
loadProjects();
