import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Loading from "../Loader/Loading";

export default function MemberClubs() {
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();


  const { data: myClubs = [], isLoading } = useQuery({
    queryKey: ["my-clubs", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/member/my-clubs?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <Loading/>;

  return (
    <div className="w-full">
      {/* Page Title */}
      <h2 className="text-2xl font-semibold mb-5">My Clubs</h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {myClubs.length === 0 ? (
          <p className="col-span-full text-gray-500 text-center py-10">
            You have not joined any clubs yet.
          </p>
        ) : (
          myClubs.map((club) => (
            <a
              href={`/clubs/${club.clubId}`}
              key={club.clubId}
              className="group p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all border hover:border-blue-500 cursor-pointer"
            >
              {/* Club Name */}
              <h3 className="text-xl font-bold group-hover:text-blue-600 transition">
                {club.clubName}
              </h3>

              {/* Location */}
              <p className="text-gray-600 mt-1">
                📍 <span className="font-medium">{club.location || "N/A"}</span>
              </p>

              {/* Membership Status */}
              <p className="mt-3">
                <span className="text-sm px-3 py-1 rounded-full bg-green-100 text-green-700">
                  {club.status === "active" ? "Active" : "Expired"}
                </span>
              </p>

              {/* Expiry Date */}
              <p className="mt-3 text-gray-700 text-sm">
                Expiry:{" "}
                <span className="font-medium">
                  {club.expiryDate
                    ? new Date(club.expiryDate).toLocaleDateString()
                    : "No expiry"}
                </span>
              </p>
            </a>
          ))
        )}
      </div>
    </div>
  );
}
