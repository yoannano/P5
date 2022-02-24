/*Je récupère l'id produit depuis l'Url avec URLSearchParams*/
let params = (new URL(document.location)).searchParams;
let orderId = params.get("id");

//Je cible le numéro de commande
let idProduct = document.querySelector("#orderId");
idProduct.innerText = orderId;
//Je supprime les informations stockées dans le local storage
sessionStorage.clear();