const input=document.getElementById("chatInput");
const btn=document.getElementById("sendChat");
const messages=document.getElementById("chatMessages");

const knowledge={
skills:"Strong in JavaScript, UI engineering, dashboards, responsive design.",
projects:"Multiple modern web apps including dashboards and portfolio systems.",
availability:"Currently available for frontend and UI engineering roles."
};

function addMessage(text,me=false){
const div=document.createElement("div");
div.className=me?"msg me":"msg";
div.textContent=text;
messages.appendChild(div);
messages.scrollTop=messages.scrollHeight;
}

btn.onclick=()=>{
const text=input.value.toLowerCase();
addMessage(input.value,true);

let reply="I can share information about skills, projects, or availability.";

if(text.includes("skill")) reply=knowledge.skills;
if(text.includes("project")) reply=knowledge.projects;
if(text.includes("available")) reply=knowledge.availability;

setTimeout(()=>addMessage(reply),400);
input.value="";
};
