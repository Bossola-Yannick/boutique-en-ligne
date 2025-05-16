const cartDisplay = document.querySelector(".cart-display");

let fetchLink;
if (window.location.pathname === "/boutique-en-ligne/index.php") {
  fetchLink = "./controller/CartController.php?action=get_cart_items";
} else {
  fetchLink = "../controller/CartController.php?action=get_cart_items";
}
document.addEventListener("DOMContentLoaded", function () {
  const userId = sessionStorage.getItem("userConnectId");
  if (userId) {
    fetch(fetchLink, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success && typeof data.cart_items !== "undefined") {
          document.querySelector(".cart-number-items").textContent =
            data.cart_items;
        }
      });
  } else {
    document.querySelector(".cart-number-items").textContent = "0";
  }
});

if (window.location.pathname === "/boutique-en-ligne/vue/cart.php") {
  documentName.innerText = "Mon panier";
  fetch(`../controller/CartController.php?action=get_cart_items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      const products = data.products;
      console.log(products);
      products.forEach((product) => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item-box");
        cartItem.dataset.productId = product.id_product;

        // colonne 1
        const productImgTitle = document.createElement("div");
        productImgTitle.classList.add("cart-col", "product-col");
        const imgProd = document.createElement("img");
        imgProd.classList.add("cart-img-prod");
        if (product.category === "déguisement") {
          imgProd.setAttribute(
            "src",
            `../assets/images/cosplay/${product.image_link}`
          );
        } else {
          imgProd.setAttribute(
            "src",
            `../assets/images/accessories/${product.image_link}`
          );
        }
        const titleProd = document.createElement("h3");
        titleProd.classList.add("cart-name-product");
        titleProd.innerText = product.name_product;
        productImgTitle.appendChild(imgProd);
        productImgTitle.appendChild(titleProd);

        productImgTitle.addEventListener("click", () => {
          window.location.href = `../vue/detail.php?product=${product.id_product}`;
        });

        // colonne 2
        const productQuantity = document.createElement("div");
        productQuantity.classList.add("cart-col", "quantity-col");
        productQuantity.innerHTML = ` 
        <button class="decrease-quantity-cart">-</button>
        <input type="number" class="input-quantity" value="${product.quantity}" min="1" readonly> 
        <button class="add-quantity-cart">+</button>
        `;

        // colonne 3
        const productPrice = document.createElement("div");
        productPrice.classList.add("cart-col", "price-col");
        productPrice.dataset.unitPrice = product.unit_price;
        productPrice.innerHTML = `<p>${(
          product.unit_price * product.quantity
        ).toFixed(2)} €</p>`;

        // colonne 4
        const productDelete = document.createElement("div");
        productDelete.classList.add("cart-col", "delete-col");
        productDelete.innerHTML = `<button class="delete-item-cart" value="${product.id_product}">Supprimer</button>`;

        cartItem.appendChild(productImgTitle);
        cartItem.appendChild(productQuantity);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(productDelete);
        cartDisplay.appendChild(cartItem);
      });

      updateCartTotal(products);

      // bouton ajout quantité
      const buttonAddQuantity = document.querySelectorAll(".add-quantity-cart");
      buttonAddQuantity.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const inputQty = e.target.previousElementSibling;
          if (inputQty && inputQty.classList.contains("input-quantity")) {
            let oldQuantity = parseInt(inputQty.value);
            let newQuantity = oldQuantity + 1;
            inputQty.value = newQuantity;

            const cartItem = e.target.closest(".cart-item-box");
            if (cartItem) {
              const productId = cartItem.dataset.productId;
              const priceCol = cartItem.querySelector(".price-col");
              const unitPrice = parseFloat(priceCol.dataset.unitPrice);
              const newTotalPrice = newQuantity * unitPrice;
              priceCol.querySelector(
                "p"
              ).textContent = `${newTotalPrice.toFixed(2)} €`;

              updateQuantityOnServer(
                productId,
                newQuantity,
                inputQty,
                priceCol,
                oldQuantity,
                unitPrice
              );
            }
          }
        });
      });

      // bouton reduit quantité
      const buttonDecreaseQuantity = document.querySelectorAll(
        ".decrease-quantity-cart"
      );
      buttonDecreaseQuantity.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const inputQty = e.target.nextElementSibling;
          if (inputQty && inputQty.classList.contains("input-quantity")) {
            let oldQuantity = parseInt(inputQty.value);
            if (oldQuantity > 1) {
              let newQuantity = oldQuantity - 1;
              inputQty.value = newQuantity;

              const cartItem = e.target.closest(".cart-item-box");
              if (cartItem) {
                const productId = cartItem.dataset.productId;
                const priceCol = cartItem.querySelector(".price-col");
                const unitPrice = parseFloat(priceCol.dataset.unitPrice);
                const newTotalPrice = newQuantity * unitPrice;
                priceCol.querySelector(
                  "p"
                ).textContent = `${newTotalPrice.toFixed(2)} €`;

                updateQuantityOnServer(
                  productId,
                  newQuantity,
                  inputQty,
                  priceCol,
                  oldQuantity,
                  unitPrice
                );
              }
            } else {
              console.log("La quantité ne peut pas être inférieure à 1.");
            }
          }
        });
      });

      const deleteButton = document.querySelectorAll(".delete-item-cart");
      deleteButton.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const productId = e.target.value;
          const cartItem = e.target.closest(".cart-item-box");
          fetch(`../controller/CartController.php?action=delete_item`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              product_id: productId,
            }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error("La réponse du réseau n'était pas correcte");
              }
              return response.json();
            })
            .then((data) => {
              if (data.success && cartItem) {
                cartItem.remove();
                const updatedProducts = data.products;
                updateCartTotal(updatedProducts);
                document.querySelector(".cart-number-items").textContent =
                  data.cart_items;
              }
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la mise à jour de la quantité sur le serveur:",
                error
              );
            });
        });
      });
    });
}

// fonction pour mettre à jour la quantité sur le serveur
function updateQuantityOnServer(
  productId,
  quantity,
  inputQtyElement,
  priceColElement,
  oldQuantity,
  unitPrice
) {
  fetch(`../controller/CartController.php?action=update_quantity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      product_id: productId,
      quantity: quantity,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("La réponse du réseau n'était pas correcte");
      }
      return response.json();
    })
    .then((data) => {
      updateCartTotal(data.products);
      document.querySelector(".cart-number-items").textContent =
        data.cart_items;
    })
    .catch((error) => {
      console.error(
        "Erreur lors de la mise à jour de la quantité sur le serveur:",
        error
      );

      // annule la modification en cas d'erreur
      if (inputQtyElement && priceColElement) {
        inputQtyElement.value = oldQuantity;
        const oldTotalPrice = oldQuantity * unitPrice;
        priceColElement.querySelector(
          "p"
        ).textContent = `${oldTotalPrice.toFixed(2)} €`;
        alert("Erreur lors de la mise à jour de la quantité.");
      }
    });
}

