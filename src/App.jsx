import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AccountAccess from "./components/AccountAccess";

import Overview from "./components/Overview";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route exact path="/" element={<Overview />} /> */}
          {/* Define a route for the Overview component */}
        </Routes>
      </Router>
      <AccountAccess />
    </>
  );
}

export default App;
