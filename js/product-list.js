const shopSection = document.querySelector(".shop-section");

// Function to get query parameters from the URL
function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Function to fetch products from the API
const fetchProducts = async () => {
  try {
    const response = await fetch("http://localhost:3000/products");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const products = await response.json();
    const category = getQueryParam("category");

    // Filter products by category and status
    const filteredProducts = category
      ? products.filter(
          (product) =>
            product.category === category && product.status === "approved"
        )
      : products.filter((product) => product.status === "approved");

    renderProducts(filteredProducts);
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Function to render products
const renderProducts = (products) => {
  shopSection.innerHTML = ""; // Clear existing content
  products.forEach((product) => {
    // Handle missing or undefined values
    const name = product.name || "Unnamed Product";
    const description = product.description || "No description available.";
    const image = product.image || "/assets/default-image.jpg";
    const price =
      product.price !== undefined ? `$${product.price}` : "Price not available";
    const ratingMessage = product.ratings?.length
      ? `⭐⭐⭐⭐ | ${product.ratings.length} ratings`
      : "Be the first to rate";

    // Create product card
    const productCard = `
      <div class="box box${product.id}" data-id="${product.id}">
        <div class="box-content">
          <h2>${name}</h2>
          <div
            class="box-img"
            style="background-image: url('${image}')"
          ></div>
          <p>${ratingMessage}</p>
          <p>${price}</p>
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
      event.stopPropagation(); // Prevent event bubbling
      event.preventDefault(); // Prevent default behavior
      const productId = box.getAttribute("data-id");
      console.log("Product ID:", productId); // Debugging: Log the product ID
      const newUrl = `/views/product-details.html?id=${productId}`;
      console.log("Redirecting to:", newUrl); // Debugging: Log the new URL
      window.location.href = newUrl;
    });
  });
};

// Call the fetch function on page load
fetchProducts();
