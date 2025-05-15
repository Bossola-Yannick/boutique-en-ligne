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
            <!-- Modal Stripe -->
            <div id="stripe-modal" class="modal hidden">
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <form id="payment-form">
                        <div id="payment-element"></div>
                        <button id="submit">
                            <div class="spinner hidden" id="spinner"></div>
                            <span id="button-text">Payer maintenant</span>
                        </button>
                        <div id="payment-message" class="hidden"></div>
                    </form>
                </div>
            </div>
        </div>
    </section>
<?php else: ?>

    <p>Panier vide</p>

<?php endif ?>

<?php include '../components/footer.php'; ?>