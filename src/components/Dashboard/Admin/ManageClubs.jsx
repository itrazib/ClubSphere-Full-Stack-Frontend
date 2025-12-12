import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Loading from "../../Loader/Loading";

export default function ManageClubs() {
  const [selectedClub, setSelectedClub] = useState(null);
  const [clubStats, setClubStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(false);

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

  const fetchClubStats = async (clubId) => {
    setLoadingStats(true);
    try {
      const res = await axiosSecure.get(`/clubs/${clubId}/stats`);
      setClubStats(res.data);
    } finally {
      setLoadingStats(false);
    }
  };

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
                    onClick={() => {
                      setSelectedClub(club);
                      fetchClubStats(club._id);
                    }}
                    className="px-3 py-1 rounded-lg bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View Stats
                  </button>

                  {/* APPROVE / REJECT */}
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

      {/* ---------- PREMIUM STATS MODAL ---------- */}
     {selectedClub && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-lg flex justify-center items-center z-50">
    <motion.div
      initial={{ opacity: 0, scale: 0.75, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative w-[420px] p-7 rounded-3xl
                 bg-gradient-to-br from-white/20 to-white/5 
                 border border-white/30 backdrop-blur-2xl 
                 shadow-[0_0_40px_rgba(255,255,255,0.25)]"
    >
      {/* Outer neon glow */}
      <div className="absolute inset-0 rounded-3xl -z-10 
                      shadow-[0_0_55px_10px_rgba(139,92,246,0.5)]"></div>

      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-white tracking-wide">
          {selectedClub.name}
        </h2>
        <p className="text-white/70 text-sm mt-1">
          Club Performance Overview
        </p>
      </div>

      {/* Loading Spinner */}
      {loadingStats ? (
        <div className="flex justify-center py-6">
          <div className="w-10 h-10 border-4 border-white/40 border-t-white 
                          rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="space-y-4">

            {/* Members */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="p-5 rounded-xl bg-white/10 border border-white/20
                         shadow-[0_0_20px_rgba(255,255,255,0.15)]
                         flex items-center gap-4"
            >
              <div className="w-12 h-12 flex items-center justify-center 
                              rounded-xl bg-purple-500/30 text-purple-200 
                              shadow-[0_0_15px_rgba(168,85,247,0.6)]">
                👥
              </div>
              <div>
                <p className="text-white/70 text-sm">Total Members</p>
                <p className="text-white text-2xl font-bold">
                  {clubStats?.membersCount}
                </p>
              </div>
            </motion.div>

            {/* Events */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="p-5 rounded-xl bg-white/10 border border-white/20
                         shadow-[0_0_20px_rgba(255,255,255,0.15)]
                         flex items-center gap-4"
            >
              <div className="w-12 h-12 flex items-center justify-center 
                              rounded-xl bg-blue-500/30 text-blue-200 
                              shadow-[0_0_15px_rgba(59,130,246,0.6)]">
                📅
              </div>
              <div>
                <p className="text-white/70 text-sm">Total Events</p>
                <p className="text-white text-2xl font-bold">
                  {clubStats?.eventsCount}
                </p>
              </div>
            </motion.div>

            {/* Activity Score (Bonus visual stat) */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-5 rounded-xl bg-gradient-to-r from-indigo-500/30 to-pink-500/30
                         border border-white/20 shadow-[0_0_25px_rgba(236,72,153,0.4)]
                         flex items-center gap-4"
            >
              <div className="w-12 h-12 flex items-center justify-center 
                              rounded-xl text-pink-200 
                              shadow-[0_0_15px_rgba(236,72,153,0.8)]">
                ⭐
              </div>
              <div>
                <p className="text-white/70 text-sm">Activity Score</p>
                <p className="text-white text-2xl font-bold">
                  {Math.floor((clubStats?.eventsCount + clubStats?.membersCount) / 2)}
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {/* Close Button */}
      <button
        onClick={() => {
          setSelectedClub(null);
          setClubStats(null);
        }}
        className="mt-7 w-full py-3 rounded-xl 
                   bg-red-500/90 hover:bg-red-600 
                   text-white font-bold shadow-[0_0_20px_rgba(239,68,68,0.6)]
                   transition-all"
      >
        Close
      </button>
    </motion.div>
  </div>
)}

    </div>
  );
}
