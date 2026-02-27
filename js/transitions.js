const overlay=document.createElement("div");
overlay.className="page-transition";
document.body.appendChild(overlay);

document.querySelectorAll("a[href]").forEach(link=>{

if(link.target==="_blank") return;

link.addEventListener("click",e=>{
const url=link.getAttribute("href");

if(!url || url.startsWith("#")) return;

e.preventDefault();

overlay.classList.add("active");

setTimeout(()=>{
window.location.href=url;
},300);

});

});

window.addEventListener("pageshow",()=>{
overlay.classList.remove("active");
});
