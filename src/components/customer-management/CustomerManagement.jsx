// import React from "react";
import React, { useState } from "react";

import "./CustomerManagement.css";
import { useNavigate } from "react-router-dom";
// import Icon from "@ant-design/icons";
import {
  LogoutOutlined,
  FilterOutlined,
  PieChartOutlined,
  SlidersOutlined,
  TeamOutlined,
  ShopOutlined,
  //   LeftOutlined,
} from "@ant-design/icons";

import logo from "../images/logo.svg";
import CustomerStats from "./CustomerStats";

// const LogoutOutlined = React.forwardRef((props, ref) => {
//   // component implementation
// });

function CustomerManagement() {
  // const [loginData, setLoginData] = useState({ email: "", password: "" });

  const [customerData, setCustomerData] = useState(
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
    }
  );

  const navigate = useNavigate();

  const CustomerManagement = () => {};

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="main">
      {/* <div className="main-container"> */}
      <div className="container">
        <div className="sidebar-panel">
          <div className="sidebar-panel-img">
            <img src={logo} alt="Company Logo" className="sidebar-panel" />
          </div>
          <h5>Winsight</h5>
          <ul>
            <TeamOutlined />
            Customer Management<br></br>
            <br></br>
            <SlidersOutlined />
            Stock Listing<br></br>
            <br></br>
            <ShopOutlined />
            Portfolio Management<br></br>
            <br></br>
            <PieChartOutlined />
            Thematic Investments<br></br>
            <br></br>
            <FilterOutlined />
            Filter Management
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            {/* <button className="logout">
              <LogoutOutlined />
              Log Out
            </button> */}
            <button onClick={navigateToLogin} type="submit" className="logout">
              <LogoutOutlined />
              Log Out
            </button>
          </ul>
        </div>
      </div>

      <div className="right-panel">
        {/* <div className="header-1"> */}
        {/* <h2> */}
        {/* <LeftOutlined size={5} /> */}
        {/* <TeamOutlined size={2} /> */}
        {/* Customer Management */}
        {/* </h2> */}
        {/* </div> */}
        <CustomerStats />
        {/* <CustomerList /> */}
      </div>
    </div>
  );
}

export default CustomerManagement;
