import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users } from "lucide-react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loader/Loading";
import { Link } from "react-router";

export default function UpcomingEvents() {
  const axiosSecure = useAxiosSecure();

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["upcomingEvents"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events/upcoming");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <div className="mt-20 px-4 max-w-7xl mx-auto">
      {/* ================= Heading ================= */}
      <div className="text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-gradient"
        >
          Upcoming Events ✨
        </motion.h2>
        <p className="text-gray-600 mt-2">
          Don’t miss out on exciting events coming soon
        </p>
      </div>

      {/* ================= No Events ================= */}
      {events.length === 0 ? (
        <p className="text-center text-gray-400">No upcoming events found.</p>
      ) : (
        /* ================= Event Grid ================= */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03, y: -6 }}
              transition={{ duration: 0.4 }}
              className="relative h-[480px] rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-lg hover:shadow-2xl transition group flex flex-col"
            >
              {/* ================= Image ================= */}
              <div className="relative h-44 w-full overflow-hidden shrink-0">
                <img
                  src={event.image || "/placeholder.jpg"}
                  alt={event.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 text-white backdrop-blur-md">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>

              {/* ================= Content ================= */}
              <div className="p-6 flex flex-col flex-1">
                {/* Title (max 2 lines) */}
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-indigo-600 transition">
                  {event.title}
                </h3>

                {/* Description (short & fixed height) */}
                <p className="mt-3 text-gray-600 text-sm line-clamp-2 leading-relaxed h-[42px]">
                  {event.description}
                </p>

                {/* Info */}
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <div className="flex items-center gap-2">
                    <Calendar size={15} className="text-indigo-500" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={15} className="text-rose-500" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={15} className="text-emerald-500" />
                    <span>Max: {event.maxAttendees || "Unlimited"}</span>
                  </div>
                </div>

                {/* Push footer to bottom */}
                <div className="mt-auto" />

                {/* ================= Footer ================= */}
                <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                      event.isPaid
                        ? "bg-red-100 text-red-600"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {event.isPaid
                      ? `Paid – ${event.eventFee} BDT`
                      : "Free Event"}
                  </span>

                  <Link to={`/eventDetails/${event._id}`}>
                    <button className="px-4 py-2 rounded-xl btn-club text-white text-sm font-medium shadow hover:opacity-90 transition">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>

              {/* ================= Glow Effect ================= */}
              <div className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-300 to-purple-100 opacity-20 blur-lg" />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
