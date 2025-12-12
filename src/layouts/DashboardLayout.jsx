import React from "react";
import { Outlet } from "react-router";
import Sidebar from "../components/Dashboard/Sidebar/Sidebar";
import Topbar from "../components/Topbar";
// import Topbar from "../components/Dashboard/Topbar/Topbar";

export default function DashboardLayout() {
  return (
    <div className="bg-white" style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div style={{ flex: 1 }}>
        <Topbar />
        <main style={{ padding: 16 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
