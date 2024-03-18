import React, { useState, useEffect } from "react";
import { TransactionTypes } from "../utils/TransactionTypes";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import "../assets/styles/Transactions.css";
import { getFirestore } from "firebase/firestore";
// const db = getFirestore(firebaseApp);

function Transactions() {
  const [transactionData, setTransactionData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        if (!user) {
          throw new Error("User is not authenticated.");
        }

        const usersCollection = collection(db, "users");
        const loggedInUserDocRef = doc(usersCollection, user.uid);
        const transactionsCollection = collection(
          loggedInUserDocRef,
          "transactions"
        );
        const snapshot = await getDocs(transactionsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactionData(data);
      } catch (error) {
        console.log("Error fetching transaction data:");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTransactionData();
  }, [db, user]);

  const handleDelete = async (id) => {
    try {
      const transactionsCollection = collection(
        db,
        `users/${user.uid}/transactions`
      );
      const transactionDocRef = doc(transactionsCollection, id);
      await deleteDoc(transactionDocRef);
      setTransactionData((prevData) =>
        prevData.filter((transaction) => transaction.id !== id)
      );
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="container-fluid transaction">
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
              <div key={transaction.id} className="row mb-3">
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
                  <i
                    className="fa-solid fa-delete-left"
                    onClick={() => handleDelete(transaction.id)}
                  ></i>
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
