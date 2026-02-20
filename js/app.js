async function loadProjects() {
  const res = await fetch("./data/projects.json");
  const projects = await res.json();

  const container = document.querySelector(".projects-grid");

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "card apple-card";

    card.innerHTML = `
      <img src="${project.image}" />
      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;

    card.addEventListener("click", () => {
      window.open(project.url, "_blank");
    });

    container.appendChild(card);
  });
}

loadProjects();
