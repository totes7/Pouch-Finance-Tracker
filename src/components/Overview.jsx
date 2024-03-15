import React from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";
import Transactions from "./Transactions";
import Graphs from "./Graphs";

const Overview = () => {
  const userName = "John";
  const currentDate = dayjs().format("ddd D MMMM YYYY");

  return (
    <div className="container">
      <div className="container-fluid bg-light p-3">
        <div className="row">
          <div className="col">
            <p className="m-0">Welcome back, {userName}!</p>
          </div>
          <div className="col text-end">
            <p className="m-0">{currentDate}</p>
          </div>
        </div>
      </div>
      <Form />
      <Transactions />
      <Graphs />
    </div>
  );
};

export default Overview;
