const header = document.querySelector("header");
const sectionRightCol = document.getElementById("right-col");
const listAllCostumesBox = document.querySelector(".list-all-costumes");
const filterSubCat = document.querySelector(".filter-by-subcategory");
const filterTag = document.querySelector(".filter-by-tag");

let currentPage;
let pageHash = location.hash.split("#")[1];
if (pageHash) {
  currentPage = pageHash;
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

if (window.location.pathname === "/boutique-en-ligne/vue/costumes.php") {
  // change titre page (onglet)
  documentName.innerText = "Déguisements";

  //------------------------------- //
  // déguisements
  fetchProduct("costumes").then((data) => {
    let allCostumes = data.products;

    // applique les filtres de l'URL
    const searchParams = new URLSearchParams(window.location.search);
    const subCategoryFilter = searchParams.get("subcategory");

    if (subCategoryFilter) {
      allCostumes = allCostumes.filter(
        (product) =>
          product.sub_category &&
          product.sub_category.id_subcategory.toString() === subCategoryFilter
      );
    }

    console.log(allCostumes);
    // pagination
    pageProducts(allCostumes, currentPage);
    pageNumberButtons(allCostumes);
  });

  //------------------------------- //
  // filters
  fetchProduct("filter").then((data) => {
    const allSubCat = data.sub_category;
    const allTags = data.tags;
    console.log(allSubCat);
    console.log(allTags);

    allSubCat.forEach((element) => {
      createCheckbox(
        element.id_subcategory,
        element.name_subcategory,
        filterSubCat,
        "subcategory"
      );
    });

    // coche les filtres si présents dans l'URL
    const searchParams = new URLSearchParams(window.location.search);
    const activeSubCategory = searchParams.get("subcategory");

    if (activeSubCategory) {
      const checkboxToSelect = filterSubCat.querySelector(
        `input[type="checkbox"][value="${activeSubCategory}"]`
      );
      if (checkboxToSelect) checkboxToSelect.checked = true;
    }
  });
}

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

  input.addEventListener("change", function (e) {
    const checkboxList = box.querySelectorAll('input[type="checkbox"]');
    let activeFilter;

    if (this.checked) {
      activeFilter = this.value;
      console.log(this.value);
      checkboxList.forEach((box) => {
        if (box !== this) {
          box.checked = false;
        }
      });
    } else {
      console.log("not checked");
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

  fetchProduct("costumes").then((data) => {
    let filteredProduct = data.products;
    const searchParams = new URLSearchParams(window.location.search);

    // recup les produits avec le filtre appliquer
    const subCategoryFilter = searchParams.get("subcategory");

    if (subCategoryFilter) {
      filteredProduct = filteredProduct.filter(
        (product) =>
          product.sub_category &&
          product.sub_category.id_subcategory.toString() === subCategoryFilter
      );
    }

    // retour à la page 1
    currentPage = 1;
    location.hash = `#${currentPage}`;

    pageProducts(filteredProduct, currentPage);

    // recréation de la boite numéro de page
    const existPagesBox = sectionRightCol.querySelector(".pages-box");
    if (existPagesBox) {
      existPagesBox.remove();
    }
    pageNumberButtons(filteredProduct);
  });
};

//------------------------------- //
// affichage de 12 produits par page
const pageProducts = (products, page) => {
  listAllCostumesBox.innerHTML = "";

  const startIndex = (page - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  const paginatedProducts = products.slice(startIndex, endIndex);
  paginatedProducts.forEach((product) => {
    createCard(
      product.category,
      product.image_link,
      product.id_product,
      product.name_product,
      product.price_ttc,
      product.price_discount,
      listAllCostumesBox
    );
  });
};

//------------------------------- //
// pagination boutons
const pageNumberButtons = (products) => {
  const pagesBox = document.createElement("div");
  pagesBox.classList.add("pages-box");

  const totalPages = Math.ceil(products.length / productsPerPage);

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
};
