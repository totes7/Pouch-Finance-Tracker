import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AccountAccess from "./components/AccountAccess";
import Header from "./components/Header";
import Overview from "./components/Overview";
import Footer from "./components/Footer";
import Transactions from "./components/Transactions";
import Documents from "./components/Documents";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State to track user login status

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Overview />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/login" element={<AccountAccess  />} /> {/* Route for AccountAccess component */}
        </Routes>
        <Footer />
      </Router>
    </>
  );
}




export default App;
