export function renderAnalytics(){

const app=document.getElementById("app")

let visits=Number(localStorage.getItem("visits")||0)

visits++

localStorage.setItem("visits",visits)

app.innerHTML=`

<div class="vision-panel">

<h2>Portfolio Analytics</h2>

<p>Total visits: ${visits}</p>

</div>

`

}
