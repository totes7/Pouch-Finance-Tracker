import React from 'react';
import '../assets/styles/Footer.css'
import dayjs from 'dayjs';

function Footer() {
    let currentYear = dayjs().year();

  return (
    <div className='footer-wrapper'>
        <div className="footer-details">
            <p>{currentYear} &copy; Pouch</p>
            <div className="icons-wrapper">
                <button><i className="fa-brands fa-github"></i></button>
            </div>
        </div>

    </div>
  )
}

export default Footer