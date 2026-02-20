import { renderProjects } from './app.js';

window.generateTags = function(projects) {
  const tagContainer = document.getElementById('tagFilters');
  const tags = new Set();

  projects.forEach(p => p.tags.forEach(tag => tags.add(tag)));

  tags.forEach(tag => {
    const btn = document.createElement('button');
    btn.textContent = tag;
    btn.onclick = () => {
      const filtered = projects.filter(p => p.tags.includes(tag));
      renderProjects(filtered);
    };
    tagContainer.appendChild(btn);
  });
}
