import React, { useState } from "react";
import "./CustomerManagement.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Layout, Menu, Button, Modal, Upload, message } from "antd";
import {
  TeamOutlined,
  LeftOutlined,
  UploadOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import logo from "../images/logo.svg";
import CustomerStats from "./CustomerStats";
import CustomerList from "./CustomerList";
import LeftSider from "../common/LeftSider";
import Cookie from "js-cookies";
import variable from "../../assets/variables";
import axios from "axios";
function CustomerManagement() {
  const { Sider } = Layout;

  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const navigate = useNavigate();

  const navigateToLogin = () => {
    navigate("/login");
  };

  // const handleImport = async () => {
  //   try {
  //     const fileInput = document.createElement("input");
  //     fileInput.type = "file";
  //     fileInput.accept = ".csv";
  //     fileInput.style.display = "none";

  //     fileInput.onchange = async (event) => {
  //       const selectedFile = event.target.files[0];

  //       if (!selectedFile) {
  //         alert("No file selected!");
  //         return;
  //       }

  //       const token = Cookie.getItem("accessToken");
  //       const formData = new FormData();
  //       formData.append("data", selectedFile);

  //       const response = await axios.post(
  //         `${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/stock/import`,
  //         formData,
  //         {
  //           headers: {
  //             Authorization: { token },
  //           },
  //         }
  //       );

  //       if (response.status === 200) {
  //         alert("File imported successfully!");
  //       } else {
  //         throw new Error(response.data.message || "Import failed.");
  //       }
  //     };

  //     fileInput.click();
  //   } catch (error) {
  //     console.error("Import Error:", error);
  //     alert("Failed to import the file");
  //   }
  // };

  const handleImport = {
    name: "data",
    action: `${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/stock/import`,
    headers: {
      Authorization: Cookie.getItem("accessToken") || "",
    },
    beforeUpload: (file) => {
      const isCSV = file.type === "text/csv";
      if (!isCSV) {
        message.error(`${file.name} is not a CSV file.`);
      }
      return isCSV;
    },
    onChange(info) {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handleExport = async () => {
    try {
      const token = Cookie.getItem("accessToken");

      const response = await axios.get(
        `${variable?.STOCK_MANAGEMENT_API_URL}/api/v1/stock/export`,
        {
          headers: {
            Authorization: { token },
          },
          responseType: "text",
        }
      );

      if (response.status !== 200) {
        throw new Error("Failed to export data");
      }

      const dataUrl = "http://localhost:3000/api/v1/stock/export";

      window.location.href = dataUrl;
    } catch (error) {
      console.error("Export failed:", error);
      alert("Something went wrong while exporting data.");
    }
  };

  return (
    <div
      className="main"
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundSize: "cover",
        height: "100vh",
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
        }}
      >
        <div
          style={{
            padding: "0.5rem",
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
            <Button
              type="primary"
              icon={<UploadOutlined />}
              onClick={showModal}
            >
              Import
            </Button>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              onClick={handleExport}
            >
              Export
            </Button>
          </div>
        </div>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>Import File from local machine</p>
          <Upload {...handleImport}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Modal>
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
