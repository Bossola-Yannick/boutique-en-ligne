<?php

require_once '../models/SearchData.php';

$resultSearch = new Search();

if (isset($_POST['search'])) {
    $search = trim($_POST['search']);

    if (!empty($search)) {
        $results = $resultSearch->search($search);
        foreach ($results as $result) {
            echo '<li class="search-result" "onclick="fill(' . htmlspecialchars($result['name_product']) . ')">';
            if ($result['category'] === "déguisement") {
                echo '<img class="img-product" src="../assets/images/cosplay/' . $result['image_link'] . ' "/>';
            } else {
                echo '<img class="img-product" src="../assets/images/accessories/' . $result['image_link'] . ' "/>';
            }
            echo '<p>' . htmlspecialchars($result['name_product']) . '</p></li>';
        }
    }
}
