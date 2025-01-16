// Function to update the "sign-in" text and set the behavior for the "nav-signin" div
function updateSignInText() {
  const signInElement = document.querySelector(".nav-signin p span"); // "Hello, sign in" text
  const accountListsElement = document.querySelector(
    ".nav-signin p.nav-second"
  ); // "Account & Lists" text
  const navSignInDiv = document.querySelector(".nav-signin"); // Entire clickable div
  const logoutIcon = "<i class='fa-sharp fa-solid fa-right-from-bracket'></i>"; // Logout icon

  // Check if a user is stored in sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (navSignInDiv) {
    if (currentUser) {
      // If there is a logged-in user, update the text and add logout functionality
      if (signInElement)
        signInElement.textContent = `Hello, ${currentUser.name}`;
      if (accountListsElement)
        accountListsElement.innerHTML = `Log out ${logoutIcon}`;

      // Add click event for logout
      navSignInDiv.style.cursor = "pointer";
      navSignInDiv.onclick = (event) => {
        const clickedElement = event.target;
        // Check if the user clicked on the "Hello, ${currentUser.name}" text
        if (clickedElement === signInElement) {
          window.location.href = "views/profile.html"; // Navigate to profile page
        } else {
          confirmLogout();
        }
      };
    } else {
      // If no user is found, reset text and redirect to login page on click
      if (signInElement) signInElement.textContent = "Hello, sign in";
      if (accountListsElement)
        accountListsElement.innerHTML =
          "Account & Lists <i class='fa-sharp fa-solid fa-circle-chevron-down'></i>";

      // Add click event for login redirect
      navSignInDiv.style.cursor = "pointer";
      navSignInDiv.onclick = () => {
        window.location.href = "views/login.html";
      };
    }
  }
}

// Function to confirm logout
function confirmLogout() {
  const confirmation = confirm("Are you sure you want to log out?");
  if (confirmation) {
    logout(); // Call the logout function if the user confirms
  }
}

// Log out function to remove the session data and redirect to home page
function logout() {
  sessionStorage.removeItem("currentUser"); // Remove the logged-in user from sessionStorage
  window.location.replace("/index.html"); // Redirect to home page
}

// Call the function to update the text when the page loads
window.onload = updateSignInText;
