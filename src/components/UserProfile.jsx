import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import ItemCard from "./ItemCard"; 

export default function UserProfile({items, onDelete}) {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [bio, setBio] = useState("");
  const [editingBio, setEditingBio] = useState(false);
  const [image, setImage] = useState("");
  const [userItems, setUserItems] = useState([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const foundUser = users.find((u) => u.username === id);
    if (foundUser) {
      setUser(foundUser);
      setBio(foundUser.bio || "");
      setImage(foundUser.image || "");

      const items = JSON.parse(localStorage.getItem("items")) || [];
      const ownedItems = items.filter((item) => item.owner === foundUser.username);
      setUserItems(ownedItems);
    }
  }, [id]);

  if (!user) {
    return <div style={{ padding: "1rem" }}>User not found or not authorized.</div>;
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newUrl = reader.result;
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const updatedUsers = users.map((u) =>
          u.username === user.username ? { ...u, image: newUrl } : u
        );
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        setImage(newUrl);
        setUser({ ...user, image: newUrl });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBioSave = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((u) =>
      u.username === user.username ? { ...u, bio } : u
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setEditingBio(false);
    setUser({ ...user, bio });
  };

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?")) return;

    const allItems = JSON.parse(localStorage.getItem("items")) || [];
    const updatedItems = allItems.filter(item => item.id !== id);
    localStorage.setItem("items", JSON.stringify(updatedItems));

    const newUserItems = updatedItems.filter(item => item.owner === user.username);
    setUserItems(newUserItems);
  };


  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <label htmlFor="upload-img">
        <img
          src={image}
          alt="profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            border: "4px solid #2b1412",
            cursor: "pointer",
            marginBottom: "1rem",
          }}
        />
      </label>
      <input
        id="upload-img"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />

      <h2
        style={{
          fontFamily: "Georgia, serif",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        {user.username}
      </h2>

      <div
        style={{
          backgroundColor: "#f28b82",
          border: "4px solid #432320",
          borderRadius: "10px",
          padding: "1rem",
          maxWidth: "600px",
          margin: "1rem auto",
          wordBreak: "break-word",
        }}
      >
        {editingBio ? (
          <>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              style={{ width: "100%", height: "100px" }}
            />
            <button
              onClick={handleBioSave}
              style={{
                textTransform: "uppercase",
                marginTop: "0.5rem",
                color: "white",
                backgroundColor: "#139148",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
              }}
            >
              Save
            </button>
          </>
        ) : (
          <>
            <p
              style={{
                color: "#432320",
                fontSize: "1.5rem",
              }}
            >
              {bio}
            </p>
            <button
              onClick={() => setEditingBio(true)}
              style={{
                textTransform: "uppercase",
                backgroundColor: "#d32f2f",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "5px",
              }}
            >
              Edit Bio
            </button>
          </>
        )}
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Your Listings</h3>
        {userItems.length > 0 ? (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
            {userItems.map((item, idx) => (
              <ItemCard key={idx} item={item} onDelete={handleDelete} />
            ))}
          </div>
        ) : (
          <p>You have no items listed.</p>
        )}
      </div>
    </div>
  );
}
