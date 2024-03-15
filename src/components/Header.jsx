import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/styles/Header.css';
import { Logo, SecondaryLogo } from "./Logo";

function Header() {
  return (
    <div className='header-wrapper'>
      <div className="header">     
          <SecondaryLogo />
        <nav className="nav-wrapper">
          <ul className='nav-list'>
            <li className='nav-item'>
              <NavLink to='/' className="nav-link" activeClassName="active">
               Overview
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/transactions' className="nav-link" activeClassName="active">
              Transactions
              </NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/documents' className="nav-link" activeClassName="active">
               Documents
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="user-wrapper">
          <button><i className="fa-solid fa-user"></i></button>

          <button><i className="fa-solid fa-arrow-right-from-bracket"></i></button>
        </div>
      </div>

    </div>
  )
}

export default Header