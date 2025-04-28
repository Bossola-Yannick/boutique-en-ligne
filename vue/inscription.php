<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        defer></script>
    <script src="../js/connexion-inscription.js" defer></script>
    <link rel="stylesheet" href="../styles/reset.css" />
    <link rel="stylesheet" href="../styles/style.css" />
    <link rel="stylesheet" href="../styles/header-footer.css" />
</head>

<body>
    <header class="header">
        <a href="./connexion.html" class="connexion">Connexion</a>
        <a href="./inscription.html" class="inscription">Inscription</a>
    </header>
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