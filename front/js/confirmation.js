
let params = (new URL(document.location)).searchParams;
let orderId = params.get("id");


let idProduct = document.querySelector("#orderId");
idProduct.innerText = orderId;

localStorage.clear();