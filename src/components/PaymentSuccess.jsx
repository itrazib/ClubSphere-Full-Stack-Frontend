// src/pages/PaymentSuccess.jsx
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useEffect } from "react";
import { Link, useSearchParams } from "react-router";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams()
    const sessionId = searchParams.get('session_id')
    console.log("Payment session ID:", sessionId);

     useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      })
    }
  }, [sessionId])
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0b0b] text-white p-6">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="bg-white/5 border border-white/10 rounded-2xl p-10 shadow-2xl max-w-md w-full text-center"
      >
        
        {/* Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 12 }}
          className="flex justify-center mb-6"
        >
          <div className="w-20 h-20 rounded-full bg-green-600/20 flex items-center justify-center">
            <CheckCircle size={58} className="text-green-400" />
          </div>
        </motion.div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-2">Payment Successful</h1>

        {/* Message */}
        <p className="text-gray-300 mb-8">
          Thank you! Your payment has been completed successfully.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          
          <Link
            to="/clubs"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition text-white font-medium"
          >
            Go to Dashboard
          </Link>

          <Link
            to="/"
            className="w-full py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg transition text-white font-medium"
          >
            Back to Home
          </Link>

        </div>

      </motion.div>

    </div>
  );
}
