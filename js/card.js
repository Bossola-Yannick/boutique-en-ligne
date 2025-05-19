const cartItemsNumber = document.querySelector(".cart-number-items");
// créer la card du produit
const createCard = (
  category,
  image,
  id_product,
  name_product,
  price_ttc,
  price_discount,
  rating,
  boxToAppend
) => {
  const card = document.createElement("div");
  card.classList.add("card-box");
  card.setAttribute("value", name_product);

  const imgDiscount = document.createElement("img");
  imgDiscount.classList.add("card-img-discount");
  imgDiscount.setAttribute(
    "src",
    `/boutique-en-ligne/assets/images/icones/discount.png`
  );
  card.appendChild(imgDiscount);

  const divImg = document.createElement("div");
  divImg.classList.add("card-img-box");

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-product");
  if (category === "déguisement") {
    cardImage.setAttribute(
      "src",
      `/boutique-en-ligne/assets/images/cosplay/${image}`
    );
  } else {
    cardImage.setAttribute(
      "src",
      `/boutique-en-ligne/assets/images/accessories/${image}`
    );
  }

  divImg.appendChild(cardImage);
  card.appendChild(divImg);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("card-infos-box");
  infoDiv.innerHTML = `
            <div class="card-title">
              <h3>${name_product}</h3>
              <div class="card-rating">
                <p class="left-mar bold">${rating} / 5</p>
                <img src="/boutique-en-ligne/assets/images/icones/icon-rating.png"/>
              </div>
            </div>
          <div class="card-infos">
            <div class="card-price-box">
              <div class="card-default-box">
                <p class="card-price">${price_ttc}€</p>
              </div>
              <div class="card-discount-box">
                <div class="old-price">
                  <p class="card-strike-price">${price_ttc}€</p>
                </div>
                  <p class="card-price">${price_discount}€</p>
              </div>
            </div>
            <form id="cart" class="cart" method="post" action="/boutique-en-ligne/controller/CartController.php">
            <input type="hidden" name="price_product" id="price_product">
            <input type="hidden" name="product_id" value="${id_product}">
              <button type="submit" name="add-to-cart" class="card-button-add">
                <img src="/boutique-en-ligne/assets/images/icones/add.png"/>
              </button>
            </form>
          </div>
    `;

  const cardDefaultPriceBox = infoDiv.querySelector(".card-default-box");
  const cardDiscountPriceBox = infoDiv.querySelector(".card-discount-box");
  const cardButton = infoDiv.querySelector(".card-button-add");
  const hiddenPrice = infoDiv.querySelector("#price_product");

  if (price_discount < price_ttc) {
    hiddenPrice.setAttribute("value", price_discount);
    if (cardDefaultPriceBox) {
      cardDefaultPriceBox.style.display = "none";
    }
    if (cardDiscountPriceBox) {
      cardDiscountPriceBox.style.display = "flex";
      imgDiscount.style.display = "block";
      card.style.backgroundColor = "var(--discount-color)";
      card.style.border = "4px solid var(--discount-color)";
      infoDiv.style.color = "black";
    }
  } else {
    hiddenPrice.setAttribute("value", price_ttc);
  }
  card.appendChild(infoDiv);
  boxToAppend.appendChild(card);

  // évènement au click, redirige vers detail du produit clické
  card.addEventListener("click", () => {
    window.location.href = `/boutique-en-ligne/vue/detail.php?product=${encodeURIComponent(
      id_product
    )}`;
  });

  // formulaire d'ajout via js Fetch
  cardButton.addEventListener("click", (e) => {
    e.stopPropagation();
  });

  const cartForm = infoDiv.querySelector("#cart");
  if (cartForm) {
    cartForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(cartForm);
      formData.append("add-to-cart", "true");

      fetch(`/boutique-en-ligne/controller/CartController.php`, {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            showToast("Produit ajouté au panier !", "success");
            cartItemsNumber.innerText = data.cart_items;
          } else {
            showToast(
              `Erreur: ${data.message || "Erreur inconnue"}`,
              "error",
              4000
            );
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi du formulaire:", error);
          showToast("Une erreur technique est survenue.", "error", 4000);
        });
    });
  }
};
