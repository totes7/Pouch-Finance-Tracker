import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'; // Add this import
import { doc, setDoc, getDoc } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyB1lhXzkwzslSudFPed58CVXr9i6JRLNqE",
  authDomain: "pouch-90c28.firebaseapp.com",
  projectId: "pouch-90c28",
  storageBucket: "pouch-90c28.appspot.com",
  messagingSenderId: "1055575224621",
  appId: "1:1055575224621:web:f7bdc9b4e8b5c7b46b63a4",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const firestore = getFirestore(); // Get a Firestore instance



export { auth, db, storage, collection, addDoc, ref, uploadBytesResumable, getDownloadURL, firestore,doc, setDoc, getDoc };

export default firebaseConfig;