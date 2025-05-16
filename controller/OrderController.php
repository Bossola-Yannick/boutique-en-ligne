<?php
session_start();
require_once '../models/Cart.php';
require_once '../models/Order.php';

header('Content-Type: application/json');

if (!isset($_SESSION['userId'])) {
    echo json_encode(['success' => false, 'message' => 'Utilisateur non connecté.']);
    exit;
}

$id_user = $_SESSION['userId'];
$cart = new Cart();
$id_cart = $cart->getCartIdByUser($id_user);
$cartProducts = $cart->getCartItems($id_cart);

if (!$cartProducts || count($cartProducts) === 0) {
    echo json_encode(['success' => false, 'message' => 'Panier vide.']);
    exit;
}

// Créer la commande
require_once '../models/Order.php';
$order = new Order();
$id_order = $order->createOrder($id_user);

if (!$id_order) {
    echo json_encode(['success' => false, 'message' => 'Erreur création commande.']);
    exit;
}

// Copier les produits du panier dans product_orders
foreach ($cartProducts as $prod) {
    $order->addProductToOrder($id_order, $prod['id_product'], $prod['quantity'], $prod['unit_price']);
}

// Vider le panier
$cart->clearCart($id_cart);

echo json_encode(['success' => true, 'message' => 'Commande enregistrée.']);
exit;
