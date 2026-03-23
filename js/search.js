document.getElementById("search").addEventListener("input", e => {
  const val = e.target.value.toLowerCase();

  const filtered = projects.filter(p =>
    p.title.toLowerCase().includes(val)
  );

  renderProjects(filtered);
});
