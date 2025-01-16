// Function to render the cart
const renderCart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-container");

  // Clear the cart container before rendering
  cartContainer.innerHTML = "";

  // Check if the cart is empty
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  // Render each cart item
  cartItems.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <h3>${item.name}</h3>
        <p>Price: EGP ${item.price}</p>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);
  document.querySelector(
    ".total-price"
  ).textContent = `Total Price: EGP ${totalPrice}`;
};

// Call renderCart when the cart page is loaded
document.addEventListener("DOMContentLoaded", renderCart);
