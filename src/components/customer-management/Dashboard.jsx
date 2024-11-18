// import React from "react";
import React, { useState } from "react";

import "./CustomerManagement.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button } from "antd";

// import { useMediaQuery } from "react-responsive";
// import Icon from "@ant-design/icons";
import {
  LogoutOutlined,
  FilterOutlined,
  PieChartOutlined,
  SlidersOutlined,
  TeamOutlined,
  ShopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LeftOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

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
    <div className="main">
      <div className="main-header" style={{ overflow: "scroll" }}>
        <div
          style={{
            padding: "1rem",
            borderBottom: "1px solid lightgray",
            width: "100%",
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
          <div className="customer-table">
            <CustomerList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerManagement;
