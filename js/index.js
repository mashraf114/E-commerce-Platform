function updateSignInText() {
  const signInElement = document.querySelector(".nav-signin p span"); // "Hello, sign in" text
  const accountListsElement = document.querySelector(
    ".nav-signin p.nav-second"
  ); // "Account & Lists" text
  const navSignInDiv = document.querySelector(".nav-signin"); // Entire clickable div
  const logoutIcon = "<i class='fa-sharp fa-solid fa-right-from-bracket'></i>"; // Logout icon

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (navSignInDiv) {
    if (currentUser) {
      if (signInElement)
        signInElement.textContent = `Hello, ${currentUser.name}`;
      if (accountListsElement)
        accountListsElement.innerHTML = `Log out ${logoutIcon}`;

      navSignInDiv.style.cursor = "pointer";
      navSignInDiv.onclick = (event) => {
        const clickedElement = event.target;
        if (clickedElement === signInElement) {
          window.location.href = "views/profile.html";
        } else {
          confirmLogout();
        }
      };
    } else {
      if (signInElement) signInElement.textContent = "Hello, sign in";
      if (accountListsElement)
        accountListsElement.innerHTML =
          "Account & Lists <i class='fa-sharp fa-solid fa-circle-chevron-down'></i>";

      navSignInDiv.style.cursor = "pointer";
      navSignInDiv.onclick = () => {
        window.location.href = "views/login.html";
      };
    }
  }
}

function confirmLogout() {
  const confirmation = confirm("Are you sure you want to log out?");
  if (confirmation) {
    logout();
  }
}

function logout() {
  sessionStorage.removeItem("currentUser");

  window.location.replace("/index.html");
}

// Function to handle category box clicks
function handleCategoryClick(event) {
  const categoryBox = event.target.closest(".box");
  if (categoryBox) {
    // Find the <h2> element inside the clicked box
    const categoryName = categoryBox.querySelector("h2")?.textContent;
    if (categoryName) {
      // Redirect to product-list.html with the selected category
      window.location.href = `views/product-list.html?category=${encodeURIComponent(
        categoryName
      )}`;
    }
  }
}

// Add event listener to the parent container
document
  .querySelector(".shop-section")
  .addEventListener("click", handleCategoryClick);

// Call the function to update the text when the page loads
window.onload = updateSignInText;
