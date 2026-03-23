function trackView(id) {
  let views = JSON.parse(localStorage.getItem("views")) || {};
  views[id] = (views[id] || 0) + 1;
  localStorage.setItem("views", JSON.stringify(views));
}
