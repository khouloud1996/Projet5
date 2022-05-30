const productLocalStorage = JSON.parse(localStorage.getItem('product'));
let productBuy = [];
let sectionItems = document.getElementById('cart__items');

for (let product in productLocalStorage) {

  fetch('http://localhost:3000/api/products/' + productLocalStorage[product].productId)
    .then(response => response.json())
    .catch((error) => { })
    .then(function (resultatAPI) {

      let productArticle = document.createElement('article');
      productArticle.classList.add('cart__item');
      productArticle.setAttribute("data-id", "{productLocalStorage[product].productId}");
      productArticle.setAttribute('data-color', "{productLocalStorage[product].productColor}");
      productArticle.innerHTML = `<div class="cart__item__img">
      <img src="${productLocalStorage[product].productImg}" alt="${productLocalStorage[product].productImg_altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productLocalStorage[product].productName} - ${productLocalStorage[product].productColor}</h2>
        <p>${resultatAPI.price} €</p>
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
  </article>`

      sectionItems.appendChild(productArticle);
    //  cartTotal(product);
    })
}

function changeQuantity() {

  // Récupérer l'input qu'on modifie/ 
  let item = document.getElementsByClassName('itemQuantity');
  console.log(item);
  // Parcourir le tableau qui correspond au produit qu'on modifie.
  for (let q = 0; q < item.length; q++) {
    console.log("Je suis la 2 ");
    let changeQuantity = item[q] ;
    changeQuantity.addEventListener('input', (event) => {
      console.log('ici');
                  
      item.innerHTML += `<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${event.target.value}">`;
    productLocalStorage[q].productQuantity = Number(changeQuantity.value);
    localStorage.setItem("product", JSON.stringify(productLocalStorage));
        
    location.reload();            
    })      
 

  }

  /*
  function upDatePriceAndQuantity(id, newValue){
    const itemToUpDate = cart.find((item) => item.id === id)
    console.log("itemToUpDate", itemToUpDate);
    console.log("newValue", newValue)
  }
  */
}


// Création d'une fonction de suppression : 
function deleteProduct() {
  // On récupère tous les bouton avec la classe deleteItem
  let btn = document.querySelectorAll(".deleteItem");
  // On boucle sur les btn 
  for (let i = 0; i < btn.length; i++) {

    // On récupère le btn suivant l'index 
    let deleteOne = btn[i];

    // Quand on click dessus on déclenche un event
    deleteOne.addEventListerner('click', (event) => {
    
      // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
      productLocalStorage.splice(btn[i], 1);
      localStorage.setItem('product', JSON.stringify(productLocalStorage));

      // On recharge la page
      window.location.reload();
      alert('article supprimé')

    })
  }
}

/*
function cartTotal(product){

  let arrayPrice = [];
  let arrayQuantity = [];

  // parseInt : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/parseInt
  arrayQuantity.push(parseInt(productLocalStorage[product].productQuantity));
  // Reduce : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce
  let totalQuantity = arrayQuantity.reduce(function(a, b){
    return a+ b;
  })

  // On affiche la quantité dans l'id totalQuantity
  //  <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
  document.querySelector('#totalQuantity').innerHTML = totalQuantity;


  // Faire la même chose pour le prix :) 
  
  arrayPrice.push(parseInt(productLocalStorage[product].productPrice));
}  let totalPrice = arrayPrice.reduce(function(a, b){
  return a+b;
})
document.querySelector('#totalPrice').innerHTML = totalPrice;



/*


  Reste à faire : 
        - Calculer le prix du panier au chargement de la page
        - Modifier le prix du panier au changement de quantité
        - Mettre en place des REGEX pour validés le formulaire
        - Créer un objet pour envoyer la commande du client sur la route dédiés http://localhost:3000/api/products/order
        - Rediriger sur la page "confirmation.html" en affichant l'UUID (l'envoyer dans l'URL)

*/

// Calcul du prix : 




changeQuantity();
deleteProduct();
