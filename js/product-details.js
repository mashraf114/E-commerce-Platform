function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const fetchProductDetails = async (productId) => {
  try {
    const response = await fetch(`http://localhost:3000/products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const product = await response.json();
    renderProductDetails(product);
  } catch (error) {
    console.error("Error fetching product details:", error);
  }
};

const renderProductDetails = (product) => {
  const title = document.querySelector(".title");
  const rating = document.querySelector(".rating");
  const price = document.querySelector(".price");
  const oldPrice = document.querySelector(".old-price");
  const featuresList = document.querySelector(".features");
  const image = document.querySelector(".left-section img");

  document.title = product.name;
  title.textContent = product.name;

  if (product.ratings && product.ratings.length > 0) {
    rating.textContent = `4.0 ⭐⭐⭐⭐ | ${product.ratings.length.toLocaleString()} ratings`;
  } else {
    rating.textContent = "Be the first to rate";
  }

  price.innerHTML = `EGP ${product.price.toLocaleString()}`;
  oldPrice.innerHTML = `EGP ${product.price * 2}`;

  featuresList.innerHTML = "";
  const description = product.description || "No description available.";
  description.split("\n").forEach((feature) => {
    const li = document.createElement("li");
    li.textContent = feature;
    featuresList.appendChild(li);
  });

  image.src = product.image || "/assets/default-image.jpg";

  const addToCartButton = document.querySelector(".add-to-cart");
  if (addToCartButton) {
    addToCartButton.addEventListener("click", () => {
      if (!isUserLoggedIn()) {
        window.location.href = "/views/login.html";
        return;
      }

      const productToAdd = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item.id === productToAdd.id);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(productToAdd);
      }

      localStorage.setItem("cart", JSON.stringify(cart));

      Swal.fire({
        title: "Success!",
        text: `${productToAdd.name} added to cart!`,
        icon: "success",
        confirmButtonText: "OK",
      });
    });
  }

  const buyButton = document.querySelector(".buy");
  if (buyButton) {
    buyButton.addEventListener("click", () => {
      if (!isUserLoggedIn()) {
        window.location.href = "/views/login.html";
        return;
      }

      window.location.href = "/views/checkout.html";
    });
  }
};

function isUserLoggedIn() {
  const currentUser = JSON.parse(sessionStorage.getItem("currentUser"));
  return currentUser !== null;
}

const productId = getQueryParam("id");
if (productId) {
  fetchProductDetails(productId);
} else {
  console.error("Product ID not found in the URL");
}
