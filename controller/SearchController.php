<?php

require_once '../models/SearchData.php';

$resultSearch = new Search();

if (isset($_POST['search'])) {
    $search = trim($_POST['search']);

    if (!empty($search)) {
        $results = $resultSearch->search($search);
        foreach ($results as $result) {
            echo '<li onclick="fill(\'' . htmlspecialchars($result['name_product']) . '\')">';
            echo '<a href="../vue/detail.php">' . htmlspecialchars($result['name_product']) . '</a></li>';
        }
    }
}
