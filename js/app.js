loadProjects().then(() => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("project");

  if (id) {
    renderProjectPage(id);
  }
});
