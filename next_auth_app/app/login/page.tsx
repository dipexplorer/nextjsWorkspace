"use client";

import axios from "axios";
import React from "react";
import Link from "next/link";
import Router from "next/router";

export default function LoginPage() {
  const [user, setUser] = React.useState({
    username: "",
    password: "",
  });

  const login = async () => {};

  return (
    <div>
      <h1>Login Page</h1>
      <br />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="Enter your username"
        value={user.username}
        onChange={(e) => {
          setUser({ ...user, username: e.target.value });
        }}
      />
      <br />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Enter your password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <br />
      <button type="submit" onClick={login}>
        Login
      </button>
      <br />
      <Link href="/signup">Visit Signup</Link>
    </div>
  );
}
