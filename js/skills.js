const canvas=document.getElementById("skillsGraph");

if(canvas){
const ctx=canvas.getContext("2d");

const skills=["HTML","CSS","JavaScript","UI/UX","Dashboards"];

skills.forEach((skill,i)=>{
const width=150+Math.random()*250;
ctx.fillStyle="#3b82f6";
ctx.fillRect(120,40+i*40,width,20);

ctx.fillStyle="white";
ctx.fillText(skill,20,55+i*40);
});
}
