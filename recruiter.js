(function(){
const params=new URLSearchParams(location.search);
if(params.get("recruiter")!=="true") return;

const banner=document.createElement("div");
banner.style.background="#111";
banner.style.color="#fff";
banner.style.padding="12px";
banner.style.textAlign="center";
banner.innerHTML="⭐ Recruiter Mode Enabled";
document.body.prepend(banner);
})();

