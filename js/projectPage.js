import {getViews} from "./stats.js"

export async function renderProject(){

const id=location.pathname.split("/project/")[1]

const res=await fetch("data/projects.json")
const projects=await res.json()

const p=projects.find(x=>x.id===id)

const app=document.getElementById("app")

const views=getViews(id)

app.innerHTML=`

<div class="page" style="padding:40px">

<h1>${p.title}</h1>

<img src="${p.image}" style="max-width:600px;width:100%">

<p>${p.description}</p>

<p><b>Views:</b> ${views}</p>

<a href="${p.link}" target="_blank">Open Project</a>

</div>

`

}
