// app/profile/[id]/page.tsx\

"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UserProfile({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params); // ✅ unwrap the promise
  const [user, setUser] = useState({
    username: "",
    email: "",
    _id: "",
  });

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/auth/currentuser");
      setUser(response.data.user);
      console.log("Fetched user:", response.data.user);
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to fetch user data");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/40 backdrop-blur-lg rounded-3xl shadow-2xl p-10 text-center">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 py-8 px-6 rounded-2xl mb-8 shadow-md">
          <h1 className="text-white text-4xl font-extrabold mb-1">
            User Profile
          </h1>
          <p className="text-white/90 text-sm">
            View user information and details
          </p>
        </div>

        {/* User Info Section */}
        <div className="flex flex-col items-center space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">User ID</h2>
            <p className="text-gray-600 break-all">{id}</p>
            <div className="h-28 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shadow-lg text-white text-3xl font-bold">
              {user.username}
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link
              href={`/profile`}
              className="px-6 py-3 bg-purple-500 text-white rounded-xl shadow-md hover:bg-purple-600 transition-all"
            >
              Back to My Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
