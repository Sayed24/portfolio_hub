const points = JSON.parse(localStorage.getItem("heatmap") || "[]");

document.addEventListener("mousemove", e => {
  points.push({ x: e.clientX, y: e.clientY });

  if (points.length % 20 === 0) {
    localStorage.setItem("heatmap", JSON.stringify(points.slice(-500)));
  }
});

/* visual dots (debug view) */
export function showHeatmap() {
  const data = JSON.parse(localStorage.getItem("heatmap") || "[]");

  data.forEach(p => {
    const dot = document.createElement("div");
    dot.className = "heat-dot";
    dot.style.left = p.x + "px";
    dot.style.top = p.y + "px";
    document.body.appendChild(dot);
  });
}
