// SCROLL REVEAL
const observer=new IntersectionObserver(entries=>{
entries.forEach(entry=>{
if(entry.isIntersecting){
entry.target.classList.add("visible");
}
});
},{threshold:.2});

document.querySelectorAll(".reveal")
.forEach(el=>observer.observe(el));


// MAGNETIC BUTTONS
document.querySelectorAll(".magnetic").forEach(btn=>{

btn.addEventListener("mousemove",e=>{
const rect=btn.getBoundingClientRect();
const x=e.clientX-rect.left-rect.width/2;
const y=e.clientY-rect.top-rect.height/2;
btn.style.transform=`translate(${x*.2}px,${y*.2}px)`;
});

btn.addEventListener("mouseleave",()=>{
btn.style.transform="translate(0,0)";
});

});
