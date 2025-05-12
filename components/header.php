<?php
session_start();
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
    <!-- recup du $_SESSION en js -->
    <script>
        const userId = <?php echo json_encode($_SESSION['user_id'] ?? null, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT); ?>;
        const userRole = <?php echo json_encode($_SESSION['user_role'] ?? null, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_AMP | JSON_HEX_QUOT); ?>;
    </script>
    <!-- fin recup -->
    <script src="../js/notification.js" defer></script>
    <script src="../js/detail.js" defer></script>
    <script src="../js/connection-registration.js" defer></script>
    <script src="../js/search.js" defer></script>
    <script src="../js/card.js" defer></script>
    <script src="../js/costumes.js" defer></script>
    <script src="../js/cart.js" defer></script>
    <link rel="stylesheet" href="../styles/reset.css" />
    <link rel="stylesheet" href="../styles/style.css" />
    <link rel="stylesheet" href="../styles/header-banner-search-footer.css" />
    <link rel="stylesheet" href="../styles/connection-registration.css">
    <link rel="stylesheet" href="../styles/detail.css">
    <link rel="stylesheet" href="../styles/costumes-accessories-promo-pages.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Chewy&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
</head>

<body>
    <header class="header">
        <div class="logo-box">
            <a href="../index.php">
                <img src="../assets/images/icones/logo-detour.png" alt="logo pimp my poule">
            </a>
        </div>
        <div class="link-box">
            <ul class="link-list">

                <li class="link-item"><a href="../vue/costumes.php">Déguisements</a></li>
                <li class="link-item"><a href="../vue/accessories.php">Accessoires</a></li>
                <li class="link-item"><a href="../vue/promo.php">Promotion</a></li>
                <?php if (isset($_SESSION['userId'])) : ?>
                    <?php if ($_SESSION["userRole"] === "admin"): ?>
                        <li class="link-item"><a href="../vue/adminVue.php">Gestion Boutique</a></li>
                        <li class="logout"><button>Déconnexion</button></li>
                    <?php elseif ($_SESSION["userRole"] === "user"): ?>
                        <li class="link-item"><a href="../vue/profilVue.php">Profil</a></li>
                        <li class="logout"><button>Déconnexion</button></li>
                    <?php endif ?>
                <?php else : ?>
                    <li class="link-item"><a href="../vue/connectionVue.php">Connexion</a></li>
                    <li class="link-item"><a href="../vue/registrationVue.php">Inscription</a></li>
                <?php endif ?>
            </ul>
        </div>
        <div class="cart-box">
            <a href="../vue/cart.php">
                <img src="../assets/images/icones/cart.png" alt="">
                <p class="cart-number-items"></p>
            </a>
        </div>
    </header>
    <main>