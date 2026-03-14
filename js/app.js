import * as router from "./router.js"
import {renderProjects} from "./projects.js"
import {renderProject} from "./projectPage.js"
import {initTheme} from "./theme.js"

window.router=router

router.addRoute("/",renderProjects)
router.addRoute("/projects",renderProjects)

router.render()

initTheme()
