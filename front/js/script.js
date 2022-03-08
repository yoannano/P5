/* J'initialise la variable contiendra mon api */
let products = [];

/* Je récupére mes produits depuis mon API */
async function fetchApi() {
    await fetch("http://localhost:3000/api/products")
        .then((res) => res.json())
        .then((data) => (products = data))
        .catch((err) => res.json(err))
}

/* J'attends la réponse de ma fonction fetchApi */
async function canapDisplay() {
    await fetchApi();
    let items = document.getElementById("items");
    for (let i = 0; i < products.length; i++) {
        items.innerHTML +=
            `<a href="./product.html?id=${products[i]._id}">
              <article>
                <img src="${products[i].imageUrl}" alt="${products[i].altTxt}">
                <h3 class="productName">${products[i].name}</h3>
                <p class="productDescription">${products[i].description}</p>
              </article>
            </a>`;
    }
}
canapDisplay();