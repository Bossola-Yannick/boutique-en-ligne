function fill(value) {
  document.getElementById("search").value = value;
  document.getElementById("display-result").style.display = "none";
}

const searchInput = document.getElementById("search");
const displayDiv = document.getElementById("display-result");

searchInput.addEventListener("input", function () {
  const name = searchInput.value;

  if (name === "") {
    displayDiv.innerHTML = "";
  } else {
    fetch("../controller/SearchController.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "search=" + encodeURIComponent(name),
    })
      .then((response) => response.text())
      .then((html) => {
        displayDiv.innerHTML = html;
        displayDiv.style.display = "block";
        let resultSearch = Array.from(displayDiv.children);
        // console.log(displayDiv.children);
        resultSearch.forEach((element) => {
          element.addEventListener("click", () => {
            let detail = encodeURIComponent(element.textContent);
            window.location.href = `../vue/detail.php?product=${detail}`;
          });
        });
      })
      .catch((error) => {
        console.error("Erreur search:", error);
      });
  }
});
