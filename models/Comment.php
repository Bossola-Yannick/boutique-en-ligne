<?php

require '../config.php';
require_once '../models/ConnexionBdd.php';

class Comment extends ConnexionBdd
{

    public function __construct()
    {
        parent::__construct($this->bdd);
    }

    public function addComment($rating_comment, $comment, $productId, $user_id)
    {
        $query = "
        INSERT INTO comment (rating_comment, comment, date_comment, id_product, id_user) 
        VALUES (:rating_comment, :comment, NOW(), :id_product, :id_user)
        ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":rating_comment" => $rating_comment,
            ":comment" => $comment,
            ":id_product" => $productId,
            ":id_user" => $user_id
        ]);
        $_SESSION["comment-success"] = "Commentaire ajouté avec succès !";
        header("Location: ../vue/detail.php?product=" . $productId . "&comment_success=1");
        exit;
    }

    public function adminReply($productId, $id_comment, $reply)
    {
        $query = "
        UPDATE comment SET comment.admin_reply = :admin_reply
        WHERE comment.id_comment = :id_comment AND comment.id_product = :product_id
        ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":admin_reply" => $reply,
            ":id_comment" => $id_comment,
            ":product_id" => $productId
        ]);
        $_SESSION["comment-success"] = "Réponse ajouté avec succès !";
        header("Location: ../vue/detail.php?product=" . $productId . "&comment_success=1");
        exit;
    }
}

// $addComment = new Comment();
// $addComment->addComment(3, "blonzsoviozf", 20, 2);
