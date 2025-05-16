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

    // change la quantité du produit
    public function changeQuantity($newQuantity, $cartId, $id_product)
    {
        $query = "UPDATE product_cart SET quantity = :quantity WHERE id_cart = :id_cart AND id_product = :id_product";
        $queryStmt = $this->bdd->prepare($query);
        return $queryStmt->execute([
            ':quantity' => $newQuantity,
            ':id_cart' => $cartId,
            ':id_product' => $id_product
        ]);
    }

    // ajoute un produit au panier
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

    // AJOUT AU PANIER: avec recup/creation du panier; quantity modification et ajout au panier
    public function addProductToCart($id_user, $id_product, $price, $quantity = 1): bool
    {
        // récupérer ou créer le panier de l'utilisateur
        $cartId = $this->getCartIdByUser($id_user);
        if ($cartId === null) {
            $cartId = $this->createCart($id_user);
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
            return $this->changeQuantity($newQuantity, $cartId, $id_product);
        } else {
            // sinon ajoute comme un nouvel article
            return $this->addToCart($cartId, $id_product, $quantity, $price);
        }
    }

    // recupère le nombre d'article dans le panier via l'id user
    public function getItemsNumber($id_user): int
    {
        $query = "SELECT SUM(quantity) 
        FROM product_cart
        JOIN cart ON cart.id_cart = product_cart.id_cart
        WHERE cart.id_user = :id_user";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ':id_user' => $id_user
        ]);
        $totalQuantity = $queryStmt->fetchColumn();
        return $totalQuantity === null ? 0 : $totalQuantity;
    }

    // récupère le panier d'un utilisateur via l'id du panier
    public function getCartItems($id_cart): array
    {
        $query = "SELECT cart.id_cart, cart.id_user,
		product_cart.id_product, product_cart.quantity, product_cart.unit_price,
        product.name_product, product.stock, product.image_link, product.category
        FROM cart
        JOIN product_cart ON product_cart.id_cart = cart.id_cart
        JOIN product ON product_cart.id_product = product.id_product
        WHERE cart.id_cart = :id_cart";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":id_cart" => $id_cart
        ]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // supprime un produit du panier
    public function deleteItem($id_product, $id_cart)
    {
        $query = "DELETE FROM product_cart WHERE id_cart = :id_cart AND id_product = :id_product";
        $queryStmt = $this->bdd->prepare($query);
        return $queryStmt->execute([
            ':id_cart' => $id_cart,
            ':id_product' => $id_product
        ]);
    }

    // supprime le panier
    public function clearCart($id_cart)
    {
        $query = "DELETE FROM product_cart WHERE id_cart = :id_cart";
        $stmt = $this->bdd->prepare($query);
        return $stmt->execute([':id_cart' => $id_cart]);
    }
}
