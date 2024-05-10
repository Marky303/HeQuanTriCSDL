import React, { useState, useEffect } from "react";
import '../../pagestyles/bank/DashBoard.css';
import Total from '../../components/bank/Total';
import TransactionActivity from '../../components/bank/TransactionActivity';
import RecentTransactions from '../../components/bank/RecentTransactions';
import api from '../../api';
import CardList from "../../components/bank/CardList";

const DashBoard = () => {
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        fetchTransactions();
    }, []);

    const fetchTransactions = async () => {
        try {
            const response = await api.get('/bank/transactions/');
            const transactions = response.data;
            const { totalExpense, totalIncome } = calculateTotals(transactions);
            setTotalExpense(totalExpense);
            setTotalIncome(totalIncome);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    const calculateTotals = (transactions) => {
        let expense = 0;
        let income = 0;

        transactions.forEach(transaction => {
            const amount = parseFloat(transaction.amount);
            if (amount < 0) {
                expense += Math.abs(amount);
            } else if (amount > 0) {
                income += amount;
            }
        });

        return { totalExpense: expense, totalIncome: income };
    };

    const handleCardClick = (cardId) => {
        console.log('Card ID:', cardId);
    };

    return (
        <div className='dashboard'>
            <h2>Overview</h2>
            <div className='container'>
                <div className="transaction-activity">
                    <TransactionActivity />
                </div>
                <div className="cards">
                    <CardList onSelect={handleCardClick}/>
                </div>
                <div className='total-expense'>
                    <Total amount={totalExpense} label="Total Expense" />
                </div>
                <div className='total-income'>
                    <Total amount={totalIncome} label="Total Income" />
                </div>
                <div className="recent-transactions">
                    <RecentTransactions />
                </div>
            </div>
        </div>
    );
};

export default DashBoard;
