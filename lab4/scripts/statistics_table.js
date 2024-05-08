class StatisticsTable{
    constructor(tableElement, tableBodyElement) {
        this.statisticsElement = tableElement;
        this.tableBodyElement = tableBodyElement;
    }

    generateHTML(data) {    
        for (item of data) {
            let template = `
            <tr>
                <td>${item.full_name}</td>
                <td>${item.course}</td>
                <td>${item.age}</td>
                <td>${item.gender}</td>
                <td>${item.country}</td>
            </tr>`;

            this.tableBodyElement.innerHTML += template;
        }    
    }
}