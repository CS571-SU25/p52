import React, { useState } from "react";

export default function NewItemForm() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("Textbooks");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted:", { title, desc, category });
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "1rem" }}>
      <h2>List a New Item</h2>
      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <br />
      <textarea
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        required
      />
      <br />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option>Textbooks</option>
        <option>Home Goods</option>
        <option>Stationery</option>
        <option>Baking Equipment</option>
      </select>
      <br />
      <button type="submit">Submit</button>
    </form>
  );
}
