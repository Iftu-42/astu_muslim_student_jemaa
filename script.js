const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbylqeuRa1KsWMUM0pk_zx6alPfQWHC802s2ad-YLCwsk0DcaoKvS525WLeDZGazzJXG/exec";

const form = document.getElementById("registrationForm");
const submitBtn = document.getElementById("submitBtn");

const successMessage = document.getElementById("successMessage");
const registrationId = document.getElementById("registrationId");


form.addEventListener("submit", async function (event) {

    event.preventDefault();


    // Basic validation
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }


    // Honeypot protection
    const honeypot = document.getElementById("website");

    if (honeypot && honeypot.value.trim() !== "") {
        return;
    }


    // Prevent multiple submissions
    submitBtn.disabled = true;
    submitBtn.textContent = "Submitting...";


    const formData = new URLSearchParams();

    formData.append(
        "fullName",
        document.getElementById("fullName").value.trim()
    );

    formData.append(
        "phone",
        document.getElementById("phone").value.trim()
    );

    formData.append(
        "email",
        document.getElementById("email").value.trim()
    );

    formData.append(
        "telegram",
        document.getElementById("telegram").value.trim()
    );

    formData.append(
        "studentId",
        document.getElementById("studentId").value.trim()
    );

    formData.append(
        "department",
        document.getElementById("department").value
    );


    try {

        await fetch(SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            body: formData
        });


        // Show success
        form.style.display = "none";
        successMessage.style.display = "block";


        // Since no-cors doesn't expose the Apps Script response,
        // show a general confirmation.
        registrationId.textContent =
            "Your registration has been received successfully.";


    } catch (error) {

        console.error("Registration error:", error);

        alert(
            "Something went wrong while submitting your registration. Please try again."
        );

        submitBtn.disabled = false;
        submitBtn.textContent = "Register";
    }

});