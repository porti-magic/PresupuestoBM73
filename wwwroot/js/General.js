import { filter } from "./Transformations.js";


let Persons, CartaTbody, CartaSelector, cartas = [], tragos = [], EstimateBTN, Min, Max, Precio, TragoSelectors, submitBtn, Duration;

function ShowSelectTragoColumn(bool) {
    for (let element of document.getElementsByClassName("SelectColumn")) {
        element.hidden = !bool;
    }

    for (let cell of document.getElementsByClassName("TragoCol")) {
        cell.style.width = bool ? "10em" : "15em";
    }
}

function SelectCarta(cartaID) {
    for (let r of CartaTbody.getElementsByTagName("tr")) {
        let drinks = filter(cartaID, cartas).drinks;
        let id = Number(r.id);
        let isInclueded = drinks.includes(id);
        r.hidden = !isInclueded;
        r.getElementsByTagName("td")[1].getElementsByTagName("input")[0].checked = isInclueded;
    }

    ShowSelectTragoColumn(cartaID == 3);
}

async function LoadCartas() {
    fetch('/Cartas')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Handle the received data here
            for (let i = 0; i < data.length; i++) {
                cartas.push(data[i]);
            }
        })
        .catch(error => console.error('Error:', error));

}

async function LoadTragos() {
    fetch('/Tragos')
        .then(response => response.json()) // Parse the JSON response
        .then(data => {
            // Handle the received data here
            for (let i = 0; i < data.length; i++) {
                tragos.push(data[i]);
            }
        })
        .catch(error => console.error('Error:', error));
}

function GetEstimation() {
    let form = document.getElementById("eventData");

    if (form.checkValidity()) {

        let selectedDrinks = [];
        for (let d of TragoSelectors) {
            if (d.checked) {
                selectedDrinks.push(d.value);
            }
        }

        fetch(`Estimation?Pleople=${Persons.value}&Drinks=${selectedDrinks.toString()}&Duration=${Duration.value}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                Min = data[0].min;
                Max = data[0].max;
                document.getElementById("TotalEstimado").innerHTML = `$${Min.toFixed(2)} - $${Max.toFixed(2)}`;
                document.getElementById("EstimadoPAX").innerHTML = `($${(Min / Number(Persons.value)).toFixed(2)} - $${(Max / Number(Persons.value)).toFixed(2)} por persona)`;
                ShowPrecio(true);
            })
            .catch(error => console.error('Error:', error));
    }
    else {
        form.reportValidity();
    }
}

function ShowPrecio(bool) {
    EstimateBTN.hidden = bool;
    Precio.hidden = !bool;
}

function CreatePresupuesto() {
    let form = document.getElementById("contactData");

    if (form.checkValidity()) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "Presupuestos");
        let test = {};
        test.iD = 1;
        test.fname = document.getElementById('fname').value;
        test.lname = document.getElementById('lname').value;
        test.email = document.getElementById('email').value;
        test.phone = document.getElementById('phone').value;
        test.address = document.getElementById('adress').value;
        test.startDate = new Date(document.getElementById('start').value);
        test.duration = Duration.value;
        test.persons = Persons.value;
        test.eventType = document.getElementById('enventType').value;
        test.drinksString = GetDrinksString();
        test.menu = CartaSelector.value;
        test.min = Min;
        test.max = Max;

        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("mensajePresupuesto").hidden = false;
                submitBtn.hidden = true;
            }
            else {
                //show error
            }
        }

        xhttp.send(JSON.stringify(test));
    }
    else {
        form.reportValidity();
    }
}

function GetDrinksString() {
    let res = "";
    for (let t of TragoSelectors) {
        if (t.checked) {
            res += ", " + t.value;
        }
    }
    return res.substring(2);
}

window.onload = function () {
    Persons = document.getElementById("personas");
    CartaSelector = document.getElementById("carta");
    CartaTbody = document.getElementById("MenuTable").getElementsByTagName("tbody")[0];
    EstimateBTN = document.getElementById("EstimarBtn");
    Precio = document.getElementById("Precio");
    TragoSelectors = document.getElementsByClassName("selectTrago");
    submitBtn = document.getElementById("submitBtn");
    Duration = document.getElementById('Duration');

    LoadCartas();
    LoadTragos();

    var modal = document.getElementById('exampleModal');
    var aceptBtn = document.getElementById('aceptBtn');
    // Mostrar el modal al cargar la página
    modal.style.display = 'block';
    // Ocultar el modal al hacer clic en el botón de cerrar
    aceptBtn.onclick = function () {
        modal.style.display = 'none';
    };

    Persons.onchange = function () { ShowPrecio(false); };
    Duration.onchange = function () { ShowPrecio(false); };
    for (let s of TragoSelectors) {
        s.onchange = function () { ShowPrecio(false); };
    }
    CartaSelector.onchange = function () {
        SelectCarta(Number(CartaSelector.value))
        ShowPrecio(false);
    };
    EstimateBTN.onclick = function () { GetEstimation() };
    submitBtn.onclick = function () { CreatePresupuesto() };

    document.getElementById("EventDataBtn").onclick = function (event) {
        var form = document.getElementById('eventData')
        form.classList.add('was-validated')
        if (form.checkValidity()) {
            
        }

    };
}