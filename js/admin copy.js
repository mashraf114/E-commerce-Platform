const apiUrl = "http://localhost:3000";

function fetchUsers() {
  fetch(`${apiUrl}/users`)
    .then((response) => response.json())
    .then((users) => {
      const userTable = document.querySelector("#user-table tbody");
      userTable.innerHTML = "";
      users.forEach((user) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${user.id}</td>
          <td>${user.username}</td>
          <td>${user.role}</td>
          <td>
            <button onclick="editUser(${user.id})">Edit</button>
            <button onclick="deleteUser(${user.id})">Delete</button>
          </td>
        `;
        userTable.appendChild(row);
      });
    });
}
document.addEventListener("DOMContentLoaded", () => {
  fetchUsers();
  document.getElementById("add-user-btn").addEventListener("click", addUser);
});

function addUser() {
  const username = prompt("Enter username:");
  const role = prompt("Enter role");
  const password = prompt("Enter password:");
  fetch(`${apiUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, role, password }),
  }).then(() => fetchUsers());
}
