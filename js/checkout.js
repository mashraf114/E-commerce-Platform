// Function to render the cart items on the checkout page
const renderCartItems = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");

  // Clear the cart items container before rendering
  cartItemsContainer.innerHTML = "";

  // Render each cart item
  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");
    cartItem.innerHTML = `
      <p>${item.name} - EGP ${item.price} x ${item.quantity}</p>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  totalPriceElement.textContent = `Total: EGP ${totalPrice}`;
};

// Function to handle the "Place Order" button
const placeOrder = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
    return;
  }

  const paymentMethod = document.querySelector(
    'input[name="payment-method"]:checked'
  ).value;

  // Get the current user
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));

  // Create an order object
  const order = {
    items: cartItems,
    total: cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    paymentMethod,
    date: new Date().toLocaleString(),
    customerId: currentUser ? currentUser.id : null, // Include the customer ID
  };

  // Save the order to localStorage (or send it to a backend API)
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  orders.push(order);
  localStorage.setItem("orders", JSON.stringify(orders));

  // Clear the cart
  localStorage.removeItem("cart");

  // Show a confirmation alert using SweetAlert
  Swal.fire({
    title: "Order Confirmed!",
    text: "Your order has been placed successfully.",
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    // Redirect to the home page or order confirmation page
    window.location.href = "/index.html";
  });
};

// Add event listener to the "Place Order" button
document
  .getElementById("place-order-button")
  .addEventListener("click", placeOrder);

// Call renderCartItems when the checkout page is loaded
document.addEventListener("DOMContentLoaded", renderCartItems);
