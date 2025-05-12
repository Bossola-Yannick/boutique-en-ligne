const searchInput = document.getElementById("search");
const displayDiv = document.getElementById("display-result");

searchInput.addEventListener("input", function () {
  const name = searchInput.value.trim();

  if (name === "") {
    displayDiv.innerHTML = "";
  } else {
    fetch(
      `../controller/SearchController.php?search=${encodeURIComponent(name)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        displayDiv.innerHTML = "";
        data.forEach((element) => {
          searchResult(
            element.id_product,
            element.name_product,
            element.image_link,
            element.category
          );
        });
        let resultSearch = Array.from(displayDiv.children);
        resultSearch.forEach((element) => {
          element.addEventListener("click", () => {
            let detailId = element.getAttribute("value");
            window.location.href = `../vue/detail.php?product=${detailId}`;
          });
        });
      })
      .catch((error) => {
        console.error("Erreur search:", error);
      });
  }
});

const searchResult = (id_product, name_product, image_link, category) => {
  const result = document.createElement("li");
  result.classList.add("search-result");
  result.setAttribute("value", id_product);

  const resultImg = document.createElement("img");
  resultImg.classList.add("img-product");
  if (category === "déguisement") {
    resultImg.setAttribute("src", `../assets/images/cosplay/${image_link}`);
  } else {
    resultImg.setAttribute("src", `../assets/images/accessories/${image_link}`);
  }

  result.appendChild(resultImg);
  result.innerText = name_product;
  displayDiv.appendChild(result);
};
