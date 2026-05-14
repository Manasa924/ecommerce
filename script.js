const products = [
  {
    id: 1,
    name: "Running Shoes",
    price: 999,
    category: "Fashion",
    image: "https://picsum.photos/200?1",
    description: "Comfortable running shoes"
  },

  {
    id: 2,
    name: "Smart Watch",
    price: 2499,
    category: "Electronics",
    image: "https://picsum.photos/200?2",
    description: "Advanced smartwatch with fitness tracking"
  },

  {
    id: 3,
    name: "Laptop Bag",
    price: 799,
    category: "Fashion",
    image: "https://picsum.photos/200?3",
    description: "Stylish laptop bag for daily use"
  },

  {
    id: 4,
    name: "Headphones",
    price: 1999,
    category: "Electronics",
    image: "https://picsum.photos/200?4",
    description: "Wireless headphones with deep bass"
  }
];

/* =========================
   ELEMENTS
========================= */

const productsContainer =
  document.getElementById("productsContainer");

const searchInput =
  document.getElementById("searchInput");

const cartCount =
  document.getElementById("cartCount");

const modal =
  document.getElementById("modal");

const modalImage =
  document.getElementById("modalImage");

const modalTitle =
  document.getElementById("modalTitle");

const modalPrice =
  document.getElementById("modalPrice");

const modalDescription =
  document.getElementById("modalDescription");

const closeModal =
  document.getElementById("closeModal");

const toast =
  document.getElementById("toast");

const darkModeBtn =
  document.getElementById("darkModeBtn");

const sort =
  document.getElementById("sort");

const loader =
  document.getElementById("loader");

/* =========================
   CART
========================= */

let cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

let count = 0;

/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount() {

  let totalCount = 0;

  cart.forEach((item) => {

    totalCount += item.quantity;

  });

  count = totalCount;

  cartCount.textContent = count;

  localStorage.setItem(
    "cartCount",
    count
  );

}

/* =========================
   DISPLAY PRODUCTS
========================= */

function displayProducts(items) {

  productsContainer.innerHTML = "";

  items.forEach((product) => {

    productsContainer.innerHTML += `

      <div class="product-card">

        <img
          src="${product.image}"
          alt="${product.name}"
          onclick="openModalById(${product.id})"
        />

        <h2>${product.name}</h2>

        <p>₹${product.price}</p>

        <button data-id="${product.id}">
          Add To Cart
        </button>

      </div>

    `;

  });

  addCartFunctionality();

}

/* =========================
   SEARCH PRODUCTS
========================= */

searchInput.addEventListener("keyup", () => {

  const value =
    searchInput.value.toLowerCase();

  const filteredProducts =
    products.filter((product) => {

      return product.name
        .toLowerCase()
        .includes(value);

    });

  displayProducts(filteredProducts);

});

/* =========================
   ADD TO CART
========================= */

function addCartFunctionality() {

  const buttons =
    document.querySelectorAll(".product-card button");

  buttons.forEach((button) => {

    button.addEventListener("click", () => {

      const productId =
        Number(button.dataset.id);

      const product =
        products.find((item) => {

          return item.id === productId;

        });

      /* CHECK EXISTING PRODUCT */

      const existingProduct =
        cart.find((item) => {

          return item.id === product.id;

        });

      /* INCREASE QUANTITY */

      if (existingProduct) {

        existingProduct.quantity++;

      }

      /* ADD NEW PRODUCT */

      else {

        cart.push({

          ...product,

          quantity: 1

        });

      }

      /* SAVE CART */

      localStorage.setItem(
        "cart",
        JSON.stringify(cart)
      );

      /* UPDATE COUNT */

      updateCartCount();

      /* SHOW TOAST */

      showToast();

      console.log(cart);

    });

  });

}

/* =========================
   FILTER PRODUCTS
========================= */

function filterProducts(category) {

  if (category === "All") {

    displayProducts(products);

    return;

  }

  const filteredProducts =
    products.filter((product) => {

      return product.category === category;

    });

  displayProducts(filteredProducts);

}

/* =========================
   SORT PRODUCTS
========================= */

sort.addEventListener("change", () => {

  let sortedProducts = [...products];

  if (sort.value === "low") {

    sortedProducts.sort(
      (a, b) => a.price - b.price
    );

  }

  if (sort.value === "high") {

    sortedProducts.sort(
      (a, b) => b.price - a.price
    );

  }

  displayProducts(sortedProducts);

});

/* =========================
   OPEN MODAL
========================= */

function openModal(product) {

  modal.style.display = "flex";

  modalImage.src = product.image;

  modalTitle.textContent =
    product.name;

  modalPrice.textContent =
    "₹" + product.price;

  modalDescription.textContent =
    product.description;

}

/* =========================
   OPEN MODAL BY ID
========================= */

function openModalById(id) {

  const product =
    products.find((item) => {

      return item.id === id;

    });

  openModal(product);

}

/* =========================
   CLOSE MODAL
========================= */

closeModal.addEventListener("click", () => {

  modal.style.display = "none";

});

/* CLOSE MODAL WHEN CLICKING OUTSIDE */

window.addEventListener("click", (event) => {

  if (event.target === modal) {

    modal.style.display = "none";

  }

});

/* =========================
   TOAST NOTIFICATION
========================= */

function showToast() {

  toast.style.display = "block";

  toast.textContent =
    "Product Added To Cart";

  setTimeout(() => {

    toast.style.display = "none";

  }, 2000);

}

/* =========================
   DARK MODE
========================= */

darkModeBtn.addEventListener("click", () => {

  document.body.classList.toggle("dark");

});

/* =========================
   LOADER
========================= */

loader.style.display = "block";

setTimeout(() => {

  loader.style.display = "none";

  displayProducts(products);

}, 1000);

/* =========================
   INITIAL DISPLAY
========================= */

updateCartCount();