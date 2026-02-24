const btn=document.getElementById("themeToggle");

btn?.addEventListener("click",()=>{
  const html=document.documentElement;
  html.dataset.theme=
    html.dataset.theme==="dark"?"light":"dark";
});
