import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CreditCard, CheckCircle2, XCircle, Clock } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loader/Loading";

export default function PaymentHistory() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: payments = [], isLoading, isError } = useQuery({
    queryKey: ["payment-history", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;
  if (isError) return <p className="text-red-600">Failed to load payments.</p>;

  return (
    <div className="w-full max-w-5xl mx-auto mt-10">
      <motion.h2
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold flex items-center gap-2 mb-6"
      >
        <CreditCard className="w-7 h-7 text-blue-500" />
        Payment History
      </motion.h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto shadow-lg rounded-2xl bg-white">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-semibold text-gray-700">ClubId</th>
              <th className="p-4 font-semibold text-gray-700">Type</th>
              <th className="p-4 font-semibold text-gray-700">Amount</th>
              <th className="p-4 font-semibold text-gray-700">Date</th>
              <th className="p-4 font-semibold text-gray-700">Status</th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p) => (
              <motion.tr
                key={p._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="border-b hover:bg-gray-50 transition"
              >
                <td className="p-4">{p.clubId}</td>
                <td className="p-4 capitalize">{p.type}</td>
                <td className="p-4 font-semibold">${p.amount}</td>
                <td className="p-4">{new Date(p.date).toLocaleDateString()}</td>

                <td className="p-4">
                  {p.status === "paid" && (
                    <span className="flex items-center gap-1 text-green-600 font-semibold">
                      <CheckCircle2 size={18} /> Paid
                    </span>
                  )}
                  {p.status === "pending" && (
                    <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <Clock size={18} /> Pending
                    </span>
                  )}
                  {p.status === "failed" && (
                    <span className="flex items-center gap-1 text-red-500 font-semibold">
                      <XCircle size={18} /> Failed
                    </span>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {payments.length === 0 ? (
          <p className="text-center text-gray-500 p-4">
            No payment history available.
          </p>
        ) : (
          payments.map((p) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md p-4 border"
            >
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Club ID:</span> {p.clubId}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Type:</span> {p.type}
              </p>

              <p className="mt-1 text-sm font-semibold">
                <span className="font-semibold">Amount:</span> ${p.amount}
              </p>

              <p className="text-sm mt-1">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(p.date).toLocaleDateString()}
              </p>

              <div className="mt-2">
                {p.status === "paid" && (
                  <span className="flex items-center gap-1 text-green-600 font-semibold">
                    <CheckCircle2 size={18} /> Paid
                  </span>
                )}
                {p.status === "pending" && (
                  <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                    <Clock size={18} /> Pending
                  </span>
                )}
                {p.status === "failed" && (
                  <span className="flex items-center gap-1 text-red-500 font-semibold">
                    <XCircle size={18} /> Failed
                  </span>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
