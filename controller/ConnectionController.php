<?php
require_once '../models/User.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['email'], $data['password'])) {
        $userMail = $data['email'];
        $userPass = $data['password'];
        $user = new User();
        $user->userConnexion($userMail, $userPass);
        if (isset($_SESSION['userId'])) {
            echo json_encode(['success' => true, 'message' => 'Connexion réussie', 'userId' => $_SESSION['userId'], 'userRole' => $_SESSION['userRole'], 'userName' => $_SESSION['userName']]);
            die;
        } else {
            echo json_encode(['success' => false, 'message' => $_SESSION['message'] ?? 'Erreur inconnue']);
            die;
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Données manquantes']);
        die;
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    var_dump($_SESSION);
    die;
}
