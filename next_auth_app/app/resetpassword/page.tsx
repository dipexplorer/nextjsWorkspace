"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router = useRouter();

    const resetPassword = async () => {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const verifiedUser = await axios.post(
                "/api/user/resetpassword/confirm",
                {
                    token,
                    password,
                },
            );

            if (verifiedUser.data.success) {
                alert("Password reset successfully");
                router.push("/login");
            } else {
                alert(verifiedUser.data.message);
            }
        } catch (err: any) {
            console.log(err.response.data);
        }
    };

    // on page reload we get the token from the url, and stored it in urlToken
    useEffect(() => {
        // const urlToken = window.location.search.split("=")[1];
        const params = new URLSearchParams(window.location.search);
        const urlToken = params.get("token");

        /*

            Now imagine a real production URL:
            http://localhost:3000/resetpassword?token=abc123&type=reset
            Now run your logic:
            "?token=abc123&type=reset".split("=")
            Result:
            ["?token", "abc123&type", "reset"]
            Now [1] becomes:
            abc123&type
            ❌ Wrong token.

            Why URLSearchParams works
            const params = new URLSearchParams(window.location.search);
            const urlToken = params.get("token");
            URLSearchParams properly parses query parameters.
            Example:
            ?type=reset&token=abc123
            Internally it becomes:
            {
            type: "reset",
            token: "abc123"
            }
            Now:
            params.get("token")
            returns:
            abc123

        */
        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
            <p className="text-gray-500 mb-4">Please enter your new password</p>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="password"
                >
                    New Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="confirmPassword"
                >
                    Confirm Password
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={resetPassword}
            >
                Reset Password
            </button>
            <Link href="/login" className="text-blue-500 mt-4">
                Back to Login
            </Link>
        </div>
    );
}
