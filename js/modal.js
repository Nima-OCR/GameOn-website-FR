function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


/**
 *   ########################################################################################
 *                                      Fermer la modale
 *   ########################################################################################
 */

// Sélectionne l'élément avec la classe "close" et le stocke dans la variable "closeModal".
const closeModal = document.querySelector(".close");

//Cette fonction change la propriété "display" de l'élément "modalbg" en "none".
const closeFunction = () => {
  modalbg.style.display = "none"
}

// Ajoute un événement "click" à l'élément closeModal qui exécutera la fonction closeFunction lorsque l'utilisateur cliquera sur cet élément.
closeModal.addEventListener("click", closeFunction);


/**
 *   #############################################################################################
 *       Le champ Prénom & Nom a un minimum de 2 caractères / n'est pas vide / Validation Email
 *   #############################################################################################
 */

/**
 * Récupère les éléments HTML pour le prénom, le nom et l'email
 * @type {HTMLElement}
 */
const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");


/**
 * Valide chaque champ avec une expression régulière et un message d'erreur
 * @param {HTMLElement} input - L'élément de champ de saisie HTML à valider.
 * @param {RegExp} regex - L'expression régulière à utiliser pour valider le champ de saisie.
 * @param {string} errorMessage - Le message d'erreur à afficher si la saisie ne correspond pas à l'expression régulière.
 */

validateInput(firstNameInput, /^\s*(?=.*[a-zA-Zéèàùç])[a-zA-Zéèàùç]{2,}\s*$/, "Le prénom doit comporter au moins 2 lettres");
validateInput(lastNameInput, /^\s*(?=.*[a-zA-Zéèàùç])[a-zA-Zéèàùç]{2,}\s*$/, "Le nom doit comporter au moins 2 lettres");
validateInput(emailInput, /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, "L'email n'est pas valide");


/**
 * @param {HTMLElement} input - L'élément de champ de saisie HTML à valider.
 * @param {RegExp} regex - L'expression régulière à utiliser pour valider le champ de saisie.
 * @param {string} errorMessage - Le message d'erreur à afficher si la saisie ne correspond pas à l'expression régulière.
 */
function validateInput(input, regex, errorMessage) {
  input.addEventListener("input", function () {
    const isValid = regex.test(input.value);
    if (isValid) {
      hideError(input);
      console.log("Les contraintes sont bien respectées");

    } else {
      showError(input, errorMessage);
      console.log("Attention, merci de respecter les contraintes")

    }
  });
}





/**
 *   ########################################################################################
 *       Date
 *   ########################################################################################
 */
const birthdateInput = document.getElementById('birthdate');
const birthdateErrorMessage = "La date n'est pas valide";
let isBirthdateValid = false;

validateBirthdate(birthdateInput);

/**
 * Valide l'entrée de la date de naissance en vérifiant les contraintes
 * @function
 * @name validateBirthdate
 * @param {HTMLInputElement} input - L'élément contenant la date de naissance à valider.
 */
function validateBirthdate(input) {
  const inputDate = new Date(input.value);
  const currentDate = new Date();
  const minBirthYear = 1950;
  isBirthdateValid = inputDate < currentDate && inputDate.getFullYear() >= minBirthYear;

  input.addEventListener("input", function () {
    const inputDate = new Date(input.value);
    const currentDate = new Date();
    isBirthdateValid = inputDate < currentDate && inputDate.getFullYear() >= minBirthYear;

    hideError(input);
    if (!isBirthdateValid) {
      showError(input, birthdateErrorMessage);
    }
  });
}

/**
 *   ########################################################################################
 *       Quantité De Tournois
 *   ########################################################################################
 */
const errorMessage = 'Attention, veuillez entrer un nombre compris entre 0 et 99.';

function addQuantityInput(input) {
  let isQuantityInputValid = false;

  input.addEventListener('blur', function () {
    if (!input.value || input.value < 0 || input.value > 99) {
      showError(input, errorMessage);
      isQuantityInputValid = false;
      console.log("Mauvais nombre: " + input.value);
    } else {
      hideError(input);
      isQuantityInputValid = true;
      console.log("nb de tournois valide: " + input.value);
    }
  });

  return {
    isQuantityInputValid() {
      return isQuantityInputValid;
    }
  };
}


