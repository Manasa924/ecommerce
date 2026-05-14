const cartItems =
  document.getElementById("cartItems");

const totalPrice =
  document.getElementById("totalPrice");

const checkoutForm =
  document.getElementById("checkoutForm");

/* =========================
   GET CART FROM STORAGE
========================= */

let cart =
  JSON.parse(localStorage.getItem("cart"))
  || [];

/* =========================
   UPDATE CART COUNT
========================= */

function updateCartCount() {

  let totalCount = 0;

  cart.forEach((item) => {

    totalCount += item.quantity;

  });

  localStorage.setItem(
    "cartCount",
    totalCount
  );

}

/* =========================
   DISPLAY CART
========================= */

function displayCart() {

  cartItems.innerHTML = "";

  let total = 0;

  /* EMPTY CART */

  if (cart.length === 0) {

    cartItems.innerHTML = `

      <h2 class="empty-cart">
        Your Cart Is Empty
      </h2>

    `;

    totalPrice.textContent =
      "Total: ₹0";

    return;

  }

  /* DISPLAY PRODUCTS */

  cart.forEach((item, index) => {

    /* TOTAL PRICE */

    total +=
      item.price * item.quantity;

    cartItems.innerHTML += `

      <div class="product-card">

        <!-- PRODUCT IMAGE -->

        <img
          src="${item.image}"
          alt="${item.name}"
        />

        <!-- PRODUCT NAME -->

        <h2>
          ${item.name}
        </h2>

        <!-- PRODUCT PRICE -->

        <p>
          Price: ₹${item.price}
        </p>

        <!-- PRODUCT QUANTITY -->

        <p>
          Quantity:
          ${item.quantity}
        </p>

        <!-- SUBTOTAL -->

        <p>
          Subtotal:
          ₹${item.price * item.quantity}
        </p>

        <!-- BUTTONS -->

        <div class="cart-buttons">

          <button
            onclick="increaseQuantity(${index})"
          >
            +
          </button>

          <button
            onclick="decreaseQuantity(${index})"
          >
            -
          </button>

          <button
            onclick="removeItem(${index})"
          >
            Remove
          </button>

        </div>

      </div>

    `;

  });

  /* SHOW TOTAL */

  totalPrice.textContent =
    "Total: ₹" + total;

}

/* =========================
   SAVE CART
========================= */

function saveCart() {

  localStorage.setItem(
    "cart",
    JSON.stringify(cart)
  );

  updateCartCount();

  displayCart();

}

/* =========================
   INCREASE QUANTITY
========================= */

function increaseQuantity(index) {

  cart[index].quantity++;

  saveCart();

}

/* =========================
   DECREASE QUANTITY
========================= */

function decreaseQuantity(index) {

  if (cart[index].quantity > 1) {

    cart[index].quantity--;

  }

  else {

    cart.splice(index, 1);

  }

  saveCart();

}

/* =========================
   REMOVE ITEM
========================= */

function removeItem(index) {

  cart.splice(index, 1);

  saveCart();

}

/* =========================
   CHECKOUT FORM
========================= */

checkoutForm.addEventListener(
  "submit",
  (e) => {

    e.preventDefault();

    const name =
      document.getElementById("name").value;

    const address =
      document.getElementById("address").value;

    /* VALIDATION */

    if (
      name.trim() === "" ||
      address.trim() === ""
    ) {

      alert(
        "Please fill all fields"
      );

      return;

    }

    /* SUCCESS */

    alert(
      "Order Placed Successfully"
    );

    /* CLEAR STORAGE */

    localStorage.removeItem("cart");

    localStorage.removeItem("cartCount");

    /* RESET CART */

    cart = [];

    displayCart();

    checkoutForm.reset();

  }
);

/* =========================
   INITIAL DISPLAY
========================= */

updateCartCount();

displayCart();