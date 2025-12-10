import { motion } from "framer-motion";
import { Calendar, Users } from "lucide-react";
import { Link } from "react-router";

export function ClubCard({ club }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="w-full max-w-sm"
    >
      <div
        className="
          rounded-2xl overflow-hidden shadow-xl 
          bg-[#0c0c0c]/60 backdrop-blur-sm border border-white/10 
          hover:shadow-2xl hover:scale-[1.02] transition-all duration-300
          flex flex-col h-[420px]
        "
      >
        {/* Banner Image */}
        <div className="relative h-48 w-full shrink-0">
          <img
            src={
              club.bannerImage ||
              "https://via.placeholder.com/400x200?text=No+Image"
            }
            alt={club.name}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20"></div>

          <h2 className="absolute bottom-3 left-4 text-2xl font-bold text-white drop-shadow-2xl">
            {club.name}
          </h2>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5">
          {/* Description fixed 2 lines */}
          <p className="text-gray-200 text-sm line-clamp-2 leading-relaxed h-[42px]">
            {club.description}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-gray-300 text-sm mt-3">
            <span className="flex items-center gap-1">
              <Users size={16} className="text-blue-400" />
              {club.members?.length || 0} Members
            </span>

            <span className="flex items-center gap-1">
              <Calendar size={16} className="text-green-300" />
              {club.createdAt?.slice(0, 10)}
            </span>
          </div>

          {/* Button always bottom */}
          <div className="mt-auto">
            <Link to={`/clubs/${club._id}`}>
              <button
                className="w-full  btn-club hover:opacity-90 text-white rounded-xl font-medium  transition shadow-lg"
              >
                View Details
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
