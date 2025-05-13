if (!sessionStorage.getItem("userConnectId")) {
  sessionStorage.setItem("userConnectId", userId);
}
if (!sessionStorage.getItem("userConnectRole")) {
  sessionStorage.setItem("userConnectRole", userRole);
}

const URLproductId = new URLSearchParams(window.location.search);
const productId = URLproductId.get("product");

const documentName = document.querySelector("title");

// elements
const productBox = document.getElementById("product-box");
const recommandBox = document.getElementById("recommand-items");
const commentsBox = document.getElementById("comments-items");

if (window.location.pathname === "/boutique-en-ligne/vue/detail.php") {
  fetch(
    `../controller/ProductController.php?action=detail&product=${encodeURIComponent(
      productId
    )}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      let product = data.product;
      let tags = data.tags;
      let comments = data.comments;
      let recommand = data.recommand;

      //------------------------------- //
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

      //------------------------------- //
      // gestion du titre du document (balise title)
      if (product.category === "déguisement") {
        documentName.innerText = `Déguisement: ${product.name_product}`;
      } else {
        documentName.innerText = product.name_product;
      }

      //------------------------------- //
      // création de la partie detail du produit
      createDetail(
        product.id_product,
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

      //------------------------------- //
      // gestion des recommandations
      // supprime les doublons
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
      // retire le produit actuel
      const filterRecommand = sortedRecommand.filter(
        (reco) => reco.name_product !== product.name_product
      );

      // affiche nombre de carte selon la taille de l'écran
      const ratio = Math.floor(window.innerWidth / 259);
      let showCard;
      window.innerWidth < 1440 ? (showCard = ratio) : (showCard = 5);

      console.log(filterRecommand);
      // créer la carte pour chaque recommandation
      filterRecommand.slice(0, showCard).forEach((reco) => {
        createCard(
          reco.category,
          reco.image_link,
          reco.id_product,
          reco.name_product,
          reco.price_ttc,
          reco.price_discount,
          reco.rating_product,
          recommandBox
        );
      });

      //------------------------------- //
      // affichage commentaires
      if (comments) {
        comments.forEach((com) => {
          createCommentBox(
            product.id_product,
            com.id_comment,
            com.email,
            com.date_comment,
            com.comment,
            com.rating_comment,
            com.admin_reply
          );
        });
      }

      // vérification commentaires
      const commentForm = document.getElementById("comment-form");

      // input caché avec id produit
      const productIdInput = document.getElementById("product_id");
      if (productIdInput) {
        productIdInput.value = product.id_product;
      }
      const commentText = document.getElementById("comment-text");
      const commentError = document.getElementById("comment-error");

      if (commentForm) {
        commentForm.addEventListener("submit", function (event) {
          commentError.textContent = "";

          const commentValue = commentText.value.trim();

          // vérifier si le commentaire est vide
          if (commentValue === "") {
            event.preventDefault();
            commentError.textContent =
              "Veuillez écrire un commentaire avant de valider.";
          } else if (commentValue.length < 5) {
            event.preventDefault();
            commentError.textContent = "Un petit effort... Dites nous tous!";
          } else if (commentValue.length > 500) {
            event.preventDefault();
            commentError.textContent =
              "Le commentaire est trop long (max 500 caractères).";
          } else if (!userId) {
            event.preventDefault();
            commentError.textContent =
              "Vous devez être connecté écrire un commentaire.";
          } else if (productIdInput > 0) {
            event.preventDefault();
            commentError.textContent = "Erreur: ID produit invalide";
          }
        });
      }
    })

    .catch((error) => console.error("Erreur fetch :", error));
}

//------------------------------- //
// créer la boite detail du produit
const createDetail = (
  id_product,
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
  if (rating === 0) {
    rating = "?";
  }

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
                <p>note: <span class="left-mar bold">${rating} / 5</span></p>
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
            <form id="cart" method="post" action="../controller/CartController.php">
              <input type="hidden" name="price_product" id="price_product">
              <input type="hidden" name="product_id" value="${id_product}">
              <button type="submit" name="add-to-cart" id="button-add" class="button-add">
              Ajouter au panier
              <img src="../assets/images/icones/add.png"/>
              </button>
            </form>
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

  const hiddenPrice = detailProduct.querySelector("#price_product");

  // affiche la bonne boite de prix
  if (price_discount < price_ttc) {
    hiddenPrice.setAttribute("value", price_discount);
    document.getElementById("discount").style.display = "flex";
    document.getElementById("default").style.display = "none";
  } else {
    hiddenPrice.setAttribute("value", price_ttc);
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

  // formulaire d'ajout via js Fetch
  const cartForm = detailProduct.querySelector("#cart");
  if (cartForm) {
    cartForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(cartForm);
      formData.append("add-to-cart", "true");

      fetch("../controller/CartController.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
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

//------------------------------- //
// affiche les commentaires
const createCommentBox = (
  id_product,
  id_comment,
  email,
  date,
  comment,
  rating,
  admin_reply
) => {
  const newEmail = email.split("@");
  email = newEmail[0];

  let roleAdmin;
  if (!admin_reply && userRole === "admin") {
    roleAdmin = true;
  } else {
    roleAdmin = false;
  }

  const commentAndReplyBox = document.createElement("div");
  commentAndReplyBox.classList.add("comment-and-reply");
  const commentBox = document.createElement("div");
  commentBox.classList.add("comment-box");
  commentBox.innerHTML = `
    <div class="comment-header">
      <div class="header-first-row">
      <p class="comment-title">Nom: <span>${email}</span></p>
      <p class="comment-title">Note: <span>${rating} / 5</span></p>
      </div>
      <p class="comment-title comment-date">Date: <span>${date}</span></p>
    </div>
    <div class="comment-body">
      <p class="comment-title">Avis:</p>
      <p class="comment-text">${comment}</p>
    </div>
    ${
      roleAdmin
        ? `
      <div class="reply-form-box">
        <p class="fake-button">Répondre</p>
      </div>
      `
        : ""
    }
  `;

  commentAndReplyBox.appendChild(commentBox);

  if (roleAdmin && !admin_reply) {
    const replyForm = commentBox.querySelector(".reply-form-box");
    const replyButton = commentBox.querySelector(".fake-button");

    if (replyForm && replyButton) {
      replyButton.addEventListener("click", () => {
        replyForm.innerHTML = `
          <form id="comment-form-${id_comment}" method="post" class="reply-form" action="../controller/CommentController.php">
            <input type="hidden" name="comment_id" value="${id_comment}">
            <input type="hidden" name="product_id" value="${id_product}">
            <label for="comment-text">Réponse :</label>
            <textarea id="comment-text" name="reply-text" placeholder="écrire la réponse..." required></textarea>
            <button name="reply-comment" type="submit" class="reply-admin">Répondre</button>
          </form>
      `;
      });
    }
  }

  if (admin_reply) {
    const adminReply = document.createElement("div");
    adminReply.classList.add("admin-reply-box");
    adminReply.innerHTML = `
    <div class="comment-header">
      <p class="admin-title yellow">Admin</span></p>
    </div>
    <div class="comment-body">
      <p class="comment-title">Réponse:</p>
      <p class="comment-text">${admin_reply}</p>
    </div>
    `;

    commentAndReplyBox.appendChild(adminReply);
  }

  commentsBox.appendChild(commentAndReplyBox);
};
