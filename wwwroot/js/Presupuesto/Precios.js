let AgregarProductoBTN, MainTable, nuevoProductRow, TableBody;

function AgregarRow() {
    var newRow = nuevoProductRow.cloneNode(true);
    newRow.removeAttribute("hidden");

    let NewIngridient = newRow.getElementsByClassName("NewIngridient")[0];
    NewIngridient.onclick = function () { SwitchIngredintInput(newRow) }
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
    }
}

window.onload = function () {
    AgregarProductoBTN = document.getElementById("agregarProdcutoBtn");
    MainTable = document.getElementById("mainTable");
    TableBody = MainTable.getElementsByTagName("tbody")[0];
    nuevoProductRow = document.getElementsByClassName("nuevoProducto")[0];

    AgregarProductoBTN.onclick = function () { AgregarRow(); }

    for (let row of TableBody.children) {
        row.getElementsByClassName("NewIngridient")[0].onclick = function () { SwitchIngredintInput(row) };
    }
}