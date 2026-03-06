import * as router from "./router.js"
import {renderProjects} from "./projects.js"
import {initSearch} from "./search.js"
import {initCursor} from "./cursor3d.js"
import {initHeatmap} from "./heatmap.js"
import {initInterview} from "./interviewAI.js"
import {initAdmin} from "./admin.js"
import {optimize} from "./performance.js"

window.router=router

router.addRoute("/",renderProjects)
router.addRoute("/interview",initInterview)
router.addRoute("/admin",initAdmin)

document.addEventListener("DOMContentLoaded",()=>{

router.render()

initSearch()

initCursor()

initHeatmap()

optimize()

if("serviceWorker" in navigator){
navigator.serviceWorker.register("/sw.js")
}

})
