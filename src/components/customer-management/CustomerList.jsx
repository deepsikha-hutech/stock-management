import React, { useState } from "react";
import { Space, Table, Tag, Switch } from "antd";

const CustomerList = ({ customers }) => {
  const [customerData, setCustomerData] = useState(customers);

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status, customerData) => (
        <Space direction="vertical">
          <Switch
            checkedChildren="Active"
            unCheckedChildren="Inactive"
            checked={status === "Active"}
            onClick={() => handleStatusToggle(customerData.id)}
          />
        </Space>
      ),
    },
    {
      title: "Risk Profile",
      key: "risk",
      dataIndex: "risk",
      render: (risk) => {
        let color = "green";
        if (risk === "Conservative") color = "orange";
        else if (risk === "Aggressive") color = "red";
        else if (risk === "Balanced") color = "blue";

        return <Tag color={color}>{risk.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Portfolio Value",
      key: "portfolioValue",
      dataIndex: "portfolioValue",
    },
    {
      title: "SIP Amount",
      key: "sip",
      dataIndex: "sip",
    },
    {
      title: "Anchor Inv",
      key: "anchor",
      dataIndex: "anchor",
    },
    {
      title: "Model Portfolio",
      key: "model",
      dataIndex: "model",
    },
    {
      title: "Thematic Inv",
      key: "thematic",
      dataIndex: "thematic",
    },
    {
      title: "Last Updated",
      key: "lastUpdated",
      dataIndex: "lastUpdated",
    },
  ];

  const handleStatusToggle = (id) => {
    setCustomerData((prevCustomers) =>
      prevCustomers.map((customer) => {
        if (customer.id === id) {
          const newStatus =
            customer.status === "Active" ? "Inactive" : "Active";
          alert(` ${newStatus}`);
          return { ...customer, status: newStatus };
        }
        return customer;
      })
    );
  };

  return <Table columns={columns} dataSource={customerData} rowKey="id" />;
};

export default CustomerList;
