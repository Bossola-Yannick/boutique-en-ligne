<?php
session_start();

header('Content-Type: application/json');

$response = ['success' => false, 'message' => 'Erreur serveur initiale.', 'cart_items' => 0, 'products' => []];

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
            $cartProducts = $cart->getCartItems($cart->getCartIdByUser($id_user));

            if ($cartUser) {
                $response['success'] = true;
                $response['message'] = 'Produit ajouté au panier !';
                $response['cart_items'] = $cartItems;
                $response['products'] = $cartProducts;
            } else {
                $response['success'] = false;
                $response['message'] = "Erreur lors de l'ajout du produit au panier.";
                $response['cart_items'] = $cartItems;
                $response['products'] = [];
            }
        } else {
            $response['success'] = false;
            $response['message'] = "Erreur - données invalides";
            if (isset($id_user)) {
                $response['cart_items'] = $cart->getItemsNumber($id_user);
                $response['products'] = [];
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

if (isset($_GET['action']) && $_GET['action'] === 'update_quantity') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_SESSION["userId"])) {
            $response['success'] = false;
            $response['message'] = 'Utilisateur non connecté.';
        } else {
            $id_user = $_SESSION["userId"];
            // Récupérer les données JSON de la requête
            $json_data = file_get_contents('php://input');
            $data = json_decode($json_data, true);

            $id_product = isset($data['product_id']) ? filter_var($data['product_id'], FILTER_VALIDATE_INT) : null;
            $quantity = isset($data['quantity']) ? filter_var($data['quantity'], FILTER_VALIDATE_INT) : null;

            if ($id_product && $quantity !== null && $quantity >= 1) {
                $cart = new Cart();
                $id_cart = $cart->getCartIdByUser($id_user);

                if ($id_cart) {
                    // La méthode addQuantity dans Cart.php met à jour la quantité existante
                    if ($cart->changeQuantity($quantity, $id_cart, $id_product)) {
                        $response['success'] = true;
                        $response['message'] = 'Quantité mise à jour avec succès.';
                        $response['cart_items'] = $cart->getItemsNumber($id_user);
                        $response['products'] = $cart->getCartItems($id_cart);
                    } else {
                        $response['success'] = false;
                        $response['message'] = 'Erreur lors de la mise à jour de la quantité.';
                        $response['cart_items'] = $cart->getItemsNumber($id_user);
                        $response['products'] = [];
                    }
                } else {
                    $response['success'] = false;
                    $response['message'] = 'Panier non trouvé pour cet utilisateur.';
                    $response['cart_items'] = 0;
                    $response['products'] = [];
                }
            } else {
                $response['success'] = false;
                $response['message'] = 'Données invalides pour la mise à jour de la quantité.';
                if (isset($id_user)) {
                    $cart = new Cart();
                    $response['cart_items'] = $cart->getItemsNumber($id_user);
                    $response['products'] = [];
                }
            }
        }
    } else {
        $response['success'] = false;
        $response['message'] = 'Méthode de requête non autorisée.';
    }
}

if (isset($_GET['action']) && $_GET['action'] === 'delete_item') {
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (!isset($_SESSION["userId"])) {
            $response['success'] = false;
            $response['message'] = 'Utilisateur non connecté.';
        } else {
            $id_user = $_SESSION["userId"];
            // Récupérer les données JSON de la requête
            $json_data = file_get_contents('php://input');
            $data = json_decode($json_data, true);

            $id_product = isset($data['product_id']) ? filter_var($data['product_id'], FILTER_VALIDATE_INT) : null;

            if ($id_product) {
                $cart = new Cart();
                $id_cart = $cart->getCartIdByUser($id_user);

                if ($id_cart) {

                    if ($cart->deleteItem($id_product, $id_cart)) {
                        $response['success'] = true;
                        $response['message'] = 'Produit supprimé avec succès.';
                        $response['cart_items'] = $cart->getItemsNumber($id_user);
                        $response['products'] = $cart->getCartItems($id_cart);
                    } else {
                        $response['success'] = false;
                        $response['message'] = 'Erreur lors de la mise à jour de la quantité.';
                        $response['cart_items'] = $cart->getItemsNumber($id_user);
                        $response['products'] = [];
                    }
                } else {
                    $response['success'] = false;
                    $response['message'] = 'Panier non trouvé pour cet utilisateur.';
                    $response['cart_items'] = 0;
                    $response['products'] = [];
                }
            } else {
                $response['success'] = false;
                $response['message'] = 'Données invalides pour la mise à jour de la quantité.';
                if (isset($id_user)) {
                    $cart = new Cart();
                    $response['cart_items'] = $cart->getItemsNumber($id_user);
                    $response['products'] = [];
                }
            }
        }
    } else {
        $response['success'] = false;
        $response['message'] = 'Méthode de requête non autorisée.';
    }
}

echo json_encode($response);
exit;
