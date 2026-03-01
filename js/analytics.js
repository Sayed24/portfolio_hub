let visits=localStorage.getItem("visits")||0;
visits++;
localStorage.setItem("visits",visits);
console.log("Visits:",visits);
