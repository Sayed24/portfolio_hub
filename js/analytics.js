let projectViews =
JSON.parse(localStorage.getItem("projectStats") || "{}");

export function trackProject(id){
projectViews[id]=(projectViews[id]||0)+1;
localStorage.setItem("projectStats",JSON.stringify(projectViews));
}

export function getTopProject(){
let max=0, top=null;
for(const id in projectViews){
if(projectViews[id]>max){
max=projectViews[id];
top=id;
}
}
return top;
}
