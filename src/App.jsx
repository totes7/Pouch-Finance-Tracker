import { useState } from 'react';
import './App.css';
import AccountAccess from './components/AccountAccess';
import Form from './components/Form'

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
