
const analytics={
visits: Number(localStorage.getItem("visits")||0)+1,
projectViews:Number(localStorage.getItem("projectViews")||0)
};

localStorage.setItem("visits",analytics.visits);

export function trackProject(){
analytics.projectViews++;
localStorage.setItem("projectViews",analytics.projectViews);
}

export function renderAnalytics(){
const box=document.createElement("div");
box.className="analytics-box";

box.innerHTML=`
<h4>Recruiter Analytics</h4>
<p>Visits: ${analytics.visits}</p>
<p>Project Views: ${analytics.projectViews}</p>
`;

document.body.appendChild(box);
}
