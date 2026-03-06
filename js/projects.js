export async function loadProjects() {
  const res = await fetch("data/projects.json");
  return await res.json();
}

export function renderProjects(projects) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  projects.sort((a,b)=> b.views - a.views);

  projects.forEach(project => {
    const card = document.createElement("div");
    card.className = "project-card";

    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}" />
      <div class="project-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;

    card.onclick = () => {
      project.views++;
      localStorage.setItem("views", JSON.stringify(projects));
      window.open(project.link, "_blank");
    };

    app.appendChild(card);
  });
}
