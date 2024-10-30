// App.js
import React from "react";
import "./customerList.css";
import logo from "../images/logo.svg";

const customers = [
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
];

function CustomerList() {
  return (
    <div className="main">
      <div className="sidebar-panel">
        <div className="sidebar-panel-img">
          <img src={logo} alt="Company Logo" className="sidebar-panel" />
        </div>
        <h5>Winsight</h5>
        <ul>
          <li>Customer Management</li>
          <li>Stock Listing</li>
          <li>Portfolio Management</li>
          <li>Thematic Investments</li>
          <li>Filter Management</li>

          <br></br>
          <br></br>
          <th>Log Out</th>
        </ul>
      </div>

      <div className="customer-management-panel">
        <header>
          <h2>Customer Management</h2> <br></br>
          {/* <div className="actions"> */}
          <div className="import-button">
            <button>Import</button>
          </div>
          <div className="export-button"></div>
          <button>Export</button>
          {/* </div> */}
        </header>
        <div className="stats">
          <div>Total Customers: 12</div>
          <div>Total AUM: ₹2,94,930</div>
          <div>SIP Approvals: 12</div>
          <div>Redemption Approvals: 22</div>
          <div>Active Approvals: 28</div>
        </div>
        {/* <table className="customer-table">
          <thead>
            <tr>
              <th>Customer ID</th>
              <th>Name</th>
              <th>Status</th>
              <th>Risk Profile</th>
              <th>Portfolio Value</th>
              <th>SIP Amount</th>
              <th>Anchor Inv</th>
              <th>Model Portfolio</th>
              <th>Thematic Inc</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.id}</td>
                <td>{customer.name}</td>
                <td>
                  <span className={`status ${customer.status.toLowerCase()}`}>
                    {customer.status}
                  </span>
                </td>
                <td>{customer.risk}</td>
                <td>{customer.portfolioValue}</td>
                <td>{customer.sip}</td>
                <td>{customer.anchor}</td>
                <td>{customer.model}</td>
                <td>{customer.thematic}</td>
                <td>{customer.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </table> */}
      </div>
    </div>
  );
}

export default CustomerList;
