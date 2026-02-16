document.addEventListener("DOMContentLoaded", () => {

    // ================= SAFE ELEMENT SELECT =================
    const grid = document.getElementById("projectsGrid");
    const searchInput = document.getElementById("searchInput");
    const themeToggle = document.getElementById("themeToggle");
    const totalProjects = document.getElementById("totalProjects");

    const modal = document.getElementById("projectModal");
    const closeModal = document.getElementById("closeModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDesc = document.getElementById("modalDesc");
    const modalTech = document.getElementById("modalTech");

    if (!grid) {
        console.error("Grid not found.");
        return;
    }

    // ================= PROJECT DATA (10 PROJECTS) =================
    const projects = [
        {title:"SmartTask Dashboard",desc:"Role-based admin dashboard with charts.",tech:"HTML CSS JS"},
        {title:"Finance Tracker PWA",desc:"Offline-first finance tracking system.",tech:"PWA"},
        {title:"Drag & Drop Manager",desc:"Kanban productivity board.",tech:"Drag API"},
        {title:"GitHub Analyzer",desc:"GitHub API profile insights.",tech:"Fetch API"},
        {title:"FlowDesk CRUD",desc:"Full CRUD workspace system.",tech:"JavaScript"},
        {title:"Calendar Planner",desc:"Interactive calendar scheduling.",tech:"Date API"},
        {title:"Team Board",desc:"Team workflow collaboration UI.",tech:"Frontend"},
        {title:"Portfolio Builder",desc:"Dynamic portfolio generator.",tech:"DOM"},
        {title:"Realtime Notes",desc:"Auto-saving note system.",tech:"LocalStorage"},
        {title:"Analytics Dashboard",desc:"KPI visualization dashboard.",tech:"Charts"}
    ];

    // ================= RENDER =================
    function render(list) {

        grid.innerHTML = "";

        list.forEach(project => {

            const card = document.createElement("div");
            card.className = "card";

            card.innerHTML = `
                <h3>${project.title}</h3>
                <p>${project.desc}</p>
                <span class="tag">${project.tech}</span>
            `;

            card.addEventListener("click", () => openModal(project));

            grid.appendChild(card);
        });

        totalProjects.textContent = list.length;
    }

    // ================= MODAL =================
    function openModal(project){
        modalTitle.textContent = project.title;
        modalDesc.textContent = project.desc;
        modalTech.textContent = project.tech;
        modal.classList.remove("hidden");
    }

    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    modal.addEventListener("click", e => {
        if(e.target === modal) modal.classList.add("hidden");
    });

    // ================= SEARCH =================
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();

        const filtered = projects.filter(p =>
            p.title.toLowerCase().includes(value) ||
            p.tech.toLowerCase().includes(value)
        );

        render(filtered);
    });

    // ================= DARK MODE =================
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });

    // ================= INITIAL LOAD =================
    render(projects);

});
