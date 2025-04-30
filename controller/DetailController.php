<?php

require_once '../models/Detail.php';

$productClicked = isset($_GET['product']) ? urldecode($_GET['product']) : '';

$product = new Detail();
$productInfos = $product->detail($productClicked);
// $productInfos = $product->detail("Fée");

$allInfos = [
    "product" => [],
    "tags" => [],
    "comments" => [],
    "recommand" => []
];

$dubTag = [];
$dubComment = [];

foreach ($productInfos as $info) {

    if (empty($allInfos["product"])) {

        $allInfos["product"] = [
            "id_product" => $info['id_product'],
            "name_product" => $info['name_product'],
            "description" => $info['description'],
            "stock" => $info['stock'],
            "price_ttc" => $info['price_ttc'],
            "price_discount" => $info['price_discount'],
            "image_link" => $info['image_link'],
            "category" => $info['category'],
            "rating_product" => $info['rating_product']
        ];
    }


    if (!in_array($info['name_tag'], $dubTag)) {
        $dubTag[] = $info['name_tag'];
        $allInfos["tags"][] = $info['name_tag'];
    }

    if (!in_array($info['comment'], $dubComment)) {
        $dubComment[] = $info['comment'];
        $allInfos["comments"][] = [
            "rating_comment" => $info['rating_comment'],
            "comment" => $info['comment'],
            "date_comment" => $info['date_comment'],
            "admin_reply" => $info['admin_reply'],
            "id_user" => $info['id_user'],
            "email" => $info['email']
        ];
    }
}

// recupération des produits similaires
$tagOne = $allInfos['tags'][0];
$tagTwo = $allInfos['tags'][1];

$recommand = $product->recommand($tagOne, $tagTwo);
foreach ($recommand as $value) {
    $allInfos['recommand'][] =
        $value;
}

echo json_encode($allInfos);
