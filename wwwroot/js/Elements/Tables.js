window.addEventListener('load', function () {

    //Set Up paginated Tables
    const paginatedTables = document.getElementsByClassName('table-paginated');
    for (var t of paginatedTables) {
        createPaginationLinks(t);
    }
});

//Paginated tables
function createPaginationLinks(table) {
    var rowsPerPage = Number(table.getAttribute('rowsPerPage'));
    var pageCount = Math.ceil((table.rows.length - 1) / rowsPerPage);

    var paginationNav = document.createElement('nav');
    paginationNav.setAttribute("aria-label", "Page navigation");
    paginationNav.classList.add("col-auto");

    //<ul class="pagination">
    var paginationList = document.createElement('ul');
    paginationList.classList.add('pagination', 'm-0');


    if (pageCount > 1) {
        //<li class="page-item"><a class="page-link" href="#">Previous</a></li>
        var NextListItem = CreatePaginationItem(table, "&laquo;", () => Number(table.getAttribute('page')) - 1);
        paginationList.appendChild(NextListItem);

        for (let i = 1; i <= pageCount; i++) {
            //<li class="page-item"><a class="page-link" href="#">1</a></li>
            var listItem = CreatePaginationItem(table, i, () => i);
            paginationList.appendChild(listItem);
        }
        //<li class="page-item"><a class="page-link" href="#">Next</a></li>
        var NextListItem = CreatePaginationItem(table, "&raquo;", () => Number(table.getAttribute('page')) + 1);
        paginationList.appendChild(NextListItem);


        paginationNav.appendChild(paginationList);

        var navContainer = table.nextElementSibling;
        if (!navContainer.classList.contains("nav-container")) {
            navContainer = document.createElement('div');
            navContainer.classList.add('nav-container');
            table.parentNode.insertBefore(navContainer, table.nextElementSibling);
        }

        navContainer.insertBefore(paginationNav, table.nextElementSibling.children[0]);

        var paginationPlaceHolder = table.nextElementSibling.querySelector(".paginationPlaceHolder");
        if (paginationPlaceHolder) {
            table.nextElementSibling.removeChild(paginationPlaceHolder);
        }

        showTableRows(table);
    }
}
function showTableRows(table) {
    var rowsPerPage = Number(table.getAttribute('rowsPerPage'));
    var currentPage = Number(table.getAttribute('page'));
    var start = currentPage * rowsPerPage - rowsPerPage + 1;
    var end = start + rowsPerPage;

    for (var i = 1; i < table.rows.length; i++) {
        if (i < start || i >= end) {
            table.rows[i].style.display = 'none';
        } else {
            table.rows[i].style.display = '';
        }
    }

    var paginationBar = table.nextElementSibling.children[0];
    var items = paginationBar.getElementsByClassName("page-item");

    if (currentPage == Math.ceil((table.rows.length - 1) / rowsPerPage)) {
        items[items.length - 1].classList.add("disabled");
        items[0].classList.remove("disabled")
    }
    else if (currentPage == 1) {
        items[0].classList.add("disabled");
        items[items.length - 1].classList.remove("disabled");
    }
    else {
        items[0].classList.remove("disabled");
        items[items.length - 1].classList.remove("disabled");
    }

    for (var i = 1; i < items.length - 1; i++) {
        if (i == currentPage) {
            items[i].classList.add("active");
        }
        else
            items[i].classList.remove("active");
    }

}
function CreatePaginationItem(table, innetText, value) {
    var listItem = document.createElement("li");
    listItem.classList.add('page-item');

    var link = document.createElement('a');
    link.classList.add("page-link")
    link.href = '#';
    link.innerHTML = innetText;

    link.addEventListener('click', function (event) {
        event.preventDefault();
        let newPage = value();
        table.setAttribute('page', newPage);
        showTableRows(table);
    });
    listItem.appendChild(link)

    return listItem;
}
