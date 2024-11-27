import React from "react";
import CustomerList from "./CustomerList";

function CustomerManagement() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ margin: "2rem", fontSize: "2rem", fontWeight: 600 }}>
        <CustomerList />
      </div>
    </div>
  );
}

export default CustomerManagement;
