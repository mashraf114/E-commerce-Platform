const bcrypt = require("bcrypt");
const fs = require("fs");
const db = JSON.parse(fs.readFileSync("./db.json", "utf-8"));

function login(username, password) {
  const user = db.users.find((u) => u.username === username);

  if (!user) {
    console.log("User not found.");
    return false;
  }

  // Compare passwords
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      console.log("Login successful!");
    } else {
      console.log("Invalid password.");
    }
  });
}
