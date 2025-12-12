import React from "react";
import useAuth from "../hooks/useAuth";
// import useAuth from "../../../hooks/useAuth";

export default function Topbar({ onMenuClick }) {
  const { user } = useAuth();

  // basic inline layout; onMenuClick is passed from Sidebar when needed
  return (
    <header
      style={{
        height: 64,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        position: "sticky",
        top: 0,
        zIndex: 30
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Optional hamburger for small screens — shown by Sidebar with callback */}
        {onMenuClick && (
          <button
            onClick={onMenuClick}
            aria-label="Toggle menu"
            style={{
              width: 40,
              height: 40,
              borderRadius: 6,
              border: "none",
              background: "#f3f3f3",
              cursor: "pointer"
            }}
          >
            ☰
          </button>
        )}

        <div>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#333" }}>
            Welcome, <span style={{ color: "#6b21a8" }}>{user?.displayName || "User"}</span>
          </div>
          <div style={{ fontSize: 12, color: "#666" }}>{user?.email}</div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <img
          src={user?.photoURL || "https://i.ibb.co/YT8KQzG/placeholder.jpg"}
          alt="avatar"
          style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "1px solid #e5e7eb" }}
        />
      </div>
    </header>
  );
}
