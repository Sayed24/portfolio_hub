export function initSearch(){
document.getElementById("searchInput").oninput=e=>{
const term=e.target.value.toLowerCase()

document.querySelectorAll(".card").forEach(c=>{
c.style.display=c.innerText.toLowerCase().includes(term)?"block":"none"
})
}
}
