<?php
require_once '../models/Product.php';
header('Content-Type: application/json');

$costumes = new Product();
$costumes = $costumes->getAllProduct("déguisement");
$accessories = new Product();
$accessories = $accessories->getAllProduct("accessoire");
