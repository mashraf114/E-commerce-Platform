// Function to render the cart
const renderCart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-container");

  // Clear the cart container before rendering
  cartContainer.innerHTML = "";

  // Check if the cart is empty
  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".total-price").textContent = "";
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
        <div class="quantity-control">
          <button onclick="changeQuantity(${index}, -1)">-</button>
          <span>${item.quantity}</span>
          <button onclick="changeQuantity(${index}, 1)">+</button>
        </div>
        <div class="actions">
          <button onclick="deleteItem(${index})">Delete</button>
        </div>
      </div>
    `;
    cartContainer.appendChild(cartItem);
  });

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  document.querySelector(".total-price").textContent = `Subtotal (${
    cartItems.length
  } item${cartItems.length > 1 ? "s" : ""}): EGP ${totalPrice}`;
};

// Function to change the quantity of an item
const changeQuantity = (index, change) => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems[index].quantity += change;
  if (cartItems[index].quantity < 1) {
    cartItems[index].quantity = 1;
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
};

// Function to delete an item from the cart
const deleteItem = (index) => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
};

// Function to proceed to checkout
const proceedToCheckout = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
  } else {
    // Redirect to the checkout page
    window.location.href = "/views/checkout.html";
  }
};

// Add event listener to the "Proceed to Buy" button
document
  .querySelector(".proceed-to-buy")
  .addEventListener("click", proceedToCheckout);

// Call renderCart when the cart page is loaded
document.addEventListener("DOMContentLoaded", renderCart);
