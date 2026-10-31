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
// ---------- Copy to clipboard ----------
document.querySelectorAll("[data-copy]").forEach(function (btn) {
  const label = btn.textContent;
  btn.addEventListener("click", async function () {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy);
      btn.textContent = "Copied!";
    } catch (e) {
      btn.textContent = btn.dataset.copy;   // show it so it can be copied by hand
    }
    setTimeout(function () { btn.textContent = label; }, 2500);
  });
});
// ---------- Back to top button ----------
(function () {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "to-top";
  btn.setAttribute("aria-label", "Back to top");
  btn.innerHTML = "&uarr;";
  document.body.appendChild(btn);

  function toggle() { btn.classList.toggle("show", window.scrollY > 400); }
  window.addEventListener("scroll", toggle, { passive: true });
  toggle();

  btn.addEventListener("click", function () {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  });
})();