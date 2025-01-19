// Function to get query parameters from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Fetch product details from the API
const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const product = await response.json();
    renderProductDetails(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};
const renderProductDetails = (product) => {
  const title = document.querySelector(".title");
  const rating = document.querySelector(".rating");
  const price = document.querySelector(".price");
  const oldPrice = document.querySelector(".old-price");
  const featuresList = document.querySelector(".features");
  const image = document.querySelector(".left-section img");

  // Update the page's <title> tag
  document.title = product.name;

  // Set the title and other details from the fetched product data
  title.textContent = product.name;

  // Handle ratings
  if (product.ratings && product.ratings.length > 0) {
    rating.textContent = `4.0 ⭐⭐⭐⭐ | ${product.ratings.length.toLocaleString()} ratings`;
  } else {
    rating.textContent = "Be the first to rate";
  }

  price.innerHTML = `EGP ${product.price.toLocaleString()}`; // Price format
  oldPrice.innerHTML = `EGP ${product.price * 2}`; // Example of old price, adjust based on actual data if needed

  // Render features
  featuresList.innerHTML = ""; // Clear existing features
  const description = product.description || "No description available."; // Handle missing description
  description.split("\n").forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  // Set product image
  image.src = product.image || "/assets/default-image.jpg"; // Handle missing image

  // Add event listener for "Add to Cart" button
  const addToCartButton = document.querySelector(".add-to-cart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      if (!isUserLoggedIn()) {
        window.location.href = "/views/login.html"; // Redirect to the login page
        return;
      }

      // Add the product to the cart
      const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1, // Default quantity is 1
        image: product.image,
      };

      // Get existing cart from localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if the product is already in the cart
      const existingProduct = cart.find((item) => item.id === productToAdd.id);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if product already in cart
      } else {
        cart.push(productToAdd); // Add product to the cart
      }

      // Save updated cart to localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Display a confirmation message
      alert(`${productToAdd.name} added to cart!`);
    });
  }

  // Add event listener for "Buy Now" button
  const buyButton = document.querySelector(".buy");
  if (buyButton) {
    buyButton.addEventListener("click", () => {
      if (!isUserLoggedIn()) {
        window.location.href = "/views/login.html"; // Redirect to the login page
        return;
      }

      // Redirect to the checkout page with the cart data
      window.location.href = "/views/checkout.html";
    });
  }
};

// Check if a user is logged in
function isUserLoggedIn() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return currentUser !== null; // Returns true if a user is logged in, false otherwise
}

// Get the product ID from the URL and fetch product details
const productId = getQueryParam("id");
if (productId) {
  fetchProductDetails(productId);
} else {
  console.error("Product ID not found in the URL");
}
