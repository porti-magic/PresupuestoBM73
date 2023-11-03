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
    newRow.querySelector(".NewIngridientToggle").addEventListener("change", setTragoDisponebleLimitation);

    lastIngridientRow.insertAdjacentElement('afterend', newRow);
}

function setTragoDisponebleLimitation() {
    let TragoDisponibleToggle = document.querySelector("#isAvailabe");
    if (document.querySelectorAll(".NewIngridientToggle:checked").length > 0) {
        TragoDisponibleToggle.checked = false;
        TragoDisponibleToggle.disabled = true;
    }
    else {
        TragoDisponibleToggle.checked = true;
        TragoDisponibleToggle.disabled = false;
    }
}

function SaveTrago() {
    let form = document.getElementById("nuevoTragoData");

    form.classList.add('was-validated')

    if (form.checkValidity()) {
        let trago = {};

        trago.TragoNombre = form.querySelector("#ingridientName").value;
        trago.Disponible = form.querySelector("#isAvailabe").value;


        let nombres = [], cantidades = [];
        for (let ingridient of form.querySelectorAll(".IngredienteRow")) {
            nombres.push(ingridient.querySelector(".AdvanceSelector-customInput").value);
            cantidades.push(ingridient.querySelector(".nuevoTragoCantidad").value);
        }
        trago.IngredientesNombres = nombres;
        trago.IngredientesCantidad = cantidades;
        trago.push(productData);

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../Recetas");

        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.reload();
            }
        }

        xhttp.send(JSON.stringify(trago));
    }
}


window.onload = function () {
    let crearProveedorBTN, AgregarIngredienteBtn, newIngridientToggles, crearTragoBtn;

    crearProveedorBTN = document.getElementById("crearProveedorBtn");
    AgregarIngredienteBtn = document.getElementById("agregarIngredienteoBtn");
    newIngridientToggles = document.getElementsByClassName("NewIngridientToggle");
    crearTragoBtn = document.querySelector("#crearTragoBtn");

    crearProveedorBTN.onclick = function () { SaveNewProveedor(); }
    AgregarIngredienteBtn.addEventListener("click", AddIngrediente);
    crearTragoBtn.addEventListener("click", SaveTrago);

    for (let toggle of newIngridientToggles) {
        toggle.addEventListener("change", setTragoDisponebleLimitation);
    }
}