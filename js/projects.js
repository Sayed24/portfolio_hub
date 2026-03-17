import {initSearch} from "./search.js"
import {updateViews} from "./stats.js"

export async function renderProjects(){

const res=await fetch("data/projects.json")
const projects=await res.json()

const app=document.getElementById("app")

app.innerHTML=`

<div class="search-bar">

<input id="searchInput" placeholder="Search projects">

</div>

<div class="projects-grid"></div>

`

const grid=document.querySelector(".projects-grid")

projects.forEach(project=>{

const card=document.createElement("div")
card.className="card"

card.innerHTML=`

<img src="${project.image}">

<div class="card-content">

<h3>${project.title}</h3>
<p>${project.description}</p>

</div>
`

card.onclick=()=>{

updateViews(project.id)

router.navigate("/project/"+project.id)

}

grid.appendChild(card)

})

initSearch()

}
