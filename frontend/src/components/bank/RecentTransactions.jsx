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

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    };

    return (
        <div className='recent-transactions'>
            <h3>Recent Transactions</h3>
            <div className='transactions'>
                {recentTransactions.map(transaction => (
                    <div  className='transaction' key={transaction.id}>
                        <p>{transaction.amount}</p>
                        <p>{formatDate(transaction.Tcreation)}</p>
                        <p>{transaction.transactionName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecentTransactions;
