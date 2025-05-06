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
  //------------------------------- //
  // déguisements
  fetchProduct("costumes").then((data) => {
    const allCostumes = data.products;

    // change titre page (onglet)
    documentName.innerText = "Déguisements";

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
        filterSubCat
      );
    });
    // allTags.forEach((element) => {
    //   createCheckbox(element.id_tag, element.name_tag, filterTag);
    // });
  });
}

//------------------------------- //
// creer input checkbox
const createCheckbox = (id, name, box) => {
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
    if (this.checked) {
      console.log(e.target.value);
      checkboxList.forEach((box) => {
        if (box !== this) {
          box.checked = false;
        }
      });
    } else {
      console.log("not checked");
    }
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
