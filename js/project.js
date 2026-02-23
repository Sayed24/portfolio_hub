const container = document.getElementById("projectContent");

const params = new URLSearchParams(window.location.search);
const projectId = params.get("id");

async function loadProject() {

  const res = await fetch("./data/projects.json");
  const projects = await res.json();

  const project = projects.find(p => p.id === projectId);

  if (!project) {
    container.innerHTML = "<h2>Project not found</h2>";
    return;
  }

  trackProjectView(project.id);

  container.innerHTML = `
    <section class="project-hero">
      <h1>${project.title}</h1>
      <p>${project.description}</p>
    </section>

    <img class="project-image"
         src="${project.image}"
         loading="lazy">

    <div class="project-details">
      <h3>Technologies</h3>
      <p>${project.tags.join(", ")}</p>

      <a href="${project.url}" target="_blank"
         class="primary-btn">Visit Live Project</a>
    </div>
  `;
}

function trackProjectView(id){
  let heat = JSON.parse(localStorage.getItem("heatmap")) || {};
  heat[id] = (heat[id] || 0) + 1;
  localStorage.setItem("heatmap", JSON.stringify(heat));
}

loadProject();
