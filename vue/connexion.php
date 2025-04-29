<?php
include '../components/header.php';
?>
<?php
include '../components/banner.php';
?>
<form action="" id="connexion">
    <label for="email">Votre Email</label>
    <input type="email" name="email" id="email" />
    <span id="emailError"></span>
    <label for="password">Votre Mot de Passe</label>
    <input type="password" name="password" id="password" />
    <button type="submit">Connexion</button>
    <span id="connexionMessage"></span>
</form>
<?php
include '../components/footer.php';
?>