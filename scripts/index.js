"use strict";

const createChocolate = () => {
    axios.post(`http://localhost:8080/create`)
    .then(result => {

    })



}


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