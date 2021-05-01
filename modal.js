var mailFormat = "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$";

        
var validForm = true;

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

//getting close button item form DOM by class
const closeBtn = document.getElementsByClassName('close')[0];
console.log(closeBtn);


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeBtn.addEventListener("click", closeModal);

/*************************************************************************************************************/

// launch modal form
function launchModal() {
  modalbg.style.display = "block";


}

/*************************************************************************************************************/

//Close Modal form function
  function closeModal() {
    modalbg.style.display = "none";
  }

/*************************************************************************************************************/

//Validation of sign up form field values

function validate() {

        //On considère le formulaire valide au départ. Le script mettra à jour cette variable vers FALSE si un champ s'avère invalide
        
        validForm = true;

        /*On commence par selectionner tous les inputs de type text appartenant à la classe text-control dans signUpForm*/
        const formFields = document.getElementById("signUpForm").querySelectorAll(".text-control , #checkbox1");

        console.log(formFields);
        
        /*Ensuite, pour chaque élément, on effectue le traitement suivant*/
        formFields.forEach($element => {

            /*Verification que la donnée entrée correspond au format attendu pour le champ*/
            requirementsMet = checkUniqueFieldRequirements($element.id);

            /*console.log($element.id); */

            //Gestion de l'affichage conditionnel du message d'erreur en fonction de la réponse de checkUniqueFieldRequirements()*/
            handleDisplay(requirementsMet, $element.id);

            //Gestion du state global de validation du formulaire
            UpdateFormValidState(requirementsMet);
          })

        /*traitement séparé pour les boutons Radio de selection de ville*/
        requirementsMet = checkLocationRequirements();
        handleDisplay(requirementsMet, 'location-selectors');
        UpdateFormValidState(requirementsMet);

        //On renvoie ValidForm pour valider ou non le formulaire.
        console.log(validForm);
        
        //Si le formulaire est valide, afficher un message de confirmation. 
        
        if (validForm) 
        {
          alert("Votre Inscription a bien été prise en compte");
        } 

        //On renvoie la valeur de validForm. S'il est resté à true, alors on valide le formulaire.
        return validForm;
}

/*************************************************************************************************************/


function handleDisplay ($requirementsMet, $fieldID)
{

  console.log("handle display recoit "+$requirementsMet+" "+$fieldID);
  console.log("handle display cherche à atteindre l'élément: "+$fieldID+'-error-message');

        if ($requirementsMet == true)
        {
            console.log("Handle display rentre dans la conditions $requirementsMet = true pour l'ID "+$fieldID);
            displayNone(document.getElementById($fieldID+'-error-message'));
        }
        else 
        {
            console.log("Handle display rentre dans la conditions $requirementsMet = false pour l'ID "+$fieldID);
            displayBlock(document.getElementById($fieldID+'-error-message'));
        }
}

/*************************************************************************************************************/


//Met à jour la valeur de validForm avec l'argument passé.
function UpdateFormValidState ($validField) {
        validForm = $validField;
        console.log("ValidForm vaut "+validForm);
}

/*************************************************************************************************************/

function checkLocationRequirements () {
  //On recupère la liste des enfants de location-selectors, et on la transforme en tableau
  const locationSelectors = [].slice.call(document.getElementById("location-selectors").children);  
  
  //Via la fonction checkIfChecked, on vérifie si au moins une des radio est selectionnée.
  if (checkIfChecked(locationSelectors))
  {
    return true;
  }
  else
  {
    return false;
  }
}

/*************************************************************************************************************/

function checkUniqueFieldRequirements ($id) {
  switch ($id) {
  case 'first':
  case 'last':
    if ( document.getElementById($id).value.length > 2 && document.getElementById($id).value)
    {
      return true;
    }
    else{

      return false;
    };
    break;
  case 'birthdate':
  case 'quantity':
    if (document.getElementById($id).value)
    {
      return true;
    }
    else{

      return false;
      
    };
  break;
  case 'email':
    if (document.getElementById($id).value.match(mailFormat) && document.getElementById($id).value )
      {
        return true;
      }
      else 
      {

        return false;
        
      }
  break;
  case 'checkbox1':
    if (document.getElementById($id).checked )
      {
        return true;
      }
      else 
      {

        return false;

      }
  break;
  }
}

/*************************************************************************************************************/


//Fonction qui rend un bloc visible

function displayBlock ($element) {
          $element.style.display = 'block';
}

/*************************************************************************************************************/


//fonction qui rend un bloc invisible
function displayNone ($element) {
  $element.style.display = 'none';
}

/*************************************************************************************************************/

//fonction qui, partant d'un tableau d'éléments, vérifie si au moins l'un d'entre eux est coché.

function checkIfChecked ($element) {
            
            /*console.log($element.checked);*/
            let radioChecked = false;

           //Quand un élément est coché, passer radioChecked à true
           
           $element.forEach($element => {

              if ($element.checked)
              {
                  /*console.log("Okay, element "+$element.id+" is checked");*/
                  radioChecked = true;
              }



            })
            //on renvoie radiochecked.
            return radioChecked;


}

/*************************************************************************************************************/

