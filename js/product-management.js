// document.addEventListener("DOMContentLoaded", () => {
//   const apiUrl = "http://localhost:3000";
//   const productTable = document
//     .getElementById("product-table")
//     .querySelector("tbody");
//   const addproductButton = document.getElementById("add-product");
//   const modal = document.getElementById("product-form-modal");
//   const productForm = document.getElementById("product-form");
//   const closeFormButton = document.getElementById("close-form");
//   const formTitle = document.getElementById("form-title");
//   let editingproductId = null;

//   const populateproductTable = (products) => {
//     productTable.innerHTML = "";
//     products.forEach((product) => {
//       const newRow = document.createElement("tr");
//       newRow.innerHTML = `
//         <td>${product.id}</td>
//         <td>${product.name}</td>
//         <td>${product.email}</td>
//         <td>${product.role}</td>
//         <td>${product.password}</td>
//         <td>
//           <button class="edit-product" data-product-id="${product.id}">Edit</button>
//           <button class="delete-product" data-product-id="${product.id}">Delete</button>
//         </td>
//       `;
//       productTable.appendChild(newRow);
//     });
//   };

//   // Show modal for adding new product
//   addproductButton.addEventListener("click", () => {
//     editingproductId = null;
//     formTitle.textContent = "Add product";
//     productForm.reset();
//     modal.style.display = "block";
//   });

//   productTable.addEventListener("click", async (event) => {
//     if (event.target.matches(".edit-product")) {
//       const productId = event.target.dataset.productId;
//       const row = event.target.closest("tr");
//       const nameCell = row.children[1];
//       const emailCell = row.children[2];
//       const roleCell = row.children[3];
//       const passwordCell = row.children[4];

//       editingproductId = productId;
//       formTitle.textContent = "Edit product";
//       document.getElementById("product-name").value = nameCell.textContent;
//       document.getElementById("product-email").value = emailCell.textContent;
//       document.getElementById("product-role").value = roleCell.textContent;
//       document.getElementById("product-password").value =
//         passwordCell.textContent;
//       modal.style.display = "block";
//     }

//     // Delete product when delete button is clicked
//     if (event.target.matches(".delete-product")) {
//       const productId = event.target.dataset.productId;
//       const row = event.target.closest("tr");

//       if (confirm("Are you sure you want to delete this product?")) {
//         try {
//           const response = await fetch(`${apiUrl}/products/${productId}`, {
//             method: "DELETE",
//           });

//           if (response.ok) {
//             console.log("product deleted.");
//             row.remove(); // Remove the row from the table
//           } else {
//             console.error("Failed to delete product.");
//           }
//         } catch (error) {
//           console.error("Error deleting product:", error);
//         }
//       }
//     }
//   });

//   // Handle form submission for both add and edit
//   productForm.addEventListener("submit", async (event) => {
//     event.preventDefault();

//     const productName = document.getElementById("product-name").value;
//     const productEmail = document.getElementById("product-email").value;
//     const productRole = document.getElementById("product-role").value;
//     const productPassword = document.getElementById("product-password").value;

//     const product = {
//       id: editingproductId || String(Date.now()),
//       name: productName,
//       email: productEmail,
//       role: productRole,
//       password: productPassword,
//     };

//     const method = editingproductId ? "PUT" : "POST";
//     const url = editingproductId
//       ? `${apiUrl}/products/${editingproductId}`
//       : `${apiUrl}/products`;

//     try {
//       const response = await fetch(url, {
//         method: method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(product),
//       });

//       if (response.ok) {
//         console.log("product saved successfully.");
//         fetchData(); // Refresh the table
//         modal.style.display = "none"; // Close the form
//       } else {
//         console.error("Failed to save product.");
//       }
//     } catch (error) {
//       console.error("Error saving product:", error);
//     }
//   });

//   // Close the modal
//   closeFormButton.addEventListener("click", () => {
//     modal.style.display = "none";
//   });

//   // Fetch and populate products
//   const fetchData = async () => {
//     try {
//       const response = await fetch(`${apiUrl}/products`);
//       const products = await response.json();
//       populateproductTable(products);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   fetchData();
// });

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
        <td>${product.category}</td>
        <td>${product.sellerId}</td>
        <td>${product.status}</td>
        <td>
          <button class="edit-product" data-product-id="${product.id}">Edit</button>
          <button class="delete-product" data-product-id="${product.id}">Delete</button>
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
      document.getElementById("product-category").value = product.category;
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
    const productCategory = document.getElementById("product-category").value;
    const productSeller = document.getElementById("product-seller").value;
    const productStatus = document.getElementById("product-status").value; // Get selected status

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
