import React from "react";
import { Outlet } from "react-router-dom";
import LeftSider from "../common/LeftSider";

function MasterLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        backgroundSize: "flex",
        width: "100%",
        height: "100%",
      }}
    >
      <LeftSider />
      <Outlet />
    </div>
  );
}

export default MasterLayout;
