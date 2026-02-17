function addProject(){

const project={
 id:Date.now().toString(),
 title:title.value,
 description:desc.value,
 image:image.value,
 tech:tech.value.split(",")
};

let projects=JSON.parse(localStorage.projects||"[]");
projects.push(project);

localStorage.projects=JSON.stringify(projects);

renderAdminList();
}
