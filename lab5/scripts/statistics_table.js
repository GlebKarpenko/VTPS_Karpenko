import { sortUsers } from "./users.js";

export class StatisticsTable{
    constructor(tableElement, tableBodyElement, data, rowsPerPage) {
        this.statisticsElement = tableElement;
        this.tableBodyElement = tableBodyElement;
        this.tableData = data;
        this.rowsPerPage = rowsPerPage;
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

    displayPage = (pageNumber) => {
        const startIndex = (pageNumber - 1) * this.rowsPerPage;
        const endIndex = startIndex + this.rowsPerPage;
        const pageData = this.tableData.slice(startIndex, endIndex);

        this.tableBodyElement.innerHTML = this.generateHTML(pageData);

        // Generate pagination buttons
        const paginationContainer = document.getElementById("pagination-container");
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= Math.ceil(this.tableData.length / this.rowsPerPage); i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.onclick = () => this.gotoPage(i);
            paginationContainer.appendChild(button);
        }
    }
    
    gotoPage = (pageNumber) => {
        this.displayPage(pageNumber, this.rowsPerPage);
    }

    sort(sortBy , order) {
        this.tableData = sortUsers(this.tableData, sortBy, order);
        this.displayPage(1, this.rowsPerPage);
    }
}