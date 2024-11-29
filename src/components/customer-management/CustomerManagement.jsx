import React from "react";
import CustomerList from "./CustomerList";

function CustomerManagement() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "aliceblue",
        alignItems: "center",
        // overflow: "auto",
      }}
    >
      <div
        style={{
          margin: "1rem",
          fontSize: "1rem",
          fontWeight: 600,
          tableLayout: "fixed",
          alignItems: "center",
          // overflow: "scroll",
        }}
      >
        <CustomerList />
      </div>
    </div>
  );
}

export default CustomerManagement;
