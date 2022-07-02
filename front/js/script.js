fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  // Retourne une erreur si l'api ne fonctionne pas.
  .catch((error) => {
    console.log(error)
  })
  .then(function (resultatAPI) {
    let articles = resultatAPI;

    // Je boucle sur les articles présent dans l'API 
    for (let article in articles) {
      let articleLink = document.createElement("a");
      document.querySelector(".items").appendChild(articleLink);

      articleLink.href = `product.html?id=${resultatAPI[article]._id}`;

      let newArticle = document.createElement("article");
      articleLink.appendChild(newArticle);

      let newImg = document.createElement("img");
      newArticle.appendChild(newImg);
      newImg.src = resultatAPI[article].imageUrl;
      newImg.alt = resultatAPI[article].altTxt;

      let articleTitle = document.createElement("h3");
      newArticle.appendChild(articleTitle);
      articleTitle.innerHTML = resultatAPI[article].name;
      articleTitle.classList.add("productName");

      let articleText = document.createElement("p");
      newArticle.appendChild(articleText);
      articleText.innerHTML = resultatAPI[article].description;
      articleText.classList.add("productDescription");
    }
  });
