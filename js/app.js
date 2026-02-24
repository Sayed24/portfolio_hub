async function loadProjects(){

  const res = await fetch("./data/projects.json");
  const projects = await res.json();

  const container=document.querySelector(".projects-grid");
  container.innerHTML="";

  const heat =
    JSON.parse(localStorage.getItem("heatmap"))||{};

  projects.forEach(project=>{

    const card=document.createElement("div");
    card.className="card "+(project.featured?"featured":"");

    if(heat[project.id]>5){
      card.style.boxShadow="0 0 30px rgba(255,120,0,.35)";
    }

    card.innerHTML=`
      <img loading="lazy" src="${project.image}">
      <div class="card-content">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        ${project.featured?'<span class="badge">Featured</span>':""}
      </div>
    `;

    card.onclick=()=>{
      window.location.href=`project.html?id=${project.id}`;
    };

    container.appendChild(card);
  });

}

loadProjects();

if("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js");
}
