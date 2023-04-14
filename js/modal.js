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
const form = document.getElementById('form');


modalBtn.forEach((btn) => btn.addEventListener("click", function() {
  launchModal();
  console.log("Lancement du formulaire d'inscription");
}));


// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


/**
 *   ########################################################################################
 *                                      Fermeture de la modale
 *   ########################################################################################
 */

// Supprime les attributs "data-error", "data-error-visible" et "data-valid" des champs d'entrée.
function clearErrors() {
  const inputs = document.querySelectorAll('.formData');
  inputs.forEach(function(input) {
    input.removeAttribute('data-error');
    input.removeAttribute('data-error-visible');
    input.removeAttribute('data-valid');
  });
}

//Cette fonction change la propriété "display" de l'élément "modalbg" et "successModal" en "none".
const closeFunction = () => {
  modalbg.style.display = "none"
  successModal.style.display = 'none';

  console.log("Fermeture du formulaire réussi");

  form.reset();
  clearErrors();
  console.log("le formulaire est réinitialisé !");
}

// Sélectionne tous les éléments avec la classe "close" et les stocke dans la variable "closeModal"
const closeModal = document.querySelectorAll('.close');

// // Ajoute un événement "click" à chaque élément closeModal
closeModal.forEach(function(button) {
  button.addEventListener('click', function() {
    closeFunction();
  });
});

/**
 *   #############################################################################################
 *                                Prénom / Nom / Validation Email
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

validateInput(firstNameInput, /^\s*(?=.*[a-zA-Zéèàùç])[a-zA-Zéèàùç]{2,}\s*$/, " Le prénom doit comporter au moins 2 lettres");
validateInput(lastNameInput, /^\s*(?=.*[a-zA-Zéèàùç])[a-zA-Zéèàùç]{2,}\s*$/, " Le nom doit comporter au moins 2 lettres");
validateInput(emailInput, /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, " L'email n'est pas valide");

function validateInput(input, regex, errorMessage) {
  input.addEventListener("input", function () {
    const isValid = regex.test(input.value);
    if (isValid) {
      hideError(input);
      console.log(input.id + ": " + input.value + " => est valide ✓");

      return true;

    } else {
      showError(input, errorMessage);
      console.log(input.id + " :" + input.value + " ⚠saisie invalide ==> " + errorMessage);

      return  false;
    }
  });
}

/**
 *   ########################################################################################
 *                                         Date de naissance
 *   ########################################################################################
 */
/**
 * Récupère les éléments HTML pour la date de naissance
 * @type {HTMLElement}
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
    console.log("La date entrée est :", inputDate);
    const currentDate = new Date();
    isBirthdateValid = inputDate < currentDate && inputDate.getFullYear() >= minBirthYear;

    hideError(input);
    if (!isBirthdateValid) {
      showError(input, birthdateErrorMessage);
      console.log(birthdateErrorMessage);

    }
  });
}

/**
 *   ########################################################################################
 *                  À combien de tournois GameOn avez-vous déjà participé ?
 *   ########################################################################################
 */
const errorMessage = 'Attention, veuillez entrer un nombre compris entre 0 et 99.';

// Cette fonction prend un élément "input" comme argument et ajoute un événement "blur" à cet élément.
function addQuantityInput(input) {
  let isQuantityInputValid = false;

  input.addEventListener('blur', function () {
    if (!input.value || input.value < 0 || input.value > 99) {
      showError(input, errorMessage);
      isQuantityInputValid = false;
      console.log("Nombre saisi: " + input.value + " => veuillez entrer un nombre compris entre 0 et 99");

    } else {
      hideError(input);
      isQuantityInputValid = true;
      console.log("Le Nombre de tournois est valide => "  + input.value);
    }
  });

  return {
    isQuantityInputValid() {
      return isQuantityInputValid;
    }
  };
}

/**
 *   ########################################################################################
 *                  A quel tournoi souhaitez-vous participer cette année ?
 *   ########################################################################################
 */

// Récupère les boutons radios qui ont pour attribut "location"
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

    return true;

  } else {
    showError(locationRadios[0], 'Veuillez sélectionner une option de localisation.');

    return false;

  }
}

/**
 *   ########################################################################################
 *                      J'ai lu et accepté les conditions d'utilisation.
 *   ########################################################################################
 */

const checkbox = document.getElementById('checkbox1');
const conditions = document.getElementById('conditions');

