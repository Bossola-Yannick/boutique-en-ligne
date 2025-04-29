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
    fetch("../models/SearchData.php", {
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
      })
      .catch((error) => {
        console.error("Erreur search:", error);
      });
  }
});
