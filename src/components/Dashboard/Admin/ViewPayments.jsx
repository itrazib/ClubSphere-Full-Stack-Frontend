import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";
import {
  CreditCard,
  User,
  Layers,
  CalendarDays,
} from "lucide-react";

export default function ViewPayments() {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["admin-payments"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/payments");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="w-full px-4 sm:px-6 py-8 space-y-6 bg-white">
      {/* ===== Title ===== */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-1"
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Payment Records
        </h1>
        <p className="text-sm text-gray-500">
          All membership & event payment transactions
        </p>
      </motion.div>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block overflow-hidden rounded-3xl border border-gray-200 shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
        {/* Header */}
        <div className="grid grid-cols-5 px-6 py-4 bg-gray-50 text-gray-600 text-sm font-semibold">
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

        {/* Rows */}
        <div className="divide-y">
          {payments.map((payment, index) => (
            <motion.div
              key={payment._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              className="grid grid-cols-5 px-6 py-4 text-gray-700 hover:bg-gray-50 transition"
            >
              <div className="font-medium text-gray-900">
                {payment.memberEmail}
              </div>

              <div className="font-semibold text-emerald-600">
                ৳{payment.amount}
              </div>

              <div>
                <span
                  className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                    payment.type === "membership"
                      ? "bg-indigo-100 text-indigo-600"
                      : "bg-purple-100 text-purple-600"
                  }`}
                >
                  {payment.type}
                </span>
              </div>

              <div className="text-gray-600">
                {payment.club || "—"}
              </div>

              <div className="text-gray-500">
                {new Date(payment.createdAt).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden space-y-4">
        {payments.map((payment, index) => (
          <motion.div
            key={payment._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-3"
          >
            <div className="flex justify-between items-start">
              <p className="font-semibold text-gray-900 text-sm">
                {payment.memberEmail}
              </p>
              <span className="text-emerald-600 font-bold text-sm">
                ৳{payment.amount}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Layers size={14} />
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                  payment.type === "membership"
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-purple-100 text-purple-600"
                }`}
              >
                {payment.type}
              </span>
            </div>

            <div className="flex justify-between text-xs text-gray-500">
              <span>{payment.club || "—"}</span>
              <span>
                {new Date(payment.createdAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ===== Empty State ===== */}
      {payments.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No payment records found.
        </div>
      )}
    </div>
  );
}
