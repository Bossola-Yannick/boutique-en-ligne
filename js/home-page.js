const actions = ["costumes", "promo"];
const boxCostume = $(".box-product");
const boxPromo = $(".box-promo");

const getAll = async (action) => {
  try {
    const response = await fetch(
      `./controller/ProductController.php?action=${action}`,
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

const getSelectProduct = async (boxCard, type) => {
  const data = await getAll(type);
  let product = data.products;
  const maxNum = product.length;
  const randomSelect = [];
  // génération de nombre aléatoire pour selection homePage
  while (randomSelect.length < Math.min(5, maxNum)) {
    let num = Math.floor(Math.random() * maxNum);
    if (!randomSelect.includes(num)) {
      randomSelect.push(num);
    }
  }
  // génération des cartes
  for (const num of randomSelect) {
    createCard(
      product[num].category,
      product[num].image_link,
      product[num].id_product,
      product[num].name_product,
      product[num].price_ttc,
      product[num].price_discount,
      product[num].rating_product,
      boxCard[0]
    );
  }
};
getSelectProduct(boxCostume, "costumes");
getSelectProduct(boxPromo, "promo");
