import React, { useState } from "react";
import { useLogin } from "../LoginContext";

const presetImages = [
  "/img1.png",
  "/img2.png",
  "/img3.png"
];

export default function CreateProfile() {
  const { login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(presetImages[0]);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const exists = users.some((u) => u.username === username);
    if (exists) {
      setError("Username already taken");
      return;
    }
    const newUser = { username, password, bio, image };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    login(newUser);
    window.location.hash = "#/";
  };

  return (
    <div className="container mt-4">
      <h2>Create Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Bio</label>
          <textarea
            className="form-control"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select a Profile Picture</label>
          <div className="d-flex gap-3">
            {presetImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preset ${idx}`}
                onClick={() => setImage(img)}
                style={{ border: image === img ? "2px solid blue" : "1px solid gray", width: 60, height: 60, cursor: "pointer" }}
              />
            ))}
          </div>
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}