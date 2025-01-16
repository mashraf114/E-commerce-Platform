document.addEventListener("DOMContentLoaded", () => {
  const addProductButton = document.getElementById("add-product-btn");
  const productForm = document.getElementById("product-form");
  const productFormElement = document.getElementById("product-form-element");
  const productsList = document.getElementById("products");

  // Base URL of JSON Server
  const baseURL = "http://localhost:3000/products";

  // Fetch and display products from db.json
  function fetchAndDisplayProducts() {
    fetch(baseURL)
      .then((response) => response.json())
      .then((products) => {
        displayProducts(products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  // // Display products in the list
  // function displayProducts(products) {
  //   productsList.innerHTML = ""; // Clear existing list
  //   products.forEach((product) => {
  //     const li = document.createElement("li");
  //     li.innerHTML = `
  //       <strong>${product.name}</strong> - $${product.price}<br>
  //       Category: ${product.category}<br>
  //       Description: ${product.description || "No description available"}<br>
  //       <img src="${product.image || ""}" alt="${product.name}" width="100"><br>
  //       Ratings: ${product.ratings ? product.ratings.length : 0}<br>
  //       <button data-id="${product.id}" class="delete-btn">Delete</button>
  //       <button data-id="${product.id}" class="edit-btn">Edit</button>
  //     `;

  //     // Add event listeners for delete and edit buttons
  //     li.querySelector(".delete-btn").addEventListener("click", () =>
  //       deleteProduct(product.id)
  //     );
  //     li.querySelector(".edit-btn").addEventListener("click", () =>
  //       editProduct(product)
  //     );
  //     productsList.appendChild(li);
  //   });
  // }

  // Display products in the table
  function displayProducts(products) {
    const tableBody = document.querySelector("#products tbody");
    tableBody.innerHTML = ""; // Clear existing rows

    products.forEach((product) => {
      const row = document.createElement("tr");
      row.innerHTML = `
      <td>${product.name}</td>
      <td>$${product.price}</td>
      <td>${product.category}</td>
      <td>${product.description || "No description available"}</td>
      <td><img src="${product.image || ""}" alt="${
        product.name
      }" width="50"></td>
      <td>${product.ratings ? product.ratings.length : 0}</td>
      <td>
        <button data-id="${product.id}" class="delete-btn">Delete</button>
        <button data-id="${product.id}" class="edit-btn">Edit</button>
      </td>
    `;

      // Add event listeners for delete and edit buttons
      const deleteButton = row.querySelector(".delete-btn");
      deleteButton.addEventListener("click", () => deleteProduct(product.id));

      const editButton = row.querySelector(".edit-btn");
      editButton.addEventListener("click", () => editProduct(product));

      tableBody.appendChild(row);
    });
  }

  // Add a new product
  function addProduct(newProduct) {
    fetch(baseURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then(() => {
        productForm.style.display = "none";
        productFormElement.reset();
        fetchAndDisplayProducts();
      })
      .catch((error) => console.error("Error adding product:", error));
  }

  // Delete a product
  function deleteProduct(id) {
    fetch(`${baseURL}/${id}`, { method: "DELETE" })
      .then(() => fetchAndDisplayProducts())
      .catch((error) => console.error("Error deleting product:", error));
  }

  // Edit a product
  function editProduct(product) {
    productForm.style.display = "block";
    productFormElement.reset();

    // Pre-fill form with product details
    document.getElementById("product-name").value = product.name;
    document.getElementById("product-price").value = product.price;
    document.getElementById("product-category").value = product.category;
    document.getElementById("product-description").value =
      product.description || "";
    document.getElementById("product-image").value = product.image;

    // Ensure a single 'onsubmit' handler
    productFormElement.onsubmit = (e) => {
      e.preventDefault();

      const updatedProduct = {
        ...product,
        name: document.getElementById("product-name").value,
        price: parseFloat(document.getElementById("product-price").value),
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        image: document.getElementById("product-image").value,
      };

      fetch(`${baseURL}/${product.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      })
        .then(() => {
          productForm.style.display = "none";
          productFormElement.reset();
          fetchAndDisplayProducts();
        })
        .catch((error) => console.error("Error updating product:", error));
    };
  }

  // Show form to add a new product
  addProductButton.addEventListener("click", () => {
    productForm.style.display = "block";
    productFormElement.reset();

    // Ensure a single 'onsubmit' handler for adding
    productFormElement.onsubmit = (e) => {
      e.preventDefault();

      const newProduct = {
        name: document.getElementById("product-name").value,
        price: parseFloat(document.getElementById("product-price").value),
        category: document.getElementById("product-category").value,
        description: document.getElementById("product-description").value,
        image: document.getElementById("product-image").value,
        ratings: [],
      };

      addProduct(newProduct);
    };
  });

  // Initial fetch of products
  fetchAndDisplayProducts();
});
