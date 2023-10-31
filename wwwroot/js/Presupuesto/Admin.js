let ProveedoresTABLE, crearProveedorBTN;

function SaveNewProveedor() {
    let form = document.getElementById("nuevoProveedorData");
    form.classList.add('was-validated')
    if (form.checkValidity()) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../Proveedores");
        let test = {};
        test.Nombre = document.getElementById('name').value;
        test.Mail = document.getElementById('email').value;
        test.Telefono = Number(document.getElementById('phone').value);
        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.reload();
            }
        }

        xhttp.send(JSON.stringify(test));
    }
}

window.onload = function () {
    ProveedoresTABLE = document.getElementById("proveedoresTable");
    crearProveedorBTN = document.getElementById("crearProveedorBtn");

    crearProveedorBTN.onclick = function () { SaveNewProveedor(); }
}