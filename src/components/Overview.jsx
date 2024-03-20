import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "./Form";
import MiniTransactions from "./MiniTransactions";
import Graphs from "./Graphs";
import "../assets/styles/Overview.css";
import useFetchName from "../utils/fetchName";
import { auth } from "../utils/firebaseConfig";

const Overview = () => {
  const [loading, setLoading] = useState(true);
  const { fullName } = useFetchName(auth.currentUser.uid);

  useEffect(() => {
    setLoading(false);
  }, []);

  const currentDate = dayjs().format("ddd D MMMM, YYYY");

  return (
    <div className="overview-wrapper">
      <div className="overview-content">
        <div className="welcome-wrapper">
          {loading ? (
            <h1>Loading...</h1>
          ) : (
            <>
              <h1>Welcome back, {fullName && fullName.split(' ')[0]}!</h1>
              <h1 className="overview-date">{currentDate}</h1>
            </>
          )}
        </div>
        <div className="components-wrapper">
          <div className="form-wrapper">
            <Form />
          </div>
          <div className="graphs-wrapper">
            <h1>Graphs</h1>
            <Graphs />
            <h1>Transactions</h1>
            <MiniTransactions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
