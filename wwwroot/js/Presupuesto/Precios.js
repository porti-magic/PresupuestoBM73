let AgregarProductoBTN, MainTable, nuevoProductRow, EditViewTableBody, EditModeToggleButton, saveBtn;

function AgregarRow() {
    var newRow = nuevoProductRow.cloneNode(true);
    newRow.removeAttribute("hidden");

    let NewIngridient = newRow.getElementsByClassName("NewIngridient")[0];
    NewIngridient.onclick = function () { SwitchIngredintInput(newRow) }
    newRow.getElementsByClassName("deleteBtn")[0].onclick = function () { newRow.remove(); };
    newRow.getElementsByClassName("IngridientSelector")[0].onclick = function () { AsignSelectorValue(newRow); }
    for (var input of newRow.getElementsByClassName("form-control")) {
        if (input.name != "IngredienteName") {
            input.setAttribute("required", "");
        }
    }
    AsignSelectorValue(newRow)
    EditViewTableBody.insertBefore(newRow, nuevoProductRow);/* appendChild(newRow);*/
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
    let selector = row.getElementsByClassName("IngridientSelector")[0];
    let input = row.getElementsByClassName("IngridientInput")[0];
    input.value = selector.value;
}

function ToggleEditMode() {
    let editPreciosTable, viewPreciosTable, nuevoColumnHeader;
    editPreciosTable = document.getElementsByClassName("editPrecios");
    viewPreciosTable = document.getElementById("viewPrecios");
    nuevoColumnHeader = document.getElementById("nuevoColumnHeader");

    if (EditModeToggleButton.checked) {
        for (var e of editPreciosTable) {
            e.removeAttribute("hidden");
        }
        viewPreciosTable.setAttribute("hidden", "");
        nuevoColumnHeader.textContent = "Nuevo";

    }
    else {
        viewPreciosTable.removeAttribute("hidden");
        for (var e of editPreciosTable) {
            e.setAttribute("hidden", "");
        }
        nuevoColumnHeader.textContent = "";
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
            productData.IngredienteName = children[1].children[1].value;
            productData.ProveedorId = proveedorID.innerText;
            productData.Marca = children[2].children[0].value;
            productData.Presentacion = children[3].children[0].children[0].value;
            productData.Costo = children[4].children[0].children[1].value.replace(',','.');
            productData.IsNew = children[0].children[0].children[0].checked;
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
        row.getElementsByClassName("NewIngridient")[0].onclick = function () { SwitchIngredintInput(row) };
        row.getElementsByClassName("deleteBtn")[0].onclick = function () { row.remove(); };
        row.getElementsByClassName("IngridientSelector")[0].onclick = function () { AsignSelectorValue(row); }
    }

    EditModeToggleButton.onclick = function () { ToggleEditMode() };

    saveBtn.onclick = function () { SavePrecios(); }
}