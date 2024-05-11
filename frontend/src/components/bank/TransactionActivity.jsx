import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto'; 
import api from '../../api';
import '../../pagestyles/bank/TransactionActivity.css';
const TransactionActivity = () => {
    const [transactions, setTransactions] = useState([]);
    const [filterType, setFilterType] = useState('month');
    const chartRef = useRef(null); 

    useEffect(() => {
        fetchTransactions();
    }, [filterType]); // Fetch transactions when filter type changes

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/bank/transactions/');
            const filteredTransactions = filterTransactionsByTime(response.data);
            setTransactions(filteredTransactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const filterTransactionsByTime = (data) => {
        const currentDate = new Date();
        let startDate, endDate;

        switch (filterType) {
            case 'week':
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));
                break;
            case 'month':
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
                break;
            case 'year':
                startDate = new Date(currentDate.getFullYear(), 0, 1);
                endDate = new Date(currentDate.getFullYear(), 11, 31);
                break;
            default:
                startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
                endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + (6 - currentDate.getDay()));
                break;
        }

        return data.filter(transaction => {
            const transactionDate = new Date(transaction.Tcreation);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
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
                        backgroundColor: '#007FFF',
                        borderRadius: 10,
                    },
                    {
                        label: 'Income',
                        data: incomeData,
                        backgroundColor: '#17e9e1',
                        borderRadius: 10,
                        barPercentage: 0.3,
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

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    return (
        <div>
            <div className='transaction'>
                <h3>Transaction Activity</h3>
                <select value={filterType} onChange={handleFilterChange}>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                </select>
            </div>
            <canvas id='transaction-chart'></canvas>
        </div>
    );
};

export default TransactionActivity;
