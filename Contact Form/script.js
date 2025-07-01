const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");
const charCount = document.getElementById("charCount");
const progress = document.getElementById("progress");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");
const phoneError = document.getElementById("phoneError");
const terms = document.getElementById("terms");
const termsError = document.getElementById("termsError");
const toast = document.getElementById("toast");
const themeToggle = document.getElementById("themeToggle");
const themeInfo = document.getElementById("themeInfo");
const submitBtn = document.getElementById("submitBtn");
const spinner = document.getElementById("spinner");
const btnText = document.getElementById("btnText");
const resetBtn = document.getElementById("resetBtn");
const successAnimation = document.getElementById("successAnimation");

// Theme toggle
themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  updateThemeInfo();
});

function updateThemeInfo() {
  const isDark = document.body.classList.contains("dark");
  themeInfo.textContent = `You are using ${isDark ? "Dark" : "Light"} Theme`;
}

updateThemeInfo();

// Save to localStorage
function saveFormState() {
  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("email", emailInput.value);
  localStorage.setItem("phone", phoneInput.value);
  localStorage.setItem("message", messageInput.value);
}

// Load saved form
window.addEventListener("DOMContentLoaded", () => {
  nameInput.value = localStorage.getItem("name") || "";
  emailInput.value = localStorage.getItem("email") || "";
  phoneInput.value = localStorage.getItem("phone") || "";
  messageInput.value = localStorage.getItem("message") || "";
  updateCharCount();
});

// Input tracking
[nameInput, emailInput, phoneInput, messageInput].forEach((el) => {
  el.addEventListener("input", () => {
    saveFormState();
    if (el.id === "message") updateCharCount();
  });
});

function updateCharCount() {
  const len = messageInput.value.length;
  charCount.textContent = len;
  progress.style.width = `${(len / 500) * 100}%`;
}

// Prevent accidental Enter key submit
form.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
    e.preventDefault();
  }
});

// Form submit
form.addEventListener("submit", function (e) {
  e.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  phoneError.textContent = "";
  messageError.textContent = "";
  termsError.textContent = "";

  let valid = true;

  if (!nameInput.value.trim()) {
    nameError.textContent = "Name is required.";
    valid = false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!emailRegex.test(emailInput.value)) {
    emailError.textContent = "Invalid email format.";
    valid = false;
  }

  if (phoneInput.value.trim() && !/^[6-9]\d{9}$/.test(phoneInput.value.trim())) {
    phoneError.textContent = "Invalid phone number.";
    valid = false;
  }

  if (!messageInput.value.trim()) {
    messageError.textContent = "Message is required.";
    valid = false;
  }

  if (!terms.checked) {
    termsError.textContent = "You must agree before submitting.";
    valid = false;
  }

  if (!valid) return;

  btnText.style.display = "none";
  spinner.style.display = "inline-block";

  setTimeout(() => {
    btnText.style.display = "inline";
    spinner.style.display = "none";

    form.reset();
    charCount.textContent = "0";
    progress.style.width = "0%";
    localStorage.clear();

    showToast("Message sent successfully!");

    successAnimation.style.display = "flex";
    setTimeout(() => {
      successAnimation.style.display = "none";
    }, 2500);

  }, 1500);
});

function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Reset button
resetBtn.addEventListener("click", () => {
  form.reset();
  charCount.textContent = "0";
  progress.style.width = "0%";
  localStorage.clear();
  showToast("Form reset.");
});
