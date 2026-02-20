let allProjects = [];

async function loadProjects() {
  const res = await fetch('./data/projects.json');
  allProjects = await res.json();
  renderProjects(allProjects);
  generateTags(allProjects);
}

export function renderProjects(projects) {
  const container = document.querySelector('.projects-grid');
  container.innerHTML = '';

  projects.forEach(project => {
    const card = document.createElement('div');
    card.className = 'card apple-card reveal';

    card.innerHTML = `
      <img src="${project.image}">
      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
    `;

    card.onclick = () => openModal(project);

    container.appendChild(card);
  });
}

loadProjects();
