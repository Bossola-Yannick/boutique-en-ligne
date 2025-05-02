<?php

session_start();
$_SESSION['user_id'] = 2;
$_SESSION['user_name'] = "JAMES";


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

        <?php if ($commentErrorMessage): ?>
            <p style="color: red;"><?= htmlspecialchars($commentErrorMessage) ?></p>
        <?php endif; ?>
        <?php if ($commentSuccessMessage): ?>
            <p style="color: green;"><?= htmlspecialchars($commentSuccessMessage) ?></p>
        <?php endif; ?>

        <form id="comment-form" method="post" action="detail.php?id=<?= $productId ?>">
            <input type="hidden" name="product_id" value="<?= $productId ?>">
            <label for="comment-text">Votre commentaire :</label>
            <textarea id="comment-text" name="comment-text" placeholder="écrivez votre commentaire..." required></textarea>
            <div id="comment-error" style="color: red; font-size: 0.9em; margin-top: 5px;"></div>
            <button name="send-comment" type="submit">Valider</button>
        </form>

    <?php endif; ?>
    <!-- echo test -->
    <?php
    echo $_POST['comment-text'];
    ?>
    <!-- fin test -->

    <div id="comments-items"></div>
</section>


<?php include '../components/footer.php'; ?>