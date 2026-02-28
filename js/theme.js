const prefersDark=
window.matchMedia("(prefers-color-scheme: dark)").matches;

document.body.dataset.theme=prefersDark?"dark":"light";

export function toggleTheme(){
const current=document.body.dataset.theme;
document.body.dataset.theme=current==="dark"?"light":"dark";
}
