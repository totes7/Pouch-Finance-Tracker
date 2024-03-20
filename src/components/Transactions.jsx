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

      const transactionRef = doc(collection(db, `users/${user.uid}/transactions`), transactionId);
      await deleteDoc(transactionRef);
      // Refresh the page after deletion
      window.location.reload();
    } catch (error) {
      console.log("Error deleting transaction:", error);
    }
  };

  return (
    <div className="transactions-wrapper">
      <div className="container-fluid">
        {loading ? ( // Render spinner if loading state is true
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : transactionData.length === 0 ? (
          <h2 className="no-transactions">No transactions at the moment</h2>
        ) : (
          transactionData.map((transaction) => {
            const transactionType = TransactionTypes.find(
              (type) => type.title === transaction.type
            );

            return (
              <div key={transaction.id} className="row mb-3">
                <div className="col mb-2 icon-wrap">
                  <i className={transactionType.icon}></i>
                </div>
                <div className="col mb-2">
                  <div className="title">{transaction.title}</div>
                </div>
                <div className="col mb-2">
                  <div className="transaction-type">{transaction.type}</div>
                </div>
                <div className="col mb-2">
                  {transaction.type === "Income" ||
                  transaction.type === "Savings" ? (
                    <div className="amount-plus number-font">
                      +£{transaction.amount}
                    </div>
                  ) : (
                    <div className="amount-minus number-font">
                      -£{transaction.amount}
                    </div>
                  )}
                </div>
                <div className="col mb-2">
                  <button
                    className="btn-sm delete-button"
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </button>
                </div>
                <hr />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Transactions;
