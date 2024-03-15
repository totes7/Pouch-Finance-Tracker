import React, { useState } from "react";
import "../assets/styles/Form.css";
import { TransactionTypes } from "../utils/TransactionTypes";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebaseConfig from "../utils/firebaseConfig"; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export { db, firebaseApp, auth };

// Get a Firestore instance
const firestore = getFirestore();
export { firestore };
export function Form() {
  return (
    <div>
      <CreditCard />
      <TransactionForm />
    </div>
  );
}

function CreditCard() {
  const [creditCardNumber, setCreditCardNumber] = useState(
    "2424 2424 2424 2424"
  ); // initial credit card
  const [isCreditCardEditing, setIsCreditCardEditing] = useState(false);
  const [expiryDate, setExpiryDate] = useState("12/24"); // Initial expiry date
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
    <div className="container credit-card">
      <div className="credit-card-container">
        <div className="logo-container">
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
            <p className="full-name"></p>
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
                <p className="date" onClick={handleExpiryDateClick}>
                  {expiryDate}
                </p>
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
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    type: "",
  });

  const firestore = getFirestore();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
     // Get the currently logged-in user's UID
     const auth = getAuth();
     const currentUser = auth.currentUser;
     const userUID = currentUser.uid;

     // Reference the 'transactions' collection under the user's UID
     const userTransactionsCollection = collection(firestore, `users/${userUID}/transactions`);

     // Add a new document to the user's 'transactions' collection with the form data
     await addDoc(userTransactionsCollection, formData);

     console.log("Transaction added successfully!");
      // Reset the form fields after submission
      setFormData({
        title: "",
        amount: "",
        type: "",
      });
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  return (
    <div className="container transaction-form">
      <h2>NEW TRANSACTION</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="E.g. Phone Bill"
          autoComplete="title"
          required
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="$"
          autoComplete="username"
          required
        />
        <label htmlFor="type">Type</label>
        <select
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        >
          <option disabled value="">
            Select a transaction type
          </option>
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
