import React from 'react';
import '../assets/styles/Logo.css';

function Logo() {
    return (
        <div className="logo-container">
            <i className="fa-solid fa-coins"></i>
            <h2>pouch</h2>
        </div>
    );
}

function SecondaryLogo() {
    return (
        <div className="dark-logo-container">
             <i className="fa-solid fa-coins"></i>
            <h2>pouch</h2>
        </div>
    );
}

export { Logo, SecondaryLogo };
