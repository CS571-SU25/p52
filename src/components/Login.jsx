import React, { useState } from "react";
import { useLogin } from "../LoginContext";

export default function Login() {
  const { login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const match = users.find(
      (u) => u.username === username && u.password === password
    );

    if (!match) {
      setError("Invalid username or password");
      return;
    }

    login(match);
    window.location.hash = "#/"; // redirect to homepage
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            required
          />
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button type="submit" className="btn btn-success w-100">
          Login
        </button>
      </form>

      <p className="mt-3 text-center">
        Don’t have an account?{" "}
        <a href="#/profile/create" style={{ textDecoration: "underline" }}>
          Create one here
        </a>
    </p>

    </div>
  );
}
