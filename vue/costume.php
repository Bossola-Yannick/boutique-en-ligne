<?php

include '../components/header.php';
include '../components/search.php';

$_SESSION['user_id'] = 2;
$_SESSION['user_name'] = "james";
$_SESSION['user_role'] = "user";

?>

<div class="product-list-box">
    <section id="right" class="right-col-filter"></section>
    <section id="left" class="left-col-items">
        <h2>Nos <span class="upp">pimp</span> pour vos <span class="upp">poules</span></h2>
        <div class="list-all-product"></div>
    </section>
</div>