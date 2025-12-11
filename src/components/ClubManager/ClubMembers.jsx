import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Users, UserX, ChevronRight } from "lucide-react";

export default function ClubMembers() {
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);
  const [members, setMembers] = useState([]);
  const [memberCounts, setMemberCounts] = useState({});
  const [confirmModal, setConfirmModal] = useState({ open: false, member: null });

  // Load managed clubs
  const { data: clubs = [] } = useQuery({
    queryKey: ["managedClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  // Load member counts
  useEffect(() => {
    const loadCounts = async () => {
      let newCounts = {};
      for (const club of clubs) {
        try {
          const res = await axiosSecure.get(`/memberships/count/${club._id}`);
          newCounts[club._id] = res.data.count;
        } catch {
          newCounts[club._id] = 0;
        }
      }
      setMemberCounts(newCounts);
    };

    if (clubs.length > 0) loadCounts();
  }, [clubs]);

  // Load members list
  const loadMembers = async (clubId) => {
    setSelectedClub(clubId);
    try {
      const res = await axiosSecure.get(`/memberships/${clubId}`);
      setMembers(res.data);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  };

  // Expire member
  const handleExpire = async () => {
    try {
      await axiosSecure.patch(
        `/memberships/${confirmModal.member._id}/expire`,
        { status: "expired" }
      );

      setMembers((prev) =>
        prev.map((m) =>
          m._id === confirmModal.member._id
            ? { ...m, status: "expired" }
            : m
        )
      );

      setMemberCounts((prev) => ({
        ...prev,
        [selectedClub]: prev[selectedClub] - 1,
      }));

      setConfirmModal({ open: false, member: null });
    } catch (error) {
      console.error("Error expiring member:", error);
    }
  };

  return (
    <div className="p-6 w-full mx-auto">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Users size={28} className="text-purple-600" />
        <h1 className="text-3xl font-bold">Manage Club Members</h1>
      </div>

      {/* CLUB LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <motion.div
            key={club._id}
            whileHover={{ scale: 1.03 }}
            className="p-5 bg-white rounded-2xl shadow-md border cursor-pointer hover:shadow-xl transition-all"
            onClick={() => loadMembers(club._id)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{club.name}</h2>
              <ChevronRight className="text-gray-500" />
            </div>

            <p className="text-gray-500 mt-2">
              Members:
              <span className="ml-2 font-bold">
                {memberCounts[club._id] ?? 0}
              </span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* MEMBERS TABLE */}
      {selectedClub && (
        <motion.div
          className="mt-10 p-6 bg-white rounded-2xl shadow-xl border"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-2xl font-semibold mb-5">Club Members</h2>

          {members.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No members found for this club.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Name</th>
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">Joined</th>
                    <th className="p-3 border text-center">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {members.map((member) => (
                    <tr key={member._id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border">{member.name}</td>

                      <td className="p-3 border">{member.memberEmail}</td>

                      <td className="p-3 border">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            member.status === "expired"
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {member.status}
                        </span>
                      </td>

                      <td className="p-3 border">{member.joinedAt}</td>

                      <td className="p-3 border text-center">
                        {member.status !== "expired" ? (
                          <button
                            onClick={() =>
                              setConfirmModal({ open: true, member })
                            }
                            className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center gap-1 mx-auto"
                          >
                            <UserX size={16} /> Expire
                          </button>
                        ) : (
                          <span className="text-gray-400 text-sm">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}

      {/* CONFIRM MODAL */}
      <AnimatePresence>
        {confirmModal.open && (
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-lg w-80"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-bold">
                Confirm Expire
              </h3>
              <p className="text-gray-600 mt-2">
                Are you sure you want to expire this member?
              </p>

              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => setConfirmModal({ open: false, member: null })}
                  className="px-4 py-1.5 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleExpire}
                  className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Expire
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
