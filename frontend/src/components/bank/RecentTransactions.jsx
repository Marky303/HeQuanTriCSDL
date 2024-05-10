import React, { useState, useEffect } from 'react';
import api from '../../api';
import '../../pagestyles/bank/RecentTransactions.css';
const RecentTransactions = () => {
    const [recentTransactions, setRecentTransactions] = useState([]);

    useEffect(() => {
        fetchRecentTransactions();
    }, []);

    const fetchRecentTransactions = async () => {
        try {
            const response = await api.get('/bank/transactions/');
            const transactions = response.data;
            const sortedTransactions = transactions.sort((a, b) => new Date(b.Tcreation) - new Date(a.Tcreation));
            const recentTransactions = sortedTransactions.slice(0, 5);
            setRecentTransactions(recentTransactions);
        } catch (error) {
            console.error('Error fetching recent transactions:', error);
        }
    };

    return (
        <div className='recent-transactions'>
            <h3>Recent Transactions</h3>
            <ul>
                {recentTransactions.map(transaction => (
                    <li key={transaction.id}>
                        <p>{transaction.transactionName}</p>
                        <p>{transaction.Tcreation}</p>
                        <p>{transaction.amount}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RecentTransactions;
