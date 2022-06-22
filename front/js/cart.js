// Récupération des informations des produits depuis l'API
fetch("http://localhost:3000/api/products/")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function getKanap(api) {
    let products = JSON.parse(localStorage.getItem("product"));
    displayItem(api, products);
    getTotalQty(api, products);
  })
  .catch(function (err) { });

// Fonction pour afficher les produits dans le DOM
function displayItem(api, products) {
  if (products === null || products.length === 0) {
    const emptyCart = document.createElement("p");
    emptyCart.innerText = "Votre panier est vide";
    document.querySelector("#cart__items").appendChild(emptyCart);
  } else {
    for (let product of products) {
      for (let data of api) {
        if (product.productId === data._id) {
          createProductCard(product, data);
        }
      }
    }

    changeQty(api, products);
    deleteItem(api, products);
  }
}

// Création des cartes dans le DOM
function createProductCard(localStorage, api) {
  const produitPanier = `<article class="cart__item" data-id="${api._id}" data-color=${localStorage.productColor}>
    <div class="cart__item__img">
      <img src="${localStorage.productImg}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${api.name} - ${localStorage.productColor}</h2>
        <p id="partielPrice">${api.price} €</p>
     </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté :  </p>
          <input type="number" class="itemQuantity" data-id="${api._id}" name="itemQuantity" min="1" max="100" pattern="[0-9]+" value="${localStorage.productQuantity}">
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
}

// On calcule le nombre de produit dans le panier
function getTotalQty(api, products) {
  // On créer une variable qu'on incrémente à chaque tour de boucle ( SUMQTY )
  let sumQty = 0;
  let priceTotal = 0;
  if (products === null) {
    document.getElementById("totalQuantity").innerText = "";
  } else {
    for (let product of products) {
      sumQty = sumQty + parseInt(product.productQuantity);
    }

    // Si j'ai au moins un produit dans le panier :
    if (sumQty > 1) {
      for (let product of products) {
        for (let data of api) {
          if (product.productId === data._id) {
            priceTotal = priceTotal + product.productQuantity * data.price;
          }
        }
      }
      document.getElementById("totalQuantity").innerText = sumQty;
      document.getElementById("totalPrice").innerText = priceTotal;
    } else {
      // Sinon le panier est vide donc j'informe le client
    }
  }
}

function changeQty(api, products) {
  const inputs = document.querySelectorAll(".itemQuantity");
  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      const product = input.closest("article");
      const productId = product.dataset.id;
      const productColor = product.dataset.color;
      if (
        products.some(
          (e) => e.productId === productId && e.productColor === productColor
        )
      ) {
        let objIndex = products.findIndex(
          (product) =>
            product.productId === productId &&
            product.productColor === productColor
        );
        products[objIndex].productQuantity = input.valueAsNumber;
        console.log(products);
      }
      let productsJson = JSON.stringify(products);
      localStorage.setItem("product", productsJson);
      getTotalQty(api, products);
    });
  });
}

function deleteItem(api, products) {
  const itemDelete = document.querySelectorAll(".deleteItem");
  itemDelete.forEach((item) => {
    item.addEventListener("click", function () {
      const product = item.closest("article");
      product.remove();
      const productId = product.dataset.id;
      const productColor = product.dataset.color;
      if (
        products.some(
          (e) => e.productId === productId && e.productColor === productColor
        )
      ) {
        let objIndex = products.findIndex(
          (product) =>
            product.productId === productId &&
            product.productColor === productColor
        );
        products.splice(objIndex, 1);
        let productsJson = JSON.stringify(products);
        console.log(productsJson);
        localStorage.setItem("product", productsJson);
        getTotalQty(api, products);
      }
    });
  });
}



let firstName = document.getElementById("firstName");
firstName.addEventListener("change", function () {
      validFirstName(this);
    });

      // Function that return true or false if the regexp for the city is respected
function validFirstName(inputFirstName) {
  let textRegExp = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");

  if (!textRegExp.test(inputFirstName.value)) {
        document.getElementById("firstNameErrorMsg").innerText = "Exemple : alex";
        return false;
  } else if (inputFirstName.value.length < 2) {
        document.getElementById("firstNameErrorMsg").innerText = "Vérifiez votre Nom";
        return false;
  } else {
        document.getElementById("firstNameErrorMsg").innerText = "";
        return true;
  }
}

let lastName = document.getElementById("lastName");
lastName.addEventListener("change", function () {
      validLastName(this);
    });

      // Function that return true or false if the regexp for the city is respected
function validLastName(inputLastName) {
  let textRegExp = new RegExp("^[a-zA-Z][a-zA-Z .,'-]*$", "g");

  if (!textRegExp.test(inputLastName.value)) {
        document.getElementById("lastNameErrorMsg").innerText = "Exemple : doireau";
        return false;
  } else if (inputLastName.value.length < 3) {
        document.getElementById("lastNameErrorMsg").innerText = "Vérifiez votre prenom";
        return false;
  } else {
        document.getElementById("lastNameErrorMsg").innerText = "";
        return true;
  }
}


let address = document.getElementById("address");
address.addEventListener("change", function () {
      validAddress(this);
    });

      // Function that return true or false if the regexp for the city is respected
function validAddress(inputAddress) {
  let textRegExp = new RegExp( "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  if (!textRegExp.test(inputAddress.value)) {
        document.getElementById("addressErrorMsg").innerText = "Exemple : 81 avenue maurice chevalier";
        return false;
  } else if (inputAddress.value.length < 4) {
        document.getElementById("addressErrorMsg").innerText = "Vérifiez votre adresse";
        return false;
  } else {
        document.getElementById("addressErrorMsg").innerText = "";
        return true;
  }
}


let city = document.getElementById("city");
city.addEventListener("change", function () {
      validCity(this);
});
// Function that return true or false if the regexp for the city is respected
function validCity(inputCity) {
  let textRegExp = new RegExp("^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$");

  if (!textRegExp.test(inputCity.value)) {
        document.getElementById("cityErrorMsg").innerText = "Exemple : Paris";
        return false;
  } else if (inputCity.value.length < 5) {
        document.getElementById("cityErrorMsg").innerText = "Vérifiez votre email, elle semble incomplète";
        return false;
  } else {
        document.getElementById("cityErrorMsg").innerText = "";
        return true;
  }
}

let email = document.getElementById("email");
email.addEventListener("change", function () {
      validEmail(this);
});

// Function that return true or false if the regexp for the email is respected
function validEmail(inputEmail) {
      let emailRegExp = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$", "g");
   
      if (!emailRegExp.test(inputEmail.value)) {
            document.getElementById("emailErrorMsg").innerText = "Exemple : contact@kanap.fr";
            return false;
      } else if (inputEmail.value.length < 6) {
            document.getElementById("emailErrorMsg").innerText = "Vérifiez votre email, elle semble incomplète";
            return false;
      } else {
            document.getElementById("emailErrorMsg").innerText = "";
            return true;
      }
}


document.getElementById("order").addEventListener('click', function (e) {
  e.preventDefault();

  const products = JSON.parse(localStorage.getItem("product"))
  if (products === null || products.length < 1) {
    alert('Panier vide');
  } else if(validEmail(email)){
  
    const productsId = [];
    products.forEach((product) => {
      productsId.push(product.productId);
    });

    const order = {
      contact: {
/*
        firstName: 'toto',
        lastName: 'tata',
        address: 'titi',
        city: 'titit',
        email: email.value,
        */
        
        firstName: firstName,
        lastName: lastName,
        address: address,
        city: city,
        email: email,
       
      },
      products: productsId,
    };
    orderProduct(order);

  }
  

})



//Envoi de l'utilisateur vers la page de confirmation en supprimant le localStorage

function orderProduct(order) {

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  })
    .then(function (res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function (value) {
      console.log(order)
      window.location = `./confirmation.html?orderId=${value.orderId}`;
      localStorage.clear();
    })
    .catch(function (err) {
      console.log(err);
    });
}








