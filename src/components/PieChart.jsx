import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
    labels: ['Salary', 'Savings', 'Emergency Fund'],
    datasets: [
        {
            label: '£',
            data: [2500, 450, 100],
            backgroundColor: [
                'rgba(70, 174, 134, 0.5)',
                'rgba(191, 204, 202, 0.5)',
                'rgba(26, 78, 47, 0.5)',



            ],
            borderColor: [
                'rgba(70, 174, 134, 0.5)',
                'rgba(191, 204, 202, 0.5)',
                'rgba(26, 78, 47, 0.5)',

            ],
            borderWidth: 1,
            hoverOffset: 40,
        },
    ]
}

 export function PieChart() {
    return <Pie data={data} />;
}