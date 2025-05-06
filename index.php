<?php
session_start();
require 'config.php';
?>
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Document</title>
  <script
    src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"
    defer></script>
  <script src="./js/connection-registration.js" defer></script>
  <script src="./js/search.js" defer></script>
  <link rel="stylesheet" href="./styles/reset.css" />
  <link rel="stylesheet" href="./styles/style.css" />
  <link rel="stylesheet" href="./styles/header-banner-search-footer.css" />
  <link rel="stylesheet" href="./styles/connection-registration.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
</head>

<body>
  <header class="header">
    <div class="logo-box">
      <a href="">
        <img src="./assets/images/icones/logo-detour.png" alt="logo pimp my poule">
      </a>
    </div>
    <div class="link-box">
      <ul class="link-list">
        <li class="link-item"><a href="#">Déguisements</a></li>
        <li class="link-item"><a href="#">Accessoires</a></li>
        <li class="link-item"><a href="#">Promotion</a></li>
        <?php if (isset($_SESSION['userId'])) : ?>
          <?php if ($_SESSION["userRole"] === "admin"): ?>
            <li class="link-item"><a href="./vue/adminVue.php">Gestion Boutique</a></li>
            <li class="logout"><button>Déconnexion</button></li>
          <?php elseif ($_SESSION["userRole"] === "user"): ?>
            <li class="link-item"><a href="./vue/profilVue.php">Profil</a></li>
          <?php endif ?>
        <?php else : ?>
          <li class="link-item"><a href="./vue/connectionVue.php">Connexion</a></li>
          <li class="link-item"><a href="./vue/registrationVue.php">Inscription</a></li>
        <?php endif ?>
      </ul>
    </div>
    <div class="cart-box">
      <a href="">
        <img src="./assets/images/icones/cart.png" alt="">
      </a>
    </div>
  </header>
  <div class="search-box">
    <div class="input-glass">
      <input type="text" id="search" placeholder="Rechercher" />
    </div>
    <div id="display-result" class="result-box"></div>
  </div>
  <section class="banner">
    <img src="./assets/images/icones/banner-pano.png" alt="">
  </section>
  <main>
    <h1>HELLO HOME PAGE</h1>
    <?php
    include './components/footer.php';
    ?>