let str = document.URL;
let url = new URL(str);
let params = new URLSearchParams(url.search);
let productId = params.get("id");

// stock l'url + id de l'article
fetch("http://localhost:3000/api/products/" + productId) 
  .then((response) => response.json())
  .catch((error) => {
    // Message d'erreur
    console.log(error)
    let articlesContainer = document.querySelector(".items");
    articlesContainer.innerHTML =
      "Nous n'avons pas réussi à afficher le produit";
    articlesContainer.style.textAlign = "center";
    articlesContainer.style.padding = "10px";
  })

  .then(function (resultatAPI) {
    // fonction qui retourne les données de l'API
    const oneArticle = resultatAPI; // resultat de l'API pour un produit
    // Array des données de l'API

    let productImg = document.createElement("img"); // création dla balise img
    document.querySelector(".item__img").appendChild(productImg);
    productImg.src = oneArticle.imageUrl;
    productImg.alt = oneArticle.altTxt;

    let productTitle = document.querySelector("#title"); // modification du h1 et non création
    productTitle.innerHTML = oneArticle.name;

    let productPrice = document.querySelector("#price"); // modification du span p
    productPrice.innerHTML = oneArticle.price;

    let productDescription = document.querySelector("#description"); // modification de p
    productDescription.innerHTML = oneArticle.description;

    for (let color of oneArticle.colors) {
      // Boucle pour récuperer les valeurs for..of
      const productColor = document.createElement("option"); // création d'un element "option"
      document.querySelector("#colors").appendChild(productColor); // ajout de l'element option
      productColor.value = color; // ajout de lattribut value avec la réponse colors (index)
      productColor.innerHTML = color; // retourne la valeur de la proprité colors
      // console.table(oneArticle.colors) // tableau des choix des couleurs (afficher dans la console)
    }

    let addCanap = document.querySelector("#addToCart");

    // Création de variable qui vont récupérer les valeurs des inputs :
    const colors = document.querySelector("#colors");
    const quantity = document.querySelector("#quantity");

    addCanap.addEventListener("click", () => {
      // Variable pour récupérer les informations de l'utilisateurs uniquement lors de l'action au click.
      const selectColor = colors.value;
      const selectQuantity = quantity.value;

      // Création d'une variable en format objet pour récupérer les informations du produit

      if (selectColor == []) {
        alert("Veuillez choisir une couleur");
      } else if (
        selectQuantity <= 0 ||
        selectQuantity == "" ||
        selectQuantity > 100
      ) {
        alert("Veuillez indiquer une quantité correcte");
      } else {
        let articleInCart = {
          productName: oneArticle.name,
          productId: oneArticle._id,
          productColor: selectColor,
          productQuantity: selectQuantity,
          productImg: oneArticle.imageUrl,
          productImg_altTxt: oneArticle.altTxt,
        };

        // On récupère le panier
        let productLocalStorage = JSON.parse(localStorage.getItem("product"));
        let newProduct = null;
        // Un élement existe dans le panier :
        if (productLocalStorage != null) {
          newProduct = productLocalStorage.find(
            (element) =>
              element.productId === oneArticle._id &&
              element.productColor === selectColor
          );
        }
        if (newProduct) {
          let addNumberOfProducts = Number(selectQuantity);
          let CurrentQuantityOfProducts = Number(newProduct.productQuantity);
          newProduct.productQuantity =
            CurrentQuantityOfProducts + addNumberOfProducts;

          localStorage.setItem("product", JSON.stringify(productLocalStorage));
          alert(
            "la quantité de ce produit est maintenant de  : " +
              newProduct.productQuantity
          );
        } else if (productLocalStorage) {
          productLocalStorage.push(articleInCart);
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
          console.table(productLocalStorage);
          alert(
            `votre commande de ${selectQuantity} ${oneArticle.name} en couleur ${selectColor} est ajouté au panier.`
          );
        } else {
          productLocalStorage = [];
          productLocalStorage.push(articleInCart);
          localStorage.setItem("product", JSON.stringify(productLocalStorage));
          alert(
            `votre commande de ${selectQuantity} ${oneArticle.name} en couleur ${selectColor} est ajouté au panier.`
          );
        }
      }
    });
  });
