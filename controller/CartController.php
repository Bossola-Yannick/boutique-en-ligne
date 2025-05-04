<?php


session_start();

header('Content-Type: application/json');

$response = ['success' => false, 'message' => 'Erreur serveur initiale.'];

require_once '../models/Cart.php';

if (isset($_POST['add-to-cart'])) {
    // récup hidden input
    $id_product = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
    $price = filter_input(INPUT_POST, 'price_product', FILTER_VALIDATE_FLOAT);

    // Vérifier si l'utilisateur est connecté
    if (!isset($_SESSION["user_id"])) {
        $response['message'] = 'Utilisateur non connecté.';
    } else {
        $id_user = $_SESSION["user_id"];
        $quantity = 1;

        if ($id_user && $id_product && $price !== false && $price >= 0) {
            $cart = new Cart();
            $cartUser = $cart->addProductToCart($id_user, $id_product, $price, $quantity);
            if ($cartUser) {
                $response['success'] = true;
                $response['message'] = 'Produit ajouté au panier !';
            } else {
                $response['message'] = "Erreur lors de l'ajout du produit au panier.";
            }
        } else {
            $response['message'] = "Erreur - données invalide";
        }
    }
}

echo json_encode($response);
exit;
