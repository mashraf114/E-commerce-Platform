// Function to update the "sign-in" text with the logged-in user's name or "Hello, sign in"
function updateSignInText() {
  const signInElement = document.querySelector(".nav-signin p span"); // Select the "Hello, sign in" text

  // Check if a user is stored in sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (signInElement) {
    if (currentUser) {
      // If there is a logged-in user, display their name
      signInElement.textContent = `Hello, ${currentUser.name}`;
    } else {
      // If no user is found, display "Hello, sign in"
      signInElement.textContent = "Hello, sign in";
    }
  }
}

// Call the function to update the text when the page loads
window.onload = updateSignInText;
