<?php
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
require '../config.php';
include_once(__DIR__ . "/ConnexionBdd.php");

class User extends ConnexionBdd
{
    public string $login;
    public string $password;
    public string $role;

    public function __construct()
    {
        parent::__construct($this->bdd);
    }

    // Methode inscription

    public function userSignUp($userMail, $userPass)
    {
        $checkStmt = "SELECT id 
        FROM user
        WHERE login = :userMail";
        $checkStmt = $this->bdd->prepare($checkStmt);
        $checkStmt->execute([
            ':userMail' => $userMail
        ]);

        if ($checkStmt->fetch()) {
            $_SESSION['message']  = "Ce pseudo est déjà utilisé !";
        } else {

            $signUpStmt = "INSERT INTO user (email, password, role) VALUES (:email, :password, :role)";
            $signUpStmt = $this->bdd->prepare($signUpStmt);
            $hashedPassword = password_hash($userPass, PASSWORD_DEFAULT);
            $signUpStmt->execute([
                ':email' => $userMail,
                ':password' => $hashedPassword,
                ':role' => 'user'
            ]);

            $signUpStmt = $signUpStmt->fetch(PDO::FETCH_ASSOC);

            $_SESSION['message']  = "Inscription réussie !";

            header("location:connexion.php");
            exit;
        }
    }

    // Methode connexion
    public function userConnexion($userMail, $userPass): void
    {
        $query = "SELECT *
        FROM user
        WHERE email = :userMail";
        $userConnect = $this->bdd->prepare($query);
        $userConnect->execute([
            ':userMail' => $userMail
        ]);
        $userMail = $userConnect->fetch(PDO::FETCH_ASSOC);
        if ($userMail && (password_verify($userPass, $userMail['password']) ||  $userPass === $userMail['password'])) {
            $_SESSION['userId'] = $userMail['id_user'];
            $_SESSION['userRole'] = $userMail['role'];
        } else {
            $_SESSION['message']  = "Pseudo ou mot de passe incorrect!";
        }
    }

    // Methode pour récuperer toutes les infos d'un utilisateur par ID
    public function get_allById($userId): array
    {
        $getAllStmt = "SELECT user.id, user.login, user.password, user.role
        FROM user
        WHERE user.id = :userId";
        $getAllStmt = $this->bdd->prepare($getAllStmt);
        $getAllStmt->execute([
            ':userId' => $userId
        ]);

        return $getAllStmt->fetchAll(PDO::FETCH_ASSOC);
    }

    // Méthode pour update user login
    public function updateUserLogin($userMail, $newLogin): void
    {
        $checkStmt = "SELECT user.login 
        FROM user
        WHERE login = :newLogin";
        $checkStmt = $this->bdd->prepare($checkStmt);
        $checkStmt->execute([
            ':newLogin' => $newLogin
        ]);

        if ($checkStmt->fetch()) {
            $_SESSION['message']  = "Ce pseudo est déjà utilisé !";
        } else {

            $newLoginStmt = "UPDATE user SET login = :newLogin
            WHERE login = :userLogin";
            $newLoginStmt = $this->bdd->prepare($newLoginStmt);
            $newLoginStmt->execute([
                ':userLogin' => $userMail,
                ':newLogin' => $newLogin
            ]);

            $_SESSION['message'] = "Pseudo modifié";
            $_SESSION['userLogin'] = $newLogin;
        }
    }

    // Méthode pour vérifier et update le mot de passe
    public function updateUserPassword($userId, $currentPass, $newPass)
    {
        // récup mdp actuel
        $passStmt = "SELECT user.password
        FROM user
        WHERE user.id = :userId";
        $passStmt = $this->bdd->prepare($passStmt);
        $passStmt->execute([
            ':userId' => $userId
        ]);
        $userPass = $passStmt->fetch(PDO::FETCH_ASSOC);

        // vérifie s'il est correct
        if (password_verify($currentPass, $userPass['password']) ||  $currentPass == $userPass['password']) {
            $newHashPass = password_hash($newPass, PASSWORD_BCRYPT);

            // met a jour le mot de passe
            $updatePassStmt = "UPDATE user 
            SET password = :newPass 
            WHERE user.id = :userId";
            $updatePassStmt = $this->bdd->prepare($updatePassStmt);
            $updatePassStmt->execute([
                ':newPass' => $newHashPass,
                ':userId' => $userId
            ]);

            $_SESSION['message'] = "Succès - Mot de passe changé !";
        } else {
            $_SESSION['message'] = "Erreur - Mot de passe incorrect !";
        }
    }
}
