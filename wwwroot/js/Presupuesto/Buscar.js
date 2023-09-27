
function FilterData() {
    const xhttp = new XMLHttpRequest();
    let param = GetFiltersSelection();
    xhttp.open("GET", `../GeneralInfo?parameters=${param}`);

    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            const table = document.getElementById("mainTable");
            const json = JSON.parse(this.response);
            table.replaceChild(CreateTableRows(json), table.childNodes[3]);
        }
        else {
            //show error
        }
    }
    xhttp.send();
}

function GetFiltersSelection() {
    var filters = document.getElementsByClassName("Filter");
    let res = '';
    let first = true;
    for (var f of filters) {
        const filterName = f.id.replace("FilterContainer","");
        const CBClassName = filterName+"Option";
        let OptionCheckBoxes = document.getElementsByClassName(CBClassName);
        let selectedOptions = [];
        for (let d of OptionCheckBoxes) {
            if (d.checked) {
                selectedOptions.push(d.value.replace(/_/g, " "));
            }
        }
        if (selectedOptions.length != 0) {
            res = first ? res : res + ', '; 
            res = res + `@${filterName}='${selectedOptions.toString()}'`;
            first = false;
        }
    }
    return res;
}

function CreateTableRows(jsonData) {
    const tbody = document.createElement("tbody");
    for (var row of jsonData) {
        const tr = document.createElement("tr");

        const id = document.createElement("td");
        id.appendChild(document.createTextNode(row.id));
        tr.appendChild(id);

        const name = document.createElement("td");
        name.appendChild(document.createTextNode(row.name));
        tr.appendChild(name);

        const startDate = document.createElement("td");
        startDate.appendChild(document.createTextNode(row.startDate));
        tr.appendChild(startDate);

        const address = document.createElement("td");
        address.appendChild(document.createTextNode(row.address));
        tr.appendChild(address);

        const menu = document.createElement("td");
        menu.appendChild(document.createTextNode(row.menu));
        tr.appendChild(menu);

        const createdDate = document.createElement("td");
        createdDate.appendChild(document.createTextNode(row.createDate));
        tr.appendChild(createdDate);

        const state = document.createElement("td");
        state.appendChild(document.createTextNode(row.state));
        tr.appendChild(state);

        const edit = document.createElement("td");
        const link = document.createElement("a");
        link.target = "_blank";
        link.href = `Editar?id=${row.id}`;
        link.appendChild(document.createTextNode("edit"));
        edit.appendChild(link);
        tr.appendChild(edit);

        tbody.appendChild(tr);
    }
    return tbody;
}

window.onload = function () {
    document.getElementById("FilterBtn").onclick = function () { FilterData() };
}
$(document).ready(function () {
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".dropdown-menu li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});