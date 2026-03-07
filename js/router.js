const routes={}

export function addRoute(path,view){

routes[path]=view

}

export function navigate(path){

history.pushState({},'',path)

render()

}

export function render(){

const path=location.pathname

if(routes[path]){

routes[path]()

}

else if(path.startsWith("/project/")){

import("./projectPage.js")
.then(m=>m.renderProject())

}

}

window.onpopstate=render
