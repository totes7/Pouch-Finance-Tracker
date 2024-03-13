import React, { useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);



function Graphs({chartData}) {
  return ( <Doughnut data={chartData}/>
    // <>
    // <div className="container">
    //   <div className="card-medium">
    //     <div className="card-body">


    //     </div>
    //     <h5 className="card-title">Total Income</h5>
    //   </div>
    // </div>
    // </>
  )
}

export default Graphs