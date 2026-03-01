"use client";

import axios from "axios";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function sigupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        username: "",
        email: "",
        password: "",
    });

    const [disableButton, setDisableButton] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const singUp = async () => {
        try {
            setLoading(true);
            const res = await axios.post("/api/user/signup", user);

            console.log("signup success", res.data);

            router.push("/login");
        } catch (err: any) {
            console.log("signup failed", err.message);
            // toast.err(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (
            user.username.length > 0 &&
            user.email.length > 0 &&
            user.password.length > 0
        ) {
            setDisableButton(false);
        } else {
            setDisableButton(true);
        }
    }, [user]);

    return (
        <div>
            <h1>Signup Page {loading ? "Processing" : ""}</h1>
            <hr />
            <label htmlFor="username">Username</label>
            <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
            <br />
            <label htmlFor="email">Email</label>
            <br />
            <input
                type="text"
                id="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Enter your email"
            />
            <br />
            <label htmlFor="pass">Password</label>
            <br />{" "}
            <input
                type="password"
                id="pass"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="password"
            />
            <br />
            <button type="submit">
                {disableButton ? "Disabled" : "Signup"}
            </button>
            <br />
            <Link href="/login">Visit login</Link>
        </div>
    );
}
