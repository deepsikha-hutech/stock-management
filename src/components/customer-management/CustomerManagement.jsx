// import React from "react";
import React, { useState } from "react";

import "./CustomerManagement.css";
import { useNavigate } from "react-router-dom";
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

  //   LeftOutlined,
} from "@ant-design/icons";

import logo from "../images/logo.svg";
import CustomerStats from "./CustomerStats";

function CustomerManagement() {
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
  const { Sider } = Layout;

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
      {/* <div className="main-container"> */}

      <div className="container">
        <Layout>
          <Sider
            width={230}
            // height={100}
            collapsible
            collapsed={collapsed}
            onCollapse={toggleSidebar}
            breakpoint="xs"
            collapsedWidth="0"
            style={{
              backgroundColor: "aliceblue",
              boxShadow: "none",
              border: "none",
              overflow: "hidden",
            }}
          >
            {/*
          //   breakpoint="xs"
          //   collapsedWidth="0"
          //   // collapsedHeight="0"
          //   collapsible
          //   collapsed={collapsed}
          //   onBreakpoint={(broken) => setCollapsed(broken)}
          //   onCollapse={(collapse) => setCollapsed(collapse)}
          // > */}
            <div className="sidebar-panel">
              <div className="sidebar-panel-img">
                <img src={logo} alt="Company Logo" className="container" />
                {!collapsed && <h5>Winsight</h5>}
              </div>

              {/* <h5>Winsight</h5> */}

              <Menu>
                <Menu.Item key="1" icon={<TeamOutlined />}>
                  Customer Management
                </Menu.Item>

                <Menu.Item key="2" icon={<SlidersOutlined />}>
                  Stock Outlisting
                </Menu.Item>

                <Menu.Item key="3" icon={<ShopOutlined />}>
                  Portfolio Management
                </Menu.Item>

                <Menu.Item key="4" icon={<PieChartOutlined />}>
                  Thematic Investments
                </Menu.Item>

                <Menu.Item key="5" icon={<FilterOutlined />}>
                  Filter Management
                </Menu.Item>
              </Menu>
            </div>

            <Button
              onClick={navigateToLogin}
              type="text"
              className="logout-button"
              icon={<LogoutOutlined />}
            >
              {collapsed ? null : "Log Out"}
            </Button>

            <Button
              // type="primary"
              onClick={toggleSidebar}
              className="toggle-btn"
              style={{
                position: "fixed",
                top: 20,
                left: collapsed ? 20 : 200,
                zIndex: 1,
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Sider>
        </Layout>
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
