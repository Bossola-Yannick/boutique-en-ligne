<?php


$_SESSION['user_id'] = 2;
$_SESSION['user_name'] = "JAMES";
$_SESSION['user_role'] = "admin";


include '../components/header.php';
include '../components/search.php';

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
        <p>Veuillez-vous <a href="connection.php">connecter</a> pour laisser un commentaire</p>
    <?php else: ?>

        <p>Connecté en tant que : <?= htmlspecialchars($_SESSION['user_name']) ?></p>

        <?php if (isset($_SESSION["comment-error"])): ?>
            <p style="color: red;"><?= $_SESSION["comment-error"] ?></p>
            <?php unset($_SESSION["comment-error"]); ?>
        <?php endif; ?>
        <?php if (isset($_SESSION["comment-success"])): ?>
            <p style="color: green;"><?= $_SESSION["comment-success"] ?></p>
            <?php unset($_SESSION["comment-success"]); ?>
        <?php endif; ?>

        <form id="comment-form" method="post" action="../controller/CommentController.php">
            <input type="hidden" name="product_id" id="product_id" value="">
            <label for="comment-text">Votre commentaire :</label>
            <textarea id="comment-text" name="comment-text" placeholder="écrivez votre commentaire..." required></textarea>
            <div id="comment-error" style="color: red; font-size: 0.9em; margin-top: 5px;"></div>
            <button name="send-comment" type="submit" id="add-comment">Valider</button>
        </form>

    <?php endif; ?>
    <!-- echo test -->
    <?php
    if (isset($_POST['post-comment'])) {
        echo $_POST['comment-text'];
    }

    ?>
    <!-- fin test -->

    <div id="comments-items"></div>
</section>


<?php include '../components/footer.php'; ?>