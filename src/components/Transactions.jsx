import React, { useState } from "react";
import { TransactionTypes } from "../utils/TransactionTypes"; // Import TransactionTypes array
import "../assets/styles/Transactions.css";

function Transactions() {
  const [transactionData, setTransactionData] = useState([
    {
      _id: { $oid: "65f0c0e020fb3748cd19aa39" },
      transactionType: "Shopping",
      amount: 100,
      title: "Iphone 15",
      documentsUploaded: 2,
      date: "2024-03-13",
    },
    {
      _id: { $oid: "65f0c0e020fb3748cd19aa40" },
      transactionType: "Entertainment",
      amount: 150,
      title: "Food Shop",
      documentsUploaded: 1,
      date: "2024-03-14",
    },
  ]);

  const handleDelete = (id) => {
    const updatedTransactions = transactionData.filter(
      (transaction) => transaction._id.$oid !== id
    );
    setTransactionData(updatedTransactions);
  };

  return (
    <div className="container-fluid">
      {transactionData.map((transaction) => {
        const transactionType = TransactionTypes.find(
          (type) => type.title === transaction.transactionType
        );
        return (
          <>
            <div className="row mb-3 w-100" key={transaction._id.$oid}>
              <div className="col mb-2">
                {transactionType && (
                  <span
                    dangerouslySetInnerHTML={{ __html: transactionType.icon }}
                  />
                )}
              </div>
              <div className="col mb-2">
                <div className="title">{transaction.title}</div>
              </div>
              <div className="col mb-2">
                <div className="transaction-type">
                  Type: {transaction.transactionType}
                </div>
              </div>
              <div className="col mb-2">
                <div className="documents-uploaded">
                  {transaction.documentsUploaded} Doc
                </div>
              </div>
              <div className="col mb-2">
                <div className="amount">${transaction.amount}</div>
              </div>
              <div className="col mb-2">
                <button
                  className="delete-button btn btn-danger"
                  onClick={() => handleDelete(transaction._id.$oid)}
                >
                  Delete
                </button>
              </div>
              <div className="w-100"></div>
            </div>
            <hr></hr>
          </>
        );
      })}
    </div>
  );
}

export default Transactions;
