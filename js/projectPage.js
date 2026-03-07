export async function renderProject(){

const id=location.pathname.split("/project/")[1]

const res=await fetch("/data/projects.json")

const data=await res.json()

const p=data.find(x=>x.id===id)

const app=document.getElementById("app")

app.innerHTML=`

<div class="vision-panel">

<h1>${p.title}</h1>

<img src="https://api.microlink.io/?url=${p.link}&screenshot=true">

<p>${p.description}</p>

<a href="${p.link}" target="_blank">Open Project</a>

</div>

`

}
