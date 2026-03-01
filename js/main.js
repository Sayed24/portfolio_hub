
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("show");
}
});
});

document.querySelectorAll(".reveal").forEach(el=>{
observer.observe(el);
});

document.querySelectorAll(".magnetic").forEach(btn=>{
btn.addEventListener("mousemove",e=>{
const r=btn.getBoundingClientRect();
btn.style.transform=`translate(${(e.clientX-r.left-50)/10}px,
${(e.clientY-r.top-20)/10}px)`;
});
btn.addEventListener("mouseleave",()=>{
btn.style.transform="translate(0,0)";
});
});
