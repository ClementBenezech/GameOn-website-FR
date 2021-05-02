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
/*const formBtn = document.getElementById("btn-submit");*/

//getting close button item form DOM by class
const closeBtn = document.getElementsByClassName('close')[0];
console.log(closeBtn);


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

closeBtn.addEventListener("click", closeModal);
/*formBtn.addEventListener("click", validate);*/

/*************************************************************************************************************/

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

/*************************************************************************************************************/

//Close Modal form function
  function closeModal() {
    document.getElementById("confirmation-message").className = 'confirmation-message';
    modalbg.style.display = "none";
    document.getElementsByClassName("modal-body")[0].style.display ='block';
    
    
  }

/*************************************************************************************************************/
/*                  FONCTION: Gestion de la validation des entrées de formulaire.
                              Gestion de l'affichage des messages d'erreur.
                    ORIGIN: #signUpForm.onSubmit.
                    PARAMETERS: NONE.
                    VALEUR DE RETOUR: <True> si formulaire valide, <false> si au moins un champ en erreur
                    DEPENDANCES: 
                                  checkUniqueFieldRequirements
                                  handleDisplay
                                  updateFormValidState

                    ACTIONS:  Selection de tous les input à tester
                              Pour chaque élément 
                              {
                                Vérification de la conformité de la valeur du champ.
                                Affichage / effacement du meessages d'erreur lié au champ.
                                Mise à jour de l'indicateur de validation globale du formulaire.
                              }
                              
                              Si le formulaire est valide
                              {
                                Affichage du message de confirmation
                              }
                              Renvoie TRUE / FALSE.
*****************************************************************************************************************/


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
        console.log("final validform: "+validForm);
        
        //Si le formulaire est valide, afficher un message de confirmation. 
        
        if (true) 
        {
          /*alert("Votre Inscription a bien été prise en compte");*/
          document.getElementById("confirmation-message").className += '-visible';
          document.getElementsByClassName("modal-body")[0].style.display ='none';
          setTimeout(closeModal, 5000);
          
        } 

        //On renvoie la valeur de validForm. S'il est resté à true, alors on valide le formulaire.
        return true;
}

/*************************************************************************************************************/
/*Gère l'affichage de chaque message d'erreur du formulaire 
        Paramètres: 
                    $requirementsMet: la réponse de la fonction vérifiant la validité du champ en cours de traitement (Booleen)
                    $fieldId: l'ID du champ dont on va gérer l'affichage. (string)
*/

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
/*Met à jour la valeur de l'indicateur global de validité du formulaire à false si le champ testé est invalide.
      paramètre: $ValidField: la validité du champ que l'on vient de tester le contenu (booleen)
*/


function UpdateFormValidState ($validField) {
        if ($validField == false)
        {
        validForm = $validField;
        console.log("ValidForm vaut "+validForm);
        }
}

/*************************************************************************************************************/
/* Cette fonction vérifie qu'au moins une ville est selectionnées. 
            Elle renvoit un booléen, true si une ville est selectionnée, false dans le cas contraire. 
            DEPENDANCE: checkIfChecked.
*/

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
/*Cette fonction gère les cas particuliers de validation des données de fomulaire*/

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
  case 'email':
    if (document.getElementById($id).value)
    {
      return true;
    }
    else{

      return false;
      
    };
  /*break;*/
  case 'email':
    if (document.getElementById($id).value.match(mailFormat))
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

