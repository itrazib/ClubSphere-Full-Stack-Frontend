import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function HeroSection() {
  const words = ["Discover.", "Connect.", "Grow."];
  const [index, setIndex] = useState(0);

  // Text highlight animation
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[55vh] flex items-center justify-center text-center px-6 mt-20 overflow-hidden">
      
      {/* Animated Gradient Blobs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-pulse"></div>

      {/* Hero Content */}
      <div className="relative max-w-4xl animate-fadeIn">
        
        {/* Highlight Text Animation */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          <span className="text-gradient">
            {words[index]}
          </span>{" "}
          Join the ClubSphere community.
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-700 dark:text-gray-300">
          Explore clubs, meet new people, and be part of something bigger.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          
          {/* Premium Gradient Button */}
         <Link to="/clubs"> <button className="px-7 py-3 rounded-xl text-white font-semibold shadow-lg btn-club">
            Join a Club
          </button></Link>

          {/* Glass Button */}
          <button className="px-7 py-3 rounded-xl font-semibold backdrop-blur-md border border-white/30 bg-white/10 text-gray-900 dark:text-white shadow-md hover:bg-white/20 transition-all duration-300">
            Create a Club
          </button>

        </div>
      </div>
    </section>
  );
}
