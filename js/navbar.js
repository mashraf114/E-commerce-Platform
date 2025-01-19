console.log("navbar.js is running");

console.log("DOM fully loaded");

// Function to update the "sign-in" text
function updateSignInText() {
  console.log("function updateSignInText()");
  console.log(
    "document.querySelector",
    document.querySelector(".nav-signin p span")
  );
  const signInElement = document.querySelector(".nav-signin p span"); // "Hello, sign in" text
  const accountListsElement = document.querySelector(
    ".nav-signin p.nav-second"
  ); // "Account & Lists" text
  const navSignInDiv = document.querySelector(".nav-signin"); // Entire clickable div

  // Check if a user is stored in sessionStorage
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!navSignInDiv) {
    console.error("Element with class 'nav-signin' not found.");
    return;
  }

  if (currentUser) {
    // If there is a logged-in user, update the text
    if (signInElement) {
      signInElement.textContent = `Hello, ${currentUser.name}`;
    }
    if (accountListsElement) {
      accountListsElement.innerHTML =
        "Account & Lists <i class='fa-sharp fa-solid fa-circle-chevron-down'></i>";
    }

    // Add click event to redirect to profile page
    navSignInDiv.style.cursor = "pointer";
    navSignInDiv.onclick = () => {
      window.location.href = "/views/profile.html";
    };
  } else {
    // If no user is found, reset text and redirect to login page on click
    if (signInElement) {
      signInElement.textContent = "Hello, sign in";
    }
    if (accountListsElement) {
      accountListsElement.innerHTML =
        "Account & Lists <i class='fa-sharp fa-solid fa-circle-chevron-down'></i>";
    }

    // Add click event for login redirect
    navSignInDiv.style.cursor = "pointer";
    navSignInDiv.onclick = () => {
      window.location.href = "/views/login.html";
    };
  }
}

// Function to update the "Deliver to" address
async function updateDeliverToAddress() {
  const deliverToAddressElement = document.getElementById("deliver-to-address");

  if (!deliverToAddressElement) {
    console.error("Element with ID 'deliver-to-address' not found.");
    return;
  }

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    deliverToAddressElement.textContent = "Egypt";
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:3000/users/${currentUser.id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const user = await response.json();
    const defaultAddress =
      user.defaultAddress === "home" ? user.homeAddress : user.workAddress;
    deliverToAddressElement.textContent = defaultAddress || "Egypt";
  } catch (error) {
    console.error("Error fetching user data:", error);
    deliverToAddressElement.textContent = "Egypt";
  }
}

function updateCartQuantity() {
  const cartQuantityElement = document.getElementById("cart-quantity");

  if (!cartQuantityElement) {
    console.error("Element with ID 'cart-quantity' not found.");
    return;
  }

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!currentUser) {
    // If no user is logged in, hide the cart quantity
    cartQuantityElement.textContent = ""; // Clear the text
    cartQuantityElement.style.display = "none"; // Hide the element
    return;
  }

  // If a user is logged in, update the cart quantity
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  cartQuantityElement.textContent = totalQuantity;
  cartQuantityElement.style.display = "inline"; // Ensure the element is visible
}

// Function to handle category selection
function handleCategorySelection() {
  const categorySelect = document.getElementById("category-select");

  if (!categorySelect) {
    console.error("Element with ID 'category-select' not found.");
    return;
  }

  categorySelect.addEventListener("change", (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      window.location.href = `/views/product-list.html?category=${encodeURIComponent(
        selectedCategory
      )}`;
    }
  });
}

// Call functions to update the navbar
updateSignInText();
updateDeliverToAddress();
updateCartQuantity();
handleCategorySelection();
