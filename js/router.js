const params=new URLSearchParams(window.location.search);
const id=params.get("id");

if(id){
const container=document.getElementById("projectContainer");

if(container){
container.innerHTML=`
<h1>Project ${id}</h1>
<p>Dynamic storytelling project page.</p>
<img src="https://picsum.photos/1200/700?random=${id}">
`;
}
}
