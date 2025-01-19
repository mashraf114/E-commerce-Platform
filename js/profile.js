// profile.js

// Function to fetch user data from db.json
async function fetchUserData() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("You are not logged in. Redirecting to the home page...");
    window.location.href = "/index.html";
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/users");
    const users = await response.json();
    const user = users.find((u) => u.id === currentUser.id);

    if (user) {
      // Update personal information
      document.getElementById("profile-name").textContent =
        user.name || "Not provided";
      document.getElementById("profile-email").textContent =
        user.email || "Not provided";
      document.getElementById("profile-phone").textContent =
        user.phone || "Not provided";

      // Update order history
      displayOrderHistory();

      // Update addresses
      displayAddresses(user);
    } else {
      alert("User not found. Redirecting to the home page...");
      window.location.href = "/index.html";
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    alert("An error occurred while fetching user data. Please try again.");
  }
}

// Function to display order history from localStorage
function displayOrderHistory() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const orderHistory = document.getElementById("order-history");

  if (orders.length === 0) {
    orderHistory.innerHTML = "<li>No orders found.</li>";
    return;
  }

  orderHistory.innerHTML = orders
    .map(
      (order) => `
      <li>
        <i class="fas fa-box"></i>
        <strong>Order Total: $${order.total}</strong> - ${order.date}
        <br>
        <small>Payment Method: ${order.paymentMethod}</small>
      </li>
    `
    )
    .join("");
}

// Function to display addresses
function displayAddresses(user) {
  const addresses = document.getElementById("profile-addresses");
  const homeAddress = user.homeAddress || "Not provided";
  const workAddress = user.workAddress || "Not provided";

  addresses.innerHTML = `
    <li>
      <i class="fas fa-home"></i>
      <strong>Home Address:</strong> ${homeAddress}
    </li>
    <li>
      <i class="fas fa-building"></i>
      <strong>Work Address:</strong> ${workAddress}
    </li>
  `;
}

// Function to open the "Edit Information" popup
function openEditInformationPopup() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("You are not logged in. Redirecting to the home page...");
    window.location.href = "/index.html";
    return;
  }

  fetch(`http://localhost:3000/users/${currentUser.id}`)
    .then((response) => response.json())
    .then((user) => {
      Swal.fire({
        title: "Edit Information",
        html: `
          <input type="text" id="name" class="swal2-input" placeholder="Name" value="${
            user.name || ""
          }">
          <input type="email" id="email" class="swal2-input" placeholder="Email" value="${
            user.email || ""
          }">
          <input type="text" id="phone" class="swal2-input" placeholder="Phone" value="${
            user.phone || ""
          }">
          <input type="password" id="password" class="swal2-input" placeholder="Password" value="${
            user.password || ""
          }">
          <input type="text" id="role" class="swal2-input" placeholder="Role" value="${
            user.role || ""
          }">
        `,
        focusConfirm: false,
        preConfirm: () => {
          return {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            password: document.getElementById("password").value,
            role: document.getElementById("role").value,
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedUser = { ...user, ...result.value };
          updateUserData(updatedUser);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data. Please try again.");
    });
}

// Function to update user data in db.json
function updateUserData(updatedUser) {
  fetch(`http://localhost:3000/users/${updatedUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  })
    .then((response) => response.json())
    .then(() => {
      Swal.fire("Success!", "Your information has been updated.", "success");
      fetchUserData(); // Refresh the profile data
    })
    .catch((error) => {
      console.error("Error updating user data:", error);
      Swal.fire(
        "Error",
        "An error occurred while updating your information.",
        "error"
      );
    });
}

// Function to open the "Manage Addresses" popup
function openManageAddressesPopup() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("You are not logged in. Redirecting to the home page...");
    window.location.href = "/index.html";
    return;
  }

  fetch(`http://localhost:3000/users/${currentUser.id}`)
    .then((response) => response.json())
    .then((user) => {
      Swal.fire({
        title: "Manage Addresses",
        html: `
          <input type="text" id="homeAddress" class="swal2-input" placeholder="Home Address" value="${
            user.homeAddress || ""
          }">
          <input type="text" id="workAddress" class="swal2-input" placeholder="Work Address" value="${
            user.workAddress || ""
          }">
          <br>
          <label>
            <input type="radio" name="defaultAddress" value="home" ${
              !user.defaultAddress || user.defaultAddress === "home"
                ? "checked"
                : ""
            }> Home Address
          </label>
          <label>
            <input type="radio" name="defaultAddress" value="work" ${
              user.defaultAddress === "work" ? "checked" : ""
            }> Work Address
          </label>
        `,
        focusConfirm: false,
        preConfirm: () => {
          return {
            homeAddress: document.getElementById("homeAddress").value,
            workAddress: document.getElementById("workAddress").value,
            defaultAddress: document.querySelector(
              'input[name="defaultAddress"]:checked'
            ).value,
          };
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedUser = { ...user, ...result.value };
          updateUserData(updatedUser);
        }
      });
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
      alert("An error occurred while fetching user data. Please try again.");
    });
}

// Function to confirm logout
function confirmLogout() {
  const confirmation = confirm("Are you sure you want to log out?");
  if (confirmation) {
    logout(); // Call the logout function if the user confirms
  }
}

// Log out function to remove the session data and redirect to home page
function logout() {
  sessionStorage.removeItem("currentUser"); // Remove the logged-in user from sessionStorage
  window.location.replace("/index.html"); // Redirect to home page
}

// Call fetchUserData when the page loads
fetchUserData();

// Add event listeners for "Edit Information" and "Manage Addresses" links
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('a[href="#"]').addEventListener("click", (e) => {
    e.preventDefault();
    openEditInformationPopup();
  });

  document
    .querySelector('a[href="#manage-addresses"]')
    .addEventListener("click", (e) => {
      e.preventDefault();
      openManageAddressesPopup();
    });
});
