import React from "react";
import { Row, Col } from "antd";
import CustomerList from "./CustomerList";

function CustomerManagement() {
  return (
    <div
      style={{
        backgroundColor: "aliceblue",
        padding: "1rem",
        minHeight: "100vh",
        flexDirection: "row",
      }}
    >
      <Row
        justify="center"
        alignItems="center"
        style={{
          minHeight: "100%",
        }}
      >
        <Col xs={24} sm={24} md={24} lg={24} xl={24}>
          <div
            style={{
              fontSize: "1rem",
              fontWeight: 600,
              tableLayout: "fixed",
              textAlign: "center",
              overflow: "auto",
              backgroundColor: "aliceblue",
              padding: "1rem",
              borderRadius: "8px",
            }}
          >
            <CustomerList />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default CustomerManagement;
