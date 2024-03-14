import React, { useState } from 'react';
import '../assets/styles/Form.css';
import { TransactionTypes } from '../utils/TransactionTypes'

function Form() {
  return (
    <div>
      <CreditCard />
      <TransactionForm />
    </div>
  );
}

function CreditCard() {
  const [creditCardNumber, setCreditCardNumber] = useState('2424 2424 2424 2424'); // initial credit card
  const [isCreditCardEditing, setIsCreditCardEditing] = useState(false);
  const [expiryDate, setExpiryDate] = useState('12/24'); // Initial expiry date
  const [isExpiryEditing, setIsExpiryEditing] = useState(false);

  const handleCreditCardNumberChange = (event) => {
    setCreditCardNumber(event.target.value);
  };

  const handleCreditCardNumberClick = () => {
    setIsCreditCardEditing(true);
  };

  //user finishes editing the credit card number and clicks outside of the input field
  const handleCreditCardNumberBlur = () => {
    setIsCreditCardEditing(false);
  };

  const handleExpiryDateChange = (event) => {
    setExpiryDate(event.target.value);
  };

  const handleExpiryDateClick = () => {
    setIsExpiryEditing(true);
  };

  const handleExpiryDateBlur = () => {
    setIsExpiryEditing(false);
  };

  return (
    <div className='container credit-card'>
      <div className="credit-card-container">
        <div className='logo-container'>
          <i className="fa-solid fa-coins"></i>
          <i className="fa-brands fa-cc-visa"></i>
        </div>
        <div className="credit-card-number">
          {isCreditCardEditing ? (
            <input
              type="text"
              value={creditCardNumber}
              onChange={handleCreditCardNumberChange}
              onBlur={handleCreditCardNumberBlur}
              autoFocus
            />
          ) : (
            <h5 onClick={handleCreditCardNumberClick}>{creditCardNumber}</h5>
          )}
        </div>
        <div className="details-container">
          <div className="name">
            <p>FULL NAME</p>
            <p className='full-name'></p>
          </div>
          <div className="expiry">
            {isExpiryEditing ? (
              <input
                type="text"
                value={expiryDate}
                onChange={handleExpiryDateChange}
                onBlur={handleExpiryDateBlur}
                autoFocus
              />
            ) : (
              <div>
              <p>EXPIRY/DATE:</p>
              <p className='date' onClick={handleExpiryDateClick}>{expiryDate}</p>
            </div>
            )}
          </div>
        </div>
      </div>
      <div className="account-details">
        <div className="balance">
          <h3>Balance:</h3>
          <h3></h3>
        </div>
        <div className="savings">
          <h3>Savings:</h3>
          <h3></h3>
        </div>
      </div>
    </div>
  );
}


function TransactionForm() {
  return (
    <div className='container transaction-form'>
      <h2>NEW TRANSACTION</h2>
      <form>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" placeholder='E.g. Phone Bill' autoComplete="title" required step="0.01"/>
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" name="amount" placeholder='$' autoComplete="username" required />
        <label htmlFor="type">Type</label>
        <select id="type" name="type" required>
          <option disabled value="">Select a transaction type</option>
          {TransactionTypes.map((type) => (
            <option key={type.id} value={type.title.toLowerCase()}>
              {type.title}
            </option>
          ))}
        </select>
        <button type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default Form;
