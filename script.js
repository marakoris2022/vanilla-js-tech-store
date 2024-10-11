// Our products Data
const products = [
  {
    name: "Canon EOS Camera",
    url: "./images/cannon_eos_camera.png",
    category: "cameras",
    price: 999.99,
  },
  {
    name: "Google Pixel",
    url: "./images/google_pixel.png",
    category: "smartphones",
    price: 799.99,
  },
  {
    name: "iPhone 14",
    url: "./images/iphone_14.png",
    category: "smartphones",
    price: 1099.99,
  },
  {
    name: "LG TV",
    url: "./images/lg_tv.png",
    category: "televisions",
    price: 749.99,
  },
  {
    name: "Nintendo Switch",
    url: "./images/nintendo_switch.png",
    category: "games",
    price: 299.99,
  },
  {
    name: "Sony Playstation 5",
    url: "./images/playstation_5.png",
    category: "games",
    price: 499.99,
  },
  {
    name: "Samsung Galaxy",
    url: "./images/samsung_galaxy.png",
    category: "smartphones",
    price: 999.99,
  },
  {
    name: "Samsung TV",
    url: "./images/samsung_tv.png",
    category: "televisions",
    price: 899.99,
  },
  {
    name: "Sony A7 Camera",
    url: "./images/sony_a7_camera.png",
    category: "cameras",
    price: 1599.99,
  },
  {
    name: "Sony ZV-1F Camera",
    url: "./images/sony_zv1f_camera.png",
    category: "cameras",
    price: 749.99,
  },
  {
    name: "Toshiba TV",
    url: "./images/toshiba_tv.png",
    category: "televisions",
    price: 599.99,
  },
  {
    name: "Xbox Series X",
    url: "./images/xbox_series_x.png",
    category: "games",
    price: 499.99,
  },
];

// Select DOM Elements
const productWrapper = document.getElementById("products-wrapper");
const checkBoxes = document.querySelectorAll(".check");
const filtersContainer = document.getElementById("filters-container");
const searchInput = document.getElementById("search");
const cartCount = document.getElementById("cart-count");

// Init cart item count
let cartItemCount = 0;

// Init product element array
const productsElements = [];

// Event Listeners for Filtering
filtersContainer.addEventListener("change", filterProducts);
searchInput.addEventListener("input", filterProducts);

// Loop over products and create an element
products.forEach((product) => {
  const productElement = createProductElement(product);
  productsElements.push(productElement);
  productWrapper.appendChild(productElement);
});

// Create product element
function createProductElement(product) {
  const productElement = document.createElement("div");
  productElement.className = "item space-y-2";
  productElement.innerHTML = `
      <div
          class="bg-gray-100 flex justify-center relative overflow-hidden group cursor-pointer border rounded-xl"
          >
          <img
              src="${product.url}"
              alt="${product.name}"
              class="w-full h-full object-cover"
          />
          <button
              class="status bg-black text-white absolute bottom-0 left-0 right-0 text-center py-2 translate-y-full transition group-hover:translate-y-0"
          >
              Add To Cart
          </button>
      </div>
      <p class="text-xl">${product.name}</p>
      <strong>$${product.price.toLocaleString()}</strong>
    `;

  productElement.querySelector(".status").addEventListener("click", updateCart);

  return productElement;
}

// Add or Remove item from Cart
function updateCart(e) {
  const statusEl = e.target;
  if (statusEl.classList.contains("added")) {
    // Remove from Cart
    statusEl.classList.remove("added");
    statusEl.innerText = "Add To Cart";
    statusEl.classList.add("bg-gray-800");
    statusEl.classList.remove("bg-red-600");

    cartItemCount--;
  } else {
    // Add to Cart
    statusEl.classList.add("added");
    statusEl.innerText = "Remove From Cart";
    statusEl.classList.remove("bg-gray-800");
    statusEl.classList.add("bg-red-600");

    cartItemCount++;
  }

  // Update cart item count
  cartCount.innerText = cartItemCount.toString();
}

// Filter products by CheckBoxes and SearchInput
function filterProducts() {
  // Get search term
  const searchTerm = searchInput.value.trim().toLowerCase();
  // Get checked Categories
  const checkedCategories = Array.from(checkBoxes)
    .filter((check) => check.checked)
    .map((check) => check.id);

  // Loop over Products and  check for matches
  productsElements.forEach((productElement, index) => {
    const product = products[index];

    // Check to see if product matches the search or the checked categories
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm);
    const isInCheckedCategories =
      checkedCategories.length === 0 ||
      checkedCategories.includes(product.category);

    // Show or hide product based on matches
    if (matchesSearchTerm && isInCheckedCategories) {
      productElement.classList.remove("hidden");
    } else {
      productElement.classList.add("hidden");
    }
  });
}
