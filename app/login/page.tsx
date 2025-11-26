"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import Loader from "@/components/Loader";

export default function Login() {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if ((user.username || user.email) && user.password) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/login", user);
      console.log(response);

      if (response.status === 200) {
        toast.success("Login Successful");
        // Redirect to home page
        router.push("/profile");
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* ✅ Show loader overlay while registering */}
      {loading && <Loader message="Creating your account..." />}
      {/* Login Card */}
      <div className="relative w-full max-w-md bg-white/30 backdrop-blur-md rounded-3xl shadow-xl p-10 sm:p-12 overflow-hidden">
        {/* Decorative gradient shapes */}
        <div className="absolute -top-16 -left-16 w-36 h-36 bg-gradient-to-tr from-purple-400 via-pink-500 to-orange-400 rounded-full opacity-20 blur-2xl animate-pulse-slow"></div>
        <div className="absolute -bottom-16 -right-16 w-36 h-36 bg-gradient-to-tr from-blue-400 via-teal-400 to-green-300 rounded-full opacity-20 blur-2xl animate-pulse-slow-reverse"></div>

        {/* Form Header */}
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2 text-center tracking-tight">
          Login
        </h1>
        <p className="text-center text-gray-700 mb-8">
          Welcome back! Please login to continue
        </p>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            onLogin();
          }}
        >
          {/* Email */}
          <div className="relative">
            <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl transition-colors duration-300 peer-focus:text-purple-500" />
            <input
              id="email"
              type="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="Email"
              className="peer w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
            <label
              htmlFor="email"
              className="absolute left-12 -top-2 text-gray-500 text-sm bg-white px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-purple-500 peer-focus:text-sm"
            >
              Email
            </label>
          </div>

          {/* Password */}
          <div className="relative">
            <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl transition-colors duration-300 peer-focus:text-purple-500" />
            <input
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="Password"
              className="peer w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 shadow-sm hover:shadow-md"
            />
            <label
              htmlFor="password"
              className="absolute left-12 -top-2 text-gray-500 text-sm bg-white px-1 transition-all duration-300 peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:-top-2 peer-focus:text-purple-500 peer-focus:text-sm"
            >
              Password
            </label>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={buttonDisabled}
            className="mt-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white font-bold py-3 rounded-xl shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 active:scale-95 active:shadow-lg"
          >
            Login
          </Button>
        </form>

        {/* Sign up Link */}
        <p className="mt-6 text-center text-gray-600 text-sm font-medium">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-500 font-bold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
