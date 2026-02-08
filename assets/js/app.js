
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
