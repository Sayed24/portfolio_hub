
export function initSearch(){

const input=document.getElementById("searchInput")

input.addEventListener("input",()=>{

const term=input.value.toLowerCase()

document.querySelectorAll(".card").forEach(card=>{

const text=card.innerText.toLowerCase()

card.style.display=text.includes(term)?"block":"none"

})

})

}
