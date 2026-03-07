export async function renderProjects(){

const res=await fetch("data/projects.json")

const projects=await res.json()

const app=document.getElementById("app")

app.innerHTML=`<div class="projects"></div>`

const grid=document.querySelector(".projects")

projects.forEach(p=>{

const card=document.createElement("div")

card.className="card"

card.innerHTML=`

<img src="https://api.microlink.io/?url=${p.link}&screenshot=true">

<div class="cardContent">

<h3>${p.title}</h3>

<p>${p.description}</p>

</div>
`

card.onclick=()=>{

location.href="/project/"+p.id

}

grid.appendChild(card)

})

}
