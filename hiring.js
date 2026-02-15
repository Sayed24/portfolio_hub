(function(){

const roles={
frontend:["UI","UX","Responsive"],
dashboard:["Admin","Analytics","CRUD"],
shopify:["Ecommerce","Checkout"],
pwa:["Offline","Caching"]
};

let role=localStorage.role||"frontend";

const bar=document.createElement("div");
bar.className="role-bar";

bar.innerHTML=`
<select id="roleSelect">
<option value="frontend">Frontend</option>
<option value="dashboard">Dashboard</option>
<option value="shopify">Shopify</option>
<option value="pwa">PWA</option>
</select>
`;

document.body.prepend(bar);

const select=document.getElementById("roleSelect");
select.value=role;

select.onchange=()=>{
 localStorage.role=select.value;
 location.reload();
};

})();
