
export function initInterview(){

const app=document.getElementById("app")

app.innerHTML=`

<div class="interview">

<h2>AI Interview Simulator</h2>

<div id="questions"></div>

<input id="answerBox" placeholder="Type your answer">

<button id="nextBtn">Next Question</button>

</div>
`

const questions=[
"Tell me about yourself.",
"What JavaScript projects have you built?",
"Explain responsive design.",
"How do you optimize website performance?"
]

let i=0

const q=document.getElementById("questions")

q.innerText=questions[i]

document.getElementById("nextBtn").onclick=()=>{

i++

if(i<questions.length){

q.innerText=questions[i]

}else{

q.innerText="Interview complete."

}

}

}
