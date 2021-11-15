fillSection();

// ************************Récup des articles de l'API************************
async function getArticles() {
    const articlesCatch = await fetch("http://localhost:3000/api/products")
    return await articlesCatch.json();
}

    // ************************ données de l'API dans le DOM************************
async function fillSection() {
    const result = await getArticles ()
    .then(function (resultatAPI){
        const articles = resultatAPI;
        console.table(articles);
        for (let article in articles) {

            // ************************Insertion de l'élément "a"************************
            let productLink = document.createElement("a");
            document.querySelector(".items").appendChild(productLink);
            productLink.href = `product.html?id=${resultatAPI[article]._id}`;

            // ************************Insertion "article"************************
            let productArticle = document.createElement("article");
            productLink.appendChild(productArticle);

            // ************************Insertion image************************
            let productImg = document.createElement("img");
            productArticle.appendChild(productImg);
            productImg.src = resultatAPI[article].imageUrl;
            productImg.alt = resultatAPI[article].altTxt;

            // ********************Insertion "h3"********************
            let productName = document.createElement("h3");
            productArticle.appendChild(productName);
            productName.classList.add("productName");
            productName.innerHTML = resultatAPI[article].name;

            // ********************Insertion description "p"********************
            let productDescription = document.createElement("p");
            productArticle.appendChild(productDescription);
            productDescription.classList.add("productName");
            productDescription.innerHTML = resultatAPI[article].description;
        }
    })
    .catch (function(error){
        return error;
    });
}