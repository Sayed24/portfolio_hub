
export function initChatbot(){

const app=document.getElementById("app")

app.innerHTML=`

<div class="vision-panel">

<h2>AI Recruiter Chat</h2>

<div id="messages"></div>

<input id="chatInput">

<button id="send">Send</button>

</div>

`

document.getElementById("send").onclick=()=>{

const q=document.getElementById("chatInput").value

const msg=document.createElement("p")

msg.innerHTML="<b>You:</b> "+q

document.getElementById("messages").appendChild(msg)

}

}
