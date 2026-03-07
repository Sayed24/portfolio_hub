import * as router from "./router.js"
import {renderProjects} from "./projects.js"
import {renderProject} from "./projectPage.js"
import {initHero3D} from "./hero3d.js"
import {initCursor} from "./cursor.js"
import {initHeatmap} from "./heatmap.js"
import {renderAnalytics} from "./analytics.js"
import {initChatbot} from "./chatbot.js"
import {initAdmin} from "./admin.js"

window.router=router

router.addRoute("/",renderProjects)
router.addRoute("/analytics",renderAnalytics)
router.addRoute("/chat",initChatbot)
router.addRoute("/admin",initAdmin)

router.render()

initHero3D()

initCursor()

initHeatmap()
