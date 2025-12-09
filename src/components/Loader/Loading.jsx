import React from "react";

export default function Loading() {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      
      {/* Glowing Ring Loader */}
      <div className="relative flex items-center justify-center">
        <div className="loader-spin w-32 h-32 border-4 border-transparent border-t-indigo-500 border-l-purple-500 rounded-full"></div>

        {/* Center Logo/Text */}
        <h1 className="absolute text-2xl font-bold tracking-wide animate-pulse">
          ClubSphere
        </h1>
      </div>

      {/* Subtitle */}
      <p className="mt-6 text-gray-300 text-sm animate-fade">
        Loading the experience...
      </p>

      {/* Animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .loader-spin {
          animation: spin 1.6s linear infinite;
        }

        @keyframes fadeInOut {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }

        .animate-fade {
          animation: fadeInOut 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
