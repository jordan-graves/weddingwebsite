function scroll1(a)
{
    console.log(a);
    let element= document.getElementById(a);
    element.scrollTo();
    
}

function updateGuestCount() {
   let num = parseInt(document.getElementById("guestCount").value);
   document.getElementById("addGuests").style.display = "none";
   document.getElementById("addGuests1").style.display = "none";
   document.getElementById("addGuests2").style.display = "none";
   document.getElementById("addGuests3").style.display = "none";
   document.getElementById("addGuests4").style.display = "none";

if (num>1) {
   document.getElementById("addGuests").style.display = "block";
   document.getElementById("addGuests1").style.display = "block";
}
if (num>2) {
   document.getElementById("addGuests2").style.display = "block";
}
if (num>3) {
   document.getElementById("addGuests3").style.display = "block";
}
if (num>4) {
   document.getElementById("addGuests4").style.display = "block";
}
}

function submitted() {
   document.getElementById("form").style.display="none";
   document.getElementById("confirmation").style.display="block";
}

// let form;
// let action;

// function findElements() {
//   form = document.querySelector('form');
//   ({ action } = form);
// }

// function showMessage(data) {
//   alert(data.message);
// }

// function onSuccess(response) {
//   return response.json().then(showMessage);
// }

// function onError(data) {
//   console.error(data);
// }

// function collectData(currentForm) {
//   const data = new FormData(currentForm);
//   return data;
// }

// function setOptions(currentForm) {
//   return {
//     method: 'post',
//     body: collectData(currentForm),
//   };
// }

// function sendForm(currentForm) {
//   return fetch(action, setOptions(currentForm));
// }

// function onSubmit(event) {
//   event.preventDefault();
//   const { currentTarget } = event;
//   sendForm(currentTarget)
//     .then(response => onSuccess(response, currentTarget))
//     .catch(onError);
// }

// function subscribe() {
//   form.addEventListener('submit', onSubmit);
// }

// function init() {
//   findElements();
//   subscribe();
// }

// init(); 
 /*
setTimeout(function() {

   let d= document.getElementsByClassName("MagicScroll");

   for (let i=0; i<d.length; i++) {
d[i].style.height="500px";
//d[i].style.position="500px";
   }
 },2000);
 */

 