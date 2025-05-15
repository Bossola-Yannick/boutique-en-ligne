<?php
require_once '../config.php';
require_once __DIR__ . "/ConnexionBdd.php";

class Order extends ConnexionBdd
{

    // génère un numéro de commande unique
    public function generateUniqueOrderNumber()
    {
        // génère un identifiant basé sur la date, l'heure et un hash court
        $datePart = date('YmdHis'); // Ex: 20240515 + heureminuteseconde
        $randomPart = strtoupper(substr(bin2hex(random_bytes(3)), 0, 6)); // 6 caractères hexadécimaux
        $num_order = $datePart . '-' . $randomPart;

        // vérifie l'unicité dans la base 
        $query = "SELECT COUNT(*) FROM orders WHERE num_order = :num_order";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute([':num_order' => $num_order]);
        $exists = $stmt->fetchColumn();

        // s'il existe déjà, on refait
        if ($exists > 0) {
            return $this->generateUniqueOrderNumber();
        }

        return $num_order;
    }

    // créer la commande
    public function createOrder($id_user)
    {
        $num_order = $this->generateUniqueOrderNumber();
        $date_order = date('Y-m-d');
        $query = "INSERT INTO orders (num_order, date_order, id_user) VALUES (:num_order, :date_order, :id_user)";
        $stmt = $this->bdd->prepare($query);
        $stmt->execute([
            ':num_order' => $num_order,
            ':date_order' => $date_order,
            ':id_user' => $id_user
        ]);
        return $this->bdd->lastInsertId();
    }

    // ajoute les produits du panier à la commande
    public function addProductToOrder($id_order, $id_product, $quantity, $unit_price)
    {
        $query = "INSERT INTO product_orders (id_order, id_product, quantity, unit_price) VALUES (:id_order, :id_product, :quantity, :unit_price)";
        $stmt = $this->bdd->prepare($query);
        return $stmt->execute([
            ':id_order' => $id_order,
            ':id_product' => $id_product,
            ':quantity' => $quantity,
            ':unit_price' => $unit_price
        ]);
    }
}
