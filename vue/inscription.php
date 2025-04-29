<?php
include '../components/header.php';
?>
<main>
    <form action="" id="inscription">
        <h2 id="statusInscription"></h2>
        <label for="nom">Nom</label>
        <input type="text" name="nom" id="nom" />
        <label for="prenom">Prénom</label>
        <input type="text" name="prenom" id="prenom" />
        <label for="email">Email</label>
        <input type="email" name="mail" id="email" />
        <span id="emailError"></span>
        <label for="adresse">Adresse</label>
        <input type="text" name="adresse" id="adresse" />
        <label for="codeP">Code Postale</label>
        <input type="number" name="codeP" id="codeP" />
        <span id="codePostalError"></span>
        <label for="password">Mot de Passe</label>
        <input type="password" name="password" id="password" />
        <span id="passwordError"></span>
        <label for="confirmPassword">Confirmtion Mot de Passe</label>
        <input type="password" name="password" id="confirmPassword" />
        <span id="identiquePasswordError"></span>
        <button type="submit">Valider</button>
    </form>
</main>
<?php
include '../components/footer.php';
?>