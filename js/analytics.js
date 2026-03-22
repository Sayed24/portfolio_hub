export function updateViews(id){
let v=JSON.parse(localStorage.getItem("views")||"{}")
v[id]=(v[id]||0)+1
localStorage.setItem("views",JSON.stringify(v))
}

export function getViews(id){
let v=JSON.parse(localStorage.getItem("views")||"{}")
return v[id]||0
}