// fonction pour calculer et afficher le total du panier
function updateCartTotal(products) {
  let total = 0;
  products.forEach((product) => {
    total += product.unit_price * product.quantity;
  });
  const cartTotalElement = document.querySelector(".cart-total-price");
  if (cartTotalElement) {
    cartTotalElement.textContent = `${total.toFixed(2)} €`;
  }
}

// Initialisation de Stripe : composer require stripe/stripe
const buttonOrder = document.querySelector(".create-order");
const modal = document.getElementById("stripe-modal");
const closeModal = document.querySelector(".close-modal");
const form = document.getElementById("payment-form");

let stripe, elements, paymentElement;

if (buttonOrder) {
  buttonOrder.addEventListener("click", async (e) => {
    e.preventDefault();
    modal.classList.add("show");

    // Reset le contenu du formulaire à chaque ouverture
    form.innerHTML = `
    <div id="payment-element"></div>
    <button id="submit">
      <div class="spinner hidden" id="spinner"></div>
      <span id="button-text">Payer maintenant</span>
    </button>
    <div id="payment-message" class="hidden"></div>
  `;

    // Récupère le clientSecret depuis le serveur
    const cartTotalElement = document.querySelector(".cart-total-price");
    const total = cartTotalElement.textContent.replace(" €", "");
    const response = await fetch("../controller/CreatePayment.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ total: total }),
    });
    const { clientSecret } = await response.json();

    // Initialise Stripe et Elements avec le clientSecret
    stripe = Stripe(window.STRIPE_PUBLIC_KEY);
    elements = stripe.elements({ clientSecret });
    paymentElement = elements.create("payment");
    paymentElement.mount("#payment-element");

    // Ajoute le listener sur le nouveau form
    form.onsubmit = async (event) => {
      event.preventDefault();
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });
      const messageContainer = document.querySelector("#payment-message");
      if (error) {
        messageContainer.classList.remove("hidden");
        messageContainer.textContent = error.message;
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        fetch("../controller/OrderController.php", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              form.innerHTML =
                '<div class="success-message">✅ Paiement réussi ! Merci pour votre commande.</div>';
              document.querySelector(".cart-display").innerHTML = "";
              updateCartTotal([]);
              buttonOrder.disabled = true;
            } else {
              form.innerHTML =
                '<div class="success-message" style="color:red;">Erreur lors de l\'enregistrement de la commande.</div>';
            }
          });
      }
    };
  });

  // Fermer la modal
  closeModal.addEventListener("click", () => {
    modal.classList.remove("show");
    form.innerHTML = `
    <div id="payment-element"></div>
    <button id="submit">
      <div class="spinner hidden" id="spinner"></div>
      <span id="button-text">Payer maintenant</span>
    </button>
    <div id="payment-message" class="hidden"></div>
  `;
  });
}
