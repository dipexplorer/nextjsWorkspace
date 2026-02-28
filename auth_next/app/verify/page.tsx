"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showToken, setShowToken] = useState(false);

  const verifyUserEmail = async () => {
    if (!token) return;

    setIsLoading(true);
    try {
      const res = await axios.post("/api/auth/verifyemail", {
        token: token,
      });

      if (res.status === 200) {
        setIsVerified(true);
        setError("");
      }
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Verification failed. Invalid token."
      );
      console.error("Email verification error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const urlParamsToken = new URLSearchParams(window.location.search).get(
      "token"
    );
    setToken(urlParamsToken || "");
  }, []);

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-lg transform transition-all duration-500 hover:shadow-xl">
        <div className="text-center">
          <div className="mx-auto w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
            {isLoading ? (
              <svg
                className="animate-spin h-10 w-10 text-indigo-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : isVerified ? (
              <svg
                className="h-10 w-10 text-green-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="h-10 w-10 text-red-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <h2 className="text-3xl font-bold text-gray-900">
            Email Verification
          </h2>
        </div>

        {isLoading ? (
          <div className="text-center space-y-4">
            <div className="text-gray-600">Verifying your email address...</div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full animate-pulse"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>
        ) : isVerified ? (
          <div className="text-center space-y-6">
            <div className="text-green-500 text-lg font-medium">
              Email Verified Successfully!
            </div>
            <p className="text-gray-600">
              Your account has been verified. You can now log in and use all
              features.
            </p>
            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue to Login
              <svg
                className="ml-2 w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-red-500 font-medium">
              {error || "Verification failed"}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-left text-sm text-gray-600">
              <p className="mb-2">
                The verification link may have expired or is invalid.
              </p>
              <p>
                Please try again or contact support if the problem persists.
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setShowToken(!showToken)}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium transition-colors"
              >
                {showToken ? "Hide" : "Show"} Debug Information
              </button>

              {showToken && (
                <div className="bg-gray-100 p-3 rounded-lg text-xs font-mono break-all">
                  Token: {token || "Token not found"}
                </div>
              )}
            </div>

            <Link
              href="/login"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          Having trouble?{" "}
          <Link
            href="/contact"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Contact Support
          </Link>
        </p>
      </div>
    </div>
  );
}
