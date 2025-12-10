import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Plus, Edit2 } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery, useMutation } from "@tanstack/react-query";
import Loading from "../Loader/Loading";

export default function MyClubs() {
  const [editingClub, setEditingClub] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // ------------------------------
  // FETCH CLUBS
  // ------------------------------
  const {
    data: clubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs");
      return res.data;
    },
    enabled: !!user?.email,
  });

  // ------------------------------
  // CREATE CLUB MUTATION
  // ------------------------------
  const createClubMutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axiosSecure.post("/clubs", {
        ...newData,
        managerEmail: user?.email,
      });
      return res.data;
    },
    onSuccess: () => {
      refetch(); // refresh UI
      reset();
    },
  });

  // ------------------------------
  // UPDATE CLUB MUTATION
  // ------------------------------
  const updateClubMutation = useMutation({
    
    mutationFn: async (updatedData) => {
        console.log("editingClub:", editingClub);
      const res = await axiosSecure.patch(
        `/clubs/${editingClub._id}`,
        updatedData
      );
      return res.data;
    },
    onSuccess: () => {
      refetch(); // refresh UI
      reset();
      setEditingClub(null);
    },
  });

  // ------------------------------
  // HANDLE FORM SUBMIT
  // ------------------------------
  const onSubmit = (data) => {
    if (editingClub) {
      // Update
      updateClubMutation.mutate(data);
      console.log("updating club with data:", data);
    } else {
      // Create
      createClubMutation.mutate(data);
    }
  };

  // ------------------------------
  // START EDITING
  // ------------------------------
  const startEditing = (club) => {
    setEditingClub(club);
    reset(club);
  };

  if (isLoading) return <Loading />;

  return (
    <div className="w-full space-y-6">
      <h2 className="text-xl font-bold">My Clubs</h2>

      {/* ---------- Club Form ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 bg-white/10 border border-white/20 rounded-xl backdrop-blur-xl"
      >
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          {editingClub ? <Edit2 /> : <Plus />}
          {editingClub ? "Update Club" : "Create a Club"}
        </h3>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <input
            {...register("name")}
            placeholder="Club Name"
            className="p-2 rounded-lg bg-white/20 border border-white/30"
            required
          />

          <textarea
            {...register("description")}
            placeholder="Description"
            className="p-2 rounded-lg bg-white/20 border border-white/30"
          ></textarea>

          <input
            {...register("location")}
            placeholder="Location"
            className="p-2 rounded-lg bg-white/20 border border-white/30"
            required
          />

          <input
            {...register("membershipFee")}
            type="number"
            placeholder="Membership Fee"
            className="p-2 rounded-lg bg-white/20 border border-white/30"
          />

          <input
            {...register("category")}
            placeholder="Category"
            className="p-2 rounded-lg bg-white/20 border border-white/30"
          />

          <input
            {...register("bannerImage")}
            placeholder="Banner Image URL"
            className="p-2 rounded-lg bg-white/20 border border-white/30"
          />

          <button
            type="submit"
            className="bg-blue-600 px-4 py-2 rounded-lg text-white hover:bg-blue-700 transition"
          >
            {editingClub ? "Update Club" : "Create Club"}
          </button>
        </form>
      </motion.div>

      {/* ---------- Club List ---------- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clubs.map((club, index) => (
          <motion.div
            key={club._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ scale: 1.03 }}
            className="relative p-4 rounded-2xl bg-white/10 border border-white/20 
             backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300
             overflow-hidden group"
          >
            {/* Glow gradient border effect */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                  transition duration-500 pointer-events-none
                  bg-gradient-to-r from-blue-500/40 via-purple-500/40 to-pink-500/40 blur-xl"
            ></div>

            {/* Banner Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={
                  club.bannerImage ||
                  "https://via.placeholder.com/500x250?text=No+Image"
                }
                alt="Club Banner"
                className="h-40 w-full object-cover"
              />
            </motion.div>

            <div className="relative mt-4 space-y-2">
              <h3 className="text-lg font-bold tracking-wide">{club.name}</h3>

              {/* Truncated Description */}
              <p className="text-sm text-gray-300 line-clamp-2">
                {club.description}
              </p>

              <div className="mt-3 text-sm space-y-1">
                <p>
                  <strong>Location:</strong> {club.location}
                </p>
                <p>
                  <strong>Fee:</strong> {club.membershipFee} tk
                </p>
                <p>
                  <strong>Category:</strong> {club.category}
                </p>
              </div>

              <button
                onClick={() => startEditing(club)}
                className="mt-4 px-4 py-1.5 bg-yellow-500 text-black rounded-lg text-sm 
                 hover:bg-yellow-400 transition font-semibold"
              >
                Edit
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
