import React from "react"
import TransactionChart from "../../components/bank/TransactionActivity"
import TotalSummary from "../../components/bank/Total";
import TransactionItem from "../../components/bank/TransactionItem";
import "../../pagestyles/bank/DashBoard.css"
import ExpensePieChart from "../../components/bank/ExpenseChart";
import Card from "../../components/bank/Card";
const expenseData = [
    { type: 'Food', amount: 200 },
    { type: 'Transportation', amount: 150 },
    { type: 'Utilities', amount: 100 },
    { type: 'Entertainment', amount: 50 },
    // Add more data as needed
  ];
export default function DashBoard() {
    const transactionData = [
        { date: '2024-04-01', expense: 200, income: 500 },
        { date: '2024-04-02', expense: 150, income: 400 },
        { date: '2024-04-03', expense: 300, income: 600 },
      ];
      const recentTransactions = [
        { date: '2024-04-01', description: 'Supermarket', amount: 50, type: 'Expense', cardType:'Bank' },
        { date: '2024-04-02', description: 'Salary', amount: 1000, type: 'Income', cardType:'Bank' },
        { date: '2024-04-03', description: 'Restaurant', amount: 30, type: 'Expense', cardType:'Bank' },
      ];  
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <div className="grid-container">
                <div className="grid-item chart">
                    <h3>Transaction Activity</h3>
                    <TransactionChart data={transactionData}/>
                </div>
                <div className="grid-item card">
                    <h1>Card</h1>
                </div>
                <div className="grid-item total-expense">
                    <h3>Total Expense:</h3>
                    <TotalSummary total={1320}/>
                </div>
                <div className="grid-item total-income">
                    <h3>Total Income:</h3>
                    <TotalSummary total={2120}/>
                </div>
                <div className="grid-item recent-transactions">
                    <h2>Recent Transactions</h2>
                    {recentTransactions.map((transaction, index) => (
                        <TransactionItem
                        key={index}
                        date={transaction.date}
                        description={transaction.description}
                        amount={transaction.amount}
                        type={transaction.type}
                        />
                    ))}
                </div>
                
                <div className="grid-item expense-overview">
                    <h1>Expense Overview</h1>
                    <ExpensePieChart data={expenseData} />
                </div>
            </div>
        </div>
    )
}