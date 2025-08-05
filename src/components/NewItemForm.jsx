// ✅ Simplified NewItemForm.jsx (no resizing/compression, no notifications)
import React, { useState } from "react";
import { useLogin } from "../LoginContext";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

export default function NewItemForm() {
  const { user } = useLogin();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desired, setDesired] = useState("");
  const [category, setCategory] = useState("General");
  const [image, setImage] = useState(null);

  const compressImage = (file, maxWidth = 400) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const scale = maxWidth / img.width;
          canvas.width = maxWidth;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.6));
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to list an item.");
      return;
    }

    if (!image) {
      alert("Please upload an image of the item.");
      return;
    }

    try {
      const compressedImage = await compressImage(image);
      const newItem = {
        id: uuidv4(),
        title,
        desired,
        category,
        image: compressedImage,
        owner: user.username,
        createdAt: new Date().toISOString(),
      };

      const items = JSON.parse(localStorage.getItem("items")) || [];
      items.push(newItem);
      localStorage.setItem("items", JSON.stringify(items));
      alert("Item listed successfully!");
      navigate("/");
    } catch (e) {
      alert("Error saving item. Image may be too large.");
    }
  };
  if (!user) {
  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>You must be logged in to list an item.</h2>
      <button
        style={{
          margin: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#d32f2f",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }}
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button
        style={{
          margin: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#2196f3",
          color: "#fff",
          border: "none",
          borderRadius: "5px"
        }}
        onClick={() => navigate("/create-profile")}
      >
        Create Profile
      </button>
    </div>
  );
}


  return (
    <div style={{
      marginTop: "2rem",
      padding: "1.5rem",
      border: "2px dashed #d32f2f",
      borderRadius: "10px",
      backgroundColor: "#fff0f0",
      maxWidth: "600px",
      marginLeft: "auto",
      marginRight: "auto"
    }}>
      <h2 style={{ marginBottom: "1.5rem", fontFamily: "Poppins", fontWeight: 600 }}>List a New Item</h2>

      <input
        type="text"
        placeholder="Item title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />

      <input
        type="text"
        placeholder="What do you want?"
        value={desired}
        onChange={(e) => setDesired(e.target.value)}
        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginBottom: "1rem", width: "100%", padding: "0.5rem" }}
      >
        <option value="General">General</option>
        <option value="Textbooks">Textbooks</option>
        <option value="Clothing">Clothing</option>
        <option value="Electronics">Electronics</option>
        <option value="Furniture">Furniture</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        style={{ marginBottom: "1rem" }}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          style={{ width: "150px", height: "auto", display: "block", margin: "0 auto 1rem" }}
        />
      )}

      <button
        className="btn btn-danger"
        onClick={handleSubmit}
        disabled={!title.trim() || !desired.trim() || !image}
      >
        List Item
      </button>
    </div>
    
  );
}
