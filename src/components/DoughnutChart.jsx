import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Food', 'Shopping', 'Household', 'Fun', 'Misc'],
    datasets: [
        {
            label: '£',
            data: [70, 30, 15, 40, 20],
            backgroundColor: [
                'rgba(255, 95, 95, 0.5)',
                'rgba(246, 200, 99, 0.5)',
                'rgba(105, 176, 238, 0.5)',
                'rgba(219, 216, 221, 0.5)',
                'rgba(137, 209, 170, 0.5)'
            ],
            borderColor: [
                'rgba(255, 95, 95, 1)',
                'rgba(246, 200, 99, 1)',
                'rgba(219, 216, 221, 1)',
                'rgba(105, 176, 238, 1)',
                'rgba(137, 209, 170, 1)'
            ],
            borderWidth: 1
        },
    ]
}

 export function DoughnutChart() {
    return <Doughnut data={data} />;
}