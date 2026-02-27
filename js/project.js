const container=document.getElementById("projectContent");

const params=new URLSearchParams(location.search);
const id=params.get("id");

async function loadProject(){

const res=await fetch("./data/projects.json");
const projects=await res.json();

const project=projects.find(p=>p.id===id);

if(!project){
container.innerHTML="<h2>Project not found</h2>";
return;
}

container.innerHTML=`
<h1>${project.title}</h1>

<div class="project-hero">
<img src="${project.image}" loading="lazy">
</div>

<div class="project-section">
<h3>Overview</h3>
<p>${project.description}</p>
</div>

<div class="project-section">
<h3>Challenge</h3>
<p>
Designed to solve scalability and usability challenges while maintaining
high performance across devices.
</p>
</div>

<div class="project-section">
<h3>Solution</h3>
<p>
Implemented responsive UI architecture, optimized rendering,
and modular component design.
</p>
</div>

<div class="project-section">
<h3>Technologies</h3>
<p>${project.tags.join(", ")}</p>
</div>
`;
}

loadProject();
