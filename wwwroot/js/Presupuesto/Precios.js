let AgregarProductoBTN, MainTable, nuevoProductRow, TableBody;

function AgregarRow() {
    var newRow = nuevoProductRow.cloneNode(true);
    newRow.removeAttribute("hidden");

    let NewIngridient = newRow.getElementsByClassName("NewIngridient")[0];
    NewIngridient.onclick = function () { SwitchIngredintInput(newRow) }
    newRow.getElementsByClassName("deleteBtn")[0].onclick = function () { newRow.remove(); };
    newRow.getElementsByClassName("IngridientSelector")[0].onclick = function () { AsignSelectorValue(newRow); }
    AsignSelectorValue(newRow)
    MainTable.getElementsByTagName("tbody")[0].appendChild(newRow);
    
}

function SwitchIngredintInput(row) {
    let NewIngridient = row.getElementsByClassName("NewIngridient")[0];
    if (NewIngridient.checked) {
        row.getElementsByClassName("IngridientInput")[0].removeAttribute("hidden");
        row.getElementsByClassName("IngridientSelector")[0].setAttribute("hidden", "");
    }
    else {
        row.getElementsByClassName("IngridientInput")[0].setAttribute("hidden", "");
        row.getElementsByClassName("IngridientSelector")[0].removeAttribute("hidden");
        let selector = row.getElementsByClassName("IngridientSelector")[0];
        let input = row.getElementsByClassName("IngridientInput")[0];
        input.value = selector.value;
    }
}

function AsignSelectorValue(row) {
    let selector  = row.getElementsByClassName("IngridientSelector")[0];
    let input = row.getElementsByClassName("IngridientInput")[0];
    input.value = selector.value;
    console.log(input.value);
}

window.onload = function () {
    AgregarProductoBTN = document.getElementById("agregarProdcutoBtn");
    MainTable = document.getElementById("mainTable");
    TableBody = MainTable.getElementsByTagName("tbody")[0];
    nuevoProductRow = document.getElementsByClassName("nuevoProducto")[0];

    AgregarProductoBTN.onclick = function () { AgregarRow(); }

    for (let row of TableBody.children) {
        row.getElementsByClassName("NewIngridient")[0].onclick = function () { SwitchIngredintInput(row) };
        row.getElementsByClassName("deleteBtn")[0].onclick = function () { row.remove(); };
        row.getElementsByClassName("IngridientSelector")[0].onclick = function () { AsignSelectorValue(row);}
    }
}