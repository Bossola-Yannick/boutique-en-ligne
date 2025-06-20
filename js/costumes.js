const header = document.querySelector("header");
const footer = document.querySelector("footer");
const sectionRightCol = document.getElementById("right-col");
const sectionLeftCol = document.getElementById("left-col");
const listallProductBox = document.querySelector(".list-all-costumes");
const filterSubCatBox = document.querySelector(".filter-by-subcategory");
const filterTagBox = document.querySelector(".filter-by-tag");
const filterDefaultBox = document.querySelector(".filter-default");

const noFitAll = window.matchMedia("(max-width:850px)");

let currentPage;
let pageHash = location.hash.split("#")[1];
if (pageHash) {
  currentPage = parseInt(pageHash);
} else {
  currentPage = 1;
}
const productsPerPage = 12;

// récupere info produit demandé via action
const fetchProduct = async (action) => {
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

// gestion des différentes pages (déguisements, accessoires, promotions)
let activePage;
if (window.location.pathname === "./vue/costumes.php") {
  activePage = "costumes";
  documentName.innerText = "Déguisements";
} else if (window.location.pathname === "./vue/accessories.php") {
  activePage = "accessories";
  documentName.innerText = "Accessoires";
} else if (window.location.pathname === "./vue/promo.php") {
  activePage = "promo";
  documentName.innerText = "Promotions";
  sectionLeftCol.style.backgroundColor = "var(--discount-color)";
  header.style.backgroundColor = "var(--discount-color)";
  footer.style.backgroundColor = "var(--discount-color)";
}

if (
  window.location.pathname === "./vue/costumes.php" ||
  window.location.pathname === "./vue/accessories.php" ||
  window.location.pathname === "./vue/promo.php"
) {
  //------------------------------- //
  // déguisements
  fetchProduct(activePage).then((data) => {
    let allProduct = data.products;

    // applique les filtres de l'URL
    const searchParams = new URLSearchParams(window.location.search);
    const subCategoryFilter = searchParams.get("subcategory");
    const tagFilter = searchParams.get("tags");
    const defaultFilter = searchParams.get("default");

    if (defaultFilter) {
      if (defaultFilter === "0") {
        allProduct = allProduct.sort((a, b) => {
          const priceA = getWhichPrice(a);
          const priceB = getWhichPrice(b);
          return priceA - priceB;
        });
      } else if (defaultFilter === "1") {
        allProduct = allProduct.sort((a, b) => {
          const priceA = getWhichPrice(a);
          const priceB = getWhichPrice(b);
          return priceB - priceA;
        });
      } else if (defaultFilter === "2") {
        allProduct = allProduct.sort((a, b) => {
          const ratingA = a.rating_product;
          const ratingB = b.rating_product;
          return ratingB - ratingA;
        });
      }
    }

    if (
      window.location.pathname === "./vue/costumes.php" ||
      window.location.pathname === "./vue/promo.php"
    ) {
      if (subCategoryFilter) {
        allProduct = allProduct.filter(
          (product) =>
            product.sub_category &&
            product.sub_category.id_subcategory.toString() === subCategoryFilter
        );
      }
    }

    if (window.location.pathname === "./vue/accessories.php") {
      if (tagFilter) {
        allProduct = allProduct.filter((product) =>
          product.tag.some(
            (tag) => tag.id_tag != null && tag.id_tag.toString() === tagFilter
          )
        );
      }
    }

    if (allProduct.length > 0) {
      // pagination
      pageProducts(allProduct, currentPage);
      pageNumberButtons(allProduct);
    } else {
      const noProduct = document.createElement("div");
      noProduct.innerHTML = `
      <p class="bold">Oops, on dirait bien qu'aucun produit ne correspond à votre recherche.</p>
      `;
      listallProductBox.appendChild(noProduct);
    }
  });

  //------------------------------- //
  // filters
  fetchProduct("filter").then((data) => {
    const allSubCat = data.sub_category;
    const allTags = data.tags;
    const defaultFilter = [
      { id: "0", name: "Prix: moins cher au plus cher" },
      { id: "1", name: "Prix: plus cher au moins cher" },
      { id: "2", name: "Note" },
    ];

    // recherche les filtres présents dans l'URL en cas de refresh
    const searchParams = new URLSearchParams(window.location.search);
    const activeSubCategory = searchParams.get("subcategory");
    const activeTag = searchParams.get("tags");
    const activeDefault = searchParams.get("default");

    if (noFitAll.matches) {
      // select pour les filtres par default
      createSelectFilter(
        defaultFilter,
        filterDefaultBox,
        "default",
        "Trier par...",
        "id",
        "name",
        activeDefault
      );

      // select pour filtre pour les sous-categories
      if (
        window.location.pathname === "./vue/costumes.php" ||
        window.location.pathname === "./vue/promo.php"
      ) {
        if (allSubCat && allSubCat.length > 0) {
          createSelectFilter(
            allSubCat,
            filterSubCatBox,
            "subcategory",
            "Sous-catégorie...",
            "id_subcategory",
            "name_subcategory",
            activeSubCategory
          );
        } else {
          filterSubCatBox.innerHTML = "";
        }
      }

      // select pour filtre pour les tags
      if (window.location.pathname === "./vue/accessories.php") {
        if (allTags && allTags.length > 0) {
          createSelectFilter(
            allTags,
            filterTagBox,
            "tags",
            "Tag...",
            "id_tag",
            "name_tag",
            activeTag
          );
        } else {
          filterTagBox.innerHTML = "";
        }
      }
    } else {
      // créer des checkbox
      // checkbox default
      defaultFilter.forEach((element) => {
        createCheckbox(element.id, element.name, filterDefaultBox, "default");
      });

      // checkbox sous-catégorie
      if (
        window.location.pathname === "./vue/costumes.php" ||
        window.location.pathname === "./vue/promo.php"
      ) {
        allSubCat.forEach((element) => {
          createCheckbox(
            element.id_subcategory,
            element.name_subcategory,
            filterSubCatBox,
            "subcategory"
          );
        });
      }

      if (window.location.pathname === "./vue/accessories.php") {
        // checkbox tags
        allTags.forEach((element) => {
          createCheckbox(
            element.id_tag,
            element.name_tag,
            filterTagBox,
            "tags"
          );
        });
      }

      // filtre "par defaut"
      if (activeDefault) {
        const checkboxToSelect = filterDefaultBox.querySelector(
          `input[type="checkbox"][value="${activeDefault}"]`
        );
        if (checkboxToSelect) checkboxToSelect.checked = true;
      }
      // filtre sous categorie
      if (
        window.location.pathname === "./vue/costumes.php" ||
        window.location.pathname === "./vue/promo.php"
      ) {
        if (activeSubCategory) {
          const checkboxToSelect = filterSubCatBox.querySelector(
            `input[type="checkbox"][value="${activeSubCategory}"]`
          );
          if (checkboxToSelect) checkboxToSelect.checked = true;
        }
      }

      if (window.location.pathname === "./vue/accessories.php") {
        // filtre tag
        if (activeTag) {
          const checkboxToSelect = filterTagBox.querySelector(
            `input[type="checkbox"][value="${activeTag}"]`
          );
          if (checkboxToSelect) checkboxToSelect.checked = true;
        }
      }
    }
  });
}

// creer select bouton pour responsive
const createSelectFilter = (
  filterList,
  box,
  filterType,
  filterName,
  id,
  name,
  activeValue
) => {
  box.innerHTML = "";

  const select = document.createElement("select");
  select.classList.add("filter-select");
  select.setAttribute("aria-label", filterName);

  const optionLabel = document.createElement("option");
  optionLabel.value = "";
  optionLabel.textContent = filterName;
  if (!activeValue) {
    optionLabel.selected = true;
  }
  select.appendChild(optionLabel);

  filterList.forEach((optionData) => {
    const option = document.createElement("option");
    option.value = optionData[id];
    option.textContent = optionData[name];
    if (activeValue && option.value === activeValue) {
      option.selected = true;
      if (optionLabel.selected) optionLabel.selected = false;
    }
    select.appendChild(option);
  });

  select.addEventListener("change", function () {
    const selectedValue = this.value;
    updateUrlAndFilter(filterType, selectedValue);
  });
  box.appendChild(select);
};

//------------------------------- //
// creer input checkbox
const createCheckbox = (id, name, box, filter) => {
  const divCheck = document.createElement("div");
  divCheck.classList.add("check-box");
  const input = document.createElement("input");
  input.setAttribute("type", "checkbox");
  input.setAttribute("name", name);
  input.setAttribute("value", id);
  const labelFor = document.createElement("label");
  labelFor.setAttribute("for", name);
  labelFor.innerText = name;

  divCheck.appendChild(input);
  divCheck.appendChild(labelFor);
  box.appendChild(divCheck);

  input.addEventListener("change", function () {
    const checkboxList = box.querySelectorAll('input[type="checkbox"]');
    let activeFilter;

    if (this.checked) {
      activeFilter = this.value;
      checkboxList.forEach((box) => {
        if (box !== this) {
          box.checked = false;
        }
      });
    }
    updateUrlAndFilter(filter, activeFilter);
  });
};

//------------------------------- //
// met à jour l'URL avec le filtre + recharge les produits
const updateUrlAndFilter = (filterType, activeFilter) => {
  const currentUrl = new URL(window.location.href);

  if (activeFilter) {
    currentUrl.searchParams.set(filterType, activeFilter);
  } else {
    currentUrl.searchParams.delete(filterType);
  }

  // met à jour l'URL dans la barre d'adresse sans recharger la page
  window.history.pushState({ path: currentUrl.href }, "", currentUrl.href);

  fetchProduct(activePage).then((data) => {
    let products = data.products;
    const searchParams = new URLSearchParams(window.location.search);

    // recup les produits avec le filtre appliquer
    const subCategoryFilter = searchParams.get("subcategory");
    const tagFilter = searchParams.get("tags");
    const defaultFilter = searchParams.get("default");

    if (defaultFilter) {
      if (defaultFilter === "0") {
        products.sort((a, b) => {
          const priceA = getWhichPrice(a);
          const priceB = getWhichPrice(b);
          return priceA - priceB;
        });
      } else if (defaultFilter === "1") {
        products.sort((a, b) => {
          const priceA = getWhichPrice(a);
          const priceB = getWhichPrice(b);
          return priceB - priceA;
        });
      } else if (defaultFilter === "2") {
        products.sort((a, b) => {
          const ratingA = a.rating_product;
          const ratingB = b.rating_product;
          return ratingB - ratingA;
        });
      }
    }

    if (
      window.location.pathname === "./vue/costumes.php" ||
      window.location.pathname === "./vue/promo.php"
    ) {
      if (subCategoryFilter) {
        products = products.filter(
          (product) =>
            product.sub_category &&
            product.sub_category.id_subcategory.toString() === subCategoryFilter
        );
      }
    }

    if (window.location.pathname === "./vue/accessories.php") {
      if (tagFilter) {
        products = products.filter((product) =>
          product.tag.some(
            (tag) => tag.id_tag != null && tag.id_tag.toString() === tagFilter
          )
        );
      }
    }

    // retour à la page 1
    currentPage = 1;
    location.hash = `#${currentPage}`;

    pageProducts(products, currentPage);

    // recréation de la boite numéro de page
    const existPagesBox = sectionRightCol.querySelector(".pages-box");
    if (existPagesBox) {
      existPagesBox.remove();
    }
    pageNumberButtons(products);
  });
};

//------------------------------- //
// affichage de 12 produits par page
const pageProducts = (products, page) => {
  listallProductBox.innerHTML = "";

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  if (products.length > 0) {
    const paginatedProducts = products.slice(startIndex, endIndex);
    paginatedProducts.forEach((product) => {
      createCard(
        product.category,
        product.image_link,
        product.id_product,
        product.name_product,
        product.price_ttc,
        product.price_discount,
        product.rating_product,
        listallProductBox
      );
    });
  } else {
    const noProduct = document.createElement("div");
    noProduct.innerHTML = `
        <p class="bold">Oops, on dirait bien qu'aucun produit ne correspond à votre recherche.</p>
  `;
    listallProductBox.appendChild(noProduct);
  }
};

//------------------------------- //
// pagination boutons
const pageNumberButtons = (products) => {
  const pagesBox = document.createElement("div");
  pagesBox.classList.add("pages-box");

  const totalPages = Math.ceil(products.length / productsPerPage);
  // console.log(totalPages);

  if (totalPages > 0) {
    // bouton précédent
    const prevButton = document.createElement("a");

    prevButton.classList.add("previous-next");
    prevButton.innerText = "←";
    currentPage === 1
      ? (prevButton.style.visibility = "hidden")
      : (prevButton.style.visibility = "visible");
    prevButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        pagesBox.remove();
        prevButton.setAttribute("href", `#${currentPage}`);
        pageProducts(products, currentPage);
        pageNumberButtons(products);
        header.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    pagesBox.appendChild(prevButton);

    // numéro pages
    for (let page = 1; page <= totalPages; page++) {
      const pageNumberP = document.createElement("a");
      pageNumberP.classList.add("page-number");
      pageNumberP.innerText = page;

      if (page === currentPage) {
        pageNumberP.classList.add("active-page");
      } else {
        pageNumberP.classList.remove("active-page");
      }

      pagesBox.appendChild(pageNumberP);

      pageNumberP.addEventListener("click", () => {
        currentPage = page;
        pagesBox.remove();
        pageNumberP.setAttribute("href", `#${currentPage}`);
        pageProducts(products, currentPage);
        pageNumberButtons(products);
        header.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }

    // bouton suivant
    const nextButton = document.createElement("a");
    nextButton.classList.add("previous-next");
    nextButton.innerText = "→";
    currentPage === totalPages
      ? (nextButton.style.visibility = "hidden")
      : (nextButton.style.visibility = "visible");
    nextButton.addEventListener("click", () => {
      if (currentPage >= 1) {
        currentPage++;
        pagesBox.remove();
        nextButton.setAttribute("href", `#${currentPage}`);
        pageProducts(products, currentPage);
        pageNumberButtons(products);
        header.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
    pagesBox.appendChild(nextButton);
    sectionRightCol.appendChild(pagesBox);
  }
};

// defini si prix discount ou prix classique
const getWhichPrice = (products) => {
  let discountPrice = parseFloat(products.price_discount);
  let price = parseFloat(products.price_ttc);
  if (discountPrice < price) {
    return discountPrice;
  } else {
    return price;
  }
};
