const ctx=document.getElementById("skillsChart");

new Chart(ctx,{
  type:"radar",
  data:{
    labels:["JavaScript","UI/UX","HTML/CSS","Performance","Accessibility","PWA"],
    datasets:[{
      label:"Skill Level",
      data:[95,90,95,85,80,88]
    }]
  },
  options:{responsive:true}
});
