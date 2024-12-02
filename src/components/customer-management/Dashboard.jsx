// import React from "react";
import React, { useState } from "react";

import "./CustomerManagement.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button } from "antd";

// import { useMediaQuery } from "react-responsive";
// import Icon from "@ant-design/icons";
import { TeamOutlined, LeftOutlined } from "@ant-design/icons";

import logo from "../images/logo.svg";
import CustomerStats from "./CustomerStats";
import CustomerList from "./CustomerList";
import LeftSider from "../common/LeftSider";

function CustomerManagement() {
  const { Sider } = Layout;

  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="main"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundSize: "cover",
        height: "100vh",
        width: "100vw",
        // overflow: "hidden",
      }}
    >
      <div
        className="main-header"
        style={{
          // position: "fixed",
          overflow: "auto",
          overflowX: "hidden",
          // overflowY: "hidden",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          margin: "20px",
          border: "1px solid lightGray",
          borderRadius: "10px",
          background: " #f7f7f7",
          // width: "100vw",
        }}
      >
        <div
          style={{
            padding: "1rem",
            borderBottom: "1px solid lightgray",
            width: "100%",

            // overflow: "hidden",
          }}
        >
          <h2>
            <LeftOutlined size={5} />
            <TeamOutlined size={2} /> Customer Management
          </h2>
        </div>
        <br></br>
        <div className="header">
          <h1>Customer Management</h1>
          <div className="header-actions">
            <button>Import</button>
            <button>Export</button>
          </div>
        </div>
        <div />
        <div className="right-panel">
          <CustomerStats />
        </div>
        <div className="customer-table">
          <CustomerList />
        </div>
      </div>
    </div>
  );
}

export default CustomerManagement;
