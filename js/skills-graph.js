
const skills=document.querySelectorAll(".skill");

const obs=new IntersectionObserver(entries=>{
entries.forEach(e=>{
if(e.isIntersecting){
const fill=e.target.querySelector(".fill");
fill.style.width=e.target.dataset.level+"%";
}
});
},{threshold:.4});

skills.forEach(s=>obs.observe(s));
