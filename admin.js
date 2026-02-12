let projects = JSON.parse(localStorage.getItem("projects")) || [];

const form = document.getElementById("projectForm");
const list = document.getElementById("adminList");

renderList();

form.onsubmit = e => {
  e.preventDefault();

  const id = document.getElementById("projectId").value;
  const project = {
    id: id ? Number(id) : Date.now(),
    title: title.value,
    tagline: tagline.value,
    category: category.value,
    image: image.value,
    breakdown: breakdown.value,
    case: case.value,
    featured: featured.checked
  };

  if (id) {
    projects = projects.map(p => p.id === Number(id) ? project : p);
  } else {
    projects.push(project);
  }

  localStorage.setItem("projects", JSON.stringify(projects));
  form.reset();
  renderList();
};

function renderList() {
  list.innerHTML = "";
  projects.forEach(p => {
    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${p.title}</strong>
      <button onclick="editProject(${p.id})">Edit</button>
      <button onclick="deleteProject(${p.id})">Delete</button>
      <hr>
    `;
    list.appendChild(div);
  });
}

function editProject(id) {
  const p = projects.find(x => x.id === id);
  projectId.value = p.id;
  title.value = p.title;
  tagline.value = p.tagline;
  category.value = p.category;
  image.value = p.image;
  breakdown.value = p.breakdown;
  case.value = p.case;
  featured.checked = p.featured;
}

function deleteProject(id) {
  projects = projects.filter(p => p.id !== id);
  localStorage.setItem("projects", JSON.stringify(projects));
  renderList();
}

