


// Déclaration de la variable de la key "product" present dans le local Storage
const productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productLocalStorage); // tous les produits présent dans le locageStorage

let productBuy = [] ; // creation tableau vide
let sectionItems = document.getElementById("cart__items"); // definir le parent
let arrayPrice = [];
let arrayQuantity = [];


for(let product in productLocalStorage) { // 1 product parmis tous les products
    
   let productArticle = document.createElement("article");
       productArticle.classList.add("cart__item");
       productArticle.setAttribute("data-id", "{productLocalStorage[product].productId}"); // attribut ID
       productArticle.setAttribute("data-color", "{productLocalStorage[product].productColor}");

       productBuy.push(productLocalStorage[product].productId); // injecter la valeur ID
       // console.table(productBuy);


       productArticle.innerHTML = 
       `<div class="cart__item__img">
           <img src="${ productLocalStorage[product].productImg}" alt="${productLocalStorage[product].productImg_alt}">
           </div>
        <div class="cart__item__content">
           <div class="cart__item__content__titlePrice">
               <h2>${productLocalStorage[product].productName} - ${productLocalStorage[product].productColor}</h2>
               <p>${productLocalStorage[product].productPrice} </p>
           </div>
           <div class="cart__item__content__settings">
               <div class="cart__item__content__settings__quantity">
                   <p>Qté : </p>
                   <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productLocalStorage[product].productQuantity}">
                   </div>
                   <div class="cart__item__content__settings__delete">
                   <p class="deleteItem">Supprimer</p>
               </div>
           </div>
       </div>`;
       sectionItems.appendChild(productArticle);
       
       updateTotal(); 
                   
}

  // identifier les champs du formulaire 

  let firstName = document.querySelector("#firstName");
  let firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

  let lastName = document.querySelector("#lastName");
  let lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

  let address = document.querySelector("#address");
  let addressErrorMsg = document.querySelector("#addressErrorMsg");

  let city = document.querySelector("#city");
  let cityErrorMsg = document.querySelector("#cityErrorMsg");

  let email = document.querySelector("#email");
  let emailErrorMsg = document.querySelector("#emailErrorMsg");


// Formulaire



changeQuantity();          
deleteProduct();
updateTotal();
noProductInCart();
console.table(localStorage);

// ****************** TOUTES LES FONCTIONS ******************************


//Met à jour le panier quand un produit vient à être supprimé ou quand l'utilisateur change la quantité d'un produit
function updateTotal(){

   let total = document.getElementsByClassName("cart__item");
   let price = document.getElementsByClassName("cart__item__content__titlePrice");

   let totalPrices = 0 ;
   let totalQty = [] ;
   let qty = 0

   for (let i=0; i < total.length; i++) {
       totalQty.push(Number (total.item(i).getElementsByClassName("itemQuantity").item(0).getAttribute("value")));
       qty += totalQty[i];
   }

   for (let i=0; i < total.length; i++) {
       totalPrices += Number(totalQty[i])*Number(price.item(i).lastElementChild.innerHTML);
   }

   document.getElementById("totalQuantity").innerHTML = qty;

   document.getElementById("totalPrice").innerHTML = totalPrices;

   
}


//Met à jour le panier quand on modifie la quantité
function changeQuantity() {   
   // je cible la class de l'input
   let itemQuantity = document.getElementsByClassName('itemQuantity');
   console.log(itemQuantity)
   // je parcours toutes les champs "Quantity" de chaque produit
   for (let q = 0; q < itemQuantity.length; q++) {
       let changeQuantity = itemQuantity[q] ;
   // lorsque je change la value de l'input - la MAJ se fait automatiquement
       changeQuantity.addEventListener('input', (event) => {
                     
           itemQuantity.innerHTML += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" 
           value="${event.target.value}">`;
       // quantité du produit devient le nouveau chiffre présent dans l'input
       productLocalStorage[q].productQuantity = Number(changeQuantity.value);
       //  met à jour la key "product' et converti OBJET => JSON
       localStorage.setItem("product", JSON.stringify(productLocalStorage));
       // rafraichi la page         
       location.reload();            
       })      
       
}}

// Action : Supprimer le produit depuis le panier
 function deleteProduct() {
   let btn_delete = document.querySelectorAll(".deleteItem"); // recupérer TOUS les btn "supprimer"
   console.log(btn_delete);


   for (let i = 0; i < btn_delete.length; i++){ // iteration pour chaque btn_delete
   // // Ceci sera exécuté i fois
   // // À chaque éxécution, la variable "btn_delete" augmentera de 1
   // // Lorsque'elle sera arrivée à i, le boucle se terminera.
   let deleteOne = btn_delete[i] ;

   deleteOne.addEventListener("click" , (event) => { // action lors d'un click
   productLocalStorage.splice(i,1); // supprime le dernier element                 
   localStorage.setItem("product", JSON.stringify(productLocalStorage)); // converti un objet JS en texte lisible
   alert('Votre produit a bien été supprimé.');
   window.location.reload();                             
   })
   }
}

// Si Panier vide - renvoie accueil
function noProductInCart() {
   if (localStorage.product == '[]') {
       alert("aucun produit dans le panier");
       window.location = "index.html";
   } 
}

changeQuantity();
deleteProduct();
