import React, { Fragment, useEffect, useState, useCallback } from "react";
import { Space, Table, Tag, Switch, Input, Modal, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import AddEditCustomer from "./AddEditCustomer";
import variable from "../../assets/variables";
import axios from "axios";
import Cookie from "js-cookies";
import _, { delay } from "lodash";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";

const CustomerList = ({ customers }) => {
  const [customerData, setCustomerData] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [params, setParams] = useState({ page: 1, limit: 10, search: null });
  const navigate = useNavigate();
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
    setCurrentCustomer(null);
    setModalOpenMode(null);
    getStock(params);
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
        } else getStock(params);
      } else {
        alert("failed to delete");
      }
    } catch (error) {
      console.error(error);
      alert("something went wrong");
    }
  };

  async function getStock(params) {
    try {
      const token = Cookie.getItem("accessToken");
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

  useEffect(() => {
    if (!Cookie.getItem("accessToken")) navigate("/");
  }, []);

  const debouncedHandleSearch = useCallback(debounce(getStock, 400), []);

  useEffect(() => {
    debouncedHandleSearch(params);
  }, [params]);

  const handleSearchChange = (e) => {
    setParams({ ...params, search: e.target.value });
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
            checked={status}
            onClick={() =>
              handleStatusToggle(
                customerData._id,
                status ? "inactive" : "active"
              )
            }
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

  const handleStatusToggle = async (id, status) => {
    try {
      const token = Cookie.getItem("accessToken");

      const { data } = await axios.put(
        `${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/stock/${id}/${status}`,
        id,
        { headers: { Authorization: token } }
      );

      if (data?.stockinfo?._id) {
        debouncedHandleSearch(params);
      } else {
        alert("Failed to update status");
      }
    } catch (error) {
      console.error(error);
      alert("something went wrong");
    }
  };

  return (
    <Fragment className="table">
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid lightgrey",
          borderRadius: "30px",
          display: "flex",
          flexDirection: "column",
          // overflow: "scroll",
        }}
      >
        <div
          style={{
            margin: "1rem",
            font: "1rem",
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

        <div style={{ display: "flex", flexDirection: "row" }}>
          <Table
            columns={columns}
            dataSource={customerData}
            pagination={{
              total: customerCount,
              onChange: (page, limit) => {
                setParams({ ...params, page, limit });
              },

              pageSize: params.limit,
              pageSizeOptions: [10, 20, 30],
              showSizeChanger: true,
            }}
            style={{
              width: "100%",
              overflow: "auto",
              // tableLayout: "fixed",
            }}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default CustomerList;
