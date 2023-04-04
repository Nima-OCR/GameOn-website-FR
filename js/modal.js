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
    input.parentElement.setAttribute("data-error", isValid ? "" : errorMessage);
    input.parentElement.setAttribute("data-error-visible", !isValid);

  //   test
    if(isValid){
      console.log("Les contraintes sont bien respectées");
    }else{
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

validateBirthdate(birthdateInput, "La date n'est pas valide");

/**
 * Valide l'entrée de la date de naissance en vérifiant si elle est inférieure à la date actuelle
 * et supérieure ou égale à l'année de naissance minimale (1950).
 * Si l'entrée n'est pas valide, un message d'erreur s'affiche.
 *
 * @function
 * @name validateBirthdate
 * @param {HTMLInputElement} input - L'élément d'entrée contenant la date de naissance à valider.
 * @param {string} errorMessage - Le message d'erreur à afficher si l'entrée n'est pas valide.
 */
function validateBirthdate(input, errorMessage) {
  input.addEventListener("input", function () {
    const inputDate = new Date(input.value);
    const currentDate = new Date();
    const minBirthYear = 1900;
    const isValid = inputDate < currentDate && inputDate >= minBirthYear;
    input.parentElement.setAttribute("data-error", isValid ? "" : errorMessage);
    input.parentElement.setAttribute("data-error-visible", !isValid);

    // TESTS
    if (isValid){
      console.log("La date saisi est correcte");
    }else{
      console.log("Attention, La date saisi n'est pas correcte");
    }
  });
}

/**
 *   ########################################################################################
 *       Quantité De Tournois
 *   ########################################################################################
 */

/**
 * Ajoute un écouteur d'événement à l'input de quantité de tournois.
 * Affiche ou masque le message d'erreur en fonction de la validité de la valeur saisie.
 * @param {HTMLInputElement} input - L'élément input de quantité de tournois.
 */
// La fonction sert à ajouter un écouteur d'événement sur l'élément input de quantité de tournois.
function addQuantityInputListener(input) {
    const inputContainer = input.parentElement;
    let isFormValid = false; // Initialisation du boolean à false

    input.addEventListener('blur', function () {
        if (!input.value || input.value < 0 || input.value > 99) {
            inputContainer.setAttribute('data-error', 'Attention ' + input.value + ' est invalide, entrez un nombre compris entre 0 et 99');
            inputContainer.setAttribute('data-error-visible', 'true');
            isFormValid = false; // Mise à false du boolean si il y a une erreur
            console.log("Mauvais nombre: " + input.value);
        } else {
            inputContainer.setAttribute('data-error-visible', 'false');
            isFormValid = true; // Mise à true du boolean si tout est bon
            console.log("nb de tournois valide: " + input.value);
        }
    });

    // Ajout d'une fonction pour récupérer la valeur du boolean 'isFormValid'
    function getIsFormValid() {
        return isFormValid;
    }

    // Retourne l'objet contenant les fonctions
    return {
        getIsFormValid
    };
}

// Récupère l'élément input de quantité de tournois et ajoute l'écouteur d'événement
const quantityInput = document.getElementById('quantity');
const quantityInputListener = addQuantityInputListener(quantityInput);


/**
 *   ########################################################################################
 *       Sélection de la localisation
 *   ########################################################################################
 */


/**
 * Permet de sélectionner tous les boutons de radio sur la page qui ont un attribut name égal à "location"
 */
const radioButtons = document.querySelectorAll('input[type="radio"][name="location"]');


/**
 * Ajoute un gestionnaire d'événement click à chaque bouton radio pour récupérer la valeur sélectionnée
 * @param {HTMLInputElement}
 */
radioButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selectedValue = document.querySelector('input[name="location"]:checked').value;

    if(selectedValue){
      console.log("Un tournoi a bien été choisi");
    }else{
      console.log("Vous devez sélectionner au moins un tournoi");
    }
  });
});


/**
 *   ########################################################################################
 *       Conditions d'utilisation
 *       Vous avez bien accepté les conditions d utilisation
 *   ########################################################################################
 */


const checkbox = document.getElementById('checkbox1');
const form = document.getElementById('conditions');

form.addEventListener('input', (event) => {
  if (checkbox.checked) {
    form.setAttribute('data-error-visible', 'true');
    form.setAttribute('data-valid', 'Vous avez bien accepté les conditions d\'utilisation');

    console.log("La Case a bien été cochée");
  } else {
    form.setAttribute('data-error-visible', 'true');
    form.setAttribute('data-error', 'Veuillez accepter les conditions d\'utilisation');
    form.removeAttribute('data-valid');

    console.log("La Case n'est plus cochée !!!");
  }
});

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
