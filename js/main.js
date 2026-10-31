/* =====================================================================
   alt108 website script
   Small and simple on purpose. It does three things:
     1. Opens and closes the menu on phones
     2. Sends the contact form
     3. Puts the current year in the footer
   ===================================================================== */


/* ---------- SETTINGS YOU MAY WANT TO CHANGE ---------- */

// Where the contact form sends its data.
// Paste the "Production URL" of an n8n Webhook node between the quotes
// (see EDITING-GUIDE.md, "Connect the contact form").
// While it is empty, the form opens the visitor's email app instead.
const FORM_WEBHOOK = "";

// Where enquiries go if the webhook is empty or fails
const CONTACT_EMAIL = "manu@alt108.com";


/* ---------- 1. PHONE MENU ---------- */
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".menu");

if (menuButton && menu) {
  // Tapping ☰ shows or hides the menu
  menuButton.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", isOpen);
  });
  // Tapping a link inside the menu closes it again
  menu.querySelectorAll("a").forEach(link =>
    link.addEventListener("click", () => menu.classList.remove("open"))
  );
}


/* ---------- 2. CONTACT FORM ---------- */
const form = document.getElementById("enquiry-form");
const statusBox = document.getElementById("form-status");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();              // stop the browser reloading the page
    const data = new FormData(form);     // collects every field, including the upload

    // No webhook yet: build an email with the answers and open the email app
    if (!FORM_WEBHOOK) {
      openEmail(data);
      return;
    }

    // Webhook set: send the answers (and any uploaded file) to n8n
    statusBox.textContent = "Sending…";
    try {
      const response = await fetch(FORM_WEBHOOK, { method: "POST", body: data });
      if (!response.ok) throw new Error("Server said " + response.status);
      form.reset();
      statusBox.textContent = "Thanks! I'll reply within one business day.";
    } catch (error) {
      statusBox.innerHTML =
        "Sorry, that didn't send. Please email <a href='mailto:" + CONTACT_EMAIL + "'>" +
        CONTACT_EMAIL + "</a> or call 0400 004 414.";
    }
  });
}

// Turns the form answers into a pre-written email
function openEmail(data) {
  const lines = [];
  for (const [field, value] of data.entries()) {
    if (typeof value === "string" && value.trim()) lines.push(field + ": " + value);
  }
  const subject = "Website enquiry from " + (data.get("Name") || "a visitor");
  window.location.href =
    "mailto:" + CONTACT_EMAIL +
    "?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(lines.join("\n") + "\n\n(Attach your current form to this email if you have one.)");
  statusBox.textContent = "Your email app should open with your details filled in. Just press send.";
}


/* ---------- 3. FOOTER YEAR ---------- */
document.querySelectorAll(".year").forEach(el => (el.textContent = new Date().getFullYear()));
