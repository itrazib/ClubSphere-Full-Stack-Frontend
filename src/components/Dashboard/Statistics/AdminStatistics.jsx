import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaLayerGroup,
  FaUserFriends,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../Loader/Loading";

const AdminStats = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => (await axiosSecure.get("/admin/stats")).data,
  });

  const { data: analytics = {}, isLoading: chartLoading } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: async () => (await axiosSecure.get("/admin/analytics")).data,
  });

  if (isLoading) return <Loading/>;

  const cards = [
    { title: "Users", value: stats.totalUsers, icon: <FaUsers /> },
    {
      title: "Clubs (P/A/R)",
      value: `${stats.totalClubs.pending}/${stats.totalClubs.approved}/${stats.totalClubs.rejected}`,
      icon: <FaLayerGroup />,
    },
    { title: "Memberships", value: stats.totalMemberships, icon: <FaUserFriends /> },
    { title: "Events", value: stats.totalEvents, icon: <FaCalendarAlt /> },
    { title: "Payments", value: `${stats.totalPayments} Tk`, icon: <FaMoneyBillWave /> },
  ];

  const chartData =
    analytics?.months?.map((m, i) => ({
      month: m,
      users: analytics.usersData[i],
      payments: analytics.paymentsData[i],
    })) || [];

  return (
    <div className="p-6 space-y-10">
      {/* ===== Cards ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-5 rounded-2xl bg-white shadow-lg"
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500">{c.title}</p>
                <p className="text-2xl font-bold">{c.value}</p>
              </div>
              <div className="text-2xl text-indigo-600">{c.icon}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== Graph ===== */}
      <div className="bg-white rounded-2xl shadow-lg p-6 h-[330px]">
        <h3 className="font-semibold mb-4">Growth Analytics</h3>

        {chartLoading ? (
          <p>Loading chart...</p>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="users"
                strokeWidth={3}
              />
              <Line
                type="monotone"
                dataKey="payments"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default AdminStats;
