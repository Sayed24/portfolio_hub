const stats = document.getElementById('stats');

const clicks = JSON.parse(localStorage.getItem('clicks')) || {};

let output = '<h3>Project Clicks</h3>';

for (let project in clicks) {
  output += `<p>${project}: ${clicks[project]}</p>`;
}

stats.innerHTML = output;
