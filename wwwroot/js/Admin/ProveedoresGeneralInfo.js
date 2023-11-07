function SaveNewProveedor() {
    let form = document.getElementById("nuevoProveedorData");
    form.classList.add('was-validated')

    if (form.checkValidity()) {
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", "../Proveedores");

        let ProveedorData = {};
        ProveedorData.Nombre = document.getElementById('name').value;
        ProveedorData.Mail = document.getElementById('email').value;
        ProveedorData.Telefono = Number(document.getElementById('phone').value);

        xhttp.setRequestHeader("Content-type", "application/json");
        xhttp.onreadystatechange = function () {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                window.location.reload();
            }
        }

        xhttp.send(JSON.stringify(ProveedorData));
    }
}

window.addEventListener('load', function () {
    let crearProveedorBTN;

    crearProveedorBTN = document.getElementById("crearProveedorBtn");

    crearProveedorBTN.addEventListener('click', SaveNewProveedor);
});