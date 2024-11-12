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

const CustomerList = ({ customers }) => {
  const [customerData, setCustomerData] = useState([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [params, setParams] = useState({ page: 1, limit: 30, search: null });
  const [modalOpenMode, setModalOpenMode] = useState(null);
  const [isEditCustomerModalOpen, setIsEditCustomerModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCustomer, setCurrentCustomer] = useState(null);
  const [editForm] = Form.useForm();
  const [addForm] = Form.useForm();

  const [form] = Form.useForm();
  // const [data, setData] = useState(originData);
  // const [editingKey, setEditingKey] = useState('');

  // useEffect(() => {
  //   const { customerList, totalCustomer } = getCustomerList(params);
  //   setCustomerCount(totalCustomer);
  //   setCustomerData(customerList);
  // }, []);

  useEffect(() => {
    const { customerList, totalCustomer } = getCustomerList(params);
    setCustomerCount(totalCustomer);
    setCustomerData(customerList);
  }, [params]);

  // const handleModeChange = () => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     mode: prevState.mode === "add" ? "edit" : "add",
  //   }));
  // };

  const handleCancel = () => {
    setModalOpenMode(false);
  };

  const showAddCustomerModal = () => {
    setModalOpenMode("add");
  };

  const handleAddCustomerCancel = () => {
    setModalOpenMode(null);
  };

  const handleAddCustomerSubmit = () => {
    addForm
      .validateFields()
      .then((values) => {
        const newCustomer = { ...values, id: `MB00${customerData.length + 1}` };
        setCustomerData([...customerData, newCustomer]);
        setModalOpenMode(false);
        addForm.resetFields();
        alert("customer added");
        message.success("Customer added");
      })
      .catch((error) => {
        message.error("Customer Add fail");
        console.error("Add fail", error);
      });
  };

  const showEditCustomerModal = (customer) => {
    setCurrentCustomer(customer);
    setModalOpenMode("edit");
    // editForm.setFieldsValue(customer);
    // setIsEditCustomerModalOpen(true);
  };

  const handleEditCustomerCancel = () => {
    setCurrentCustomer(null);

    // setIsEditCustomerModalOpen(false);
  };

  const handleEditCustomerSubmit = () => {
    editForm
      .validateFields()
      .then((values) => {
        //
        const updatedData = customerData.map((customer) =>
          customer.id === currentCustomer.id
            ? { ...customer, ...values }
            : customer
        );
        setCustomerData(updatedData);
        setIsEditCustomerModalOpen(false);
        alert("customer updated");
        message.success("Customer updated ");
      })
      .catch((error) => {
        message.error("Customer Update fail.");
        console.error("Update fail", error);
      });
  };

  const handleAddCustomer = (newCustomer) => {
    setCurrentCustomer(null);
    setModalOpenMode(null);
  };

  const handleEditCustomer = (updatedCustomer) => {
    alert("edit");
    // setCustomerData((values) =>
    //   customer.map((customer) =>
    //     customer.id === updatedCustomer.id ? updatedCustomer : customer
    //   )
    // );

    // message.success("Customer updated ");
    // setIsModalOpen(false);
    setCurrentCustomer(null);
    setModalOpenMode(null);
  };

  const handleDeleteCustomer = (id) => {
    setCustomerData((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== id)
    );
    alert("Do u want to delete?");
    message.success("Customer deleted successfully");
  };

  function getCustomerList(params = { page: 1, limit: 10, search: null }) {
    //call get customer API
    const customerList = [
      {
        id: "MB001",
        name: "Himanshi",
        status: "Active",
        risk: "Balanced",
        portfolioValue: "₹2,94,930",
        sip: "₹2,94,930",
        adhoc: "₹2,94,930",
        model: "Balanced",
        thematic: "EV Vehicles",
        lastUpdated: "10.08.2023",
        action: "Edit",
      },
      {
        id: "MB002",
        name: "Angira Banman",
        status: "Active",
        risk: "Conservative",
        portfolioValue: "₹2,94,930",
        sip: "₹2,94,930",
        adhoc: "₹2,94,930",
        model: "Balanced",
        thematic: "EV Vehicles",
        lastUpdated: "10.08.2023",
        action: "Edit",
      },
    ];
    return {
      customerList,
      totalCustomer: 56,
      page: params.page,
      limit: params.limit,
    };
  }

  const onSearch = () => {
    const results = customerData.filter(
      (customer) =>
        customer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCustomers(results);
    if (results.length > 0) {
      alert("Success! ");
    } else {
      alert("No results ");
    }
  };

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

        return <Tag color={color}>{risk ? risk.toUpperCase() : "UNKNOWN"}</Tag>;
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
      title: "Adhoc Inv",
      key: "adhoc",
      dataIndex: "adhoc",
    },
    {
      title: "Model Portfolio",
      key: "model",
      dataIndex: "model",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Thematic Inv",
      key: "thematic",
      dataIndex: "thematic",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Last Updated",
      key: "lastUpdated",
      dataIndex: "lastUpdated",
    },
    {
      title: "Action",
      key: "action",
      dataIndex: "action",

      render: (_, customerData) => (
        <>
          <EditOutlined onClick={() => showEditCustomerModal(customerData)} />

          <DeleteOutlined
            onClick={() => handleDeleteCustomer(customerData.id)}
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
