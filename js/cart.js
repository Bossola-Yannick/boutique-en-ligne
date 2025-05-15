const cartDisplay = document.querySelector(".cart-display");

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
              console.log("Produit supprimé avec succès:", data);
              if (data.success && cartItem) {
                cartItem.remove();
                const updatedProducts = data.products;
                updateCartTotal(updatedProducts);
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
      console.log("Quantité mise à jour avec succès sur le serveur:", data);
      updateCartTotal(data.products);
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
