import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const ExpensePieChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: data.map(expense => expense.type),
        datasets: [{
          label: 'Expense Overview',
          data: data.map(expense => expense.amount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 205, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)'
            // Add more colors as needed
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 205, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
            // Add more colors as needed
          ],
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'right',
          },
          title: {
            display: true,
            text: 'Expense Overview'
          }
        }
      }
    });

    return () => {
      chart.destroy();
    };
  }, [data]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export default ExpensePieChart;
