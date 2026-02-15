document.addEventListener("DOMContentLoaded",()=>{

/* DARK MODE */
const toggle=document.getElementById("modeToggle");
if(localStorage.theme==="dark")
 document.body.classList.add("dark");

toggle.onclick=()=>{
 document.body.classList.toggle("dark");
 localStorage.theme=
 document.body.classList.contains("dark")?"dark":"light";
};

/* CURSOR */
const cursor=document.getElementById("cursor");
document.addEventListener("mousemove",e=>{
 cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
});

let projects=[];

const override=
JSON.parse(localStorage.adminProjects||"null");

fetch("./projects.json")
.then(r=>r.json())
.then(data=>{

 const finalData=override||data;
 projects=finalData;

 renderProjects(finalData);

 window.dispatchEvent(
   new CustomEvent("projectsLoaded",{detail:finalData})
 );
});

/* RENDER */
function renderProjects(data){
 const container=document.getElementById("projects");
 container.innerHTML="";

 data.forEach(p=>{
  const card=document.createElement("div");
  card.className="card";

  card.innerHTML=`
   <img src="${p.image}" loading="lazy">
   <div style="padding:18px">
     <h3>${p.title}</h3>
     <p>${p.category}</p>
   </div>
  `;

  card.onclick=()=>{
    trackView(p.title);
    openCaseStudy(p);
  };

  container.appendChild(card);
 });
}

/* CASE STUDY */
const modal=document.getElementById("caseModal");
const caseBody=document.getElementById("caseBody");

document.getElementById("closeCase").onclick=
()=>modal.classList.add("hidden");

function openCaseStudy(p){
 modal.classList.remove("hidden");

 caseBody.innerHTML=`
 <h2>${p.title}</h2>
 <h3>Problem</h3><p>${p.problem}</p>
 <h3>Solution</h3><p>${p.solution}</p>
 <h3>Impact</h3><p>${p.impact}</p>
 <h3>Stack</h3>
 <ul>${(p.stack||[]).map(s=>`<li>${s}</li>`).join("")}</ul>
 `;
}

/* SEARCH */
const palette=document.getElementById("commandPalette");
const input=document.getElementById("searchInput");
const results=document.getElementById("results");

document.getElementById("searchBtn").onclick=
()=>palette.classList.toggle("hidden");

input.oninput=()=>{
 const q=input.value.toLowerCase();
 results.innerHTML="";
 projects.filter(p=>p.title.toLowerCase().includes(q))
 .forEach(p=>{
   const d=document.createElement("div");
   d.textContent=p.title;
   d.onclick=()=>openCaseStudy(p);
   results.appendChild(d);
 });
};

/* ANALYTICS */
let timeline=
JSON.parse(localStorage.timeline||"[]");

function trackView(name){
 timeline.push({project:name,time:Date.now()});
 localStorage.timeline=JSON.stringify(timeline);
}

/* PWA */
if("serviceWorker" in navigator)
 navigator.serviceWorker.register("./sw.js");

});
