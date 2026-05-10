const products = [
  {
    name: "Shoes",
    price: 999,
    image: "https://picsum.photos/200?1"
  },
  {
    name: "Watch",
    price: 1499,
    image: "https://picsum.photos/200?2"
  },
  {
    name: "Bag",
    price: 799,
    image: "https://picsum.photos/200?3"
  },
  {
    name: "Headphones",
    price: 1999,
    image: "https://picsum.photos/200?4"
  }
];

const productsContainer =
  document.getElementById("productsContainer");

const searchInput =
  document.getElementById("searchInput");

const cartCount =
  document.getElementById("cartCount");

/* Local Storage Cart Count */
let count =
  localStorage.getItem("cartCount") || 0;

cartCount.textContent = count;

/* Display Products */
function displayProducts(items) {

  productsContainer.innerHTML = "";

  items.forEach((product) => {

    productsContainer.innerHTML += `

      <div class="product-card">

        <img src="${product.image}" />

        <h2>${product.name}</h2>

        <p>₹${product.price}</p>

        <button>Add to Cart</button>

      </div>

    `;

  });

  addCartFunctionality();

}

/* Search */
searchInput.addEventListener("keyup", () => {

  const value =
    searchInput.value.toLowerCase();

  const filtered = products.filter((product) => {

    return product.name
      .toLowerCase()
      .includes(value);

  });

  displayProducts(filtered);

});

/* Cart */
function addCartFunctionality() {

  const buttons =
    document.querySelectorAll("button");

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      count++;

      localStorage.setItem(
        "cartCount",
        count
      );

      cartCount.textContent = count;

    });

  });

}

displayProducts(products);