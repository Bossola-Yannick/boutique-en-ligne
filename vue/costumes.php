<?php

include '../components/header.php';
include '../components/search.php';

$_SESSION['user_id'] = 2;
$_SESSION['user_name'] = "james";
$_SESSION['user_role'] = "user";

?>

<div class="product-list-box">
    <section class="left-col-filter">
        <div class="filter-default">
            <p>Trier par:</p>
        </div>
        <div class="filter-by-subcategory">
            <p>Categories:</p>
        </div>
        <!-- <div class="filter-by-tag">
            <p>Tags:</p>
        </div> -->
    </section>
    <section id="right-col" class="right-col-items">
        <h2>Nos <span class="upp">pimp</span> pour vos <span class="upp">poules</span></h2>
        <div class="list-all-costumes"></div>
        <!-- js pagination -->
    </section>
</div>

<?php include '../components/footer.php'; ?>