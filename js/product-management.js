document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "http://localhost:3000";
  const productTable = document
    .getElementById("product-table")
    .querySelector("tbody");
  const addProductButton = document.getElementById("add-product");
  const modal = document.getElementById("product-form-modal");
  const productForm = document.getElementById("product-form");
  const closeFormButton = document.getElementById("close-form");
  const formTitle = document.getElementById("form-title");
  let editingProductId = null;

  // Populate the product table
  const populateProductTable = (products) => {
    productTable.innerHTML = "";
    products.forEach((product) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${product.id}</td>
        <td>${product.name}</td>
        <td>${product.price}</td>
      <td>${product.category.trim()}</td>
        <td>${product.sellerId}</td>
        <td>${product.status}</td>
        <td>
          <button class="edit-product" data-product-id="${
            product.id
          }">Edit</button>
          <button class="delete-product" data-product-id="${
            product.id
          }">Delete</button>
        </td>
      `;
      productTable.appendChild(newRow);
    });
  };

  // Show modal for adding a new product
  addProductButton.addEventListener("click", () => {
    editingProductId = null;
    formTitle.textContent = "Add Product";
    productForm.reset();
    modal.style.display = "block";
  });

  // Handle table actions (edit/delete)
  productTable.addEventListener("click", async (event) => {
    if (event.target.matches(".edit-product")) {
      const productId = event.target.dataset.productId;
      const response = await fetch(`${apiUrl}/products/${productId}`);
      const product = await response.json();

      editingProductId = productId;
      formTitle.textContent = "Edit Product";
      document.getElementById("product-name").value = product.name;
      document.getElementById("product-price").value = product.price;
      document.getElementById("product-category").value = product.category; // Ensure this is set

      document.getElementById("product-seller").value = product.sellerId;
      modal.style.display = "block";
    }

    if (event.target.matches(".delete-product")) {
      const productId = event.target.dataset.productId;

      if (confirm("Are you sure you want to delete this product?")) {
        try {
          const response = await fetch(`${apiUrl}/products/${productId}`, {
            method: "DELETE",
          });

          if (response.ok) {
            console.log("Product deleted.");
            fetchData(); // Refresh the table
          } else {
            console.error("Failed to delete product.");
          }
        } catch (error) {
          console.error("Error deleting product:", error);
        }
      }
    }
  });

  // Handle form submission for both add and edit
  productForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const productName = document.getElementById("product-name").value;
    const productPrice = parseFloat(
      document.getElementById("product-price").value
    );
    const productCategory = document
      .getElementById("product-category")
      .value.trim() // Trim the category
      .replace(/\n/g, ""); // Remove newline characters
    const productSeller = document.getElementById("product-seller").value;

    const productStatus = document.getElementById("product-status").value;
    // Get selected status

    const product = {
      id: editingProductId || String(Date.now()),
      name: productName,
      price: productPrice,
      category: productCategory,
      sellerId: productSeller,
      status: productStatus, // Include status in the product object
    };

    const method = editingProductId ? "PUT" : "POST";
    const url = editingProductId
      ? `${apiUrl}/products/${editingProductId}`
      : `${apiUrl}/products`;

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log("Product saved successfully.");
        fetchData(); // Refresh the table
        modal.style.display = "none"; // Close the form
      } else {
        console.error("Failed to save product.");
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  });

  // Close the modal
  closeFormButton.addEventListener("click", () => {
    modal.style.display = "none";
  });

  // Fetch and populate products
  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/products`);
      const products = await response.json();
      populateProductTable(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchData();
});
