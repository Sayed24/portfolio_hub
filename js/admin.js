
export function initAdmin(){

const app=document.getElementById("app")

app.innerHTML=`

<div style="padding:40px">

<h2>Add Project</h2>

<input id="title" placeholder="Title"><br><br>
<input id="image" placeholder="Image URL"><br><br>
<input id="link" placeholder="Project URL"><br><br>

<textarea id="desc" placeholder="Description"></textarea><br><br>

<button id="save">Save</button>

</div>

`

document.getElementById("save").onclick=()=>{

alert("Static GitHub Pages cannot save files, but this panel shows how it would work.")

}

}
