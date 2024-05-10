import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 
import api from '../../api';

const TransactionActivity = () => {
    const [transactions, setTransactions] = useState([]);
    const chartRef = useRef(null); 

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/bank/transactions/');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    useEffect(() => {
        renderColumnChart();
    }, [transactions]);

    const groupTransactionsByDay = () => {
        const sortedTransactions = [...transactions].sort((a, b) => new Date(a.Tcreation) - new Date(b.Tcreation));
        const groupedTransactions = {};
        
        sortedTransactions.forEach(transaction => {
            const date = new Date(transaction.Tcreation).toLocaleDateString();
            if (!groupedTransactions[date]) {
                groupedTransactions[date] = { expenses: 0, income: 0 }; // Use 'expenses' and 'income'
            }
            const amount = parseFloat(transaction.amount); // Parse amount string to number
            if (amount < 0) {
                groupedTransactions[date].expenses += Math.abs(amount);
            } else if (amount > 0) {
                groupedTransactions[date].income += amount;
            }
        });
    
        return groupedTransactions;
    };
    
    const renderColumnChart = () => {
        const groupedTransactions = groupTransactionsByDay();
        const labels = Object.keys(groupedTransactions);
        const expensesData = Object.values(groupedTransactions).map(item => item.expenses); // Use 'expenses'
        const incomeData = Object.values(groupedTransactions).map(item => item.income); // Use 'income'
    
        // Destroy previous chart instance if exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }
    
        const ctx = document.getElementById('transaction-chart');
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Expenses',
                        data: expensesData,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1,
                    },
                    {
                        label: 'Income',
                        data: incomeData,
                        backgroundColor: 'rgba(54, 162, 235, 0.5)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    };

    return (
        <div className='transaction-activity'>
            <h3>Transaction Activity</h3>
            <canvas id='transaction-chart'></canvas>
        </div>
    );
};

export default TransactionActivity;
