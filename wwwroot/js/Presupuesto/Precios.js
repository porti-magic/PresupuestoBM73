let AgregarProductoBTN, MainTable, nuevoProductRow;

function AgregarRow() {
    var newRow = nuevoProductRow.cloneNode(true);
    newRow.removeAttribute("hidden");
    MainTable.getElementsByTagName("tbody")[0].appendChild(newRow);
}

window.onload = function () {
    AgregarProductoBTN = document.getElementById("agregarProdcutoBtn");
    MainTable = document.getElementById("mainTable");
    nuevoProductRow = document.getElementsByClassName("nuevoProducto")[0];

    AgregarProductoBTN.onclick = function () { AgregarRow(); }
}