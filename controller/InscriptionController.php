<?php
require_once '../models/User.php';
header('Content-Type: application/json');
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  if (isset($data['email'], $data['password'], $data['firstname'], $data['lastname'], $data['adress'], $data['postalCode'], $data['city'])) {
    $userMail = $data['email'];
    $userPass = $data['password'];
    $firstName = $data['firstname'];
    $lastName = $data['lastname'];
    $adress = $data['adress'];
    $postalCode = $data['postalCode'];
    $city = $data['city'];
    $user = new User();
    $user->userSignUp($userMail, $userPass, $firstName, $lastName, $adress, $postalCode, $city);
    if (isset($_SESSION['message']) && $_SESSION['message'] === "Inscription réussie !") {
      echo json_encode(['success' => true, 'message' => 'Inscription réussie !']);
    } else {
      echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'inscription.']);
    }
  } else {
    echo json_encode(['success' => false, 'message' => 'Données manquantes']);
  }
} else {
  echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
}