// Ajoute un écouteur d'événement à la case à cocher qui écoute l'événement "change".
checkbox.addEventListener('change', function() {
  isCheckboxChecked();
});

// Cette fonction vérifie si une case à cocher (checkbox) est cochée ou non.
function isCheckboxChecked() {
  if (checkbox.checked === false) {
    showError(checkbox, 'Veuillez accepter les conditions d\'utilisation.');
    conditions.removeAttribute('data-valid');

    console.log("Veuillez accepter les conditions d'utilisation.");

    return false;
  } else {
    hideError(checkbox);
    conditions.setAttribute('data-valid', 'Vous avez bien accepté les conditions d\'utilisation');
    console.log("les conditions d'utilisation sont acceptées");
    return true;
  }
}

/**
 *   ########################################################################################
 *                    Je souhaite être prévenu des prochains évènements.
 *   ########################################################################################
 */

// Récupère la case à cocher pour les Prochains évènements
const eventsCheckbox = document.getElementById('checkbox2');

// Récupère l'élément HTML du DOM avec l'identifiant 'events' & l'affecte à la variable upcomingEvents.
const upcomingEvents = document.getElementById('events');

// Fonction qui vérifie si la case à cocher pour les événements est cochée
function upcomingEventsMessage() {
  eventsCheckbox.checked ?
    upcomingEvents.setAttribute('data-error-visible', 'true') :
    upcomingEvents.setAttribute('data-error-visible', 'false');
  upcomingEvents.setAttribute('data-valid', 'Vous serez prévenu des prochains évènements !');

  // TESTS
  if(eventsCheckbox.checked){
    console.log("Je Je souhaite être prévenu des prochains évènements.");
  }else {
    console.log("Désolé mais je ne souhaite plus être prévenu des prochains évènements !!!");
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

// / Cette fonction affiche un message d'erreur sous l'élément parent de l'élément "input".
function showError(input, errorMessage) {
  const inputContainer = input.parentElement;
  inputContainer.setAttribute('data-error', errorMessage);
  inputContainer.setAttribute('data-error-visible', 'true');
}

// Cette fonction cache le message d'erreur associé à l'élément "input"
function hideError(input) {
  const inputContainer = input.parentElement;
  inputContainer.setAttribute('data-error-visible', 'false');
}

/**
 *   ########################################################################################
 *       Validation du formulaire
 *   ########################################################################################
 */

// Utilise le DOM pour récupérer et stocker des éléments HTML
const quantityInput = document.getElementById('quantity');
const quantityInputListener = addQuantityInput(quantityInput);
const registrationForm = document.getElementById('form');
const successModal = document.querySelector('.bgroundMessage');
const closeModalButton = document.getElementById('closeModal');

// Cette fonction affiche le modal de confirmation de soumission en cachant le modal du formulaire
function showSubmitModal() {
  modalbg.style.display = 'none';
  successModal.style.display = "block";
}


// Ajoute un gestionnaire d'événement de clic au bouton de fermeture de la modal
closeModalButton.addEventListener('click', function() {
  successModal.style.display = 'none';
  clearErrors();

  console.log("Fermeture de la modale et le formulaire est réinitialisé !");
});


// Ajoute un gestionnaire d'événement click au bouton de soumission
registrationForm.addEventListener('submit', function(event)  {
  event.preventDefault(); // Annule l'événement de soumission du formulaire

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
    console.log("Votre formulaire a été soumis avec succès!");
    showSubmitModal()
    registrationForm.reset();
    formData.forEach((div) => {
      div.setAttribute('data-valid', 'true');
    });


  } else {
    console.log('Le formulaire doit être rempli en respectant les contraintes avant d\'être soumis.');

    if (!firstNameValid) {
      showError(firstNameInput, "Le prénom doit comporter au moins 2 lettres");
    } else {
      hideError(firstNameInput);
    }

    if (!lastNameValid) {
      showError(lastNameInput, " Le nom doit comporter au moins 2 lettres");
    } else {
      hideError(lastNameInput);
    }

    if (!emailValid) {
      showError(emailInput, " L'email n'est pas valide");
    } else {
      hideError(emailInput);
    }
    if (!isBirthdateValid) {
      showError(birthdateInput, birthdateErrorMessage);
    } else {
      hideError(birthdateInput);
    }

    if (!quantityInputListener.isQuantityInputValid()) {
      showError(quantityInput, errorMessage);
    } else {
      hideError(quantityInput);
    }

    isLocationValid();
    isCheckboxChecked();
  }
});

