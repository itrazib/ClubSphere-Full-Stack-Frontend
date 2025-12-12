import { useQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loader/Loading";
import { ClubCard } from "./ClubCard";
import { SlidersHorizontal } from "lucide-react";

export default function Clubs() {
  const axiosSecure = useAxiosSecure();

  // ---------- UI States ----------
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");

  // ---------- Fetch Clubs ----------
  const { data: clubs = [], isLoading } = useQuery({
    queryKey: ["clubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  // ---------- Unique Categories ----------
  const categories = ["all", ...new Set(clubs.map((c) => c.category))];

  // ---------- Filter + Search + Sort ----------
  const filteredClubs = useMemo(() => {
    let data = [...clubs];

    // Search
    const searchText = search?.toLowerCase() || "";
    if (searchText.trim() !== "") {
      data = data.filter((club) =>
        club?.name?.toLowerCase().includes(searchText)
      );
    }

    // Category Filter
    if (category !== "all") {
      data = data.filter((club) => club.category === category);
    }

    // Sorting
    if (sort === "latest") {
      data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sort === "oldest") {
      data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sort === "members-high") {
      data.sort((a, b) => b.membersCount - a.membersCount);
    } else if (sort === "members-low") {
      data.sort((a, b) => a.membersCount - b.membersCount);
    }

    return data;
  }, [clubs, search, category, sort]);

  // Reset filters
  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("latest");
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto px-4">

      {/* ------------------------------------ */}
      {/*    Stats Panel */}
      {/* ------------------------------------ */}
      <div className="bg-white shadow-md rounded-2xl p-5 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-lg font-semibold">
          Showing <span className="text-blue-600">{filteredClubs.length}</span>{" "}
          of {clubs.length} clubs
        </h2>

        <button
          onClick={clearFilters}
          className="px-4 py-2 text-sm rounded-lg border hover:bg-gray-100 transition"
        >
          Reset Filters
        </button>
      </div>

      {/* ------------------------------------ */}
      {/* Search + Filters Bar */}
      {/* ------------------------------------ */}
      <div className="bg-white shadow-md p-5 rounded-2xl mb-10">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search clubs..."
            className="w-full lg:w-1/3 p-3 border rounded-xl focus:ring focus:ring-blue-100"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {/* Sort */}
          <div className="flex items-center gap-3 w-full lg:w-auto">
            <SlidersHorizontal className="text-gray-600" />
            <select
              className="p-3 border rounded-xl w-full lg:w-auto"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="latest">Latest Created</option>
              <option value="oldest">Oldest Created</option>
              <option value="members-high">Members: High → Low</option>
              <option value="members-low">Members: Low → High</option>
            </select>
          </div>
        </div>

        {/* Category Chips */}
        <div className="flex flex-wrap gap-3 mt-5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                category === cat
                  ? "bg-blue-600 text-white shadow"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {cat === "all" ? "All Categories" : cat}
            </button>
          ))}
        </div>
      </div>

      {/* ------------------------------------ */}
      {/* Cards Grid */}
      {/* ------------------------------------ */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredClubs.length ? (
          filteredClubs.map((club) => (
            <ClubCard key={club._id} club={club} />
          ))
        ) : (
          <div className="text-center col-span-3 py-10">
            <img
              src="https://i.ibb.co/VmGQNW3/empty.png"
              alt="empty"
              className="w-40 mx-auto opacity-70"
            />
            <p className="text-gray-600 mt-4 text-lg">
              No clubs match your search/filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
