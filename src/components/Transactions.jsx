import React from "react";
import { TransactionTypes } from "../utils/TransactionTypes";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import "../assets/styles/Transactions.css";
import { useFetchTransactionData } from "../utils/fetchTransactionData";

function Transactions() {
  const { transactionData, loading } = useFetchTransactionData();

  // Define handleDelete function
  const handleDelete = async (transactionId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User is not authenticated.");
      }

      const transactionRef = doc(
        collection(db, `users/${user.uid}/transactions`),
        transactionId
      );
      await deleteDoc(transactionRef);
      // Refresh the page after deletion
      window.location.reload();
    } catch (error) {
      console.log("Error deleting transaction:", error);
    }
  };

  // Group transactions by type
  const groupedTransactions = transactionData.reduce((acc, transaction) => {
    const type = transaction.type.toLowerCase(); // Convert type to lowercase for consistency
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(transaction);
    return acc;
  }, {});

  return (
    <>
      <div className="all-transactions-wrapper">
        <div className="all-transactions-content">
          {loading ? (
            // Render spinner if loading state is true
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : transactionData.length === 0 ? (
            <h2 className="no-transactions">No transactions at the moment</h2>
          ) : (
            Object.entries(groupedTransactions).map(
              ([type, transactionsOfType]) => (
                <div key={type} className="transaction-type-section">
                  <h2 className="transaction-section-title">{type}</h2>
                  {transactionsOfType.map((transaction) => {
                    const transactionType = TransactionTypes.find(
                      (typeObj) => typeObj.title === transaction.type
                    );
                    return (
                      <div
                        key={transaction.id}
                        className="all-transaction-item"
                      >
                        <div className="mini-icon-wrapper">
                          <i className={transactionType.icon}></i>
                        </div>
                        <div className="all-title-wrapper">
                          <h6>{transaction.title}</h6>
                        </div>
                        <div className="all-transaction-type">
                          <h6>{transaction.type}</h6>
                        </div>
                        <div className="all-price-wrapper">
                          {transaction.type === "Income" ||
                          transaction.type === "Savings" ? (
                            <div className="amount-plus number-font">
                              +£{transaction.amount.toFixed(2)}
                            </div>
                          ) : (
                            <div className="amount-minus number-font">
                              -£{transaction.amount.toFixed(2)}
                            </div>
                          )}
                        </div>
                        <div className="all-button-wrapper">
                          <i
                            className="fa-solid fa-trash-can"
                            onClick={() => handleDelete(transaction.id)}
                          ></i>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )
            )
          )}
        </div>
      </div>
    </>
  );
}

export default Transactions;
