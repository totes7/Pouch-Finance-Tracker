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
    auth.onAuthStateChanged((user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });
  }, [loggedIn]);

  return (
    <>
      {loggedIn ? (
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Overview />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/documents" element={<Documents />} />
          </Routes>
          <Footer />
        </Router>
      ) : (
        <Router>
          <Routes>
            <Route path="/login" element={<AccountAccess />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
