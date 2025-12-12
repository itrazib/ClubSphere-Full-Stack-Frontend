import React, { useState, useEffect } from "react";
import { Link } from "react-router";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import SellerMenu from "./Menu/ClubManagerItem";
import CustomerMenu from "./Menu/MemberMenu";
import useRole from "../../../hooks/useRole";
import useAuth from "../../../hooks/useAuth";
import { FcStatistics } from "react-icons/fc";
import { CgProfile } from "react-icons/cg";

/*
  This Sidebar provides:
  - fixed sidebar on desktop (visible)
  - slide-in sidebar on mobile (toggle with hamburger)
  - overlay to click outside and close
  - minimal inline styles (JSX-only)
*/

export default function Sidebar() {
  const [open, setOpen] = useState(false); // mobile open state
  const [role, isRoleLoading] = useRole();
  const { logOut } = useAuth();

  // close mobile menu on viewport resize >= 768
  useEffect(() => {
    function onResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (isRoleLoading) return null;

  // basic sizes: sidebarWidth same used in layout/topbar spacing
  const sidebarWidth = 260;

  return (
    <>
      {/* Desktop fixed sidebar */}
      <aside
        style={{
          width: sidebarWidth,
          minWidth: sidebarWidth,
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          padding: 20,
          background: "#ffffff",
          boxShadow: "2px 0 6px rgba(0,0,0,0.06)",
          display: window.innerWidth >= 768 ? "block" : "none",
          zIndex: 20
        }}
      >
        <div style={{ marginBottom: 22 }}>
          <Link to="/" style={{ textDecoration: "none", color: "#6b21a8", fontWeight: 700, fontSize: 20 }}>
            ClubSphere
          </Link>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <MenuItem label="Statistics" icon={FcStatistics} address="/dashboard" />
          {role === "member" && <CustomerMenu />}
          {role === "clubManager" && <SellerMenu />}
          {role === "admin" && <AdminMenu />}
        </nav>

        <div style={{ marginTop: "auto" }}>
          <MenuItem label="Profile" icon={CgProfile} address="/dashboard/profile" />
          <button
            onClick={logOut}
             className="btn-club"
            style={{
              width: "100%",
              marginTop: 12,
              padding: "10px 12px",
             
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile: Topbar + Hamburger integrated into Topbar (we will render a simplified top header here) */}
      <div
        style={{
          display: window.innerWidth < 768 ? "flex" : "none",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 56,
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 12px",
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
          zIndex: 40
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
           
            style={{
              width: 40,
              height: 40,
              borderRadius: 8,
              border: "none",
              background: "#f3f3f3",
              cursor: "pointer"
            }}
          >
            ☰
          </button>
          <Link to="/" style={{ textDecoration: "none", color: "#6b21a8", fontWeight: 700 }}>
            ClubSphere
          </Link>
        </div>

        <div />
      </div>

      {/* Mobile sliding sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: open ? 0 : -sidebarWidth,
          width: sidebarWidth,
          height: "100vh",
          background: "#ffffff",
          boxShadow: "2px 0 8px rgba(0,0,0,0.12)",
          transition: "left 220ms ease",
          zIndex: 50,
          padding: 20,
          display: window.innerWidth < 768 ? "block" : "none"
        }}
        role="dialog"
        aria-hidden={!open}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontWeight: 700, color: "#6b21a8" }}>Menu</div>
          <button
            onClick={() => setOpen(false)}
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "none",
              background: "#f3f3f3",
              cursor: "pointer"
            }}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <MenuItem label="Statistics" address="/dashboard" />
          {role === "member" && <CustomerMenu />}
          {role === "clubManager" && <SellerMenu />}
          {role === "admin" && <AdminMenu />}
        </nav>

        <div style={{ marginTop: "auto" }}>
          <MenuItem label="Profile" icon={CgProfile} address="/dashboard/profile" />
          <button
            onClick={() => {
              setOpen(false);
              logOut();
            }}
             className="btn-club"
            style={{
              width: "100%",
              marginTop: 12,
              padding: "10px 12px",
             
              color: "#fff",
              border: "none",
              borderRadius: 8,
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
            zIndex: 45,
            display: window.innerWidth < 768 ? "block" : "none"
          }}
        />
      )}

      {/* spacer for desktop so main content leaves space for fixed sidebar */}
      <div style={{ width: window.innerWidth >= 768 ? sidebarWidth : 0 }} />
    </>
  );
}
