export function getHeatmap() {
  return JSON.parse(localStorage.getItem("heatmap")) || {};
}
