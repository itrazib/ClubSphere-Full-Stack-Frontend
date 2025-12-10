import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";

export function ClubCard({ club, onView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-sm"
    >
      <div className="rounded-2xl overflow-hidden shadow-xl bg-[#0c0c0c]/60 backdrop-blur-sm border border-white/10 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
        
        {/* Banner Image */}
        <div className="relative h-48 w-full">
          <img
            src={club.bannerImage || "https://via.placeholder.com/400x200?text=No+Image"}
            alt={club.clubName}
            className="w-full h-full object-cover"
          />

          {/* Dark Gradient Overlay (text clearly visible) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>

          {/* Title */}
          <h2 className="absolute bottom-3 left-4 text-2xl font-bold text-white drop-shadow-2xl">
            {club.name}
          </h2>
        </div>

        {/* Content */}
        <div className="p-5">

          {/* Description */}
          <p className="text-gray-200 text-sm line-clamp-2 mb-3 leading-relaxed">
            {club.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-gray-300 text-sm mb-4">

            <span className="flex items-center gap-1">
              <Users size={16} className="text-blue-400" /> {club.memberCount || 0} Members
            </span>

            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-green-300" /> {club.createdAt.slice(0, 10)}
            </span>

          </div>

          {/* View Button */}
          <button
            className="w-full py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white rounded-xl font-medium transition shadow-lg"
            onClick={() => onView(club._id)}
          >
            View Details
          </button>

        </div>
      </div>
    </motion.div>
  );
}
