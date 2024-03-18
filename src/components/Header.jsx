import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import '../assets/styles/Header.css';
import { Logo, SecondaryLogo } from "./Logo";
import { auth } from "../utils/firebaseConfig"; // Import your Firebase authentication instance
import  { Navigate } from 'react-router-dom'

function Header() {
  const [loggedOut, setLoggedOut] = useState(false); // State to track logout
  const [fullName, setFullName] = useState(''); // State to store full name

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Logout user from Firebase Authentication
      setLoggedOut(true); // Set loggedOut state to true
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  useEffect(() => {
    // Retrieve fullName from localStorage
    const storedFullName = localStorage.getItem('fullName');
    if (storedFullName) {
      setFullName(storedFullName);
    }
  }, [setFullName]); // Added setFullName as a dependency

  // Get initials
  const initials = fullName && fullName.split(' ').map(word => word[0]).join('');

  return (
    <>
      {loggedOut && <Navigate to="/login" />} {/* Redirect to /login if loggedOut state is true */}
      <div className='header-wrapper'>
        <div className="header">     
            <SecondaryLogo />
          <nav className="nav-wrapper">
            <ul className='nav-list'>
              <li className='nav-item'>
                <NavLink to='/' className="nav-link" activeclassname="active">
                  Overview
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/transactions' className="nav-link" activeclassname="active">
                  Transactions
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to='/documents' className="nav-link" activeclassname="active">
                  Documents
                </NavLink>
              </li>
            </ul>
          </nav>
          <div className="user-wrapper">
            <h2 data-tooltip-id="my-tooltip-1" className='initials'>{initials}</h2>
            <button data-tooltip-id="my-tooltip-2" onClick={handleLogout}><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
          </div>
        </div>

        <ReactTooltip
          id="my-tooltip-1"
          place="bottom"
          variant="info"
          content="Online"
          style={{ backgroundColor: "var(--light-green)", color: "var(--primary-text-color)", fontWeight: "500" }}
        />

        <ReactTooltip
          id="my-tooltip-2"
          place="bottom"
          variant="info"
          content="Logout"
          style={{ backgroundColor: "var(--light-green)", color: "var(--primary-text-color)", fontWeight: "500" }}
        />

      </div>
    </>
  )
}

export default Header;
