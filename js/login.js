document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000";
  const loginForm = document.querySelector(".login-container");
  const emailInput = loginForm.querySelector("input[type='email']");
  const passwordInput = loginForm.querySelector("input[type='password']");
  const continueButton = loginForm.querySelector("button");

  // Handle login form submission
  continueButton.addEventListener("click", async (event) => {
    event.preventDefault(); // Prevent form submission

    const userEmail = emailInput.value.trim();
    const userPassword = passwordInput.value.trim();

    // Basic validation for email and password fields
    // if (!userEmail || !userPassword) {
    //   alert("Please enter both email and password.");
    //   return;
    // }

    try {
      // Make a GET request to check if the email exists
      const response = await fetch(`${apiUrl}/users?email=${userEmail}`);
      if (response.ok) {
        const users = await response.json();
        if (users.length > 0) {
          const user = users[0];
          if (user.password === userPassword) {
            // Authentication successful, store user info in sessionStorage
            sessionStorage.setItem("currentUser", JSON.stringify(user));

            // Redirect to the main page (index)
            window.location.replace("../index.html"); // Adjust the redirect as needed
          } else {
            alert("Incorrect password.");
          }
        } else {
          alert("No account found with this email.");
        }
      } else {
        alert("Error during login. Please try again.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error during login. Please try again later.");
    }
  });
});

function redirectToRegister() {
  window.location.href = "/views/register.html";
}
