// user-management.js

const apiUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000";
  const userTable = document
    .getElementById("user-table")
    .querySelector("tbody");
  const addUserButton = document.getElementById("add-user");
  const modal = document.getElementById("user-form-modal");
  const userForm = document.getElementById("user-form");
  const closeFormButton = document.getElementById("close-form");
  const formTitle = document.getElementById("form-title");
  let editingUserId = null;

  const populateUserTable = (users) => {
    userTable.innerHTML = "";
    users.forEach((user) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.role}</td>
        <td>
          <button class="edit-user" data-user-id="${user.id}">Edit</button>
          <button class="delete-user" data-user-id="${user.id}">Delete</button>
        </td>
      `;
      userTable.appendChild(newRow);
    });
  };

  // Show modal for adding new user
  addUserButton.addEventListener("click", () => {
    editingUserId = null;
    formTitle.textContent = "Add User";
    userForm.reset();
    modal.style.display = "block";
  });

  // Show modal for editing user
  userTable.addEventListener("click", (event) => {
    if (event.target.matches(".edit-user")) {
      const userId = event.target.dataset.userId;
      const row = event.target.closest("tr");
      const nameCell = row.children[1];
      const emailCell = row.children[2];
      const roleCell = row.children[3];
      const passwordCell = row.children[4];

      editingUserId = userId;
      formTitle.textContent = "Edit User";
      document.getElementById("user-name").value = nameCell.textContent;
      document.getElementById("user-email").value = emailCell.textContent;
      document.getElementById("user-role").value = roleCell.textContent;
      document.getElementById("user-password").value = passwordCell.textContent;
      modal.style.display = "block";
    }
  });

  // Handle form submission for both add and edit
  userForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const userName = document.getElementById("user-name").value;
    const userEmail = document.getElementById("user-email").value;
    const userRole = document.getElementById("user-role").value;
    const userPassword = document.getElementById("user-password").value;

    const user = {
      id: editingUserId || String(Date.now()),
      name: userName,
      email: userEmail,
      role: userRole,
      password: userPassword,
    };

    const method = editingUserId ? "PUT" : "POST";
    const url = editingUserId
      ? `${apiUrl}/users/${editingUserId}`
      : `${apiUrl}/users`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log("User saved successfully.");
        fetchData(); // Refresh the table
        modal.style.display = "none"; // Close the form
      } else {
        console.error("Failed to save user.");
      }
    } catch (error) {
      console.error("Error saving user:", error);
    }
  });

  // Close the modal
  closeFormButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fetch and populate users
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const users = await response.json();
      populateUserTable(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  fetchData();

  // Product Management
  const productTable = document
    .getElementById("product-table")
    .querySelector("tbody");

  productTable.addEventListener("click", (event) => {
    if (event.target.matches(".approve-product")) {
      // Logic to approve product
      console.log("Approve Product:", event.target.dataset.productId);
    } else if (event.target.matches(".reject-product")) {
      // Logic to reject product
      console.log("Reject Product:", event.target.dataset.productId);
    }
  });

  // Order Monitoring
  const orderTable = document
    .getElementById("order-table")
    .querySelector("tbody");

  orderTable.addEventListener("click", (event) => {
    if (event.target.matches(".update-order")) {
      // Logic to update order
      console.log("Update Order:", event.target.dataset.orderId);
    }
  });
});
