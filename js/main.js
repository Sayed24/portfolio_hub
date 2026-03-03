
function render(){
const path=location.pathname;

app.className="fade-enter";

if(path==="/"){
app.innerHTML=`
<section class="hero">
<h1>Modern Interactive Portfolio</h1>
<p>Frontend Engineer • Dashboard Specialist</p>
</section>`;
}

else if(path==="/projects"){
app.innerHTML=`
<div class="search">
<input id="searchInput" placeholder="Search projects...">
</div>
<div class="projects" id="projectGrid"></div>`;

renderProjects();
}

else if(path.startsWith("/project")){
const id=new URLSearchParams(location.search).get("id");
const p=projects.find(x=>x.id==id);

if(p){
p.views++;
app.innerHTML=`
<section class="hero">
<h1>${p.title}</h1>
<img src="${p.image}" style="width:100%;max-width:900px;border-radius:14px">
<p>Category: ${p.category}</p>
</section>`;
}
}

else if(path==="/resume"){
app.innerHTML=`
<div class="resume-mode">
<h1>Resume Mode</h1>
<p>Frontend Developer specialized in dashboards and UI systems.</p>
<button onclick="window.print()">Download PDF</button>
</div>`;
}
}

render();

function renderProjects(){
const grid=document.getElementById("projectGrid");

projects.sort((a,b)=>b.views-a.views);

projects.forEach(p=>{
const card=document.createElement("div");
card.className="card glass";

card.innerHTML=`
<img src="${p.image}">
<h3 style="padding:12px">${p.title}</h3>
`;

card.onclick=()=>navigate(`/project?id=${p.id}`);

grid.appendChild(card);
});

document.getElementById("searchInput")
.addEventListener("input",e=>{
const value=e.target.value.toLowerCase();
grid.innerHTML="";
projects
.filter(p=>p.title.toLowerCase().includes(value))
.forEach(p=>{
const c=document.createElement("div");
c.className="card glass";
c.innerHTML=`<img src="${p.image}">
<h3 style="padding:12px">${p.title}</h3>`;
c.onclick=()=>navigate(`/project?id=${p.id}`);
grid.appendChild(c);
});
});
}
