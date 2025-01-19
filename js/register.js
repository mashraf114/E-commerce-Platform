document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000";
  const registerForm = document.getElementById("register-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const repasswordInput = document.getElementById("repassword");

  // Regex patterns
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
  // Handle form submission
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userName = nameInput.value.trim();
    const userEmail = emailInput.value.trim();
    const userPassword = passwordInput.value.trim();
    const userRepassword = repasswordInput.value.trim();

    // Validate name
    if (!nameRegex.test(userName)) {
      alert("Name should contain only letters and spaces.");
      return;
    }

    // Validate email
    if (!emailRegex.test(userEmail)) {
      alert("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!passwordRegex.test(userPassword)) {
      alert(
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }

    // Validate password match
    if (userPassword !== userRepassword) {
      alert("Passwords do not match!");
      return;
    }

    const user = {
      id: String(Date.now()),
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
        window.location.replace("login.html");
      } else {
        const errorMessage = await response.text(); // Read the response body for error message
        alert(`Error registering user: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Error registering user. Please try again later.");
    }
  });
});
