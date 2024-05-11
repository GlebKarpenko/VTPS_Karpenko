import Chart from '../node_modules/chart.js/auto';

let previousChart = null;

export function renderStatisticsChart(data) {
    if (previousChart) {
        previousChart.destroy();
    }

    const ctx = document.getElementById('statistics-chart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: data.map(item => item.full_name),
            datasets: [
                {
                    label: 'Age',
                    data: data.map(item => item.dob.age),
                    backgroundColor: 'rgba(54, 162, 235, 0.5)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidht: 1
                }
            ]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    previousChart = chart;
}