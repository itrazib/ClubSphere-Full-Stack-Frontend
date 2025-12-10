import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";

export default function ViewPayments() {
  const axiosSecure = useAxiosSecure();

  // ------------------------------
  // FETCH PAYMENTS
  // ------------------------------
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
      {/* ---------- Page Title ---------- */}
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold"
      >
        Payments / Transactions
      </motion.h1>

      {/* ---------- Payment Table ---------- */}
      <div className="overflow-x-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-white/20 text-gray-200">
            <tr>
              <th className="p-4">User Email</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Type</th>
              <th className="p-4">Club Name</th>
              <th className="p-4">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((payment, index) => (
              <motion.tr
                key={payment._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="p-4 font-medium">{payment.userEmail}</td>

                <td className="p-4 font-semibold text-green-300">
                  {payment.amount} tk
                </td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      payment.type === "membership"
                        ? "bg-blue-600"
                        : "bg-purple-600"
                    }`}
                  >
                    {payment.type}
                  </span>
                </td>

                <td className="p-4">{payment.clubName}</td>

                <td className="p-4 text-gray-300">
                  {new Date(payment.date).toLocaleDateString()}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
