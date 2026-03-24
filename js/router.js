
function navigateToProject(id) {
  history.pushState({ id }, "", `?project=${id}`);
  renderProjectPage(id);
}

window.addEventListener("popstate", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("project");

  if (id) {
    renderProjectPage(id);
  } else {
    renderProjects(projects);
  }
});
