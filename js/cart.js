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
        productDelete.innerHTML = `<button class="delete-line-cart">Supprimer</button>`;

        cartItem.appendChild(productImgTitle);
        cartItem.appendChild(productQuantity);
        cartItem.appendChild(productPrice);
        cartItem.appendChild(productDelete);
        cartDisplay.appendChild(cartItem);
      });

      const buttonAddQuantity = document.querySelectorAll(".add-quantity-cart");
      buttonAddQuantity.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          const inputQty = e.target.previousElementSibling;
          if (inputQty && inputQty.classList.contains("input-quantity")) {
            let currentValue = parseInt(inputQty.value);
            currentValue++;
            inputQty.value = currentValue;

            // met a jour le prix du produit
            const cartItem = e.target.closest(".cart-item-box");
            if (cartItem) {
              const priceCol = cartItem.querySelector(".price-col");
              const unitPrice = parseFloat(priceCol.dataset.unitPrice);
              const newTotalPrice = currentValue * unitPrice;
              priceCol.querySelector(
                "p"
              ).textContent = `${newTotalPrice.toFixed(2)} €`;
            }
            // TODO: send data to the server
          }
        });
      });
    });
}
