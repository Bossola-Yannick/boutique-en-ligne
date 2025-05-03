<?php

session_start();
require_once '../models/Comment.php';
require_once '../models/Product.php';



if (isset($_POST['send-comment'])) {
    $productId = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
    $commentText = trim($_POST['comment-text'] ?? '');
    $userId = $_SESSION['user_id'] ?? null;
    $ratingComment = $_POST['comment-rating'];

    if (empty($commentText)) {
        $_SESSION["comment-error"] = "Le commentaire ne peut pas être vide.";
        header("Location: ../vue/detail.php?product=" . $productId . "&comment_error=1");
        exit;
    } elseif (strlen($commentText) > 500) {
        $_SESSION["comment-error"] = "Le commentaire est trop long (max 500 caractères).";
        header("Location: ../vue/detail.php?product=" . $productId . "&comment_error=2");
        exit;
    } elseif (!$userId) {
        $_SESSION["comment-error"] = "Vous devez être connecté pour commenter.";
        header("Location: ../vue/detail.php?product=" . $productId . "&comment_error=3");
        exit;
    } elseif ($productId === false || $productId <= 0) {
        $_SESSION["comment-error"] = "ID de produit invalide.";
        header("Location: ../vue/detail.php?comment_error=4");
        exit;
    } else {
        $addComment = new Comment();
        $addComment->addComment($ratingComment, $commentText, $productId, $userId);
        exit;
    }
}

if (isset($_POST['reply-comment'])) {
    $commentId = filter_input(INPUT_POST, 'comment_id', FILTER_VALIDATE_INT);
    $productId = filter_input(INPUT_POST, 'product_id', FILTER_VALIDATE_INT);
    $replyText = trim($_POST['reply-text'] ?? '');

    if (empty($replyText)) {
        $_SESSION["comment-error"] = "Le commentaire ne peut pas être vide.";
        header("Location: ../vue/detail.php?product=" . $productId . "&comment_error=1");
        exit;
    } elseif ($productId === false || $productId <= 0) {
        $_SESSION["comment-error"] = "ID de produit invalide.";
        header("Location: ../vue/detail.php?comment_error=4");
        exit;
    } else {
        $addComment = new Comment();
        $addComment->adminReply($productId, $commentId, $replyText);
        exit;
    }
} else {
    header("Location: ../index.php");
    exit;
}
