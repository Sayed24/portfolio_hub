import { loadProjects, renderProjects } from "./projects.js";
import { initSearch } from "./search.js";
import { initTheme } from "./theme.js";
import { initMagnetic } from "./magnetic.js";

document.addEventListener("DOMContentLoaded", async () => {
  const projects = await loadProjects();

  renderProjects(projects);
  initSearch(projects, renderProjects);
  initTheme();
  initMagnetic();

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
});