const locationErrorMessage = 'Vous devez sélectionner une localisation';

/**
 *   ########################################################################################
 *       Sélection de la localisation
 *   ########################################################################################
 */
/**

 Récupère les boutons radios qui ont pour attribut "location"
 @type {HTMLInputElement}
 */
const locationRadios = document.querySelectorAll('[name="location"]');
/**

 Ajoute un événement "change" à chaque bouton radio récupéré, qui déclenche la fonction isLocationValid()
 @param {Event} event - L'événement change déclenché par le clic sur un bouton radio
 */
locationRadios.forEach((locationRadio) => {
  locationRadio.addEventListener('change', function(event) {
    isLocationValid();
  });
});
/**

 Vérifie si un tournoi a été sélectionné en parcourant tous les boutons radios
 @returns {boolean} - True si un bouton radio a été sélectionné, sinon false
 */
function isLocationValid() {
  let isValid = false;
  let selectedLocation = "";
  for (let i = 0; i < locationRadios.length; i++) {
    if (locationRadios[i].checked) {
      isValid = true;
      selectedLocation = locationRadios[i].value;
      break;
    }
  }

  if (isValid) {
    hideError(locationRadios[0]);
    console.log("Un tournoi a bien été choisi => " + selectedLocation);

  } else {
    showError(locationRadios[0], 'Veuillez sélectionner une option de localisation.');
    console.log("Vous devez sélectionner au moins un tournoi");

  }
  return isValid;
}

/**
 *   ########################################################################################
 *       Conditions d'utilisation
 *       Vous avez bien accepté les conditions d utilisation
 *   ########################################################################################
 */


const checkbox = document.getElementById('checkbox1');
const form = document.getElementById('conditions');

function isCheckboxChecked() {
  if (checkbox.checked === false) {
    showError(checkbox, 'Veuillez accepter les conditions d\'utilisation.');
    form.removeAttribute('data-valid');

    console.log("La Case n'est plus cochée !!!");

    return false;
  } else {
    hideError(checkbox);
    form.setAttribute('data-valid', 'Vous avez bien accepté les conditions d\'utilisation');
    console.log("La Case a bien été cochée");
    return true;
  }
}


/**
 *   ########################################################################################
 *        Prochains évènements
 *   ########################################################################################
 */

/**
 Récupère la case à cocher pour les Prochains évènements
 @type {HTMLInputElement}
 */
const eventsCheckbox = document.getElementById('checkbox2');

/**
 Récupère l'élément HTML du DOM avec l'identifiant 'events' & l'affecte à la variable upcomingEvents.
 @type {HTMLFormElement}
 */
const upcomingEvents = document.getElementById('events');

/**
 Fonction qui vérifie si la case à cocher pour les événements est cochée
 Si oui, affiche un message
 Sinon, cache le message et n'affiche aucun message
 */
function upcomingEventsMessage() {
  eventsCheckbox.checked ?
    upcomingEvents.setAttribute('data-error-visible', 'true') :
    upcomingEvents.setAttribute('data-error-visible', 'false');
  upcomingEvents.setAttribute('data-valid', 'Vous serez prévenu des prochains évènements !');

  // TESTS
  if(eventsCheckbox.checked){
    console.log("je veux être prévenu");
  }else {
    console.log("je ne veux plus être prévenu !!!");
  }
}

/**
 * Ajoute un écouteur d'événement pour upcomingEvents,
 * en appelant la fonction upcomingEventsMessage lors de la détection de l'événement.
 */
upcomingEvents.addEventListener('input', upcomingEventsMessage);


/**
 *   ########################################################################################
 *       Fonctions Messages d'erreur
 *   ########################################################################################
 */


function showError(input, errorMessage) {
  const inputContainer = input.parentElement;
  inputContainer.setAttribute('data-error', errorMessage);
  inputContainer.setAttribute('data-error-visible', 'true');
}

function hideError(input) {
  const inputContainer = input.parentElement;
  inputContainer.setAttribute('data-error-visible', 'false');
}



/**
 *   ########################################################################################
 *       Validation du formulaire
 *   ########################################################################################
 */

