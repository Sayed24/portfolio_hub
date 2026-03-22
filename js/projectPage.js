import {getViews} from "./stats.js"

export async function renderProject(){

const id=location.pathname.split("/project/")[1]

const res=await fetch("/data/projects.json")
const data=await res.json()

const p=data.find(x=>x.id===id)

const views=getViews(id)

document.getElementById("app").innerHTML=`
<div style="padding:40px">
<h1>${p.title}</h1>
<img src="https://api.microlink.io/?url=${p.link}&screenshot=true">
<p>${p.description}</p>
<p><b>Views:</b> ${views}</p>
<a href="${p.link}" target="_blank">Open Project</a>
</div>
`
}
