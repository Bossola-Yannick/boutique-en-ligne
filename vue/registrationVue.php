<?php
include '../components/header.php';
include '../components/search.php';
?>
<section class="registration">
    <form action="" id="form-registration">
        <h2 id="status-registration"></h2>
        <label for="email">Email</label>
        <input type="email" name="email" id="email" />
        <span id="emailError"></span>
        <label for="password">Mot de Passe</label>
        <input type="password" name="password" id="password" />
        <span id="passwordError"></span>
        <label for="confirmPassword">Confirmtion Mot de Passe</label>
        <input type="password" name="password" id="confirmPassword" />
        <span id="identiquePasswordError"></span>
        <h2 class="subtitle-registration">Mes Informations</h2>
        <label for="nom">Nom</label>
        <input type="text" name="firstname" id="nom" />
        <label for="prenom">Prénom</label>
        <input type="text" name="lastname" id="prenom" />
        <label for="adresse">Adresse</label>
        <input type="text" name="adress" id="adresse" />
        <label for="codeP">Code Postale</label>
        <input type="number" name="postalCode" id="codeP" />
        <span id="codePostalError"></span>
        <label for="city">Ville</label>
        <input type="text" name="city" id="city" />
        <div class="button button-registration">Valider</div>
    </form>
</section>
<?php
include '../components/footer.php';
?>