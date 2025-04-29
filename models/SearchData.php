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
        $query = "SELECT name_product FROM product WHERE name_product LIKE :name LIMIT 5";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute(['name' => "%$name%"]);
        return $queryStmt->fetchAll(PDO::FETCH_ASSOC);
    }
}

$resultSearch = new Search();

if (isset($_POST['search'])) {
    $search = trim($_POST['search']);

    if (!empty($search)) {
        $result = $resultSearch->search($search);
        foreach ($results as $result) {
            echo '<li onclick="fill(\'' . $result['name_product'] . '\')">';
            echo '<a href="../vue/detail.php">' . $result['name_product'] . '</a></li>';
        }
    }
}
