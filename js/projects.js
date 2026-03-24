const container = document.getElementById("projectsContainer");
let projects = [];

async function loadProjects() {
  const res = await fetch("./data/projects.json");
  projects = await res.json();
  renderProjects(projects);
}

function renderProjects(data) {
  container.innerHTML = "";

  data.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <div class="card-image">
        <img src="${project.image}">
      </div>
      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;

card.onclick = () => {
  navigateToProject(project.id);
};

    container.appendChild(card);
  });
}
