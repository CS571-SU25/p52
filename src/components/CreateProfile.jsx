import React, { useState } from "react";
import { useLogin } from "../LoginContext";

const presetImages = [
  "https://union.wisc.edu/sites/default/files/image/2024-05/rsz-terrace-2016-sw-1187-8-9-tonemapped__FillWzEyMDAsODAwXQ.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/7/7c/BuckyBadger.svg/1200px-BuckyBadger.svg.png",
  "https://tile.loc.gov/image-services/iiif/service:pnp:highsm:12400:12443/full/pct:50/0/default.jpg"
];

export default function CreateProfile() {
  const { login } = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState(presetImages[0]);
  const [error, setError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result);
    if (file) reader.readAsDataURL(file);
  };

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
    <div style={{ backgroundColor: '#d63c31', minHeight: '100vh', padding: '2rem' }}>
    <div className="container mt-5 p-4 shadow" style={{ backgroundColor: "#fff", borderRadius: "10px" }}>
      <h2 className="mb-4"> <strong>Create Profile</strong></h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label"><strong>Username</strong></label>
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
          <label className="form-label"><strong>Password</strong></label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label"><strong>Bio</strong></label>
          <textarea
            className="form-control"
            rows="3"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Select a Profile Picture</label>
          <div className="d-flex gap-3 flex-wrap align-items-center mb-2">
            {presetImages.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preset ${idx}`}
                onClick={() => setImage(img)}
                style={{
                  border: image === img ? "3px solid crimson" : "1px solid gray",
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  cursor: "pointer",
                  borderRadius: "8px"
                }}
              />
            ))}
            <input type="file" accept="image/*" onChange={handleFileUpload} />
          </div>
        </div>

        {error && <div className="text-danger mb-3">{error}</div>}

        <button type="submit" className="btn btn-danger">Create</button>
      </form>
    </div>
    </div>
  );
}