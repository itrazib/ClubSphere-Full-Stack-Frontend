import React from "react";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function Profile() {
  const { user } = useAuth();
  const [role] = useRole();



  return (
    <div style={{ maxWidth: 850, margin: "0 auto", padding: "20px 10px" }}>
      {/* Header */}
      <div
      className="bg-pink-500"
        style={{
       
          padding: 24,
          borderRadius: 12,
          color: "#fff",
          marginBottom: 20,
        }}
      >
        <h2 className="font-bold" style={{ fontSize: 26, marginBottom: 6 }}>Profile Overview</h2>
        <p style={{ opacity: 0.9 }}>Logged in as: {role}</p>
      </div>

      {/* Profile Card */}
      <div
        style={{
          background: "#fff",
          padding: 24,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.07)",
        }}
      >
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <img
            src={user?.photoURL || "https://i.ibb.co/YT8KQzG/placeholder.jpg"}
            style={{
              width: 110,
              height: 110,
              borderRadius: "50%",
              objectFit: "cover",
              border: "3px solid #eee",
            }}
          />
          <div>
            <h2 style={{ fontSize: 24, marginBottom: 4 }}>
              {user?.displayName}
            </h2>
            <p style={{ color: "#666" }}>{user?.email}</p>
            <span
              style={{
                display: "inline-block",
                marginTop: 8,
                padding: "4px 10px",
                background: "#f3e8ff",
                color: "#6b21a8",
                borderRadius: 6,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {role.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "#eee", margin: "20px 0" }} />

        {/* ROLE BASED SECTIONS */}
        {role === "member" && <MemberSection />}

        {role === "clubManager" && <ManagerSection />}

        {role === "admin" && <AdminSection />}
      </div>
    </div>
  );
}

/* -------------------------
   MEMBER SECTION
-------------------------- */
function MemberSection() {
  return (
    <>
      <h3 style={{ fontSize: 20, marginBottom: 14 }}>Member Profile</h3>

      <div style={{ display: "grid", gap: 14 }}>
        <Card label="Total Registered Events" value="12" />
        <Card label="Joined Clubs" value="4" />
        <Card label="Attendance" value="94%" />
      </div>
    </>
  );
}

/* -------------------------
   CLUB MANAGER SECTION
-------------------------- */
function ManagerSection() {
  const axiosSecure = useAxiosSecure();
  const { data: overview = [] } = useQuery({
    queryKey: "managerStats",
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/overview");
      console.log(res.data);
      return res.data;
    },
  });

  return (
    <>
      <h3 style={{ fontSize: 20, marginBottom: 14 }}>Manager Dashboard</h3>

      <div style={{ display: "grid", gap: 14 }}>
        <Card label="Managed Clubs" value={overview.clubsManaged} />
        <Card label="Total Members" value={overview.totalMembers} />
        <Card label="Hosted Events" value={overview.eventsCreated} />
      </div>
    </>
  );
}

/* -------------------------
   ADMIN SECTION
-------------------------- */
function AdminSection() {
  return (
    <>
      <h3 style={{ fontSize: 20, marginBottom: 14 }}>Admin Overview</h3>

      <div style={{ display: "grid", gap: 14 }}>
        <Card label="Total Users" value="820" />
        <Card label="Total Clubs" value="34" />
        <Card label="Pending Approvals" value="5" />
      </div>
    </>
  );
}

/* -------------------------
   REUSABLE CARD COMPONENT
-------------------------- */
function Card({ label, value }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: 10,
        border: "1px solid #eee",
        background: "#fafafa",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <span style={{ color: "#555" }}>{label}</span>
      <strong style={{ fontSize: 18, color: "#6b21a8" }}>{value}</strong>
    </div>
  );
}
