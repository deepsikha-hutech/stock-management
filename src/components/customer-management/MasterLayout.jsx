import React from "react";
import { Outlet } from "react-router-dom";
import LeftSider from "../common/LeftSider";

function MasterLayout() {
  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <LeftSider />
      <Outlet />
    </div>
  );
}

export default MasterLayout;
