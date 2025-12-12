import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Users,
  Calendar,
  DollarSign,
} from "lucide-react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";
import PaymentModal from "../Dashboard/Modal/PaymentModal";
import Loading from "../Loader/Loading";
import useAuth from "../../hooks/useAuth";

export default function ClubDetails({ onBack }) {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [paymentOpen, setPaymentOpen] = useState(false);

  // Fetch Specific Club
  const { data: club, isLoading } = useQuery({
    queryKey: ["clubDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  // Check Membership Status
  const { data: isMember } = useQuery({
    queryKey: ["isMember", user?.email, id],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/is-member?memberEmail=${user.email}&clubId=${id}`
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  const { data: events, isLoading: eventsLoading } = useQuery({
    queryKey: ["clubEvents", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${id}`);
      return res.data;
    },
    enabled: isMember === "active", // 👈 Only fetch if member
  });

  if (isLoading) return <Loading />;

  if (!club) return null;

  const fee = club.membershipFee;

  return (
    <div className="min-h-screen relative z-20 mt-20 text-white pb-20">
      {/* Back Button */}
      <div className="p-4 max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Banner */}
      <div className="relative h-64 md:h-80 max-w-7xl mx-auto rounded-xl overflow-hidden shadow-xl">
        <img src={club.bannerImage} className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40"></div>

        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-md">
            {club.name}
          </h1>
          <p className="text-gray-300 mt-1">{club.category}</p>
        </div>
      </div>

      {/* Join Button */}
      <div className="max-w-7xl mx-auto flex justify-end mt-6 px-4">
        {!user ? (
          <button
            disabled
            className="px-10 py-3 bg-gray-600/50 rounded-xl text-lg font-semibold cursor-not-allowed"
          >
            Login Required
          </button>
        ) : isMember === "pending" ? (
          <button className="px-10 py-3 bg-yellow-500 rounded-xl text-lg font-semibold">
            ⏳ Pending Approval
          </button>
        ) : isMember === "active" ? (
          <button className="px-10 py-3 bg-green-600 rounded-xl text-lg font-semibold">
            ✔ Member
          </button>
        ) : isMember === "expired" ? (
          <button className="px-10 py-3 bg-green-600 rounded-xl text-lg font-semibold">
            {fee === 0 ? "Join for Free" : `Join • $${fee}`}
          </button>
        ) : (
          <button
            onClick={() => setPaymentOpen(true)}
            className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl shadow-lg hover:opacity-90 transition text-lg font-semibold"
          >
            {fee === 0 ? "Join for Free" : `Join • $${fee}`}
          </button>
        )}
      </div>

      {/* Payment Modal */}
      <PaymentModal
        club={club}
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        amount={fee}
      />

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-3">About the Club</h2>
          <p className="text-gray-300 leading-relaxed">{club.description}</p>
        </motion.div>

        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <Users size={20} /> Members
          </h3>
          <p className="text-4xl font-bold text-purple-300">
            {club.members?.length || 0}
          </p>
        </div>
      </div>

      {/* Location + Email + Fee */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          <h3 className="text-lg text-gray-300 mb-2 flex items-center gap-2">
            <MapPin size={18} /> Location
          </h3>
          <p className="text-white text-xl">{club.location}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          <h3 className="text-lg text-gray-300 mb-2 flex items-center gap-2">
            <Mail size={18} /> Manager Email
          </h3>
          <p className="text-white text-xl break-all">{club.managerEmail}</p>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          <h3 className="text-lg text-gray-300 mb-2">Membership Fee</h3>
          <p className="text-white text-xl">{fee === 0 ? "Free" : `$${fee}`}</p>
        </div>
      </div>

      {/* EVENTS SECTION */}

      <div className="max-w-7xl mx-auto px-4 mt-14">
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent">
          Club Events
        </h2>

        {/* If NOT Member */}
        {isMember !== "active" ? (
          <p className="text-gray-400 text-lg">
            ❗You must be a{" "}
            <span className="text-purple-300 font-semibold">club member</span>{" "}
            to view events.
          </p>
        ) : eventsLoading ? (
          <Loading />
        ) : events?.length === 0 ? (
          <p className="text-gray-400 text-lg">
            No events available for this club.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <motion.div
                key={event._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.04 }}
                className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-xl overflow-hidden relative group"
              >
                {/* IMAGE */}
                <div className="h-48 w-full relative overflow-hidden">
                  <img
                    src={event.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                  <div className="absolute bottom-3 left-3 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs text-gray-200 flex items-center gap-2">
                    <Calendar size={14} />
                    {event.date}
                  </div>

                  <div className="absolute top-3 right-3 bg-purple-600 px-3 py-1 rounded-md text-xs font-semibold shadow-lg">
                    {event.isPaid ? `${event.eventFee} BDT` : "Free"}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition">
                    {event.title}
                  </h3>

                  <p className="text-gray-300 mt-2 text-sm line-clamp-2">
                    {event.description}
                  </p>

                  <div className="grid grid-cols-2 gap-3 mt-4 text-gray-300 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="opacity-80" />
                      <span>{event.location}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Users size={16} className="opacity-80" />
                      <span>
                        {event.maxAttendees
                          ? `${event.maxAttendees} seats`
                          : "Unlimited"}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-white/10">
                    <Link
                      to={`/eventDetails/${event._id}`}
                      className="text-sm text-purple-300 hover:text-purple-400 transition"
                    >
                      View Details
                    </Link>

                    <button className="px-4 py-1.5 btn-club rounded-lg text-white text-sm shadow-md hover:opacity-90 transition">
                      Join Event
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
