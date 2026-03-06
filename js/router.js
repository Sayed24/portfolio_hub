const routes={}

export function addRoute(path,component){
routes[path]=component
}

export function navigate(path){
history.pushState({},'',path)
render()
}

export function render(){

const path=location.pathname

if(routes[path]){
routes[path]()
}else if(path.startsWith("/project/")){
import("./projectPage.js").then(m=>m.renderProject())
}else{
routes["/"]()
}

}

window.onpopstate=render
