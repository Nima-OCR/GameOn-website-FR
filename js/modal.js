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
 *   ########################################################################################
 *       Le champ Prénom & Nom a un minimum de 2 caractères / n'est pas vide
 *   ########################################################################################
 */

const firstNameInput = document.getElementById("first");
const lastNameInput = document.getElementById("last");
const emailInput = document.getElementById("email");

const regexName = /^\s*(?=.*[a-zA-Zéèàùç])[a-zA-Zéèàùç]{2,}\s*$/;
const regexEmail = /^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

firstNameInput.addEventListener("input", function () {
  if (!regexName.test(firstNameInput.value)) {
    firstNameInput.parentElement.setAttribute("data-error", "Le prénom doit comporter au moins 2 lettres");
    firstNameInput.parentElement.setAttribute("data-error-visible", "true");
  } else {
    firstNameInput.parentElement.removeAttribute("data-error");
    firstNameInput.parentElement.removeAttribute("data-error-visible");
  }
});

lastNameInput.addEventListener("input", function () {
  if (!regexName.test(lastNameInput.value)) {
    lastNameInput.parentElement.setAttribute("data-error", "Le nom doit comporter au moins 2 lettres");
    lastNameInput.parentElement.setAttribute("data-error-visible", "true");
  } else {
    lastNameInput.parentElement.removeAttribute("data-error");
    lastNameInput.parentElement.removeAttribute("data-error-visible");
  }
});

emailInput.addEventListener("input", function () {
  if (!regexEmail.test(emailInput.value)) {
    emailInput.parentElement.setAttribute("data-error", "L'email n'est pas valide");
    emailInput.parentElement.setAttribute("data-error-visible", "true");
  } else {
    emailInput.parentElement.removeAttribute("data-error");
    emailInput.parentElement.removeAttribute("data-error-visible");
  }
});




