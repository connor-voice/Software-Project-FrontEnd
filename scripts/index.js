"use strict";

const cardArea = document.querySelector("#cardArea");

document.querySelector("#inputForms").addEventListener("submit", function(event) {
    event.preventDefault();

    
    console.log("THIS", this);
    const form = this;

    const data = {
        name: form.name.value,
        brand: form.brand.value,
        price: form.price.value,
        size: form.size.value,
        quantity: form.quantity.value,
    };

    console.log("DATA", data);

    axios.post("http://localhost:8080/create", data)
    .then(result => {
        form.reset();
        form.name.focus();
        console.log(result);
    }).catch(err => console.error(err));
})

const getChocs = () => {
    axios.get("http://localhost:8080/getAll")
    .then(result => {
        console.log(result)
        const chocs = result.data;
        cardArea.innerHTML = "";
        for(let choc of chocs) {
            const chocCol = document.createElement("div");
            chocCol.classList.add("col");

            const chocCard = document.createElement("div");
            //chocChard.style = `background-color: #5cdb9`;
            chocCard.classList.add("card");

            const chocBody = document.createElement("div");
            chocBody.classList.add("card-body");

            const chocName = document.createElement("h2");
            chocName.classList.add("card-title");
            chocName.innerText = choc.name;
            chocBody.appendChild(chocName);

            const chocPrice = document.createElement("h5");
            chocPrice.classList.add("card-price");
            chocPrice.innerText = "£" + choc.price;
            chocBody.appendChild(chocPrice);

            const chocQuantity = document.createElement("h5");
            chocQuantity.classList.add("card-quantity");
            chocQuantity.innerText = "Amount in stock: " +choc.quantity;
            chocBody.appendChild(chocQuantity);

            const chocDelete = document.createElement("button");
            chocDelete.innerText = "Delete";
            chocDelete.classList.add("btn", "btn-dark");
            chocDelete.addEventListener("click", () => {
                axios.delete(`http://localhost:8080/remove/${choc.id}`)
                .then(result => getChocs())
                .catch(err => console.error(err))
            });
            chocBody.appendChild(chocDelete);
            chocCard.appendChild(chocBody);
            chocCol.appendChild(chocCard);

            cardArea.appendChild(chocCol);
        }
    }).catch(error => console.error(error));
}

getChocs();