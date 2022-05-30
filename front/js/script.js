// Etape 1 : Récupérer les produits de l'api 

fetch('http://localhost:3000/api/products')
.then(response => response.json())
.catch((error) => {

})
.then(function(resultatAPI){
    console.log(resultatAPI)
    let articles = resultatAPI;

    for(let article in articles){
        console.log(resultatAPI[article].name)
       /*          
        <a href="./product.html?id=42">
        <article>
          <img src=".../product01.jpg" alt="Lorem ipsum dolor sit amet, Kanap name1">
          <h3 class="productName">Kanap name1</h3>
          <p class="productDescription">Dis enim malesuada risus sapien gravida nulla nisl arcu. Dis enim malesuada risus sapien gravida nulla nisl arcu.</p>
        </article>
      </a> -*/
      let articleLink = document.createElement('a');
      document.querySelector('.items').appendChild(articleLink)

articleLink.href = `product.html?id=${resultatAPI[article]._id}`;

let newArticle = document.createElement('article');
articleLink.appendChild(newArticle);

let newImg = document.createElement('img');
newArticle.appendChild(newImg);
newImg.src = resultatAPI[article].imageUrl;
newImg.alt = resultatAPI[article].altTxt;

let articleTitle = document.createElement('h3');
newArticle.appendChild(articleTitle);
articleTitle.innerHTML = resultatAPI[article].name;
articleTitle.classList.add('productName');

let articleText = document.createElement('p');
newArticle.appendChild(articleText);
articleText.innerHTML= resultatAPI[article].description;
articleText.classList.add('productDescription')



    }
})

// Etape 2 : Afficher les produits dans le DOM 



