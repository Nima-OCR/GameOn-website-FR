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
function validateInput (input, regex, errorMessage) {
  input.addEventListener("input", function () {
    const isValid = regex.test(input.value);
    input.parentElement.setAttribute("data-error", isValid ? "" : errorMessage);
    input.parentElement.setAttribute("data-error-visible", !isValid);
  })
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
  });
}

/**
 *   ########################################################################################
 *       Quantité De Tournois
 *   ########################################################################################
 */

/**
 * Récupère l'élément HTML correspondant à l'input de quantité de tournois GameOn.
 * @type {HTMLInputElement}
 */
const quantityInput = document.getElementById('quantity');

/**
 * Récupère l'élément parent de l'input quantity, qui contient les données du formulaire.
 * @type {HTMLElement}
 */
const inputContainer = quantityInput.parentElement;

/**
 * Ajoute un écouteur d'événement à l'input de quantité de tournois.
 */
  quantityInput.addEventListener('blur', function () {

  if (!quantityInput.value ||  quantityInput.value <= 0 ) {
    // Si le champ est vide ou non numérique, affiche l'erreur
    inputContainer.setAttribute('data-error', 'Veuillez saisir un nombre valide de tournois.');
    inputContainer.setAttribute('data-error-visible', 'true');
  } else {
    // Sinon, cache l'erreur
    inputContainer.removeAttribute('data-error');
    inputContainer.removeAttribute('data-error-visible');
  }
});
