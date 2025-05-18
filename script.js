const form = document.getElementById("sampleForm");

// Regular expressions for validation
const patterns = {
    email: /^[a-zA-Z0-9._-]+@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/,
    url: /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/,
    phone: /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,
    creditCard: /^\d{4}[-\s]?\d{4}[-\s]?\d{4}[-\s]?\d{4}$/,
    htmlTags: /^<[a-z][a-z0-9]*(?:\s+[a-z0-9-]+(?:=["'][^"']["'])?)?\s*(?:\/?)>$/i,
    hashtag: /^#[A-Za-z0-9_]+$/, // Allows letters, numbers, and underscores
    currency: /^\$\d+(\.\d{2})?$/
};

// Function to validate an input field
function validateInput(input) {
    const pattern = patterns[input.id];
    const value = input.value.trim();

    if (pattern && !pattern.test(value)) {
        showError(input, `Invalid ${input.id} format.`);
        return false;
    }

    hideError(input);
    return true;
}

// Function to show error message
function showError(input, message) {
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains("error-message")) {
        errorDiv = document.createElement("div");
        errorDiv.className = "error-message";
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    errorDiv.textContent = message;
}

// Function to hide error message
function hideError(input) {
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains("error-message")) {
        errorDiv.textContent = "";
    }
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    let isValid = true;
    form.querySelectorAll("input").forEach(input => {
        if (!validateInput(input)) {
            isValid = false;
        }
    });

    if (isValid) {
        alert("Form submitted successfully!");  // Success message
        form.submit(); // Submits the form
    }
}

// Attach event listeners
form.addEventListener("submit", handleSubmit);
form.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", () => validateInput(input));
});

