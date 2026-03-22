
window.filterTag=(tag)=>{
document.querySelectorAll(".card").forEach(card=>{
if(tag==="all"||card.dataset.tags.includes(tag)){
card.style.display="block"
}else{
card.style.display="none"
}
})
}
