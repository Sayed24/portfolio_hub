import * as router from "./router.js"
import {renderProjects} from "./projects.js"
import {renderProject} from "./projectPage.js"
import {renderSkills} from "./skills.js"
import {initTheme} from "./theme.js"
import {initAdmin} from "./admin.js"

window.router=router

router.addRoute("/",renderProjects)
router.addRoute("/projects",renderProjects)
router.addRoute("/about",renderSkills)
router.addRoute("/admin",initAdmin)

router.render()

initTheme()

if("serviceWorker" in navigator){
navigator.serviceWorker.register("/sw.js")
}
