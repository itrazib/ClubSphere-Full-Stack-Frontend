import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Loading from "../Loader/Loading";
import useAuth from "../../hooks/useAuth";

export default function MyEvents() {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const { data: myEvents = [], isLoading } = useQuery({
    queryKey: ["my-events", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/my-events?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl mb-5 font-bold">My Events</h2>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white rounded-xl shadow-md">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4 font-medium">Event Title</th>
              <th className="p-4 font-medium">Club</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {myEvents.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-6 text-gray-500">
                  You haven't registered for any events.
                </td>
              </tr>
            ) : (
              myEvents.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-50 transition">
                  <td className="p-4 font-semibold">{event.title}</td>
                  <td className="p-4">{event.clubName}</td>
                  <td className="p-4">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        event.status === "registered"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {myEvents.length === 0 ? (
          <p className="text-center p-4 text-gray-500">
            You haven't registered for any events.
          </p>
        ) : (
          myEvents.map((event) => (
            <div
              key={event._id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <h3 className="font-bold text-lg mb-1">{event.title}</h3>

              <p className="text-sm text-gray-600">
                <span className="font-semibold">Club:</span> {event.clubName}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>

              <p className="mt-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    event.status === "registered"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {event.status}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
