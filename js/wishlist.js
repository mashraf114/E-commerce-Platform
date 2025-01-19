// script.js

// Fetch products from db.json
async function fetchProducts() {
  const response = await fetch("db.json");
  const data = await response.json();
  return data.products;
}

// Display products on the page
function displayProducts(products) {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = ""; // Clear previous content

  products.forEach((product) => {
    const productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.innerHTML = `
      <h3>${product.name}</h3>
      <p>$${product.price}</p>
      <button onclick="addToWishlist('${product.id}')">Add to Wishlist</button>
    `;
    productsContainer.appendChild(productDiv);
  });
}

// Add product to wishlist
function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert("Product added to wishlist!");
    displayWishlist();
  } else {
    alert("Product is already in your wishlist!");
  }
}

// Remove product from wishlist
function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((id) => id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  displayWishlist();
}

// Display wishlist on the page
async function displayWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const products = await fetchProducts();
  const wishlistItems = document.getElementById("wishlist-items");
  wishlistItems.innerHTML = ""; // Clear previous content

  wishlist.forEach((productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      const li = document.createElement("li");
      li.innerHTML = `
        ${product.name} - $${product.price}
        <button class="remove" onclick="removeFromWishlist('${productId}')">Remove</button>
      `;
      wishlistItems.appendChild(li);
    }
  });
}

// Initialize the page
async function init() {
  const products = await fetchProducts();
  displayProducts(products);
  displayWishlist();
}

// Run the init function when the page loads
window.onload = init;
