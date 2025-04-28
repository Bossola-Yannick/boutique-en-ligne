<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script
        src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"
        defer></script>
    <script src="./script.js" defer></script>
    <link rel="stylesheet" href="./style.css" />
</head>

<body>
    <header class="header">
        <a href="./connexion.html" class="connexion">Connexion</a>
        <a href="./inscription.html" class="inscription">Inscription</a>
    </header>
    <form action="" id="connexion">
        <label for="email">Votre Email</label>
        <input type="email" name="email" id="email" />
        <span id="emailError"></span>
        <label for="password">Votre Mot de Passe</label>
        <input type="password" name="password" id="password" />
        <button type="submit">Connexion</button>
        <span id="connexionMessage"></span>
    </form>
</body>

</html>