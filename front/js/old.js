


// Vérifier les inputs 
//Formulaire - mise en place des RegEX pour vérifier les entrées de l'utilisateur
/*
let form = document.querySelector(".cart__order__form");

form.firstName.addEventListener("input", function () {
  validFirstName(this);
});
const validFirstName = function (inputFirstName) {
  let nameRegExp = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");
  let testFirstName = nameRegExp.test(inputFirstName.value);
  if (testFirstName) {
    inputFirstName.nextElementSibling.innerHTML = "";
    return true;
  } else {
    inputFirstName.nextElementSibling.innerHTML = "Saisissez votre prénom";
    return false;
  }
};

form.lastName.addEventListener("input", function () {
  validLastName(this);
});

const validLastName = function (inputLastName) {
  let nameRegExp = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");
  let testLastName = nameRegExp.test(inputLastName.value);
  if (testLastName) {
    inputLastName.nextElementSibling.innerHTML = "";
    return true;
  } else {
    inputLastName.nextElementSibling.innerHTML = "Saisissez votre nom";
    return false;
  }
};

form.address.addEventListener("input", function () {
  validAddress(this);
});

const validAddress = function (inputAdress) {
  let addressRegExp = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );
  let testAdress = addressRegExp.test(inputAdress.value);
  if (testAdress) {
    inputAdress.nextElementSibling.innerHTML = "";
    return true;
  } else {
    inputAdress.nextElementSibling.innerHTML = "Saisissez votre adresse";
    return false;
  }
};

form.city.addEventListener("input", function () {
  validCity(this);
});

const validCity = function (inputCity) {
  let cityRegExp = new RegExp(
    "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$",
    "g"
  );
  let testCity = cityRegExp.test(inputCity.value);
  if (testCity) {
    inputCity.nextElementSibling.innerHTML = "";
    return true;
  } else {
    inputCity.nextElementSibling.innerHTML = "Saisissez votre ville";
    return false;
  }
};



/*
const validEmail = function (inputEmail) {
  let emailRegExp = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
    "g"
  );
  let testEmail = emailRegExp.test(inputEmail.value);

  if (testEmail) {
    inputEmail.nextElementSibling.innerHTML = "";
    return true;
  } else {
    inputEmail.nextElementSibling.innerHTML =
      "Saisissez votre adresse mail complète";
    return false;
  }
};
*/

