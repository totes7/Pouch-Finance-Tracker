import React, { useState, useEffect } from 'react';
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";
import Transactions from "./Transactions";
import Graphs from "./Graphs";
import '../assets/styles/Overview.css';
import { auth, firestore, doc, getDoc } from '../utils/firebaseConfig';


const Overview = () => {
  const [fullName, setFullName] = useState('');
  const currentDate = dayjs().format("ddd D MMMM, YYYY");

  useEffect(() => {
    const fetchFullName = async () => {
      try {

        // Get the document reference for the current user
        const userDocRef = doc(firestore, 'users', auth.currentUser.uid);
        const docSnapshot = await getDoc(userDocRef);
        
        // Check if the document exists
        if (docSnapshot.exists()) {
          const userData = docSnapshot.data();
          // Set the fullName state to the value retrieved from Firestore
          setFullName(userData.fullName);

          // Store fullName in localStorage
          localStorage.setItem('fullName', userData.fullName);
        } else {
          console.log('User document not found');
        }
      } catch (error) {
        console.error('Error fetching user document:', error);
      }
    };

    // Call the fetchFullName function when the component mounts
    if (auth.currentUser) {
      fetchFullName();
    }
  }, [fullName]);

  // Retrieve fullName from localStorage
  useEffect(() => {
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, []);


  return (
    <div className="overview-wrapper">
      <div className="overview-content">
        <div className="welcome-wrapper">
          <h1>Welcome back, {fullName && fullName.split(' ')[0]}!</h1>
          <h1>{currentDate}</h1>
        </div>
        <div className="components-wrapper">
          <div className="form-wrapper">
            <Form />
          </div>
          <div className="graphs-wrapper">
            <Graphs />
            <Transactions />
          </div>
        </div>

      </div>
    </div>

  );
};

export default Overview;
