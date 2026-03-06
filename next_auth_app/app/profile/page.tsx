"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile() {
    const router = useRouter();
    const logout = async () => {
        try {
            await axios.get("/api/user/logout");
            // toast.success("logout successfull");
            router.push("/login");
        } catch (err: any) {
            console.log(err.message);
            // toast.error(err.message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
            <p className="text-lg">This is the profile page.</p>
            <p className="text-lg">
                You can add more information about yourself here.
            </p>
            <hr />
            <button
                onClick={logout}
                className="bg-red-300 hover:bg-red-600 text-white p-5 rounded-2xl"
            >
                LOGOUT
            </button>
        </div>
    );
}
