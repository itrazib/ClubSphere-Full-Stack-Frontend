import { useQuery } from "@tanstack/react-query";

import { motion } from "framer-motion";
import { CalendarDays, Users, Star } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loader/Loading";

export default function MemberOverview() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch Member Stats
  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["member-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/stats?email=${user.email}`);
      console.log(res.data);
      return res.data;
    },
  });

  // Fetch Upcoming Events
  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["upcoming-events", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/member/upcoming-events?email=${user.email}`
      );
      return res.data;
    },
  });

  if (statsLoading || eventsLoading) return <Loading />;

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/60 backdrop-blur-lg p-6 rounded-2xl shadow"
      >
        <h1 className="text-3xl font-bold">Welcome, {user?.displayName} 👋</h1>
        <p className="text-gray-600 mt-1">Here’s your activity summary</p>
      </motion.div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="p-6 bg-gradient-to-br from-purple-200/60 to-purple-50 rounded-2xl shadow-md border"
        >
          <div className="flex items-center gap-3">
            <Users className="w-7 h-7 text-purple-600" />
            <h2 className="text-xl font-semibold">Clubs Joined</h2>
          </div>
          <p className="text-4xl font-extrabold mt-3">
            {stats?.totalClubsJoined || 0}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="p-6 bg-gradient-to-br from-blue-200/60 to-blue-50 rounded-2xl shadow-md border"
        >
          <div className="flex items-center gap-3">
            <Star className="w-7 h-7 text-blue-600" />
            <h2 className="text-xl font-semibold">Event Registrations</h2>
          </div>
          <p className="text-4xl font-extrabold mt-3">
            {stats?.totalEventsJoined || 0}
          </p>
        </motion.div>
      </div>

      {/* Upcoming Events Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>

        {events?.length === 0 ? (
          <p className="text-gray-600">No upcoming events found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-5">
            {events?.map((event, index) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-5 bg-white rounded-xl shadow border hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <CalendarDays className="w-6 h-6 text-gray-600" />
                  <h3 className="text-lg font-semibold">{event.title}</h3>
                </div>

                <p className="text-gray-600">
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Club:</strong> {event.clubName}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
