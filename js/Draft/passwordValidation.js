// Function to validate password strength
function validatePassword(password) {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Hook to validate password on form submission
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!validatePassword(password)) {
      e.preventDefault();
      alert(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
      );
      return false;
    }

    if (password !== confirmPassword) {
      e.preventDefault();
      alert("Passwords do not match!");
      return false;
    }
  });
