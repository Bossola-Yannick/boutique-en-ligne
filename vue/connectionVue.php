<?php
include '../components/header.php';
include '../components/search.php';
?>
<section class="connection">
    <!-- si connecté, renvoie vers l'accueil -->
    <?php if (isset($_SESSION['userId'])) : ?>
        <?php header("location: ../index.php");
        exit(); ?>

        <!-- si pas connecté laisse le formulaire -->
    <?php else : ?>
        <h1 class="title">Connexion</h1>
        <form method="post" action="" id="form-connection">
            <label for="email">Votre Email</label>
            <input type="email" name="email" id="email" />
            <span id="emailError"></span>
            <label for="password">Votre Mot de Passe</label>
            <input type="password" name="password" id="password" />
            <button type="submit" class="connection-button button">Connexion</button>
            <span id="connection-message"></span>
            <?php if (isset($_SESSION['message'])): ?>
                <p class="alert"><?= $_SESSION['message'] ?></p>
            <?php endif; ?>
        </form>
        <div class="txt">
            <span>Pas encore de compte? </span>
            <a href="./registrationVue.php" class="link-bold">S’inscrire</a>
        </div>
    <?php endif ?>
</section>
<?php
include '../components/footer.php';
?>