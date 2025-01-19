const renderCart = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.querySelector(".cart-container");

  cartContainer.innerHTML = "";

  if (cartItems.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".total-price").textContent = "";
    return;
  }

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

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  document.querySelector(".total-price").textContent = `Subtotal (${
    cartItems.length
  } item${cartItems.length > 1 ? "s" : ""}): EGP ${totalPrice}`;
};

const changeQuantity = (index, change) => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems[index].quantity += change;
  if (cartItems[index].quantity < 1) {
    cartItems[index].quantity = 1;
  }
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
};

const deleteItem = (index) => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
};

const proceedToCheckout = () => {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartItems.length === 0) {
    alert("Your cart is empty. Please add items to proceed.");
  } else {
    window.location.href = "/views/checkout.html";
  }
};

document
  .querySelector(".proceed-to-buy")
  .addEventListener("click", proceedToCheckout);

document.addEventListener("DOMContentLoaded", renderCart);
