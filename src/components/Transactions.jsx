import React, { useState, useEffect } from "react";
import { TransactionTypes } from "../utils/TransactionTypes";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "./Form";
import { db } from "./Form";
import "../assets/styles/Transactions.css";

function Transactions() {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const transactionsCollection = collection(firestore, "transactions");
        const snapshot = await getDocs(transactionsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactionData(data);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const transactionDocRef = doc(firestore, "transactions", id);
      await deleteDoc(transactionDocRef);
      setTransactionData(
        transactionData.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="container-fluid">
      {isLoading ? (
        <h2>Loading...</h2>
      ) : transactionData.length === 0 ? (
        <h2>No transactions at the moment</h2>
      ) : (
        transactionData.map((transaction) => {
          const transactionType = TransactionTypes.find(
            (type) => type.title.toLowerCase() === transaction.type
          );

          if (transactionType) {
            return (
              <div key={transaction.id}>
                <div className="row mb-3 w-100">
                  <div className="col mb-2">
                    {transactionType && (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: transactionType.icon,
                        }}
                      />
                    )}
                  </div>
                  <div className="col mb-2">
                    <div className="title">{transaction.title}</div>
                  </div>
                  <div className="col mb-2">
                    <div className="transaction-type">{transaction.type}</div>
                  </div>
                  <div className="col mb-2">
                    <div className="amount">${transaction.amount}</div>
                  </div>
                  <div className="col mb-2">
                    <button
                      className="delete-button btn btn-danger"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
      )}
    </div>
  );
}

export default Transactions;
