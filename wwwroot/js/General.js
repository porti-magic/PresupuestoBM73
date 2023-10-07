import { filter } from "./Transformations.js";


let Persons, CartaSelector, cartas = [], tragos = [], EstimateBTN, Min, Max, Precio, TragoSelectors, submitBtn, Duration
    , EventDataForm, EventDataBTN, EventDataAccordionBTN, MenuAccordionBTN, PrecioBTN, PrecioAccordionBTN;

function SelectCarta(cartaID) {
    let custom = cartaID == 3
    for (let t of document.getElementsByClassName("TragoSelector")) {
        let input = t.getElementsByTagName("input")[0];
        let drinks = filter(cartaID, cartas).drinks;
        let id = Number(t.id);
        let isInclueded = drinks.includes(id);
        t.hidden = !isInclueded;
        input.checked = isInclueded;
        if (custom) {
            input.removeAttribute("disabled");
        }
        else {
            input.setAttribute("disabled", "");

        }
    }
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
    let selectedDrinks = [];
    for (let d of TragoSelectors) {
        if (d.checked) {
            selectedDrinks.push(d.value);
        }
    }

    fetch(`Estimation?Pleople=${Persons.value}&Drinks=${selectedDrinks.toString()}&Duration=${Duration.value}`)
        .then(response => response.json())
        .then(data => {
            Min = data[0].min;
            Max = data[0].max;
            document.getElementById("TotalEstimado").innerHTML = `${Min.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })} - ${Max.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}`;
            document.getElementById("EstimadoPAX").innerHTML = `(${(Min / Number(Persons.value)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) } - ${(Max / Number(Persons.value)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) } por persona)`;
            DisplayCollapsable(document.getElementById("collapsePrecio"));
            MenuAccordionBTN.removeAttribute("disabled");
        })
        .catch(error => console.error('Error:', error));
}

function CreatePresupuesto() {
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
    }

    xhttp.send(JSON.stringify(test));
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

function DisplayCollapsable(element) {
    var myCollapse = new bootstrap.Collapse(element);
    myCollapse.show();
}

window.onload = function () {
    ElementsInicialization();

    LoadCartas();
    LoadTragos();

    SetUpModal();

    CartaSelector.onchange = function () { SelectCarta(Number(CartaSelector.value)) };

    EventDataAccordionBTN.onclick = function () {
        MenuAccordionBTN.setAttribute("disabled", "");
        PrecioAccordionBTN.setAttribute("disabled", "");
    };
    EventDataBTN.onclick = function () {
        EventDataForm.classList.add('was-validated')
        if (EventDataForm.checkValidity()) {
            DisplayCollapsable(document.getElementById("collapseMenu"));
            EventDataAccordionBTN.removeAttribute("disabled");
        }

    };

    MenuAccordionBTN.onclick = function () { PrecioAccordionBTN.setAttribute("disabled", ""); };
    EstimateBTN.onclick = function () { GetEstimation() };

    PrecioBTN.onclick = function () { DisplayCollapsable(document.getElementById("collapseContactData")); PrecioAccordionBTN.removeAttribute("disabled"); };

    submitBtn.onclick = function () {
        let form = document.getElementById("contactData");
        form.classList.add('was-validated')
        if (form.checkValidity()) {
            CreatePresupuesto();
        }
    };

}

function ElementsInicialization() {
    Persons = document.getElementById("personas");
    CartaSelector = document.getElementById("carta");
    EstimateBTN = document.getElementById("EstimarBtn");
    TragoSelectors = document.getElementsByClassName("selectTrago");
    submitBtn = document.getElementById("submitBtn");
    Duration = document.getElementById('Duration');
    EventDataForm = document.getElementById("eventData");
    EventDataBTN = document.getElementById("EventDataBtn");
    EventDataAccordionBTN = document.getElementById("EventDataAccordionBtn");
    MenuAccordionBTN = document.getElementById("MenuAccordionBtn");
    PrecioBTN = document.getElementById("PrecioBtn");
    PrecioAccordionBTN = document.getElementById("PrecioAccordionBtn");
}

function SetUpModal() {
    var modal = document.getElementById('exampleModal');
    var aceptBtn = document.getElementById('aceptBtn');
    // Mostrar el modal al cargar la página
    modal.style.display = 'block';
    // Ocultar el modal al hacer clic en el botón de cerrar
    aceptBtn.onclick = function () {
        modal.style.display = 'none';
    };
}
