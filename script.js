
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}


document.getElementById("contactForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("formMessage");

  message.textContent = `Thank you, ${name}! Your message has been sent.`;
});
