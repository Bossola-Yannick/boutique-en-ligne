<?php
include '../components/header.php';
include '../components/search.php';
include '../components/banner.php';
?>
<section class="profil">
    <div class="left-box">
        <h1 class="profil-title">Mon Profil</h1>
        <p class="item-title">Email</p>
        <p class="item-mail"></p>
    </div>
    <div class="right-box">
        <h2 class="info-title">Mes Informations</h2>
        <p class="item-title">Nom :<span class="item-firstname"></span></p>
        <p class="item-title">Prénom :<span class="item-lastname"></span></p>
        <p class="item-title">Adresse :<span class="item-adress"></span></p>
        <p class="item-title">Code Postal :<span class="item-postalcode"></span></p>
        <p class="item-title">Ville :<span class="item-city"></span></p>
    </div>
</section>
<section class="last-order">
    <h2>Dernière Commande</h2>
</section>

<?php
include '../components/footer.php';
?>