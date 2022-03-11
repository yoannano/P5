let canap = JSON.parse(localStorage.getItem("product"));

let canapDisplay = () => {
  if (canap == null || canap == 0) {
    document.getElementById("totalQuantity").innerText = 0;
    document.getElementById("totalPrice").innerText = 0;
    document.getElementById(
      "cart__items"
    ).innerHTML += `<h2 style="text-align:center; margin-bottom:80px;">Vous n'avez aucun article dans votre panier</h2>`;
  } else {
    for (let product of canap) {
      function fetchApiProduct() {
        fetch(`http://localhost:3000/api/products/` + product.id)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((data) => {
            displayRestProduct(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }
      fetchApiProduct();

      function displayRestProduct(kanap) {
        let productCanap = {
          id: product.id,
          name: kanap.name,
          imageUrl: kanap.imageUrl,
          altText: kanap.altText,
          quantity: product.quantity,
          colors: product.colors,
          price: kanap.price,
        };

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

        function modifyQuantity() {
          quantityProduct = document.querySelectorAll(".itemQuantity");

          quantityProduct.forEach((item) => {
            let cart = item.closest("article");

            let idDelete = cart.dataset.id;
            let colorDelete = cart.dataset.color;

            let newQuantity = "";

            item.addEventListener("change", (event) => {
              event.preventDefault();
              newQuantity = Number(item.value);

              for (let i = 0; i < canap.length; i++) {
                if (newQuantity < 0) {
                  alert("Veuillez indiquer une quantité supérieur a 0 Merci");

                  newQuantity = 0;

                  item.value = newQuantity;
                } else if (newQuantity > 100) {
                  newQuantity = 100;
                  item.value = newQuantity;
                  alert("Veuillez mettre moin de 100");
                }

                if (canap[i].id == idDelete && canap[i].colors == colorDelete) {
                  canap[i].quantity = newQuantity;
                }
              }

              getTotals();

              alert("Votre quantité va être mise à jour");

              localStorage.setItem("product", JSON.stringify(canap));
            });
          });
        }
        modifyQuantity();

        function getTotals() {
          let quantityProduct = document.getElementsByClassName("itemQuantity");
          let productTotalQuantity = document.getElementById("totalQuantity");
          let priceDiv = document.querySelectorAll(
            ".cart__item__content__description p:last-child"
          );
          let productTotalPrice = document.getElementById("totalPrice");

          let totalQtt = 0;
          let totalPrice = 0;

          for (let i = 0; i < quantityProduct.length; ++i) {
            let quantity = quantityProduct[i].valueAsNumber;
            let price = priceDiv[i].innerText.replace("€", "");

            let priceNumber = Number(price);

            totalQtt += quantity;
            totalPrice += priceNumber * quantity;
          }

          productTotalQuantity.innerText = totalQtt;
          productTotalPrice.innerText = totalPrice;
        }
        getTotals();

        function deleteProduct() {
          let deleteButton = document.querySelectorAll(".deleteItem");

          deleteButton.forEach((item) => {
            item.addEventListener("click", (event) => {
              let cart = item.closest("article");

              let idDelete = cart.dataset.id;
              let colorDelete = cart.dataset.color;

              canap = canap.filter(
                (element) =>
                  element.id !== idDelete || element.colors !== colorDelete
              );

              localStorage.setItem("product", JSON.stringify(canap));

              cart.remove();

              getTotals();

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

let contact = {
  firstName: "",
  lastName: "",
  address: "",
  city: "",
  email: "",
};

let products = [];

let inputFirstName = document.getElementById("firstName");
let inputLastName = document.getElementById("lastName");
let inputAddress = document.getElementById("address");
let inputCity = document.getElementById("city");
let inputEmail = document.getElementById("email");

let errFirstName = document.getElementById("firstNameErrorMsg");
let errLastName = document.getElementById("lastNameErrorMsg");
let errAddress = document.getElementById("addressErrorMsg");
let errCity = document.getElementById("cityErrorMsg");
let errEmail = document.getElementById("emailErrorMsg");

//----------------------------------FIRST NAME---------------------------------------------------

inputFirstName.addEventListener("input", function (e) {
  e.preventDefault();
  contact.firstName = e.target.value;
});

function validFirstName(firstName) {
  let regexFirstName = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
  let valid = false;
  let testName = regexFirstName.test(firstName);
  if (testName) {
    errFirstName.innerText = "";
    valid = true;
  } else {
    errFirstName.innerText = "Veuillez entrer un prénom valide";
    alert(
      "le prénom doit avoir 3 lettres minimum et pas de caractère spéciaux merci !!!"
    );

    valid = false;
  }
  return valid;
}

//--------------------------------Last Name------------------------------------------------------

inputLastName.addEventListener("input", function (e) {
  contact.lastName = e.target.value;
});

function validLastName(lastName) {
  let regexLastName = /^([A-Za-z]{3,20}-{0,1})?([A-Za-z]{3,20})$/;
  let valid = false;
  let testLastName = regexLastName.test(lastName);
  if (testLastName) {
    errLastName.innerText = "";
    valid = true;
  } else {
    errLastName.innerText = "Veuillez entrer un nom valide";
    alert(
      "le nom doit avoir 3 lettres minimum et pas de caractère spéciaux merci !!!"
    );
    valid = false;
  }
  return valid;
}

//--------------------------------ADDRESS-------------------------------------------------------

inputAddress.addEventListener("input", function (e) {
  validAddress(e.target.value);
  contact.address = e.target.value;
});

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

inputCity.addEventListener("input", function (e) {
  validCity(e.target.value);
  contact.city = e.target.value;
});

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

inputEmail.addEventListener("input", function (e) {
  validEmail(e.target.value);
  contact.email = e.target.value;
});

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

let submitButton = document.getElementById("order");

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

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
    localStorage.setItem("contact", JSON.stringify(contact));

    for (let i = 0; i < canap.length; i++) {
      products.push(canap[i].id);
    }

    const order = {
      contact: contact,
      products: products,
    };

    const apiId = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    };

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
