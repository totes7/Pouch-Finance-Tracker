import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DoughnutChart from "./DoughnutChart";
// import { PieChart } from "./PieChart";


ChartJS.register(ArcElement, Tooltip, Legend);



function Graphs() {
    <>
    <div className="container">
      <div className="card-medium">
        <div className="card-body">
          <DoughnutChart />
        </div>
        <h5 className="card-title text-dark">Total Income</h5>
      </div>
    </div>
    </>
}

export default Graphs;