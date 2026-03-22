import {initSearch} from "./search.js"
import {initFilter} from "./filter.js"
import {updateViews} from "./stats.js"

export async function renderProjects(){

const res=await fetch("data/projects.json")
const projects=await res.json()

const app=document.getElementById("app")

app.innerHTML=`
<div class="filter-bar">
<input id="searchInput" placeholder="Search">
<br><br>
<button onclick="filterTag('all')">All</button>
<button onclick="filterTag('dashboard')">Dashboard</button>
<button onclick="filterTag('ui')">UI</button>
</div>

<div class="projects-grid"></div>
`

const grid=document.querySelector(".projects-grid")

projects.forEach(p=>{
const card=document.createElement("div")
card.className="card"
card.dataset.tags=p.tags.join(" ")

card.innerHTML=`
<img src="https://api.microlink.io/?url=${p.link}&screenshot=true">
<div class="card-content">
<h3>${p.title}</h3>
<p>${p.description}</p>
</div>
`

card.onclick=()=>{
updateViews(p.id)
router.navigate("/project/"+p.id)
}

grid.appendChild(card)
})

initSearch()
initFilter()
}
