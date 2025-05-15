<?php

include '../components/header.php';

?>

<?php if (isset($_SESSION['userId'])): ?>
    <section id="cart" class="cart-container">
        <h2>Mon panier</h2>
        <div class="cart-title-display">
            <div class="cart-titles">
                <p class="product-col">Produits</p>
                <p class="quantity-col">Qté</p>
                <p class="price-col">Prix</p>
                <p class="delete-col"></p>
            </div>
            <ul class="cart-display"></ul>
        </div>
        <button type="submit" class="create-order">Passer la commande</button>
    </section>
<?php else: ?>

    <p>Panier vide</p>

<?php endif ?>

<?php include '../components/footer.php'; ?>