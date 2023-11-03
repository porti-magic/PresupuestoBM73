import { SetUp as AdvanceSelectorSetUp } from "../Elements/AdvanceSelector.js";

function SaveNewProveedor() {
    let form = document.getElementById("nuevoProveedorData");
    form.classList.add('was-validated')

    if (form.checkValidity()) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../Proveedores");

        let ProveedorData = {};
        ProveedorData.Nombre = document.getElementById('name').value;
        ProveedorData.Mail = document.getElementById('email').value;
        ProveedorData.Telefono = Number(document.getElementById('phone').value);

        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.reload();
            }
        }

        xhttp.send(JSON.stringify(ProveedorData));
    }
}

function AddIngrediente() {
    var ingridientRows = document.getElementsByClassName("IngredienteRow");
    var lastIngridientRow = ingridientRows[ingridientRows.length - 1];
    var newRow = lastIngridientRow.cloneNode(true);

    AdvanceSelectorSetUp(newRow.getElementsByClassName("AdvanceSelector-container")[0])

    lastIngridientRow.insertAdjacentElement('afterend', newRow);
}

window.onload = function () {
    let crearProveedorBTN, AgregarIngredienteBtn, newIngridientToggles;
    crearProveedorBTN = document.getElementById("crearProveedorBtn");
    AgregarIngredienteBtn = document.getElementById("agregarIngredienteoBtn");
    newIngridientToggles = document.getElementsByClassName("NewIngridient");

    crearProveedorBTN.onclick = function () { SaveNewProveedor(); }
    AgregarIngredienteBtn.addEventListener("click", AddIngrediente);

    for (let toggle of newIngridientToggles) {
        toggle.addEventListener("click",

        )
    }
}