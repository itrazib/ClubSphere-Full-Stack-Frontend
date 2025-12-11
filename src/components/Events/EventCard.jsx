import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";

export default function EventCard({ event, onJoin }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="rounded-2xl bg-white shadow-md mb-7 border border-gray-200 overflow-hidden cursor-pointer transition"
    >
      {/* Event Image */}
      <div className="w-full h-44 bg-gray-200 overflow-hidden">
        <img
          src={event.image || "/placeholder.jpg"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Body */}
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {event.title}
            </h2>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {event.description}
            </p>
          </div>

          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
            {new Date(event.createdAt).toLocaleDateString()}
          </span>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-3 mt-4 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            <span>{event.date}</span>
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={16} />
            <span>
              {event.maxAttendees ? event.maxAttendees : "Unlimited"} seats
            </span>
          </div>

          <div className="flex items-center gap-2">
            <DollarSign size={16} />
            <span>
              {event.isPaid ? `${event.eventFee} BDT` : "Free"}
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 pb-4 border-t border-gray-200 pt-3 flex justify-between items-center bg-gray-50">
        <span className="text-xs text-gray-500 font-bold">
          Club Name: {event.clubName}
        </span>

        {/* Join Button */}
       <Link to={`/eventDetails/${event._id}`}>
        <button
          
          className="px-4 py-1.5 btn-club text-white rounded-lg text-sm hover:bg-indigo-700 transition shadow-sm"
        >
          View Details
        </button>
       </Link>
      </div>
    </motion.div>
  );
}
