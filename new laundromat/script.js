const WHATSAPP = "2348025426617";
const BUSINESS_EMAIL = "YOUR_EMAIL@example.com"; // Replace with your real email.

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
menuToggle.addEventListener("click", () => navMenu.classList.toggle("open"));
document.querySelectorAll("#navMenu a").forEach(a => a.addEventListener("click", () => navMenu.classList.remove("open")));

document.getElementById("year").textContent = new Date().getFullYear();

const dateInput = document.getElementById("date");
const today = new Date();
today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
dateInput.min = today.toISOString().split("T")[0];

function bookingText() {
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const service = document.getElementById("service").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const option = document.getElementById("option").value;
  const message = document.getElementById("message").value.trim();

  return `Hello Pristine Vintage Laundromart 👋

I'd like to make a laundry appointment.

Name: ${name}
Phone: ${phone}
Service: ${service}
Preferred date: ${date}
Preferred time: ${time}
Service option: ${option}
Additional details: ${message || "None"}

Please confirm availability and the total price. Thank you!`;
}

document.getElementById("bookingForm").addEventListener("submit", e => {
  e.preventDefault();
  const text = bookingText();
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
});

document.getElementById("emailBooking").addEventListener("click", () => {
  const form = document.getElementById("bookingForm");
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const subject = encodeURIComponent("Laundry Appointment Request");
  const body = encodeURIComponent(bookingText());
  window.location.href = `mailto:${BUSINESS_EMAIL}?subject=${subject}&body=${body}`;
});

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    setTimeout(() => {
      const service = link.dataset.service;
      const select = document.getElementById("service");
      const exists = [...select.options].some(o => o.value === service);
      if (exists) select.value = service;
    }, 50);
  });
});

/* Lightweight local FAQ assistant.
   It works without an API key. Replace/add answers below as your business details become available. */
const faqAnswers = [
  {keys:["book","appointment","schedule","booking"], answer:"You can book using the appointment form on this website. Choose your service and preferred date/time, then send the details to us on WhatsApp. You can also call 0802 542 6617."},
  {keys:["whatsapp","contact","number","phone","call"], answer:"Our WhatsApp and phone number is 0802 542 6617. Tap the green WhatsApp button or call us directly."},
  {keys:["price","prices","cost","how much","rate"], answer:"Our website has a Price List section with starter prices. Final pricing may depend on the item, quantity and care required. Send us a WhatsApp message for a confirmed quote."},
  {keys:["pickup","delivery"], answer:"Yes, pickup and delivery can be requested. Select your preferred option in the booking form and we'll confirm availability."},
  {keys:["dry clean","dry cleaning"], answer:"Yes. We offer dry-cleaning services for suitable garments. Tell us what item you have when booking so we can advise on the right care."},
  {keys:["duvet","blanket","bedding"], answer:"We accept duvets, blankets and bedding. Choose 'Duvets & Bedding' in the appointment form."},
  {keys:["iron","ironing"], answer:"Yes. Ironing and finishing is available for clothing that needs a crisp, polished finish."},
  {keys:["open","opening","hours","close"], answer:"Please replace the opening-hours information in the website with your current business hours. For immediate confirmation, contact us on WhatsApp."},
  {keys:["location","address","where"], answer:"Your business address has not been added yet. Add it in the Contact section once you provide the location."}
];

function getBotAnswer(input) {
  const text = input.toLowerCase();
  for (const item of faqAnswers) {
    if (item.keys.some(key => text.includes(key))) return item.answer;
  }
  return "I'm not sure about that yet. Please contact Pristine Vintage Laundromart on WhatsApp at 0802 542 6617 and we'll be happy to help.";
}

const aiButton = document.getElementById("aiButton");
const aiPanel = document.getElementById("aiPanel");
const aiClose = document.getElementById("aiClose");
const aiMessages = document.getElementById("aiMessages");
const aiForm = document.getElementById("aiForm");
const aiInput = document.getElementById("aiInput");

aiButton.addEventListener("click", () => { aiPanel.classList.toggle("open"); if(aiPanel.classList.contains("open")) aiInput.focus(); });
aiClose.addEventListener("click", () => aiPanel.classList.remove("open"));

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = type === "user" ? "user-message" : "bot-message";
  div.textContent = text;
  aiMessages.appendChild(div);
  aiMessages.scrollTop = aiMessages.scrollHeight;
}

function askBot(question) {
  if (!question.trim()) return;
  addMessage(question, "user");
  setTimeout(() => addMessage(getBotAnswer(question), "bot"), 250);
}

aiForm.addEventListener("submit", e => {
  e.preventDefault();
  const q = aiInput.value;
  aiInput.value = "";
  askBot(q);
});

document.querySelectorAll(".quick-questions button").forEach(btn => {
  btn.addEventListener("click", () => askBot(btn.dataset.question));
});
