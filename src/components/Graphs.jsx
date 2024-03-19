import React, { useState } from "react";
import { DoughnutChart } from "./DoughnutChart";
import { PieChart } from "./PieChart";
import "../assets/styles/Graphs.css";

function Graphs() {
  return (
    <>
      <div className="graphs-container">
        <div className="row row-cols-4">
          <div className="card-container col-5">
            <div className="card pie">
              <div className="card-body">
                <h5 className="card-title pie">Total Income</h5>
                <PieChart />
              </div>
            </div>
            <div className="card-container col">
              <div className="card doughnut">
                <div className="card-body">
                  <h5 className="card-title doughnut">Total Expenses</h5>
                  <DoughnutChart />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Graphs;
