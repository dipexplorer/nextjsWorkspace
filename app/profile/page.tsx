// profile/page.tsx
"use client";

import React, { useState } from "react";
import { FiEdit, FiLogOut, FiCamera } from "react-icons/fi";
import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EmailType, sendEmail } from "@/helpers/mailer";

export default function ProfilePage() {
  const router = useRouter();
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
      const response = await axios.get("/api/auth/currentuser", {});
      setUser(response.data.user);
      console.log("Fetched user:", response.data.user);
    } catch (error: any) {
      console.error(error.message);
      toast.error("Failed to fetch user data");
    }
  };

  const handleEdit = async () => {
    try {
      const res = await axios.put("/api/auth/updateinfo", {
        username: user.username,
        email: user.email,
      });
      if (res.status == 200) {
        toast.success("Profile updated successfully!");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout");
      toast.success("Logged out successfully!");
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const resetPassword = async () => {
    try {
      const res = await axios.post("/api/auth/resetPassword", {
        email: user.email,
      });
      if (res.status == 200) {
        toast.success("Password reset link sent to your email");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-orange-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r text-center from-purple-500 via-pink-500 to-orange-400 p-8 relative">
          <h1 className="text-white text-3xl font-extrabold">My Profile</h1>
          <p className="text-white/90 mt-1">
            Manage your account and personal information
          </p>
          <h3 className="mt-3 text-white text-lg font-semibold">
            {user && user.username ? (
              <Link
                href={`/profile/${user._id}`}
                className="underline hover:text-purple-200 transition-all"
              >
                {user.username}
              </Link>
            ) : (
              "User not found"
            )}
          </h3>
        </div>

        <div className="p-8 flex flex-col md:flex-row md:gap-12">
          {/* User Details */}
          <div className="flex-1">
            <div className="bg-white/40 backdrop-blur-md p-8 rounded-2xl shadow-lg">
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
              </div>

              {/* Buttons */}
              <div className="mt-8 flex justify-center gap-4">
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
                {/* RESET PASSWORD */}
                <button
                  onClick={resetPassword}
                  className="bg-orange-500 text-white px-6 py-3 rounded-xl shadow-lg hover:bg-orange-600 transition-all"
                >
                  Reset Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
