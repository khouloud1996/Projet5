




/*

// Déclaration de la variable de la key "product" present dans le local Storage
const produitLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(produitLocalStorage); // tous les produits présent dans le locageStorage

for (let product in produitLocalStorage) { // 1 product parmis tous les products
  fetch("http://localhost:3000/api/products/" + produitLocalStorage[product].productId) // stock l'url + id de l'article

    .then(response => response.json())
    .catch((error) => { // Message d'erreur

    })
    .then(function (resultatAPI) {

      //Affichage des produits sur la page

      //Déclaration de la fonction pour l'affichage
      const displayCart = () => {
        //Affichage des éléments du local storage après avoir vérifier qu'il n'est pas vide
        if (produitLocalStorage.length === 0) {
          document.getElementById("cart__items").innerHTML = `<p>Le panier est vide<p>`;
        } else {
          document.getElementById("cart__items").innerHTML = "";

          //Boucle for pour récupérer les éléments de chaque produit du localStorage
          for (j = 0; j < produitLocalStorage.length; j++) {
            //Convertir les données string en number pour pouvoir les manipuler
            const priceUnit = Number(produitLocalStorage[j].price);
            const quantityUnit = Number(produitLocalStorage[j].quantity);
            //Calcul du prix de chaque produit
            const partielPrice = priceUnit * quantityUnit;

            //Déclaration et affichage de chaque article du panier
            const produitPanier = `<article class="cart__item" id="${produitLocalStorage[j].getId}" data-color=${produitLocalStorage[j].colorsOption}>
     <div class="cart__item__img">
       <img src="${produitLocalStorage[j].imageUrl}" alt="Photographie d'un canapé">
     </div>
     <div class="cart__item__content">
       <div class="cart__item__content__titlePrice">
         <h2>${produitLocalStorage[j].nameKanap} - ${produitLocalStorage[j].colorsOption}</h2>
         <p id="partielPrice">${partielPrice} €</p>
      </div>
       <div class="cart__item__content__settings">
         <div class="cart__item__content__settings__quantity">
           <p>Qté :  </p>
           <input type="number" class="itemQuantity" data-id="${produitLocalStorage[j].getId}" name="itemQuantity" min="1" max="100" pattern="[0-9]+" value="${produitLocalStorage[j].quantity}">
         </div>
         <div class="cart__item__content__settings__delete">
           <p id="deleteItem" class="deleteItem">Supprimer</p>
        </div>
       </div>
     </div>
        </article>`;

            document
              .getElementById("cart__items")
              .insertAdjacentHTML("beforeend", produitPanier);

            //Appel des fonctions pour modifier les quantités et supprimer les articles
            addDeleteAction(produitLocalStorage[j].getId);
          }
        }
      };

      //Déclaration et création de fonction suppression de l'article au click du bouton "Supprimer"
      const addDeleteAction = (id) => {
        const deleteItem = document.getElementById(id).querySelector(".deleteItem");
        const item = document.getElementById(id);
        deleteItem.addEventListener("click", () => {
          const idItem = item.getAttribute("id");
          const colorItem = item.getAttribute("data-color");
          produitLocalStorage = produitLocalStorage.filter(
            (p) => p.getId !== idItem || p.colorsOption !== colorItem);
          localStorage.setItem("product", JSON.stringify(produitLocalStorage));
          displayCart();
          displayTotalPrice();
          displayTotalQuantity();
        });
      };

      //Changer la quantité du panier par l'utilisateur
      let input = document.querySelector('#cart__items')

      input.addEventListener('input', (event) => {
        const id = event.target.getAttribute("data-id");
        const color = event.target.closest('.cart__item').getAttribute("data-color")
        const newQuantity = event.target.value;

        for (let i = 0; i < produitLocalStorage.length; i++) {
          if (produitLocalStorage[i].getId === id && produitLocalStorage[i].colorsOption === color) {
            produitLocalStorage[i].quantity = newQuantity
            console.log(produitLocalStorage[i].quantity)
            localStorage.setItem("product", JSON.stringify(produitLocalStorage));
            displayTotalPrice();
            displayTotalQuantity();
            displayCart();
          }
        }
      })

      //Calcul du prix total du panier
      const displayTotalPrice = () => {
        const storage = localStorage.getItem("product");
        if (storage) {
          const product = JSON.parse(storage);
          const totalPrice = product.reduce(
            (acc, el) => acc + Number(el.quantity * el.price), 0);

          document.querySelector("#totalPrice").innerHTML = totalPrice;
        }
      };
      displayTotalPrice();

      //Calcul du nombre total d'articles
      const displayTotalQuantity = () => {
        const storage = localStorage.getItem("product");
        if (storage) {
          const product = JSON.parse(storage);
          const totalQuantity = product.reduce(
            (acc, el) => acc + Number(el.quantity),
            0
          );
          document.querySelector("#totalQuantity").innerHTML = totalQuantity;
        }
      };
      displayTotalQuantity();

      displayCart();

      //Formulaire - mise en place des RegEX pour vérifier les entrées de l'utilisateur
      let form = document.querySelector(".cart__order__form");

      form.firstName.addEventListener("input", function () {
        validFirstName(this);
      });
      const validFirstName = function (inputFirstName) {
        let nameRegExp = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");
        let testFirstName = nameRegExp.test(inputFirstName.value);
        if (testFirstName) {
          inputFirstName.nextElementSibling.innerHTML = "";
          return true;
        } else {
          inputFirstName.nextElementSibling.innerHTML = "Saisissez votre prénom";
          return false;
        }
      };

      form.lastName.addEventListener("input", function () {
        validLastName(this);
      });

      const validLastName = function (inputLastName) {
        let nameRegExp = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");
        let testLastName = nameRegExp.test(inputLastName.value);
        if (testLastName) {
          inputLastName.nextElementSibling.innerHTML = "";
          return true;
        } else {
          inputLastName.nextElementSibling.innerHTML = "Saisissez votre nom";
          return false;
        }
      };

      form.address.addEventListener("input", function () {
        validAddress(this);
      });

      const validAddress = function (inputAdress) {
        let addressRegExp = new RegExp(
          "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
        );
        let testAdress = addressRegExp.test(inputAdress.value);
        if (testAdress) {
          inputAdress.nextElementSibling.innerHTML = "";
          return true;
        } else {
          inputAdress.nextElementSibling.innerHTML = "Saisissez votre adresse";
          return false;
        }
      };

      form.city.addEventListener("input", function () {
        validCity(this);
      });

      const validCity = function (inputCity) {
        let cityRegExp = new RegExp(
          "^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$",
          "g"
        );
        let testCity = cityRegExp.test(inputCity.value);
        if (testCity) {
          inputCity.nextElementSibling.innerHTML = "";
          return true;
        } else {
          inputCity.nextElementSibling.innerHTML = "Saisissez votre ville";
          return false;
        }
      };

      form.email.addEventListener("input", function () {
        validEmail(this);
      });

      const validEmail = function (inputEmail) {
        let emailRegExp = new RegExp(
          "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$",
          "g"
        );
        let testEmail = emailRegExp.test(inputEmail.value);

        if (testEmail) {
          inputEmail.nextElementSibling.innerHTML = "";
          return true;
        } else {
          inputEmail.nextElementSibling.innerHTML =
            "Saisissez votre adresse mail complète";
          return false;
        }
      };

      //Requête POST pour envoyer les données à l'API et récupérer le numéro de commande
      const orderCommand = (commandOrder) => {
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/JSON",
          },
          body: JSON.stringify(commandOrder),
        })
          .then((data) => data.json())
          .then((data) => {
            console.log(data);
            console.log(data.orderId);
            const orderId = data.orderId;

            //Envoi de l'utilisateur vers la page de confirmation en supprimant le localStorage
            window.location.href = "confirmation.html" + "?" + "name" + "=" + orderId;
            localStorage.clear();
          });
      };
      //Soumission du formulaire et envoi de la commande
      const sendCommand = () => {
        document.querySelector("#order").addEventListener("click", (e) => {
          e.preventDefault();
          if (
            validFirstName(form.firstName) &&
            validLastName(form.lastName) &&
            validAddress(form.address) &&
            validCity(form.city) &&
            validEmail(form.email)
          ) {
            const contact = {
              lastName: form.lastName.value,
              firstName: form.firstName.value,
              address: form.address.value,
              city: form.city.value,
              email: form.email.value,
            };

            const storage = JSON.parse(localStorage.getItem("product"));

            const products = [];
            for (k = 0; k < storage.length; k++) {
              let allId = storage[k].getId;
              products.push(allId);
            }

            let commandOrder = {
              contact,
              products,
            };

            localStorage.setItem("commandOrder", JSON.stringify(commandOrder));

            orderCommand(commandOrder);
          } else {
            alert("Remplissez correctement le formulaire!");
          }
        });
      };
      sendCommand();




/*

// Déclaration de la variable de la key "product" present dans le local Storage
const productLocalStorage = JSON.parse(localStorage.getItem("product"));
console.table(productLocalStorage); // tous les produits présent dans le locageStorage

let productBuy = []; // creation tableau vide
let sectionItems = document.getElementById("cart__items"); // definir le parent
let arrayPrice = [];
let arrayQuantity = [];



for (let product in productLocalStorage) { // 1 product parmis tous les products

    fetch("http://localhost:3000/api/products/" + productLocalStorage[product].productId) // stock l'url + id de l'article

        .then(response => response.json())
        .catch((error) => { // Message d'erreur

        })
        .then(function (resultatAPI) {

            let productArticle = document.createElement("article");
            productArticle.classList.add("cart__item");
            productArticle.setAttribute("data-id", "{productLocalStorage[product].productId}"); // attribut ID
            productArticle.setAttribute("data-color", "{productLocalStorage[product].productColor}");

            productBuy.push(productLocalStorage[product].productId); // injecter la valeur ID
            console.table(productBuy);


/*
            <!--  <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
            <div class="cart__item__img">
              <img src="../images/product01.jpg" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
              <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>Vert</p>
                <p>42,00 €</p>
              </div>
              <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                  <p>Qté : </p>
                  <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                </div>
                <div class="cart__item__content__settings__delete">
                  <p class="deleteItem">Supprimer</p>
                </div>
              </div>
            </div>
          </article> -->



            productArticle.innerHTML =
                `<article class="cart__item" id="${productLocalStorage[product].productId}" data-color="${productLocalStorage[product].productColor}">
                 <div class="cart__item__img">
           <img src="${productLocalStorage[product].productImg}" alt="${productLocalStorage[product].productImg_alt}">
           </div>
        <div class="cart__item__content">
           <div class="cart__item__content__titlePrice">
               <h2>${productLocalStorage[product].productName} - ${productLocalStorage[product].productColor}</h2>
               <p>${resultatAPI.price} € </p>
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
       </div>
       </article>`;
            sectionItems.appendChild(productArticle);

       //     updateTotal(resultatAPI);

            // Passer un id ou un élement unique et boucler uniquement dessus
            deleteProduct(productLocalStorage[product].productId);
           // changeQuantity();
        })


     const deleteProduct = (id) => {
        const deleteItem = document.getElementById(id).querySelector(".deleteItem");
        const item = document.getElementById(id);
        deleteItem.addEventListener("click", () => {

            const idItem = item.getAttribute('id');
            const colorItem = item.getAttribute('data-color');
            
            produitLocalStorage = productLocalStorage.filter(
                (p) => p.productId !== idItem || p.productColor !== colorItem
            )
              localStorage.setItem('product', JSON.stringify(produitLocalStorage));
                               
        })
        
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



    // changeQuantity();
    //updateTotal();
    noProductInCart();
    console.table(localStorage);

    // ****************** TOUTES LES FONCTIONS ******************************


    //Met à jour le panier quand un produit vient à être supprimé ou quand l'utilisateur change la quantité d'un produit
    function updateTotal() {

        let total = document.getElementsByClassName("cart__item");
        let price = document.getElementsByClassName("cart__item__content__titlePrice");

        let totalPrices = 0;
        let totalQty = [];
        let qty = 0


        for (let i = 0; i < total.length; i++) {
            totalQty.push(Number(total.item(i).getElementsByClassName("itemQuantity").item(0).getAttribute("value")));
            qty += totalQty[i];
        }

        for (let i = 0; i < total.length; i++) {

            totalPrices += Number(totalQty[i]) * Number(parseFloat(price.item(i).lastElementChild.innerHTML));
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
            let changeQuantity = itemQuantity[q];
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

        }
    }
    

    // Action : Supprimer le produit depuis le panier
    //function deleteProduct(id) {
     //   console.log(id);
      
        let btn_delete = document.querySelectorAll(".deleteItem"); // recupérer TOUS les btn "supprimer"
        console.log(btn_delete);


        for (let i = 0; i < btn_delete.length; i++) { // iteration pour chaque btn_delete
            // // Ceci sera exécuté i fois
            // // À chaque éxécution, la variable "btn_delete" augmentera de 1
            // // Lorsque'elle sera arrivée à i, le boucle se terminera.
            let deleteOne = btn_delete[i];

            deleteOne.addEventListener("click", (event) => { // action lors d'un click
                productLocalStorage.splice(i, 1); // supprime le dernier element                 
                localStorage.setItem("product", JSON.stringify(productLocalStorage)); // converti un objet JS en texte lisible
                alert('Votre produit a bien été supprimé.');
                window.location.reload();
            })
        }
        
    //}

    // Si Panier vide - renvoie accueil
    function noProductInCart() {
        if (localStorage.product == '[]') {
            alert("aucun produit dans le panier");
            window.location = "index.html";
        }
    }

   // changeQuantity();
} 
})
}
*/