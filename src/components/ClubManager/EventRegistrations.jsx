import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Users, CalendarCheck, ChevronRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loader/Loading";

export default function EventRegistrations() {
  // const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const axiosSecure  = useAxiosSecure()
 
  const { data: events = [], isLoading} = useQuery({
    queryKey: ["events"],
    queryFn: async () => {
      const res = await axiosSecure.get("/events");
      return res.data;
    },
  });
  console.log(events)

  // Load registrations
  const loadRegistrations = async(eventId) => {
    setSelectedEvent(eventId);

   try {
      const res = await axiosSecure.get(`/eventRegister/${eventId}`);
      setRegistrations(res.data);
    } catch (error) {
      console.error("Error loading members:", error);
    }
    

    // setRegistrations([
    //   {
    //     _id: "r1",
    //     userEmail: "john@example.com",
    //     status: "registered",
    //     registeredAt: "2025-01-12",
    //   },
    //   {
    //     _id: "r2",
    //     userEmail: "emily@example.com",
    //     status: "cancelled",
    //     registeredAt: "2025-01-14",
    //   },
    //   {
    //     _id: "r3",
    //     userEmail: "michael@example.com",
    //     status: "registered",
    //     registeredAt: "2025-01-18",
    //   },
    // ]);
  };

  if(isLoading)
    return <Loading/>

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Users size={30} className="text-purple-600" />
        Event Registrations
      </h1>

      {/* EVENTS LIST */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {events.map((ev) => (
          <motion.div
            key={ev._id}
            whileHover={{ scale: 1.03 }}
            className="p-5 bg-white rounded-2xl shadow-md border cursor-pointer hover:shadow-xl transition-all"
            onClick={() => loadRegistrations(ev._id)}
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">{ev.title}</h2>
              <ChevronRight className="text-gray-500" />
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
              <CalendarCheck size={16} />
              {ev.date}
            </div>
          </motion.div>
        ))}
      </div>

      {/* SELECTED EVENT TITLE */}
      {selectedEvent && (
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-bold mb-4"
        >
          Registrations for:{" "}
          <span className="text-purple-600">
            {events.find((ev) => ev._id === selectedEvent)?.title}
          </span>
        </motion.h2>
      )}

      {/* REGISTRATION TABLE */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg border"
        >
          {/* Empty State */}
          {registrations.length === 0 ? (
            <p className="text-gray-500 text-center py-10">
              No registrations found for this event.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3 border">Email</th>
                    <th className="p-3 border">Status</th>
                    <th className="p-3 border">Registered At</th>
                  </tr>
                </thead>

                <tbody>
                  {registrations.map((reg) => (
                    <tr key={reg._id} className="hover:bg-gray-50 transition">
                      <td className="p-3 border">{reg.userEmail}</td>

                      <td className="p-3 border">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            reg.status === "registered"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {reg.status}
                        </span>
                      </td>

                      <td className="p-3 border">{new Date(reg.registerAt).toDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
