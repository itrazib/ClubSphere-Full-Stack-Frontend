import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { ClubCard } from "./ClubCard";
import { Search } from "lucide-react";
import ClubSkeleton from "./ClubSkeleton";

export default function Clubs() {
  const axiosSecure = useAxiosSecure();

  // ================= UI STATES =================
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  // ================= FETCH CLUBS =================
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["approvedClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  // ================= UNIQUE CATEGORIES =================
  const categories = useMemo(() => {
    return ["all", ...new Set(clubs.map((c) => c.category).filter(Boolean))];
  }, [clubs]);

  // ================= FILTER + SORT =================
  const filteredClubs = useMemo(() => {
    let data = [...clubs];

    if (search.trim()) {
      data = data.filter((club) =>
        club?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "all") {
      data = data.filter((club) => club.category === category);
    }

    if (sort === "latest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    if (sort === "oldest") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    }
    if (sort === "members-high") {
      data.sort((a, b) => (b.membersCount || 0) - (a.membersCount || 0));
    }
    if (sort === "members-low") {
      data.sort((a, b) => (a.membersCount || 0) - (b.membersCount || 0));
    }

    return data;
  }, [clubs, search, category, sort]);

  return (
    <div className="max-w-7xl mx-auto px-4 mt-30">
      <title>Clubs</title>

      {/* ================= PAGE HEADER ================= */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold text-gradient">
          Discover Student Clubs
        </h1>
        <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
          Explore approved clubs, filter by category and find communities that
          match your passion.
        </p>
      </div>

      {/* ================= PREMIUM FILTER BAR ================= */}
      <div className="relative mb-14">

        {/* Glow */}
        <div className="absolute inset-0 rounded-[32px] bg-gradient-to-r from-indigo-200/40 via-purple-200/40 to-pink-200/40 blur-3xl"></div>

        {/* Glass Card */}
        <div className="relative bg-white/80 backdrop-blur-2xl border border-gray-200 rounded-[32px] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-black">
                Explore Clubs
              </h2>
              <p className="text-sm text-gray-500">
                Filter & discover clubs that match your interest
              </p>
            </div>

            <span className="px-4 py-1.5 rounded-full text-sm font-semibold bg-indigo-100 text-pink-600">
              {filteredClubs.length} Clubs Found
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
                placeholder="Search clubs by name..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-2xl text-sm border border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              />
            </div>

            {/* 🏷 Categories */}
            <div className="flex bg-gray-100 rounded-2xl p-1">
              {categories.slice(0, 3).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`flex-1 py-2 text-sm rounded-xl font-medium transition ${
                    category === cat
                      ? "bg-white shadow text-pink-600"
                      : "text-gray-500 hover:text-pink-700"
                  }`}
                >
                  {cat === "all" ? "All" : cat}
                </button>
              ))}
            </div>

            {/* 🔃 Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="w-full rounded-2xl border border-pink-500 px-4 py-3 text-sm focus:ring-2 focus:ring-pink-500"
            >
              <option value="latest">Latest Created</option>
              <option value="oldest">Oldest Created</option>
              <option value="members-high">Members: High → Low</option>
              <option value="members-low">Members: Low → High</option>
            </select>
          </div>

          {/* Active Filters */}
          {(search || category !== "all") && (
            <div className="mt-6 flex flex-wrap gap-2">
              {search && (
                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-pink-600">
                  Search: {search}
                </span>
              )}
              {category !== "all" && (
                <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-pink-600">
                  Category: {category}
                </span>
              )}

              <button
                onClick={() => {
                  setSearch("");
                  setCategory("all");
                  setSort("latest");
                }}
                className="ml-auto text-xs text-pink-500 hover:text-pink-600 transition"
              >
                Clear Filters ✕
              </button>
            </div>
          )}
        </div>
      </div>

      {/* ================= CLUB GRID ================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading
          ? Array.from({ length: 6 }).map((_, i) => (
              <ClubSkeleton/>
            ))
          : filteredClubs.map((club) => (
              <ClubCard key={club._id} club={club} />
            ))}
      </div>
    </div>
  );
}
