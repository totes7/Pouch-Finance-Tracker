import React from "react";
import { TransactionTypes } from "../utils/TransactionTypes";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../utils/firebaseConfig";
import "../assets/styles/MiniTransactions.css";
import { useFetchTransactionData } from "../utils/fetchTransactionData";

function MiniTransactions() {
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
        <>
        <div className="mini-transactions-wrapper">
            <div className="mini-transactions-content">
                {loading ? ( // Render spinner if loading state is true
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                ) : transactionData.length === 0 ? (
                    <h2 className="no-transactions">No transactions at the moment</h2>
                ) : (
                    transactionData.slice(-4).map((transaction) => { // Display last four transactions
                        const transactionType = TransactionTypes.find(
                            (type) => type.title === transaction.type
                        );
                        return (
                            <div key={transaction.id} className="mini-transaction-item">
                                <div className="mini-icon-wrapper">
                                    <i className={transactionType.icon}></i>
                                </div>
                                <div className="mini-title-wrapper">
                                    <h6>{transaction.title}</h6>
                                </div>
                                <div className="mini-transaction-type">
                                    <h6>{transaction.type}</h6>
                                </div>
                                <div className="mini-price-wrapper">
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
                                <div className="mini-button-wrapper" >
                                    <i className="fa-solid fa-trash-can" onClick={() => handleDelete(transaction.id)}></i>
                                </div>
                              
                            </div>
                        );
                    })
                )}
            </div>
        </div>
        </>
    );
}

export default MiniTransactions