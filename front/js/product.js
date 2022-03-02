/*Je récupère l'id produit depuis l'Url avec URLSearchParams*/
let params = new URL(document.location).searchParams;
let productId = params.get("id");

/*Je déclare mes variables en ciblant les informations pour chaque produit*/
let title = document.getElementById("title");
let imageUrl = document.querySelector(".item__img");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let selectColor = document.querySelector("colors");
let quantity = document.getElementById("quantity");

/*Je récupére mon produit depuis l'API grâce à son Id*/
function fetchApiProduct() {
  fetch(`http://localhost:3000/api/products/${productId}`)
    .then((res) => {
      if (res.ok) {
        return res.json(200);
      }
    })
    .then((data) => {
      displayProduct(data);
    })
    .catch((err) => {
      console.log(err);
    });
}
fetchApiProduct();

/*Je modifie les éléments de la page par rapport au produit sélectionné*/
function displayProduct(product) {
  //Nom du produit
  title.innerText = product.name;

  //Insérer image
  imageUrl.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  //Prix
  prix.innerText = product.price;

  // Je change le prix selon la quantité désirée
  quantity.addEventListener("change", () => {
    prix.innerText = product.price * quantity.value;
  });

  //Description du produit
  description.innerText = product.description;

  //Je crée une boucle pour le choix des Couleurs
  for (let i = 0; i < product.colors.length; i++) {
    selectColor = document.getElementById("colors");
    selectColor.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }

  /*Je cible mon bouton "Ajouter au Panier" */
  let addCanap = document.querySelector("#addToCart");

  /* J'écoute le bouton et envoie les données saisies par l'utilisateur dans le panier et local Storage */
  addCanap.addEventListener("click", () => {
    //Je déclare un objet selectProduct pour récupère les données saisies par l'utilisateur dont mon Id, la couleur et la quantité et les envoyer au panier
    let selectProduct = {
      id: productId,
      colors: selectColor.value,
      quantity: quantity.value,
    };
    verifyInvalidInput(selectProduct);

    //Fonction qui vérifie s'il manque les indications de couleurs et/ou quantité sinon je récupère le panier, j'ajoute et j'enregistre un produit dans le local storage
    function verifyInvalidInput() {
    
      if (selectProduct.colors  == []) {
        alert("Veuillez choisir une couleur");
      } else if (
        
        selectProduct.quantity <= 0 ||
        selectProduct.quantity == "" ||
        selectProduct.quantity > 100
      ) {
        alert("Veuillez indiquer une quantité correcte");
      } else {
        addToLocalStorage(selectProduct);
        //Chargement de la page cart - Page Panier
        window.location.assign("cart.html");
      }
    }

    //Fonction qui ajoute des produits dans le local storage
    function  addToLocalStorage(product) {
      //Je récupère le panier
      let canap = JSON.parse(localStorage.getItem("product"));
      //Si le panier est null, je retourne un tableau vide
      if (canap == null) {
        canap = [];
        //Et je pousse un nouveau produit dans session storage et l'enregistre
        canap.push(product);
        localStorage.setItem("product", JSON.stringify(canap));
      } //Sinon si le panier n'est pas vide, je vérifie si le produit enregistré possède le même id et la même couleur que le produit sélectionné
      else if (canap) {
        let getProduct = canap.find(
          (p) => selectProduct.id == p.id && selectProduct.colors == p.colors
        );
        //Si je trouve le même produit dans le panier alors j'augmente sa quantité selon la quantité choisie par l'utilisateur
        if (getProduct) {
          getProduct.quantity =
            Number(selectProduct.quantity) + Number(getProduct.quantity);
          //J'enregistre le nouveau panier
          localStorage.setItem("product", JSON.stringify(canap));
        } //Sinon la quantité du produit reste inchangé et j'ajoute un nouveau produit dans le local storage et l'enregistre
        else {
          canap.push(product);
          localStorage.setItem("product", JSON.stringify(canap));
        }
      }
    }
  });
}
