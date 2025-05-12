<?php
session_start();

header('Content-Type: application/json');

$response = ['success' => false, 'message' => 'Erreur serveur initiale.', 'cart_items' => 0];

require_once '../models/Cart.php';

// ajoute produit au panier
if (isset($_POST['add-to-cart'])) {
    // récup hidden input
    $id_product = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
    $price = filter_input(INPUT_POST, 'price_product', FILTER_VALIDATE_FLOAT);

    // vérifie si l'utilisateur est connecté
    if (!isset($_SESSION["userId"])) {
        $response['success'] = false;
        $response['message'] = 'Non connecté.';
    } else {
        $id_user = $_SESSION["userId"];
        $quantity = 1;

        if ($id_user && $id_product && $price !== false && $price >= 0) {
            $cart = new Cart();
            $cartUser = $cart->addProductToCart($id_user, $id_product, $price, $quantity);
            $cartItems = $cart->getItemsNumber($id_user);

            if ($cartUser) {
                $response['success'] = true;
                $response['message'] = 'Produit ajouté au panier !';
                $response['cart_items'] = $cartItems;
            } else {
                $response['success'] = false;
                $response['message'] = "Erreur lors de l'ajout du produit au panier.";
                $response['cart_items'] = $cart->getItemsNumber($id_user);
            }
        } else {
            $response['success'] = false;
            $response['message'] = "Erreur - données invalides";
            if (isset($id_user)) {
                $response['cart_items'] = $cart->getItemsNumber($id_user);
            }
        }
    }
}

// récupère les articles du panier pour l'affichage
if (isset($_GET['action']) && $_GET['action'] === 'get_cart_items') {
    if (!isset($_SESSION["userId"])) {
        $response['success'] = false;
        $response['message'] = 'Utilisateur non connecté.';
    } else {
        $id_user = $_SESSION["userId"];
        $cart = new Cart();
        $id_cart = $cart->getCartIdByUser($id_user);

        if ($id_cart) {
            $cartProducts = $cart->getCartItems($id_cart);
            $cartItemsCount = $cart->getItemsNumber($id_user);

            if ($cartProducts) {
                $response['success'] = true;
                $response['message'] = 'Articles du panier récupérés.';
                $response['products'] = $cartProducts;
                $response['cart_items'] = $cartItemsCount;
            } else {
                $response['success'] = true;
                $response['message'] = 'Votre panier est vide.';
                $response['products'] = [];
                $response['cart_items'] = 0;
            }
        } else {
            $response['success'] = true;
            $response['message'] = 'Aucun panier trouvé pour cet utilisateur. Votre panier est vide.';
            $response['products'] = [];
            $response['cart_items'] = 0;
        }
    }
}

echo json_encode($response);
exit;
