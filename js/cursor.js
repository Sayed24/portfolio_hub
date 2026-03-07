
export function initCursor(){

const cursor=document.getElementById("cursor3d")

document.addEventListener("mousemove",e=>{

cursor.style.transform=
`translate3d(${e.clientX}px,${e.clientY}px,0)`

})

}
