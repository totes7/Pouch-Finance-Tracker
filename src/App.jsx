import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import AccountAccess from "./components/AccountAccess";
import Header from "./components/Header";
import Overview from "./components/Overview";
import Footer from "./components/Footer";
import Transactions from "./components/Transactions";
import Documents from "./components/Documents";
import { auth } from "./utils/firebaseConfig.js";
import { SecondaryLogo } from "./components/Logo"; // Import Logo component

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track user login status
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        setTimeout(() => setLoading(false), 3000); // Simulate 2 seconds delay
      } else {
        setLoggedIn(false);
        setTimeout(() => setLoading(false), 3000); // Simulate 2 seconds delay
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  // Show loading indicator until authentication status is determined
  if (loading) {
    return (
      <div className="loading-wrapper">
        <div className="loading-container  animate__animated animate__fadeInDown">
          <SecondaryLogo className="logo" />
        </div>
      </div>
    );
  }

  return (
    <>
      <Router>
        <div className="animate__animated animate__fadeIn">
          {loggedIn ? (
            <>
              <Header/>
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/documents" element={<Documents />} />
              </Routes>
              <Footer />
            </>
          ) : (
            <>
              <Routes>
                <Route exact path="/" element={<AccountAccess />} />
              </Routes>
              <Footer />
            </>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
