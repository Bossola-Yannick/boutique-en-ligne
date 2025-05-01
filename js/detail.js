const productName = window.location.search;

// console.log(productName);

// elements
const productBox = document.getElementById("product-box");
const recommandBox = document.getElementById("recommand-box");
const commentsBox = document.getElementById("comments-box");

fetch(`../controller/DetailController.php${productName}`, {
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

    console.log(product);
    console.log(tags);
    console.log(comments);
    console.log(recommand);

    createDetail(
      product.category,
      product.image_link,
      product.name_product,
      product.description,
      product.price_ttc,
      product.price_discount,
      product.rating_product,
      product.stock,
      tags
    );
  })
  .catch((error) => console.error("Erreur fetch :", error));

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
                    <p>Prix: <span class="price">${price_ttc}€</span></p>
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
            <button type="submit" id="button-add" class="button-add">
            Ajouter au panier
            <img src="../assets/images/icones/add.png"/>
            </button>
        </div>
            
    `;
  const footerRightBox = document.createElement("div");
  footerRightBox.classList.add("detail-footer");

  tags.forEach((tag) => {
    const tagDiv = document.createElement("div");
    tagDiv.classList.add("tag-box");
    tagDiv.innerHTML = `<p>${tag}</p>`;
    footerRightBox.appendChild(tagDiv);
  });

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
};

// ajouter if pour price box
//! ajouter if stock 0 , hide button + change texte
