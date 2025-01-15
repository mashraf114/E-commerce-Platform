const bcrypt = require("bcrypt");
const fs = require("fs");
const dbFile = "./db.json"; // Path to your db.json file

// Middleware to hash password during registration
function hashPasswordMiddleware(req, res, next) {
  if (req.method === "POST" && req.path === "/users") {
    const password = req.body.password;

    // Hash the password
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return res.status(500).send("Error hashing password.");
      }

      // Replace plain password with hashed password
      req.body.password = hashedPassword;
      next();
    });
  } else {
    next();
  }
}

module.exports = hashPasswordMiddleware;
