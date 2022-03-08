/*Je récupère l'id produit depuis l'Url avec URLSearchParams*/
let params = new URL(document.location).searchParams;
let productId = params.get("id");

/*Je déclare mes variables */
let title = document.getElementById("title");
let imageUrl = document.querySelector(".item__img");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let selectColor = document.querySelector("colors");
let quantity = document.getElementById("quantity");

/*Je récupére mon produit */
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

/*Je modifie les éléments du produit sélectionné*/
function displayProduct(product) {
  
  title.innerText = product.name;

  
  imageUrl.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

 
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

  /* J'envoie les données saisies par l'utilisateur dans le panier et local Storage */
  addCanap.addEventListener("click", () => {
    //Je récupère les données saisies par l'utilisateur dont mon Id
    let selectProduct = {
      id: productId,
      colors: selectColor.value,
      quantity: quantity.value,
    };
    verifyInvalidInput(selectProduct);

    //vérifie s'il manque les couleurs ou la qté dans le local storage
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
        
        window.location.assign("cart.html");
      }
    }

    //on ajoute des produits dans le local storage
    function  addToLocalStorage(product) {
      //Je récupère le panier
      let canap = JSON.parse(localStorage.getItem("product"));
      //Si le panier est null, je retourne un tableau vide
      if (canap == null) {
        canap = [];
        // je met le produit dans local storage et l'enregistre
        canap.push(product);
        localStorage.setItem("product", JSON.stringify(canap));
      } // produit enregistré possède le même id et la même couleur que le produit sélectionné
      else if (canap) {
        let getProduct = canap.find(
          (p) => selectProduct.id == p.id && selectProduct.colors == p.colors
        );
        // j'augmente sa quantité selon la quantité 
        if (getProduct) {
          getProduct.quantity =
            Number(selectProduct.quantity) + Number(getProduct.quantity);
          //J'enregistre le nouveau panier
          localStorage.setItem("product", JSON.stringify(canap));
        } // j'ajoute un nouveau produit dans le local storage et l'enregistre
        else {
          canap.push(product);
          localStorage.setItem("product", JSON.stringify(canap));
        }
      }
    }
  });
}
