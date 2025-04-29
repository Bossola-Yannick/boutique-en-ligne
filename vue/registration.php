<?php
include '../components/header.php';
?>
<section class="registration">
    <form action="" id="form-registration">
        <h2 id="status-registration"></h2>
        <label for="email">Email</label>
        <input type="email" name="mail" id="email" />
        <span id="emailError"></span>
        <label for="password">Mot de Passe</label>
        <input type="password" name="password" id="password" />
        <span id="passwordError"></span>
        <label for="confirmPassword">Confirmtion Mot de Passe</label>
        <input type="password" name="password" id="confirmPassword" />
        <span id="identiquePasswordError"></span>
        <h2 class="subtitle-registration">Mes Informations</h2>
        <label for="nom">Nom</label>
        <input type="text" name="nom" id="nom" />
        <label for="prenom">Prénom</label>
        <input type="text" name="prenom" id="prenom" />
        <label for="adresse">Adresse</label>
        <input type="text" name="adresse" id="adresse" />
        <label for="codeP">Code Postale</label>
        <input type="number" name="codeP" id="codeP" />
        <span id="codePostalError"></span>
        <button type="submit" class="button">Valider</button>
    </form>
</section>
<?php
include '../components/footer.php';
?>