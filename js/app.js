let allProjects = [];

async function loadProjects() {
  const res = await fetch("./data/projects.json");
  allProjects = await res.json();

  renderProjects(allProjects);
  generateTags(allProjects);
}

export function renderProjects(projects) {

  const container = document.querySelector(".projects-grid");
  container.innerHTML = "";

  projects.forEach(project => {

    const card = document.createElement("div");

    card.className =
      "card apple-card reveal " +
      (project.featured ? "featured" : "");

    card.innerHTML = `
      <div class="media-wrapper">
        <img src="${project.image}" loading="lazy">
        ${project.video ? `
          <video muted loop playsinline>
            <source src="${project.video}" type="video/mp4">
          </video>` : ""}
      </div>

      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.featured ? `<span class="badge">Featured</span>` : ""}
      </div>
    `;

    const video = card.querySelector("video");

    if (video) {
      card.addEventListener("mouseenter", () => video.play());
      card.addEventListener("mouseleave", () => {
        video.pause();
        video.currentTime = 0;
      });
    }

    card.onclick = () =>
  window.location.href = `project.html?id=${project.id}`;
    container.appendChild(card);
  });
}

loadProjects();
