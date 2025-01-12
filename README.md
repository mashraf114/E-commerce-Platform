# E-commerce Platform

## Project Overview
This project is a role-based E-commerce platform built with HTML, CSS, JavaScript, and a simulated backend using `db.json`. The platform supports four types of users:

- **Admin**: Manages users, products, and orders.
- **Customer**: Browses and purchases products, manages orders, and leaves reviews.
- **Seller**: Lists and manages products, and tracks orders.
- **Anonymous**: Explores the platform with limited access.

The platform is designed for scalability, security, and ease of use.

---

## Features
### Admin
- Manage users (add, edit, remove) and roles.
- Approve or reject products submitted by sellers.
- Monitor and manage all orders.

### Customer
- Register, log in, and manage profile details.
- Browse and filter products.
- Add products to the cart and proceed to checkout.
- View order history and leave reviews.

### Seller
- Add, edit, and delete products.
- View and update order statuses.
- Track sales and interact with customers.

### Anonymous User
- Browse and search for products.
- View product details (without buying or reviewing).

---

## Technology Stack
- **Frontend**: HTML5, CSS3, JavaScript (ES5, ES6+).
- **Backend**: Simulated REST API using `json-server` with `db.json`.
- **Version Control**: Git.

---

## Installation Guide
### Prerequisites
- Node.js installed on your machine.
- Git for version control.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/ecommerce-platform.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ecommerce-platform
   ```
3. Install `json-server` globally (if not already installed):
   ```bash
   npm install -g json-server
   ```
4. Start the backend server:
   ```bash
   json-server --watch db.json
   ```
5. Open the `index.html` file in your browser to access the frontend.

---

## Project Structure
```
ecommerce-platform/
├── assets/           # Images and icons
├── css/              # Stylesheets
├── js/               # JavaScript files
├── views/            # HTML files for different pages
├── db.json           # Database file
└── README.md         # Documentation
```

---

## Database Design
- **Users**:
  ```json
  {
    "id": 1,
    "username": "admin",
    "role": "Admin",
    "password": "admin123"
  }
  ```
- **Products**:
  ```json
  {
    "id": 101,
    "name": "Smartphone",
    "price": 699,
    "category": "Electronics",
    "sellerId": 2
  }
  ```
- **Orders**:
  ```json
  {
    "id": 201,
    "customerId": 3,
    "productId": 101,
    "status": "Delivered"
  }
  ```

---

## Development Workflow
1. Create a feature branch for any new features:
   ```bash
   git checkout -b feature-name
   ```
2. Commit changes frequently with clear messages:
   ```bash
   git commit -m "Add login functionality"
   ```
3. Push changes and create a pull request for code review.

---

## Testing
- **Unit Testing**: Test individual functions (e.g., adding products to the cart).
- **Integration Testing**: Ensure smooth interaction between the frontend and API.
- **User Acceptance Testing (UAT)**: Validate features meet user needs.

---

## Future Enhancements
- Integrate a payment gateway for secure transactions.
- Add real-time notifications for orders.
- Deploy the backend to a scalable cloud platform.

---

## Contributors
- Mohamed Ashraf (https://github.com/mohashraf148932e7) - Developer
