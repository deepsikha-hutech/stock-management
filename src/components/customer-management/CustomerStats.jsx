import React, { useState } from "react";
import "./customerStats.css";

import {
  UsergroupDeleteOutlined,
  StockOutlined,
  LeftOutlined,
  TeamOutlined,
  FilterOutlined,
  MergeOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";

import CustomerList from "./CustomerList";

function CustomerStats() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [customerData, setCustomerData] = useState([
    {
      id: "MB001",
      name: "Himanshi",
      status: "Active",
      risk: "Balanced",
      portfolioValue: "₹2,94,930",
      sip: "₹2,94,930",
      anchor: "₹2,94,930",
      model: "Balanced",
      thematic: "EV Vehicles",
      lastUpdated: "10.08.2023",
    },
    {
      id: "MB002",
      name: "Angira Banman",
      status: "Active",
      risk: "Conservative",
      portfolioValue: "₹2,94,930",
      sip: "₹2,94,930",
      anchor: "₹2,94,930",
      model: "Balanced",
      thematic: "EV Vehicles",
      lastUpdated: "10.08.2023",
    },
  ]);
  const onSearch = () => {
    const results = customerData.filter(
      (customer) =>
        customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(results);
    if (results.length > 0) {
      alert("Success! ");
    } else {
      alert("No results ");
    }
  };
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    // <div className="right-panel">
    <div className="main-header">
      <h2>
        <LeftOutlined size={5} />
        <TeamOutlined size={2} /> Customer Management
      </h2>
      {/* </div> */}
      <br></br>
      <div className="header">
        <h1>Customer Management</h1>
        <div className="header-actions">
          <button>Import</button>
          <button>Export</button>
        </div>
      </div>
      <br></br>
      <div className="stats-container">
        <div className="stat-item">
          <span className="stat-value">
            <TeamOutlined />
            12
          </span>
          <span className="stat-label">Total Customers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            <StockOutlined />
            ₹2,94,930
          </span>
          <span className="stat-label">Total AUM</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            <FilterOutlined />
            12
          </span>
          <span className="stat-label">SIP Approvals</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            <MoneyCollectOutlined />
            22
          </span>
          <span className="stat-label">Redemption Approvals</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">
            <MergeOutlined />
            28
          </span>
          <span className="stat-label">Advisory Approvals</span>
        </div>
      </div>
      <div>
        <table className="customer-table">
          <div className="customer-table-header">
            <h3>Customer List</h3>
            <input
              className="search-input"
              name="search"
              autoComplete="true"
              placeholder="Search by customer id, name"
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
            />
          </div>
          {/* <CustomerList customers={filteredCustomers} /> */}
          <CustomerList
            customers={
              filteredCustomers.length > 0 ? filteredCustomers : customerData
            }
          />
          {/* <CustomerList /> */}
        </table>
      </div>
    </div>
  );
}

export default CustomerStats;
