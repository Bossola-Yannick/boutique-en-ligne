if (window.location.pathname === "/boutique-en-ligne/vue/costume.php") {
  fetch(`../controller/ProductController.php?action=costumes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })

    .catch((error) => console.error("Erreur fetch :", error));
}
