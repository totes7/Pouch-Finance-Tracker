import { useState, useEffect } from 'react';
import { doc, db, getDoc } from "../utils/firebaseConfig";

const useFetchName = (uid) => {
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const usersCollection = doc(db, "users", uid);
        const document = await getDoc(usersCollection);
        setFullName(document.data().fullName);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user's full name:", error);
        setLoading(false);
      }
    };

    fetchFullName();
  }, [uid]);

  return { fullName, loading };
};

export default useFetchName;
