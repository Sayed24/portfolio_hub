
export async function renderProject(){

const id=location.pathname.split("/project/")[1]

const res=await fetch("/data/projects.json")
const projects=await res.json()

const p=projects.find(x=>x.id===id)

const app=document.getElementById("app")

app.innerHTML=`

<div class="projectPage">

<img src="${p.image}">

<h1>${p.title}</h1>

<p>${p.description}</p>

<a href="${p.link}" target="_blank">Open Project</a>

</div>

`

}
