<?php

require_once '../config.php';

$stripeSecret = $_ENV['STRIPE_SECRET_KEY'];
\Stripe\Stripe::setApiKey($stripeSecret);

header('Content-Type: application/json');

try {
    // Récupérer le montant total du panier depuis la requête
    $json_str = file_get_contents('php://input');
    $json_data = json_decode($json_str, true);

    if (isset($json_data['total'])) {
        $total = filter_var($json_data['total'], FILTER_VALIDATE_FLOAT);

        if ($total !== false && $total > 0) {
            $amount = round($total * 100);

            $paymentIntent = \Stripe\PaymentIntent::create([
                'amount' => $amount,
                'currency' => 'eur',
                'automatic_payment_methods' => [
                    'enabled' => true,
                ],
            ]);

            $output = [
                'clientSecret' => $paymentIntent->client_secret,
            ];

            echo json_encode($output);
        } else {
            http_response_code(400);
            echo json_encode(['error' => 'Montant total invalide.']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Montant total non fourni.']);
    }
} catch (\Stripe\Exception\ApiErrorException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Erreur serveur.']);
}
