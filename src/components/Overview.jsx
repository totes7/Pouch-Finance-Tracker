import React from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";
import Transactions from "./Transactions";
import Header from "./Header";
import Graphs from "./Graphs";
import '../assets/styles/Overview.css'

const Overview = () => {
  const userName = "Noly";
  const currentDate = dayjs().format("ddd D MMMM, YYYY");

  return (
    <>
      {/* <Header /> */}
      <div className="container">
        <div className="welcome-header">
          <p>Welcome back, {userName}!</p>
          <p>{currentDate}</p>
        </div>
        <div className="components-container">
          <div className="transaction-form-container">
            <Form />
          </div>
          <div className="graphs-and-transactions-container">
          <Graphs />
          <Transactions />
          </div>
        </div>




        {/* <div className="">
          <div className="row">
            <div className="col">
              <p className="m-0">Welcome back, {userName}!</p>
            </div>
            <div className="col text-end">
              <p className="m-0">{currentDate}</p>
            </div>
          </div>
        </div>

        <div className="row">
         
          <div className="col-md-4 mx-auto">
            <Form />
          </div>

          
          <div className="col-md-8 mx-auto">
            
            <div className="row mb-3">
              <div className="col-md-12">
                <Graphs />
              </div>
            </div>

           
            <div className="row">
              <div className="col-md-12">
                <Transactions />
              </div>
            </div>
          </div>
        </div> */}

        {/* Additional Content */}
      </div>
    </>
  );
};

export default Overview;
