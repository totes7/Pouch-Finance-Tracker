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

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track user login status

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
        console.log(loggedIn);
      } else {
        setLoggedIn(false);
        console.log(loggedIn);
      }
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Router>
        <div>
          {loggedIn ? (
            <>
              <Header />
              <Routes>
                <Route path="/" element={<Overview />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/documents" element={<Documents />} />
              </Routes>
              <Footer />
            </>
          ) : (
            <Routes>
              <Route exact path="/" element={<AccountAccess />} />
            </Routes>
          )}
        </div>
      </Router>
    </>
  );
}

export default App;
