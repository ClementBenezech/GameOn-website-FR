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

//On ajoute un event listener sur le bouton submit pour lui assigner l'appel de la fonction validate quand l'utilisateur clique
document.getElementById("btn-submit").addEventListener("click", validate);

closeBtn.addEventListener("click", closeModal);


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
        var formFields = document.getElementById("signUpForm").querySelectorAll(".text-control , #checkbox1");
        
        /*Ensuite, pour chaque élément, on effectue le traitement suivant*/
        formFields.forEach($element => {

            handleDisplay(checkUniqueFieldRequirements($element.id), $element.id);
            UpdateFormValidState(checkUniqueFieldRequirements($element.id));            
          })

        /*traitement séparé pour les boutons Radio de selection de ville*/

        handleDisplay(checkLocationRequirements(), 'location-selectors');
        UpdateFormValidState(checkLocationRequirements());
        
        //Si le formulaire est valide, afficher un message de confirmation. 
        
        if (validForm) 
        {

          alterModal("block", "none", "fermer");
          /*hideErrorMessages();*/
          document.getElementById("btn-submit").removeEventListener("click", validate);
          document.getElementById("btn-submit").addEventListener("click", closeModal);/*setTimeout(closeModal, 5000);*/
        } 

        //On renvoie la valeur de validForm. S'il est resté à true, alors on valide le formulaire.
        return validForm;
}


/*************************************************************************************************************/
/* Ouverture de la modale */

function launchModal() {
  modalbg.style.display = "block";
}

/*************************************************************************************************************/
/*fermeture de la modale*/

  function closeModal() {
    
    document.getElementById("btn-submit").removeEventListener("click", closeModal);
    document.getElementById("btn-submit").addEventListener("click", validate);

    /*On "reset" l'affichage des champs dans la modale (Ici on va réafficher l'intégralité des champs de la modale qui avaient été cachés, sauf les messages d'erreur*/
    
    alterModal("none", "block", "C'est parti!"); 

    modalbg.style.display = "none";
    
  }

/*************************************************************************************************************/
/*Fonction qui va afficher / cacher les champs du formulaire pour "transformer" la modale en message de confirmation*/

function alterModal($confirmationVisibility, $formVisibility, $textValue) {
console.log("APPEL DE ALTERMODAL");

  
  const childrenOfModalBody = [].slice.call(document.getElementById("signUpForm").querySelectorAll('div:not(.modal-error-message), p'));

    childrenOfModalBody.forEach(element => {
    console.log("altermodal dit "+element.id +" "+ $formVisibility);
    element.style.display = $formVisibility;
  })

  document.getElementById("btn-submit").value = $textValue;
  document.getElementById("confirmation-message").style.display = $confirmationVisibility;
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
    if (document.getElementById($id).value)
    {
      return true;
    }
    else{

      return false;
      
    };
  break;
  case 'email':
    if (document.getElementById($id).value && document.getElementById($id).value.match(mailFormat))
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


/******************************************************************************************************************/
/*DEPRECIEE, non utilisée. Cette fonction va cacher l'ensemble des champs de messages d'erreur de la modale. On l'appelle lors de la validation du formulaire

function hideErrorMessages ()
{
        const childrenOfModalBody = [].slice.call(document.getElementById("signUpForm").querySelectorAll("div.modal-error-message"));
        
        childrenOfModalBody.forEach(element => {
        element.style.display = "none";
})

}*/

