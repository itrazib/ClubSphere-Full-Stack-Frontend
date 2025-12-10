import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function EventRegistrations() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [registrations, setRegistrations] = useState([]);

  // Load events (static demo)
  useEffect(() => {
    setEvents([
      { _id: "1", title: "Tech Conference 2025" },
      { _id: "2", title: "Creative Art Workshop" },
    ]);
  }, []);

  // Load registrations for selected event
  const loadRegistrations = (eventId) => {
    setSelectedEvent(eventId);

    // Later replace with API
    setRegistrations([
      {
        _id: "r1",
        userEmail: "john@example.com",
        status: "registered",
        registeredAt: "2025-01-12",
      },
      {
        _id: "r2",
        userEmail: "emily@example.com",
        status: "cancelled",
        registeredAt: "2025-01-14",
      },
      {
        _id: "r3",
        userEmail: "michael@example.com",
        status: "registered",
        registeredAt: "2025-01-18",
      },
    ]);
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Event Registrations</h1>

      {/* Event List */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {events.map((ev) => (
          <motion.div
            key={ev._id}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={() => loadRegistrations(ev._id)}
            className="p-5 bg-white rounded-2xl shadow-md border cursor-pointer hover:shadow-xl"
          >
            <h2 className="text-lg font-semibold">{ev.title}</h2>
          </motion.div>
        ))}
      </div>

      {/* Registrations Table */}
      {selectedEvent && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-2xl shadow-lg border"
        >
          <h2 className="text-xl font-bold mb-4">Registered Users</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border">Email</th>
                  <th className="p-3 border">Status</th>
                  <th className="p-3 border">Registered At</th>
                </tr>
              </thead>

              <tbody>
                {registrations.map((reg) => (
                  <tr key={reg._id} className="border-b hover:bg-gray-50">
                    <td className="p-3 border">{reg.userEmail}</td>

                    {/* Status Badge */}
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

                    <td className="p-3 border">{reg.registeredAt}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}
    </div>
  );
}
