import React from "react";
import { Link } from "react-router";

export default function Error() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4">
      
      <div className="text-center backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-3xl shadow-xl animate-floating">
        
        <h1 className="text-7xl md:text-9xl font-extrabold text-indigo-500 drop-shadow-lg">
          404
        </h1>

        <p className="text-xl md:text-2xl mt-4 text-gray-300">
          Oops! The page you’re looking for doesn’t exist.
        </p>

        <p className="text-gray-400 mt-2">
          It may have been moved, deleted, or never existed.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-indigo-600 hover:bg-indigo-700 
          transition text-white rounded-xl text-lg shadow-md"
        >
          Go Back Home
        </Link>
      </div>

      {/* Floating animation */}
      <style>{`
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-floating {
          animation: floating 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
