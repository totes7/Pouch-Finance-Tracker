import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "./firebaseConfig";

export function useFetchTransactionData() {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) {
          throw new Error("User is not authenticated.");
        }

        const transactionsCollection = collection(db, `users/${user.uid}/transactions`);
        const snapshot = await getDocs(transactionsCollection);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTransactionData(data);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching transaction data:", error);
      }
    };

    fetchTransactionData();
  }, []);

  return { transactionData, loading };
}
