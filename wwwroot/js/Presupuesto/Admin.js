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

function AddIngrediente(name="", value=0) {
    var ingridientRows = document.getElementsByClassName("IngredienteRow");
    var lastIngridientRow = ingridientRows[ingridientRows.length - 1];
    var newRow = lastIngridientRow.cloneNode(true);

    AdvanceSelectorSetUp(newRow.getElementsByClassName("AdvanceSelector-container",)[0], name);
    newRow.querySelector(".NewIngridientToggle").addEventListener("change", setTragoDisponebleLimitation);
    newRow.querySelector(".nuevoTragoCantidad").value = value;

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

        trago.tragoNombre = form.querySelector("#ingridientName").value;
        trago.disponible = form.querySelector("#isAvailabe").checked;


        let ingredientesString = "";
        for (let ingridient of form.querySelectorAll(".IngredienteRow")) {
            ingredientesString += ingridient.querySelector(".AdvanceSelector-customInput").value;
            ingredientesString += ":"
            ingredientesString += ingridient.querySelector(".nuevoTragoCantidad").value.replace(',', '.');
            ingredientesString += ","
        }
        trago.ingredientesString = ingredientesString.slice(0, -1);

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

function setUpNewRecipeModal(event) {
    var button = event.relatedTarget
    var name = button.dataset.bsName; 

    if ("" != name) {
        var isAvailabe = button.dataset.bsAvailable;
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var myArr = JSON.parse(this.responseText);
                console.log(myArr);

                for (var ingridient of myArr.ingredientesString.split(",")) {
                    var name = ingridient.split(":")[0];
                    var amount = Number(ingridient.split(":")[1]);

                    AddIngrediente(name, amount);

                }
                DeleteIngridient(0);
            }
        };
        xmlhttp.open("GET", `../Recetas?name=${name}`, true);
        xmlhttp.send();

        var nameField = document.querySelector('#ingridientName');
        var isAvailableToggleBtn = document.querySelector("#isAvailabe");

        nameField.value = name ?? "";
        isAvailableToggleBtn.checked = isAvailabe == "True";
    }
}

function DeleteIngridient(index) {
    var tbody = document.querySelector("#newIngridientTbody")
    var ingridientRows = tbody.getElementsByClassName("IngredienteRow");
    tbody.removeChild(ingridientRows[index]);
}

function CloseAgregarTragoModal() {
    AddIngrediente();
    let rows = document.querySelectorAll(".IngredienteRow");
    for (let i = 0; i < rows.length-1; i++) {
        DeleteIngridient(0);
    }

    let form = document.getElementById("nuevoTragoData");
    form.classList.remove('was-validated');

    var nameField = document.querySelector('#ingridientName');
    var isAvailableToggleBtn = document.querySelector("#isAvailabe");
    nameField.value ="";
    isAvailableToggleBtn.checked = "True";
}

function SetUpEliminarTragoConfirmationModal(event){
    var button = event.relatedTarget
    var name = button.dataset.bsName;
    var id = button.dataset.bsId;

    document.querySelector("#elimnarTragoName").innerHTML = name;
    document.querySelector("#eliminarTrago").setAttribute("data-bs-id", id);
}

function EliminarTrago(event) {
    var button = event.target;
    var id = button.dataset.bsId;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "../Recetas");

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
        }
    };


    xhttp.send(id);
}

window.onload = function () {
    let crearProveedorBTN, AgregarIngredienteBtn, newIngridientToggles, crearTragoBtn, agregarTragoModal, eliminarTragoConfirmation;

    crearProveedorBTN = document.getElementById("crearProveedorBtn");
    AgregarIngredienteBtn = document.getElementById("agregarIngredienteoBtn");
    newIngridientToggles = document.getElementsByClassName("NewIngridientToggle");
    crearTragoBtn = document.querySelector("#crearTragoBtn");
    agregarTragoModal = document.getElementById('nuevoTragoModal')
    eliminarTragoConfirmation = document.querySelector("#eliminarTragoConfirmation");

    crearProveedorBTN.onclick = function () { SaveNewProveedor(); }
    AgregarIngredienteBtn.addEventListener("click", AddIngrediente);
    crearTragoBtn.addEventListener("click", SaveTrago);

    for (let toggle of newIngridientToggles) {
        toggle.addEventListener("change", setTragoDisponebleLimitation);
    }

    agregarTragoModal.addEventListener('show.bs.modal', setUpNewRecipeModal);
    agregarTragoModal.addEventListener('hidden.bs.modal', CloseAgregarTragoModal);

    eliminarTragoConfirmation.addEventListener('show.bs.modal', SetUpEliminarTragoConfirmationModal);
    document.querySelector("#eliminarTrago").addEventListener('click', EliminarTrago);

}