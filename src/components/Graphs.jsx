import React, { useState } from "react";
import { DoughnutChart } from "./DoughnutChart";
import { PieChart} from "./PieChart";
import "../assets/styles/Graphs.css";

function Graphs() {
 
  return (
    <>
      <div className="graphs-wrapper">
        <div className="graphs-content">
          <div className="pie-chart-wrapper">
            <PieChart />
          </div>
          <div className="doughnut-chart-wrapper">
            <DoughnutChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default Graphs;
