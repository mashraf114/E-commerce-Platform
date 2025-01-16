document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000";
  const registerForm = document.getElementById("register-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const repasswordInput = document.getElementById("repassword");

  // Handle form submission
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userName = nameInput.value.trim();
    const userEmail = emailInput.value.trim();
    const userPassword = passwordInput.value.trim();
    const userRepassword = repasswordInput.value.trim();

    // Validate password match
    if (userPassword !== userRepassword) {
      alert("Passwords do not match!");
      return;
    }

    // Prepare user data
    const user = {
      id: String(Date.now()), // Generate a unique ID for the user
      name: userName,
      email: userEmail,
      password: userPassword,
    };

    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        // If successful, redirect to login page
        window.location.replace("login.html");
      } else {
        // If the response was not OK (e.g., 4xx or 5xx status codes)
        const errorMessage = await response.text(); // Read the response body for error message
        alert(`Error registering user: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user. Please try again later.");
    }
  });
});
