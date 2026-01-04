import React, { useState } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/logo-removebg-preview.png"

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const {user, logOut} = useAuth()

  return (
    <nav className="w-full fixed top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          <img src={logo} className="h-15 w-18" alt="" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/clubs" className="hover:text-indigo-600">Clubs</Link>
          <Link to="/events" className="hover:text-indigo-600">Events</Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-indigo-600">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 btn-club  text-white rounded-xl  transition"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative group cursor-pointer">
              <img
                src={user.photoURL || "https://i.ibb.co/4pDNDK1/avatar.png"}
                className="w-10 h-10 rounded-full border"
              />

              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-xl 
              opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto 
              transition p-2">
                {/* <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Profile
                </Link> */}
                <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Dashboard
                </Link>
                <button onClick={logOut} className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-white border-t p-4 flex flex-col gap-4 text-gray-700 font-medium">
          <Link to="/" className="hover:text-indigo-600">Home</Link>
          <Link to="/clubs" className="hover:text-indigo-600">Clubs</Link>
          <Link to="/events" className="hover:text-indigo-600">Events</Link>

          {!user ? (
            <>
              <Link to="/login" className="hover:text-indigo-600">Login</Link>
              <Link
                to="/signup"
                className="px-4 py-2 btn-club text-white rounded-xl transition w-fit"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link to="/profile" className="hover:text-indigo-600">Profile</Link>
              <Link to="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
              <button className="text-left hover:text-indigo-600">Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
