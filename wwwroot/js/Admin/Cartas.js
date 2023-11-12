let crearCartaBtn, agregarCartaModal, EliminarCartaConfirmation, activeCartaToggles;

function SaveCarta(event) {
    let form = document.getElementById("nuevaCartaData");

    form.classList.add('was-validated')

    if (form.checkValidity()) {
        let Carta = {};
        let button = event.target;

        Carta.ID = Number(button.dataset.bsId);
        Carta.name = form.querySelector("#cartaName").value;
        //Carta.disponible = form.querySelector("#isAvailabe").checked;

        var tragosString = ""
        for (var t of form.querySelectorAll(".selectTrago:checked")) {
            tragosString += t.value;
            tragosString += ","
        }
        Carta.drinksString = tragosString.slice(0, -1);

        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../Cartas");

        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.reload();
            }
        }

        xhttp.send(JSON.stringify(Carta));
    }
}

function setUpNewCartaModal(event) {
    var button = event.relatedTarget
    var name = button.dataset.bsName;
    var id = button.dataset.bsId;
    var drinksStrings = button.dataset.bsDrinksstrings;

    crearCartaBtn.dataset.bsId = id;

    var nameField = document.querySelector('#cartaName');
    var tragoSelectors = document.querySelectorAll(".selectTrago");

    nameField.value = name;
    for (var selector of tragoSelectors) {
        selector.checked = drinksStrings.split(", ").includes(selector.value);
    }

}

function SetUpEliminarCartaConfirmationModal(event) {
    var button = event.relatedTarget
    var name = button.dataset.bsName;
    var id = button.dataset.bsId;

    document.querySelector("#elimnarCartaName").innerHTML = name;
    document.querySelector("#EliminarCarta").setAttribute("data-bs-id", id);
}

function EliminarCarta(event) {
    var button = event.target;
    var id = button.dataset.bsId;

    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `../Cartas?id=${id}`);

    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            window.location.reload();
        }
    };

    xhttp.send();
}

window.addEventListener('load', function () { InicializeVariables(); SetUpEventHanddlers(); });

function InicializeVariables() {
    crearCartaBtn = document.querySelector("#crearCartaBtn");
    agregarCartaModal = document.getElementById('nuevaCartaModal')
    EliminarCartaConfirmation = document.querySelector("#EliminarCartaConfirmation");
    activeCartaToggles = document.querySelectorAll(".activeCartaToggle");
}

function SetUpEventHanddlers() {
    crearCartaBtn.addEventListener("click", SaveCarta);

    agregarCartaModal.addEventListener('show.bs.modal', setUpNewCartaModal);
    //agregarCartaModal.addEventListener('hidden.bs.modal', )

    EliminarCartaConfirmation.addEventListener('show.bs.modal', SetUpEliminarCartaConfirmationModal);
    document.querySelector("#EliminarCarta").addEventListener('click', EliminarCarta);
}