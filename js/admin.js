export function initAdmin(){

const app=document.getElementById("app")

app.innerHTML=`

<h2>Add Project</h2>

<input id="title" placeholder="Title">

<input id="image" placeholder="Image URL">

<textarea id="desc"></textarea>

<button id="save">Save</button>

`

document.getElementById("save").onclick=()=>{

const title=document.getElementById("title").value
const image=document.getElementById("image").value
const desc=document.getElementById("desc").value

const newProject={
id:title.toLowerCase().replaceAll(" ","-"),
title,
image,
description:desc
}

let projects=JSON.parse(localStorage.getItem("projects"))||[]

projects.push(newProject)

localStorage.setItem("projects",JSON.stringify(projects))

alert("Saved locally")

}

}
