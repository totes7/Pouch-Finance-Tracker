import React, { useState, useEffect } from "react";
import { auth, db, collection, getDocs, doc, updateDoc } from "../utils/firebaseConfig";
import { TransactionTypes } from "../utils/TransactionTypes";
import '../assets/styles/Documents.css';

function Docs() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading state

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          // No authenticated user, do not proceed fetching transactions
          return;
        }
        
        const userUID = currentUser.uid;
        
        const transactionsRef = collection(db, `users/${userUID}/transactions`);
        const snapshot = await getDocs(transactionsRef);
        const transactionsData = snapshot.docs
          .filter(doc => doc.data().pdfURL)
          .map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
        setTransactions(transactionsData);
        // Set loading state to false after transactions are fetched
        setLoading(false);
      } catch (error) {
        console.error("Error fetching transactions: ", error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchTransactions();
  }, []);

  // Function to handle deleting pdfURL from transaction
  const handleDeletePDF = async (transactionId) => {
    try {
      await updateDoc(doc(db, `users/${auth.currentUser.uid}/transactions`, transactionId), {
        pdfURL: null // Set pdfURL to null to delete it
      });
      setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== transactionId));
    } catch (error) {
      console.error("Error deleting pdfURL: ", error);
    }
  };

  // Function to get icon based on transaction type
  const getIconForType = (type) => {
    const transactionType = TransactionTypes.find((transaction) => transaction.title === type);
    return transactionType ? transactionType.icon : null;
  };

  // Group transactions by type
  const groupedTransactions = transactions.reduce((acc, transaction) => {
    const type = transaction.type.toLowerCase(); // Convert type to lowercase for consistency
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(transaction);
    return acc;
  }, {});

  return (
    <div className="documents-wrapper">
      {loading ? ( // Render spinner if loading state is true
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="documents-content">
          {Object.entries(groupedTransactions).map(([type, transactionsOfType]) => (
            <div key={type} className="transaction-type-section">
              <h2>{type.toUpperCase()}</h2>
              {transactionsOfType.map((transaction) => (
                <div key={transaction.id} className="document-item">
                  <div className="icon"><i className={getIconForType(transaction.type)}></i></div>
                  <h2 className="title">{transaction.title}</h2>
                  <p className="type">{transaction.type}</p>
                  {transaction.pdfURL && (
                    <>
                      <button onClick={() => window.open(transaction.pdfURL, "_blank")}>View</button>
                      <button onClick={() => handleDeletePDF(transaction.id)} className="delete">Delete</button>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Docs;
