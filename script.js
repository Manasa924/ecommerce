const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", () => {

  const filter = searchInput.value.toLowerCase();

  const cards = document.querySelectorAll(".product-card");

  cards.forEach((card) => {

    const title = card.querySelector("h2").textContent.toLowerCase();

    if (title.includes(filter)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }

  });

});