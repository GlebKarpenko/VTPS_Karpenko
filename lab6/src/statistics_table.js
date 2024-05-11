import { sortUsers } from "./users.js";
import { renderStatisticsChart } from "./statistics_chart.js";

export class StatisticsTable{
    constructor(tableElement, tableBodyElement, rowsPerPage) {
        this.statisticsElement = tableElement;
        this.tableBodyElement = tableBodyElement;
        this.rowsPerPage = rowsPerPage;
        this.pageData = [];
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

    getPageData() {
        return this.pageData;
    }

    displayPage = (pageNumber, data) => {
        const startIndex = (pageNumber - 1) * this.rowsPerPage;
        const endIndex = startIndex + this.rowsPerPage;
        this.pageData = data.slice(startIndex, endIndex);

        this.tableBodyElement.innerHTML = this.generateHTML(this.pageData);

        // Generate pagination buttons
        const paginationContainer = document.getElementById("pagination-container");
        paginationContainer.innerHTML = '';

        for (let i = 1; i <= Math.ceil(data.length / this.rowsPerPage); i++) {
            const button = document.createElement('button');
            button.textContent = i;
            button.onclick = () => this.gotoPage(i, data);
            paginationContainer.appendChild(button);
        }

        const nextPageButton = document.createElement('button');
        nextPageButton.textContent ='Next';
        nextPageButton.onclick = () => this.gotoPage(1, data);
        paginationContainer.appendChild(nextPageButton);
    }
    
    gotoPage = (pageNumber, data) => {
        this.displayPage(pageNumber, data);
        renderStatisticsChart(this.getPageData());
    }

    sort(sortBy , order, data) {
        data = sortUsers(data, sortBy, order);
        this.displayPage(1, data);
        renderStatisticsChart(this.getPageData());
    }
}