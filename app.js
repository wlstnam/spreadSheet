document.getElementById('addRow').addEventListener('click', function() {
    let table = document.getElementById('dataTable');
    let newRow = table.insertRow(-1);
    let headerCell = newRow.insertCell(0);
    headerCell.textContent = newRow.rowIndex.toString();

    let columns = table.rows[0].cells.length;
    for (let i = 1; i < columns; i++) {
        let cell = newRow.insertCell(i);
        let input = document.createElement('input');
        input.type = 'text';
        addCellInputEventListeners(input);
        cell.appendChild(input);
    }
});

document.getElementById('addColumn').addEventListener('click', function() {
    let table = document.getElementById('dataTable');
    let headerRow = table.rows[0];
    let newColumnIndex = headerRow.cells.length;

    let headerCell = headerRow.insertCell(-1);
    headerCell.textContent = newColumnIndex.toString();

    for (let i = 1, row; row = table.rows[i]; i++) {
        let cell = row.insertCell(-1);
        let input = document.createElement('input');
        input.type = 'text';
        addCellInputEventListeners(input);
        cell.appendChild(input);
    }
});

document.getElementById('downloadCSV').addEventListener('click', function() {
    let csvContent = "";

    let table = document.getElementById('dataTable');
    for (let i = 0, row; row = table.rows[i]; i++) {
        let rowData = [];
        for (let j = 1, cell; cell = row.cells[j]; j++) {
            let inputElement = cell.getElementsByTagName('input')[0];
            if (inputElement) {
                rowData.push(inputElement.value);
            } else {
                rowData.push("");
            }
        }
        csvContent += rowData.join(',') + '\n';
    }

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const blobURL = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "data.csv";

    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(blobURL);
    document.body.removeChild(link);
});

function addCellInputEventListeners(input) {
    input.addEventListener('focus', function() {
        highlightHeaders(input);
    });

    input.addEventListener('blur', function() {
        removeHighlight(input);
    });
}

function highlightHeaders(input) {
    let cell = input.parentElement;
    let row = cell.parentElement;
    let table = row.parentElement;

    let rowHeader = table.rows[row.rowIndex-1].cells[0];
    rowHeader.style.backgroundColor = "skyblue";

    let columnHeader = table.rows[0].cells[cell.cellIndex];
    columnHeader.style.backgroundColor = "skyblue";
}

function removeHighlight(input) {
    let cell = input.parentElement;
    let row = cell.parentElement;
    let table = row.parentElement;

    let rowHeader = table.rows[row.rowIndex-1].cells[0];
    rowHeader.style.backgroundColor = "";

    let columnHeader = table.rows[0].cells[cell.cellIndex];
    columnHeader.style.backgroundColor = "";
}