<?php
include '../components/header.php';
?>
<section class="connection">
    <div class="connection-box">
        <form action="" id="form-connection">
            <label for="email">Votre Email</label>
            <input type="email" name="email" id="email" />
            <span id="emailError"></span>
            <label for="password">Votre Mot de Passe</label>
            <input type="password" name="password" id="password" />
            <button type="submit" class="connection-button">Connexion</button>
            <span id="connection-message"></span>
        </form>
    </div>
</section>
<?php
include '../components/footer.php';
?>