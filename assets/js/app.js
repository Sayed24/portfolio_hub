const toggle = document.getElementById('themeToggle');
const projectContainer = document.getElementById('projects');
const filterButtons = document.querySelectorAll('.filters button');


// Theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
document.documentElement.setAttribute('data-theme', 'dark');
toggle.textContent = '☀️';
}


toggle.addEventListener('click', () => {
const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
document.documentElement.toggleAttribute('data-theme', !isDark);
localStorage.setItem('theme', isDark ? 'light' : 'dark');
toggle.textContent = isDark ? '🌙' : '☀️';
});


// Load projects
fetch('projects.json')
.then(res => res.json())
.then(data => renderProjects(data));


function renderProjects(projects, filter = 'all') {
projectContainer.innerHTML = '';
projects
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


// Service Worker
if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}
```javascript
const toggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme');


if (currentTheme) {
document.documentElement.setAttribute('data-theme', currentTheme);
toggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}


toggle.addEventListener('click', () => {
let theme = document.documentElement.getAttribute('data-theme');
if (theme === 'dark') {
document.documentElement.removeAttribute('data-theme');
localStorage.setItem('theme', 'light');
toggle.textContent = '🌙';
} else {
document.documentElement.setAttribute('data-theme', 'dark');
localStorage.setItem('theme', 'dark');
toggle.textContent = '☀️';
}
});


if ('serviceWorker' in navigator) {
navigator.serviceWorker.register('service-worker.js');
}
// Sort featured first
function sortProjects(projects) {
return projects.sort((a, b) => b.featured - a.featured);
}


// Modal
const modal = document.createElement('div');
modal.className = 'modal';
document.body.appendChild(modal);


function openModal(project) {
modal.innerHTML = `
<div class="modal-content">
<h2>${project.title}</h2>
<p>${project.details}</p>
<a href="${project.link}" target="_blank">Visit Project →</a>
</div>`;
modal.style.display = 'flex';
}


modal.addEventListener('click', () => modal.style.display = 'none');
