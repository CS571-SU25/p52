import React from "react";

export default function FilterSidebar({ setCategory }) {
  const categories = ["All", "Textbooks", "Home Goods", "Stationery", "Baking Equipment"];

  return (
    <div>
      <h4>Categories</h4>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          style={{
            marginBottom: "0.5rem",
            width: "100%",
            textAlign: "left",
            padding: "0.5rem 1rem",
            backgroundColor: "#f1f1f1",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
