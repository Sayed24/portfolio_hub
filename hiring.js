function openCase(id){

const project = PROJECTS.find(p=>p.id===id);

trackView(project.title);

document.getElementById("app").innerHTML = `
<div class="case">

<img class="case-img" src="${project.image}">

<h1>${project.title}</h1>

<h3>Problem</h3>
<p>
Modern applications require scalable UI architecture and optimized
user workflows.
</p>

<h3>Solution</h3>
<p>
Implemented using ${project.tech.join(", ")}, modular UI components,
dynamic rendering and performance-first design.
</p>

<h3>Impact</h3>
<p>
Improved usability, performance, and production readiness aligned
with FAANG engineering standards.
</p>

<button onclick="Router.go('home')">← Back</button>

</div>`;
}

function trackView(title){

let stats = JSON.parse(localStorage.analytics || "{}");
stats[title] = (stats[title] || 0) + 1;
localStorage.analytics = JSON.stringify(stats);
}
