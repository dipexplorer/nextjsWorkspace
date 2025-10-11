// profile/page.tsx
"use client";
import React, { useState } from "react";
import { FiEdit, FiLogOut, FiCamera } from "react-icons/fi";

export default function ProfilePage() {
  const [user, setUser] = useState({
    username: "John Doe",
    email: "john@example.com",
    bio: "Web Developer | Designer | Tech Enthusiast",
  });

  const handleEdit = () => {
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    alert("Logged out!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 p-8 relative">
          <h1 className="text-white text-3xl font-extrabold">My Profile</h1>
          <p className="text-white/90 mt-1">
            Manage your account and personal information
          </p>
        </div>

        <div className="p-8 flex flex-col md:flex-row md:gap-12">
          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8 md:mb-0">
            <div className="relative group">
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Profile"
                className="w-36 h-36 md:w-40 md:h-40 rounded-full border-4 border-white shadow-xl object-cover transition-all duration-300 group-hover:scale-105"
              />
              <button
                onClick={handleEdit}
                className="absolute bottom-0 right-0 bg-purple-500 text-white p-3 rounded-full shadow-lg hover:bg-purple-600 transition-all opacity-0 group-hover:opacity-100"
              >
                <FiCamera />
              </button>
            </div>
            <h2 className="mt-4 text-2xl font-bold text-gray-900">
              {user.username}
            </h2>
            <p className="text-gray-500 mt-1">{user.email}</p>
          </div>

          {/* User Details */}
          <div className="flex-1">
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                About Me
              </h3>
              <p className="text-gray-600 mb-6">{user.bio}</p>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="text-gray-700 font-medium">Username</label>
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) =>
                      setUser({ ...user, username: e.target.value })
                    }
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({ ...user, email: e.target.value })
                    }
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>

                <div>
                  <label className="text-gray-700 font-medium">Bio</label>
                  <textarea
                    value={user.bio}
                    onChange={(e) => setUser({ ...user, bio: e.target.value })}
                    rows={4}
                    className="mt-2 w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex justify-end gap-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-red-600 transition-all"
                >
                  <FiLogOut /> Logout
                </button>
                <button
                  onClick={handleEdit}
                  className="bg-purple-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-purple-600 transition-all"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
