import React, { useState } from "react";
import FilterSidebar from "./FilterSidebar";
import ItemList from "./ItemList";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <div style={{ width: "220px", padding: "1rem", borderRight: "1px solid #ccc" }}>
        <FilterSidebar setCategory={setSelectedCategory} />
      </div>
      <div style={{ flexGrow: 1, padding: "1.5rem" }}>
        <ItemList selectedCategory={selectedCategory} />
      </div>
    </div>
  );
}
