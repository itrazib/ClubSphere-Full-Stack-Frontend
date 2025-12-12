import React from "react";
import { Users, Calendar, CreditCard, Grid } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";


import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";

export default function ManagerOverview() {
  const axiosSecure = useAxiosSecure();

  // ===== API Call =====
  const { data, isLoading } = useQuery({
    queryKey: ["managerOverview"],
    queryFn: async () => {
      const res = await axiosSecure.get("/manager/overview"); // Change API route
      return res.data;
    },
  });
  console.log(data)

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
    }),
  };

  // Show loader while fetching
  if (isLoading) return <Loading />;

  // API Values
  const stats = [
    { label: "Clubs Managed", value: data?.clubsManaged || 0, icon: Grid },
    { label: "Total Members", value: data?.totalMembers || 0, icon: Users },
    { label: "Events Created", value: data?.eventsCreated || 0, icon: Calendar },
    { label: "Total Payments", value: `$${data?.totalPayments || 0}`, icon: CreditCard },
  ];

  return (
    <div className="w-full">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-lg font-semibold mb-4"
      >
        Manager Overview
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.03, y: -3 }}
              className="p-5 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 
                         backdrop-blur-xl border border-white/20 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="flex items-start gap-3">
                <motion.div
                  initial={{ rotate: -10, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 120 }}
                  className="p-2 bg-white/20 rounded-xl shadow-sm"
                >
                  <Icon className="w-6 h-6" />
                </motion.div>

                <div>
                  <div className="text-xs text-gray-300">{item.label}</div>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className="text-3xl font-bold mt-1"
                  >
                    {item.value}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
