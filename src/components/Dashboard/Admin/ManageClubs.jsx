import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";

export default function ManageClubs() {
  const [selectedClub, setSelectedClub] = useState(null);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // ------------------------------
  // FETCH CLUBS
  // ------------------------------
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["adminClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
  });

  // ------------------------------
  // UPDATE STATUS MUTATION
  // ------------------------------
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await axiosSecure.patch(`/clubs/${id}`, { status });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["adminClubs"]);
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 space-y-6">
      {/* ---------- Title ---------- */}
      <motion.h1
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold"
      >
        Manage Clubs
      </motion.h1>

      {/* ---------- Table ---------- */}
      <div className="overflow-x-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg">
        <table className="w-full text-left">
          <thead className="bg-white/20 text-gray-200">
            <tr>
              <th className="p-4">Club Name</th>
              <th className="p-4">Manager Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Membership Fee</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {clubs.map((club, i) => (
              <motion.tr
                key={club._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-white/10 hover:bg-white/5"
              >
                <td className="p-4 font-semibold">{club.name}</td>
                <td className="p-4">{club.managerEmail}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm text-white ${
                      club.status === "approved"
                        ? "bg-green-600"
                        : club.status === "rejected"
                        ? "bg-red-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {club.status}
                  </span>
                </td>

                <td className="p-4">{club.membershipFee} tk</td>

                <td className="p-4 text-right space-x-2">
                  {/* VIEW STATS */}
                  <button
                    onClick={() => setSelectedClub(club)}
                    className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View Stats
                  </button>

                  {/* SHOW APPROVE/REJECT */}
                  {club.status === "pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: club._id,
                            status: "approved",
                          })
                        }
                        className="px-3 py-1 rounded-lg bg-green-600 text-white hover:bg-green-700"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatusMutation.mutate({
                            id: club._id,
                            status: "rejected",
                          })
                        }
                        className="px-3 py-1 rounded-lg bg-red-600 text-white hover:bg-red-700"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ---------- MODAL ---------- */}
      {selectedClub && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl w-[320px] shadow-xl"
          >
            <h2 className="text-xl font-bold mb-3">Club Stats</h2>

            <p>
              <strong>Club:</strong> {selectedClub.name}
            </p>
            <p>
              <strong>Members:</strong> {selectedClub.membersCount || 0}
            </p>
            <p>
              <strong>Events:</strong> {selectedClub.eventsCount || 0}
            </p>

            <button
              onClick={() => setSelectedClub(null)}
              className="mt-4 w-full px-3 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
