/* Je récupère mon panier du local storage */
let canap = JSON.parse(sessionStorage.getItem("product"));

/* J'affiche mon panier */
let canapDisplay = () => {
  // si mon panier est vide alors la quantité et le prix sont 0 et message "Aucun article dans le panier"
  if (canap == null || canap == 0) {
    document.getElementById("totalQuantity").innerText = 0;
    document.getElementById("totalPrice").innerText = 0;
    document.getElementById(
      "cart__items"
    ).innerHTML += `<h2 style="text-align:center; margin-bottom:80px;">Vous n'avez aucun article dans votre panier</h2>`;
  }
  // Sinon pour chaque produit dans le panier, je récupére l'Id depuis mon API pour ensuite afficher toutes les caractéristiques des produits
  else {
    for (let product of canap) {
      //Fonction qui récupère les produits depuis l'API grâce à leur Id
      function fetchApiProduct() {
        fetch(`http://localhost:3000/api/products/` + product.id)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => {
            //J'affiche toutes les caractéristiques des produits
            displayRestProduct(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      fetchApiProduct();

      //J'affiche mes produits présents dans le localStorage/sessionStorage
      function displayRestProduct(kanap) {
        //Je crée un nouvel objet en récupérant mes informations du local storage et en ajoutant les autres informations dont le prix
        let productCanap = {
          id: product.id,
          name: kanap.name,
          imageUrl: kanap.imageUrl,
          altText: kanap.altText,
          quantity: product.quantity,
          colors: product.colors,
          price: kanap.price,
        };

        //J'insère les informations de chaque produit dans la page panier
        let cartItem = document.getElementById("cart__items");

        cartItem.innerHTML += `<article class="cart__item" data-id="${productCanap.id}" data-color="${productCanap.colors}">
                        <div class="cart__item__img">
                          <img src="${productCanap.imageUrl}" alt="${productCanap.altText}">
                        </div>
                        <div class="cart__item__content">
                          <div class="cart__item__content__description">
                            <h2>${productCanap.name}</h2>
                            <p>${productCanap.colors}</p>
                            <p>${productCanap.price} €</p>
                          </div>
                          <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                              <p>Qté :</p>
                              <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productCanap.quantity}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                              <p class="deleteItem">Supprimer</p>
                            </div>
                          </div>
                        </div>
                      </article>`;

        //Fonction qui permet de modifier la quantité d'un produit
        function modifyQuantity() {
          //Je cible la quantité à modifier
          quantityProduct = document.querySelectorAll(".itemQuantity");

          quantityProduct.forEach((item) => {
            //J'attrape la div article englobant le bouton pour modifier la quantité
            let cart = item.closest("article");

            //Je récupère l'id et la couleur de l'article grâce au dataset stocké dans cart
            let idDelete = cart.dataset.id;
            let colorDelete = cart.dataset.color;

            //Je déclare la variable qui va recevoir la nouvelle quantité
            let newQuantity = "";

            //J'écoute item lorsque celui-ci change
            item.addEventListener("change", (event) => {
              event.preventDefault();
              newQuantity = Number(item.value);

              //Je crée une boucle pour trouver le produit qui a été ciblé grâce à son id et sa couleur
              for (let i = 0; i < canap.length; i++) {
                if (canap[i].id == idDelete && canap[i].colors == colorDelete) {
                  canap[i].quantity = newQuantity;
                }
              }
              //J'appelle la fonction qui calcule le total des quantités et le total des prix
              getTotals();

              //Alerte pour avertir que le produit va être ajouté au panier
              alert("Votre quantité va être mise à jour");

              //J'enregistre le nouveau panier
              sessionStorage.setItem("product", JSON.stringify(canap));
            });
          });
        }
        modifyQuantity();

        //Fonction qui calcule le total des quantités et le total des prix
        function getTotals() {
          //Je crée mes variables en ciblant le texte HTML
          let quantityProduct = document.getElementsByClassName("itemQuantity");
          let productTotalQuantity = document.getElementById("totalQuantity");
          let priceDiv = document.querySelectorAll(
            ".cart__item__content__description p:last-child"
          );
          let productTotalPrice = document.getElementById("totalPrice");

          //J'initialise mes variables de quantités totales
          let totalQtt = 0;
          let totalPrice = 0;

          //Je crée une boucle qui parcourt chaque quantity de produit
          for (let i = 0; i < quantityProduct.length; ++i) {
            let quantity = quantityProduct[i].valueAsNumber;
            let price = priceDiv[i].innerText.replace("€", "");

            //Je convertis price en nombre
            let priceNumber = Number(price);

            totalQtt += quantity;
            totalPrice += priceNumber * quantity;
          }

          productTotalQuantity.innerText = totalQtt;
          productTotalPrice.innerText = totalPrice;
        }
        getTotals();

        //Fonction qui permet de supprimer un produit
        function deleteProduct() {
          //Je cible mes boutons supprimer
          let deleteButton = document.querySelectorAll(".deleteItem");

          //Je crée une boucle sur les boutons supprimer
          deleteButton.forEach((item) => {
            //J'écoute item au clic sur le bouton supprimer ciblé
            item.addEventListener("click", (event) => {
              //J'attrape la div article englobant le bouton supprimer
              let cart = item.closest("article");

              //Je récupère l'id et la couleur de l'article grâce au dataset stocké dans cart
              let idDelete = cart.dataset.id;
              let colorDelete = cart.dataset.color;

              //Je retire l'élément cliqué du tableau canap
              canap = canap.filter(
                (element) =>
                  element.id !== idDelete || element.colors !== colorDelete
              );

              //Je push canap dans le storage
              sessionStorage.setItem("product", JSON.stringify(canap));

              //Je retire la div cart du dom
              cart.remove();

              //J'appelle la fonction qui calcule le total des quantités et le total des prix
              getTotals();

              //Alerte pour avertir que le produit va être supprimé du panier
              alert("Ce produit va être supprimé de votre panier");
              location.reload();
            });
          });
        }

        deleteProduct();
      }
    }
  }
};
//-------------------------------Formulaire Utilisateur--------------------------------------

//Je déclare mon objet contact pour récupérer les informations saisies par l'utilisateur
let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};
//Je crée un tableau pour récupérer l'id des produits dans le panier
let products = [];

//Je cible les balises d'input du formulaire
let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

//Je cible les balises contenant les erreurs s'il y en a
let errFirstName = document.getElementById("firstNameErrorMsg");
let errLastName = document.getElementById("lastNameErrorMsg");
let errAddress = document.getElementById("addressErrorMsg");
let errCity = document.getElementById("cityErrorMsg");
let errEmail = document.getElementById("emailErrorMsg");

//----------------------------------FIRST NAME---------------------------------------------------
//J'écoute la variable inputFirstName avec addEventListener
inputFirstName.addEventListener("input", function (e) {
  validFirstName(e.target.value);
  contact.firstName = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ prénom soit renseigné correctement (ne pas contenir de chiffres)
function validFirstName(firstName) {
  let regexFirstName = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
  let valid = false;
  let testName = regexFirstName.test(firstName);
  if (testName) {
    errFirstName.innerText = "";
    valid = true;
  } else {
    errFirstName.innerText = "Veuillez entrer un prénom valide";
    alert("attention plus de trois lettres et pas de caractère spéciaux !!!");
    valid = false;
  }
  return valid;
}

//--------------------------------Last Name------------------------------------------------------
//J'écoute la variable inputLastName avec addEventListener
inputLastName.addEventListener("input", function (e) {
  validLastName(e.target.value);
  contact.lastName = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ nom soit renseigné correctement (ne pas contenir de chiffres)
function validLastName(lastName) {
  let regexLastName = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
  let valid = false;
  let testLastName = regexLastName.test(lastName);
  if (testLastName) {
    errLastName.innerText = "";
    valid = true;
  } else {
    errLastName.innerText = "Veuillez entrer un nom valide";
    alert("attention plus de trois lettres et pas de caractère spéciaux !!!");
    valid = false;
  }
  return valid;
}

//--------------------------------ADDRESS-------------------------------------------------------
//J'écoute la variable inputAddress avec addEventListener
inputAddress.addEventListener("input", function (e) {
  validAddress(e.target.value);
  contact.address = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ l'adresse soit renseigné correctement (contenir des chiffres au début puis des lettres ex: 15 rue de la Tour)
function validAddress(address) {
  let regexAddress = /^[0-9]{0,10}[a-zA-Zéèàïêç\s\-]{2,30}$/g;
  let valid = false;
  let testAddress = regexAddress.test(address);
  if (testAddress) {
    errAddress.innerText = "";
    valid = true;
  } else {
    errAddress.innerText = "Veuillez entrer une adresse valide";
    valid = false;
  }
  return valid;
}
//--------------------------------City---------------------------------------------------------
//J'écoute la variable inputCity avec addEventListener
inputCity.addEventListener("input", function (e) {
  validCity(e.target.value);
  contact.city = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ ville soit renseigné correctement (ne pas contenir de chiffres)
function validCity(city) {
  let regexCity = /^[a-zA-Zéèàïêç\-\s]{2,30}$/g;
  let valid = false;
  let testCity = regexCity.test(city);
  if (testCity) {
    errCity.innerText = "";
    valid = true;
  } else {
    errCity.innerText = "Veuillez entrer une ville valide";
    valid = false;
  }
  return valid;
}

//--------------------------------Email-----------------------------------------------------------
//J'écoute la variable inputEmail avec addEventListener
inputEmail.addEventListener("input", function (e) {
  validEmail(e.target.value);
  contact.email = e.target.value;
});

// Fonction qui vérifie à l'aide d'une regex que le champ email soit renseigné correctement (être sous la forme de xxxx@xx.x)
function validEmail(email) {
  let regexEmail =
    /^[a-zA-Zéèàïç0-9.!^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/g;
  let valid = false;
  let testEmail = regexEmail.test(email);
  if (testEmail) {
    errEmail.innerText = "";
    valid = true;
  } else {
    errEmail.innerText = "Veuillez entrer une adresse e-mail valide";
    valid = false;
  }
  return valid;
}

//Je cible le bouton de soumission du formulaire
let submitButton = document.getElementById("order");

//AddEventListener qui fonctionne seulement si tous les champs sont correctement remplis
submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  //Je vérifie si tous les champs sont valides
  if (
    validFirstName(contact.firstName) == false ||
    validFirstName(contact.firstName) == null ||
    validLastName(contact.lastName) == false ||
    validLastName(contact.lastName) == null ||
    validCity(contact.city) == false ||
    validCity(contact.city) == null ||
    validAddress(contact.address) == false ||
    validAddress(contact.address) == null ||
    validEmail(contact.email) == false ||
    (validEmail(contact.email) == null && canap == null) ||
    canap == 0
  ) {
    return errAddress || errCity || errEmail || errFirstName || errLastName;
  } else {
    //J'enregistre dans le local storage les informations de l'utilisateur
    sessionStorage.setItem("contact", JSON.stringify(contact));

    //Je crée une boucle sur tous les produits du panier pour récupérer les id des produits
    for (let i = 0; i < canap.length; i++) {
      products.push(canap[i].id);
    }

    //Je crée mon objet pour envoyer mes informations utilisateurs et mes id à l'API
    const order = {
      contact: contact,
      products: products,
    };

    //Fonction fetch qui envoie à l'API les données saisies par l'utilisateur et son panier
    //Option nécessaire à l'Api pour utiliser POST
    const apiId = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

    //Envoi des données au serveur
    fetch("https://api-kanap-eu.herokuapp.com/api/products/order", apiId)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        let orderId = data.orderId;
        window.location.assign("confirmation.html?id=" + orderId);
      });
  }
});

canapDisplay();
