
function generatePortfolioPDF(){
 const content=[...document.querySelectorAll(".card")]
  .map(c=>c.innerText)
  .join("\n\n");

 const blob=new Blob([content],{type:"text/plain"});
 const url=URL.createObjectURL(blob);

 const a=document.createElement("a");
 a.href=url;
 a.download="portfolio.txt";
 a.click();
}
