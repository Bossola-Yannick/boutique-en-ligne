const costumes = "costumes";
const accessorys = "accessories";
const filters = "filter";

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

getAll(costumes).then((data) => {
  let allCostumes = data.products;
  for (const costume of allCostumes) {
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
    let priceDiscount = $("<td></td>")
      .text(costume["price_discount"] + "€")
      .addClass("table-item");
    if (costume["price_discount"] === costume["price_ttc"]) {
      priceDiscount.text("0%");
    } else {
      let promo = (costume["price_discount"] * 100) / costume["price_ttc"];
      let percentDiscount = Math.floor(100 - promo);
      priceDiscount.text(percentDiscount + " %");
    }
    let priceTtc = $("<td></td>")
      .text(costume["price_ttc"] + "€")
      .addClass("table-item");
    if (costume["price_discount"] !== costume["price_ttc"]) {
      priceTtc.text(costume["price_discount"] + "€");
    }
    row.append(name);
    row.append(description);
    row.append(imageLink);
    row.append(type);
    row.append(category);
    row.append(stock);
    row.append(priceHt);
    row.append(priceDiscount);
    row.append(priceTtc);
    $(".table-product-body").append(row);
    // console.log(costume);
  }
  console.log("Costumes :", data);
});

getAll(accessorys).then((data) => {
  let allAccessorys = data.products;
  for (const accessory of allAccessorys) {
    let row = $("<tr></tr>").addClass("tabble-item-row");
    let name = $("<td></td>")
      .text(accessory["name_product"])
      .addClass("table-item");
    let description = $("<td></td>")
      .text(accessory["description"])
      .addClass("table-item");
    let imageLink = $("<td></td>")
      .text(accessory["image_link"])
      .addClass("table-item");
    let type = $("<td></td>")
      .text(accessory["category"])
      .addClass("table-item");
    let category = $("<td></td>").text("TAGS").addClass("table-item");
    let stock = $("<td></td>").text(accessory["stock"]).addClass("table-item");
    let priceHt = $("<td></td>")
      .text(accessory["price_ht"] + "€")
      .addClass("table-item");
    let priceDiscount = $("<td></td>")
      .text(accessory["price_discount"] + "€")
      .addClass("table-item");
    if (accessory["price_discount"] === accessory["price_ttc"]) {
      priceDiscount.text("0%");
    } else {
      let promo = (accessory["price_discount"] * 100) / accessory["price_ttc"];
      let percentDiscount = Math.floor(100 - promo);
      priceDiscount.text(percentDiscount + " %");
    }
    let priceTtc = $("<td></td>")
      .text(accessory["price_ttc"] + "€")
      .addClass("table-item");
    if (accessory["price_discount"] !== accessory["price_ttc"]) {
      priceTtc.text(accessory["price_discount"] + "€");
    }
    row.append(name);
    row.append(description);
    row.append(imageLink);
    row.append(type);
    row.append(category);
    row.append(stock);
    row.append(priceHt);
    row.append(priceDiscount);
    row.append(priceTtc);
    $(".table-product-body").append(row);
    // console.log(costume);
  }
  console.log("Accessoires :", data);
});

getAll(filters).then((data) => {
  console.log("Filtres :", data);
});
