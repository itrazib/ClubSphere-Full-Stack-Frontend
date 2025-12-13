import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Users,
  Calendar,
  CreditCard,
  Grid,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";

export default function ManagerOverview() {
  const axiosSecure = useAxiosSecure();

  /* ================= OVERVIEW ================= */
  const { data: overview, isLoading: loadingOverview } = useQuery({
    queryKey: ["managerOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/overview");
      return res.data;
    },
  });

  /* ================= ANALYTICS ================= */
  const { data: analytics, isLoading: loadingAnalytics } = useQuery({
    queryKey: ["managerAnalytics"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/analytics");
      return res.data;
    },
  });

  if (loadingOverview || loadingAnalytics) return <Loading />;

  const stats = [
    {
      label: "Clubs Managed",
      value: overview.clubsManaged,
      icon: Grid,
    },
    {
      label: "Total Members",
      value: overview.totalMembers,
      icon: Users,
    },
    {
      label: "Events Created",
      value: overview.eventsCreated,
      icon: Calendar,
    },
    {
      label: "Total Payments",
      value: `$${overview.totalPayments}`,
      icon: CreditCard,
    },
  ];

  return (
    <div className="space-y-12">

      {/* ================= HEADER ================= */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Manager Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Overview of your clubs, members & earnings
        </p>
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="
                relative rounded-3xl p-5
                bg-white/70 backdrop-blur-xl
                border border-gray-200
                shadow-[0_20px_40px_rgba(0,0,0,0.08)]
              "
            >
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-indigo-100 text-indigo-600">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{item.label}</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* 📈 EVENTS CHART */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 p-6 shadow">
          <h3 className="font-semibold text-gray-800 mb-4">
            Events Created Per Month
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={analytics.eventsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="events"
                stroke="#6366f1"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 💰 PAYMENTS CHART */}
        <div className="rounded-3xl bg-white/70 backdrop-blur-xl border border-gray-200 p-6 shadow">
          <h3 className="font-semibold text-gray-800 mb-4">
            Payments Per Month
          </h3>

          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={analytics.paymentsPerMonth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="amount"
                radius={[8, 8, 0, 0]}
                fill="#22c55e"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}
