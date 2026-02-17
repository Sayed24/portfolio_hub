const Router = {

routes:{
  home:"home",
  admin:"admin.html",
  analytics:"analytics.html"
},

async go(route){

 if(route==="home"){
   renderHome();
   return;
 }

 const html = await fetch(this.routes[route]).then(r=>r.text());
 document.getElementById("app").innerHTML = html;

 if(route==="admin") loadAdmin();
 if(route==="analytics") loadAnalytics();
},

init(){
 this.go("home");
}
};
