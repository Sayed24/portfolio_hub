export function setupFilters(projects,render){

const search=document.getElementById("searchInput");
const filter=document.getElementById("filterTag");

function apply(){
let value=search.value.toLowerCase();
let tag=filter.value;

const filtered=projects.filter(p=>{
const matchesText=p.title.toLowerCase().includes(value);
const matchesTag=tag==="all" || p.tags.includes(tag);
return matchesText && matchesTag;
});

render(filtered);
}

search.oninput=apply;
filter.onchange=apply;
}
