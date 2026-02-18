const grid = document.getElementById("projectsGrid");

async function loadProjects(){
 const res = await fetch("projects.json");
 const projects = await res.json();
 renderProjects(projects);
}

function renderProjects(list){
 grid.innerHTML="";

 list.forEach(p=>{
  const card=document.createElement("div");
  card.className="card";

  card.innerHTML=`
    <img loading="lazy" src="${p.image}">
    <div class="card-content">
      <h3>${p.title}</h3>
      <p>${p.description}</p>
    </div>
  `;

  card.onclick=()=>Router.go(`case.html?id=${p.id}`);
  grid.appendChild(card);
 });
}

/* SEARCH */
document.getElementById("search").addEventListener("input", async e=>{
 const res = await fetch("projects.json");
 let data = await res.json();

 const val = e.target.value.toLowerCase();
 data = data.filter(p=>p.title.toLowerCase().includes(val));

 renderProjects(data);
});

/* THEME */
const toggle=document.getElementById("themeToggle");

toggle.onclick=()=>{
 document.body.classList.toggle("dark");
 localStorage.theme=document.body.classList.contains("dark");
};

if(localStorage.theme==="true"){
 document.body.classList.add("dark");
}

loadProjects();
