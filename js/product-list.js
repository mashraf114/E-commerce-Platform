// Select the container for the products
const shopSection = document.querySelector(".shop-section");

// Function to fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Function to render products
const renderProducts = (products) => {
  shopSection.innerHTML = ""; // Clear existing content
  products.forEach((product) => {
    const productCard = `
      <div class="box box${product.id}" data-id="${product.id}">
        <div class="box-content">
          <h2>${product.name}</h2>
          <div
            class="box-img"
            style="background-image: url('${product.image}')"
          ></div>
         
          <p>Price: $${product.price}</p>
  
          <p class="see-more">See More</p>
        </div>
      </div>
    `;
    shopSection.insertAdjacentHTML("beforeend", productCard);
  });

  // Add click event to each product box
  const productBoxes = document.querySelectorAll(".box");
  productBoxes.forEach((box) => {
    box.addEventListener("click", (event) => {
      const productId = box.getAttribute("data-id");
      // Redirect to product-details.html with product ID as a query parameter
      window.location.href = `product-details.html?id=${productId}`;
    });
  });
};

// Call the fetch function on page load
fetchProducts();
