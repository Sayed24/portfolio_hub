document.addEventListener("mousemove",e=>{
const dot=document.createElement("div");
dot.style.position="fixed";
dot.style.width="6px";
dot.style.height="6px";
dot.style.background="red";
dot.style.borderRadius="50%";
dot.style.left=e.clientX+"px";
dot.style.top=e.clientY+"px";
dot.style.opacity="0.3";
dot.style.pointerEvents="none";

document.body.appendChild(dot);
setTimeout(()=>dot.remove(),800);
});
