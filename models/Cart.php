<?php

require_once '../config.php';
require_once __DIR__ . "/ConnexionBdd.php";

class Cart extends ConnexionBdd
{

    public function __construct()
    {
        parent::__construct($this->bdd);
    }

    // récupère le panier si existant
    public function getCartIdByUser($id_user): ?int
    {
        $query = "SELECT id_cart 
                  FROM cart
                  WHERE id_user = :id_user
                  LIMIT 1";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([":id_user" => $id_user]);
        $result = $queryStmt->fetchColumn();

        return $result === false ? null : $result;
    }

    // créer un panier
    public function createCart($id_user)
    {
        $query = "INSERT INTO cart (id_user) VALUES (:id_user)";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([":id_user" => $id_user]);

        if ($queryStmt) {
            return $this->bdd->lastInsertId();
        } else {
            return false;
        }
    }

    // change la quantité
    public function addQuantity($newQuantity, $cartId, $id_product)
    {
        $query = "UPDATE product_cart SET quantity = :quantity WHERE id_cart = :id_cart AND id_product = :id_product";
        $queryStmt = $this->bdd->prepare($query);
        return $queryStmt->execute([
            ':quantity' => $newQuantity,
            ':id_cart' => $cartId,
            ':id_product' => $id_product
        ]);
    }

    public function addToCart($cartId, $id_product, $quantity, $unit_price)
    {
        $query = "INSERT INTO product_cart (id_cart, id_product, quantity, unit_price) VALUES (:id_cart, :id_product, :quantity, :unit_price)";
        $queryStmt = $this->bdd->prepare($query);
        return $queryStmt->execute([
            ':id_cart' => $cartId,
            ':id_product' => $id_product,
            ':quantity' => $quantity,
            ':unit_price' => $unit_price
        ]);
    }

    // ajouter au panier
    public function addProductToCart($id_user, $id_product, $price, $quantity = 1): bool
    {
        // récupérer ou créer le panier de l'utilisateur
        $cartId = $this->getCartIdByUser($id_user);
        if ($cartId === null) {
            $cartId = $this->createCart($id_user);
            if ($cartId === false) {
                error_log("Échec de la récupération/création du panier pour l'utilisateur ID: " . $id_user);
                return false;
            }
        }
        // vérifie si le produit existe deja dans le panier
        $query = "SELECT quantity FROM product_cart WHERE id_cart = :id_cart AND id_product = :id_product";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ':id_cart' => $cartId,
            ':id_product' => $id_product
        ]);
        $existingQuantity = $queryStmt->fetchColumn();

        if ($existingQuantity !== false) {
            // met à jour la quantité
            $newQuantity = $existingQuantity + $quantity;
            return $this->addQuantity($newQuantity, $cartId, $id_product);
        } else {
            // sinon ajoute comme un nouvel article
            return $this->addToCart($cartId, $id_product, $quantity, $price);
        }
    }

    // --- Autres méthodes potentielles ---
    // getCartContent(int $id_user)
    // updateProductQuantity(int $id_user, int $id_product, int $new_quantity)
    // removeProductFromCart(int $id_user, int $id_product)
    // deleteCart(int $id_user)
    // getTotalCartAmount(int $id_user)
}
