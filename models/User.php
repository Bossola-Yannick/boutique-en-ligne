<?php
include_once('ConnexionBdd.php');

class Utilisateur extends ConnexionBdd
{

    private $id;
    private $email;
    private $password;
    private $firstName;
    private $lastName;
    private $adress;
    private $postalCode;
    private $city;
    private $role;


    public function __construct()
    {
        parent::__construct($this->bdd);
        $this->id;
        $this->email;
        $this->password;
        $this->firstName;
        $this->lastName;
        $this->adress;
        $this->postalCode;
        $this->city;
        $this->role;
    }

    public function connexion()
    {
        if (isset($_POST['submit'])) {
            if (!empty($_POST['email']) && !empty($_POST['password'])) {
                $email = htmlentities($_POST['email']);
                $password = $_POST['password'];
                $req = $this->bdd->prepare("SELECT * FROM utilisateur WHERE email = :email");
                $req->execute(["email" => $email]);
                $user = $req->fetch(PDO::FETCH_ASSOC);

                if (!$user) {
                    $_SESSION['message']  = "email ou Mot de passe incorrect !";
                } else {
                    if (password_verify($password, $user['password']) ||  $password == $user['password']) {
                        session_start();
                        $_SESSION['user'] = $user['id'];
                        $_SESSION['score'] = $user['score'];
                        header("location: ../index.php");
                        exit();
                    } else {
                        $_SESSION['message']  = "email ou Mot de passe incorrect !";
                    }
                }
            } else {
                $_SESSION['message']  = "Veuillez remplir tous les champs";
            }
        }
    }


    public function inscription()
    {
        if (isset($_POST['submit'])) {
            if (!empty($_POST['pseudo']) && !empty($_POST['password'])) {
                $pseudo = htmlentities($_POST['pseudo']);
                $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
                $checkPseudo = $this->bdd->prepare("SELECT id FROM utilisateur WHERE pseudo = :pseudo");
                $checkPseudo->execute(["pseudo" => $pseudo]);


                if ($checkPseudo->fetch()) {
                    $_SESSION['message']  = "Ce pseudo est déjà utilisé !";
                } else {

                    $req = $this->bdd->prepare("INSERT INTO utilisateur (pseudo, password, score) VALUES (:pseudo, :password, :score)");
                    $req->execute([
                        "pseudo" => $pseudo,
                        "password" => $password,
                        "score" => 10

                    ]);
                    $req = $req->fetch(PDO::FETCH_ASSOC);

                    $_SESSION['message']  = "Inscription réussie !";

                    $_SESSION['user'] = $req;

                    header("location:connexion.php");
                }
            } else {
                $_SESSION['message']  = "Veuillez remplir tous les champs";
            }
        }
    }

    //récupère toutes les infos utilisateurs (sauf mot de passe)
    public function get_userInfo()
    {
        $usersInfoStmt = $this->bdd->prepare("SELECT utilisateur.id, utilisateur.pseudo, utilisateur.score
        FROM utilisateur
        ORDER BY score ASC;
            ");
        $usersInfoStmt->execute();
        return $usersInfoStmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
