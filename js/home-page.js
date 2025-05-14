const actions = ["costumes", "promo"];

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

const getSelectProduct = async () => {
  const data = await getAll("costumes");
  let product = data.products;
  let boxCard = $(".box-product");
  for (let i = 0; i < 5; i++) {
    createCard(
      product[i].category,
      product[i].image_link,
      product[i].id_product,
      product[i].name_product,
      product[i].price_ttc,
      product[i].price_discount,
      product[i].rating_product,
      boxCard[0]
    );
  }
  console.log(product);
};
const getSelectPromo = async () => {
  const data = await getAll("promo");
  let product = data.products;
  let boxCard = $(".box-promo");
  for (let i = 0; i < 5; i++) {
    createCard(
      product[i].category,
      product[i].image_link,
      product[i].id_product,
      product[i].name_product,
      product[i].price_ttc,
      product[i].price_discount,
      product[i].rating_product,
      boxCard[0]
    );
  }
  console.log(product);
};
getSelectProduct();
getSelectPromo();
