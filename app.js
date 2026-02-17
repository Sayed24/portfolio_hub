let PROJECTS=[];

async function loadProjects(){

 const local = localStorage.getItem("projects");

 if(local){
   PROJECTS = JSON.parse(local);
 }else{
   PROJECTS = await fetch("projects.json").then(r=>r.json());
 }

 return PROJECTS;
}

async function renderHome(){

 const app=document.getElementById("app");
 const projects=await loadProjects();

 let html=`<section class="grid">`;

 projects.forEach(p=>{
 html+=`
 <div class="card" onclick="openCase('${p.id}')">

   <div class="img-wrap">
     <img src="${p.image}" loading="lazy">
   </div>

   <div class="card-body">
     <h3>${p.title}</h3>
     <p>${p.description}</p>

     <div class="tags">
       ${p.tech.map(t=>`<span>${t}</span>`).join("")}
     </div>
   </div>

 </div>`;
});

html+=`</section>`;
app.innerHTML=html;
}
function loadAnalytics(){

const stats=JSON.parse(localStorage.analytics||"{}");

let html="<ul>";

Object.entries(stats).forEach(([k,v])=>{
 html+=`<li>${k} — ${v} views</li>`;
});

html+="</ul>";

document.getElementById("analytics").innerHTML=html;
}
