import {setupFilters} from "./filters.js";
import {renderAnalytics} from "./analytics.js";

const grid=document.getElementById("projectsGrid");

let allProjects=[];

function render(projects){
grid.innerHTML="";

projects.forEach(p=>{
const card=document.createElement("div");
card.className="project-card reveal";

card.innerHTML=`
<img src="${p.image}" loading="lazy">
<div class="project-info">
<h3>${p.title}</h3>
<p>${p.description}</p>
</div>
`;

card.onclick=()=>location.href=`project.html?id=${p.id}`;

grid.appendChild(card);
});
}

async function load(){
const res=await fetch("./data/projects.json");
allProjects=await res.json();

render(allProjects);
setupFilters(allProjects,render);
renderAnalytics();
}

load();
