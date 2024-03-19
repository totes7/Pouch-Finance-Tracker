import React, { useState } from "react";
import { DoughnutChart } from "./DoughnutChart";
import { PieChart, data } from "./PieChart";
import "../assets/styles/Graphs.css";

function Graphs() {
  const pieSum = data.datasets[0].data.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
 
  return (
    <>
      <div className="graphs-container">
        <div className="row row-cols-4">
          <div className="card-container col-6">
            <div className="card pie">
              <div className="card-body">
                <h5 className="card-title pie">Total Income: <span>{pieSum}</span></h5>
                <PieChart />
              </div>
            </div>
          </div>
          <div className="card-container col-6">
              <div className="card doughnut">
                <div className="card-body">
                  <h5 className="card-title doughnut">Total Expenses</h5>
                  <DoughnutChart />
                </div>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Graphs;
