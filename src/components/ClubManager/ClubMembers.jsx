import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function ClubMembers() {
  const axiosSecure = useAxiosSecure();
  const [selectedClub, setSelectedClub] = useState(null);
  const [members, setMembers] = useState([]);
  const [memberCounts, setMemberCounts] = useState({});
  const [confirmModal, setConfirmModal] = useState({
    open: false,
    member: null,
  });

  // Load managed clubs
  const { data: clubs = [] } = useQuery({
    queryKey: ["managedClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  // Load member count for each club
  useEffect(() => {
    const loadCounts = async () => {
      let newCounts = {};
      for (const club of clubs) {
        try {
          const res = await axiosSecure.get(`/memberships/count/${club._id}`);
          newCounts[club._id] = res.data.count;
        } catch (err) {
          newCounts[club._id] = 0;
        }
      }
      setMemberCounts(newCounts);
    };

    if (clubs.length > 0) loadCounts();
  }, [clubs]);

  // Load members for selected club
  const loadMembers = async (clubId) => {
    setSelectedClub(clubId);
    try {
      const res = await axiosSecure.get(`/memberships/${clubId}`);
      setMembers(res.data);
    } catch (error) {
      console.error("Error loading members:", error);
    }
  };

  // Expire a member
  const handleExpire = async () => {
    try {
      await axiosSecure.patch(
        `/memberships/${confirmModal.member._id}/expire`,
        { status: "expired" }
      );

      const updated = members.map((m) =>
        m._id === confirmModal.member._id ? { ...m, status: "expired" } : m
      );

      setMembers(updated);
      setConfirmModal({ open: false, member: null });

      // update the card count also
      setMemberCounts((prev) => ({
        ...prev,
        [selectedClub]: prev[selectedClub] - 1,
      }));
    } catch (error) {
      console.error("Error expiring member:", error);
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      {/* Clubs Card List */}
      <h1 className="text-2xl font-bold mb-4">My Clubs</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {clubs.map((club) => (
          <motion.div
            key={club._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 250 }}
            className="p-5 bg-white rounded-2xl shadow-lg cursor-pointer border hover:shadow-xl"
            onClick={() => loadMembers(club._id)}
          >
            <h2 className="text-xl font-semibold">{club.name}</h2>
            <p className="text-gray-600 mt-1">
              Total Members:{" "}
              <span className="font-bold">
                {memberCounts[club._id] ?? 0}
              </span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Members Table */}
      {selectedClub && (
        <motion.div
          className="mt-10 p-6 bg-white rounded-2xl shadow-lg border"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-xl font-bold mb-4">Club Members</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Name</th>
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Join Date</th>
                  <th className="p-3 border text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {members.map((member) => (
                  <tr key={member._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{member.name}</td>
                    <td className="p-3 border">{member.memberEmail}</td>
                    <td
                      className={`p-3 border font-semibold ${
                        member.status === "expired"
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                    >
                      {member.status}
                    </td>
                    <td className="p-3 border">{member.joinedAt}</td>
                    <td className="p-3 border text-center">
                      {member.status !== "expired" && (
                        <button
                          onClick={() =>
                            setConfirmModal({ open: true, member })
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Expire
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      {/* Confirm Modal */}
      <AnimatePresence>
        {confirmModal.open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl shadow-xl w-80"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-bold">
                Are you sure you want to expire this member?
              </h3>

              <div className="mt-4 flex justify-end gap-3">
                <button
                  onClick={() =>
                    setConfirmModal({ open: false, member: null })
                  }
                  className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExpire}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Yes, Expire
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
