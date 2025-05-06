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
  if (verifMail) {
    console.log("tentative de connexion");

    if (!password || !email) {
      $("#connection-message")
        .text("Mot de passe non renseigné !")
        .css({ color: "red", background: "white" });
    } else {
      login(email, password);
    }
  } else $("#connection-message").text("Connexion Echoué !").css({ color: "red", background: "white" });
});

const login = async (email, password) => {
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
    sessionStorage.setItem("userConnectId", userConnect.userId);
    sessionStorage.setItem("userConnectRole", userConnect.userRole);
    document.location.href = "../index.php";
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    $("#connection-message")
      .text("Erreur serveur, veuillez réessayer plus tard.")
      .css({ color: "red", background: "white" });
  }
};

//* INSCRIPTION
$(".button-registration").on("click", function (e) {
  e.preventDefault();
  // récupération des valeurs du formulaire et traitement
  let nom = $("#nom").val().trim();
  let prenom = $("#prenom").val().trim();
  let email = $("#email").val().trim();
  let adresse = $("#adresse").val().trim();
  let codeP = $("#codeP").val().trim();
  let password = $("#password").val().trim();
  let confirmPassword = $("#confirmPassword").val().trim();
  if (
    !nom ||
    !prenom ||
    !email ||
    !adresse ||
    !codeP ||
    !password ||
    !confirmPassword
  ) {
    $("#status-registration")
      .text("Veuillez remplir tous les champs CORRECTEMENT!")
      .css({ color: "red", backgrounColor: "rgba(255, 255, 255, 0.644)" });
    return;
  }
  if (passwordIdentique) {
    $("#status-registration")
      .text("Inscription Validée !")
      .css({ color: "green" });
    $("#emailError").css("visibility", "hidden");
    $("#passwordError").css("visibility", "hidden");
    $("#identiquePasswordError").css("visibility", "hidden");
    $("#codePostalError").css("visibility", "hidden");
    console.log(nom, prenom, email, adresse, codeP, password, confirmPassword);
  }
});

// regex pour email: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$
// regex pour password: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$
// regex code Postale: ^\d{5}$
