const form=document.getElementById("projectForm");
const list=document.getElementById("projectList");

let projects=
JSON.parse(localStorage.adminProjects||"[]");

render();

form.onsubmit=e=>{
 e.preventDefault();

 projects.push({
  title:title.value,
  category:category.value,
  image:image.value,
  link:link.value
 });

 localStorage.adminProjects=
 JSON.stringify(projects);

 render();
};

function render(){
 list.innerHTML="";
 projects.forEach((p,i)=>{
  const div=document.createElement("div");
  div.innerHTML=`${p.title}
  <button onclick="remove(${i})">Delete</button>`;
  list.appendChild(div);
 });
}

function remove(i){
 projects.splice(i,1);
 localStorage.adminProjects=
 JSON.stringify(projects);
 render();
}
