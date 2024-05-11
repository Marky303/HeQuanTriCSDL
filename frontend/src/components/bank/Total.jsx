import React from 'react';
import '../../pagestyles/bank/Total.css';
import CardList from './CardList';
const Total = ({ amount, label, className }) => {
    return (
        <div className='total'>
            <span className={className}></span>
            <p>$ {amount.toFixed(2)}</p>
            <h3>{label}</h3>
        </div>
    );
};

export default Total;
