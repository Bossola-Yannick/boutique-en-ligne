const productName = window.location.search;

// elements
const productBox = document.getElementById("product-box");
const recommandBox = document.getElementById("recommand-box");
const commentsBox = document.getElementById("comments-box");

fetch(`../controller/DetailController.php${productName}`, {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((res) => res.json())
  .then((data) => {
    let product = data.product;
    let tags = data.tags;
    let comments = data.comments;

    console.log(product);
    console.log(tags);
    console.log(comments);
  })
  .catch((error) => console.error("Erreur fetch :", error));

const productDesc = () => {};
