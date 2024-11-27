import React, { Fragment, useEffect, useState } from "react";
import {
  Space,
  Table,
  Tag,
  Switch,
  Input,
  Modal,
  Button,
  Form,
  InputNumber,
  DatePicker,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddEditCustomer from "./AddEditCustomer";
import variable from "../../assets/variables";
import axios from "axios";
import Cookie from "js-cookies";

const CustomerList = ({ customers }) => {
  const [customerData, setCustomerData] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [params, setParams] = useState({ page: 1, limit: 10, search: null });

  const [modalOpenMode, setModalOpenMode] = useState(null);
  const [currentCustomer, setCurrentCustomer] = useState(null);

  const handleCancel = () => {
    setModalOpenMode(false);
  };

  const showAddCustomerModal = () => {
    setModalOpenMode("add");
  };

  const showEditCustomerModal = (customer) => {
    setCurrentCustomer(customer);
    setModalOpenMode("edit");
    // editForm.setFieldsValue(customer);
    // setIsEditCustomerModalOpen(true);
  };

  const handleAddCustomer = () => {
    setCurrentCustomer(null);
    setModalOpenMode(null);
  };

  const handleEditCustomer = () => {
    alert("edit");

    setCurrentCustomer(null);
    setModalOpenMode(null);
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const token = Cookie.getItem("accessToken");
      const { data } = await axios.delete(
        `${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/stock/${id}`,
        { headers: { Authorization: token } }
      );
      if (data?.stockinfo?._id) {
        if (customerCount - 1 == (params?.page - 1) * params?.limit) {
          setParams({ ...params, page: params.page - 1 });
        } else getStock();
      } else {
        alert("failed to delete");
      }
    } catch (error) {
      console.error(error);
      alert("something went wrong");
    }
  };

  useEffect(() => {
    getStock();
  }, [params]);

  async function getStock() {
    try {
      const token = Cookie.getItem("accessToken");
      // alert("token");

      const { data } = await axios.get(
        `${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/stock`,
        { params, headers: { Authorization: token } }
      );
      setCustomerData(data?.stocks);
      setCustomerCount(data?.totalCount);
    } catch (error) {
      console.log(error);
      alert("something went wrong");
    }
  }

  const handleSearchChange = (e) => {
    setParams({ ...params, search: e.target.value });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const columns = [
    {
      title: "Customer ID",
      dataIndex: "customerid",
      key: "customerid",
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
      key: "riskprofile",
      dataIndex: "riskprofile",
      render: (risk) => {
        let color = "green";
        if (risk === "Conservative") color = "orange";
        else if (risk === "Aggressive") color = "red";
        else if (risk === "Balanced") color = "blue";

        return <Tag color={color}>{risk ? risk.toUpperCase() : "UNKNOWN"}</Tag>;
      },
    },
    {
      title: "Portfolio Value",
      key: "portfoliovalue",
      dataIndex: "portfoliovalue",
    },
    {
      title: "SIP Amount",
      key: "sipamount",
      dataIndex: "sipamount",
    },
    {
      title: "Adhoc Inv",
      key: "adhocinv",
      dataIndex: "adhocinv",
    },
    {
      title: "Model Portfolio",
      key: "modelportfolio",
      dataIndex: "modelportfolio",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thematic Inv",
      key: "thematicinv",
      dataIndex: "thematicinv",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Updated",
      key: "lastupdated",
      dataIndex: "lastupdated",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",

      render: (_, customerData) => (
        <>
          <EditOutlined onClick={() => showEditCustomerModal(customerData)} />

          <DeleteOutlined
            onClick={() => handleDeleteCustomer(customerData._id)}
          />
        </>
      ),
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

  return (
    <Fragment className="table">
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid lightgrey",
          borderRadius: "30px",
          // padding: "2rem",
          display: "row",
        }}
      >
        <div
          style={{
            margin: "1rem",
            display: "flex",
            justifyContent: "space-between",
          }}
          className="customer-table-header"
        >
          <h3>Customer List</h3>
          <Input
            className="search-input"
            name="search"
            autoComplete="true"
            placeholder="Search by customer id, name"
            type="text"
            value={params.search}
            onChange={handleSearchChange}
            onKeyPress={handleKeyPress}
          />
        </div>

        <div
          style={{
            marginRight: "20px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" onClick={showAddCustomerModal}>
            Add Customer
          </Button>

          <Modal
            title={
              modalOpenMode == "edit"
                ? `Editcustomer: ${currentCustomer?.name}`
                : "Add Customer"
            }
            open={modalOpenMode}
            onCancel={handleCancel}
            footer={[null]}
          >
            {/* edit */}
            <AddEditCustomer
              mode={modalOpenMode}
              customer={modalOpenMode == "edit" ? currentCustomer : {}}
              onAddCustomerSuccess={handleAddCustomer}
              onEditCustomerSuccess={handleEditCustomer}
              onDeleteCustomerSuccess={handleDeleteCustomer}
            />
          </Modal>
        </div>

        <Table
          columns={columns}
          dataSource={customerData}
          pagination={{
            total: customerCount,

            onChange: (page, limit) => {
              alert(page + "  " + limit);
              setParams({ ...params, page, limit });
            },

            pageSize: params.limit,
            pageSizeOptions: [1, 10, 20, 30],
          }}
          style={{
            width: "100%",
            overflowX: "auto",
          }}
        />
      </div>
    </Fragment>
  );
};

export default CustomerList;
