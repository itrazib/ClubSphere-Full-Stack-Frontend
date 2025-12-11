import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imageUpload } from "../../utils";
import { Description } from "@headlessui/react";

export default function ManageEvents() {
  const [selectedClub, setSelectedClub] = useState(null);
  const [modal, setModal] = useState({ open: false, type: "", event: null });
  const [confirmDelete, setConfirmDelete] = useState({
    open: false,
    event: null,
  });

  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // ----------------------------------------------------------
  // LOAD MANAGED CLUBS
  // ----------------------------------------------------------
  const { data: myClubs = [] } = useQuery({
    queryKey: ["managedClubs"],
    queryFn: async () => {
      const res = await axiosSecure.get("/clubs/approved");
      return res.data;
    },
  });

  // ----------------------------------------------------------
  // LOAD EVENTS FOR SELECTED CLUB
  // ----------------------------------------------------------
  const {
    data: events = [],
    refetch: refetchEvents,
    isLoading,
  } = useQuery({
    queryKey: ["events", selectedClub],
    enabled: !!selectedClub,
    queryFn: async () => {
      const res = await axiosSecure.get(`/events/${selectedClub}`);
      return res.data;
    },
  });

  // ----------------------------------------------------------
  // CREATE EVENT
  // ----------------------------------------------------------
  const createEvent = useMutation({
    mutationFn: async (eventData) => {
      return await axiosSecure.post(`/events/${selectedClub}`, eventData);
    },
    onSuccess: () => {
      refetchEvents();
      setModal({ open: false, type: "", event: null });
    },
  });

  // ----------------------------------------------------------
  // UPDATE EVENT
  // ----------------------------------------------------------
  const updateEvent = useMutation({
    mutationFn: async ({ id, data }) => {
      return await axiosSecure.patch(`/events/${id}`, data);
    },
    onSuccess: () => {
      refetchEvents();
      setModal({ open: false, type: "", event: null });
    },
  });

  // ----------------------------------------------------------
  // DELETE EVENT
  // ----------------------------------------------------------
  const deleteEvent = useMutation({
    mutationFn: async (id) => {
      return await axiosSecure.delete(`/events/${id}`);
    },
    onSuccess: () => {
      refetchEvents();
      setConfirmDelete({ open: false, event: null });
    },
  });

  // ----------------------------------------------------------
  // OPEN MODAL (CREATE/UPDATE)
  // ----------------------------------------------------------
  const openEventModal = (type, event = null) => {
    console.log(event)
    setModal({ open: true, type, event });
    reset(event || {});
  };

  // ----------------------------------------------------------
  // FORM SUBMIT HANDLER
  // ----------------------------------------------------------
  const onSubmit = async(data) => {
    const {title, description, image, date,location, isPaid, eventFee,maxAttendees,clubId,createdAt,updateAt} = data

    const imageFile = image[0]

    const imageUrl = await imageUpload(imageFile)
    console.log(imageUrl)
    console.log(data)
    if (!selectedClub) return alert("Select a club first!");

    if (modal.type === "create") {
      createEvent.mutate({title, description, image:imageUrl, date,location, isPaid, eventFee,maxAttendees,clubId,createdAt,updateAt});
    } else {
      updateEvent.mutate({ id: modal.event._id, data });
    }
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-2xl font-bold mb-4">Events Management</h1>

      {/* -------- CLUB SELECT -------- */}
      <div className="mb-6">
        <label className="font-semibold">Select Club:</label>
        <select
          className="border p-2 ml-3 rounded-lg"
          onChange={(e) => setSelectedClub(e.target.value)}
        >
          <option value="">-- Choose a Club --</option>

          {myClubs.map((club) => (
            <option key={club._id} value={club._id}>
              {club.name}
            </option>
          ))}
        </select>
      </div>

      {!selectedClub && (
        <p className="text-gray-500">Please select a club to manage events.</p>
      )}

      {selectedClub && (
        <>
          <button
            onClick={() => openEventModal("create")}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            + Create Event
          </button>

          {/* -------- EVENTS TABLE -------- */}
          <div className="overflow-x-auto mt-6">
            {isLoading ? (
              <p>Loading events...</p>
            ) : (
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
                      <td className="p-3 border">{event.title}</td>
                      <td className="p-3 border">{event.date}</td>
                      <td className="p-3 border">{event.location}</td>
                      <td className="p-3 border">
                        {event.isPaid ? "Yes" : "No"}
                      </td>
                      <td className="p-3 border">{event.eventFee}</td>

                      <td className="p-3 border text-center space-x-2">
                        <button
                          onClick={() => openEventModal("update", event)}
                          className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            setConfirmDelete({ open: true, event })
                          }
                          className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}

      {/* -------- CREATE/UPDATE MODAL -------- */}
      <AnimatePresence>
        {modal.open && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <motion.div className="bg-white p-6 rounded-xl w-[400px] shadow-xl">
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

                <div>
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-medium text-gray-700"
                  >
                    Profile Image
                  </label>
                  <input
                    name="image"
                    type="file"
                    id="image"
                    accept="image/*"
                    className="block w-full text-sm text-gray-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-md file:border-0
      file:text-sm file:font-semibold
      file:bg-lime-50 file:text-lime-700
      hover:file:bg-lime-100
      bg-gray-100 border border-dashed border-lime-300 rounded-md cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400
      py-2"
                    {...register("image")}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    PNG, JPG or JPEG (max 2MB)
                  </p>
                </div>

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
                    onClick={() =>
                      setModal({ open: false, type: "", event: null })
                    }
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

      {/* -------- DELETE MODAL -------- */}
      <AnimatePresence>
        {confirmDelete.open && (
          <motion.div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <motion.div className="bg-white p-6 rounded-xl w-80 shadow-xl">
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
                  onClick={() => deleteEvent.mutate(confirmDelete.event._id)}
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
