<?php

session_start();
$_SESSION['user_id'] = 2;


include '../components/header.php';
include '../components/search.php';

?>

<section id="product-box"></section>
<hr class="separation">
<section class="recommand-box">
    <h2>Nos recommandations:</h2>
    <div id="recommand-items"></div>
</section>
<hr class="separation">
<section id="comments-box">
    <h2>Vos Avis:</h2>
    <div id="comments-items"></div>
</section>


<?php include '../components/footer.php'; ?>