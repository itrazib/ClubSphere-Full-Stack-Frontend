import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";
import { CreditCard, User, Layers, CalendarDays } from "lucide-react";

export default function ViewPayments() {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6 w-full">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold text-white"
      >
        Payment Records
      </motion.h1>

      {/* Table Container */}
      <div className="overflow-hidden border border-white/10 rounded-xl bg-[#141414] shadow-lg">
        {/* Table Header */}
        <div className="grid grid-cols-5 px-6 py-3 bg-[#1c1c1c] border-b border-white/10 text-gray-300 text-sm font-semibold uppercase">
          <div className="flex items-center gap-2">
            <User size={16} /> User
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={16} /> Amount
          </div>
          <div className="flex items-center gap-2">
            <Layers size={16} /> Type
          </div>
          <div>Club</div>
          <div className="flex items-center gap-2">
            <CalendarDays size={16} /> Date
          </div>
        </div>

        {/* Table Rows */}
        <div className="">
          {payments.map((payment, index) => (
            <motion.div
              key={payment._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="grid grid-cols-5 px-6 py-4 border-b border-white/5 hover:bg-white/5 transition text-gray-200"
            >
              {/* USER */}
              <div className="font-medium">{payment.memberEmail}</div>

              {/* AMOUNT */}
              <div className="font-semibold text-green-400">
                {payment.amount} tk
              </div>

              {/* TYPE */}
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    payment.type === "membership"
                      ? "bg-blue-600 text-white"
                      : "bg-purple-600 text-white"
                  }`}
                >
                  {payment.type}
                </span>
              </div>

              {/* CLUB NAME (fallback → none) */}
              <div className="text-gray-300">
                {payment.club || "—"}
              </div>

              {/* DATE */}
              <div className="text-gray-400">
                {new Date(payment.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
