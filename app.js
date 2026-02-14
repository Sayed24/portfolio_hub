document.addEventListener("DOMContentLoaded",()=>{

/* ---------------- DARK MODE ---------------- */

const toggle=document.getElementById("modeToggle");

if(localStorage.theme==="dark")
  document.body.classList.add("dark");

toggle.onclick=()=>{
 document.body.classList.toggle("dark");
 localStorage.theme=
 document.body.classList.contains("dark")?"dark":"light";
};


/* ---------------- CURSOR ---------------- */

const cursor=document.getElementById("cursor");
document.addEventListener("mousemove",e=>{
 cursor.style.transform=
 `translate(${e.clientX}px,${e.clientY}px)`;
});


/* ---------------- LOAD PROJECTS ---------------- */

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

  card.onclick=()=>openCaseStudy(p);

  container.appendChild(card);
 });
}


/* ---------------- AI CASE STUDY SYSTEM ---------------- */

const modal=document.getElementById("caseModal");
const caseBody=document.getElementById("caseBody");

document.getElementById("closeCase").onclick=
()=>modal.classList.add("hidden");


function openCaseStudy(project){

 modal.classList.remove("hidden");

 caseBody.innerHTML=generateCaseStudy(project);
}


/* AI TEMPLATE ENGINE */

function generateCaseStudy(p){

 return `
   <h2>${p.title}</h2>

   ${section("Problem",
   p.problem || "Users needed a faster and more scalable interface.")}

   ${section("Solution",
   p.solution || "Built a modern responsive architecture using modular frontend components.")}

   ${section("Architecture",
   p.architecture || "Component-driven UI, JSON data layer, PWA caching and responsive layout.")}

   ${section("Key Features",
   list(p.features || [
     "Responsive UI",
     "Dark/Light mode",
     "Performance optimized",
     "Modern UX interactions"
   ]))}

   ${section("Impact",
   p.impact || "Improved usability, performance, and recruiter readability.")}

   ${section("Tech Stack",
   list(p.stack || ["HTML","CSS","JavaScript","PWA"]))}
 `;
}

function section(title,content){
 return `
 <div class="case-section">
   <h3>${title}</h3>
   <p>${content}</p>
 </div>`;
}

function list(arr){
 return `<ul>${arr.map(i=>`<li>${i}</li>`).join("")}</ul>`;
}


/* ---------------- COMMAND PALETTE ---------------- */

const palette=document.getElementById("commandPalette");
const input=document.getElementById("searchInput");
const results=document.getElementById("results");

document.getElementById("searchBtn").onclick=
()=>palette.classList.toggle("hidden");

input.oninput=()=>{
 const q=input.value.toLowerCase();
 results.innerHTML="";

 projects
  .filter(p=>p.title.toLowerCase().includes(q))
  .forEach(p=>{
    const div=document.createElement("div");
    div.textContent=p.title;
    div.onclick=()=>openCaseStudy(p);
    results.appendChild(div);
  });
};


/* ---------------- PWA ---------------- */

if("serviceWorker" in navigator){
 navigator.serviceWorker.register("./sw.js");
}

});
