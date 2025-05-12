if (window.location.pathname === "/boutique-en-ligne/vue/cart.php") {
  documentName.innerText = "Mon panier";
  fetch(`../controller/CartController.php?action=get_cart_items`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
}
