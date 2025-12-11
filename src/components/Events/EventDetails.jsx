import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Ticket, CheckCircle2 } from "lucide-react";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loader/Loading";
import useAuth from "../../hooks/useAuth";

export default function EventDetails() {
  const { id } = useParams(); // eventId
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  // Fetch event details
  const { data: event, isLoading } = useQuery({
    queryKey: ["eventDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/eventDetails/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  // Check membership
  const { data: isMember } = useQuery({
    queryKey: ["eventMemberCheck", user?.email, event?.clubId],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/is-member?memberEmail=${user.email}&clubId=${event.clubId}`
      );
      return res.data;
    },
    enabled: !!event?.clubId && !!user?.email,
  });

  // -----------------------------------
  // 🔍 Check if user already joined this event
  // -----------------------------------
  const {
    data: isJoined,
    refetch: refetchJoined,
    isLoading: joinedLoading,
  } = useQuery({
    queryKey: ["eventJoinedCheck", id, user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/events/isJoined?eventId=${id}&userEmail=${user?.email}`
      );
      console.log(res.data)
      return res.data; // "joined" | "not"
    },
    enabled: !!id && !!user?.email,
  });

  console.log(isJoined);

  // -----------------------------
  // 🌟 Join Event Mutation
  // -----------------------------
  const joinEventMutation = useMutation({
    mutationFn: async () => {
      const payload = {
        eventId: event._id,
        clubId: event.clubId,
        userEmail: user?.email,
      };

      const res = await axiosSecure.post("/events/join", payload);
      return res.data;
    },

    onSuccess: async () => {
      await refetchJoined(); // refresh joined status
      alert("🎉 Successfully Joined the Event!");
    },

    onError: () => {
      alert("❌ Something went wrong!");
    },
  });

  if (isLoading) return <Loading />;
  if (!event) return null;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-20 text-white">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-800 p-8 rounded-3xl shadow-xl border border-white/10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {event.title}
        </h1>

        <p className="text-neutral-300 leading-relaxed mb-5">
          {event.description}
        </p>

        {/* EVENT INFO */}
        <div className="grid md:grid-cols-2 gap-4 text-neutral-200">
          <div className="flex items-center gap-3">
            <Calendar className="w-6 h-6 text-emerald-400" />
            <span className="text-lg">
              {new Date(event.date).toDateString()}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-6 h-6 text-yellow-400" />
            <span className="text-lg">{event.location}</span>
          </div>

          <div className="flex items-center gap-3">
            <Users className="w-6 h-6 text-blue-400" />
            <span className="text-lg">
              Max Attendees:{" "}
              <span className="font-semibold">
                {event.maxAttendees || "Unlimited"}
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Ticket className="w-6 h-6 text-pink-400" />
            <span className="text-lg font-semibold">
              {event.isPaid ? `Fee: ${event.eventFee} BDT` : "Free Event"}
            </span>
          </div>
        </div>
      </motion.div>

      {/* JOIN SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-6 flex justify-center"
      >
        {/* Must login */}
        {!user?.email && (
          <p className="text-red-400 text-lg mt-4">
            ⚠ Please login to join this event.
          </p>
        )}
        {/* Must be a club member */}
        {user?.email && isMember === undefined && (
          <p className="text-yellow-400 text-lg mt-4">
            ⚠ You must join the club first to access this event.
          </p>
        )}
        {isMember === "pending" && (
          <p className="text-yellow-300 text-lg mt-4">
            ⏳ Your membership request is pending.
          </p>
        )}
        {/* Loading join status */}
        {isMember === "active" && joinedLoading && (
          <button
            disabled
            className="px-8 py-4 text-lg bg-gray-700 rounded-2xl shadow-lg font-semibold flex items-center gap-2"
          >
            Checking...
          </button>
        )}
        {/* Already joined */}
        {isMember === "active" &&
          isJoined === "registered" &&
          !joinedLoading && (
            <button
              
              className="px-8 py-4 text-lg bg-gray-600 rounded-2xl shadow-lg font-semibold cursor-not-allowed flex items-center gap-2"
            >
              <CheckCircle2 className="w-5 h-5" /> Joined
            </button>
          )}
        {/* Not joined yet */}
        {isMember === "active" && isJoined === "not" && !joinedLoading && (
          <button
            onClick={() => joinEventMutation.mutate()}
            disabled={joinEventMutation.isLoading}
            className="px-8 py-4 text-lg bg-emerald-600 hover:bg-emerald-500 transition rounded-2xl shadow-lg flex items-center gap-2 font-semibold"
          >
            {joinEventMutation.isLoading ? (
              "Joining..."
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" /> Join Event
              </>
            )}
          </button>
        )}
        
      </motion.div>
    </div>
  );
}
