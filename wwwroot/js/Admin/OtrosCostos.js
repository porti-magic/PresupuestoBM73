let crearCostoBtn, nuevoCostoModal, eliminarCostoConfirmation, activeCostoToggle, agregarRangoBtn;

function SaveCosto(event) {
    let form = document.getElementById("nuevoCostoData");

    form.classList.add('was-validated')

    if (form.checkValidity()) {
        let Costo = {};
        let button = event.target;

        Costo.Id = Number(button.dataset.bsId);
        Costo.Name = form.querySelector("#CostoName").value;
        Costo.Presentacion = Number(form.querySelector("#presentacion").value.replace(",","."));
        Costo.Cost = Number(form.querySelector("#Precio").value.replace(",", "."));
        Costo.Personas = Number(form.querySelector("#PAX").value.replace(",","."));

        var AmountString = ""
        var HsString = ""
        for (var r of form.querySelectorAll(".rangoRow")) {
            AmountString += r.querySelector(".RangoCantidad").value.replace(",", ".");
            AmountString += ",";
            HsString += r.querySelector(".rangoMaxHS").value.replace(",", ".");
            HsString += ","
        }
        Costo.AmountString = AmountString.slice(0, -1);
        Costo.HsString = HsString.slice(0, -1);

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../OtrosCostos");

        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.reload();
            }
        }

        xhttp.send(JSON.stringify(Costo));
    }
}

function setUpNewCostoModal(event) {
    var button = event.relatedTarget;
    var id = button.dataset.bsId;

    if(id) {
        var name = button.dataset.bsName;
        var precio = button.dataset.bsPrecio;
        var presentacion = button.dataset.bsPresentacion;
        var pax = button.dataset.bsPax;
        var amounts = button.dataset.bsAmountString.split(',');
        var hs = button.dataset.bsHsString.split(',');

        crearCostoBtn.dataset.bsId = id;

        var nameField = document.querySelector('#CostoName');
        var precioField = document.querySelector('#Precio');
        var presentacionField = document.querySelector('#presentacion');
        var paxField = document.querySelector('#PAX');

        nameField.value = name;
        precioField.value = precio.replace(',', '.');
        presentacionField.value = presentacion;
        paxField.value = pax;

        for (var i = 0; i < amounts.length; i++) {
            AddRango(amounts[i], hs[i]);
        }
        DeleteRangoByIndex(0);
    }
}

function SetUpEliminarCostoConfirmationModal(event) {
    var button = event.relatedTarget
    var name = button.dataset.bsName;
    var id = button.dataset.bsId;

    document.querySelector("#elimnarCostoName").innerHTML = name;
    document.querySelector("#eliminarCosto").setAttribute("data-bs-id", id);
}

function EliminarCosto(event) {
    var button = event.target;
    var id = button.dataset.bsId;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `../OtrosCostos?id=${id}`);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
        }
    };

    xhttp.send();
}

function AddRango(cantidad = 0, MaxHs = 0) {
    var rangoRow = document.getElementsByClassName("rangoRow");
    var lastRangoRow = rangoRow[rangoRow.length - 1];
    var newRow = lastRangoRow.cloneNode(true);

    newRow.querySelector(".RangoCantidad").value = cantidad;
    newRow.querySelector(".rangoMaxHS").value = MaxHs;
    var trashIcon = newRow.querySelector(".deleteRango");
    trashIcon.dataset.bsIndex = rangoRow.length;
    trashIcon.addEventListener('click', DeleteRango);

    lastRangoRow.insertAdjacentElement('afterend', newRow);
}

function DeleteRango(event) {
    var button = event.target;
    var index = button.dataset.bsIndex;

    DeleteRangoByIndex(index);
}

function DeleteRangoByIndex(index) {
    var tbody = document.querySelector("#newCostoTbody")
    var rangoRows = tbody.getElementsByClassName("rangoRow");
    tbody.removeChild(rangoRows[index]);

    var rangoRows = document.getElementsByClassName("rangoRow");
    for (var i = index; i < rangoRows.length; i++) {
        rangoRows[i].querySelector(".deleteRango").dataset.bsIndex = i
    }
}

function CloseNewCostoModal() {
    var nameField = document.querySelector('#CostoName');
    var precioField = document.querySelector('#Precio');
    var presentacionField = document.querySelector('#presentacion');
    var paxField = document.querySelector('#PAX');

    nameField.value = '';
    precioField.value = 0;
    presentacionField.value = 0;
    paxField.value = 0;
    crearCostoBtn.dataset.bsId = 0;

    AddRango();
    let rows = document.querySelectorAll(".rangoRow");
    for (let i = 0; i < rows.length - 1; i++) {
        DeleteRangoByIndex(0);
    }
}

window.addEventListener('load', function () { InicializeVariables(); SetUpEventHanddlers(); });

function InicializeVariables() {
    crearCostoBtn = document.querySelector("#crearCostoBtn");
    nuevoCostoModal = document.getElementById('nuevoCostoModal')
    eliminarCostoConfirmation = document.querySelector("#eliminarCostoConfirmation");
    activeCostoToggle = document.querySelectorAll(".activeCostoToggle");
    agregarRangoBtn = document.getElementById("agregarRangoBtn");
}

function SetUpEventHanddlers() {
    crearCostoBtn.addEventListener("click", SaveCosto);

    nuevoCostoModal.addEventListener('show.bs.modal', setUpNewCostoModal);
    nuevoCostoModal.addEventListener('hidden.bs.modal', CloseNewCostoModal);

    eliminarCostoConfirmation.addEventListener('show.bs.modal', SetUpEliminarCostoConfirmationModal);
    document.querySelector("#eliminarCosto").addEventListener('click', EliminarCosto);

    agregarRangoBtn.addEventListener('click', AddRango);
}