import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loader/Loading";

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/member/payments?email=${user.email}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-10">
        Failed to load payments.
      </p>
    );

  const statusUI = {
    paid: {
      text: "Paid",
      color: "text-emerald-600",
      bg: "bg-emerald-100",
      icon: <CheckCircle2 size={16} />,
    },
    pending: {
      text: "Pending",
      color: "text-amber-600",
      bg: "bg-amber-100",
      icon: <Clock size={16} />,
    },
    failed: {
      text: "Failed",
      color: "text-rose-600",
      bg: "bg-rose-100",
      icon: <XCircle size={16} />,
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-12">
      {/* ===== Header ===== */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex items-center gap-3"
      >
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <CreditCard size={26} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Payment History
          </h2>
          <p className="text-sm text-gray-500">
            All your membership & event payments
          </p>
        </div>
      </motion.div>

      {/* ===== Desktop Table ===== */}
      <div className="hidden md:block bg-white rounded-3xl border shadow-[0_20px_50px_rgba(0,0,0,0.08)] overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr className="text-sm text-gray-500">
              <th className="p-5 text-left">Club</th>
              <th className="p-5 text-left">Type</th>
              <th className="p-5 text-left">Amount</th>
              <th className="p-5 text-left">Date</th>
              <th className="p-5 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, i) => {
              const status = statusUI[p.status] || {};
              return (
                <motion.tr
                  key={p._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-5 font-medium text-gray-800">
                    {p.club}
                  </td>
                  <td className="p-5 capitalize text-gray-600">
                    {p.type}
                  </td>
                  <td className="p-5 font-semibold text-gray-900">
                    ${p.amount}
                  </td>
                  <td className="p-5 text-gray-600">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-5">
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.color}`}
                    >
                      {status.icon} {status.text}
                    </span>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ===== Mobile Cards ===== */}
      <div className="md:hidden space-y-4">
        {payments.map((p, i) => {
          const status = statusUI[p.status] || {};
          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border shadow-md p-5"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-800">
                  {p.club}
                </h3>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full ${status.bg} ${status.color}`}
                >
                  {status.icon} {status.text}
                </span>
              </div>

              <p className="text-sm text-gray-500">
                Type: <span className="capitalize">{p.type}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Amount:{" "}
                <span className="font-semibold text-gray-800">
                  ${p.amount}
                </span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Date:{" "}
                {new Date(p.createdAt).toLocaleDateString()}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* ===== Empty State ===== */}
      {payments.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          No payment history found.
        </div>
      )}
    </div>
  );
}
