
export function initSearch(projects, render) {
  const input = document.getElementById("searchInput");

  input.addEventListener("input", e => {
    const term = e.target.value.toLowerCase();

    const filtered = projects.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.tags.join(" ").includes(term)
    );

    render(filtered);
  });
}
