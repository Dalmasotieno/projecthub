// ---------- Mobile menu ----------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    const open = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", open);
    menuToggle.innerHTML = open ? "&times;" : "&#9776;";
  });
}
