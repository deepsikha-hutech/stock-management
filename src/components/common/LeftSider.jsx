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
  LeftOutlined,
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
    <Layout>
      <Sider
        activeKey="1"
        width={230}
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
        <div className="sidebar-panel">
          <div className="sidebar-panel-img">
            <img src={logo} alt="Company Logo" className="container" />
            {!collapsed && <h5>Winsight</h5>}
          </div>

          <Menu selectedKeys={[currentKey]}>
            <Menu.Item key="1" icon={<DashboardOutlined />}>
              <Link to={"/dashboard"} state={{ ok: "ijijojolk" }}>
                Dashboard
              </Link>
            </Menu.Item>

            <Menu.Item key="2" icon={<TeamOutlined />}>
              <Link to={"/customer-management"}>Customer Management</Link>
            </Menu.Item>

            <Menu.Item key="3" icon={<SlidersOutlined />}>
              <Link to={"/stock-outlisting"}>Stock Outlisting</Link>
            </Menu.Item>

            <Menu.Item key="4" icon={<ShopOutlined />}>
              <Link to={"/portfolio-management"}>Portfolio Management</Link>
            </Menu.Item>

            <Menu.Item key="5" icon={<PieChartOutlined />}>
              <Link to={"/thematic-investment"}>Thematic Investments</Link>
            </Menu.Item>

            <Menu.Item key="6" icon={<FilterOutlined />}>
              <Link to={"/filter-management"}>Filter Management</Link>
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
  );
}

export default LeftSider;
