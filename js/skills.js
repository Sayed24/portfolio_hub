export function renderSkills(){

const app=document.getElementById("app")

app.innerHTML=`

<div style="max-width:600px;margin:auto">

<h2>Skills</h2>

<canvas id="skillsChart"></canvas>

</div>

`

const ctx=document.getElementById("skillsChart")

new Chart(ctx,{
type:"bar",
data:{
labels:["HTML","CSS","JavaScript","UI Design","Dashboards"],
datasets:[{
data:[95,92,90,85,88],
backgroundColor:"#0071e3"
}]
},
options:{
animation:{duration:1500}
}
})

}
