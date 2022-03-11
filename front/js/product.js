let params = new URL(document.location).searchParams;
let productId = params.get("id");

let title = document.getElementById("title");
let imageUrl = document.querySelector(".item__img");
let prix = document.getElementById("price");
let description = document.getElementById("description");
let selectColor = document.querySelector("colors");
let quantity = document.getElementById("quantity");

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

function displayProduct(product) {
  title.innerText = product.name;

  imageUrl.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  prix.innerText = product.price;

  quantity.addEventListener("change", () => {
    prix.innerText = product.price * quantity.value;
  });

  description.innerText = product.description;

  for (let i = 0; i < product.colors.length; i++) {
    selectColor = document.getElementById("colors");
    selectColor.innerHTML += `<option value="${product.colors[i]}">${product.colors[i]}</option>`;
  }

  let addCanap = document.querySelector("#addToCart");

  addCanap.addEventListener("click", () => {
    let selectProduct = {
      id: productId,
      colors: selectColor.value,
      quantity: quantity.value,
    };
    verifyInvalidInput(selectProduct);

    function verifyInvalidInput() {
      if (selectProduct.colors == []) {
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

    function addToLocalStorage(product) {
      let canap = JSON.parse(localStorage.getItem("product"));

      if (canap == null) {
        canap = [];

        canap.push(product);
        localStorage.setItem("product", JSON.stringify(canap));
      } else if (canap) {
        let getProduct = canap.find(
          (p) => selectProduct.id == p.id && selectProduct.colors == p.colors
        );

        if (getProduct) {
          getProduct.quantity =
            Number(selectProduct.quantity) + Number(getProduct.quantity);

          localStorage.setItem("product", JSON.stringify(canap));
        } else {
          canap.push(product);
          localStorage.setItem("product", JSON.stringify(canap));
        }
      }
    }
  });
}
