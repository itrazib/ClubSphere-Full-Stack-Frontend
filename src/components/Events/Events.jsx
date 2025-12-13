import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loader/Loading";
import EventCard from "./EventCard";
import { Search, Calendar } from "lucide-react";

const Events = () => {
  const axiosSecure = useAxiosSecure();

  // UI states
  const [search, setSearch] = useState("");
  const [type, setType] = useState("all"); // all | free | paid
  const [time, setTime] = useState("all"); // all | upcoming | past
  const [sort, setSort] = useState("date-asc"); // date-asc | date-desc

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });

  // 🔍 Filter + Search + Sort
  const filteredEvents = useMemo(() => {
    let data = [...events];
    const today = new Date().toISOString().split("T")[0];

    // Search
    if (search) {
      data = data.filter(
        (e) =>
          e.title?.toLowerCase().includes(search.toLowerCase()) ||
          e.location?.toLowerCase().includes(search.toLowerCase()) ||
          e.clubName?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Free / Paid
    if (type === "free") data = data.filter((e) => !e.isPaid);
    if (type === "paid") data = data.filter((e) => e.isPaid);

    // Upcoming / Past
    if (time === "upcoming") data = data.filter((e) => e.date >= today);
    if (time === "past") data = data.filter((e) => e.date < today);

    // Sort
    data.sort((a, b) =>
      sort === "date-asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date)
    );

    return data;
  }, [events, search, type, time, sort]);

  if (isLoading) return <Loading />;

  return (
    <div className="max-w-7xl mx-auto px-4 mt-20 relative z-20">
      {/* ===== Header ===== */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-500 bg-clip-text text-transparent">
          All Events
        </h1>
        <p className="text-gray-600 mt-2">
          Discover upcoming and past events from all clubs
        </p>
      </div>

      {/* ===== Ultra Premium Filters ===== */}
      <div className="relative mb-14">
        {/* Glow background */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 blur-3xl"></div>

        <div
          className="
      relative bg-white/80 backdrop-blur-2xl
      border border-gray-200
      rounded-[32px] p-6
      shadow-[0_20px_60px_rgba(0,0,0,0.12)]
    "
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Explore Events
              </h2>
              <p className="text-sm text-gray-500">
                Filter & discover events that match your interest
              </p>
            </div>

            {/* Count */}
            <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-gray-300 text-pink-600">
              {filteredEvents.length} Events Found
            </span>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
            {/* 🔍 Search */}
            <div className="relative col-span-1 lg:col-span-2">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-600"
              />
              <input
                type="text"
                placeholder="Search events, clubs or locations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
            w-full pl-11 pr-4 py-3 rounded-2xl text-sm
            border border-pink-300
            focus:outline-none focus:ring-2 focus:ring-pink-500
            transition
          "
              />
            </div>

            {/* 🎟 Free / Paid */}
            <div className="flex bg-gray-100 rounded-2xl p-1">
              {["all", "free", "paid"].map((item) => (
                <button
                  key={item}
                  onClick={() => setType(item)}
                  className={`
              flex-1 py-2 text-sm rounded-xl font-medium transition
              ${
                type === item
                  ? "bg-white shadow text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
                >
                  {item === "all" ? "All" : item === "free" ? "Free" : "Paid"}
                </button>
              ))}
            </div>

            {/* ⏰ Time */}
            <div className="flex bg-gray-100 rounded-2xl p-1">
              {["all", "upcoming", "past"].map((item) => (
                <button
                  key={item}
                  onClick={() => setTime(item)}
                  className={`
              flex-1 py-2 text-sm rounded-xl font-medium transition
              ${
                time === item
                  ? "bg-white shadow text-pink-600"
                  : "text-gray-500 hover:text-gray-700"
              }
            `}
                >
                  {item === "all"
                    ? "All"
                    : item === "upcoming"
                    ? "Upcoming"
                    : "Past"}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters */}
          {(search || type !== "all" || time !== "all") && (
            <div className="mt-6 flex flex-wrap gap-2">
              {search && (
                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-pink-600">
                  Search: {search}
                </span>
              )}
              {type !== "all" && (
                <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-600">
                  {type === "free" ? "Free Events" : "Paid Events"}
                </span>
              )}
              {time !== "all" && (
                <span className="px-3 py-1 text-xs rounded-full bg-rose-100 text-rose-600">
                  {time === "upcoming" ? "Upcoming" : "Past"}
                </span>
              )}

              <button
                onClick={() => {
                  setSearch("");
                  setType("all");
                  setTime("all");
                  setSort("date-asc");
                }}
                className="ml-auto text-xs text-gray-500 hover:text-pink-600 transition"
              >
                Clear Filters ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ===== Events Grid ===== */}
      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-400">No events found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
