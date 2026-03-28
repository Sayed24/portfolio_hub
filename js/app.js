const app = document.getElementById("app");
let projects = [];

/* LOAD PROJECTS */
async function loadProjects() {
  const res = await fetch("data/projects.json");
  projects = await res.json();
  renderProjects(projects);
}

/* SHOW GRID */
function renderProjects(data) {
  app.innerHTML = "";

  data.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";

    card.style.animation = `fadeIn 0.5s ease ${i * 0.05}s forwards`;
    card.style.opacity = "0";

    card.innerHTML = `
      <img src="${p.image}" loading="lazy">
      <div class="card-content">
        <h3>${p.title}</h3>
        <p>${p.description}</p>
      </div>
    `;

    card.onclick = () => openProject(p);

    app.appendChild(card);
  });
}

    card.onclick = () => openProject(p);

    app.appendChild(card);
  });
}

/* PROJECT PAGE */
function openProject(p) {
  app.innerHTML = `
    <div class="project-page">
      <button id="backBtn">← Back</button>
      <img src="${p.image}">
      <h1>${p.title}</h1>
      <p>${p.description}</p>
      <a href="${p.link}" target="_blank">Visit Project</a>
    </div>
  `;

  document.getElementById("backBtn").onclick = () => {
    renderProjects(projects);
  };
}

/* SEARCH */
document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(val)
  );

  renderProjects(filtered);
});

/* THEME */
document.getElementById("themeToggle").onclick = () => {
  const current = document.documentElement.getAttribute("data-theme");

  const newTheme = current === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
};

/* RECRUITER MODE */
document.getElementById("recruiterBtn").onclick = () => {
  renderProjects(projects.slice(0,5));
};

/* ANALYTICS */
document.getElementById("dashboardBtn").onclick = () => {
  app.innerHTML = "<h2>Analytics Coming Soon</h2>";
};

/* CHAT */
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");

chatBtn.onclick = () => chatBox.classList.toggle("open");

document.getElementById("chatInput").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const text = e.target.value;

    const msg = document.createElement("p");
    msg.innerText = text;

    document.getElementById("messages").appendChild(msg);
    e.target.value = "";
  }
});

/* START */
loadProjects();
