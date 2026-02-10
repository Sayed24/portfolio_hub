const toggle = document.getElementById('themeToggle');
});


// RECRUITER MODE
const params = new URLSearchParams(window.location.search);
if (params.get('recruiter')) {
document.body.classList.add('recruiter-mode');
}


// MODAL
const modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);
modal.addEventListener('click', () => modal.style.display = 'none');


function openModal(project) {
modal.innerHTML = `
<div class="modal-content">
<h2>${project.title}</h2>
<p>${project.details}</p>
<strong>Tech Stack:</strong>
<p>${project.tech.join(', ')}</p>
<strong>Challenge:</strong>
<p>${project.challenges}</p>
<strong>Solution:</strong>
<p>${project.solution}</p>
<a href="${project.link}" target="_blank">Live Project →</a>
</div>`;
modal.style.display = 'flex';
}


// LOAD PROJECTS
fetch('projects.json')
.then(res => res.json())
.then(data => renderProjects(data));


function renderProjects(projects, filter = 'all') {
projectContainer.innerHTML = '';
projects
.sort((a, b) => b.featured - a.featured)
.filter(p => filter === 'all' || p.category === filter)
.forEach(p => {
const card = document.createElement('a');
card.href = p.link;
card.className = 'project-card';
card.innerHTML = `
<div class="project-image" style="background-image:url('${p.image}')"></div>
<div class="project-content">
<h3>${p.title}</h3>
<p>${p.description}</p>
<span>${p.category}</span>
</div>`;
card.addEventListener('click', e => {
e.preventDefault();
openModal(p);
});
projectContainer.appendChild(card);
});
}


filterButtons.forEach(btn => {
btn.addEventListener('click', () => {
document.querySelector('.filters .active').classList.remove('active');
btn.classList.add('active');
fetch('projects.json')
.then(res => res.json())
.then(data => renderProjects(data, btn.dataset.filter));
});
});


// SERVICE WORKER
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}
