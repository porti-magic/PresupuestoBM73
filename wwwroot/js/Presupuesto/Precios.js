import { SetUp as AdvanceSelectorSetUp, NewAdvancedSelector } from "../Elements/AdvanceSelector.js";

let AgregarProductoBTN, MainTable, nuevoProductRow, EditViewTableBody, EditModeToggleButton, saveBtn;

function AgregarRow() {
    var newRow = nuevoProductRow.cloneNode(true);
    newRow.removeAttribute("hidden");

    AdvanceSelectorSetUp(newRow.getElementsByClassName("AdvanceSelector-container")[0]);
    newRow.getElementsByClassName("deleteBtn")[0].onclick = function () { newRow.remove(); };
    for (var input of newRow.getElementsByClassName("form-control")) {
        if (input.name != "IngredienteMarca") {
            input.setAttribute("required", "");
        }
    }
    EditViewTableBody.insertBefore(newRow, nuevoProductRow);
}

function ToggleEditMode() {
    let editPreciosTable, viewPreciosTable;
    editPreciosTable = document.getElementsByClassName("editPrecios");
    viewPreciosTable = document.getElementById("viewPrecios");

    if (EditModeToggleButton.checked) {
        for (var e of editPreciosTable) {
            e.removeAttribute("hidden");
        }
        viewPreciosTable.setAttribute("hidden", "");
    }
    else {
        viewPreciosTable.removeAttribute("hidden");
        for (var e of editPreciosTable) {
            e.setAttribute("hidden", "");
        }
    }
}

function SavePrecios() {
    let form = document.getElementById("preciosData");
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        let productos = [];
        let proveedorID = document.getElementById("proveedorID");
        for (var product of document.querySelectorAll('#editPreciosTbody > tr:not(:last-child)')) {
            let productData = {};
            let children = product.children;
            let AS = NewAdvancedSelector(children[0]);
            productData.IngredienteName = AS.CustomInput.value;
            productData.ProveedorId = proveedorID.innerText;
            productData.Marca = children[1].children[0].value;
            productData.Presentacion = children[2].children[0].children[0].value;
            productData.Costo = children[3].children[0].children[1].value.replace(',', '.');
            productData.IsNew = AS.ToggleBtn.checked;
            productos.push(productData);
        }
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../Precios");

        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.reload();
            }
        }

        xhttp.send(JSON.stringify(productos));
    }
}

window.onload = function () {
    AgregarProductoBTN = document.getElementById("agregarProdcutoBtn");
    MainTable = document.getElementById("mainTable");
    EditViewTableBody = document.getElementById("editPreciosTbody");
    nuevoProductRow = document.getElementsByClassName("nuevoProducto")[0];
    EditModeToggleButton = document.getElementById("editToggle");
    saveBtn = document.getElementById("saveBtn");

    AgregarProductoBTN.onclick = function () { AgregarRow(); }

    for (let row of EditViewTableBody.children) {
        row.getElementsByClassName("deleteBtn")[0].onclick = function () { row.remove(); };
    }

    EditModeToggleButton.onclick = function () { ToggleEditMode() };

    saveBtn.onclick = function () { SavePrecios(); }
}