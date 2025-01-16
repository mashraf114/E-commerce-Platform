document.querySelector("button").addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the form from submitting

  // Get values from the form
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const repassword = document.getElementById("repassword").value.trim();

  // Validation
  if (!name || !email || !password || !repassword) {
    alert("Please fill out all fields.");
    return;
  }

  if (password !== repassword) {
    alert("Passwords do not match.");
    return;
  }

  if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }

  // Prepare user data
  const user = {
    name: name,
    email: email,
    password: password, // In a real-world application, you'd hash the password
  };

  // Check if there's already a user with the same email in localStorage
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((user) => user.email === email)) {
    alert("Email is already registered!");
    return;
  }

  // Add new user to the localStorage
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Registration successful!");
  window.location.href = "login.html"; // Redirect to login page
});
