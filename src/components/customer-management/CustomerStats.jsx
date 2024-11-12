import React, { useState, useEffect } from "react";
import "./customerStats.css";

import {
  StockOutlined,
  LeftOutlined,
  TeamOutlined,
  FilterOutlined,
  MergeOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";

import CustomerList from "./CustomerList";
// import Search from "antd/es/transfer/search";

function CustomerStats() {
  const [customerStats, setCustomerStats] = useState({
    totalCustomers: 0,
    totalAUM: 0,
    sipApprovals: 0,
    redemptionApprovals: 0,
    advisoryApprovals: 0,
  });

  function getCustomerStats() {
    //call get customer API
    const customerStats = {
      totalCustomers: 78,

      totalAUM: 50,
      sipApprovals: 68,
      redemptionApprovals: 53,
      advisoryApprovals: 543,
    };
    return {
      customerStats,
    };
  }

  useEffect(() => {
    const { customerStats } = getCustomerStats();
    setCustomerStats(customerStats);
  }, []);

  return (
    <div
      style={{
        border: "1px solid lightgrey",
        borderRadius: "1rem",
        height: "8rem",
        backgroundColor: "white",
        display: "flex",
        alignItems: "center",
        margin: "20px",
        // justifyContent: "space-evenly",
      }}
    >
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-value">
            <TeamOutlined />
            {customerStats.totalCustomers}
          </span>
          <span className="stat-label">Total Customers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            <StockOutlined />
            {customerStats.totalAUM}
          </span>
          <span className="stat-label">Total AUM</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            <FilterOutlined />

            {customerStats.sipApprovals}
          </span>
          <span className="stat-label">SIP Approvals</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            <MoneyCollectOutlined />
            {customerStats.redemptionApprovals}
          </span>
          <span className="stat-label">Redemption Approvals</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            <MergeOutlined />
            {customerStats.advisoryApprovals}
          </span>
          <span className="stat-label">Advisory Approvals</span>
        </div>
      </div>
    </div>
  );
}

export default CustomerStats;
