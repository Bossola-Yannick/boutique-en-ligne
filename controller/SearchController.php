<?php

require_once '../models/SearchData.php';

$searchProduct = isset($_GET['search']) ? urldecode($_GET['search']) : '';

$resultSearch = new Search();
$listResult = $resultSearch->search($searchProduct);

echo json_encode($listResult);
