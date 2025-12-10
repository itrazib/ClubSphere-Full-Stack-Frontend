import { useQuery, } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowLeft, Mail, MapPin, Users } from "lucide-react";
import { useParams, Link } from "react-router";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import {  useState } from "react";
import PaymentModal from "../Dashboard/Modal/PaymentModal";
// import { toast } from "react-toastify";
import Loading from "../Loader/Loading";
// import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function ClubDetails({ onBack }) {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const {user} = useAuth();
  const [paymentOpen, setPaymentOpen] = useState(false);

  const { data: club, isLoading, refetch } = useQuery({
    queryKey: ["clubDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/clubs/${id}`);
      return res.data;
    },
  });

  const {data: isMember} =  useQuery({
    queryKey: ['isMember', user?.email, id],
    queryFn: async () => {
        const res = await axiosSecure.get(`/is-member?memberEmail=${user.email}&clubId=${id}`);
        return res.data;
    },
    enabled: !!user?.email,
  });

 console.log("isMemberData:", isMember);

  

  if(isLoading) return <Loading></Loading>;

  if (!club) return null;

//   const isMember = club?.members?.includes(club?.loggedInUserId);
  const fee = club.membershipFee;



//   const confirmPayment = (method) => joinMutation.mutate(method);

  return (
    <div className="min-h-screen  relative z-20 mt-20 text-white pb-20">

      {/* Top Bar */}
      <div className="p-4 max-w-7xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-400 hover:text-white">
          <ArrowLeft size={20} /> Back
        </button>
      </div>

      {/* Banner Section */}
      <div className="relative h-64 md:h-80 max-w-7xl mx-auto rounded-xl overflow-hidden shadow-xl">
        <img
          src={club.bannerImage}
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40"></div>

        {/* Club Name */}
        <div className="absolute bottom-8 left-8">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text text-transparent drop-shadow-md">
            {club.name}
          </h1>

          <p className="text-gray-300 mt-1">{club.category}</p>
        </div>
      </div>


      {/* Join Button */}
      <div className="max-w-7xl mx-auto flex justify-end mt-6 px-4">
        {/* {!isMember ? (
          <button
            
            className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                     rounded-xl shadow-lg hover:opacity-90 transition text-lg font-semibold"
          >
            {fee === 0 ? "Join for Free" : `Join • $${fee}`}
          </button>
        ) : (
          <button className="px-10 py-3 bg-green-600 rounded-xl text-lg font-semibold">
            ✔ Member
          </button>
        )} */}
        {
            isMember === 'pending' ? (
                <button className="px-10 py-3 bg-yellow-500 rounded-xl text-lg font-semibold">
                ⏳ Pending Approval     
                </button>
            ) : isMember === 'active' ? (
                <button className="px-10 py-3 bg-green-600 rounded-xl text-lg font-semibold">
                ✔ Member
                </button>
            ) : (
                <button
                onClick={() => setPaymentOpen(true)}    
                className="px-10 py-3 bg-gradient-to-r from-purple-600 to-pink-600 
                         rounded-xl shadow-lg hover:opacity-90 transition text-lg font-semibold"
              >     
                {fee === 0 ? "Join for Free" : `Join • $${fee}`}
              </button>
            )
        }
      </div>

      <PaymentModal
        club={club}
        open={paymentOpen}
        onClose={() => setPaymentOpen(false)}
        amount={fee}
        
      />

      {/* Information Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10 grid md:grid-cols-3 gap-6">

        {/* About Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-2 p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg"
        >
          <h2 className="text-2xl font-semibold mb-3">About the Club</h2>
          <p className="text-gray-300 leading-relaxed">
            {club.description}
          </p>
        </motion.div>

        {/* Members Card */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          <h3 className="text-xl font-semibold flex items-center gap-2 mb-3">
            <Users size={20} /> Members
          </h3>
          <p className="text-4xl font-bold text-purple-300">{club.members?.length || 0}</p>
        </div>

      </div>


      {/* More Details */}
      <div className="max-w-7xl mx-auto px-4 mt-8 grid md:grid-cols-3 gap-6">

        {/* Location */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          <h3 className="text-lg text-gray-300 mb-2 flex items-center gap-2">
            <MapPin size={18} /> Location
          </h3>
          <p className="text-white text-xl">{club.location}</p>
        </div>

        {/* Manager Email */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          <h3 className="text-lg text-gray-300 mb-2 flex items-center gap-2">
            <Mail size={18} /> Manager Email
          </h3>
          <p className="text-white text-xl break-all">{club.managerEmail}</p>
        </div>

        {/* Membership Fee */}
        <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-lg">
          <h3 className="text-lg text-gray-300 mb-2">Membership Fee</h3>
          <p className="text-white text-xl">
            {fee === 0 ? "Free" : `$${fee}`}
          </p>
        </div>

      </div>
    </div>
  );
}
