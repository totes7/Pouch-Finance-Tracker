import React from 'react';
import '../assets/styles/Footer.css'
import dayjs from 'dayjs';
import { Tooltip as ReactTooltip } from "react-tooltip";

function Footer() {
    let currentYear = dayjs().year();

  return (
    <div className='footer-wrapper'>
        <div className="footer-details">
            <p>{currentYear} &copy; Pouch</p>
            <div className="icons-wrapper">
                <button data-tooltip-id="my-tooltip-3"><i className="fa-brands fa-github"></i></button>
            </div>
        </div>

        <ReactTooltip
        id="my-tooltip-3"
        place="bottom"
        variant="info"
        content="Visit our Github Page"
        style={{ backgroundColor: "var(--light-green)", color: "var(--primary-text-color)", fontWeight: "500" }}
      />
    </div>
  )
}

export default Footer