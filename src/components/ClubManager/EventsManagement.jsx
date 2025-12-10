import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";

export default function EventsManagement() {
  const [events, setEvents] = useState([]);
  const [modal, setModal] = useState({ open: false, type: "", event: null });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, event: null });

  // RHF setup
  const { register, handleSubmit, reset } = useForm();

  // Load events (static for demo)
  useEffect(() => {
    setEvents([
      {
        _id: "e1",
        title: "Tech Conference",
        description: "A meetup for tech enthusiasts.",
        date: "2025-01-20",
        location: "Auditorium Hall",
        isPaid: true,
        eventFee: 200,
        maxAttendees: 100,
      },
      {
        _id: "e2",
        title: "Art Workshop",
        description: "Creative art & craft workshop.",
        date: "2025-02-05",
        location: "Studio A",
        isPaid: false,
        eventFee: 0,
        maxAttendees: 50,
      },
    ]);
  }, []);

  // Open Create / Update modal
  const openEventModal = (type, event = null) => {
    setModal({ open: true, type, event });
    reset(event || {}); // load values into form
  };

  // Save event
  const onSubmit = (data) => {
    if (modal.type === "create") {
      setEvents([...events, { _id: Date.now(), ...data }]);
    } else if (modal.type === "update") {
      setEvents(
        events.map((ev) => (ev._id === modal.event._id ? { ...ev, ...data } : ev))
      );
    }
    setModal({ open: false, type: "", event: null });
  };

  // Delete event
  const handleDelete = () => {
    setEvents(events.filter((ev) => ev._id !== confirmDelete.event._id));
    setConfirmDelete({ open: false, event: null });
  };

  return (
    <div className="p-6 w-full mx-auto">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold">Events Management</h1>

        <button
          onClick={() => openEventModal("create")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          + Create Event
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-white rounded-xl shadow">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Location</th>
              <th className="p-3 border">Paid?</th>
              <th className="p-3 border">Fee</th>
              <th className="p-3 border text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {events.map((event) => (
              <tr key={event._id} className="border-b hover:bg-gray-50">
                <td className="p-3 border font-medium">{event.title}</td>
                <td className="p-3 border">{event.date}</td>
                <td className="p-3 border">{event.location}</td>
                <td className="p-3 border">{event.isPaid ? "Yes" : "No"}</td>
                <td className="p-3 border">{event.eventFee}</td>

                <td className="p-3 border text-center space-x-2">
                  <button
                    onClick={() => openEventModal("update", event)}
                    className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setConfirmDelete({ open: true, event })}
                    className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create / Update Event Modal */}
      <AnimatePresence>
        {modal.open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl w-[400px] shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-bold mb-4">
                {modal.type === "create" ? "Create Event" : "Update Event"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                <input
                  {...register("title")}
                  placeholder="Title"
                  className="w-full p-2 border rounded-lg"
                  required
                />

                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className="w-full p-2 border rounded-lg"
                ></textarea>

                <input
                  type="date"
                  {...register("date")}
                  className="w-full p-2 border rounded-lg"
                  required
                />

                <input
                  {...register("location")}
                  placeholder="Location"
                  className="w-full p-2 border rounded-lg"
                  required
                />

                <div className="flex items-center gap-3">
                  <input type="checkbox" {...register("isPaid")} />
                  <label>Paid Event?</label>
                </div>

                <input
                  type="number"
                  {...register("eventFee")}
                  placeholder="Event Fee"
                  className="w-full p-2 border rounded-lg"
                />

                <input
                  type="number"
                  {...register("maxAttendees")}
                  placeholder="Max Attendees"
                  className="w-full p-2 border rounded-lg"
                  required
                />

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setModal({ open: false, type: "", event: null })}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {modal.type === "create" ? "Create" : "Update"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete.open && (
          <motion.div
            className="fixed inset-0 bg-black/40 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded-xl w-80 shadow-xl"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-bold mb-4">
                Are you sure you want to delete this event?
              </h3>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setConfirmDelete({ open: false, event: null })}
                  className="px-3 py-1 border rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
