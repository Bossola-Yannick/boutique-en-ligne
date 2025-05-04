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
            <button type="submit" class="card-button-add" value="${id_product}">
              <img src="../assets/images/icones/add.png"/>
            </button>
          </div>
    `;

  const cardDefaultPriceBox = infoDiv.querySelector(".card-default-box");
  const cardDiscountPriceBox = infoDiv.querySelector(".card-discount-box");
  const cardButton = infoDiv.querySelector(".card-button-add");

  if (price_discount < price_ttc) {
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
  }
  card.appendChild(infoDiv);
  boxToAppend.appendChild(card);

  // évènement au click, redirige vers detail du produit clické
  card.addEventListener("click", () => {
    window.location.href = `../vue/detail.php?product=${encodeURIComponent(
      id_product
    )}`;
  });

  // évènement au click panier, ajout produit au panier
  cardButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const productAdded = card.getAttribute("value");
    console.log(productAdded);
    console.log(userId);
    console.log(id_product);
    console.log("quantity default: ", 1);
    console.log("unit price: ");
    // gestion ajout au panier
  });
};
