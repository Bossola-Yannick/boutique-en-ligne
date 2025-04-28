let verifMail = false;
let passwordIdentique = false;
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
      $("#emailError").text("Email valide").css("color", "green");
      verifMail = true;
      return verifMail;
    } else {
      $("#emailError").text("Format Email invalide").css("color", "red");
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
        .css("color", "green");
    } else $("#codePostalError").text("Format Code Postal invalide ! Veuillez mettre que les 5 chiffre de votre code postal.").css("color", "red");
  });

  // verif format password
  $("#password").on("input", function () {
    var password = $(this).val();
    if (regexPassword.test(password)) {
      $("#passwordError").text(" Format Password Validé").css("color", "green");
    } else $("#passwordError").text("Format Password requit: 1 Majuscule, 1 minuscule, 1 chiffre, 1 caractère spécial").css("color", "red");
    // verif si password = verifPassword
    $("#confirmPassword").on("input", function () {
      let verifPassword = $(this).val();
      if (password != verifPassword) {
        $("#identiquePasswordError")
          .text("Mot de Passe non identique !")
          .css("color", "red");
      } else {
        $("#identiquePasswordError")
          .text("Mot de Passe identique !")
          .css("color", "green");
        passwordIdentique = true;
      }
    });
  });
});

$("#connexion").submit(function (e) {
  e.preventDefault();
  // récupération des valeurs du formulaire et traitement
  let email = $("#email").val().trim();
  let password = $("#password").val().trim();

  if (verifMail) {
    if (!password || !email) {
      $("#connexionMessage")
        .text("Mot de passe ou Email non renseigné !")
        .css("color", "red");
    } else
      $("#connexionMessage").text("Connexion Réussi !").css("color", "green");
  } else $("#connexionMessage").text("Connexion Echoué !").css("color", "red");
});

$("#inscription").submit(function (e) {
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
    $("#statusInscription")
      .text("Veuillez remplir tous les champs CORRECTEMENT!")
      .css("color", "red");
    return;
  }
  if (passwordIdentique) {
    $("#statusInscription").text("Inscription Validée !").css("color", "green");
    console.log(nom, prenom, email, adresse, codeP, password, confirmPassword);
  }
});

// regex pour email: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,10}$
// regex pour password: ^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$
// regex code Postale: ^\d{5}$
