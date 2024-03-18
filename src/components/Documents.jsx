import React, { useState, useEffect } from "react";
import { firestore, auth } from "../utils/firebaseConfig";

function Docs() {
  // const [documents, setDocuments] = useState([]);

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     try {
  //       const currentUser = auth.currentUser;
  //       const userUID = currentUser.uid;
        
  //       const documentsRef = firestore.collection(`users/${userUID}/transactions`);
  //       const snapshot = await documentsRef.get();
  //       const documentsData = snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         ...doc.data()
  //       }));
  //       setDocuments(documentsData);
  //     } catch (error) {
  //       console.error("Error fetching documents: ", error);
  //     }
  //   };

  //   fetchDocuments();
  // }, []);

  // return (
  //   <div>
  //     <h2>Documents</h2>
  //     <ul>
  //       {documents.map((document) => (
  //         <li key={document.id}>
  //           <p>Title: {document.title}</p>
  //           <p>Type: {document.type}</p>
  //           <p>PDF URL: {document.pdfURL}</p>
  //           {/* Add additional display logic here */}
  //         </li>
  //       ))}
  //     </ul>
  //   </div>
  // );
}

export default Docs;
