function loadAdmin(){

renderAdminList();
}

function renderAdminList(){

const container=document.getElementById("adminList");
const projects=JSON.parse(localStorage.projects||"[]");

container.innerHTML=projects.map(p=>
 `<div class="admin-item">${p.title}</div>`
).join("");
}
