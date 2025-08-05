import React, { useState } from "react";
import ItemList from "./ItemList";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div style={{ padding: "1.5rem" }}>
      <ItemList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </div>
  );
}
