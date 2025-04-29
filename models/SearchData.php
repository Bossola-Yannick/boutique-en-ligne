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
        $query = "SELECT name_product, image_link, category FROM product WHERE name_product LIKE :name LIMIT 5";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute(['name' => "%$name%"]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
