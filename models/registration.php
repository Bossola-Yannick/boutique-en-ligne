<?php
require '../config.php';
include_once '../models/User.php';

$newUser = new User();

if (isset($_POST['submit'])) {
    if (!empty($_POST['pseudo']) && !empty($_POST['password'])) {
        $userLogin = htmlentities($_POST['pseudo']);
        $userPass = password_hash($_POST['password'], PASSWORD_BCRYPT);
        $newSignUp = $newUser->userSignUp($userLogin, $userPass);
    } else {
        $_SESSION['message'] = "Veuillez remplir tous les champs !";
    }
}

?>

<?php include '../components/header.php'; ?>

<main class="main">
    <section>
        <!-- si une session est déjà ouverte on ne propose pas de se reconnecter -->
        <?php if (isset($_SESSION['userId'])) : ?>
            <?php header("location: connexion.php");
            exit(); ?>
            <!-- si pas de session ouverte on propose de se connecter -->
        <?php else : ?>
            <h1 class="titreh1">Inscription</h1>
            <section class="registration-bloc">
                <form method="post" action="" class="form">
                    <label for="" class="label-form">Pseudo :</label><br />
                    <input class="input" type="text" name="pseudo" id="pseudo" value="" placeholder="Entrez votre pseudo" required><br /><br />
                    <label for="" class="label-form">Mot de Passe :</label><br />
                    <input class="input" type="password" name="password" id="password" value="" placeholder="Entrez votre mot de passe" required><br /><br />
                    <button type="submit" name="submit" class="bouton button-next button-next-green">Valider</button>
                    <?php if (isset($_SESSION['message'])): ?>
                        <p class="alert"><?= $_SESSION['message'] ?></p>
                    <?php endif; ?>
                </form>
            </section>
            <div class="txt">Déjà inscrit? <a href="./connexion.php" class="link-bold">Se connecter</a></div>
        <?php endif ?>
    </section>
</main>


<?php include '../components/footer.php'; ?>