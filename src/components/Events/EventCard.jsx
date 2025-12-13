import { Calendar, MapPin, Users } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function EventCard({ event }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03, y: -4 }}
      transition={{ duration: 0.3 }}
      className="
        bg-white rounded-2xl border border-gray-200
        shadow-sm hover:shadow-xl transition-all
        overflow-hidden flex flex-col h-[420px]
      "
    >
      {/* Image */}
      <div className="h-40 w-full overflow-hidden shrink-0">
        <img
          src={event.image || "/placeholder.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col flex-grow p-4">
        {/* Title (2 lines max, bold & catchy) */}
        <h3 className="text-[17px] font-bold text-gray-900 leading-snug line-clamp-2 hover:text-indigo-600 transition">
          {event.title}
        </h3>

        {/* Description (short & clean) */}
        <p className="text-sm text-gray-600 mt-1.5 line-clamp-2 h-[40px]">
          {event.description}
        </p>

        {/* Info */}
        <div className="mt-3 space-y-1.5 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar size={14} className="text-indigo-500" />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={14} className="text-rose-500" />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={14} className="text-emerald-500" />
            <span>{event.maxAttendees || "Unlimited"} Seats</span>
          </div>
        </div>

        {/* Push footer bottom */}
        <div className="mt-auto" />

        {/* Footer */}
        <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              event.isPaid
                ? "bg-red-100 text-red-600"
                : "bg-emerald-100 text-emerald-600"
            }`}
          >
            {event.isPaid ? `${event.eventFee} BDT` : "Free"}
          </span>

          <Link to={`/eventDetails/${event._id}`}>
            <button className="px-4 py-1.5 btn-club text-white rounded-lg text-xs font-medium shadow hover:opacity-90 transition">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
