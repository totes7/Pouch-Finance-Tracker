import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Importing necessary Chart.js elements
import { useFetchTransactionData } from "../utils/fetchTransactionData";

ChartJS.register(ArcElement, Tooltip, Legend); // Registering the Chart.js elements

export function DoughnutChart() {
  const { transactionData, loading } = useFetchTransactionData();
  const [totalExpenses, setTotalExpenses] = useState(0);

  useEffect(() => {
    // Calculate total expenses
    const expenses = transactionData
      .filter((transaction) => transaction.type !== "Income" && transaction.type !== "Savings")
      .reduce((total, transaction) => total + transaction.amount, 0);
    setTotalExpenses(expenses);
  }, [transactionData]);

  const aggregateAmountsByType = () => {
    const amountsByType = {};
    transactionData
      .filter((transaction) => transaction.type !== "Income" && transaction.type !== "Savings")
      .forEach((transaction) => {
        const type = transaction.type;
        const amount = transaction.amount;
        if (type in amountsByType) {
          amountsByType[type] += amount;
        } else {
          amountsByType[type] = amount;
        }
      });
    return amountsByType;
  };

  const amountsByType = aggregateAmountsByType();

  const chartData = {
    labels: Object.keys(amountsByType),
    datasets: [
      {
        label: "£",
        data: Object.values(amountsByType),
        backgroundColor: [
          "rgba(255, 95, 95)",
          "rgba(246, 200, 99)",
          "rgba(105, 176, 238)",
          "rgba(219, 216, 221)",
          "rgba(137, 209, 170)",
        ],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 14,
          boxHeight: 14,
          font: {
            size: 14
          }
        },
      }
    }
  };

  return (
    <>
      <div className="chart-item-wrapper">
  
        <div className="total-wrapper">
          <h6 className="chart-total-title">Total Expenses:</h6>
          <h6 >£{totalExpenses.toFixed(2)}</h6>
        </div>
        <div className="doughnut canvas-container">
          {loading ? (
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            ) : transactionData.length > 0 ? (
              <Doughnut options={options} data={chartData} width={200} height={200} />
            ) : (
              <p className="no-data">No data at the moment</p>
            )}
        </div>
      </div>
    </>
  );
}
