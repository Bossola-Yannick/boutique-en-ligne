const filters = "filter";
const actions = ["costumes", "accessories"];

if (
  window.location.href === "http://localhost/boutique-en-ligne/vue/adminVue.php"
) {
  $("body").addClass("body-admin");
}

const getAll = async (action) => {
  try {
    const response = await fetch(
      `../controller/ProductController.php?action=${action}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur dans fetchProduct pour l'action "${action}":`, error);
    throw error;
  }
};

actions.forEach(async (action) => {
  const data = await getAll(action);
  let allProduct = data.products;
  for (const costume of allProduct) {
    let row = $("<tr></tr>").addClass("tabble-item-row");
    let name = $("<td></td>")
      .text(costume["name_product"])
      .addClass("table-item");
    let description = $("<td></td>")
      .text(costume["description"])
      .addClass("table-item");
    let imageLink = $("<td></td>")
      .text(costume["image_link"])
      .addClass("table-item");
    let type = $("<td></td>").text(costume["category"]).addClass("table-item");
    let category = $("<td></td>").text("TAGS").addClass("table-item");
    let stock = $("<td></td>").text(costume["stock"]).addClass("table-item");
    let priceHt = $("<td></td>")
      .text(costume["price_ht"] + "€")
      .addClass("table-item");
    let promoPercent = $("<td></td>").addClass("table-item");
    if (costume["price_discount"] === costume["price_ttc"]) {
      promoPercent.text("0%");
    } else {
      let promo = (costume["price_discount"] * 100) / costume["price_ttc"];
      let percentDiscount = Math.floor(100 - promo);
      promoPercent.text(percentDiscount + " %");
    }
    let priceTtc = $("<td></td>")
      .text(costume["price_ttc"] + "€")
      .addClass("table-item");
    let priceDiscount = $("<td></td>").addClass("table-item");
    if (costume["price_discount"] === costume["price_ttc"]) {
      priceDiscount.text(costume["price_ttc"]);
    } else priceDiscount.text(costume["price_discount"]);
    let deleteItem = $("<td></td>")
      .text("X")
      .addClass("delete-item")
      .attr("data-id", costume["id_product"]);
    let updateItem = $("<td></td>")
      // .text("/")
      .addClass("update-item")
      .attr("data-id", costume["id_product"]);
    row.append(name);
    row.append(description);
    row.append(imageLink);
    row.append(type);
    row.append(category);
    row.append(stock);
    row.append(priceHt);
    row.append(priceTtc);
    row.append(promoPercent);
    row.append(priceDiscount);
    row.append(updateItem);
    row.append(deleteItem);
    $(".table-product-body").append(row);
  }
});

//* supprimer un produit
$(document).on("click", ".delete-item", async function () {
  const id = $(this).data("id");
  if (!id) return;
  // try {
  const response = await fetch(
    `../controller/ProductController.php?action=delete&id=${id}`,
    {
      method: "GET",
    }
  );
  location.reload(true);
});

//* AFFICHAGE ET FERMETURE DES MODALS
// affichage modal de creation d'un produit
$(document).on("click", ".create-product", function () {
  $(".overlay").css("display", "block");
  $(".modal-create").css("display", "block");
});
// affichage modal de mise à jour d'un produit
$(document).on("click", ".update-item", function () {
  $(".overlay").css("display", "block");
  $(".modal-update").css("display", "block");
});
// fermeture des modals
$(document).on("click", ".modal-close", function () {
  $(".overlay").css("display", "none");
  $(".modal-update").css("display", "none");
  $(".modal-create").css("display", "none");
});

//! A Faire BONUS
getAll(filters).then((data) => {
  // console.log("Filtres :", data);
});
