"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmail() {
    const [token, setToken] = useState("");
    const [verfied, setVerified] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const verifyEmail = async () => {
        try {
            const verifiedUser = await axios.post("/api/user/verifyemail", {
                token,
            });

            if (verifiedUser.data.success) {
                setVerified(true);
            } else {
                setError(verifiedUser.data.message);
            }
        } catch (err: any) {
            console.log(err.response.data);
        }
    };

    // on page reload we get the token from the url, and stored it in urlToken
    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        if (urlToken) {
            setToken(urlToken);
        }
    }, []);

    // is any changed in the token state, we call the verifyEmail function
    useEffect(() => {
        if (token.length > 0) {
            verifyEmail();
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            {verfied ? (
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        Email verified successfully
                    </h1>
                    <Link
                        href="/login"
                        className="text-blue-500 hover:underline"
                    >
                        Go to login
                    </Link>
                </div>
            ) : (
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">
                        {verfied
                            ? "Email verified already"
                            : "Verify your email"}
                    </h1>
                    <h2>{token ? `${token}` : "No token found"}</h2>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            )}
        </div>
    );
}
