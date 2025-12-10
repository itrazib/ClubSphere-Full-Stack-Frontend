import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Plus, Edit2 } from "lucide-react";

export default function MyClubs() {
  const [clubs, setClubs] = useState([]);
  const [editingClub, setEditingClub] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  // Static clubs (You will replace with filtered API data)
  useEffect(() => {
    setClubs([
      {
        id: 1,
        name: "Tech Innovators Club",
        description: "A club for developers & creators",
        location: "Dhaka",
        membershipFee: 200,
        category: "Technology",
        bannerImage: "",
      },
      {
        id: 2,
        name: "Photography Club",
        description: "Capturing creativity!",
        location: "Chittagong",
        membershipFee: 150,
        category: "Art",
        bannerImage: "",
      },
    ]);
  }, []);

  const onSubmit = (data) => {
    if (editingClub) {
      // Update mode
      setClubs(
        clubs.map((club) =>
          club.id === editingClub.id ? { ...club, ...data } : club
        )
      );
      setEditingClub(null);
    } else {
      // Create mode
      const newClub = {
        id: Date.now(),
        ...data,
      };
      setClubs([...clubs, newClub]);
    }

    reset();
  };

  const startEditing = (club) => {
    setEditingClub(club);
    reset(club);
  };

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
            key={club.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03 }}
            className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-xl shadow-lg"
          >
            <div className="h-28 bg-white/20 rounded-xl mb-3"></div>

            <h3 className="text-lg font-bold">{club.name}</h3>
            <p className="text-sm text-gray-300">{club.description}</p>

            <div className="mt-3 text-sm">
              <p><strong>Location:</strong> {club.location}</p>
              <p><strong>Fee:</strong> {club.membershipFee} tk</p>
              <p><strong>Category:</strong> {club.category}</p>
            </div>

            <button
              onClick={() => startEditing(club)}
              className="mt-3 px-3 py-1 bg-yellow-500 text-black rounded-lg text-sm hover:bg-yellow-600"
            >
              Edit
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
