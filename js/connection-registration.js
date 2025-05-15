let verifMail = false;
let passwordIdentique = false;
//* VERIFICATION DES INPUTS
$("document").ready(function () {
  const regexMail = new RegExp(
    "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,10}$"
  );
  // regex pour password: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$
  const regexPassword = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$"
  );
  const regexCodeP = new RegExp("^\\d{5}$");
  // verif format email
  $("#email").on("input", function () {
    let mail = $(this).val();
    if (regexMail.test(mail)) {
      $("#emailError").text("Email valide").css({ color: "green" });
      verifMail = true;
      return verifMail;
    } else {
      $("#emailError")
        .text("Format Email invalide")
        .css({ color: "red", background: "white" });
      verifMail = false;
      return verifMail;
    }
  });
  // verif format code Postal
  $("#codeP").on("input", function () {
    let codeP = $(this).val();
    if (regexCodeP.test(codeP)) {
      $("#codePostalError")
        .text(" Format Code postal Validé")
        .css({ color: "green" });
    } else $("#codePostalError").text("Format Code Postal invalide ! Veuillez mettre que les 5 chiffre de votre code postal.").css({ color: "red", background: "white" });
  });
  // verif format password
  $("#password").on("input", function () {
    var password = $(this).val();
    if (regexPassword.test(password)) {
      $("#passwordError")
        .text(" Format Password Validé")
        .css({ color: "green" });
    } else $("#passwordError").text("Format Password requit: 1 Majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial").css({ color: "red", background: "white" });
    // verif si password = verifPassword
    $("#confirmPassword").on("input", function () {
      let verifPassword = $(this).val();
      if (password != verifPassword) {
        $("#identiquePasswordError")
          .text("Mot de Passe non identique !")
          .css({ color: "red", background: "white" });
      } else {
        $("#identiquePasswordError")
          .text("Mot de Passe identique !")
          .css({ color: "green" });
        passwordIdentique = true;
      }
    });
  });
});

//* CONNEXION
$("#form-connection").submit(function (e) {
  e.preventDefault();
  // récupération des valeurs du formulaire et traitement
  let email = $("#email").val().trim();
  let password = $("#password").val().trim();
  console.log(email, password);

  if (verifMail) {
    console.log("tentative de connexion");

    if (!password || !email) {
      $("#connection-message")
        .text("Mot de passe non renseigné !")
        .addClass("message-error");
    } else {
      login(email, password);
    }
  }
});

const login = async (email, password) => {
  console.log(" essai connection");

  try {
    const response = await fetch("../controller/ConnectionController.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.text();
    const userConnect = JSON.parse(data);
    console.log(userConnect);
    if (userConnect.message === "Email ou mot de passe incorrect!") {
      $("#connection-message")
        .text("Email ou Mot de passe incorrect !")
        .addClass("message-error");
    } else {
      sessionStorage.setItem("userConnectId", userConnect.userId);
      sessionStorage.setItem("userConnectRole", userConnect.userRole);
      document.location.href = "../index.php";
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    $("#connection-message")
      .text("Erreur serveur, veuillez réessayer plus tard.")
      .addClass("message-error");
  }
};

//* INSCRIPTION
$(".button-registration").on("click", function (e) {
  e.preventDefault();
  // récupération des valeurs du formulaire et traitement
  let firstname = $("#nom").val().trim();
  let lastname = $("#prenom").val().trim();
  let email = $("#email").val().trim();
  let adress = $("#adresse").val().trim();
  let codeP = $("#codeP").val().trim();
  let password = $("#password").val().trim();
  let confirmPassword = $("#confirmPassword").val().trim();
  let city = $("#city").val().trim();
  if (
    !firstname ||
    !lastname ||
    !email ||
    !adress ||
    !codeP ||
    !password ||
    !confirmPassword ||
    !city
  ) {
    $("#status-registration")
      .text("Veuillez remplir tous les champs CORRECTEMENT!")
      .addClass("message-error");
    return;
  }
  if (passwordIdentique) {
    registration(firstname, lastname, email, adress, codeP, password, city);
  }
});

// fonction pour l'inscription
const registration = async (
  firstname,
  lastname,
  email,
  adress,
  codeP,
  password,
  city
) => {
  try {
    const response = await fetch("../controller/InscriptionController.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstname: firstname,
        lastname: lastname,
        adress: adress,
        postalCode: codeP,
        city: city,
      }),
    });
    const data = await response.json();
    if (data.success) {
      document.location.href = "./connectionVue.php";
    } else {
      $("#status-registration")
        .text(data.message || "Erreur lors de l'inscription.")
        .addClass("message-error");
    }
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    $("#status-registration")
      .text("Erreur serveur, veuillez réessayer plus tard.")
      .addClass("message-error");
  }
};

//* DECONNEXION
$(".logout").on("click", function (e) {
  e.preventDefault();
  sessionStorage.clear();
  if (window.location.href === "http://localhost/boutique-en-ligne/index.php") {
    fetch("./controller/logout.php");
  } else fetch("../controller/logout.php");
  // redirection index.php
  window.location.href = "http://localhost/boutique-en-ligne/index.php";
});

// regex pour email: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$
// regex pour password: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$
// regex code Postale: ^\d{5}$
