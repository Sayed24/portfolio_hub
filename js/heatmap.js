
export function initHeatmap(){

const canvas=document.getElementById("heatmapCanvas")

const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

document.addEventListener("mousemove",e=>{

ctx.beginPath()

ctx.arc(e.clientX,e.clientY,20,0,Math.PI*2)

ctx.fillStyle="rgba(255,0,0,0.05)"

ctx.fill()

})

}
