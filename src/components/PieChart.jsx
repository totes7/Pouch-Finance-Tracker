import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"; // Importing necessary Chart.js elements
import { useFetchTransactionData } from "../utils/fetchTransactionData";

ChartJS.register(ArcElement, Tooltip, Legend); // Registering the Chart.js elements

export function PieChart() {
  const { transactionData, loading } = useFetchTransactionData();
  const [totalSavingsIncome, setTotalSavingsIncome] = useState(0);

  useEffect(() => {
    // Calculate total savings and income
    const savingsIncome = transactionData
      .filter((transaction) => transaction.type === "Savings" || transaction.type === "Income")
      .reduce((total, transaction) => total + transaction.amount, 0);
    setTotalSavingsIncome(savingsIncome);
       // Store totalExpenses in localStorage
       localStorage.setItem("totalSavingsIncome", JSON.stringify(savingsIncome));
  }, [transactionData]);

  // Calculate savings and income amounts
  const savingsAmount = transactionData
    .filter((transaction) => transaction.type === "Savings")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const incomeAmount = transactionData
    .filter((transaction) => transaction.type === "Income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  // Define chart data
  const chartData = {
    labels: ["Savings", "Income"],
    datasets: [
      {
        label: "£",
        data: [savingsAmount, incomeAmount],
        backgroundColor: ["rgba(70, 174, 134)", "rgba(191, 204, 202)"],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          boxWidth: 10,
        },
      },
    },
  };

  return (
    <>
      <div className="total-savings-income">Total Savings and Income: £{totalSavingsIncome}</div>
      <div className="pie canvas-container">
        {loading ? (
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        ) : (
          <Pie options={options} data={chartData} width={200} height={200} />
        )}
      </div>
    </>
  );
}
