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
 *   ######################
 *       Code Start Here
 *   ######################
 */

// Sélectionne l'élément avec la classe "close" et le stocke dans la variable "closeModal".
const closeModal = document.querySelector(".close");

//Cette fonction change la propriété "display" de l'élément "modalbg" en "none", ce qui cache l'élément à l'écran.
const closeFunction = (MouseEvent) => {
  modalbg.style.display = "none"
}

// Ce code ajoute un événement "click" à l'élément closeModal qui exécutera la fonction closeFunction lorsque l'utilisateur cliquera sur cet élément.
closeModal.addEventListener("click", closeFunction);
