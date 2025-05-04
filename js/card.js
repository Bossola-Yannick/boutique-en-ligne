// créer la card du produit
const createCard = (
  category,
  image,
  id_product,
  name_product,
  price_ttc,
  price_discount,
  boxToAppend
) => {
  const card = document.createElement("div");
  card.classList.add("card-box");
  card.setAttribute("value", name_product);

  const imgDiscount = document.createElement("img");
  imgDiscount.classList.add("card-img-discount");
  imgDiscount.setAttribute("src", "../assets/images/icones/discount.png");
  card.appendChild(imgDiscount);

  const divImg = document.createElement("div");
  divImg.classList.add("card-img-box");

  const cardImage = document.createElement("img");
  cardImage.classList.add("card-img-product");
  if (category === "déguisement") {
    cardImage.setAttribute("src", `../assets/images/cosplay/${image}`);
  } else {
    cardImage.setAttribute("src", `../assets/images/accessories/${image}`);
  }

  divImg.appendChild(cardImage);
  card.appendChild(divImg);

  const infoDiv = document.createElement("div");
  infoDiv.classList.add("card-infos-box");
  infoDiv.innerHTML = `
          <h3>${name_product}</h3>
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
            <form id="cart" class="cart" method="post" action="../controller/CartController.php">
            <input type="hidden" name="price_product" id="price_product">
            <input type="hidden" name="product_id" value="${id_product}">
              <button type="submit" name="add-to-cart" class="card-button-add">
                <img src="../assets/images/icones/add.png"/>
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
    window.location.href = `../vue/detail.php?product=${encodeURIComponent(
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
      // Ajouter manuellement le paramètre du bouton submit
      formData.append("add-to-cart", "true");

      fetch("../controller/CartController.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            // message de success
            alertBox.innerText = "Produit ajouté au panier !";
            alertBox.classList.add("visible", "green");
            alertBox.classList.remove("red");

            setTimeout(() => {
              alertBox.classList.remove("visible");
              alertBox.innerText = "";
            }, 2000);
            // TODO: mettre a jour l'icône du panier
          } else {
            // message d'erreur
            alertBox.innerText = `Erreur: ${data.message || "Erreur inconnue"}`;
            alertBox.classList.add("visible", "red");
            alertBox.classList.remove("green");

            setTimeout(() => {
              alertBox.classList.remove("visible");
              alertBox.innerText = "";
            }, 3000);
          }
        })
        .catch((error) => {
          console.error("Erreur lors de l'envoi du formulaire:", error);
          alertBox.innerText = "Une erreur technique est survenue.";
          alertBox.style.visibility = "visible";
          alertBox.classList.add("red");
          alertBox.classList.remove("green");
          if (alertBox.innerText) {
            setTimeout(() => {
              alertBox.style.visibility = "hidden";
              alertBox.innerText = "";
            }, 1000);
          }
        });
    });
  }
};
