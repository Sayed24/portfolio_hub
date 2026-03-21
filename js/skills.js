export function renderSkills(){

document.getElementById("app").innerHTML=`
<canvas id="chart"></canvas>
`

new Chart(document.getElementById("chart"),{
type:"bar",
data:{
labels:["HTML","CSS","JS"],
datasets:[{data:[95,90,92]}]
}
})
}
