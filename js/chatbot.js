export function initChatbot(){

const app=document.getElementById("app")

app.innerHTML=`

<div class="vision-panel">

<h2>AI Recruiter Chat</h2>

<div id="messages"></div>

<input id="chatInput" placeholder="Ask about skills or projects">

<button id="send">Send</button>

</div>

`

document.getElementById("send").onclick=()=>{

const input=document.getElementById("chatInput")

const msg=document.createElement("p")

msg.innerHTML="<b>You:</b> "+input.value

document.getElementById("messages").appendChild(msg)

input.value=""

}

}
