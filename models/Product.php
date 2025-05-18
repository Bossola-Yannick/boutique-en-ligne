<?php

require '../config.php';


include __DIR__ . "/ConnexionBdd.php";

class Product extends ConnexionBdd
{

    public function __construct()
    {
        parent::__construct($this->bdd);
    }

    // recup toutes les infos d'un produit via son id
    public function detail($id): array
    {
        $query = "SELECT 
        product.id_product, product.name_product, product.description, product.stock, 
        product.price_ttc, product.price_discount, product.image_link, product.category, product.rating_product,
        tag.id_tag, tag.name_tag,
        comment.id_comment, comment.rating_comment, comment.comment, comment.date_comment, comment.admin_reply, comment.id_user,
        user.email
        FROM product 
        LEFT JOIN product_tag ON product_tag.id_product = product.id_product        
        LEFT JOIN tag ON tag.id_tag = product_tag.id_tag
        LEFT JOIN comment ON comment.id_product = product.id_product
        LEFT JOIN user ON comment.id_user = user.id_user
        WHERE product.id_product = :id
        ORDER BY comment.date_comment DESC";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute(['id' => $id]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // récup les recommandations via les tags du produit
    public function recommand($tagOne): array
    {
        $query = "SELECT
        tag.id_tag, tag.name_tag, 
        product.id_product, product.name_product, product.price_ttc, product.price_discount, product.image_link, 
        product.category, product.rating_product
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

    // met a jour la note d'un produit
    public function setProductRating($id_product, $rating): void
    {
        $query = "UPDATE product SET product.rating_product = :rating_product
        WHERE product.id_product = :id_product";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":rating_product" => $rating,
            ":id_product" => $id_product
        ]);
    }

    // récup tous les produits
    public function getAllProduct($cat): array
    {
        $query = "SELECT product.id_product, product.name_product, product.description, product.stock, product.price_ht,
        product.price_ttc, product.price_discount, product.image_link, product.category, product.rating_product,
        tag.id_tag, tag.name_tag,
        sub_category.id_subcategory, sub_category.name_subcategory
        FROM product 
        LEFT JOIN product_tag ON product_tag.id_product = product.id_product
        LEFT JOIN tag ON tag.id_tag = product_tag.id_tag
        JOIN sub_category ON product.id_subcategory = sub_category.id_subcategory
        WHERE product.category = :category";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":category" => $cat
        ]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // récup toutes les promos
    public function getAllPromo(): array
    {
        $query = "SELECT product.id_product, product.name_product, product.description, product.stock, 
        product.price_ttc, product.price_discount, product.image_link, product.category, product.rating_product,
        tag.id_tag, tag.name_tag,
        sub_category.id_subcategory, sub_category.name_subcategory
        FROM product 
        LEFT JOIN product_tag ON product_tag.id_product = product.id_product
        LEFT JOIN tag ON tag.id_tag = product_tag.id_tag
        JOIN sub_category ON product.id_subcategory = sub_category.id_subcategory
        WHERE product.price_discount < product.price_ttc";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute();
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // récup toutes les sous catégories
    public function getSubCategories(): array
    {
        $query = "SELECT sub_category.id_subcategory, sub_category.name_subcategory
        FROM sub_category";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute();
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // récup tous les tags
    public function getTags(): array
    {
        $query = "SELECT tag.id_tag, tag.name_tag
        FROM tag";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute();
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // supprimer un produit
    public function deleteProduct($idProduct)
    {
        $query = "DELETE FROM product WHERE product.id_product = :id ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":id" => $idProduct
        ]);
    }

    // ajout de produit
    public function createProduct($name, $description, $stock, $priceHt, $priceTtc, $priceDiscount, $imageLink, $category, $subCategoryId, $rating)
    {
        $query = "INSERT INTO product(name_product, description, stock, price_ht, price_ttc, price_discount, image_link, category, id_subcategory, rating_product) VALUES (:name_product , :description,:stock,:price_ht,:price_ttc,:price_discount,:image_link,:category,:id_subcategory,:rating_product)";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ':name_product' => $name,
            ':description' => $description,
            ':stock' => $stock,
            ':price_ht' => $priceHt,
            ':price_ttc' => $priceTtc,
            ':price_discount' => $priceDiscount,
            ':image_link' => $imageLink,
            ':category' => $category,
            ':id_subcategory' => $subCategoryId,
            ':rating_product' => $rating
        ]);
    }
    // modification de produit
    public function updateProduct($id, $name, $description, $stock, $priceHt, $priceTtc, $priceDiscount, $imageLink, $category, $subCategoryId, $rating)
    {
        $query = "UPDATE product SET name_product = :name_product, description= :description, stock= :stock , price_ht= :price_ht, price_ttc= :price_ttc , price_discount= :price_discount, image_link= :image_link , category= :category , id_subcategory= :id_subcategory, rating_product= :rating_product WHERE product.id_product = :id";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ':name_product' => $name,
            ':description' => $description,
            ':stock' => $stock,
            ':price_ht' => $priceHt,
            ':price_ttc' => $priceTtc,
            ':price_discount' => $priceDiscount,
            ':image_link' => $imageLink,
            ':category' => $category,
            ':id_subcategory' => $subCategoryId,
            ':rating_product' => $rating,
            ':id' => $id
        ]);
    }
}
