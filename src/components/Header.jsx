import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip as ReactTooltip } from "react-tooltip";
import '../assets/styles/Header.css';
import { Logo, SecondaryLogo } from "./Logo";
import { auth, doc, db, getDoc } from "../utils/firebaseConfig";
import useFetchName from "../utils/fetchName";

function Header() {

  const { fullName } = useFetchName(auth.currentUser.uid);

  // Get initials
  const initials = fullName && fullName.split(' ').map(word => word[0]).join('');

  // Function to handle logout
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Logout user from Firebase Authentication
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  return (
    <>
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
