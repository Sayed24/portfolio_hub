const projects = [];

for(let i=1;i<=12;i++){
projects.push({
id:i,
title:`Project ${i}`,
image:`https://picsum.photos/900/600?random=${i}`,
views:Math.floor(Math.random()*200)
});
}

function renderProjects(){
const container=document.querySelector(".projects");
if(!container) return;

container.innerHTML="";

const featured=[...projects].sort((a,b)=>b.views-a.views)[0];

projects.forEach(p=>{
const card=document.createElement("div");
card.className="project-card glass";

if(p.id===featured.id){
card.style.outline="2px solid gold";
}

card.innerHTML=`
<img src="${p.image}">
<h3 style="padding:15px">${p.title}</h3>
`;

card.onclick=()=>location.href=`project.html?id=${p.id}`;

container.appendChild(card);
});
}

renderProjects();
