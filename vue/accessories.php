<?php

include '../components/header.php';
include '../components/search.php';
include '../components/banner.php';

?>

<div class="product-list-box">
    <section id="left-col" class="left-col-filter">
        <div class="filter-default">
            <p class="bold">Trier par:</p>
        </div>
        <!-- <div class="filter-by-subcategory">
            <p class="bold">Categories:</p>
        </div> -->
        <div class="filter-by-tag">
            <p class="bold">Tags:</p>
        </div>
    </section>
    <section id="right-col" class="right-col-items">
        <h2>Nos <span class="upp">pimp</span> pour vos <span class="upp">poules</span></h2>
        <div class="list-all-costumes"></div>
        <!-- js pagination -->
    </section>
</div>

<?php include '../components/footer.php'; ?>