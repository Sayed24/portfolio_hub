const grid = document.getElementById("projectsGrid");

async function loadProjects(){

  const res = await fetch("./data/projects.json");
  const projects = await res.json();

  projects.forEach(project => {

    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <img src="${project.image}" loading="lazy">
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;
document.getElementById("resumeToggle").onclick=()=>{
document.body.classList.toggle("resume-mode");
};
    card.onclick = () =>
      window.location.href =
        `project.html?id=${project.id}`;

    grid.appendChild(card);
  });

}

loadProjects();
