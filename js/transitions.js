const overlay = document.getElementById("pageTransition");

document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    const href = link.getAttribute("href");

    overlay.classList.add("active");

    setTimeout(() => {
      window.location.href = href;
    }, 400);
  });
});
