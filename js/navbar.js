console.log("navbar.js is running");

console.log("DOM fully loaded");

function updateSignInText() {
  console.log("function updateSignInText()");
  console.log(
    "document.querySelector",
    document.querySelector(".nav-signin p span")
  );
  const signInElement = document.querySelector(".nav-signin p span");
  const accountListsElement = document.querySelector(
    ".nav-signin p.nav-second"
  );
  const navSignInDiv = document.querySelector(".nav-signin");

  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  if (!navSignInDiv) {
    console.error("Element with class 'nav-signin' not found.");
    return;
  }

  if (currentUser) {
    if (signInElement) {
      signInElement.textContent = `Hello, ${currentUser.name}`;
    }
    if (accountListsElement) {
      accountListsElement.innerHTML =
        "Account & Lists <i class='fa-sharp fa-solid fa-circle-chevron-down'></i>";
    }

    navSignInDiv.style.cursor = "pointer";
    navSignInDiv.onclick = () => {
      window.location.href = "/views/profile.html";
    };
  } else {
    if (signInElement) {
      signInElement.textContent = "Hello, sign in";
    }
    if (accountListsElement) {
      accountListsElement.innerHTML =
        "Account & Lists <i class='fa-sharp fa-solid fa-circle-chevron-down'></i>";
    }

    navSignInDiv.style.cursor = "pointer";
    navSignInDiv.onclick = () => {
      window.location.href = "/views/login.html";
    };
  }
}

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
    cartQuantityElement.textContent = "";
    cartQuantityElement.style.display = "none";
    return;
  }

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  cartQuantityElement.textContent = totalQuantity;
  cartQuantityElement.style.display = "inline";
}

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

updateSignInText();
updateDeliverToAddress();
updateCartQuantity();
handleCategorySelection();
