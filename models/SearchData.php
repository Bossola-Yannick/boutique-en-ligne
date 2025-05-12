<?php

require '../config.php';


include __DIR__ . "/ConnexionBdd.php";

class Search extends ConnexionBdd
{

    public function __construct()
    {
        parent::__construct($this->bdd);
    }

    public function search($name)
    {
        $query = "SELECT product.id_product, product.name_product, product.image_link, product.category FROM product WHERE product.name_product LIKE :name LIMIT 5";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute(['name' => "%$name%"]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
