<?php

require_once '../models/Product.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';
$product = new Product();

switch ($action) {
    case 'detail':

        $productClicked = isset($_GET['product']) ? urldecode($_GET['product']) : '';
        $productInfos = $product->detail($productClicked);

        $allInfos = [
            "product" => [],
            "tags" => [],
            "comments" => [],
            "recommand" => []
        ];

        // variables pour traiter les doublons
        $dubTag = [];
        $dubComment = [];

        // ratings
        $allRatings = 0;
        $countComment = 0;

        // récupère les infos du produit, ses tags et ses commentaires
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

            if (!$info['comment']) {
                $allInfos["comments"] = null;
            } elseif (!in_array($info['comment'], $dubComment)) {
                $dubComment[] = $info['comment'];
                $allInfos["comments"][] = [
                    "id_comment" => $info['id_comment'],
                    "rating_comment" => $info['rating_comment'],
                    "comment" => $info['comment'],
                    "date_comment" => $info['date_comment'],
                    "admin_reply" => $info['admin_reply'],
                    "id_user" => $info['id_user'],
                    "email" => $info['email']
                ];
                $allRatings += $info['rating_comment'];
                $countComment++;
            }
        }

        foreach ($allInfos['tags'] as $tag) {
            $recommand = $product->recommand($tag);
            foreach ($recommand as $value) {
                $allInfos['recommand'][] =
                    $value;
            }
        }

        if ($allRatings > 0 && $countComment > 0) {
            $ratingProduct = round($allRatings / $countComment, 2);
            $allInfos["product"]['rating_product'] = $ratingProduct;

            $product->setProductRating($productClicked, $ratingProduct);
        }

        echo json_encode($allInfos);
        break;

    case 'costumes':
        $costumes = $product->getAllCostume();

        $allCostumes = [];

        foreach ($costumes as $info) {
            $id = $info['id_product'];

            if (!isset($allCostumes[$id])) {
                $allCostumes[$id] = [
                    "id_product" => $info['id_product'],
                    "name_product" => $info['name_product'],
                    "description" => $info['description'],
                    "stock" => $info['stock'],
                    "price_ttc" => $info['price_ttc'],
                    "price_discount" => $info['price_discount'],
                    "image_link" => $info['image_link'],
                    "category" => $info['category'],
                    "rating_product" => $info['rating_product'],
                    "name_tag" => [],
                    "sub_category" => [
                        $info['id_subcategory'] => $info['name_subcategory']
                    ]
                ];
            }

            if (!empty($info['id_tag']) && !empty($info['name_tag'])) {
                $allCostumes[$id]['name_tag'][] = [
                    "id_tag" => $info['id_tag'],
                    "name_tag" => $info['name_tag']
                ];
            }
        }

        echo json_encode($allCostumes);
        break;
}
