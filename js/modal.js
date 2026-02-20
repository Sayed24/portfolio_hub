
const modal = document.getElementById('projectModal');

window.openModal = function(project) {
  modal.classList.remove('hidden');

  modal.innerHTML = `
    <div class="modal-content">
      <h2>${project.title}</h2>
      <img src="${project.image}">
      <p>${project.description}</p>
      <a href="${project.url}" target="_blank">Visit Project</a>
      <button onclick="closeModal()">Close</button>
    </div>
  `;
}

window.closeModal = function() {
  modal.classList.add('hidden');
}
