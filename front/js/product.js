const str = window.location.href;
const url = new URL(str);
const idProduct = url.searchParams.get("id");
console.log(idProduct);
let article = "";

const colorPicked = document.querySelector("#colors");
const quantityPicked = document.querySelector("#quantity");

getArticle();

//************************Récup des articles de l'API*******************
function getArticle() {
  fetch("http://localhost:3000/api/products/" + idProduct)
    .then((res) => {
      return res.json();
    })

    //************************Récup des données de l'API dans le DOM*******************
    .then(async function (resultatAPI) {
      article = await resultatAPI;
      console.table(article);
      if (article) {
        getPost(article);
      }
    })
    .catch((error) => {
      console.log("Erreur de la requête API");
    });
}

function getPost(article) {
  // ********************Insertion de l'image********************
  let productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = article.imageUrl;
  productImg.alt = article.altTxt;

  // ********************Modif du titre "h1"********************
  let productName = document.getElementById("title");
  productName.innerHTML = article.name;

  // ********************Modif du prix********************
  let productPrice = document.getElementById("price");
  productPrice.innerHTML = article.price;

  // ********************Modif de la description********************
  let productDescription = document.getElementById("description");
  productDescription.innerHTML = article.description;

  // ********************Insertion des couleurs********************
  for (let colors of article.colors) {
    console.table(colors);
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = colors;
    productColors.innerHTML = colors;
  }
  addToCart(article);
}

//********************************Gestion du panier********************************
function addToCart(article) {
  const btn_envoyerPanier = document.querySelector("#addToCart");

  //********************************Ecouter le panier avec 2 conditions couleur non nulle et quantité entre 1 et 100********************************
  btn_envoyerPanier.addEventListener("click", (event) => {
    if (
      quantityPicked.value > 0 &&
      quantityPicked.value <= 100 &&
      quantityPicked.value != 0
    ) {
      //********************************Recup du choix de la couleur********************************
      let choixCouleur = colorPicked.value;

      //********************************Recup du choix de la quantité********************************
      let choixQuantite = quantityPicked.value;

      //********************************Récup des options de l'article à ajouter au panier********************************
      let optionsProduit = {
        idProduit: idProduct,
        couleurProduit: choixCouleur,
        quantiteProduit: Number(choixQuantite),
        nomProduit: article.name,
        prixProduit: article.price,
        descriptionProduit: article.description,
        imgProduit: article.imageUrl,
        altImgProduit: article.altTxt,
      };

      //************************Initialisation du local storage************************
      let produitLocalStorage = JSON.parse(localStorage.getItem("produit"));

      window.location.href = "cart.html";

      //************************Importation dans le local storage************************
      //************************Si le panier comporte déjà au moins 1 article************************
      if (produitLocalStorage) {
        const resultFind = produitLocalStorage.find(
          (el) =>
            el.idProduit === idProduct && el.couleurProduit === choixCouleur
        );
        //************************Si le produit commandé est déjà dans le panier************************
        if (resultFind) {
          let newQuantite =
            parseInt(optionsProduit.quantiteProduit) +
            parseInt(resultFind.quantiteProduit);
          resultFind.quantiteProduit = newQuantite;
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
          //************************Si le produit commandé n'est pas dans le panier************************
        } else {
          produitLocalStorage.push(optionsProduit);
          localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
          console.table(produitLocalStorage);
          popupConfirmation();
        }
        //****************Si le panier est vide****************
      } else {
        produitLocalStorage = [];
        produitLocalStorage.push(optionsProduit);
        localStorage.setItem("produit", JSON.stringify(produitLocalStorage));
        console.table(produitLocalStorage);
      }
    }
  });
}
