document.addEventListener("click",e=>{
 const a=e.target.closest("a[data-route]");
 if(!a) return;

 e.preventDefault();

 document.body.animate([
  {opacity:.5,transform:"translateY(10px)"},
  {opacity:1,transform:"none"}
 ],{duration:300});

 history.pushState({}, "", a.href);
});

