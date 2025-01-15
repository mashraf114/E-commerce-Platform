// admin-dashboard.js

const apiUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
  // User Management
  const userTable = document
    .getElementById("user-table")
    .querySelector("tbody");
  const addUserButton = document.getElementById("add-user");

  const populateUserTable = (users) => {
    userTable.innerHTML = "";
    users.forEach((user) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>
                    <button class="edit-user" data-user-id="${user.id}">Edit</button>
                    <button class="delete-user" data-user-id="${user.id}">Delete</button>
                </td>
            `;
      userTable.appendChild(newRow);
    });
  };

  addUserButton.addEventListener("click", async () => {
    const userName = prompt("Enter user name:");
    const userEmail = prompt("Enter user email:");

    if (userName && userEmail) {
      const newUser = {
        id: String(Date.now()),
        name: userName,
        email: userEmail,
      };

      try {
        const response = await fetch(`${apiUrl}/users`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        });

        if (response.ok) {
          console.log("User added to the database.");
          fetchData(); // Refresh the table
        } else {
          console.error("Failed to add user to the database.");
        }
      } catch (error) {
        console.error("Error saving user to the database:", error);
      }
    }
  });

  userTable.addEventListener("click", async (event) => {
    if (event.target.matches(".edit-user")) {
      const userId = event.target.dataset.userId;
      const row = event.target.closest("tr");
      const nameCell = row.children[1];
      const emailCell = row.children[2];

      const newName = prompt("Edit user name:", nameCell.textContent);
      const newEmail = prompt("Edit user email:", emailCell.textContent);

      if (newName && newEmail) {
        try {
          const response = await fetch(`${apiUrl}/users/${String(userId)}`, {
            // Convert userId to string
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: userId,
              name: newName,
              email: newEmail,
            }),
          });

          if (response.ok) {
            console.log("User updated in the database.");
            fetchData(); // Refresh the table
          } else {
            console.error("Failed to update user in the database.");
          }
        } catch (error) {
          console.error("Error updating user in the database:", error);
        }
      }
    } else if (event.target.matches(".delete-user")) {
      const userId = event.target.dataset.userId;

      if (confirm("Are you sure you want to delete this user?")) {
        try {
          const response = await fetch(`${apiUrl}/users/${String(userId)}`, {
            method: "DELETE",
          });

          if (response.ok) {
            console.log("User deleted from the database.");
            fetchData(); // Refresh the table
          } else {
            console.error("Failed to delete user from the database.");
          }
        } catch (error) {
          console.error("Error deleting user from the database:", error);
        }
      }
    }
  });

  // Fetch and populate tables
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/users`);
      const users = await response.json();
      populateUserTable(users);
    } catch (error) {
      console.error("Error fetching data:", error);
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