// Récupère l'élément input de quantité de tournois et ajoute l'écouteur d'événement
const quantityInput = document.getElementById('quantity');
const quantityInputListener = addQuantityInput(quantityInput);

// Récupère le bouton de soumission du formulaire
const submitButton = document.getElementById('submitButton');

// Ajoute un gestionnaire d'événement click au bouton de soumission
submitButton.addEventListener('click', function(event) {

  const firstNameValid = /^\s*(?=.*[a-zA-Zéèàùç])[a-zA-Zéèàùç]{2,}\s*$/.test(firstNameInput.value);
  const lastNameValid = /^\s*(?=.*[a-zA-Zéèàùç])[a-zA-Zéèàùç]{2,}\s*$/.test(lastNameInput.value);
  const emailValid = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(emailInput.value);



  // Vérifie si la valeur est valide avant d'envoyer le formulaire
  if (

    quantityInputListener.isQuantityInputValid()
    && isBirthdateValid
    && isLocationValid()
    && isCheckboxChecked()
    && firstNameValid
    && lastNameValid
    && emailValid
  ) {
    console.log("Formulaire Envoyé !!!");
  } else {
    event.preventDefault(); // Annule l'événement de soumission du formulaire

    if (!quantityInputListener.isQuantityInputValid()) {
      showError(quantityInput, errorMessage);
    } else {
      hideError(quantityInput);
    }

    if (!isBirthdateValid) {
      showError(birthdateInput, birthdateErrorMessage);
    } else {
      hideError(birthdateInput);
    }

    isLocationValid();
    isCheckboxChecked();

    if (!firstNameValid) {
      showError(firstNameInput, "Le prénom doit comporter au moins 2 lettres");
    } else {
      hideError(firstNameInput);
    }

    if (!lastNameValid) {
      showError(lastNameInput, "Le nom doit comporter au moins 2 lettres");
    } else {
      hideError(lastNameInput);
    }

    if (!emailValid) {
      showError(emailInput, "L'email n'est pas valide");
    } else {
      hideError(emailInput);
    }

  }

});


// Récupération des éléments HTML à modifier
const registrationForm = document.getElementById('form');
const formDataDivs = document.querySelectorAll('.formData');
const paragraphe = document.querySelector('.text-label');
const closeButton = document.querySelector('.close');
const modalButton = document.querySelector('.modal-btn');
// const submitBtn = document.getElementById('submitButton');

// Fonction pour réinitialiser les éléments
function resetForm() {
  registrationForm.reset(); // Réinitialiser les valeurs du formulaire

  const formControls = registrationForm.querySelectorAll('input, select, textarea'); // Sélectionner tous les contrôles de formulaire

  formControls.forEach(control => { // Boucler à travers les contrôles et supprimer les attributs 'data-*'
    control.removeAttribute('data-error');
    control.removeAttribute('data-error-visible');
    control.removeAttribute('data-valid');
  });

  formDataDivs.forEach(div => { // Réinitialiser les messages d'erreur et afficher les champs de formulaire
    div.style.display = 'block';
    div.removeAttribute('data-error');
    div.removeAttribute('data-error-visible');
    div.removeAttribute('data-valid');
  });

  paragraphe.innerText = ""; // Réinitialiser le texte du paragraphe
  paragraphe.style.cssText = ""; // Réinitialiser les styles du paragraphe
  submitButton.value = "C'est parti"; // Réinitialiser la valeur du bouton de soumission
}





// Fonction pour fermer la modale et réinitialiser le formulaire
function closeModalFunction() {
  modalbg.style.display = "none";
  resetForm();
}

// Gestionnaires d'événements
closeButton.addEventListener('click', closeModalFunction);

// modalButton.addEventListener('click', function () {
//   resetForm();
// });

registrationForm.addEventListener('submit', function(event) {
  event.preventDefault();
  formDataDivs.forEach(div => div.style.display = 'none');
  paragraphe.innerText = "Merci pour\nvotre inscription";
  paragraphe.style.margin = '15rem auto';
  paragraphe.style.fontSize = '36px';
  paragraphe.style.textAlign = 'center';
  submitButton.value = 'Fermer';
  // document.querySelector(".btn-submit").addEventListener("submit", closeModalFunction);
  document.querySelector(".btn-submit").removeEventListener("submit", closeModalFunction);

});




