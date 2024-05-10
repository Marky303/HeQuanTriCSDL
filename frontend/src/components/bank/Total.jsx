import React from 'react';

const Total = ({ amount, label }) => {
    return (
        <div className='total'>
            <h3>{label}</h3>
            <p>{amount.toFixed(2)}</p>
        </div>
    );
};

export default Total;
