import React from "react";
import { Link } from "react-router";

export default function MenuItem({ icon: Icon, label, address }) {
  return (
    <Link
      to={address}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 12px",
        textDecoration: "none",
        color: "#222",
        borderRadius: 8
      }}
    >
      {Icon && <Icon />}
      <span>{label}</span>
    </Link>
  );
}
