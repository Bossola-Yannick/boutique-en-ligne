<?php

include '../components/header.php';

?>

<?php if (isset($_SESSION['userId'])): ?>
    <section id="cart" class="cart-container">
        <h2>Mon panier</h2>
        <div class="cart-full-display">
            <div class="cart-titles">
                <p class="product-col">Produits</p>
                <p class="quantity-col">Qté</p>
                <p class="price-col">Prix</p>
                <p class="delete-col"></p>
            </div>
            <ul class="cart-display"></ul>
            <div class="total-and-button">
                <div class="cart-total">
                    Total : <span class="cart-total-price bold">0.00 €</span>
                </div>
                <button type="submit" class="create-order">Passer la commande</button>
            </div>

        </div>
    </section>
<?php else: ?>

    <p>Panier vide</p>

<?php endif ?>

<?php include '../components/footer.php'; ?>