import { motion } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";

export default function PaymentModal({club, open, onClose, amount, onConfirm }) {

    const {user} = useAuth();

    const { _id, name, bannerImage, description, membershipFee} = club;
  const handlePayment = async () => {
    const paymentInfo = {
      clubId: _id,
      name,
      description,
      bannerImage,
      quantity: 1,
      membershipFee,
      member: {
        name: user?.displayName,
        email: user?.email,
        image: user?.photoURL,
      },
    };
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/create-checkout-session`,
      paymentInfo
    );
    window.location.href = data.url;
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#111] text-white rounded-2xl p-6 w-[90%] max-w-md border border-white/10 shadow-xl"
      >
        <h2 className="text-xl font-semibold">Complete Payment</h2>
        <p className="text-gray-300 mt-2">
          Pay <span className="text-blue-400 font-bold">${amount}</span> to join
          the club.
        </p>

        <div className="mt-5 space-y-3">
          <button
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-xl font-medium"
            onClick={() => handlePayment()}
          >
            Pay with Stripe
          </button>

          <button
            className="w-full py-2 bg-gray-600 hover:bg-gray-700 rounded-xl font-medium"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
}
