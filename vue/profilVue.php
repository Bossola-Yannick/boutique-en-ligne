<?php
include '../components/header.php';
include '../components/search.php';
// include '../components/banner.php';
?>
<section class="profil">
    <div class="left-box">
        <h1 class="profil-title">Mon profil</h1>
        <p class="item-title">Email</p>
        <p class="item-mail item-info"></p>
        <p class="item-title">Mot de Passe</p>
        <p class="item-password item-info"></p>
    </div>
    <div class="right-box">
        <h2 class="info-title">Mes Informations :</h2>
        <p class="item-title">Nom :<span class="item-firstname item-info"></span></p>
        <p class="item-title">Prénom :<span class="item-lastname item-info"></span></p>
        <p class="item-title">Adresse :<span class="item-adress item-info"></span></p>
        <p class="item-title">Code Postal :<span class="item-postalcode item-info"></span></p>
        <p class="item-title">Ville :<span class="item-city item-info"></span></p>
    </div>
</section>
<section class="last-order">
    <h2 class="order-title">Dernière Commande</h2>
    <div class="last-order-item">
        <p class="no-order">Vous n'avez pas encore effectué de commande</p>
    </div>
</section>

<?php
include '../components/footer.php';
?>