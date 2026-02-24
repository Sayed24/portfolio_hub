const links=document.querySelectorAll(".nav-link");

links.forEach(link=>{
  link.addEventListener("click",e=>{
    e.preventDefault();
    const href=link.getAttribute("href");
    document.body.style.opacity="0";
    setTimeout(()=>window.location.href=href,250);
  });
});
