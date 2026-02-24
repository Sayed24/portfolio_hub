const container=document.getElementById("projectContent");

const params=new URLSearchParams(window.location.search);
const id=params.get("id");

async function loadProject(){

  const res=await fetch("./data/projects.json");
  const projects=await res.json();

  const project=projects.find(p=>p.id===id);

  if(!project){
    container.innerHTML="<h2>Project not found</h2>";
    return;
  }

  let heat=JSON.parse(localStorage.getItem("heatmap"))||{};
  heat[id]=(heat[id]||0)+1;
  localStorage.setItem("heatmap",JSON.stringify(heat));

  container.innerHTML=`
    <h1>${project.title}</h1>
    <p>${project.description}</p>
    <img class="project-image" src="${project.image}">
    <p><strong>Tech:</strong> ${project.tags.join(", ")}</p>
  `;
}

loadProject();
