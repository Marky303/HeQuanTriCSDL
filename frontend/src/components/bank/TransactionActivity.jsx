import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const TransactionChart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.map(day => day.date),
        datasets: [{
          label: 'Expense',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: data.map(day => day.expense),
        }, {
          label: 'Income',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
          data: data.map(day => day.income),
        }],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
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

export default TransactionChart;
