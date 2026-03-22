import * as router from "./router.js"
import {renderProjects} from "./projects.js"
import {renderProject} from "./projectPage.js"
import {renderSkills} from "./skills.js"
import {renderRecruiter} from "./recruiter.js"
import {initAdmin} from "./admin.js"
import {initTheme} from "./theme.js"

window.router=router

router.addRoute("/",renderProjects)
router.addRoute("/projects",renderProjects)
router.addRoute("/about",renderSkills)
router.addRoute("/contact",renderContact)
router.addRoute("/recruiter",renderRecruiter)
router.addRoute("/admin",initAdmin)

router.render()
initTheme()

function renderContact(){
document.getElementById("app").innerHTML=`
<div style="padding:40px">
<h2>Contact</h2>
<p>Email: example@email.com</p>
<p>LinkedIn: linkedin.com/in/yourprofile</p>
</div>`
}
