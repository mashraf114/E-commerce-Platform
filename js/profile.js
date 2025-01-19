async function fetchUserData() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  console.log("Current User from sessionStorage:", currentUser); // Debugging

  if (!currentUser) {
    alert("You are not logged in. Redirecting to the home page...");
    window.location.href = "/index.html";
    return;
  }

  try {
    console.log("Fetching user data from backend..."); // Debugging
    const response = await fetch("http://localhost:3000/users");

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const users = await response.json();
    console.log("Fetched Users:", users); // Debugging

    // Find the current user in the fetched data
    const user = users.find((u) => u.id === currentUser.id);
    console.log("Fetched User Data:", user); // Debugging

    if (user) {
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

      // Render admin navigation based on role
      renderAdminNavigation(user.role);
    } else {
      alert("User not found. Redirecting to the home page...");
      window.location.href = "/index.html";
    }
  } catch (error) {
    console.error("Error fetching user data:", error); // Debugging
    alert("An error occurred while fetching user data. Please try again.");
  }
}

function renderAdminNavigation(role) {
  const adminNavPlaceholder = document.getElementById("admin-nav-placeholder");

  // Define navigation items based on role
  const navItems = [];
  if (role === "Admin" || role === "admin") {
    navItems.push(
      {
        href: "/views/user-management.html",
        icon: "fa-users",
        text: "Users",
      },
      {
        href: "/views/product-management.html",
        icon: "fa-box",
        text: "Products",
      },
      {
        href: "/views/order-management.html",
        icon: "fa-shopping-cart",
        text: "Orders",
      }
    );
  } else if (role === "Seller" || role === "seller") {
    navItems.push(
      {
        href: "/views/product-management.html",
        icon: "fa-box",
        text: "Products",
      },
      {
        href: "/views/order-management.html",
        icon: "fa-shopping-cart",
        text: "Orders",
      }
    );
  } else if (role === "Customer" || role === "customer") {
    navItems.push({
      href: "/views/order-management.html",
      icon: "fa-shopping-cart",
      text: "Orders",
    });
  }

  // Create the admin navigation HTML
  if (navItems.length > 0) {
    const navHTML = `
      <nav class="admin-nav">
        <h3>Dashboard</h3>
        <ul>
          ${navItems
            .map(
              (item) => `
            <li>
              <a href="${item.href}">
                <i class="fas ${item.icon}"></i>
                ${item.text}
              </a>
            </li>
          `
            )
            .join("")}
        </ul>
      </nav>
    `;
    adminNavPlaceholder.innerHTML = navHTML;
  }
}
// Function to display order history from db.json
async function displayOrderHistory() {
  const orderHistory = document.getElementById("order-history");

  try {
    // Fetch orders from the backend
    const response = await fetch("http://localhost:3000/orders");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const orders = await response.json();
    console.log("Fetched Orders:", orders); // Debugging

    // Filter orders for the current user (if not an admin)
    const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
    const isAdmin =
      currentUser &&
      (currentUser.role === "Admin" || currentUser.role === "admin");

    const userOrders = isAdmin
      ? orders // Admins can see all orders
      : orders.filter((order) => order.customerId === currentUser.id); // Customers see only their orders

    if (userOrders.length === 0) {
      orderHistory.innerHTML = "<li>No orders found.</li>";
      return;
    }

    // Render the orders
    orderHistory.innerHTML = userOrders
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
  } catch (error) {
    console.error("Error fetching order history:", error); // Debugging
    orderHistory.innerHTML =
      "<li>Error loading order history. Please try again later.</li>";
  }
}
// Function to display order history from localStorage
// function displayOrderHistory() {
//   const orders = JSON.parse(localStorage.getItem("orders")) || [];
//   const orderHistory = document.getElementById("order-history");

//   if (orders.length === 0) {
//     orderHistory.innerHTML = "<li>No orders found.</li>";
//     return;
//   }

//   orderHistory.innerHTML = orders
//     .map(
//       (order) => `
//       <li>
//         <i class="fas fa-box"></i>
//         <strong>Order Total: $${order.total}</strong> - ${order.date}
//         <br>
//         <small>Payment Method: ${order.paymentMethod}</small>
//       </li>
//     `
//     )
//     .join("");
// }

// Function to display addresses
function displayAddresses(user) {
  const addresses = document.getElementById("profile-addresses");
  if (addresses) {
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
  } else {
    console.error("Element with ID 'profile-addresses' not found.");
  }
}

// Call fetchUserData when the page loads
fetchUserData();

// Function to confirm logout using SweetAlert2
function confirmLogout() {
  Swal.fire({
    title: "Are you sure?",
    text: "You will be logged out of your account.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#ffa41c",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, log out!",
    cancelButtonText: "Cancel",
  }).then((result) => {
    if (result.isConfirmed) {
      logout(); // Call the logout function if the user confirms
    }
  });
}

// Log out function to remove the session data and redirect to home page
function logout() {
  sessionStorage.removeItem("currentUser"); // Remove the logged-in user from sessionStorage
  Swal.fire({
    title: "Logged Out!",
    text: "You have been successfully logged out.",
    icon: "success",
    confirmButtonColor: "#ffa41c",
  }).then(() => {
    window.location.href = "/index.html"; // Redirect to home page
  });
}
