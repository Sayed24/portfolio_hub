export async function renderProjects(){

const res=await fetch("/data/projects.json")
const projects=await res.json()

const app=document.getElementById("app")
app.innerHTML=""

projects.forEach(p=>{

const card=document.createElement("div")
card.className="card"

card.innerHTML=`

<img src="${p.image}">

<div class="cardContent">

<h3>${p.title}</h3>
<p>${p.description}</p>

</div>
`

card.onclick=()=>{

location.href="/project/"+p.id

}

app.appendChild(card)

})

}
