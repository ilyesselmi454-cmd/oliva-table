
const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");
const filters = document.querySelectorAll(".filter");
const dishes = document.querySelectorAll(".dish");
const bookingForm = document.getElementById("bookingForm");
const toast = document.getElementById("toast");

let toastTimeout;

document.getElementById("year").textContent =
  new Date().getFullYear();

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// Menu category filters
filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    const category = filter.dataset.category;

    filters.forEach((button) => {
      const active = button === filter;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    dishes.forEach((dish) => {
      const show =
        category === "all" ||
        dish.dataset.category === category;

      dish.hidden = !show;
    });
  });

  filter.setAttribute(
    "aria-pressed",
    String(filter.classList.contains("active"))
  );
});

// Set today's date as the earliest booking date
const dateInput = document.getElementById("guestDate");
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

dateInput.min = localToday;

// Demo booking request
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3500);
}

bookingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!bookingForm.reportValidity()) return;

  const data = new FormData(bookingForm);
  const name = data.get("name").trim();
  const date = data.get("date");
  const time = data.get("time");
  const guests = data.get("guests");
  const phone = data.get("phone").trim();

  const message = [
    "Hello Oliva Table!",
    "",
    "I'd like to request a reservation.",
    `Name: ${name}`,
    `Date: ${date}`,
    `Time: ${time}`,
    `Guests: ${guests}`,
    `Phone: ${phone}`,
    "",
    "Please confirm availability. Thank you!"
  ].join("\n");

  // Replace with the restaurant's real WhatsApp number.
  const whatsappNumber = "21600000000";

  if (whatsappNumber === "21600000000") {
    showToast(
      "Demo mode: replace the placeholder WhatsApp number in script.js first."
    );

    // The request remains available for testing in the browser console.
    console.log("Demo booking request:\n" + message);
    return;
  }

  const whatsappURL =
    "https://wa.me/" + whatsappNumber +
    "?text=" + encodeURIComponent(message);

  window.open(whatsappURL, "_blank", "noopener,noreferrer");
});
