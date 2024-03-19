import React, { useState, useEffect } from "react";
import { auth, db, collection, getDocs, doc, updateDoc } from "../utils/firebaseConfig";
import { TransactionTypes } from "../utils/TransactionTypes";
import '../assets/styles/Documents.css';

function Docs() {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading state

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          // No authenticated user, do not proceed fetching documents
          return;
        }
        
        const userUID = currentUser.uid;
        
        const documentsRef = collection(db, `users/${userUID}/transactions`);
        const snapshot = await getDocs(documentsRef);
        const documentsData = snapshot.docs
          .filter(doc => doc.data().pdfURL)
          .map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));
        setDocuments(documentsData);
        // Set loading state to false after documents are fetched, with a delay of 5 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching documents: ", error);
        setLoading(false); // Set loading state to false in case of error
      }
    };

    fetchDocuments();
  }, []);

  // Function to handle deleting pdfURL from transaction
  const handleDeletePDF = async (documentId) => {
    try {
      await updateDoc(doc(db, `users/${auth.currentUser.uid}/transactions`, documentId), {
        pdfURL: null // Set pdfURL to null to delete it
      });
      setDocuments(prevDocuments => prevDocuments.filter(document => document.id !== documentId));
    } catch (error) {
      console.error("Error deleting pdfURL: ", error);
    }
  };

  // Function to get icon based on transaction type
  const getIconForType = (type) => {
    const transactionType = TransactionTypes.find((transaction) => transaction.title === type);
    return transactionType ? transactionType.icon : null;
  };

  return (
    <div className="documents-wrapper">
      {loading ? ( // Render spinner if loading state is true
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="documents-content">
          {documents.length === 0 ? (
            <h2 className="no-documents">No documents at the moment</h2>
          ) : (
            documents.map((document) => (
              <div key={document.id} className="document-item">
                {document.type && (
                  <div className="icon"><i className={getIconForType(document.type)}></i></div>
                )}
                <h2 className="title">{document.title}</h2>
                <p className="type">{document.type}</p>
                {document.pdfURL && (
                  <>
                    <button onClick={() => window.open(document.pdfURL, "_blank")}>View</button>
                    <button onClick={() => handleDeletePDF(document.id)} className="delete">Delete</button>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Docs;
