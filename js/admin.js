export function initAdmin(){

const app=document.getElementById("app")

app.innerHTML=`

<div class="vision-panel">

<h2>Add Project</h2>

<input id="title" placeholder="Project Title">

<input id="link" placeholder="Project URL">

<textarea id="desc" placeholder="Description"></textarea>

<button id="save">Save</button>

</div>

`

document.getElementById("save").onclick=()=>{

alert("Static GitHub Pages demo — saving disabled.")

}

}
