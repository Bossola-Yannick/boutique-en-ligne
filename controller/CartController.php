<?php
session_start();
require_once '../models/Cart.php';

if (isset($_POST['add-to-cart'])) {
    // récup hidden input
    $id_product = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
    $price = filter_input(INPUT_POST, 'price_product', FILTER_VALIDATE_FLOAT);

    $id_user = $_SESSION["user_id"];
    $quantity = 1;

    if ($id_user && $id_product && $price) {
        $cart = new Cart();
        $cartUser = $cart->addProductToCart($id_user, $id_product, $price, $quantity);
        if ($cartUser) {
            echo "Produit ajouté au panier !";
            // Rediriger ou afficher un message de succès
        } else {
            echo "Erreur lors de l'ajout au panier.";
            // Gérer l'erreur
        }
    } else {
        echo "id_product: " . $id_product;
        echo "<br>";
        echo "price: " . $price;
        echo "<br>";
        echo "id_user: " . $id_user;
        echo "<br>";
        echo "Données manquantes pour ajouter au panier.";
    }

    // Pour l'instant, on garde l'echo de débogage si la clé existe
    echo $_POST['add-to-cart'];
} else {
    // Optionnel: Gérer le cas où la clé n'existe pas (ex: accès direct au script)
    // echo "Aucune action d'ajout au panier détectée.";
    // header('Location: ../index.php'); // Rediriger par exemple
    // exit;
}
