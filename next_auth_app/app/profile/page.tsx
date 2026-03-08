"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useEffect } from "react";

export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState({
        _id: "",
        username: "",
        email: "",
    });

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

    // load data on page load
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/user/account");
                // console.log(res.data.user);
                setData(res.data.user);
            } catch (err: any) {
                throw new Error(err.message);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4">Profile Page</h1>
            <p className="text-lg">This is yout profile page.</p>
            <p className="text-lg">
                Your id is: {data ? data._id : "Loading..."}
            </p>
            <p className="text-lg">
                Your username is: {data ? data.username : "Loading..."}
            </p>
            <p className="text-lg">
                Your email is: {data ? data.email : "Loading..."}
            </p>
            <p className="text-lg">
                You can add more information about yourself here.
            </p>
            <Link href={`/profile/${data._id}`}>Update Profile</Link>
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
