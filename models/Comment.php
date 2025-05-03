<?php

require '../config.php';
require_once '../models/ConnexionBdd.php';

class Comment extends ConnexionBdd
{

    public function __construct()
    {
        parent::__construct($this->bdd);
    }

    public function addComment($rating_comment, $comment, $id_product, $id_user)
    {
        if ($this->checkComment($id_product, $id_user)) {
            $_SESSION['comment-error'] = "Un commentaire en votre nom à deja été posté pour cette article!";
            header("Location: ../vue/detail.php?product=" . $id_product . "&comment_success=1");
            exit;
        }
        $query = "
        INSERT INTO comment (rating_comment, comment, date_comment, id_product, id_user) 
        VALUES (:rating_comment, :comment, NOW(), :id_product, :id_user)
        ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":rating_comment" => $rating_comment,
            ":comment" => $comment,
            ":id_product" => $id_product,
            ":id_user" => $id_user
        ]);
        $_SESSION["comment-success"] = "Commentaire ajouté avec succès !";
        header("Location: ../vue/detail.php?product=" . $id_product . "&comment_success=1");
        exit;
    }

    public function adminReply($id_product, $id_comment, $reply)
    {
        $query = "
        UPDATE comment SET comment.admin_reply = :admin_reply
        WHERE comment.id_comment = :id_comment AND comment.id_product = :product_id
        ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":admin_reply" => $reply,
            ":id_comment" => $id_comment,
            ":product_id" => $id_product
        ]);
        header("Location: ../vue/detail.php?product=" . $id_product . "&comment_success=1");
        exit;
    }

    public function checkComment($id_product, $id_user): bool
    {
        $query = "SELECT COUNT(*)
        FROM comment
        WHERE comment.id_product = :id_product AND comment.id_user = :id_user
        ";
        $queryStmt = $this->bdd->prepare($query);
        $queryStmt->execute([
            ":id_product" => $id_product,
            ":id_user" => $id_user
        ]);
        $result = $queryStmt->fetchColumn();

        return $result > 0;
    }
}

// $addComment = new Comment();
// $addComment->addComment(3, "blonzsoviozf", 20, 2);
