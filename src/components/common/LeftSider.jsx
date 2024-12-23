import React, { useState } from "react";
import { Layout, Menu, Button } from "antd";
import { useNavigate, useLocation, Link } from "react-router-dom";

import logo from "../images/logo.svg";
import {
  LogoutOutlined,
  FilterOutlined,
  PieChartOutlined,
  SlidersOutlined,
  TeamOutlined,
  ShopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

function LeftSider() {
  const [collapsed, setCollapsed] = useState(false);
  const { Sider } = Layout;

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  const location = useLocation();
  const currentKey =
    {
      "/dashboard": "1",
      "/customer-management": "2",
      "/stock-outlisting": "3",
      "/portfolio-management": "4",
      "/thematic-investment": "5",
      "/filter-management": "6",
    }[location.pathname] || "1";

  return (
    <Layout style={{ display: "flex", flexDirection: "row" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        breakpoint="lg"
        collapsedWidth={collapsed ? 0 : 80}
        width={220}
        style={{
          backgroundColor: "aliceblue",
          boxShadow: "none",
          border: "none",
        }}
      >
        <div className="sidebar-panel">
          <div className="sidebar-panel-img" style={{ textAlign: "center" }}>
            <img src={logo} alt="Company Logo" style={{ width: "10%" }} />
            {!collapsed && <h5 style={{ margin: "10px 0" }}>Winsight</h5>}
          </div>
          <br></br>

          <Menu
            selectedKeys={[currentKey]}
            mode="inline"
            style={{ borderRight: "none" }}
          >
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to="/dashboard">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<TeamOutlined />}>
              <Link to="/customer-management">Customer Management</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<SlidersOutlined />}>
              <Link to="/stock-outlisting">Stock Outlisting</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<ShopOutlined />}>
              <Link to="/portfolio-management">Portfolio Management</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<PieChartOutlined />}>
              <Link to="/thematic-investment">Thematic Investments</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<FilterOutlined />}>
              <Link to="/filter-management">Filter Management</Link>
            </Menu.Item>
          </Menu>

          <div
            style={{
              bottom: 20,
              left: 0,
              width: "100%",
              textAlign: "center",
              display: "flex",
              justifyContent: "left",
              paddingLeft: "15px",
              paddingTop: "90px",
            }}
          >
            <Button
              onClick={navigateToLogin}
              type="text"
              className="logout-button"
              icon={<LogoutOutlined />}
            >
              {collapsed ? null : "Log Out"}
            </Button>
          </div>
        </div>
      </Sider>

      <Button
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
    </Layout>
  );
}

export default LeftSider;
