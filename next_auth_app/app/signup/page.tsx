"use client";

import Link from "next/link";
import React from "react";
import Router from "next/router";
import axios from "axios";

export default function sigupPage() {
  const [user, setUser] = React.useState({
    username: "",
    email: "",
    password: "",
  });

  const singUp = async () => {};

  return (
    <div>
      <h1>Signup Page</h1>
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
      <button type="submit">Signup</button>
      <br />
      <Link href="/login">Visit login</Link>
    </div>
  );
}
