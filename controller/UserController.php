<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once '../models/User.php';
header('Content-Type: application/json');
$user = new User();

if (isset($_SESSION['userId'])) {
    $userId = $_SESSION['userId'];
    $userInfo = $user->getAllById($userId);
    if (!empty($userInfo)) {
        echo json_encode($userInfo);
    } else {
        echo json_encode(['error' => 'Utilisateur non trouvé']);
    }
} else {
    echo json_encode(['error' => 'Utilisateur non connecté']);
    die;
}
