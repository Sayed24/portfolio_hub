
function renderProjectPage(id) {
  const project = projects.find(p => p.id == id);

  container.innerHTML = `
    <div class="project-page fade-in">

      <button class="back-btn">← Back</button>

      <div class="project-hero">
        <img src="${project.image}">
      </div>

      <div class="project-info">
        <h1>${project.title}</h1>
        <p>${project.description}</p>

        <div class="tags">
          ${project.tags.map(tag => `<span>${tag}</span>`).join("")}
        </div>

        <a href="${project.link}" target="_blank" class="visit-btn">
          Visit Project →
        </a>
      </div>

    </div>
  `;

  document.querySelector(".back-btn").onclick = () => {
    history.pushState({}, "", "/portfolio_hub/");
    renderProjects(projects);
  };
}
