
const recruiterBtn = document.createElement("button");
recruiterBtn.innerText = "Recruiter Mode";
document.body.appendChild(recruiterBtn);

recruiterBtn.onclick = () => {
  document.body.classList.toggle("recruiter");

  if (document.body.classList.contains("recruiter")) {
    showRecruiterView();
  } else {
    renderProjects(projects);
  }
};

function showRecruiterView() {
  const topProjects = [...projects]
    .sort((a, b) => b.views - a.views)
    .slice(0, 5);

  renderProjects(topProjects);
}
