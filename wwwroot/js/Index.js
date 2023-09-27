// JavaScript source code
import { filter} from "./Transformations.js"

let Persons, DrinksPAX, CartaSelector, CartaItems, AddDrinkbtn, CartaTbody;
let customItems = 0;

let cartas = [], tragos = [];

function SetTotalDrinks() {
    document.getElementById("TragosTotales").innerText = Persons.value * DrinksPAX.value;
}

function Validate(Element, FieldName, Function) {
    if (Number(Element.value) < Number(Element.min)) {
        alert(`El sevicio minimo es para ${Element.min} ${FieldName}`);
    }
    else if (Number(Element.value) > Number(Element.max)) {
        alert(`El servico maximo es para ${Element.max} ${FieldName}`);
    }
    else {
        Function();
    }
}

function CreateCantidadTragoTD() {
    const td = document.createElement("td");
    td.className = "DefaultTragosPorTipo";

    const td2 = document.createElement("td");
    td2.className = "CantidadCol";

    const input = document.createElement("input");
    input.className = "Cantidad_Trago";
    input.type = "number";
    input.min = "1";
    input.max = "9999";
    input.onchange = function () { SetTotalAdjustedDrinks() };

    td2.appendChild(input);

    let allTDs = [td, td2];

    return allTDs;
}

function CreateCustomRow() {
    customItems++;

    const tr = document.createElement("tr");
    tr.ID = `custom${customItems}`

    const td1 = document.createElement("td");

    const select = document.createElement("select");

    const CartaCustom = GetCarta(3);

    for (let i = 0; i < CartaCustom.Drinks.length; i++) {
        const trago = GetTrago(CartaCustom.Drinks[i]);

        const option = document.createElement("option");
        option.value = trago.ID;
        const text = document.createTextNode(trago.Name);
        option.appendChild(text);
        select.appendChild(option);
    }

    td1.appendChild(select);
    tr.appendChild(td1);

    const td2 = CreateCantidadTragoTD();
    tr.appendChild(td2[0]);
    tr.appendChild(td2[1]);

    return tr;
}

function CreateRow(drink) {
    const tr = document.createElement("tr");
    tr.ID = drink.ID;

    const td1 = document.createElement("td");
    const text = document.createTextNode(drink.Name);

    td1.appendChild(text);
    tr.appendChild(td1);

    const td2 = CreateCantidadTragoTD();
    tr.appendChild(td2[0]);
    tr.appendChild(td2[1]);

    return tr;
}

function GetSelectedCartaIndex() {
    let selectedCartaIndex;
    for (let i = 0; i < cartas.length; i++) {
        if (CartaSelector.value == cartas[i].ID) {
            selectedCartaIndex = i;
            break;
        }
    }
    return selectedCartaIndex;
}

function SelectCarta() {
    while (CartaTbody.hasChildNodes()) {
        CartaTbody.removeChild(CartaTbody.firstChild);
    }

    if (CartaSelector.value == "3") {
        let newRow = CreateCustomRow();
        CartaTbody.appendChild(newRow);
    }
    else {
        let index = GetSelectedCartaIndex();
        for (let tragoId of cartas[index].Drinks) {
            let trago = GetTrago(tragoId);
            let newRow = CreateRow(trago);
            CartaTbody.appendChild(newRow);
        }
    }

    AddDrinkbtn.hidden = CartaSelector.value != 3;
    document.getElementById("TotalAdjustedDrinks").textContent = 0;
}

function SetDriksPerType() {
    let tragosTotales = document.getElementById("TragosTotales");
    let tiposDeTragos = CartaTbody.getElementsByTagName("tr");
    let drinksPertype = Number(tragosTotales.textContent) / tiposDeTragos.length;

    let fields = document.getElementsByClassName("DefaultTragosPorTipo");
    for (let field of fields) {
        field.innerText = Math.ceil(drinksPertype);
    }

    document.getElementById("TotalDefaultDrinks").textContent = Math.ceil(drinksPertype) * tiposDeTragos.length;
}

function SetTotalAdjustedDrinks() {
    let drinksAdjusted = document.getElementsByClassName("Cantidad_Trago");
    let total = 0;

    for (let drink of drinksAdjusted) {
        total += Number(drink.value);
    }

    document.getElementById("TotalAdjustedDrinks").textContent = total;
}

async function LoadCartas() {
    const cartasJson = await fetch("./Data/Cartas.json").then((res) => res.json());
    for (let i = 0; i < cartasJson.length; i++) {
        cartas.push(cartasJson[i]);
    }
}

async function LoadTragos() {
    const tragosJson = await fetch("./Data/Tragos.json").then((res) => res.json());
    for (let i = 0; i < tragosJson.length; i++) {
        tragos.push(tragosJson[i]);
    }
}

function GetCarta(ID) {
    return filter(ID, cartas);
}

function GetTrago(ID) {
    console.log(`tragos: ${tragos}`);
    const test = filter(ID, tragos);;
    return test;
}

window.onload = function () {

    Persons = document.getElementById("personas");
    DrinksPAX = document.getElementById("TragosPAX");
    CartaSelector = document.getElementById("carta");
    CartaItems = document.getElementsByClassName("CartaItem");
    AddDrinkbtn = document.getElementById("agregarTrago");
    CartaTbody = document.getElementById("MenuTable").getElementsByTagName("tbody")[0];

   
    LoadCartas();
    LoadTragos();
    SetTotalDrinks();
    SetDriksPerType();

    Persons.onchange = function () { Validate(Persons, 'Personas', SetTotalDrinks); SetDriksPerType() };
    DrinksPAX.onchange = function () { Validate(DrinksPAX, 'Tragos por persona', SetTotalDrinks); SetDriksPerType() };
    CartaSelector.onchange = function () { SelectCarta(); SetDriksPerType() };
    AddDrinkbtn.onclick = function () { CartaTbody.appendChild(CreateCustomRow()); SetDriksPerType() };
}