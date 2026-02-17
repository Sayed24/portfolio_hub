function recruiterMode(){

let stats = JSON.parse(localStorage.analytics || "{}");

const sorted = [...PROJECTS].sort((a,b)=>
 (stats[b.title]||0)-(stats[a.title]||0)
);

renderRecruiter(sorted);
}

function renderRecruiter(list){

let html=`<h2 class="page-title">Recruiter View</h2>
<section class="grid">`;

list.forEach(p=>{
 html+=`
 <div class="card">
   <img src="${p.image}">
   <h3>${p.title}</h3>
 </div>`;
});

html+=`</section>`;

document.getElementById("app").innerHTML=html;
}
