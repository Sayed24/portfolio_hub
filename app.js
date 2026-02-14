/* --------------------
   DARK MODE
---------------------*/
const toggle = document.getElementById("modeToggle");
toggle.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.theme =
    document.body.classList.contains("dark") ? "dark":"light";
};

if(localStorage.theme==="dark")
  document.body.classList.add("dark");


/* --------------------
   MAGNETIC CURSOR
---------------------*/
const cursor=document.getElementById("cursor");

document.addEventListener("mousemove",e=>{
  cursor.style.transform=`translate(${e.clientX}px,${e.clientY}px)`;
});


/* --------------------
   LOAD PROJECTS
---------------------*/
let projectsData=[];

fetch("projects.json")
.then(r=>r.json())
.then(data=>{
  projectsData=data;
  renderProjects(data);
});


function renderProjects(data){
  const container=document.getElementById("projects");
  container.innerHTML="";

  data.forEach(p=>{
    const card=document.createElement("div");
    card.className="card";

    card.innerHTML=`
      <div class="img-wrap">
        <img loading="lazy" src="${p.image}">
      </div>
      <div style="padding:18px">
        <h3>${p.title}</h3>
        <p>${p.category}</p>
      </div>
    `;

    // Parallax tilt
    card.addEventListener("mousemove",e=>{
      const rect=card.getBoundingClientRect();
      const x=(e.clientX-rect.left)/rect.width-.5;
      const y=(e.clientY-rect.top)/rect.height-.5;
      card.style.transform=
        `rotateY(${x*10}deg) rotateX(${-y*10}deg)`;
    });

    card.addEventListener("mouseleave",()=>{
      card.style.transform="rotateY(0) rotateX(0)";
    });

    // analytics tracking
    card.onclick=()=>{
      trackClick(p.title);
      window.open(p.link,"_blank");
    };

    container.appendChild(card);
  });
}


/* --------------------
   COMMAND PALETTE
---------------------*/
const palette=document.getElementById("commandPalette");
const input=document.getElementById("searchInput");
const results=document.getElementById("results");

document.getElementById("searchBtn").onclick=
()=> palette.classList.toggle("hidden");

document.addEventListener("keydown",e=>{
  if((e.metaKey||e.ctrlKey)&&e.key==="k"){
    e.preventDefault();
    palette.classList.toggle("hidden");
    input.focus();
  }
});

input.oninput=()=>{
  const q=input.value.toLowerCase();
  results.innerHTML="";

  projectsData
   .filter(p=>p.title.toLowerCase().includes(q))
   .forEach(p=>{
     const div=document.createElement("div");
     div.textContent=p.title;
     div.onclick=()=>window.open(p.link);
     results.appendChild(div);
   });
};


/* --------------------
   PRIVACY ANALYTICS
---------------------*/
let clicks=JSON.parse(localStorage.clicks||"{}");

function trackClick(name){
  clicks[name]=(clicks[name]||0)+1;
  localStorage.clicks=JSON.stringify(clicks);
  drawHeatmap();
}

function drawHeatmap(){
  const canvas=document.getElementById("heatmap");
  if(!canvas) return;

  const ctx=canvas.getContext("2d");
  canvas.width=600;
  canvas.height=300;

  let i=0;
  for(const k in clicks){
    ctx.fillRect(50*i,300-clicks[k]*20,30,clicks[k]*20);
    i++;
  }
}

drawHeatmap();


/* --------------------
   PWA
---------------------*/
if("serviceWorker" in navigator){
  navigator.serviceWorker.register("sw.js");
}
