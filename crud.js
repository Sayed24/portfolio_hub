function addProject(project) {
  projectsData.push(project);
  renderProjects(projectsData);
}

function deleteProject(id) {
  projectsData = projectsData.filter(p => p.id !== id);
  renderProjects(projectsData);
}

