import React from "react";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaLayerGroup,
  FaUserFriends,
  FaCalendarAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Users",
    value: "1200",
    icon: <FaUsers size={28} />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Total Clubs (P/A/R)",
    value: "50 / 30 / 10",
    icon: <FaLayerGroup size={28} />,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
  {
    title: "Total Memberships",
    value: "750",
    icon: <FaUserFriends size={28} />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Total Events",
    value: "180",
    icon: <FaCalendarAlt size={28} />,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "Total Payments",
    value: "$12,500",
    icon: <FaMoneyBillWave size={28} />,
    bg: "bg-red-100",
    color: "text-red-600",
  },
];

const AdminStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 p-6">
      {stats.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 cursor-pointer hover:shadow-lg transition"
        >
          <div className={`${item.bg} p-4 rounded-full ${item.color}`}>
            {item.icon}
          </div>
          <div>
            <h3 className="text-gray-500 text-sm font-medium">{item.title}</h3>
            <p className="text-2xl font-bold">{item.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default AdminStats;
