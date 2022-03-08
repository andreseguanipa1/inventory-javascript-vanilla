let products = [];
let warning = document.getElementById("warn-div");
let productsAllHTML = document.getElementById("productsAll");
let inventoryPriceHTML = document.getElementById("inventoryPrice");
let productsQuantityHTML = document.getElementById("productsQuantity");
let isEditable = false;
let index = 0;

function validaNumericos(event) {
    if (event.charCode >= 48 && event.charCode <= 57) {
        return true;
    }
    return false;
}

function validaDecimal(event) {
    if ((event.charCode >= 48 && event.charCode <= 57) || event.charCode == 46) {

        let price = document.getElementById('price').value;

        if (price.includes('.') && event.charCode == 46) {
            return false

        }

        return true;

    }

    return false;

}


function insert() {

    let code = document.getElementById('code').value;
    let description = document.getElementById('description').value;
    let quantity = document.getElementById('quantity').value;
    let price = document.getElementById('price').value;

    if (code != '' && description != '' && quantity != '' && price != '') {

        if (isEditable == false) {

            let newProduct = {
                code,
                description,
                quantity,
                price
            }

            let doesExist = products.filter(product => product.code == code);

            if (doesExist.length == 0) {
                warning.innerHTML = '';
                products.push(newProduct);

                load();

                clean();

                console.log(products);

            } else {

                clean();

                warning.innerHTML = `
            <br />
            <p class="warning">El codigo ya se encuentra registrado en el inventario</p>
            <br />
            `;

            }

        } else {

            let doesExist = products.filter(product => product.code == code);

            if (doesExist.length == 0 || products[index].code == code) {

                products[index].code = code;
                products[index].description = description;
                products[index].price = price;
                products[index].quantity = quantity;

                isEditable = false;
                index = 0;

                document.getElementById('editable').innerHTML = ``;

                load();
                disable(false);
                clean();

            } else {

                warning.innerHTML = `
            <br />
            <p class="warning">El codigo ya se encuentra registrado en el inventario</p>
            <br />
            `;

            }

        }

    } else {

        warning.innerHTML = `
        <br />
        <p class="warning">Ninguno de los campos puede estar vacio</p>
        <br />
        `;

    }

}

function load() {

    let productsAll = 0;
    let inventoryPrice = 0;
    let productsQuantity = 0;

    let div = '';
    let content = document.getElementById("content");

    for (let i = 0; i < (products.length); i++) {

        productsAll = productsAll + parseInt(products[i].quantity);
        inventoryPrice = inventoryPrice + parseFloat(products[i].quantity * products[i].price);
        productsQuantity = products.length;

        let color = products[i].quantity == 0 ? 'brown; color: white' : 'white';

        div = div + `
        <tr key="${i}" style="background-color: ${color}">
            <td>${products[i].code}</td>
            <td>${products[i].description}</td>
            <td>${products[i].quantity}</td>
            <td>${products[i].price}$</td>
            <td class="buttons"><button class="item" onclick="edit(${products[i].code})">edit</button></td>
            <td class="buttons"> <button class="item" onclick="deleteProduct(${products[i].code})">delete</button></td>
        </tr>
        `;

    }

    div = `                
    <tr>
        <th>Codigo</th>
        <th>Descripcion</th>
        <th>Cantidad</th>
        <th>Precio</th>
    </tr>` + div;

    content.innerHTML = div;
    productsAllHTML.innerHTML = productsAll;
    inventoryPriceHTML.innerHTML = `${inventoryPrice}$`;
    productsQuantityHTML.innerHTML = productsQuantity;

}

function deleteProduct(id) {

    for (let i = 0; i < (products.length); i++) {
        if (products[i].code == id) {
            products.splice(i, 1);
            break;
        }
    }

    load();

}

function edit(code) {

    disable(true);

    isEditable = true;

    for (let i = 0; i < (products.length); i++) {
        if (products[i].code == code) {
            index = i;
            break;

        }
    }

    document.getElementById('code').value = products[index].code;
    document.getElementById('description').value = products[index].description;
    document.getElementById('quantity').value = products[index].quantity;
    document.getElementById('price').value = products[index].price;

    warning.innerHTML = ``;

    document.getElementById('editable').innerHTML = `
        <br />
            <p class="warn-edit">Editar el producto</p>
            <p class="warn-edit">Codigo: ${products[index].code}</p>

        <br />
    `;

}

function clean() {

    document.getElementById('code').value = '';
    document.getElementById('description').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('price').value = '';

}

function disable(disable) {

    let editButtons = document.querySelectorAll(".item");

    for (let i = 0; i < (editButtons.length); i++) {

        editButtons[i].disabled = disable;

    }

}