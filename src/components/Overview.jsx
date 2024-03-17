import React from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";
import Transactions from "./Transactions";
import Graphs from "./Graphs";
import '../assets/styles/Overview.css';


const Overview = () => {
  const userName = "Noly";
  const currentDate = dayjs().format("ddd D MMMM, YYYY");

  return (
    <div className="overview-wrapper">
      <div className="overview-content">
        <div className="welcome-wrapper">
          <p>Welcome back, {userName}!</p>
          <p>{currentDate}</p>
        </div>
        <div className="components-wrapper">
          <div className="form-wrapper">
            <Form />
          </div>
          <div className="graphs-wrapper">
            <Graphs />
            <Transactions />
          </div>
        </div>

      </div>
    </div>

  );
};

export default Overview;
