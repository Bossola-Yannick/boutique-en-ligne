<?php

require '../config.php';


include __DIR__ . "/ConnexionBdd.php";

class Product extends ConnexionBdd
{

    public function __construct()
    {
        parent::__construct($this->bdd);
    }

    public function detail($id): array
    {
        $query = "SELECT 
        product.id_product, product.name_product, product.description, product.stock, 
        product.price_ttc, product.price_discount, product.image_link, product.category, product.rating_product,
        tag.id_tag, tag.name_tag,
        comment.rating_comment, comment.comment, comment.date_comment, comment.admin_reply, comment.id_user,
        user.email
        FROM product 
        LEFT JOIN product_tag ON product_tag.id_product = product.id_product        
        LEFT JOIN tag ON tag.id_tag = product_tag.id_tag
        LEFT JOIN comment ON comment.id_product = product.id_product
        LEFT JOIN user ON comment.id_user = user.id_user
        WHERE product.id_product = :id";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute(['id' => $id]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function recommand($tagOne): array
    {
        $query = "SELECT
        tag.id_tag, tag.name_tag, 
        product.id_product, product.name_product, product.price_ttc, product.price_discount, product.image_link, product.category
        FROM tag
        JOIN product_tag ON product_tag.id_tag = tag.id_tag
        JOIN product ON product_tag.id_product = product.id_product
        WHERE tag.name_tag IN (:tagOne) AND product.stock > 0
        GROUP BY product.id_product, product.name_product, product.price_ttc, product.price_discount, product.image_link
        ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute(
            [
                'tagOne' => $tagOne
            ]
        );
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProduct($name)
    {
        $query = "SELECT
        product.id_product, product.name_product, product.price_ttc, product.price_discount, product.image_link, product.category
        FROM product
        WHERE product.name_product = :name
        ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ':name' => $name
        ]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getProductName($id)
    {
        $query = "SELECT
        product.id_product, product.name_product
        FROM product
        WHERE product.id_product = :id
        ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ':id' => $id
        ]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
