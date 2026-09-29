/*
  Paste your deployed Google Apps Script Web App URL below.
  Example:
  const SCRIPT_URL = "https://script.google.com/macros/s/XXXXXXXX/exec";
*/
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylqeuRa1KsWMUM0pk_zx6alPfQWHC802s2ad-YLCwsk0DcaoKvS525WLeDZGazzJXG/exec";

const form = document.getElementById("registrationForm");
const successMessage = document.getElementById("successMessage");
const submitButton = document.getElementById("submitButton");
const registerAnother = document.getElementById("registerAnother");

const requiredFields = [
  {
    id: "fullName",
    message: "Please enter your full name."
  },
  {
    id: "phone",
    message: "Please enter your phone number."
  },
  {
    id: "email",
    message: "Please enter a valid email address.",
    type: "email"
  },
  {
    id: "department",
    message: "Please enter your department or program."
  },
  {
    id: "year",
    message: "Please select your year of study."
  }
];

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}Error`);

  field.classList.add("invalid");
  if (error) error.textContent = message;
}

function clearError(fieldId) {
  const field = document.getElementById(fieldId);
  const error = document.getElementById(`${fieldId}Error`);

  field.classList.remove("invalid");
  if (error) error.textContent = "";
}

function validateForm() {
  let valid = true;

  requiredFields.forEach(({ id, message, type }) => {
    const field = document.getElementById(id);
    const value = field.value.trim();

    clearError(id);

    if (!value) {
      showError(id, message);
      valid = false;
      return;
    }

    if (type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showError(id, message);
      valid = false;
    }
  });

  const consent = document.getElementById("consent");
  if (!consent.checked) {
    alert("Please confirm the registration information before submitting.");
    valid = false;
  }

  return valid;
}

function collectFormData() {
  const interests = [...document.querySelectorAll('input[name="interests"]:checked')]
    .map((checkbox) => checkbox.value)
    .join(", ");

  return {
    fullName: document.getElementById("fullName").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    telegram: document.getElementById("telegram").value.trim(),
    studentId: document.getElementById("studentId").value.trim(),
    department: document.getElementById("department").value.trim(),
    year: document.getElementById("year").value,
    interests,
    note: document.getElementById("note").value.trim(),
    website: document.getElementById("website").value.trim()
  };
}

function setLoading(isLoading) {
  submitButton.disabled = isLoading;
  submitButton.classList.toggle("loading", isLoading);
  submitButton.querySelector(".button-text").textContent =
    isLoading ? "Submitting..." : "Complete Registration";
}

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!validateForm()) return;

  if (SCRIPT_URL === "PASTE_YOUR_APPS_SCRIPT_WEB_APP_URL_HERE") {
    alert(
      "The registration form is ready, but the Google Apps Script URL has not been added yet."
    );
    return;
  }

  const data = collectFormData();

  // Honeypot: silently stop obvious bot submissions.
  if (data.website) return;

  setLoading(true);

  try {
    // URLSearchParams keeps the request simple and avoids a JSON preflight.
    const body = new URLSearchParams();

    Object.entries(data).forEach(([key, value]) => {
      body.append(key, value);
    });

    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      body
    });

    // With no-cors the response is intentionally opaque, so we show
    // confirmation after the request is sent.
    form.hidden = true;
    successMessage.hidden = false;
    window.scrollTo({ top: 0, behavior: "smooth" });

  } catch (error) {
    console.error(error);
    alert(
      "We could not submit the registration right now. Please check your internet connection and try again."
    );
  } finally {
    setLoading(false);
  }
});

registerAnother.addEventListener("click", () => {
  form.reset();
  form.hidden = false;
  successMessage.hidden = true;

  requiredFields.forEach(({ id }) => clearError(id));

  window.scrollTo({
    top: form.offsetTop - 20,
    behavior: "smooth"
  });
});
