// Function to fetch product details based on product ID
const fetchProductDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search); // Get the query parameters
  const productId = urlParams.get("id"); // Retrieve the product ID from the query parameter

  try {
    // Fetch product data from the API using the product ID
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const product = await response.json();
    renderProductDetails(product); // Call the function to render product details
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

// Function to render the product details on the page
const renderProductDetails = (product) => {
  const title = document.querySelector(".title");
  const rating = document.querySelector(".rating");
  const price = document.querySelector(".price");
  const oldPrice = document.querySelector(".old-price");
  const featuresList = document.querySelector(".features");
  const image = document.querySelector(".left-section img");

  // Set the title and other details from the fetched product data
  title.textContent = product.name;
  rating.textContent = `4.0 ⭐⭐⭐⭐ | ${product.ratings.length} ratings`; // Assuming ratings will be displayed dynamically
  price.innerHTML = `EGP ${product.price.toLocaleString()}`; // Price format
  oldPrice.innerHTML = `EGP ${product.price * 2}`; // Example of old price, adjust based on actual data if needed

  // Render features
  featuresList.innerHTML = ""; // Clear existing features
  product.description.split("\n").forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  // Set product image
  image.src = product.image;

  // Add event listeners for buttons
  // Add event listener for 'Add to Cart' button
  document.querySelector(".add-to-cart").addEventListener("click", () => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1, // Default quantity is 1
      image: product.image,
    };

    // Get existing cart from localStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const existingProduct = cart.find((item) => item.id === productToAdd.id);
    if (existingProduct) {
      existingProduct.quantity += 1; // Increase quantity if product already in cart
    } else {
      cart.push(productToAdd); // Add product to the cart
    }

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Optionally, you can display a confirmation message
    alert(`${productToAdd.name} added to cart!`);
  });

  // Add event listener for 'Buy Now' button (you can link it to a checkout page or payment process)
  document.querySelector(".buy").addEventListener("click", () => {
    alert("Proceed to buy");
  });
};

// Call the function to fetch and render product details on page load
fetchProductDetails();
