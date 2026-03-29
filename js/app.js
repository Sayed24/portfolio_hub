const app = document.getElementById("app");

const titleText = "Crafting Scalable & Modern Web Applications";
let index = 0;

function typeEffect() {
  if (index < titleText.length) {
    document.getElementById("heroTitle").innerHTML += titleText.charAt(index);
    index++;
    setTimeout(typeEffect, 40);
  }
}

typeEffect();

document.getElementById("viewProjectsBtn").onclick = () => {
  document.getElementById("app").scrollIntoView({
    behavior: "smooth"
  });
};

let projects = [];

/* =========================
   LOAD PROJECTS
========================= */
async function loadProjects() {
  const res = await fetch("data/projects.json");
  projects = await res.json();
  renderProjects(projects);
}

/* =========================
   RENDER PROJECT GRID
========================= */
function renderProjects(data) {
  app.innerHTML = "";

  data.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";

    // Apple-style animation delay
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

/* =========================
   PROJECT DETAIL PAGE
========================= */
function openProject(p) {
  app.innerHTML = `
    <div class="project-page fadeIn">
      <button id="backBtn">← Back</button>

      <img src="${p.image}">
      <h1>${p.title}</h1>
      <p>${p.description}</p>

      <a href="${p.link}" target="_blank">Visit Project →</a>
    </div>
  `;

  document.getElementById("backBtn").onclick = () => {
    renderProjects(projects);
  };
}

/* =========================
   SEARCH SYSTEM
========================= */
document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(val)
  );

  renderProjects(filtered);
});

/* =========================
   DARK MODE (AUTO + TOGGLE)
========================= */
(function () {
  const saved = localStorage.getItem("theme");

  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.setAttribute("data-theme", prefersDark ? "dark" : "light");
  }
})();

document.getElementById("themeToggle").onclick = () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";

  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
};

/* =========================
   RECRUITER MODE
========================= */
document.getElementById("recruiterBtn").onclick = () => {
  const topProjects = projects.slice(0, 5);
  renderProjects(topProjects);
};

/* =========================
   ANALYTICS PLACEHOLDER
========================= */
document.getElementById("dashboardBtn").onclick = () => {
  app.innerHTML = `
    <div class="project-page">
      <h2>📊 Analytics Dashboard</h2>
      <p>Coming soon (views, clicks, heatmap)</p>
    </div>
  `;
};

/* =========================
   CHATBOT SYSTEM
========================= */
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
const messages = document.getElementById("messages");

chatBtn.onclick = () => chatBox.classList.toggle("open");

document.getElementById("chatInput").addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const text = e.target.value.trim();
    if (!text) return;

    const userMsg = document.createElement("p");
    userMsg.innerHTML = `<b>You:</b> ${text}`;

    const aiMsg = document.createElement("p");
    aiMsg.innerHTML = `<b>AI:</b> ${getAIResponse(text.toLowerCase())}`;

    messages.appendChild(userMsg);
    messages.appendChild(aiMsg);

    e.target.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
});

/* SIMPLE AI RESPONSES */
function getAIResponse(input) {
  if (input.includes("skill")) return "Strong in JavaScript, UI/UX, dashboards, and modern web apps.";
  if (input.includes("project")) return "This portfolio contains 20+ real-world projects.";
  if (input.includes("experience")) return "Built dynamic SPA systems with analytics and PWA features.";

  return "Ask me about skills, projects, or experience.";
}

/* =========================
   START APP
========================= */
loadProjects();
