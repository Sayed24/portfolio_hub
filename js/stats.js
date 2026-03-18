
export function updateViews(id){

let stats=JSON.parse(localStorage.getItem("views")||"{}")

stats[id]=(stats[id]||0)+1

localStorage.setItem("views",JSON.stringify(stats))

}

export function getViews(id){

let stats=JSON.parse(localStorage.getItem("views")||"{}")

return stats[id]||0

}
