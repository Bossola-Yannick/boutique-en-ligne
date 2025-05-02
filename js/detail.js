if (!sessionStorage.getItem("user")) {
  sessionStorage.setItem("user", userId);
}

const productName = window.location.search;
const documentName = document.querySelector("title");

// elements
const productBox = document.getElementById("product-box");
const recommandBox = document.getElementById("recommand-items");
const commentsBox = document.getElementById("comments-box");

fetch(`../controller/ProductController.php${productName}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    let product = data.product;
    let tags = data.tags;
    let comments = data.comments;
    let recommand = data.recommand;

    console.log(data);
    //gestion des tags
    let tagList = [];
    if (tags && tags.length >= 1) {
      tags.forEach((tag) => {
        if (tag && tag.includes("/")) {
          let newTag = tag.split("/");
          newTag.forEach((tag) => {
            tagList.push(tag);
          });
        } else if (tag) {
          tagList.push(tag);
        }
      });
    } else {
      tagList = tags;
    }

    // gestion du titre du document (balise title)
    if (product.category === "déguisement") {
      documentName.innerText = `Déguisement: ${product.name_product}`;
    } else {
      documentName.innerText = product.name_product;
    }

    // création de la partie detail du produit
    createDetail(
      product.category,
      product.image_link,
      product.name_product,
      product.description,
      product.price_ttc,
      product.price_discount,
      product.rating_product,
      product.stock,
      tagList
    );

    // gestion des recommandations
    // vérifie et supprime les doublons
    const noDubRecommand = recommand.filter(
      (reco, index, self) =>
        index ===
        self.findIndex((dub) => dub.name_product === reco.name_product)
    );
    // range les produits associés au produit affiché en premier
    const sortedRecommand = noDubRecommand.sort((a, b) => {
      const aMatch = a.name_product.includes(product.name_product) ? 0 : 1;
      const bMatch = b.name_product.includes(product.name_product) ? 0 : 1;
      return aMatch - bMatch;
    });
    // retire un produit doublon et garde 5 resultats
    const filterRecommand = sortedRecommand
      .filter((reco) => reco.name_product !== product.name_product)
      .slice(0, 5);

    // créer la carte pour chaque recommandation
    filterRecommand.forEach((reco) => {
      createCard(
        reco.category,
        reco.image_link,
        reco.name_product,
        reco.price_ttc,
        reco.price_discount,
        recommandBox
      );
    });
  })
  .catch((error) => console.error("Erreur fetch :", error));

// recup info produit
const getInfoProduct = ($name) => {
  fetch;
};

// créer la boite detail du produit
const createDetail = (
  category,
  image,
  name,
  description,
  price_ttc,
  price_discount,
  rating,
  stock,
  tags
) => {
  // boite image
  const leftBox = document.createElement("section");
  leftBox.classList.add("detail-left-box");
  const detailImage = document.createElement("img");
  if (category === "déguisement") {
    detailImage.setAttribute("src", `../assets/images/cosplay/${image}`);
  } else {
    detailImage.setAttribute("src", `../assets/images/accessories/${image}`);
  }
  const notInclude = document.createElement("p");
  notInclude.classList.add("not-included");
  if (category === "déguisement") {
    notInclude.innerHTML = `*Poule et accessoires <span class="bold">non-inclus</span>.`;
  } else {
    notInclude.innerHTML = `*Poule et déguisement <span class="bold">non-inclus</span>.`;
  }

  leftBox.appendChild(detailImage);
  leftBox.appendChild(notInclude);
  productBox.appendChild(leftBox);

  // boite details
  const rightBox = document.createElement("section");
  rightBox.classList.add("detail-right-box");
  const detailProduct = document.createElement("div");
  detailProduct.classList.add("detail-product");
  detailProduct.innerHTML = `
        
    <!-- title -->
        <div class="detail-title">
            <h2>${name}</h2>
            <div class="rating-box">
                <p>note: <span class="bold">${rating} / 5</span></p>
                <img src="../assets/images/icones/icon-rating.png"/>
            </div>
        </div>  
    
    <!-- body -->
        <div class="detail-body">
            <div class="desc-box">
                <p class="desc-title bold">Description:</p>
                <p>${description}</p>
            </div>
            <div class="price-stock-box">
                <p class="stock-box">Stock: <span>${stock}</span></p>
                <div id="default" class="price-box">
                    <p>Prix: </p>
                    <p class="price">${price_ttc}€</p>
                </div>
                <div id="discount" class="discount-box">
                  <div class="old-price">
                    <p>Prix:</p>
                    <p class="strike-price">${price_ttc}€</p>
                  </div>
                    <p class="price red">${price_discount}€</p>
                </div>
            </div>
        </div>
        <div class="button-add-cart">
            <p class="bold red no-stock">Rupture de stock</p>
            <button type="submit" id="button-add" class="button-add" value=${name}>
            Ajouter au panier
            <img src="../assets/images/icones/add.png"/>
            </button>
        </div>
            
    `;
  const footerRightBox = document.createElement("div");
  footerRightBox.classList.add("detail-footer");

  if (tags) {
    tags.forEach((tag) => {
      const tagDiv = document.createElement("div");
      tagDiv.classList.add("tag-box");
      tagDiv.innerHTML = `<p>${tag}</p>`;
      footerRightBox.appendChild(tagDiv);
    });
  }

  detailProduct.appendChild(footerRightBox);
  rightBox.appendChild(detailProduct);
  productBox.appendChild(rightBox);

  // affiche la bonne boite de prix
  if (price_discount < price_ttc) {
    document.getElementById("discount").style.display = "flex";
    document.getElementById("default").style.display = "none";
  } else {
    document.getElementById("discount").style.display = "none";
    document.getElementById("default").style.display = "flex";
  }

  if (stock === 0) {
    document.getElementById("button-add").style.display = "none";
    document.querySelector(".no-stock").style.display = "block";
  } else {
    document.getElementById("button-add").style.display = "flex";
    document.querySelector(".no-stock").style.display = "none";
  }
};

// créer la card du produit
const createCard = (
  category,
  image,
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
          <button type="submit" class="card-button-add" value="${name_product}">
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

  card.addEventListener("click", () => {
    const product = card.getAttribute("value");
    window.location.href = `../vue/detail.php?product=${encodeURIComponent(
      product
    )}`;
  });

  cardButton.addEventListener("click", (e) => {
    e.stopPropagation();
    const productAdded = card.getAttribute("value");
    console.log(productAdded);
    // gestion ajout au panier
  });
};
