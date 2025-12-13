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
      <div className="text-center mb-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 text-transparent bg-clip-text"
        >
          Upcoming Events ✨
        </motion.h2>
        <p className="text-gray-600 mt-2">
          Stay updated with exciting events happening soon!
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
              whileHover={{ scale: 1.03, translateY: -6 }}
              transition={{ duration: 0.4 }}
              className="relative h-[520px] rounded-3xl overflow-hidden bg-white border border-gray-200 shadow-xl hover:shadow-2xl transition group flex flex-col"
            >
              {/* ================= Image ================= */}
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="h-full w-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-black/60 text-white backdrop-blur-md">
                  {new Date(event.date).toLocaleDateString()}
                </div>
              </div>

              {/* ================= Content ================= */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition">
                  {event.title}
                </h3>

                <p className="mt-3 text-gray-600 text-sm line-clamp-3">
                  {event.description}
                </p>

                <div className="mt-4 space-y-2 text-sm text-gray-700">
                  <p className="flex items-center gap-2">
                    <Calendar size={16} className="text-indigo-500" />
                    {event.date}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-500" />
                    {event.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users size={16} className="text-emerald-500" />
                    Max: {event.maxAttendees}
                  </p>
                </div>

                {/* ================= Footer ================= */}
                <div className="mt-auto pt-5 flex justify-between items-center">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-medium ${
                      event.isPaid
                        ? "bg-red-100 text-red-600"
                        : "bg-emerald-100 text-emerald-600"
                    }`}
                  >
                    {event.isPaid ? `Paid – $${event.eventFee}` : "Free Event"}
                  </span>
                  <Link to={`/eventDetails/${event._id}`}>
                    <button className="px-4 py-2 rounded-xl btn-club text-white font-medium shadow hover:shadow-lg hover:opacity-90 transition">
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
