<?php

include '../components/header.php';
include '../components/search.php';

$_SESSION['user_id'] = 2;
$_SESSION['user_name'] = "james";
$_SESSION['user_role'] = "admin";

?>

<section id="product-box"></section>
<hr class="separation">
<section class="recommand-box">
    <h2>Nos recommandations:</h2>
    <div id="recommand-items"></div>
</section>
<hr class="separation">
<section class="comments-box">
    <h2>Vos Avis:</h2>
    <?php if (!isset($_SESSION['user_name'])): ?>
        <p class="msg-login-com">Veuillez-vous <a class="bold" href="connection.php">connecter</a> pour laisser un commentaire</p>
    <?php elseif (isset($_SESSION['user_name']) && $_SESSION['user_role'] === "admin"): ?>
        <p class="msg-login-com">Connecté en tant que : <span class="bold"><?= htmlspecialchars($_SESSION['user_role']) ?><span></p>
    <?php elseif ($_SESSION['user_role'] !== "admin"): ?>
        <div class="comment-form-box">
            <p>Connecté en tant que : <span class="bold"><?= htmlspecialchars($_SESSION['user_name']) ?><span></p>

            <?php if (isset($_SESSION["comment-error"])): ?>
                <p class="bold red"><?= $_SESSION["comment-error"] ?></p>
                <?php unset($_SESSION["comment-error"]); ?>
            <?php endif; ?>
            <?php if (isset($_SESSION["comment-success"])): ?>
                <p class="bold green"><?= $_SESSION["comment-success"] ?></p>
                <?php unset($_SESSION["comment-success"]); ?>
            <?php endif; ?>

            <form id="comment-form" method="post" action="../controller/CommentController.php">
                <input type="hidden" name="product_id" id="product_id" value="">
                <label for="comment-text">Votre commentaire :</label>
                <textarea id="comment-text" rows="5" name="comment-text" placeholder="écrivez votre commentaire..." required></textarea>
                <div id="comment-error" style="color: red; font-size: 0.9em; margin-top: 5px;"></div>
                <button name="send-comment" type="submit" class="add-comment">Valider</button>
            </form>
        </div>
    <?php endif; ?>



    <div id="comments-items"></div>
</section>


<?php include '../components/footer.php'; ?>