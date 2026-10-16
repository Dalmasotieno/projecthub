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

// ---------- Contact form (sends email via FormSubmit, no account or key needed) ----------
const RECEIVER_EMAIL = "dalmasotieno2024@gmail.com";

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  const status = document.getElementById("formMessage");
  const submitBtn = document.getElementById("submitBtn");

  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(contactForm));
    data._subject = "New message from your portfolio website";
    data._template = "table";
    data._captcha = "false";

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    status.className = "";
    status.textContent = "";

    try {
      const response = await fetch("https://formsubmit.co/ajax/" + RECEIVER_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(data)
      });

      let result = {};
      try { result = await response.json(); } catch (e) { /* non-JSON reply */ }
      console.log("FormSubmit response:", response.status, result);

      if (response.ok && (result.success === "true" || result.success === true)) {
        status.className = "success";
        status.textContent = "Thank you, " + data.name + "! Your message has been sent.";
        contactForm.reset();
      } else {
        // The service answered, but refused or needs activation: show its real reason
        status.className = "error";
        status.textContent = "Not sent: " + (result.message || ("server replied " + response.status)) +
          " (If this is your first message, check " + RECEIVER_EMAIL + " for an activation email from FormSubmit, including Spam, and click Activate Form.)";
      }
    } catch (error) {
      // The request never reached the service (offline, blocked, or opened as a local file)
      console.error("Contact form error:", error);
      status.className = "error";
      status.textContent = "Could not reach the mail service (" + error.message + "). Check your internet, turn off any ad blocker, " +
        "and open the site through Live Server. You can also email me directly at " + RECEIVER_EMAIL + ".";
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Send Message";
    }
  });
}
