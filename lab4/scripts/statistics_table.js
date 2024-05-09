export class StatisticsTable{
    constructor(tableElement, tableBodyElement, data) {
        this.statisticsElement = tableElement;
        this.tableBodyElement = tableBodyElement;
        this.tableData = data;
    }

    generateHTML(data) {    
        let template = "";
        for (let item of data) {
            template += `
            <tr>
                <td>${item.full_name}</td>
                <td>${item.course}</td>
                <td>${item.dob.age}</td>
                <td>${item.gender}</td>
                <td>${item.country}</td>
            </tr>`;
        }
        
        return template;
    }

    displayPage = (pageNumber, rowsPerPage) => {
        const startIndex = (pageNumber - 1) * rowsPerPage;
        const endIndex = startIndex + rowsPerPage;
        const pageData = this.tableData.slice(startIndex, endIndex);

        this.tableBodyElement.innerHTML = this.generateHTML(pageData);

        // Generate pagination buttons
        const paginationContainer = document.getElementById("pagination-container");
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= Math.ceil(this.tableData.length / rowsPerPage); i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.onclick = () => this.gotoPage(i, rowsPerPage);
            paginationContainer.appendChild(button);
        }
    }
    
    gotoPage = (pageNumber, rowsPerPage) => {
        this.displayPage(pageNumber, rowsPerPage);
    }
}