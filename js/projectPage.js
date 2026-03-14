export async function renderProject(){

const id=location.pathname.split("/project/")[1]

const res=await fetch("/data/projects.json")
const projects=await res.json()

const project=projects.find(p=>p.id===id)

const app=document.getElementById("app")

app.innerHTML=`

<div style="padding:40px">

<h1>${project.title}</h1>

<img src="${project.image}" style="width:100%;max-width:600px">

<p>${project.description}</p>

<a href="${project.link}" target="_blank">
Open Project
</a>

</div>

`

}
