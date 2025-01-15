document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000";
  const orderTable = document
    .getElementById("order-table")
    .querySelector("tbody");
  const addOrderButton = document.getElementById("add-order");
  const modal = document.getElementById("order-form-modal");
  const orderForm = document.getElementById("order-form");
  const closeFormButton = document.getElementById("close-form");
  const formTitle = document.getElementById("form-title");
  let editingOrderId = null;

  // Populate the order table
  const populateOrderTable = (orders) => {
    orderTable.innerHTML = "";
    orders.forEach((order) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
       <td>${order.id}</td>
        <td>${order.product}</td>
        <td>${order.quantity}</td>
        <td>${order.totalCost}</td>
        <td>${order.status}</td>
        <td>${order.sellerId}</td>
        <td>${order.customerId}</td>
        <td>
          <button class="edit-order" data-order-id="${order.id}">Edit</button>
          <button class="delete-order" data-order-id="${order.id}">Delete</button>
        </td>
      `;
      orderTable.appendChild(newRow);
    });
  };

  // Show modal for adding a new order
  addOrderButton.addEventListener("click", () => {
    editingOrderId = null;
    formTitle.textContent = "Add Order";
    orderForm.reset();
    modal.style.display = "block";
  });

  // Handle table actions (edit/delete)
  orderTable.addEventListener("click", async (event) => {
    if (event.target.matches(".edit-order")) {
      const orderId = event.target.dataset.orderId;
      const response = await fetch(`${apiUrl}/orders/${orderId}`);
      const order = await response.json();

      editingOrderId = orderId;
      formTitle.textContent = "Edit Order";
      document.getElementById("order-product").value = order.product;
      document.getElementById("order-quantity").value = order.quantity;
      document.getElementById("order-status").value = order.status;
      document.getElementById("order-seller").value = order.sellerId;
      document.getElementById("order-customer").value = order.customerId;
      document.getElementById("order-totalCost").value = order.totalCost;
      modal.style.display = "block";
    }

    if (event.target.matches(".delete-order")) {
      const orderId = event.target.dataset.orderId;

      if (confirm("Are you sure you want to delete this order?")) {
        try {
          const response = await fetch(`${apiUrl}/orders/${orderId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            console.log("Order deleted.");
            fetchData(); // Refresh the table
          } else {
            console.error("Failed to delete order.");
          }
        } catch (error) {
          console.error("Error deleting order:", error);
        }
      }
    }
  });

  // Handle form submission for both add and edit
  orderForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const orderProduct = document.getElementById("order-product").value;
    const orderQuantity = parseInt(
      document.getElementById("order-quantity").value
    );
    const orderStatus = document.getElementById("order-status").value;
    const orderSeller = document.getElementById("order-seller").value;
    const orderCustomer = document.getElementById("order-customer").value;
    const orderPricePerUnit = parseFloat(
      document.getElementById("order-price-per-unit").value
    );
    const totalCost = orderQuantity * orderPricePerUnit; // Calculate total cost

    const order = {
      id: editingOrderId || String(Date.now()),
      product: orderProduct,
      quantity: orderQuantity,
      totalCost: totalCost,
      status: orderStatus,
      sellerId: orderSeller,
      customerId: orderCustomer,
    };

    const method = editingOrderId ? "PUT" : "POST";
    const url = editingOrderId
      ? `${apiUrl}/orders/${editingOrderId}`
      : `${apiUrl}/orders`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });

      if (response.ok) {
        console.log("Order saved successfully.");
        fetchData(); // Refresh the table
        modal.style.display = "none"; // Close the form
      } else {
        console.error("Failed to save order.");
      }
    } catch (error) {
      console.error("Error saving order:", error);
    }
  });

  // Close the modal
  closeFormButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fetch and populate orders
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/orders`);
      const orders = await response.json();
      populateOrderTable(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  fetchData();
});
