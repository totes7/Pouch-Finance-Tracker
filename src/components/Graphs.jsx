import React, { useState } from "react";
import { DoughnutChart } from "./DoughnutChart";
import { PieChart } from "./PieChart";

function Graphs() {
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-dark">Total Income</h5>
            <PieChart />
          </div>
        </div>
      </div>
      <div className="container">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title text-dark">Total Expenses</h5>
            <DoughnutChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Graphs;
