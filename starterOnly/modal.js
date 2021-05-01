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


// launch modal form
function launchModal() {
  modalbg.style.display = "block";


}

//Close Modal form function
  function closeModal() {
    modalbg.style.display = "none";
  }

//Validation of sign up form field values

function validate() {
 
  alert("Script de validation");

        validForm = true;

        //test du prénom
  
        /*if ( document.getElementById('first').value.length > 2 && document.getElementById('first').value)
        {
          displayNone(document.getElementById('first-error-message'));
        }
        else 
        {
          validForm = false;
          displayBlock(document.getElementById('first-error-message'));
          
        }*/

        handleDisplay(checkRequirements ('first'), 'first');
        handleDisplay(checkRequirements ('name'), 'name');
        handleDisplay(checkRequirements ('email'), 'email');
        handleDisplay(checkRequirements ('birthdate'), 'birthdate');
        handleDisplay(checkRequirements ('quantity'), 'birthdate');

        //test du nom

        /*if ( document.getElementById('last').value.length > 2 && document.getElementById('last').value)
        {
          displayNone(document.getElementById('last-error-message'));
        }
        else 
        {
          validForm = false;
          displayBlock(document.getElementById('last-error-message'));
        }

        //test de l'email

        if (document.getElementById('email').value.match(mailFormat) && document.getElementById('email').value )
        {
          displayNone(document.getElementById('email-error-message'));
        }
        else 
        {
          displayBlock(document.getElementById('email-error-message'));
          validForm = false;
        }

         //test de la date de naissance

         if (document.getElementById('birthdate').value)
         {
           displayNone(document.getElementById('birthdate-error-message'));
         }
         else 
         {
           displayBlock(document.getElementById('birthdate-error-message'));
           validForm = false;
         }

          //test du nombre de tournois

          if (document.getElementById('quantity').value)
          {
            displayNone(document.getElementById('quantity-error-message'));
          }
          else 
          {
            displayBlock(document.getElementById('quantity-error-message'));
            validForm = false;
          }*/

  
        //test du choix de la ville
        
        //On recupère la liste des enfants de location-selectors, et on la transforme en tableau
        const locationSelectors = [].slice.call(document.getElementById("location-selectors").children);
        /*console.log("location selectors "+locationSelectors);*/
        
        
        //Via la fonction checkIfChecked, on vérifie si au moins une des radio est selectionnée.
        //Si ce n'est pas le cas, on passe validForm à false
        if (checkIfChecked(locationSelectors))
        {
          displayNone(document.getElementById('radio-error-message'));
        }
        else
        {
          validForm = false;
          displayBlock(document.getElementById('radio-error-message'));
        }


        //checking the checkbox for terms and conditions
        if (document.getElementById('checkbox1').checked)
        {
          displayNone(document.getElementById('checkbox1-error-message'));
        }
        else
        {
          validForm = false;
          displayBlock(document.getElementById('checkbox1-error-message'));
        }

        //On renvoie ValidForm pour valider ou non le formulaire.
        console.log(validForm);
        
        if (validForm) 
        {


          alert("Votre formulaire d'inscription a bien été pris en compte");
          /*displayBlock(document.getElementById('confirmation-message'));
          setTimeout(function(){ 
            displayNone(document.getElementById('confirmation-message'));
          }, 3000);*/
        }  
        
        return validForm;
        /*return false;*/
}

function checkRequirements ($id) {
      switch ($id) {
      case 'first':
        if ( document.getElementById($id).value.length > 2 && document.getElementById($id).value)
        {
          return true;
        }
        else{
          return false;
        }
      break;
      case 'last':
      break;
      case 'birthdate':
      break;
      case 'email':
      break;
      case 'quantity':
      break;
      }
}

function handleDisplay ($requirementsMet, $fieldID)
{
  if ($requirementsMet = true)
  {
    displayNone(document.getElementById($fieldID+'-error-message'));
  }
  else 
  {
    validForm = false;
    displayBlock(document.getElementById($fieldID+'-error-message'));
  }
}


//Fonction qui rend un bloc visible

function displayBlock ($element) {
          $element.style.display = 'block';
}


//fonction qui rend un bloc invisible
function displayNone ($element) {
  $element.style.display = 'none';
}

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

